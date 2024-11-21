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

