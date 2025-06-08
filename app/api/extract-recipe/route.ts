import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('No Gemini API key set.');
    return NextResponse.json({ error: 'No Gemini API key set.' }, { status: 500 });
  }

  const prompt = `Extract the recipe title, a short description, a list of ingredients (with amount, unit, and name), and a list of steps from the following text. Respond in JSON with keys: title, description, ingredients (array of {amount, unit, name}), steps (array of strings).\n\nRecipe:\n${text}`;

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );
    const data = await response.json();
    console.log('Gemini API response:', JSON.stringify(data, null, 2));
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.error('Failed to parse Gemini response:', content);
      return NextResponse.json({ error: 'Failed to parse Gemini response.', details: content }, { status: 500 });
    }
    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error('API route error:', err);
    return NextResponse.json({ error: 'Failed to call Gemini.', details: err.message }, { status: 500 });
  }
} 