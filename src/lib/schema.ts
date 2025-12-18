import { z } from "zod";

export const formSchema = z.object({
  personalInformation: z.object({
    name: z.string().min(1, "Name is required."),
    email: z.string().email("Invalid email address."),
    phone: z.string().min(1, "Phone is required."),
    address: z.string().min(1, "Address is required."),
  }),
  recipientInformation: z.object({
    company: z.string().min(1, "Company name is required."),
    contactName: z.string().min(1, "Hiring manager's name is required."),
    address: z.string().min(1, "Company address is required."),
  }),
  jobDetails: z.object({
    jobTitle: z.string().min(1, "Job title is required."),
    jobDescription: z.string().min(20, "Job description should be more detailed."),
    experienceSummary: z.string().min(20, "Please provide a summary of your experience or upload a resume."),
    relevantSkills: z.string().min(3, "Please list some relevant skills."),
  }),
  templateStyle: z.string().default("classic"),
  tone: z.string().default("professional"),
});
