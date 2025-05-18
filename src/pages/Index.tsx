import TextDetector from "@/components/TextDetector";
import Logo from "@/components/Logo";
import SegmentedParagraph from "@/components/SegmentedParagraph";
import { useCheckScore } from "@/hooks/useData";

const Index = () => {
  const { data, checkScore, loading, error } = useCheckScore();

  return (
    <div className="min-h-[500px] w-[400px] bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center p-4">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Logo size={32} />
        <h1 className="text-2xl font-bold text-slate-800">AI Text Detector</h1>
      </div>

      <div className="w-full max-w-md">
        <TextDetector checkScore={checkScore} loading={loading} error={error} />
        {error && (
          <div className="text-center text-red-700">Something went wrong</div>
        )}
        {data && !loading && (
          <div className="mt-16 animate-fade-in">
            <SegmentedParagraph data={data} />
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-center text-slate-500">
        <p>This extension analyzes text patterns to estimate AI probability.</p>
        <p className="mt-1">Results are for informational purposes.</p>
      </div>
    </div>
  );
};

export default Index;
