
import { GoogleGenAI } from "@google/genai";

export async function generateDashboardInsights(stats: any, transactions: any) {
  // Initialize GoogleGenAI with apiKey strictly from process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    As a senior business analyst, provide a short, high-level summary of the current business status based on these stats:
    Stats: ${JSON.stringify(stats)}
    Recent Transactions: ${JSON.stringify(transactions)}
    
    Give 3 bullet points for:
    1. Key Strength
    2. Potential Risk
    3. Actionable Advice
    
    Keep it professional and concise (max 150 words total).
    jelaskan dalam bahasa indonesia
  `;

  try {
    // Calling generateContent with the appropriate model for basic text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Directly accessing the .text property from the response object
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Error generating AI insights. Please check your API configuration.";
  }
}
