// utils/gemini.js
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Use the Gemini 3.0 Flash preview model
const modelName = "gemini-3-flash-preview";

/**
 * Generate interview Q&A using Gemini 3.0 Structured Output
 */
export async function generateInterviewQA(
    role,
    description,
    experience,
    count = 5,
) {
    // Define the schema for structured output
    const schema = {
        description: "List of interview questions and answers",
        type: SchemaType.ARRAY,
        items: {
            type: SchemaType.OBJECT,
            properties: {
                question: {
                    type: SchemaType.STRING,
                    description: "The interview question.",
                },
                answer: {
                    type: SchemaType.STRING,
                    description: "A concise, professional sample answer.",
                },
            },
            required: ["question", "answer"],
        },
    };

    const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
            // Gemini 3.0 feature: Use MEDIUM thinking for better reasoning in Q&A generation
            thinkingLevel: "MEDIUM",
        },
    });

    const prompt = `Act as an expert interviewer for a ${role} position. 
  Tech Stack: ${description}. Experience: ${experience} years. 
  Generate ${count} high-quality interview questions.`;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        console.log("QA Response:", response.text());
        // No regex needed! Gemini 3.0 returns the JSON directly.
        return JSON.parse(response.text());
    } catch (err) {
        console.error("Gemini 3.0 QA Error:", err);
        return [];
    }
}

/**
 * Generate feedback with specific rating and constructive criticism
 */
export async function generateQAFeedback(question, userAnswer) {
    const schema = {
        type: SchemaType.OBJECT,
        properties: {
            rating: {
                type: SchemaType.INTEGER,
                description: "Rating from 1 to 10.",
            },
            feedback: {
                type: SchemaType.STRING,
                description: "Constructive feedback on the answer.",
            },
        },
        required: ["rating", "feedback"],
    };

    const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
            // Flash is fast, but we want high-quality feedback
            thinkingLevel: "HIGH",
        },
    });

    const feedbackPrompt = `
  Question: ${question}
  User Answer: ${userAnswer}
  Evaluate the answer's accuracy and depth. Provide a rating and 3-5 sentences of feedback.`;

    try {
        const result = await model.generateContent(feedbackPrompt);
        return JSON.parse(result.response.text());
    } catch (err) {
        console.error("Gemini 3.0 Feedback Error:", err);
        return {
            rating: 0,
            feedback: "Unable to generate feedback at this time.",
        };
    }
}
