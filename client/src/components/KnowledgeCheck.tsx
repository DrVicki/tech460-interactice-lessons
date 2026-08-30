import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface KnowledgeCheckProps {
  title: string;
  questions: Question[];
  onComplete?: (score: number, total: number) => void;
}

export default function KnowledgeCheck({ 
  title, 
  questions,
  onComplete 
}: KnowledgeCheckProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setSubmitted(true);
    onComplete?.(correct, questions.length);
  };

  const allAnswered = questions.every(q => answers[q.id] !== undefined);

  return (
    <Card className="bg-white border-[#e2e8f0] shadow-sm">
      <CardHeader className="bg-[#f7fafc] border-b border-[#e2e8f0]">
        <CardTitle className="flex items-center gap-2 text-[#1a365d]">
          <HelpCircle size={24} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {questions.map((q, qIndex) => (
          <div key={q.id} className="space-y-3">
            <p className="font-medium text-[#2d3748]">
              {qIndex + 1}. {q.question}
            </p>
            <RadioGroup
              value={answers[q.id]?.toString()}
              onValueChange={(value) => setAnswers({...answers, [q.id]: parseInt(value)})}
              disabled={submitted}
              className="space-y-2"
            >
              {q.options.map((option, oIndex) => {
                const isCorrect = submitted && oIndex === q.correctAnswer;
                const isWrong = submitted && answers[q.id] === oIndex && oIndex !== q.correctAnswer;
                
                return (
                  <div 
                    key={oIndex}
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg border transition-colors",
                      !submitted && "hover:bg-[#f7fafc] border-[#e2e8f0]",
                      isCorrect && "bg-[#f0fff4] border-[#4a7c59]",
                      isWrong && "bg-[#fff5f5] border-[#c53030]"
                    )}
                  >
                    <RadioGroupItem value={oIndex.toString()} id={`${q.id}-${oIndex}`} />
                    <Label 
                      htmlFor={`${q.id}-${oIndex}`}
                      className="flex-1 cursor-pointer text-[#4a5568]"
                    >
                      {option}
                    </Label>
                    {isCorrect && <CheckCircle2 size={20} className="text-[#4a7c59]" />}
                    {isWrong && <XCircle size={20} className="text-[#c53030]" />}
                  </div>
                );
              })}
            </RadioGroup>
            {submitted && q.explanation && (
              <div className="mt-2 p-3 bg-[#ebf8ff] border border-[#90cdf4] rounded-lg">
                <p className="text-sm text-[#2c5282]">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </div>
            )}
          </div>
        ))}

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="w-full bg-[#1a365d] hover:bg-[#2d4a7a] text-white"
          >
            Submit Answers
          </Button>
        ) : (
          <div className={cn(
            "p-4 rounded-lg text-center",
            score === questions.length 
              ? "bg-[#f0fff4] border border-[#4a7c59]" 
              : "bg-[#fffbeb] border border-[#d69e2e]"
          )}>
            <p className="text-lg font-semibold text-[#2d3748]">
              You scored {score} out of {questions.length}
            </p>
            {score === questions.length ? (
              <p className="text-[#4a7c59] mt-1">Excellent work! You've mastered this section.</p>
            ) : (
              <p className="text-[#d69e2e] mt-1">Review the explanations above and try again.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
