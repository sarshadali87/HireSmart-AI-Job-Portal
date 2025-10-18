// FIX: Implemented Gemini service to generate job descriptions.
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is being accessed from environment variables as per guidelines.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
}
// FIX: Initialize GoogleGenAI with a named apiKey parameter.
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a job description using the Gemini API.
 * @param title The job title.
 * @param keywords Keywords to include in the description.
 * @returns A promise that resolves to the generated job description string.
 */
export const generateJobDescription = async (title: string, keywords: string): Promise<string> => {
    // FIX: Select appropriate model for basic text tasks.
    const model = 'gemini-2.5-flash';
    const prompt = `
        Create a professional and engaging job description for the following role.
        
        Job Title: ${title}
        
        Key requirements and keywords to include: ${keywords}
        
        The description should be well-structured, including sections for Responsibilities, Qualifications, and Benefits.
        Format the output in clean, readable paragraphs. Do not use Markdown formatting like headers (#).
    `;

    try {
        // FIX: Use ai.models.generateContent to call the Gemini API.
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                temperature: 0.7, 
            }
        });

        // FIX: Access the text directly from the response object as per guidelines.
        const description = response.text;
        
        if (!description) {
            throw new Error("Generated description is empty.");
        }
        
        return description.trim();

    } catch (error) {
        console.error("Error generating job description with Gemini API:", error);
        throw new Error("Failed to generate job description. Please try again.");
    }
};
