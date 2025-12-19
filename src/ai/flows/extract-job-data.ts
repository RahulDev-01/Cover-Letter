'use server';

/**
 * @fileOverview A flow to extract job data from a job posting.
 *
 * - extractJobData - A function that extracts data from a job posting.
 * - ExtractJobDataInput - The input type for the extractJobData function.
 * - ExtractJobDataOutput - The return type for the extractJobData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractJobDataInputSchema = z.object({
  jobPosting: z.string().describe('The full text of the job posting.'),
});
export type ExtractJobDataInput = z.infer<typeof ExtractJobDataInputSchema>;

const ExtractJobDataOutputSchema = z.object({
  company: z.string().describe('The name of the company.'),
  jobTitle: z.string().describe('The title of the job.'),
  address: z
    .string()
    .describe('The location or address of the company/job.'),
});
export type ExtractJobDataOutput = z.infer<typeof ExtractJobDataOutputSchema>;

export async function extractJobData(
  input: ExtractJobDataInput
): Promise<ExtractJobDataOutput> {
  return extractJobDataFlow(input);
}

const extractJobDataPrompt = ai.definePrompt({
  name: 'extractJobDataPrompt',
  input: {schema: ExtractJobDataInputSchema},
  output: {schema: ExtractJobDataOutputSchema},
  prompt: `You are an expert at parsing job descriptions. Extract the company name, job title, and company address from the following job posting text.

If an exact address isn't available, use the general location (e.g., "San Francisco, CA").

Job Posting:
{{{jobPosting}}}
`,
});

const extractJobDataFlow = ai.defineFlow(
  {
    name: 'extractJobDataFlow',
    inputSchema: ExtractJobDataInputSchema,
    outputSchema: ExtractJobDataOutputSchema,
  },
  async input => {
    const {output} = await extractJobDataPrompt(input);
    return output!;
  }
);
