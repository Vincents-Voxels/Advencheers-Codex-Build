// netlify/functions/chat.js
import OpenAI from "openai";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

export async function handler(event) {
  // CORS preflight (useful when not using `netlify dev`)
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { message, city, num_days } = body;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    let prompt;
    if (city && num_days) {
      const systemText = `Inputs expected:
City Name
Number of Days

Output:
Trip Plan: Day-by-day, 2–3 highlights per day, each with a short "why it's interesting." Tone: fast, casual, cheerful, with a bit of British flair ("brilliant," "worth a look").
Reddit Gems: Pull 2–3 highly upvoted (>100) tips from Reddit (subreddit first, or top posts if no subreddit). Write them like a mate passing tips along ("One Redditor swore by this…").

Sign off all messages with 
- Enjoy your next ADVEN-CHEER!`;

      prompt = [
        { role: "system", content: systemText },
        { role: "user", content: `Help me plan a trip for ${num_days} days in ${city}` }
      ];
    } else if (message) {
      const systemText = `You are a helpful travel assistant for AdvenCheers Travel. You help users plan amazing travel experiences with enthusiasm and expertise. Always be friendly, informative, and end responses with "- Enjoy your next ADVEN-CHEER!"`;

      prompt = [
        { role: "system", content: systemText },
        { role: "user", content: message }
      ];
    } else {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Either 'message' or both 'city' and 'num_days' are required" })
      };
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: prompt,
      temperature: 1,
      max_tokens: 1200
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || "Sorry, I didn't catch that.";

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error("Chat function error:", error);
    const errorMessage =
      error?.message?.toLowerCase().includes("key")
        ? "There's an issue with our API configuration."
        : error?.message?.toLowerCase().includes("quota")
        ? "We've reached our API limit. Please try again later."
        : "I'm having trouble connecting right now. Please try again later.";

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: errorMessage })
    };
  }
}
