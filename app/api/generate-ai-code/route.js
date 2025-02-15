import { generateAICode } from "@/lib/geminiAI";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const result = await generateAICode.sendMessage(prompt);
    const AiResponse = result.response.text();

    return NextResponse.json(JSON.parse(AiResponse));
  } catch (error) {
    return {
      status: 500,
      body: {
        error: error.message,
      },
    };
  }
}
