import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Target, 
  Code2, 
  Terminal, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Award,
  FileText,
  Lock,
  Map,
  Database,
  Globe,
  Shield,
  Cpu,
  Layers,
  Rocket
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

  const courseModules = [
    {
      number: 1,
      title: "Personalizing Your Career Advancement",
      description: "Career planning, CodeSignal navigation, and Python list fundamentals",
      status: "active",
      icon: Target,
      topics: ["Career Strategy", "CodeSignal", "Python Lists"]
    },
    {
      number: 2,
      title: "Data Structures & Algorithms",
      description: "Advanced Python data structures and algorithmic thinking",
      status: "locked",
      icon: Database,
      topics: ["Dictionaries", "Sets", "Algorithm Design"]
    },
    {
      number: 3,
      title: "Web Development Foundations",
      description: "HTML, CSS, and JavaScript essentials for modern web apps",
      status: "locked",
      icon: Globe,
      topics: ["HTML5", "CSS3", "JavaScript ES6+"]
    },
    {
      number: 4,
      title: "Database Design & SQL",
      description: "Relational database design and SQL query mastery",
      status: "locked",
      icon: Layers,
      topics: ["SQL", "Database Design", "Normalization"]
    },
    {
      number: 5,
      title: "Cloud Computing & DevOps",
      description: "Cloud platforms, deployment, and CI/CD pipelines",
      status: "locked",
      icon: Cpu,
      topics: ["AWS/Azure", "Docker", "CI/CD"]
    },
    {
      number: 6,
      title: "Cybersecurity Essentials",
      description: "Security principles, threat analysis, and secure coding",
      status: "locked",
      icon: Shield,
      topics: ["Security Fundamentals", "Encryption", "Secure Coding"]
    },
    {
      number: 7,
      title: "Senior Project Development",
      description: "Capstone project planning, development, and documentation",
      status: "locked",
      icon: Rocket,
      topics: ["Project Planning", "Agile Development", "Documentation"]
    },
    {
      number: 8,
      title: "Professional Portfolio & Presentation",
      description: "Portfolio creation, presentation skills, and career launch",
      status: "locked",
      icon: Award,
      topics: ["Portfolio", "Presentation", "Job Search"]
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

      {/* Course Roadmap */}
      <section className="py-16 bg-[#f7fafc]">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#1a365d] rounded-lg">
                <Map size={24} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#1a365d]">
                Course Roadmap
              </h2>
            </div>
            <p className="text-lg text-[#4a5568]">
              Your journey through TECH460. Complete each module to unlock the next 
              and build comprehensive skills for your senior project.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#e2e8f0] hidden md:block" />
            
            <div className="space-y-6">
              {courseModules.map((module, index) => {
                const Icon = module.icon;
                const isActive = module.status === "active";
                const isLocked = module.status === "locked";
                
                return (
                  <div 
                    key={module.number}
                    className={`relative flex gap-6 ${isLocked ? 'opacity-60' : ''}`}
                  >
                    {/* Timeline Node */}
                    <div className="hidden md:flex flex-col items-center">
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center z-10
                        ${isActive 
                          ? 'bg-[#d69e2e] ring-4 ring-[#d69e2e]/30' 
                          : 'bg-[#e2e8f0]'
                        }
                      `}>
                        {isLocked ? (
                          <Lock size={24} className="text-[#718096]" />
                        ) : (
                          <Icon size={24} className={isActive ? 'text-white' : 'text-[#718096]'} />
                        )}
                      </div>
                      {index < courseModules.length - 1 && (
                        <div className="w-0.5 h-full bg-[#e2e8f0] -mt-2" />
                      )}
                    </div>

                    {/* Module Card */}
                    <Card className={`
                      flex-1 border-[#e2e8f0] transition-all duration-300
                      ${isActive 
                        ? 'border-[#d69e2e] shadow-lg ring-1 ring-[#d69e2e]/20' 
                        : 'hover:shadow-md'
                      }
                    `}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`
                              md:hidden p-2 rounded-lg
                              ${isActive ? 'bg-[#d69e2e]' : 'bg-[#e2e8f0]'}
                            `}>
                              {isLocked ? (
                                <Lock size={20} className="text-[#718096]" />
                              ) : (
                                <Icon size={20} className={isActive ? 'text-white' : 'text-[#718096]'} />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`
                                  text-sm font-semibold
                                  ${isActive ? 'text-[#d69e2e]' : 'text-[#718096]'}
                                `}>
                                  Module {module.number}
                                </span>
                                {isActive && (
                                  <Badge className="bg-[#4a7c59] text-white text-xs">
                                    Current
                                  </Badge>
                                )}
                                {isLocked && (
                                  <Badge variant="outline" className="text-[#718096] text-xs">
                                    Locked
                                  </Badge>
                                )}
                              </div>
                              <h3 className={`
                                text-xl font-bold mt-1
                                ${isActive ? 'text-[#1a365d]' : 'text-[#4a5568]'}
                              `}>
                                {module.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-[#4a5568] mb-4">
                          {module.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic) => (
                            <span 
                              key={topic}
                              className={`
                                text-xs px-2 py-1 rounded-full
                                ${isActive 
                                  ? 'bg-[#1a365d]/10 text-[#1a365d]' 
                                  : 'bg-[#e2e8f0] text-[#718096]'
                                }
                              `}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        {isActive && (
                          <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
                            <Link href="/overview">
                              <Button className="bg-[#d69e2e] hover:bg-[#b7791f] text-white gap-2">
                                Continue Module 1
                                <ArrowRight size={16} />
                              </Button>
                            </Link>
                          </div>
                        )}

                        {isLocked && (
                          <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
                            <p className="text-sm text-[#718096] flex items-center gap-2">
                              <Lock size={14} />
                              Complete Module {module.number - 1} to unlock
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
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
