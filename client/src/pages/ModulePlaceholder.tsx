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
  Shield,
  Cpu,
  Layers,
  Rocket,
  Award,
  CheckCircle2,
  Code2,
  Terminal
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
    title: "Python Foundations & String Operations",
    description: "Master Python fundamentals and string manipulation techniques. Learn implementation planning and document reliable foundation habits for consistent coding practice.",
    icon: Code2,
    topics: ["Python Foundations", "String Operations", "Implementation Planning", "Foundation Habits"],
    estimatedHours: 5,
    outcomes: [
      "Master Python string methods and manipulation",
      "Implement string parsing and transformation algorithms",
      "Develop consistent coding foundation habits",
      "Create implementation plans for coding problems"
    ]
  },
  3: {
    title: "Looping & Interview Implementation",
    description: "Master looping constructs and pair discovery algorithms. Practice timed coding exercises and demonstrate structured traversal and debugging techniques.",
    icon: Terminal,
    topics: ["Looping", "Pair Discovery", "Timed Practice", "Structured Traversal", "Debugging"],
    estimatedHours: 5,
    outcomes: [
      "Implement efficient looping structures",
      "Solve pair discovery problems",
      "Demonstrate structured traversal techniques",
      "Apply systematic debugging approaches"
    ]
  },
  4: {
    title: "Optimization & Multidimensional Problems",
    description: "Explore hash maps, pointer techniques, and matrix operations. Learn to explain correct, efficient trade-offs in algorithm design.",
    icon: Layers,
    topics: ["Hash Maps", "Pointers", "Matrices", "Multidimensional Problems", "Optimization"],
    estimatedHours: 5,
    outcomes: [
      "Implement hash map solutions for efficient lookups",
      "Apply pointer techniques for array manipulation",
      "Solve multidimensional matrix problems",
      "Analyze and explain algorithmic trade-offs"
    ]
  },
  5: {
    title: "Timed Readiness & Efficient Problem Solving",
    description: "Master problem decomposition and efficiency optimization. Develop GCA strategy and prioritize remaining review needs for assessment success.",
    icon: Cpu,
    topics: ["Decomposition", "Efficiency", "GCA Strategy", "Problem Solving", "Time Management"],
    estimatedHours: 5,
    outcomes: [
      "Decompose complex problems into manageable parts",
      "Optimize solutions for efficiency",
      "Develop effective GCA test-taking strategies",
      "Prioritize and address knowledge gaps"
    ]
  },
  6: {
    title: "Official General Coding Assessment",
    description: "Complete GCA readiness preparation and take the official General Coding Assessment. Demonstrate your coding proficiency under timed conditions.",
    icon: Shield,
    topics: ["GCA Readiness", "Official Assessment", "Coding Evaluation", "Timed Coding"],
    estimatedHours: 3,
    outcomes: [
      "Complete comprehensive GCA preparation",
      "Demonstrate coding proficiency under time constraints",
      "Apply all learned concepts in a formal assessment",
      "Receive official GCA score and feedback"
    ]
  },
  7: {
    title: "Career Corner: Translation to Industry",
    description: "Create interview-ready career evidence. Learn system design concepts and participate in mock interviews to prepare for industry positions.",
    icon: Rocket,
    topics: ["Interview Evidence", "System Design", "Mock Interview", "Career Evidence", "Industry Preparation"],
    estimatedHours: 4,
    outcomes: [
      "Compile interview-ready career evidence portfolio",
      "Understand system design fundamentals",
      "Complete mock technical interviews",
      "Translate academic work to industry context"
    ]
  },
  8: {
    title: "Course Wrap-Up & Next Step",
    description: "Review course outcomes, complete any needed remediation, and document your next career or certification step for continued professional growth.",
    icon: Award,
    topics: ["Outcome Review", "Remediation", "Next Steps", "Certification Planning", "Career Documentation"],
    estimatedHours: 3,
    outcomes: [
      "Review and assess course learning outcomes",
      "Complete targeted remediation as needed",
      "Document next career or certification steps",
      "Create actionable professional development plan"
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
