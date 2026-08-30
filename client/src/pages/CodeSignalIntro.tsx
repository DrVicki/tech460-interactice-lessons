import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionCard from "@/components/SectionCard";
import KnowledgeCheck from "@/components/KnowledgeCheck";
import CheckpointButton from "@/components/CheckpointButton";
import { 
  ArrowRight, 
  ArrowLeft,
  Terminal,
  Play,
  CheckCircle2,
  ExternalLink,
  Clock,
  Award
} from "lucide-react";

export default function CodeSignalIntro() {
  const knowledgeCheckQuestions = [
    {
      id: "q1",
      question: "Where do you navigate in CodeSignal to access practice coding questions?",
      options: [
        "The Dashboard tab",
        "The Assessments tab",
        "The Profile settings",
        "The Leaderboard section"
      ],
      correctAnswer: 1,
      explanation: "After logging into your CodeSignal Developer account, click on the Assessments tab to practice for your assessment. You can navigate directly to https://app.codesignal.com/assessments/practice."
    },
    {
      id: "q2",
      question: "How long do you have to complete a practice question on CodeSignal?",
      options: [
        "30 minutes",
        "45 minutes",
        "1 hour",
        "Unlimited time"
      ],
      correctAnswer: 2,
      explanation: "When you begin a practice question, you will have one hour. After that hour, a modal will appear asking if you want to leave or continue working. If you click Continue, your time limit will reset to one hour."
    },
    {
      id: "q3",
      question: "What happens to your practice code every 2 weeks on CodeSignal?",
      options: [
        "It is automatically submitted for review",
        "It is saved to your permanent profile",
        "It is reset, giving you a blank slate",
        "It is shared with potential employers"
      ],
      correctAnswer: 2,
      explanation: "Your code will be reset every 2 weeks, and every 2 weeks you will have a blank slate for each question you've worked on."
    },
    {
      id: "q4",
      question: "Can companies see your activity or performance in CodeSignal practice sessions?",
      options: [
        "Yes, all practice activity is visible to companies",
        "Only if you choose to share it",
        "No, practice sessions are private",
        "Only your final scores are visible"
      ],
      correctAnswer: 2,
      explanation: "Companies will not see your activity or performance in practice sessions. This is a safe space to familiarize yourself with the platform."
    }
  ];

  return (
    <div className="py-8 lg:py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[#4a5568] mb-4">
            <Link href="/" className="hover:text-[#1a365d]">Home</Link>
            <span>/</span>
            <span className="text-[#1a365d]">CodeSignal Platform</span>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#2d3748] text-white">
              <Terminal size={28} />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1a365d]">
                Introduction to CodeSignal
              </h1>
              <p className="text-[#4a5568]">Estimated time: 20 minutes</p>
            </div>
          </div>
          
          <p className="text-lg text-[#4a5568] leading-relaxed">
            CodeSignal is the industry-standard platform for technical assessments used by many 
            employers. In this section, you'll learn to navigate the platform and prepare for 
            your first knowledge check.
          </p>
        </div>

        {/* Video Section */}
        <SectionCard 
          title="Video: How to Navigate CodeSignal" 
          description="Watch this walkthrough to familiarize yourself with the platform"
          className="mb-8"
        >
          <div className="aspect-video bg-[#1a202c] rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d]/20 to-transparent" />
            <div className="text-center z-10">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors">
                <Play size={40} className="text-white ml-1" />
              </div>
              <p className="text-white/80">Video: How to Navigate CodeSignal</p>
              <p className="text-white/60 text-sm mt-1">Duration: ~8 minutes</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-[#f7fafc] rounded-lg">
            <h4 className="font-semibold text-[#1a365d] mb-2">Key Takeaways from the Video:</h4>
            <ul className="space-y-2 text-[#4a5568]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                <span>Access practice questions through the Assessments tab</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                <span>Practice sessions last 1 hour with option to extend</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                <span>Code resets every 2 weeks for a fresh start</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                <span>Practice activity is private and not visible to employers</span>
              </li>
            </ul>
          </div>
        </SectionCard>

        {/* Platform Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1a365d] mb-6">Platform Overview</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-[#e2e8f0]">
              <CardHeader>
                <CardTitle className="text-lg text-[#1a365d] flex items-center gap-2">
                  <Terminal size={20} />
                  What is CodeSignal?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4a5568] mb-4">
                  CodeSignal is an AI-native skills platform that helps organizations assess, 
                  hire, and develop technical talent. Many companies use CodeSignal for:
                </p>
                <ul className="space-y-2 text-[#4a5568]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1a365d] mt-1">•</span>
                    <span>Technical skills assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1a365d] mt-1">•</span>
                    <span>Live coding interviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1a365d] mt-1">•</span>
                    <span>Skills development and tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-[#e2e8f0]">
              <CardHeader>
                <CardTitle className="text-lg text-[#1a365d] flex items-center gap-2">
                  <Award size={20} />
                  Why It Matters for Your Career
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4a5568] mb-4">
                  Familiarity with CodeSignal gives you a competitive advantage:
                </p>
                <ul className="space-y-2 text-[#4a5568]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#4a7c59] mt-1">•</span>
                    <span>Many top companies use CodeSignal for hiring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4a7c59] mt-1">•</span>
                    <span>Practice reduces test anxiety during real assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4a7c59] mt-1">•</span>
                    <span>Certified scores can be shared with employers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <SectionCard 
          title="Step-by-Step: Accessing Practice Questions" 
          className="mb-8"
        >
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a365d] text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold text-[#1a365d]">Log into your CodeSignal Developer account</h4>
                <p className="text-[#4a5568] text-sm mt-1">
                  Visit <a href="https://codesignal.com" target="_blank" rel="noopener noreferrer" className="text-[#1a365d] underline hover:text-[#d69e2e]">codesignal.com</a> and sign in with your credentials.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a365d] text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold text-[#1a365d]">Navigate to the Assessments tab</h4>
                <p className="text-[#4a5568] text-sm mt-1">
                  Click on the <strong>Assessments</strong> tab in the main navigation menu.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a365d] text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold text-[#1a365d]">Access the practice section</h4>
                <p className="text-[#4a5568] text-sm mt-1">
                  Go directly to <code className="bg-[#f7fafc] px-2 py-1 rounded text-sm">app.codesignal.com/assessments/practice</code> or click the Practice button.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a365d] text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h4 className="font-semibold text-[#1a365d]">Choose a practice question</h4>
                <p className="text-[#4a5568] text-sm mt-1">
                  Select from the menu of different practice questions. Each question type simulates 
                  the actual assessment experience.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a365d] text-white flex items-center justify-center font-bold text-sm">
                5
              </div>
              <div>
                <h4 className="font-semibold text-[#1a365d]">Navigate between questions</h4>
                <p className="text-[#4a5568] text-sm mt-1">
                  Use the <strong>Question Type Summary</strong> button at the top right of the IDE 
                  to switch between different question types.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Knowledge Check */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Knowledge Check</h2>
            <span className="text-sm text-[#718096]">25 points • Due Sep 7</span>
          </div>
          
          <KnowledgeCheck 
            title="Module 1: CodeSignal Navigation Knowledge Check"
            questions={knowledgeCheckQuestions}
            onComplete={(score, total) => {
              if (score === total) {
                const saved = localStorage.getItem("tech460-module1-progress");
                const data = saved ? JSON.parse(saved) : { completed: [] };
                if (!data.completed.includes("/codesignal")) {
                  data.completed.push("/codesignal");
                  localStorage.setItem("tech460-module1-progress", JSON.stringify(data));
                }
              }
            }}
          />
        </div>

        {/* External Resources */}
        <SectionCard 
          title="Additional Resources" 
          className="mb-8"
        >
          <div className="space-y-3">
            <a 
              href="https://support.codesignal.com/hc/en-us/articles/21025134150423-How-do-I-practice-coding-questions-on-CodeSignal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-[#f7fafc] rounded-lg hover:bg-[#edf2f7] transition-colors group"
            >
              <ExternalLink size={20} className="text-[#1a365d] group-hover:text-[#d69e2e]" />
              <div>
                <h4 className="font-semibold text-[#1a365d] group-hover:text-[#d69e2e]">
                  How do I practice coding questions on CodeSignal?
                </h4>
                <p className="text-sm text-[#4a5568]">Official CodeSignal support documentation</p>
              </div>
            </a>
            
            <a 
              href="https://support.codesignal.com/hc/en-us/articles/15171059136407-Preparing-for-your-CodeSignal-Assessment"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-[#f7fafc] rounded-lg hover:bg-[#edf2f7] transition-colors group"
            >
              <ExternalLink size={20} className="text-[#1a365d] group-hover:text-[#d69e2e]" />
              <div>
                <h4 className="font-semibold text-[#1a365d] group-hover:text-[#d69e2e]">
                  Preparing for your CodeSignal Assessment
                </h4>
                <p className="text-sm text-[#4a5568]">Tips and strategies for assessment success</p>
              </div>
            </a>
          </div>
        </SectionCard>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#e2e8f0]">
          <Link href="/career">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={18} />
              Back to Career Foundations
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <CheckpointButton 
              label="Mark CodeSignal Complete" 
              onComplete={() => {
                const saved = localStorage.getItem("tech460-module1-progress");
                const data = saved ? JSON.parse(saved) : { completed: [] };
                if (!data.completed.includes("/codesignal")) {
                  data.completed.push("/codesignal");
                  localStorage.setItem("tech460-module1-progress", JSON.stringify(data));
                }
              }}
            />
            
            <Link href="/python">
              <Button className="bg-[#1a365d] hover:bg-[#2d4a7a] gap-2">
                Next: Python Lists
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

