// imports for nextjs server req and req
import { NextRequest, NextResponse } from 'next/server';
// imports for the file-type package used to detect file type
import { fileTypeFromBuffer } from 'file-type';

// 1. GET requet to /bfhl route returns static json response.
export async function GET() {
    return NextResponse.json({ operation_code: 1 }, { status: 200 });
}

// 2. POST request to /bfhl route returns processed data.
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { data, file_b64 } = body;

        // extact numbers and alphabets from data
        const numbers = data.filter((item: string) => !isNaN(Number(item)));
        const alphabets = data.filter((item: string) => isNaN(Number(item)));
        const lowercaseAlphabets = alphabets.filter((char: string) => char.toLowerCase() === char);
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];
        const isPrimeFound = numbers.some((num: string) => isPrime(Number(num)));

        // validate and process the file if provided
        let fileValid = false;    // default false
        let fileMimeType = '';
        let fileSizeKb = '';

        // if file present in base64 format, decode and check file type
        if (file_b64) {
            try {
                const buffer = Buffer.from(file_b64, 'base64');
                const fileType = await fileTypeFromBuffer(buffer);

                if (fileType) {
                    fileValid = true;
                    fileMimeType = fileType.mime;
                    fileSizeKb = (buffer.length / 1024).toFixed(2);
                }
            } catch (error) {
                fileValid = false;
            }
        }


        // response object
        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123", 
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet,
            is_prime_found: isPrimeFound,
            file_valid: fileValid,
            ...(fileValid && {
                file_mime_type: fileMimeType,
                file_size_kb: fileSizeKb
            })
        };

        // return response
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        // return error response
        return NextResponse.json({ is_success: false, error: 'Invalid input' }, { status: 400 });
    }
}

// utility function to check if a number is prime
function isPrime(num: number): boolean {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}