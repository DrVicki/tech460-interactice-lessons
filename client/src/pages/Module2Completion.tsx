import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SectionCard from "@/components/SectionCard";
import CheckpointButton from "@/components/CheckpointButton";
import { useModuleProgress } from "@/contexts/ModuleProgressContext";
import {
  ArrowLeft,
  CheckCircle2,
  Award,
  ClipboardCheck,
  Calendar,
  BookOpen,
  MessageSquare,
  Code2,
  Type,
  ListOrdered,
  Repeat,
  Send
} from "lucide-react";

export default function Module2Completion() {
  const { markModuleComplete } = useModuleProgress();
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [surveyResponses, setSurveyResponses] = useState({
    pace: "",
    difficulty: "",
    clarity: "",
    feedback: ""
  });
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tech460-module2-progress");
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedSections(data.completed || []);
    }
  }, []);

  const sections = [
    { path: "/module/2", label: "Module 2 Overview", icon: BookOpen },
    { path: "/module/2/lesson1", label: "Lesson 1: Manipulating Strings", icon: Type },
    { path: "/module/2/lesson2", label: "Lesson 2: Python Collections", icon: ListOrdered },
    { path: "/module/2/lesson3", label: "Lesson 3: Conditional Looping", icon: Repeat },
  ];

  const completedCount = sections.filter(s => completedSections.includes(s.path)).length;
  const progress = Math.round((completedCount / sections.length) * 100);
  const allComplete = sections.every(s => completedSections.includes(s.path));

  const assignments = [
    { title: "Module 2: Discussion - Certifications and Competencies", points: 25, icon: MessageSquare },
    { title: "Lesson 1 - Practice 1: Rotating Characters in Words of a String", points: 10, icon: Code2 },
    { title: "Lesson 1 - Practice 2: Transforming Words with Alphabet Opposites", points: 10, icon: Code2 },
    { title: "Lesson 1 - Practice 3: Capitalizing and Lowercasing String Words", points: 10, icon: Code2 },
    { title: "Lesson 2 - Practice 1: Refining the Journey Packing List", points: 10, icon: Code2 },
    { title: "Lesson 2 - Practice 2: Suitcase Packing Validator", points: 10, icon: Code2 },
    { title: "Lesson 2 - Practice 3: Add Essentials to Your Travel Bag", points: 10, icon: Code2 },
    { title: "Lesson 2 - Practice 4: Add an Item Check to the Packing List", points: 10, icon: Code2 },
    { title: "Lesson 2 - Practice 5: Space Voyager's Suitcase Preparation", points: 10, icon: Code2 },
    { title: "Lesson 2 - Practice 6: Updating an Immutable Mission Name", points: 10, icon: Code2 },
    { title: "Lesson 3 - Practice 1: Adjust Loop Termination Condition", points: 10, icon: Code2 },
    { title: "Lesson 3 - Practice 2: Temperature Check Loop Debugging", points: 10, icon: Code2 },
    { title: "Lesson 3 - Practice 3: Add Temperature Conditions to Weather Loop", points: 10, icon: Code2 },
    { title: "Lesson 3 - Practice 4: Add Temperature Control to Weather App", points: 10, icon: Code2 },
    { title: "Lesson 3 - Practice 5: Temperature Loop Control Challenge", points: 10, icon: Code2 },
  ];

  const totalPoints = assignments.reduce((sum, a) => sum + a.points, 0);

  const handleSurveySubmit = () => {
    if (surveyResponses.pace && surveyResponses.difficulty && surveyResponses.clarity) {
      setSurveySubmitted(true);
      const saved = localStorage.getItem("tech460-module2-progress");
      const data = saved ? JSON.parse(saved) : { completed: [] };
      if (!data.completed.includes("/module/2/completion")) {
        data.completed.push("/module/2/completion");
        localStorage.setItem("tech460-module2-progress", JSON.stringify(data));
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
            <Link href="/module/2" className="hover:text-[#1a365d]">Module 2</Link>
            <span>/</span>
            <span className="text-[#1a365d]">Completion</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#4a7c59] text-white">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1a365d]">
                Complete Module 2
              </h1>
              <p className="text-[#4a5568]">Estimated time: 15 minutes</p>
            </div>
          </div>

          <p className="text-lg text-[#4a5568] leading-relaxed">
            Congratulations on completing the Python Foundations module! Review your progress,
            verify your Canvas submissions, complete the pulse survey, and prepare for Week 3's
            looping and interview implementation work.
          </p>
        </div>

        {/* Progress Summary */}
        <SectionCard
          title="Your Module 2 Progress"
          variant={allComplete ? "career" : "default"}
          className="mb-8"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#4a5568]">Lesson Progress</span>
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
                    <span className={`flex-1 text-sm ${isComplete ? "text-[#1a365d] font-medium" : "text-[#4a5568]"}`}>
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
                    <h4 className="font-semibold text-[#1a365d]">Module 2 Badge Earned!</h4>
                    <p className="text-sm text-[#4a5568]">
                      You've completed all lessons in Python Foundations &amp; String Operations.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Assignments Checklist */}
        <SectionCard
          title="Module 2 Assignments Checklist"
          description={`Verify all ${assignments.length} graded items are submitted in Canvas (${totalPoints} total points)`}
          className="mb-8"
        >
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {assignments.map((assignment, index) => {
              const Icon = assignment.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-[#f7fafc] rounded-lg">
                  <Icon size={18} className="text-[#1a365d] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-[#2d3748] block truncate">{assignment.title}</span>
                  </div>
                  <span className="text-xs text-[#718096] flex-shrink-0">{assignment.points} pts • Due Sep 14</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-4 bg-[#fffbeb] border border-[#d69e2e]/30 rounded-lg">
            <p className="text-sm text-[#4a5568]">
              <strong>Reminder:</strong> All Module 2 assignments are due by September 14.
              Remember that every practice activity is accessed through its individual link in the
              Canvas Module 2 page.
            </p>
          </div>
        </SectionCard>

        {/* Pulse Survey */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardCheck className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Module 2 Pulse Survey</h2>
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
                    <Label>How would you rate the pace of Module 2?</Label>
                    <RadioGroup
                      value={surveyResponses.pace}
                      onValueChange={(value) => setSurveyResponses({...surveyResponses, pace: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="too-slow" id="m2-pace-slow" />
                        <Label htmlFor="m2-pace-slow" className="font-normal">Too slow</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="just-right" id="m2-pace-right" />
                        <Label htmlFor="m2-pace-right" className="font-normal">Just right</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="too-fast" id="m2-pace-fast" />
                        <Label htmlFor="m2-pace-fast" className="font-normal">Too fast</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>How would you rate the difficulty of the string and list exercises?</Label>
                    <RadioGroup
                      value={surveyResponses.difficulty}
                      onValueChange={(value) => setSurveyResponses({...surveyResponses, difficulty: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="too-easy" id="m2-diff-easy" />
                        <Label htmlFor="m2-diff-easy" className="font-normal">Too easy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="appropriate" id="m2-diff-appropriate" />
                        <Label htmlFor="m2-diff-appropriate" className="font-normal">Appropriate</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="too-difficult" id="m2-diff-difficult" />
                        <Label htmlFor="m2-diff-difficult" className="font-normal">Too difficult</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>How confident do you feel about loop control (break/continue) going into Week 3?</Label>
                    <RadioGroup
                      value={surveyResponses.clarity}
                      onValueChange={(value) => setSurveyResponses({...surveyResponses, clarity: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="confident" id="m2-conf-high" />
                        <Label htmlFor="m2-conf-high" className="font-normal">Confident</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="somewhat" id="m2-conf-mid" />
                        <Label htmlFor="m2-conf-mid" className="font-normal">Somewhat confident</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-confident" id="m2-conf-low" />
                        <Label htmlFor="m2-conf-low" className="font-normal">Not yet confident</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="m2-feedback">Which Python concept needs the most review for you? (optional)</Label>
                    <Textarea
                      id="m2-feedback"
                      value={surveyResponses.feedback}
                      onChange={(e) => setSurveyResponses({...surveyResponses, feedback: e.target.value})}
                      placeholder="e.g., String slicing with negative steps, when to use break vs. continue..."
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
                    Your responses have been recorded. This completes Module 2.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Week 3 Preview */}
        <SectionCard
          title="Looking Ahead: Week 3 — Looping & Interview Implementation"
          variant="highlight"
          className="mb-8"
        >
          <div className="flex items-start gap-4">
            <Calendar className="text-[#d69e2e] flex-shrink-0" size={24} />
            <div>
              <h4 className="font-semibold text-[#1a365d] mb-2">Preparation for Week 3</h4>
              <p className="text-[#4a5568] mb-4">
                Next week builds directly on the loop-control skills you just practiced. Before
                starting Module 3, make sure you have:
              </p>
              <ul className="space-y-2 text-[#4a5568]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                  <span>A saved Notes entry with your personal loop-debugging checklist</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                  <span>Fluency with string slicing and list mutation patterns from Lessons 1-2</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                  <span>All Module 2 Canvas assignments submitted (165 total points)</span>
                </li>
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#e2e8f0]">
          <Link href="/module/2/lesson3">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={18} />
              Back to Lesson 3
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <CheckpointButton
              label="Mark Module 2 Complete"
              onComplete={() => {
                const saved = localStorage.getItem("tech460-module2-progress");
                const data = saved ? JSON.parse(saved) : { completed: [] };
                if (!data.completed.includes("/module/2/completion")) {
                  data.completed.push("/module/2/completion");
                  localStorage.setItem("tech460-module2-progress", JSON.stringify(data));
                }
                markModuleComplete(2);
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
