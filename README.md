# BFHL Task Application

This is a Next.js application that implements the Bajaj Finserv Health Dev Challenge (Qualifier 1). It includes both a backend API and a frontend interface for processing and displaying data.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- file-type npm package for MIME type detection

## Deployment Endpoint-

https://bfhl-ashutosh7i.vercel.app/

### GET /api/bfhl

Returns a simple operation code.

Response:

```
{
  "operation_code": 1
}
```

### POST /api/bfhl

Processes input data and optionally a file.

Payload without file:
```
{
  "data": ["M","1","334","4","B","Z","a","7"],
  "file_b64":"BASE_64_STRING"
}
```

Response:
```
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "numbers": ["1","334","4","7"],
  "alphabets": ["M","B","Z","a"],
  "highest_lowercase_alphabet": ["a"],
  "is_prime_found": true,
  "file_valid": false
}
```
Payload with file:
```
{
  "data": ["M","1","334","4","B","Z","a","7"],
  "file_b64":"R0lGODlhAQABAAAAACw="
}
```
Response:
```
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "numbers": ["1","334","4","7"],
  "alphabets": ["M","B","Z","a"],
  "highest_lowercase_alphabet": ["a"],
  "is_prime_found": true,
  "is_prime_found": true,
  "file_valid": true,
  "file_mime_type": "image/gif",
  "file_size_kb": "0.01"
}
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Stats
this assignment was made under 2 hrs.

[![wakatime](https://wakatime.com/badge/user/62850a07-caf8-470f-86a7-660093b4f5b4/project/e87e5701-4c9e-4a51-8dc6-08789119a434.svg)](https://wakatime.com/badge/user/62850a07-caf8-470f-86a7-660093b4f5b4/project/e87e5701-4c9e-4a51-8dc6-08789119a434)