"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Head from "next/head";

interface ResponseData {
  alphabets: string[];
  numbers: string[];
  highest_lowercase_alphabet: string[];
  file_valid: boolean;
  file_mime_type?: string;
  file_size_kb?: string;
}

export default function BFHLTask() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    numbers: false,
    alphabets: false,
    highestLowercase: false,
  });

  const [response, setResponse] = useState<ResponseData | null>(null);

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
      console.error(err);
      setError("Invalid JSON input");
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Filtered Response</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedOptions.numbers && (
            <div>
              <strong>Numbers:</strong> {response.numbers.join(", ")}
            </div>
          )}
          {selectedOptions.alphabets && (
            <div>
              <strong>Alphabets:</strong> {response.alphabets.join(", ")}
            </div>
          )}
          {selectedOptions.highestLowercase && (
            <div>
              <strong>Highest Lowercase Alphabet:</strong>{" "}
              {response.highest_lowercase_alphabet.join(", ")}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderFileInfo = () => {
    if (!response || !response.file_valid) return null;

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>File Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>File is valid and present.</p>
          <p>MIME Type: {response.file_mime_type}</p>
          <p>Size: {response.file_size_kb} KB</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>ABCD123</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Bajaj Finserv Health Dev Challenge</h1>

      <h2 className="text-xl font-semibold mb-2">Enter Json data: </h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <Input
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON (e.g., { "data": ["A","C","z"], "file_b64": "..." })'
          className="mb-2"
        />
        <Button type="submit" className="bg-blue-600">Submit</Button>
        <br />
      </form>
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      {response && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Multi Filter</h2>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <Checkbox
                checked={selectedOptions.numbers}
                onCheckedChange={(checked) =>
                  setSelectedOptions({ ...selectedOptions, numbers: checked as boolean })
                }
              />
              <span className="ml-2">Numbers</span>
            </label>
            <label className="flex items-center">
              <Checkbox
                checked={selectedOptions.alphabets}
                onCheckedChange={(checked) =>
                  setSelectedOptions({ ...selectedOptions, alphabets: checked as boolean })
                }
              />
              <span className="ml-2">Alphabets</span>
            </label>
            <label className="flex items-center">
              <Checkbox
                checked={selectedOptions.highestLowercase}
                onCheckedChange={(checked) =>
                  setSelectedOptions({ ...selectedOptions, highestLowercase: checked as boolean })
                }
              />
              <span className="ml-2">Highest Lowercase</span>
            </label>
          </div>
        </div>
      )}
      {renderFilteredResponse()}
      {renderFileInfo()}
    </div>
  );
}
