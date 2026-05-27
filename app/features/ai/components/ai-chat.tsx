import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AIChatForm from "./ai-chat-form";

export default async function AIChat() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.activeOrgId) {
    redirect("/auth/login");
  }

  return <AIChatForm orgId={session.user.activeOrgId} />;
}
