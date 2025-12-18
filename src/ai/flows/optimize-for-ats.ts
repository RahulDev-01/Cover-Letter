'use server';

/**
 * @fileOverview A flow to optimize a cover letter for Applicant Tracking Systems (ATS).
 *
 * - optimizeForAts - A function that optimizes a cover letter for ATS.
 * - OptimizeForAtsInput - The input type for the optimizeForAts function.
 * - OptimizeForAtsOutput - The return type for the optimizeForAts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeForAtsInputSchema = z.object({
  coverLetter: z
    .string()
    .describe('The cover letter to optimize for Applicant Tracking Systems.'),
  jobDescription: z.string().describe('The job description to analyze.'),
});
export type OptimizeForAtsInput = z.infer<typeof OptimizeForAtsInputSchema>;

const OptimizeForAtsOutputSchema = z.object({
  optimizedCoverLetter: z
    .string()
    .describe('The cover letter optimized for Applicant Tracking Systems.'),
  keywords: z.array(z.string()).describe('The keywords identified in the job description.'),
});
export type OptimizeForAtsOutput = z.infer<typeof OptimizeForAtsOutputSchema>;

export async function optimizeForAts(input: OptimizeForAtsInput): Promise<OptimizeForAtsOutput> {
  return optimizeForAtsFlow(input);
}

const optimizeForAtsPrompt = ai.definePrompt({
  name: 'optimizeForAtsPrompt',
  input: {schema: OptimizeForAtsInputSchema},
  output: {schema: OptimizeForAtsOutputSchema},
  prompt: `You are an expert at optimizing cover letters for Applicant Tracking Systems (ATS).

  Analyze the following job description and identify the most important keywords. Incorporate these keywords naturally into the cover letter to increase its chances of being noticed by the ATS.

  Job Description: {{{jobDescription}}}

  Cover Letter: {{{coverLetter}}}

  Return the optimized cover letter, highlighting how you incorporated the keywords. Also, list the keywords that you identified from the job description.

  Ensure the optimized cover letter maintains a professional tone and remains grammatically correct.
  `,
});

const optimizeForAtsFlow = ai.defineFlow(
  {
    name: 'optimizeForAtsFlow',
    inputSchema: OptimizeForAtsInputSchema,
    outputSchema: OptimizeForAtsOutputSchema,
  },
  async input => {
    const {output} = await optimizeForAtsPrompt(input);
    return output!;
  }
);
