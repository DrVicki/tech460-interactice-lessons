import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SectionCard from "@/components/SectionCard";
import CheckpointButton from "@/components/CheckpointButton";
import { 
  ArrowLeft,
  CheckCircle2,
  Award,
  ClipboardCheck,
  Calendar,
  BookOpen,
  MessageSquare,
  Code2,
  Terminal,
  Send
} from "lucide-react";

export default function ModuleCompletion() {
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [surveyResponses, setSurveyResponses] = useState({
    pace: "",
    difficulty: "",
    clarity: "",
    feedback: ""
  });
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tech460-module1-progress");
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedSections(data.completed || []);
      setProgress(data.progress || 0);
    }
  }, []);

  const sections = [
    { path: "/overview", label: "Module Overview", icon: BookOpen },
    { path: "/career", label: "Career Foundations", icon: Award },
    { path: "/codesignal", label: "CodeSignal Platform", icon: Terminal },
    { path: "/python", label: "Python Lists", icon: Code2 },
  ];

  const allComplete = sections.every(s => completedSections.includes(s.path));

  const handleSurveySubmit = () => {
    if (surveyResponses.pace && surveyResponses.difficulty && surveyResponses.clarity) {
      setSurveySubmitted(true);
      const saved = localStorage.getItem("tech460-module1-progress");
      const data = saved ? JSON.parse(saved) : { completed: [] };
      if (!data.completed.includes("/completion")) {
        data.completed.push("/completion");
        localStorage.setItem("tech460-module1-progress", JSON.stringify(data));
      }
    }
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[#4a5568] mb-4">
            <Link href="/" className="hover:text-[#1a365d]">Home</Link>
            <span>/</span>
            <span className="text-[#1a365d]">Module Completion</span>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#4a7c59] text-white">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1a365d]">
                Complete Module 1
              </h1>
              <p className="text-[#4a5568]">Estimated time: 10 minutes</p>
            </div>
          </div>
          
          <p className="text-lg text-[#4a5568] leading-relaxed">
            Congratulations on reaching the final section! Review your progress, complete the 
            pulse survey, and prepare for Week 2.
          </p>
        </div>

        {/* Progress Summary */}
        <SectionCard 
          title="Your Module 1 Progress" 
          variant={allComplete ? "career" : "default"}
          className="mb-8"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#4a5568]">Overall Progress</span>
              <span className="font-bold text-[#1a365d]">{progress}%</span>
            </div>
            <div className="w-full bg-[#e2e8f0] rounded-full h-3">
              <div 
                className="bg-[#4a7c59] h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              {sections.map((section) => {
                const Icon = section.icon;
                const isComplete = completedSections.includes(section.path);
                return (
                  <div 
                    key={section.path}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      isComplete 
                        ? "bg-[#f0fff4] border-[#4a7c59]" 
                        : "bg-[#f7fafc] border-[#e2e8f0]"
                    }`}
                  >
                    <Icon size={20} className={isComplete ? "text-[#4a7c59]" : "text-[#718096]"} />
                    <span className={`flex-1 ${isComplete ? "text-[#1a365d] font-medium" : "text-[#4a5568]"}`}>
                      {section.label}
                    </span>
                    {isComplete && <CheckCircle2 size={20} className="text-[#4a7c59]" />}
                  </div>
                );
              })}
            </div>

            {allComplete && (
              <div className="mt-4 p-4 bg-[#f0fff4] border border-[#4a7c59] rounded-lg">
                <div className="flex items-center gap-3">
                  <Award className="text-[#4a7c59]" size={24} />
                  <div>
                    <h4 className="font-semibold text-[#1a365d]">Module 1 Badge Earned!</h4>
                    <p className="text-sm text-[#4a5568]">
                      You've completed all sections of Module 1. Great work!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Assignments Checklist */}
        <SectionCard 
          title="Module 1 Assignments Checklist" 
          description="Ensure you've completed all required assignments in Canvas"
          className="mb-8"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#f7fafc] rounded-lg">
              <MessageSquare size={20} className="text-[#1a365d]" />
              <div className="flex-1">
                <span className="text-[#2d3748]">Module 1: Course Objectives Discussion</span>
                <span className="text-sm text-[#718096] ml-2">(5 pts • Due Sep 7)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#f7fafc] rounded-lg">
              <MessageSquare size={20} className="text-[#1a365d]" />
              <div className="flex-1">
                <span className="text-[#2d3748]">Module 1: Goals and Mission Statement Discussion</span>
                <span className="text-sm text-[#718096] ml-2">(20 pts • Due Sep 7)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#f7fafc] rounded-lg">
              <ClipboardCheck size={20} className="text-[#1a365d]" />
              <div className="flex-1">
                <span className="text-[#2d3748]">Module 1: CodeSignal Navigation Knowledge Check</span>
                <span className="text-sm text-[#718096] ml-2">(25 pts • Due Sep 7)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#f7fafc] rounded-lg">
              <Code2 size={20} className="text-[#1a365d]" />
              <div className="flex-1">
                <span className="text-[#2d3748]">Module 1 - Lesson 1 - Practice 1: Accessing List Elements</span>
                <span className="text-sm text-[#718096] ml-2">(10 pts • Due Sep 7)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#f7fafc] rounded-lg">
              <Code2 size={20} className="text-[#1a365d]" />
              <div className="flex-1">
                <span className="text-[#2d3748]">Module 1 - Lesson 1 - Practice 2: Manipulating Lists in Python</span>
                <span className="text-sm text-[#718096] ml-2">(10 pts • Due Sep 7)</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-[#fffbeb] border border-[#d69e2e]/30 rounded-lg">
            <p className="text-sm text-[#4a5568]">
              <strong>Reminder:</strong> All assignments are due by September 7. Make sure to 
              submit your work in Canvas to receive credit.
            </p>
          </div>
        </SectionCard>

        {/* Pulse Survey */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardCheck className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Module 1 Pulse Survey</h2>
          </div>

          <Card className="border-[#e2e8f0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1a365d]">
                Share Your Feedback
              </CardTitle>
              <p className="text-[#4a5568] text-sm">
                Your feedback helps improve the course for future students.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {!surveySubmitted ? (
                <>
                  <div className="space-y-3">
                    <Label>How would you rate the pace of Module 1?</Label>
                    <RadioGroup
                      value={surveyResponses.pace}
                      onValueChange={(value) => setSurveyResponses({...surveyResponses, pace: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="too-slow" id="pace-slow" />
                        <Label htmlFor="pace-slow" className="font-normal">Too slow</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="just-right" id="pace-right" />
                        <Label htmlFor="pace-right" className="font-normal">Just right</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="too-fast" id="pace-fast" />
                        <Label htmlFor="pace-fast" className="font-normal">Too fast</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>How would you rate the difficulty level of the Python content?</Label>
                    <RadioGroup
                      value={surveyResponses.difficulty}
                      onValueChange={(value) => setSurveyResponses({...surveyResponses, difficulty: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="too-easy" id="diff-easy" />
                        <Label htmlFor="diff-easy" className="font-normal">Too easy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="appropriate" id="diff-appropriate" />
                        <Label htmlFor="diff-appropriate" className="font-normal">Appropriate</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="too-difficult" id="diff-difficult" />
                        <Label htmlFor="diff-difficult" className="font-normal">Too difficult</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>How clear were the instructions for the career planning activities?</Label>
                    <RadioGroup
                      value={surveyResponses.clarity}
                      onValueChange={(value) => setSurveyResponses({...surveyResponses, clarity: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="very-clear" id="clarity-clear" />
                        <Label htmlFor="clarity-clear" className="font-normal">Very clear</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="somewhat-clear" id="clarity-somewhat" />
                        <Label htmlFor="clarity-somewhat" className="font-normal">Somewhat clear</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unclear" id="clarity-unclear" />
                        <Label htmlFor="clarity-unclear" className="font-normal">Unclear</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="feedback">Additional feedback or suggestions (optional)</Label>
                    <Textarea
                      id="feedback"
                      value={surveyResponses.feedback}
                      onChange={(e) => setSurveyResponses({...surveyResponses, feedback: e.target.value})}
                      placeholder="Share any additional thoughts about Module 1..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button 
                    onClick={handleSurveySubmit}
                    disabled={!surveyResponses.pace || !surveyResponses.difficulty || !surveyResponses.clarity}
                    className="w-full bg-[#1a365d] hover:bg-[#2d4a7a]"
                  >
                    <Send size={18} className="mr-2" />
                    Submit Survey
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 size={64} className="text-[#4a7c59] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#1a365d] mb-2">
                    Thank You for Your Feedback!
                  </h3>
                  <p className="text-[#4a5568]">
                    Your responses have been recorded. This completes Module 1.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Week 2 Preview */}
        <SectionCard 
          title="Looking Ahead: Week 2" 
          variant="highlight"
          className="mb-8"
        >
          <div className="flex items-start gap-4">
            <Calendar className="text-[#d69e2e] flex-shrink-0" size={24} />
            <div>
              <h4 className="font-semibold text-[#1a365d] mb-2">Preparation for Week 2</h4>
              <p className="text-[#4a5568] mb-4">
                Based on the weekly completion guidance, make sure you have:
              </p>
              <ul className="space-y-2 text-[#4a5568]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                  <span>Completed your career advancement plan with goals and mission statement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                  <span>Identified Python concepts that need focused practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                  <span>Retained notes on challenging list operations for Week 2 review</span>
                </li>
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#e2e8f0]">
          <Link href="/python">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={18} />
              Back to Python Lists
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <CheckpointButton 
              label="Mark Module Complete" 
              onComplete={() => {
                const saved = localStorage.getItem("tech460-module1-progress");
                const data = saved ? JSON.parse(saved) : { completed: [] };
                if (!data.completed.includes("/completion")) {
                  data.completed.push("/completion");
                  localStorage.setItem("tech460-module1-progress", JSON.stringify(data));
                }
              }}
            />
            
            <Link href="/">
              <Button className="bg-[#4a7c59] hover:bg-[#3d6b4a] gap-2">
                Return to Home
                <CheckCircle2 size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

