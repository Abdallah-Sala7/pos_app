import { Loader2Icon } from "lucide-react";

function LoadingPage() {
  return (
    <div className="bg-background w-full h-full flex items-center justify-center p-8">
      <div className="shrink-0 flex flex-col justify-center items-center p-4 rounded-lg bg-accent shadow-2xl shadow-gray-800/10">
        <Loader2Icon size={45} />
      </div>
    </div>
  );
}

export default LoadingPage;
