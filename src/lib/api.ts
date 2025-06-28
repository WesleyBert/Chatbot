export async function sendMessageToAPI(message: string) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  try {
    const response: Response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-type": "aplication/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [{ role: "user", content: message }],
        }),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send message to API: ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error sending message to API:", error);
    return "The AI ​​was unable to respond. Please try again shortly.";
  }
}
