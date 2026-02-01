import { useState } from 'react';

interface UseAiOptions {
    onSuccess?: (data: string[]) => void;
    onError?: (error: string) => void;
}

export function useAi({ onSuccess, onError }: UseAiOptions = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generate = async (topic: string, promptType: 'titles' | 'description' | 'thumbnails') => {
        setIsLoading(true);
        setError(null);

        // Client-side rate limiting (simple local storage check)
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const usageKey = `vidpilot_ai_usage_${today}`;
        const currentUsage = parseInt(localStorage.getItem(usageKey) || '0');

        if (currentUsage >= 5) {
            const limitError = "Daily AI limit reached (5 generations/day). Upgrade for more.";
            setError(limitError);
            if (onError) onError(limitError);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic, promptType }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate content');
            }

            // Increment usage
            localStorage.setItem(usageKey, (currentUsage + 1).toString());

            if (onSuccess) onSuccess(data.result);
            return data.result;

        } catch (err: any) {
            const errorMessage = err.message || "Something went wrong";
            setError(errorMessage);
            if (onError) onError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return { generate, isLoading, error };
}
