'use server';

/**
 * @fileOverview A flow to extract data from a resume.
 *
 * - extractResumeData - A function that extracts data from a resume.
 * - ExtractResumeDataInput - The input type for the extractResumeData function.
 * - ExtractResumeDataOutput - The return type for the extractResumeData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractResumeDataInputSchema = z.object({
  resumeContent: z.string().describe('The text content of the resume.'),
});
export type ExtractResumeDataInput = z.infer<
  typeof ExtractResumeDataInputSchema
>;

const ExtractResumeDataOutputSchema = z.object({
  experienceSummary: z
    .string()
    .describe('A summary of the work experience from the resume.'),
});
export type ExtractResumeDataOutput = z.infer<
  typeof ExtractResumeDataOutputSchema
>;

export async function extractResumeData(
  input: ExtractResumeDataInput
): Promise<ExtractResumeDataOutput> {
  return extractResumeDataFlow(input);
}

const extractResumeDataPrompt = ai.definePrompt({
  name: 'extractResumeDataPrompt',
  input: {schema: ExtractResumeDataInputSchema},
  output: {schema: ExtractResumeDataOutputSchema},
  prompt: `You are an expert at parsing resumes. Extract the work experience from the following resume text and provide a comprehensive summary. The summary should be written in the first person and be suitable for a cover letter's experience summary section.

Resume Text:
{{{resumeContent}}}
`,
});

const extractResumeDataFlow = ai.defineFlow(
  {
    name: 'extractResumeDataFlow',
    inputSchema: ExtractResumeDataInputSchema,
    outputSchema: ExtractResumeDataOutputSchema,
  },
  async input => {
    const {output} = await extractResumeDataPrompt(input);
    return output!;
  }
);
