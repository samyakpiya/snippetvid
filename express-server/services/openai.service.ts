import OpenAI from "openai";
import { env } from "../config/environment";

export const openai = new OpenAI({
  apiKey: env.OPEN_AI_KEY,
});

interface GenerateTitleAndSummaryResponse {
  title: string;
  summary: string;
}

export async function generateTitleAndSummary(
  transcription: string
): Promise<GenerateTitleAndSummaryResponse> {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are going to generate a title and a nice description using the speech to text transcription provided: transcription(${transcription}) and then return it in json format as {"title": <the title you gave>}, "summary": <the summary you created>}`,
      },
    ],
  });

  if (!completion.choices[0].message.content) {
    return {
      title: "Untitled Video",
      summary: "No summary available.",
    };
  }

  return JSON.parse(completion.choices[0].message.content);
}
