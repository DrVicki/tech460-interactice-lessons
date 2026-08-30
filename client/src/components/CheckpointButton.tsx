import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckpointButtonProps {
  label: string;
  onComplete?: () => void;
  completed?: boolean;
}

export default function CheckpointButton({ 
  label, 
  onComplete,
  completed: initialCompleted = false
}: CheckpointButtonProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!completed) {
      setIsAnimating(true);
      setTimeout(() => {
        setCompleted(true);
        setIsAnimating(false);
        onComplete?.();
      }, 300);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={completed}
      className={cn(
        "gap-2 transition-all duration-300",
        completed 
          ? "bg-[#4a7c59] hover:bg-[#4a7c59] text-white" 
          : "bg-[#1a365d] hover:bg-[#2d4a7a] text-white",
        isAnimating && "scale-95"
      )}
    >
      {completed ? (
        <>
          <CheckCircle2 size={18} />
          Completed
        </>
      ) : (
        <>
          <Circle size={18} />
          {label}
        </>
      )}
    </Button>
  );
}
