"use client";
import { sendMessageToAI } from "@/app/features/ai/actions/chat.action";
import { toast } from "sonner";

export default function AIChatForm({ orgId }: { orgId: string }) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;
    const result = await sendMessageToAI(message, orgId);
    if (result.success) {
      console.log("AI Response:", result.response);
      toast.success("result received successfully!");
    }
  };
  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        AI Chat Component
      </h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        This is a simple AI chat component.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          name="message"
          placeholder="Type your message here..."
          className="h-11 flex-1 rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          className="h-11 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Send
        </button>
      </form>
    </div>
  );
}
