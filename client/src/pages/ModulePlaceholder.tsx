import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Lock, 
  ArrowLeft, 
  Clock,
  BookOpen,
  Target,
  Database,
  Globe,
  Shield,
  Cpu,
  Layers,
  Rocket,
  Award,
  CheckCircle2
} from "lucide-react";
import { useModuleProgress } from "@/contexts/ModuleProgressContext";

interface ModulePlaceholderProps {
  moduleNumber: number;
}

const moduleData: Record<number, {
  title: string;
  description: string;
  icon: any;
  topics: string[];
  estimatedHours: number;
  outcomes: string[];
}> = {
  2: {
    title: "Data Structures & Algorithms",
    description: "Master advanced Python data structures including dictionaries, sets, and tuples. Learn algorithmic thinking and problem-solving strategies essential for technical interviews.",
    icon: Database,
    topics: ["Dictionaries", "Sets", "Tuples", "Algorithm Design", "Big O Notation"],
    estimatedHours: 4,
    outcomes: [
      "Implement and manipulate Python dictionaries and sets",
      "Analyze algorithm complexity using Big O notation",
      "Solve common coding interview problems",
      "Apply appropriate data structures to real-world scenarios"
    ]
  },
  3: {
    title: "Web Development Foundations",
    description: "Build modern, responsive web applications using HTML5, CSS3, and JavaScript ES6+. Learn DOM manipulation, event handling, and asynchronous programming.",
    icon: Globe,
    topics: ["HTML5", "CSS3", "JavaScript ES6+", "DOM Manipulation", "Async Programming"],
    estimatedHours: 5,
    outcomes: [
      "Create semantic HTML structures",
      "Style responsive layouts with CSS Grid and Flexbox",
      "Implement interactive features with JavaScript",
      "Handle asynchronous operations with Promises"
    ]
  },
  4: {
    title: "Database Design & SQL",
    description: "Design efficient relational databases and master SQL queries. Learn normalization, indexing, and database optimization techniques.",
    icon: Layers,
    topics: ["SQL", "Database Design", "Normalization", "Indexing", "Query Optimization"],
    estimatedHours: 4,
    outcomes: [
      "Design normalized database schemas",
      "Write complex SQL queries with JOINs",
      "Optimize database performance",
      "Implement data integrity constraints"
    ]
  },
  5: {
    title: "Cloud Computing & DevOps",
    description: "Deploy applications to cloud platforms and implement CI/CD pipelines. Learn containerization with Docker and infrastructure as code.",
    icon: Cpu,
    topics: ["AWS/Azure", "Docker", "CI/CD", "Infrastructure as Code", "Kubernetes"],
    estimatedHours: 5,
    outcomes: [
      "Deploy applications to cloud platforms",
      "Containerize applications with Docker",
      "Implement CI/CD pipelines",
      "Manage infrastructure with code"
    ]
  },
  6: {
    title: "Cybersecurity Essentials",
    description: "Understand security principles, threat analysis, and secure coding practices. Learn to protect applications and data from common vulnerabilities.",
    icon: Shield,
    topics: ["Security Fundamentals", "Encryption", "Secure Coding", "OWASP Top 10", "Threat Analysis"],
    estimatedHours: 4,
    outcomes: [
      "Identify common security vulnerabilities",
      "Implement encryption and authentication",
      "Write secure code following best practices",
      "Conduct basic security assessments"
    ]
  },
  7: {
    title: "Senior Project Development",
    description: "Plan, develop, and document your capstone project. Apply agile methodologies and professional development practices.",
    icon: Rocket,
    topics: ["Project Planning", "Agile Development", "Documentation", "Testing", "Deployment"],
    estimatedHours: 8,
    outcomes: [
      "Create comprehensive project plans",
      "Apply agile development methodologies",
      "Write professional technical documentation",
      "Deploy a production-ready application"
    ]
  },
  8: {
    title: "Professional Portfolio & Presentation",
    description: "Create a compelling professional portfolio and develop presentation skills. Prepare for job searches and technical interviews.",
    icon: Award,
    topics: ["Portfolio", "Presentation", "Job Search", "Interview Skills", "Networking"],
    estimatedHours: 3,
    outcomes: [
      "Build a professional portfolio website",
      "Present technical projects effectively",
      "Prepare for technical interviews",
      "Develop job search strategies"
    ]
  }
};

export default function ModulePlaceholder({ moduleNumber }: ModulePlaceholderProps) {
  const { isModuleUnlocked, isModuleCompleted } = useModuleProgress();
  const module = moduleData[moduleNumber];
  
  if (!module) {
    return <div>Module not found</div>;
  }

  const Icon = module.icon;
  const unlocked = isModuleUnlocked(moduleNumber);
  const completed = isModuleCompleted(moduleNumber);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <section className="bg-[#1a365d] text-white py-16">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6 gap-2">
              <ArrowLeft size={18} />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-start gap-6">
            <div className={`
              p-4 rounded-xl
              ${completed ? 'bg-[#4a7c59]' : unlocked ? 'bg-[#d69e2e]' : 'bg-[#4a5568]'}
            `}>
              {completed ? (
                <CheckCircle2 size={40} className="text-white" />
              ) : unlocked ? (
                <Icon size={40} className="text-white" />
              ) : (
                <Lock size={40} className="text-white" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#d69e2e] font-semibold">Module {moduleNumber}</span>
                {completed && (
                  <Badge className="bg-[#4a7c59] text-white">Completed</Badge>
                )}
                {!unlocked && (
                  <Badge variant="outline" className="text-white/70 border-white/30">
                    Locked
                  </Badge>
                )}
                {unlocked && !completed && (
                  <Badge className="bg-[#d69e2e] text-white">Available</Badge>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {module.title}
              </h1>
              
              <p className="text-xl text-white/80 max-w-3xl">
                {module.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Coming Soon Card */}
              <Card className="border-[#e2e8f0] overflow-hidden">
                <div className="bg-gradient-to-r from-[#1a365d] to-[#2d4a7a] text-white p-8 text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock size={40} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
                  <p className="text-white/80 max-w-md mx-auto">
                    This module is currently under development. Complete the previous 
                    modules to unlock this content when it becomes available.
                  </p>
                </div>
                
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-[#1a365d] mb-4">
                    What You'll Learn
                  </h3>
                  <ul className="space-y-3">
                    {module.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#4a7c59] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm font-semibold">{index + 1}</span>
                        </div>
                        <span className="text-[#4a5568]">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Topics Preview */}
              <Card className="border-[#e2e8f0]">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-[#1a365d] mb-4">
                    Topics Covered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic) => (
                      <Badge 
                        key={topic}
                        variant="outline" 
                        className="text-[#4a5568] border-[#e2e8f0] px-3 py-1"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Module Info */}
              <Card className="border-[#e2e8f0]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#1a365d] mb-4">Module Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#4a5568]">Status</span>
                      {completed ? (
                        <Badge className="bg-[#4a7c59] text-white">Completed</Badge>
                      ) : unlocked ? (
                        <Badge className="bg-[#d69e2e] text-white">Available</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[#718096]">Locked</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[#4a5568]">Estimated Time</span>
                      <span className="font-semibold text-[#1a365d]">{module.estimatedHours} hours</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[#4a5568]">Topics</span>
                      <span className="font-semibold text-[#1a365d]">{module.topics.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Unlock Requirements */}
              {!unlocked && (
                <Card className="border-[#d69e2e] bg-[#d69e2e]/5">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Lock size={20} className="text-[#d69e2e] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-[#1a365d] mb-1">
                          Unlock Requirements
                        </h4>
                        <p className="text-sm text-[#4a5568]">
                          Complete Module {moduleNumber - 1} to unlock this module and 
                          continue your learning journey.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <Card className="border-[#e2e8f0]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#1a365d] mb-4">Course Navigation</h3>
                  <div className="space-y-2">
                    <Link href="/">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <BookOpen size={16} />
                        Back to Home
                      </Button>
                    </Link>
                    {moduleNumber > 1 && (
                      <Link href={`/module/${moduleNumber - 1}`}>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <ArrowLeft size={16} />
                          Previous Module
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
