import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Bot } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TextDetectorProps {
  checkScore: (text: string) => Promise<void>;
  loading: boolean;
  error: string;
}

const TextDetector: React.FC<TextDetectorProps> = ({
  checkScore,
  loading,
  error,
}) => {
  const [text, setText] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    const count = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(count);

    if (count > 0 && count < 256) {
      setValidationError(
        `Text must be at least 256 words. Currently: ${count}`
      );
    } else {
      setValidationError("");
    }
  }, [text]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wordCount < 256) return;
    await checkScore(text);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-indigo-500" />
          AI Text Detector
        </CardTitle>
        <CardDescription>
          Paste text below to check if it was AI-generated
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder="Paste text here to analyze..."
            className="min-h-[120px] mb-4"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {validationError && (
            <div className="flex items-center gap-2 text-yellow-600 text-sm mt-2">
              <AlertCircle className="h-4 w-4" />
              <span>{validationError}</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
              <AlertCircle className="h-4 w-4" />
              <span>Error analyzing text. Please try again.</span>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={loading || wordCount < 256}
          >
            {loading ? "Analyzing..." : "Analyze Text"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TextDetector;
