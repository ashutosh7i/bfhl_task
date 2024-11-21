"use client";

// imports
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Head from "next/head";

export default function BFHLTask() {
  // states
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  interface ResponseData {
    alphabets: string[];
    numbers: string[];
    highest_lowercase_alphabet: string;
    file_valid: boolean;
    file_mime_type?: string;
    file_size_kb?: number;
  }

  const [response, setResponse] = useState<ResponseData | null>(null);

  interface RenderedResponse {
    alphabets?: string[];
    numbers?: string[];
    highest_lowercase_alphabet?: string;
  }

  // function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch("/api/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError("Invalid JSON input");
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    let renderedResponse: RenderedResponse = {};
    if (selectedOptions.includes("alphabets"))
      renderedResponse.alphabets = response.alphabets;
    if (selectedOptions.includes("numbers"))
      renderedResponse.numbers = response.numbers;
    if (selectedOptions.includes("highestLowercase"))
      renderedResponse.highest_lowercase_alphabet =
        response.highest_lowercase_alphabet;

    return <pre>{JSON.stringify(renderedResponse, null, 2)}</pre>;
  };

  const renderFileInfo = () => {
    if (!response || !response.file_valid) return null;

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>File Information</CardTitle>
          <CardContent>
            <p>File is valid and present.</p>
          </CardContent>
        </CardHeader>
        <CardContent>
          <p>MIME Type: {response.file_mime_type}</p>
          <p>Size: {response.file_size_kb} KB</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>ABCD123</title> {/* Replace with your actual roll number */}
      </Head>
      <h1 className="text-2xl font-bold mb-4">BFHL Task</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <Input
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON (e.g., { "data": ["A","C","z"], "file_b64": "..." })'
          className="mb-2"
        />
        <Button type="submit">Submit</Button>
      </form>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {response && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Select Options to Display:
          </h2>
          <Select
            value={selectedOptions.join(',')}
            onValueChange={(value) => setSelectedOptions(value.split(','))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select options" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alphabets">Alphabets</SelectItem>
              <SelectItem value="numbers">Numbers</SelectItem>
              <SelectItem value="highestLowercase">
                Highest Lowercase Alphabet
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      {renderResponse()}
      {renderFileInfo()}
    </div>
  );
}
