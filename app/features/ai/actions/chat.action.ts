export async function sendMessageToAI(
  message: string,
  orgId: string,
): Promise<{ success: boolean; response?: string; error?: string }> {
  try {
    const response = await fetch(
      "/api/ai/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, orgId }),
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      return {
        success: false,
        error: `Failed to get response: ${response.status}`,
      };
    }

    // Handle streaming response
    if (!response.body) {
      return {
        success: false,
        error: "No response body from AI service",
      };
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines[lines.length - 1];

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim();
        if (!line || !line.startsWith("data: ")) continue;

        const data = line.slice(6).trim();
        if (data === "[DONE]") break;
        if (!data) continue;

        try {
          const parsed = JSON.parse(data);
          if (parsed.text) {
            fullText += parsed.text;
          }
        } catch (e) {
          console.error("Parse error:", e);
        }
      }
    }

    return { success: true, response: fullText };
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred while sending the message",
    };
  }
}

