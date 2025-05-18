
import React from "react";
import TextDetector from "@/components/TextDetector";
import Logo from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-[500px] w-[400px] bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center p-4">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Logo size={32} />
        <h1 className="text-2xl font-bold text-slate-800">AI Text Detector</h1>
      </div>
      
      <div className="w-full max-w-md">
        <TextDetector />
      </div>
      
      <div className="mt-4 text-xs text-center text-slate-500">
        <p>This extension analyzes text patterns to estimate AI probability.</p>
        <p className="mt-1">Results are for informational purposes only.</p>
      </div>
    </div>
  );
};

export default Index;
