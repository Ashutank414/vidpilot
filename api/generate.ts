export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const { topic, promptType } = await request.json();

        if (!topic) {
            return new Response(JSON.stringify({ error: 'Topic is required' }), { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'OpenAI API Key not configured' }), { status: 500 });
        }

        let systemPrompt = "You are an expert YouTube growth strategist.";
        let userPrompt = "";

        if (promptType === 'titles') {
            userPrompt = `Generate 5 viral, high-CTR YouTube video titles for a video about "${topic}". Return only the titles, one per line.`;
        } else if (promptType === 'description') {
            userPrompt = `Write a high-retention, SEO-optimized YouTube video description for a video about "${topic}". Include an intro, key points, and hashtags.`;
        } else {
            userPrompt = `Describe 3 high-CTR thumbnail concepts for a video about "${topic}". Focus on visual elements, text overlays, and emotions.`;
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                max_tokens: 500
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'OpenAI API Error');
        }

        const generatedText = data.choices[0].message.content;

        // Return structured data based on prompt type for easier frontend handling
        let result;
        if (promptType === 'titles' || promptType === 'thumbnails') {
            result = generatedText.split('\n').filter((line: string) => line.trim().length > 0).map((line: string) => line.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').replace(/"/g, ''));
        } else {
            result = [generatedText];
        }

        return new Response(JSON.stringify({ result }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
