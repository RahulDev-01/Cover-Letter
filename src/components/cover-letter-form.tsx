"use client";

import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2, Wand2, Search, Bot, Upload } from "lucide-react";

type CoverLetterFormProps = {
  onGenerate: () => void;
  onSuggestSkills: () => void;
  onOptimize: () => void;
  onExtractResume: (file: File) => void;
  isGenerating: boolean;
  isSuggesting: boolean;
  isOptimizing: boolean;
  isExtracting: boolean;
};

export function CoverLetterForm({
  onGenerate,
  onSuggestSkills,
  onOptimize,
  onExtractResume,
  isGenerating,
  isSuggesting,
  isOptimizing,
  isExtracting,
}: CoverLetterFormProps) {
  const form = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoading = isGenerating || isSuggesting || isOptimizing || isExtracting;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onExtractResume(file);
    }
    // Reset file input to allow uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">
          Craft Your Cover Letter
        </CardTitle>
        <CardDescription>
          Fill in the details below and let our AI assist you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onGenerate} className="space-y-8">
          <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]} className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-headline text-lg">
                Personal Information
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="personalInformation.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="personalInformation.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personalInformation.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="personalInformation.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St, Anytown, USA"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-headline text-lg">
                Recipient Information
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="recipientInformation.company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientInformation.contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hiring Manager Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientInformation.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="456 Corporate Ave, Business City"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-headline text-lg">
                Job Details
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="jobDetails.jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobDetails.jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste the job description here..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobDetails.experienceSummary"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Experience Summary / Resume</FormLabel>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".txt,.pdf,.doc,.docx"
                        />
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isLoading}
                          className="pr-0"
                        >
                          {isExtracting ? (
                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                             <Upload className="mr-2 h-4 w-4" />
                          )}
                          {isExtracting ? "Extracting..." : "Extract from Resume"}
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Summarize your relevant experience, paste your resume text, or upload a resume to have AI do it for you."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobDetails.relevantSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relevant Skills</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List key skills like 'React, Node.js, Project Management...'"
                          {...field}
                        />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-2">
             <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" disabled={isLoading}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 />
              )}
              {isGenerating ? "Generating..." : "Generate with AI"}
            </Button>
            <div className="grid grid-cols-2 gap-2">
                <Button type="button" variant="secondary" onClick={onSuggestSkills} disabled={isLoading}>
                    {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search />}
                    {isSuggesting ? "Analyzing..." : "Suggest Skills"}
                </Button>
                <Button type="button" variant="secondary" onClick={onOptimize} disabled={isLoading}>
                    {isOptimizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot />}
                    {isOptimizing ? "Optimizing..." : "Optimize for ATS"}
                </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
