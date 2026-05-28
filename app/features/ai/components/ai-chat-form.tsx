"use client";
import { useState, useRef } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AIChatForm({ orgId }: { orgId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    // Add user message immediately
    setMessages((prev: Message[]) => [
      ...prev,
      { role: "user", text: userMessage },
    ]);

    // Add empty AI message that we'll stream into
    setMessages((prev: Message[]) => [...prev, { role: "ai", text: "" }]);

    try {
      const response = await fetch(
        `${process.env.FASTAPI_URL}/api/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            org_id: orgId,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to connect to AI");

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.replace("data: ", "").trim();
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);

            if (parsed.error) {
              // Replace last AI message with error
              setMessages((prev: Message[]) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "ai",
                  text: `Error: ${parsed.error}`,
                };
                return updated;
              });
              break;
            }

            if (parsed.text) {
              // Append streamed text to last AI message
              setMessages((prev: Message[]) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "ai",
                  text: updated[updated.length - 1].text + parsed.text,
                };
                return updated;
              });

              // Auto scroll to bottom
              bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      setMessages((prev: Message[]) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          text: "Something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col rounded-3xl border border-border/70 bg-card/70 shadow-sm backdrop-blur">
      {/* Message history */}
      <div className="flex max-h-96 flex-col gap-3 overflow-y-auto p-6">
        {messages.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Ask anything about your business — overdue payments, top products,
            revenue summary...
          </p>
        )}

        {messages.map((msg: Message, i: number) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {/* Show cursor while streaming */}
              {msg.text}
              {msg.role === "ai" && loading && i === messages.length - 1 && (
                <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-current" />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border/70 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your business..."
            disabled={loading}
            className="h-11 flex-1 rounded-xl border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-11 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
