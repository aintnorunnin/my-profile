"use client";

import { FormEvent, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const initialMessage: ChatMessage = {
  role: "assistant",
  content:
    "Ask me about Brandon's career path, engineering background, skills, or education.",
};

export default function AIBrandonChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmedQuestion },
    ];

    setMessages(nextMessages);
    setQuestion("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-brandon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.filter((message) => message !== initialMessage),
        }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok || !data.answer) {
        throw new Error(data.error ?? "AI Brandon could not answer right now.");
      }

      setMessages([...nextMessages, { role: "assistant", content: data.answer }]);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "AI Brandon could not answer right now.";

      setError(message);
      setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="section chat-section" aria-labelledby="ai-brandon-title">
      <div className="section__header">
        <p className="eyebrow">AI Brandon</p>
        <h2 id="ai-brandon-title">Ask AI Brandon about his career.</h2>
      </div>
      <div className="chat-panel">
        <div className="chat-messages" aria-live="polite">
          {messages.map((message, index) => (
            <article
              className={`chat-message chat-message--${message.role}`}
              key={`${message.role}-${index}-${message.content}`}
            >
              <span>{message.role === "user" ? "You" : "AI Brandon"}</span>
              <p>{message.content}</p>
            </article>
          ))}
          {isLoading ? (
            <article className="chat-message chat-message--assistant">
              <span>AI Brandon</span>
              <p>Thinking through Brandon&apos;s background...</p>
            </article>
          ) : null}
        </div>
        <form className="chat-form" onSubmit={handleSubmit}>
          <label htmlFor="ai-brandon-question">Ask about Brandon&apos;s career</label>
          <div className="chat-form__row">
            <textarea
              id="ai-brandon-question"
              maxLength={800}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="What kind of engineering experience does Brandon have?"
              value={question}
            />
            <button className="button button--primary" disabled={isLoading} type="submit">
              {isLoading ? "Asking..." : "Ask"}
            </button>
          </div>
          {error ? <p className="chat-error">{error}</p> : null}
        </form>
      </div>
    </section>
  );
}
