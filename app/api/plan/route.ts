// app/api/plan/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType, Schema } from '@google/generative-ai';

console.log("THE KEY NEXT.JS SEES IS:", process.env.GEMINI_API_KEY);


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const itinerarySchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    destination: { type: SchemaType.STRING },
    budget: { type: SchemaType.STRING },
    days: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          dayNumber: { type: SchemaType.NUMBER },
          theme: { type: SchemaType.STRING },
          activities: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                time: { type: SchemaType.STRING },
                placeName: { type: SchemaType.STRING },
                description: { type: SchemaType.STRING },
                // ADDED `format: 'enum'` HERE
                type: { 
                  type: SchemaType.STRING, 
                  format: 'enum', 
                  enum: ['attraction', 'restaurant', 'hotel'] 
                },
                coordinates: {
                  type: SchemaType.OBJECT,
                  properties: {
                    lat: { type: SchemaType.NUMBER },
                    lng: { type: SchemaType.NUMBER },
                  },
                  required: ['lat', 'lng'],
                },
              },
              required: ['time', 'placeName', 'description', 'type', 'coordinates'],
            },
          },
        },
        required: ['dayNumber', 'theme', 'activities'],
      },
    },
  },
  required: ['destination', 'budget', 'days'],
};

export async function POST(request: Request) {
  try {
    const { destination, budget, days } = await request.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash-lite',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: itinerarySchema,
      },
    });

    const prompt = `Create a ${days}-day travel itinerary for ${destination} on a ${budget} budget. 
    Include places to visit and restaurants. Provide real latitude and longitude coordinates for every placeName.`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    // ADD THESE TWO LINES: Clean up Markdown formatting if Gemini adds it
    responseText = responseText.replace(/```json/gi, '');
    responseText = responseText.replace(/```/gi, '');

    const itinerary = JSON.parse(responseText);

    return NextResponse.json({ itinerary });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    // Return the actual error message so we can see it
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}