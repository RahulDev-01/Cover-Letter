"use server";

import { generateCoverLetter, type CoverLetterInput } from "@/ai/flows/generate-cover-letter";
import { suggestSkills, type SuggestSkillsInput } from "@/ai/flows/suggest-skills";
import { optimizeForAts, type OptimizeForAtsInput } from "@/ai/flows/optimize-for-ats";
import { extractResumeData, type ExtractResumeDataInput } from "@/ai/flows/extract-resume-data";
import { formSchema } from "./schema";

export async function generateAction(input: CoverLetterInput) {
  const validatedInput = formSchema.safeParse(input);
  if (!validatedInput.success) {
    throw new Error("Invalid input");
  }

  try {
    const output = await generateCoverLetter(validatedInput.data);
    return output;
  } catch (error) {
    console.error("Error in generateCoverLetter flow:", error);
    throw new Error("Failed to generate cover letter.");
  }
}

export async function suggestSkillsAction(input: SuggestSkillsInput) {
  try {
    const output = await suggestSkills(input);
    return output;
  } catch (error) {
    console.error("Error in suggestSkills flow:", error);
    throw new Error("Failed to suggest skills.");
  }
}

export async function optimizeAtsAction(input: OptimizeForAtsInput) {
  try {
    const output = await optimizeForAts(input);
    return output;
  } catch (error) {
    console.error("Error in optimizeForAts flow:", error);
    throw new Error("Failed to optimize for ATS.");
  }
}

export async function extractResumeAction(input: ExtractResumeDataInput) {
  try {
    const output = await extractResumeData(input);
    return output;
  } catch (error) {
    console.error("Error in extractResumeData flow:", error);
    throw new Error("Failed to extract data from resume.");
  }
}
