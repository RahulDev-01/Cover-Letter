# Cover Letter Pro

Welcome to **Cover Letter Pro**, an AI-powered application designed to streamline the process of creating professional and effective cover letters.

This application is built with Next.js, TypeScript, and Tailwind CSS, leveraging the power of Genkit for its AI capabilities.

## Features

- **📄 AI-Powered Cover Letter Generation**: Simply fill in your personal information, the recipient's details, and the job description, and let our AI generate a compelling cover letter for you.
- **🤖 ATS Optimization**: Optimize your generated cover letter for Applicant Tracking Systems (ATS) with a single click, increasing your chances of getting noticed.
- **✨ AI Skill Suggestions**: Get AI-powered suggestions for skills and achievements to highlight based on the job description and your resume.
- **📂 Resume Data Extraction**: Upload your resume (PDF, DOCX, TXT) and have the AI automatically extract your work experience and skills to populate the form fields.
- **🎨 Template Customization**: The generated letter is presented in a clean, professional template.
- **📥 Download Options**: Download your final cover letter as a PDF or a PNG image, ready to be sent.

## Getting Started

The main application logic can be found in `src/app/page.tsx`. The AI flows that power the generative features are located in the `src/ai/flows/` directory.

To run the application locally:

1.  Install the dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.
