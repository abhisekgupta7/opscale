import AIChat from "@/app/features/ai/components/ai-chat";
export default function Chatbot() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-background via-muted/30 to-background px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="mx-auto mb-6 w-full max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:mb-8 sm:text-4xl">
        Chatbot Page
      </h1>
      <AIChat />
    </div>
  );
}
