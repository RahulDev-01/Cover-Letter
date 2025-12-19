import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-skills.ts';
import '@/ai/flows/optimize-for-ats.ts';
import '@/ai/flows/generate-cover-letter.ts';
import '@/ai/flows/extract-resume-data';
import '@/ai/flows/extract-job-data';
