// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

// --- Configuration ---
const app = express();
const PORT = process.env.PORT || 3001;

// Get the API Key from environment variables.
// The key is kept secure on the server and is never exposed to the client.
const apiKey = process.env.GEMINI_API_KEY; 

// Check if the API key is present
if (!apiKey) {
  console.error("FATAL ERROR: GEMINI_API_KEY is not set in environment variables. Server cannot run without it.");
  process.exit(1);
}

// Initialize the GoogleGenAI client
const ai = new GoogleGenAI({ apiKey });

// --- Middleware Setup ---

// Enable CORS for frontend communication.
// It allows requests from any origin (*), which is safe for a public proxy.
app.use(cors()); 

// Enable Express to parse JSON request bodies
app.use(express.json());

// --- Routes ---

// 1. Root Route (Health Check)
app.get('/', (req, res) => {
  res.send('Gemini AI Proxy Server is running!');
});

// 2. AI Generation Route
// This route is used by the React frontend for all AI tasks (suggest, translate, etc.)
app.post('/api/generate', async (req, res) => {
    // Destructure properties from the request body
    const { 
        prompt, 
        systemInstruction, 
        model = 'gemini-2.5-flash-preview-09-2025' // Default model
    } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    console.log(`Received request for model: ${model} with prompt length: ${prompt.length}`);
    
    try {
        // Prepare the request payload for the Gemini API
        const payload = {
            model: model,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            // Add system instruction if provided
            ...(systemInstruction && { systemInstruction: { parts: [{ text: systemInstruction }] } }),
            
            // Setting a reasonable temperature for creative/helpful responses
            config: {
                temperature: 0.8,
            }
        };

        // Call the Gemini API to generate content
        const response = await ai.models.generateContent(payload);
        
        // Extract the generated text
        const generatedText = response.text;

        if (!generatedText) {
             return res.status(500).json({ error: 'AI response was empty.' });
        }

        // Send the generated text back to the frontend
        res.json({ text: generatedText });

    } catch (error) {
        console.error('Gemini API Error:', error.message);
        // Send a detailed error message back to the frontend
        res.status(500).json({ 
            error: 'Failed to communicate with the Gemini API.', 
            details: error.message 
        });
    }
});

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT}`);
});
