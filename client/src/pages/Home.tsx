import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Target, 
  Code2, 
  Terminal, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Award,
  FileText
} from "lucide-react";

export default function Home() {
  const sections = [
    {
      path: "/overview",
      title: "Module Overview",
      description: "Understand the learning objectives and structure of Module 1",
      icon: BookOpen,
      duration: "10 min",
      color: "bg-[#1a365d]"
    },
    {
      path: "/career",
      title: "Career Foundations",
      description: "Develop your personalized career advancement strategy",
      icon: Target,
      duration: "45 min",
      color: "bg-[#4a7c59]"
    },
    {
      path: "/codesignal",
      title: "CodeSignal Platform",
      description: "Learn to navigate the CodeSignal assessment platform",
      icon: Terminal,
      duration: "20 min",
      color: "bg-[#2d3748]"
    },
    {
      path: "/python",
      title: "Python Lists",
      description: "Master accessing and manipulating list elements in Python",
      icon: Code2,
      duration: "60 min",
      color: "bg-[#d69e2e]"
    },
    {
      path: "/completion",
      title: "Module Completion",
      description: "Complete the pulse survey and prepare for Week 2",
      icon: CheckCircle2,
      duration: "10 min",
      color: "bg-[#4a7c59]"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a365d] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/manus-storage/hero-career-growth_9cdb94e7.png" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/manus-storage/tech460-logo_04dcbc26.png" 
                alt="TECH460 Logo" 
                className="h-16 w-16 rounded-full border-2 border-white/20"
              />
              <div>
                <p className="text-[#d69e2e] font-semibold text-sm tracking-wide uppercase">
                  Senior Project Course
                </p>
                <p className="text-white/80 text-sm">DeVry University</p>
                <p className="text-white/60 text-xs mt-1">Created by Dr. Vicki Bealman</p>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Personalizing Your Career Advancement
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Welcome to Module 1 of TECH460. This interactive lesson will guide you through 
              developing a personalized career advancement strategy while mastering essential 
              Python programming skills.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/overview">
                <Button size="lg" className="bg-[#d69e2e] hover:bg-[#b7791f] text-white gap-2">
                  Start Module 1
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                <FileText size={20} className="mr-2" />
                Download Syllabus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Module Stats */}
      <section className="py-12 bg-white border-b border-[#e2e8f0]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1a365d]">5</div>
              <div className="text-sm text-[#4a5568]">Learning Sections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1a365d]">2.5</div>
              <div className="text-sm text-[#4a5568]">Hours Estimated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1a365d]">4</div>
              <div className="text-sm text-[#4a5568]">Assessments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1a365d]">1</div>
              <div className="text-sm text-[#4a5568]">Badge to Earn</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold text-[#1a365d] mb-4">
              Your Learning Path
            </h2>
            <p className="text-lg text-[#4a5568]">
              Follow this structured path through Module 1. Each section builds upon the previous, 
              combining career development with technical skill building.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Link key={section.path} href={section.path}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-[#e2e8f0]">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${section.color} text-white`}>
                          <Icon size={24} />
                        </div>
                        <span className="text-xs text-[#718096] flex items-center gap-1">
                          <Clock size={14} />
                          {section.duration}
                        </span>
                      </div>
                      <CardTitle className="text-xl text-[#1a365d] group-hover:text-[#d69e2e] transition-colors">
                        {index + 1}. {section.title}
                      </CardTitle>
                      <CardDescription className="text-[#4a5568]">
                        {section.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-[#1a365d] font-medium text-sm group-hover:translate-x-1 transition-transform">
                        Start Section
                        <ArrowRight size={16} className="ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Outcomes */}
      <section className="py-16 bg-[#f7fafc]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1a365d] mb-6">
                What You'll Achieve
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4a7c59] flex items-center justify-center">
                    <Target size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a365d] mb-1">
                      Career Advancement Strategy
                    </h3>
                    <p className="text-[#4a5568]">
                      Develop a personalized strategy with self-assessments, professional strengths 
                      identification, and short/long-term career goals.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2d3748] flex items-center justify-center">
                    <Terminal size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a365d] mb-1">
                      CodeSignal Proficiency
                    </h3>
                    <p className="text-[#4a5568]">
                      Navigate the CodeSignal platform confidently and complete your first 
                      knowledge check assessment.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d69e2e] flex items-center justify-center">
                    <Code2 size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a365d] mb-1">
                      Python List Mastery
                    </h3>
                    <p className="text-[#4a5568]">
                      Master accessing list elements and manipulating lists using Python's 
                      built-in methods and slicing operations.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a365d] flex items-center justify-center">
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a365d] mb-1">
                      Module 1 Badge
                    </h3>
                    <p className="text-[#4a5568]">
                      Earn your Module 1 badge by completing all discussions, assignments, 
                      and the pulse survey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/manus-storage/career-path-visual_b22b8609.png" 
                alt="Career advancement path visualization" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a365d] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Start with the Module Overview to understand the learning objectives, 
            then progress through each section at your own pace.
          </p>
          <Link href="/overview">
            <Button size="lg" className="bg-[#d69e2e] hover:bg-[#b7791f] text-white gap-2">
              Begin Module 1
              <ArrowRight size={20} />
            </Button>
          </Link>
          <p className="text-white/60 text-sm mt-8">
            TECH460: Interactive Learning Platform • Created by Dr. Vicki Bealman
          </p>
        </div>
      </section>
    </div>
  );
}
