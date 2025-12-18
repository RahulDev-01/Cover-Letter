"use client";

import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type CoverLetterPreviewProps = {
  generatedContent: string;
  isLoading: boolean;
};

const ClassicTemplate = ({ data, generatedContent }: { data: any, generatedContent: string }) => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  return (
    <div className="font-body text-sm text-gray-800 dark:text-gray-300 space-y-6">
      <div className="text-right">
        <p className="font-bold font-headline text-base text-gray-900 dark:text-gray-100">{data.personalInformation.name || "Your Name"}</p>
        <p>{data.personalInformation.address || "Your Address"}</p>
        <p>{data.personalInformation.phone || "Your Phone"}</p>
        <p>{data.personalInformation.email || "your.email@example.com"}</p>
      </div>

      <div>
        <p>{currentDate}</p>
      </div>

      <div>
        <p className="font-bold">{data.recipientInformation.contactName || "Hiring Manager"}</p>
        <p>{data.recipientInformation.company || "Company Name"}</p>
        <p>{data.recipientInformation.address || "Company Address"}</p>
      </div>

      <div>
        <p>Dear {data.recipientInformation.contactName || "Hiring Manager"},</p>
      </div>

      <div className="space-y-4 whitespace-pre-wrap text-justify">
        {generatedContent || (
          <p className="text-muted-foreground">
            Your AI-generated cover letter will appear here. Fill out the form and click "Generate with AI".
          </p>
        )}
      </div>
      
      <div>
        <p>Sincerely,</p>
        <p className="mt-4 h-12">{/* Space for signature */}</p>
        <p>{data.personalInformation.name || "Your Name"}</p>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-end items-end flex-col gap-1">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-44" />
    </div>
    <Skeleton className="h-4 w-32" />
     <div className="flex flex-col gap-1">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-48" />
    </div>
    <Skeleton className="h-4 w-40" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[90%]" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[95%]" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[85%]" />
    </div>
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-4 w-32 mt-8" />
  </div>
);

export function CoverLetterPreview({
  generatedContent,
  isLoading,
}: CoverLetterPreviewProps) {
  const { watch } = useFormContext();
  const formData = watch();

  const handleDownload = () => {
    window.print();
  };

  return (
    <Card className="shadow-lg sticky top-8">
      <CardHeader className="flex-row items-center justify-between no-print">
        <CardTitle className="font-headline text-3xl">Preview</CardTitle>
        <Button variant="outline" size="sm" onClick={handleDownload} disabled={!generatedContent}>
          <FileDown className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardHeader>
      <CardContent>
        <div id="printable-content" className="bg-white dark:bg-card p-8 rounded-md min-h-[80vh] border border-border/80 shadow-inner">
            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <ClassicTemplate data={formData} generatedContent={generatedContent} />
            )}
        </div>
      </CardContent>
    </Card>
  );
}
