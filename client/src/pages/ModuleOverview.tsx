import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionCard from "@/components/SectionCard";
import CheckpointButton from "@/components/CheckpointButton";
import { 
  ArrowRight, 
  ArrowLeft,
  BookOpen,
  MessageSquare,
  FileCode,
  ClipboardCheck,
  Award,
  Calendar
} from "lucide-react";

export default function ModuleOverview() {
  const moduleItems = [
    {
      type: "Page",
      title: "Module 1: Overview",
      description: "Introduction to personalizing your career advancement",
      icon: BookOpen,
      points: null
    },
    {
      type: "Page",
      title: "Earn Your Module 1 Badge",
      description: "Requirements for earning your completion badge",
      icon: Award,
      points: null
    },
    {
      type: "Discussion",
      title: "Get & Give Help Forum",
      description: "Community support and collaboration space",
      icon: MessageSquare,
      points: null
    },
    {
      type: "Discussion",
      title: "Module 1: Course Objectives Discussion",
      description: "Discuss and reflect on course learning objectives",
      icon: MessageSquare,
      points: 5,
      dueDate: "Sep 7"
    },
    {
      type: "Discussion",
      title: "Module 1: Goals and Mission Statement Discussion",
      description: "Share your career goals and personal mission statement",
      icon: MessageSquare,
      points: 20,
      dueDate: "Sep 7"
    },
    {
      type: "Page",
      title: "Video: How to Navigate CodeSignal",
      description: "Platform walkthrough and navigation tutorial",
      icon: FileCode,
      points: null
    },
    {
      type: "Quiz",
      title: "Module 1: CodeSignal Navigation Knowledge Check",
      description: "Verify your understanding of the CodeSignal platform",
      icon: ClipboardCheck,
      points: 25,
      dueDate: "Sep 7"
    },
    {
      type: "Assignment",
      title: "Module 1 - Lesson 1: Welcome to the Course",
      description: "Identifying strengths, areas for growth, and certification alignment",
      icon: FileCode,
      points: 0,
      dueDate: "Sep 7"
    },
    {
      type: "Assignment",
      title: "Module 1 - Lesson 1 - Practice 1: Accessing List Elements",
      description: "Hands-on practice with Python list indexing and slicing",
      icon: FileCode,
      points: 10,
      dueDate: "Sep 7"
    },
    {
      type: "Assignment",
      title: "Module 1 - Lesson 1 - Practice 2: Manipulating Lists in Python",
      description: "Practice using list methods to modify and transform data",
      icon: FileCode,
      points: 10,
      dueDate: "Sep 7"
    },
    {
      type: "Page",
      title: "Module 1 Pulse Survey",
      description: "Provide feedback on your learning experience",
      icon: ClipboardCheck,
      points: null
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
            <span className="text-[#1a365d]">Module Overview</span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-[#1a365d] mb-4">
            Module 1: Personalizing Your Career Advancement
          </h1>
          
          <p className="text-lg text-[#4a5568] leading-relaxed">
            This module introduces you to the TECH460 Senior Project course structure while 
            helping you develop a personalized career advancement strategy. You'll combine 
            self-assessment activities with hands-on Python programming practice.
          </p>
        </div>

        {/* Learning Objective */}
        <SectionCard 
          title="Module 1 Learning Objective" 
          variant="career"
          className="mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4a7c59] flex items-center justify-center text-white font-bold text-xl">
              1
            </div>
            <div>
              <p className="text-[#2d3748] text-lg leading-relaxed">
                Develop a personalized career advancement strategy by conducting self-assessments, 
                identifying professional strengths and areas for growth, and establishing short- 
                and long-term career goals within a technology-focused field.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Weekly Completion Guidance */}
        <SectionCard 
          title="Weekly Completion Guidance" 
          variant="highlight"
          className="mb-8"
        >
          <div className="flex items-start gap-4">
            <Calendar className="text-[#d69e2e] flex-shrink-0" size={24} />
            <div>
              <p className="text-[#2d3748] leading-relaxed">
                Complete the career advancement plan and retain a concise record of the Python 
                concepts that require focused practice in Week 2.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Module Contents */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1a365d] mb-6">Module Contents</h2>
          
          <div className="space-y-4">
            {moduleItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border-[#e2e8f0] hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#f7fafc] flex items-center justify-center">
                        <Icon size={20} className="text-[#1a365d]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          {item.points !== null && (
                            <Badge className="bg-[#1a365d] text-xs">
                              {item.points} pts
                            </Badge>
                          )}
                          {item.dueDate && (
                            <Badge variant="outline" className="text-xs text-[#d69e2e] border-[#d69e2e]">
                              Due {item.dueDate}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-[#1a365d] mt-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#4a5568] mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Key Topics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1a365d] mb-6">Key Topics Covered</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-[#e2e8f0]">
              <CardHeader>
                <CardTitle className="text-lg text-[#1a365d]">Career Development</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-[#4a5568]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#4a7c59] mt-1">•</span>
                    <span>Self-assessment techniques for identifying strengths</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4a7c59] mt-1">•</span>
                    <span>Creating a personal mission statement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4a7c59] mt-1">•</span>
                    <span>Setting SMART career goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4a7c59] mt-1">•</span>
                    <span>Aligning certifications with career objectives</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-[#e2e8f0]">
              <CardHeader>
                <CardTitle className="text-lg text-[#1a365d]">Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-[#4a5568]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#d69e2e] mt-1">•</span>
                    <span>Navigating the CodeSignal assessment platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d69e2e] mt-1">•</span>
                    <span>Accessing Python list elements by index</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d69e2e] mt-1">•</span>
                    <span>Using list slicing for data extraction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d69e2e] mt-1">•</span>
                    <span>Manipulating lists with append(), insert(), remove(), pop()</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#e2e8f0]">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={18} />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <CheckpointButton 
              label="Mark Overview Complete" 
              onComplete={() => {
                const saved = localStorage.getItem("tech460-module1-progress");
                const data = saved ? JSON.parse(saved) : { completed: [] };
                if (!data.completed.includes("/overview")) {
                  data.completed.push("/overview");
                  localStorage.setItem("tech460-module1-progress", JSON.stringify(data));
                }
              }}
            />
            
            <Link href="/career">
              <Button className="bg-[#1a365d] hover:bg-[#2d4a7a] gap-2">
                Next: Career Foundations
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

