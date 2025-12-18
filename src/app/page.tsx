"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  generateAction,
  suggestSkillsAction,
  optimizeAtsAction,
  extractResumeAction,
} from "@/lib/actions";
import { formSchema } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { CoverLetterForm } from "@/components/cover-letter-form";
import { CoverLetterPreview } from "@/components/cover-letter-preview";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

type Suggestions = {
  suggestedSkills: string[];
  suggestedAchievements: string[];
};

export default function Home() {
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      personalInformation: {
        name: "",
        email: "",
        phone: "",
        address: "",
      },
      recipientInformation: {
        company: "",
        contactName: "",
        address: "",
      },
      jobDetails: {
        jobTitle: "",
        jobDescription: "",
        experienceSummary: "",
        relevantSkills: "",
      },
      templateStyle: "classic",
      tone: "professional",
    },
  });

  const handleGenerate = async (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setGeneratedLetter("");
    try {
      const result = await generateAction(values);
      if (result.coverLetter) {
        setGeneratedLetter(result.coverLetter);
        toast({
          title: "Success!",
          description: "Your cover letter has been generated.",
        });
      } else {
        throw new Error("Failed to generate cover letter.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "There was a problem generating your cover letter. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestSkills = async () => {
    setIsSuggesting(true);
    try {
      const { jobDescription, experienceSummary } = form.getValues().jobDetails;
      if (!jobDescription || !experienceSummary) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description:
            "Please fill out the job description and experience summary first.",
        });
        return;
      }
      const result = await suggestSkillsAction({
        jobDescription,
        resume: experienceSummary,
      });
      setSuggestions(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "There was a problem suggesting skills. Please try again.",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleOptimize = async () => {
    if (!generatedLetter) {
      toast({
        variant: "destructive",
        title: "No Cover Letter",
        description: "Please generate a cover letter before optimizing.",
      });
      return;
    }
    setIsOptimizing(true);
    try {
      const { jobDescription } = form.getValues().jobDetails;
      const result = await optimizeAtsAction({
        coverLetter: generatedLetter,
        jobDescription,
      });
      setGeneratedLetter(result.optimizedCoverLetter);
      toast({
        title: "Cover Letter Optimized!",
        description: (
          <div>
            <p>Keywords incorporated:</p>
            <p className="text-xs text-muted-foreground">
              {result.keywords.join(", ")}
            </p>
          </div>
        ),
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "There was a problem optimizing your cover letter. Please try again.",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleExtractResume = async (file: File) => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a resume file to upload.',
      });
      return;
    }

    setIsExtracting(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const resumeContent = e.target?.result as string;
        if (!resumeContent) {
          throw new Error('Could not read file content.');
        }
        const result = await extractResumeAction({ resumeContent });
        form.setValue('jobDetails.experienceSummary', result.experienceSummary, { shouldValidate: true });
        form.setValue('jobDetails.relevantSkills', result.skills.join(', '), { shouldValidate: true });
        toast({
          title: 'Resume Extracted!',
          description: 'Your experience summary and skills have been populated.',
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'There was a problem extracting data from your resume.',
        });
      } finally {
        setIsExtracting(false);
      }
    };
    reader.onerror = () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to read the selected file.',
      });
      setIsExtracting(false);
    };
    reader.readAsText(file);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
    });
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 p-4 md:p-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-screen-2xl mx-auto">
            <CoverLetterForm
              onGenerate={form.handleSubmit(handleGenerate)}
              onSuggestSkills={handleSuggestSkills}
              onOptimize={handleOptimize}
              onExtractResume={handleExtractResume}
              isGenerating={isGenerating}
              isSuggesting={isSuggesting}
              isOptimizing={isOptimizing}
              isExtracting={isExtracting}
            />
            <CoverLetterPreview
              generatedContent={generatedLetter}
              isLoading={isGenerating || isOptimizing}
            />
          </div>
        </main>
      </div>
      <AlertDialog open={!!suggestions} onOpenChange={() => setSuggestions(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>AI-Suggested Skills & Achievements</AlertDialogTitle>
            <AlertDialogDescription>
              Based on the job description, here are some relevant points from
              your experience. Consider adding them to your "Relevant Skills"
              section or weaving them into your letter.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-4">
            <div>
              <h4 className="font-bold mb-2 font-headline">Suggested Skills</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions?.suggestedSkills.map((skill, i) => (
                  <Button
                    key={`skill-${i}`}
                    variant="secondary"
                    size="sm"
                    onClick={() => copyToClipboard(skill)}
                    className="group"
                  >
                    {skill}
                    <Copy className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-2 font-headline">
                Suggested Achievements
              </h4>
              <ul className="space-y-2">
                {suggestions?.suggestedAchievements.map((ach, i) => (
                  <li
                    key={`ach-${i}`}
                    className="text-sm p-2 border rounded-md flex justify-between items-start gap-2"
                  >
                    <span>{ach}</span>
                     <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 flex-shrink-0"
                      onClick={() => copyToClipboard(ach)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setSuggestions(null)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FormProvider>
  );
}
