# BFHL Task Application

This is a Next.js application that implements the Bajaj Finserv Health Dev Challenge (Qualifier 1). It includes both a backend API and a frontend interface for processing and displaying data.

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- file-type npm package for MIME type detection

## API Endpoints

### GET /api/bfhl

Returns a simple operation code.

Response:
```json
{
  "operation_code": 1
}

POST /api/bfhl
Processes input data and optionally a file.

Payload with file:
{
  "data": ["M","1","334","4","B","Z","a","7"],
  "file_b64":"BASE_64_STRING"
}



Payload without file:
{
  "data": ["A","C","Z","c","i"]
}



Response includes processed data such as numbers, alphabets, highest lowercase alphabet, and prime number detection. If a file is included, it also provides file information.

Frontend
The frontend provides a user interface for submitting JSON data, which is then processed by the API. It includes:

JSON input field
Multi-select dropdown for filtering results
Display of processed data based on user selection
File information display (when applicable)
Getting Started
Clone the repository
Install dependencies: npm install
Run the development server: npm run dev
Open http://localhost:3000 in your browser
Deployment
This project is ready for deployment on platforms like Vercel, Netlify, or any other Next.js-compatible hosting service.


This README provides an overview of the project, its tech stack, API endpoints with example payloads, and instructions for getting started. It covers both the backend and frontend aspects of the application.
