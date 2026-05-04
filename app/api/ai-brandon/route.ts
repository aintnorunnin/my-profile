import { education, journey, profile } from "@/app/content";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "openai/gpt-oss-120b:free";
const MAX_QUESTION_LENGTH = 800;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  messages?: ChatMessage[];
};

type OpenRouterChoice = {
  message?: {
    content?: string;
  };
};

type OpenRouterResponse = {
  choices?: OpenRouterChoice[];
  error?: {
    message?: string;
  };
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "OpenRouter API key is not configured." },
      { status: 500 },
    );
  }

  const payload = (await request.json().catch(() => ({}))) as ChatRequest;
  const messages = sanitizeMessages(payload.messages);

  if (messages.length === 0) {
    return Response.json(
      { error: "Please ask a question about Brandon's career." },
      { status: 400 },
    );
  }

  const openRouterResponse = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Brandon Williams Portfolio",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        {
          role: "system",
          content: buildAIBrandonPrompt(),
        },
        ...messages,
      ],
    }),
  });

  const data = (await openRouterResponse.json().catch(() => ({}))) as OpenRouterResponse;

  if (!openRouterResponse.ok) {
    return Response.json(
      {
        error:
          data.error?.message ??
          "AI Brandon could not answer right now. Please try again.",
      },
      { status: openRouterResponse.status },
    );
  }

  const answer = data.choices?.[0]?.message?.content?.trim();

  if (!answer) {
    return Response.json(
      { error: "AI Brandon returned an empty response." },
      { status: 502 },
    );
  }

  return Response.json({ answer });
}

function sanitizeMessages(messages: ChatRequest["messages"]): ChatMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter(
      (message): message is ChatMessage =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string",
    )
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_QUESTION_LENGTH),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-8);
}

function buildAIBrandonPrompt() {
  const roles = journey
    .map(
      (item) =>
        `- ${item.role} at ${item.company}, ${item.dates}, ${item.location}: ${item.summary}`,
    )
    .join("\n");

  return `You are AI Brandon, a career-focused AI representation of ${profile.name}. Answer questions in first person as Brandon when appropriate, but do not invent facts beyond the profile below. If a question asks for something unknown, say what is known and suggest contacting Brandon directly.

Profile:
- Role: ${profile.role}
- Location: ${profile.location}
- Languages: ${profile.languages}
- Summary: ${profile.summary}
- Skills: ${profile.skills.join(", ")}
- Education: ${education.join("; ")}
- Interests: ${profile.interests.join(", ")}

Career journey:
${roles}`;
}
