"use client";

import { useFormContext } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Image as ImageIcon, FileText } from "lucide-react";
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

  const getSalutation = () => {
    if (data.recipientInformation.contactName) {
      const lastName = data.recipientInformation.contactName.split(' ').pop();
      return `Dear Mr./Ms. ${lastName},`;
    }
    return "Dear Hiring Manager,";
  };

  return (
    <div className="font-body text-sm text-foreground space-y-8 bg-white p-12">
      <div className="flex justify-between items-start border-b border-black pb-4">
        <h1 className="text-5xl font-headline font-bold text-primary tracking-widest">
          {data.personalInformation.name?.toUpperCase() || "YOUR NAME"}
        </h1>
        <div className="text-right text-xs text-primary">
          <p>{data.personalInformation.email || "your.email@example.com"}</p>
          <p>{data.personalInformation.phone || "Your Phone"}</p>
        </div>
      </div>

      <div className="space-y-4">
        <p>{currentDate}</p>
        <div>
          {data.recipientInformation.contactName && (
            <>
                <p className="font-bold text-base font-headline">{data.recipientInformation.contactName?.toUpperCase()}</p>
                <div className="w-10 border-b-2 border-black my-1"></div>
            </>
          )}
          <p>{data.recipientInformation.company ? `Hiring Team @ ${data.recipientInformation.company}` : "Recipient Title"}</p>
          <p>{data.recipientInformation.address || "Company Address"}</p>
        </div>
      </div>

      <div>
        <p>{getSalutation()}</p>
      </div>

      <div className="space-y-4 whitespace-pre-wrap text-justify leading-relaxed">
        {generatedContent || (
          <p className="text-muted-foreground">
            Your AI-generated cover letter will appear here. Fill out the form and click "Generate with AI".
          </p>
        )}
      </div>
      
      <div>
        <p>Best Regards,</p>
        <p className="mt-8 font-headline text-lg">{data.personalInformation.name || "Your Name"}</p>
      </div>
      <div className="border-b border-black"></div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-6 p-12">
     <div className="flex justify-between items-start border-b border-muted pb-4">
        <Skeleton className="h-12 w-1/2" />
        <div className="text-right space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-32" />
        </div>
     </div>
    <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
         <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
           <Skeleton className="h-1 w-10" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-48" />
        </div>
    </div>
    
    <Skeleton className="h-4 w-32" />
    
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
    <Skeleton className="h-5 w-32 mt-8" />
  </div>
);

export function CoverLetterPreview({
  generatedContent,
  isLoading,
}: CoverLetterPreviewProps) {
  const { watch } = useFormContext();
  const formData = watch();
  const printableRef = useRef<HTMLDivElement>(null);

  const downloadAs = async (format: 'pdf' | 'png') => {
    const element = printableRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
    });

    if (format === 'pdf') {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('cover-letter.pdf');
    } else if (format === 'png') {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'cover-letter.png';
      link.click();
    }
  };


  return (
    <Card className="shadow-lg sticky top-8 bg-card">
      <CardHeader className="flex-row items-center justify-between no-print">
        <CardTitle className="font-headline text-3xl">Preview</CardTitle>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={!generatedContent}>
                <FileDown className="mr-2 h-4 w-4" />
                Download
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => downloadAs('pdf')}>
                    <FileText className="mr-2 h-4 w-4" />
                    PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadAs('png')}>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Image (PNG)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="bg-background p-8 rounded-md min-h-[80vh] border border-border/80 shadow-inner overflow-hidden">
            <div ref={printableRef} id="printable-content">
                {isLoading ? (
                    <div className="bg-white"><LoadingSkeleton /></div>
                ) : (
                    <ClassicTemplate data={formData} generatedContent={generatedContent} />
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
