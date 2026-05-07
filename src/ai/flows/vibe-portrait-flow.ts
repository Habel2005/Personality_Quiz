
'use server';
/**
 * @fileOverview A flow to generate a visual "Vibe Portrait" based on personality results.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VibePortraitInputSchema = z.object({
  archetype: z.string().describe('The personality archetype name.'),
  traits: z.array(z.string()).describe('Top traits.'),
});
export type VibePortraitInput = z.infer<typeof VibePortraitInputSchema>;

const VibePortraitOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type VibePortraitOutput = z.infer<typeof VibePortraitOutputSchema>;

export async function generateVibePortrait(input: VibePortraitInput): Promise<VibePortraitOutput> {
  return vibePortraitFlow(input);
}

const vibePortraitFlow = ai.defineFlow(
  {
    name: 'vibePortraitFlow',
    inputSchema: VibePortraitInputSchema,
    outputSchema: VibePortraitOutputSchema,
  },
  async input => {
    const prompt = `A stylized, artistic avatar representation of a personality archetype called "${input.archetype}". 
    Traits: ${input.traits.join(', ')}. 
    Style: Playful, modern illustration, vibrant colors, thick black outlines, minimal background, vector art style.`;

    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: prompt,
    });

    if (!media) throw new Error('Failed to generate portrait');

    return {
      imageUrl: media.url,
    };
  }
);
