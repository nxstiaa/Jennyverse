import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'No OpenAI API key set.' }, { status: 500 });
  }

  const prompt = `Extract the recipe title, a short description, a list of ingredients (with amount, unit, and name), and a list of steps from the following text. Respond in JSON with keys: title, description, ingredients (array of {amount, unit, name}), steps (array of strings).\n\nRecipe:\n${text}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that extracts structured recipe data.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 600,
      }),
    });
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json({ error: 'Failed to parse AI response.' }, { status: 500 });
    }
    return NextResponse.json(parsed);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to call OpenAI.' }, { status: 500 });
  }
} 