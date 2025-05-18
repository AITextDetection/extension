
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const TextDetector: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const analyzeText = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    setIsAnalyzing(true);
    setIsError(false);
    
    try {
      // In a real implementation, we would call an AI detection API here
      // For this demo, we'll simulate an analysis with a random result
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Generate a random score between 0 and 100
      // In a real implementation, this would come from the API
      const aiScore = Math.floor(Math.random() * 101);
      setResult(aiScore);
      
      if (aiScore > 70) {
        toast.info("This text appears to be AI-generated");
      } else if (aiScore > 30) {
        toast.info("This text shows mixed signals");
      } else {
        toast.info("This text appears to be human-written");
      }
    } catch (error) {
      console.error("Error analyzing text:", error);
      setIsError(true);
      toast.error("Failed to analyze text. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getResultColor = () => {
    if (result === null) return "bg-gray-200";
    if (result > 70) return "bg-red-500";
    if (result > 30) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getResultText = () => {
    if (result === null) return "No results yet";
    if (result > 70) return "Likely AI generated";
    if (result > 30) return "Possibly AI generated";
    return "Likely human written";
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
        
        {result !== null && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Human Written</span>
              <span>AI Generated</span>
            </div>
            <Progress value={result} className="h-2" />
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm font-medium">{getResultText()}</div>
              <div className="text-sm font-medium">{result}% AI Probability</div>
            </div>
          </div>
        )}

        {isError && (
          <div className="flex items-center gap-2 text-red-500 mt-4">
            <AlertCircle className="h-4 w-4" />
            <span>Error analyzing text. Please try again.</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-indigo-600 hover:bg-indigo-700" 
          onClick={analyzeText}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Text"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TextDetector;
