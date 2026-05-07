'use server';
/**
 * @fileOverview A personality vibe analysis AI agent.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VibeAnalysisInputSchema = z.object({
  traits: z.array(z.string()).describe('The top personality traits.'),
  archetype: z.string().describe('The primary archetype name.'),
  vector: z.record(z.number()).describe('The trait vector scores.'),
});
export type VibeAnalysisInput = z.infer<typeof VibeAnalysisInputSchema>;

const VibeAnalysisOutputSchema = z.object({
  analysis: z.string().describe('A 2-sentence snarky but accurate personality roast/summary.'),
  vibeColor: z.string().describe('A CSS gradient string representing their digital aura.'),
});
export type VibeAnalysisOutput = z.infer<typeof VibeAnalysisOutputSchema>;

export async function analyzeVibe(input: VibeAnalysisInput): Promise<VibeAnalysisOutput> {
  return vibeAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'vibeAnalysisPrompt',
  input: {schema: VibeAnalysisInputSchema},
  output: {schema: VibeAnalysisOutputSchema},
  prompt: `You are a snarky, Gen-Z vibe-checker with an uncanny ability to read people.
Given the following personality data:
Archetype: {{{archetype}}}
Traits: {{#each traits}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Vector Scores: {{#each vector}}{{{@key}}}: {{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Write a "Vibe Analysis" that is exactly 2 sentences long. It should sound like a close friend calling them out or roasting them with love.
Also, pick a "Digital Aura" color gradient (CSS linear-gradient) that matches this vibe. For example, high Chaos might be neon purple/orange, while high Logic might be steel blue/white.

Return the JSON object with fields 'analysis' and 'vibeColor'.`,
});

const vibeAnalysisFlow = ai.defineFlow(
  {
    name: 'vibeAnalysisFlow',
    inputSchema: VibeAnalysisInputSchema,
    outputSchema: VibeAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
