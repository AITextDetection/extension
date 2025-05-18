import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Bot } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <CardContent>
        <Textarea
          placeholder="Paste text here to analyze..."
          className="min-h-[120px] mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {error && (
          <div className="flex items-center gap-2 text-red-500 mt-4">
            <AlertCircle className="h-4 w-4" />
            <span>Error analyzing text. Please try again.</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Text"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TextDetector;
