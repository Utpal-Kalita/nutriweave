import { GoogleGenAI } from "@google/genai";

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || (process.env as any).GEMINI_API_KEY || "";
const geminiEnabled = (import.meta as any).env.VITE_ENABLE_GEMINI === "true";

const fallbackRoadmap = (priorities: { minerals: number, glycemic: number, protein: number }, level: number) => {
  const primaryGoal = Object.entries(priorities).sort((a, b) => b[1] - a[1])[0]?.[0] || "balanced nutrition";

  return [
    `- Your Level ${level} blend supports ${primaryGoal.replace("glycemic", "glycemic control")} while keeping meals familiar.`,
    "- Built for steady daily energy with balanced grains and functional nutrients.",
    "- Use it as your regular rice base for simple, repeatable nutrition gains."
  ].join("\n");
};

export const getNutritionalRoadmap = async (priorities: { minerals: number, glycemic: number, protein: number }, level: number) => {
  if (!geminiEnabled || !apiKey) {
    return fallbackRoadmap(priorities, level);
  }

  try {
    const client = new GoogleGenAI({ apiKey });
    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are a nutrition expert for "Nutrifibe", a personalized rice company.
      A user has selected the following nutritional priorities (on a scale of 1-3, where 3 is highest):
      - Minerals: ${priorities.minerals}
      - Glycemic Control: ${priorities.glycemic}
      - Protein: ${priorities.protein}
      
      Their matched Nutrifibe Level is ${level}/10.
      
      Provide a short, encouraging "Nutritional Roadmap" (max 3 bullet points) on how this specific rice blend helps them achieve their goals. Keep it professional yet friendly.`
    });
    return response.text;
  } catch (error) {
    console.error("Error generating nutritional roadmap:", error);
    return fallbackRoadmap(priorities, level);
  }
};
