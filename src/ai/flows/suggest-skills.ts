// src/ai/flows/suggest-skills.ts
'use server';
/**
 * @fileOverview A flow for suggesting relevant skills and achievements based on a job description.
 *
 * - suggestSkills - A function that suggests relevant skills and achievements.
 * - SuggestSkillsInput - The input type for the suggestSkills function.
 * - SuggestSkillsOutput - The return type for the suggestSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSkillsInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to tailor skills and achievements to.'),
  resume: z.string().describe('The user\'s resume text.'),
});
export type SuggestSkillsInput = z.infer<typeof SuggestSkillsInputSchema>;

const SuggestSkillsOutputSchema = z.object({
  suggestedSkills: z
    .array(z.string())
    .describe('A list of skills relevant to the job description.'),
  suggestedAchievements: z
    .array(z.string())
    .describe(
      'A list of achievements from the resume that are relevant to the job description.'
    ),
});
export type SuggestSkillsOutput = z.infer<typeof SuggestSkillsOutputSchema>;

export async function suggestSkills(input: SuggestSkillsInput): Promise<SuggestSkillsOutput> {
  return suggestSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSkillsPrompt',
  input: {schema: SuggestSkillsInputSchema},
  output: {schema: SuggestSkillsOutputSchema},
  prompt: `You are an AI assistant that helps users tailor their cover letters to specific job descriptions.

  Given the following job description:
  {{jobDescription}}

  And the following resume:
  {{resume}}

  Suggest skills and achievements from the resume that are most relevant to the job description.
  Skills should be concise (1-3 words).
  Achievements should be re-worded and be in the first person, and highlight how the skill was applied to the role.
  Do not include accomplishments that are not from the resume.
`,
});

const suggestSkillsFlow = ai.defineFlow(
  {
    name: 'suggestSkillsFlow',
    inputSchema: SuggestSkillsInputSchema,
    outputSchema: SuggestSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
