import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/ai-brandon/route";

const originalApiKey = process.env.OPENROUTER_API_KEY;

describe("AI Brandon API", () => {
  afterEach(() => {
    process.env.OPENROUTER_API_KEY = originalApiKey;
    vi.restoreAllMocks();
  });

  it("requires the OpenRouter API key", async () => {
    delete process.env.OPENROUTER_API_KEY;

    const response = await POST(
      new Request("http://localhost/api/ai-brandon", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ role: "user", content: "What did Brandon do at VMware?" }],
        }),
      }),
    );
    const body = (await response.json()) as { error: string };

    expect(response.status).toBe(500);
    expect(body.error).toMatch(/api key/i);
  });

  it("validates that the user asked a question", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";

    const response = await POST(
      new Request("http://localhost/api/ai-brandon", {
        method: "POST",
        body: JSON.stringify({ messages: [] }),
      }),
    );
    const body = (await response.json()) as { error: string };

    expect(response.status).toBe(400);
    expect(body.error).toMatch(/ask a question/i);
  });

  it("calls OpenRouter with the career prompt and returns the answer", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content:
                  "Brandon has software engineering experience at VMware and Amazon.",
              },
            },
          ],
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      new Request("http://localhost/api/ai-brandon", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ role: "user", content: "Where has Brandon engineered?" }],
        }),
      }),
    );
    const body = (await response.json()) as { answer: string };
    const requestBody = JSON.parse(fetchMock.mock.calls[0][1].body as string) as {
      model: string;
      messages: Array<{ role: string; content: string }>;
    };

    expect(response.status).toBe(200);
    expect(body.answer).toContain("VMware");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://openrouter.ai/api/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-key",
        }),
      }),
    );
    expect(requestBody.model).toBe("openai/gpt-oss-120b:free");
    expect(requestBody.messages[0].content).toContain("Career journey");
    expect(requestBody.messages[0].content).toContain("AI Brandon");
    expect(requestBody.messages[0].content).toContain("VMware");
    expect(requestBody.messages.at(-1)).toEqual({
      role: "user",
      content: "Where has Brandon engineered?",
    });
  });
});
