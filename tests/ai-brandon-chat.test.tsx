import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AIBrandonChat from "@/app/components/AIBrandonChat";

describe("AIBrandonChat", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the starting prompt", () => {
    render(<AIBrandonChat />);

    expect(
      screen.getByRole("heading", {
        name: /ask ai brandon about his career/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ask me about Brandon's career path/i),
    ).toBeInTheDocument();
  });

  it("submits a question and renders AI Brandon's answer", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          answer: "Brandon worked as a software engineer at VMware and Amazon.",
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    render(<AIBrandonChat />);

    fireEvent.change(screen.getByLabelText(/ask about Brandon's career/i), {
      target: { value: "What engineering roles has Brandon held?" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ask" }));

    expect(screen.getByText("What engineering roles has Brandon held?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Asking..." })).toBeDisabled();

    await waitFor(() => {
      expect(
        screen.getByText("Brandon worked as a software engineer at VMware and Amazon."),
      ).toBeInTheDocument();
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/ai-brandon",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it("shows an API error and restores the previous conversation", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: "OpenRouter is unavailable." }), {
          status: 503,
        }),
      ),
    );

    render(<AIBrandonChat />);

    fireEvent.change(screen.getByLabelText(/ask about Brandon's career/i), {
      target: { value: "Tell me about Brandon." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ask" }));

    await waitFor(() => {
      expect(screen.getByText("OpenRouter is unavailable.")).toBeInTheDocument();
    });
    expect(screen.queryByText("Tell me about Brandon.")).not.toBeInTheDocument();
  });
});
