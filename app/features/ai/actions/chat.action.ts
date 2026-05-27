export async function sendMessageToAI(
  message: string,
  orgId: string,
): Promise<{ success: boolean; response?: string; error?: string }> {
  try {
    const response = await fetch(process.env.FASTAPI_URL + "/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, orgId }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to send message",
      };
    }
    const data = await response.json();
    return { success: true, response: data.response };
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return {
      success: false,
      error: "An error occurred while sending the message",
    };
  }
}
