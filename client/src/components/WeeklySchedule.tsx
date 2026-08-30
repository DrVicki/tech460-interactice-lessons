import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Target,
  Code2,
  Repeat,
  Grid3X3,
  Timer,
  FileCheck,
  Briefcase,
  Flag,
  ArrowRight,
  CheckCircle2,
  Lock
} from "lucide-react";
import { useModuleProgress } from "@/contexts/ModuleProgressContext";

const weeklySchedule = [
  {
    week: 1,
    module: 1,
    title: "Career Advancement & GCA Orientation",
    focus: "Modules 1-2 orientation",
    activities: "Self-assessment, advancement plan, and GCA/Python readiness",
    outcome: "Launch a career and certification plan",
    icon: Target,
    color: "bg-[#d69e2e]"
  },
  {
    week: 2,
    module: 2,
    title: "Python Foundations & String Operations",
    focus: "Module 2 application",
    activities: "Python, strings, and implementation planning",
    outcome: "Document reliable foundation habits",
    icon: Code2,
    color: "bg-[#4a7c59]"
  },
  {
    week: 3,
    module: 3,
    title: "Looping & Interview Implementation",
    focus: "Module 3",
    activities: "Looping, pair discovery, and timed practice",
    outcome: "Demonstrate structured traversal and debugging",
    icon: Repeat,
    color: "bg-[#2d3748]"
  },
  {
    week: 4,
    module: 4,
    title: "Optimization & Multidimensional Problems",
    focus: "Module 4",
    activities: "Hash maps, pointers, matrices, and discussion",
    outcome: "Explain correct, efficient trade-offs",
    icon: Grid3X3,
    color: "bg-[#1a365d]"
  },
  {
    week: 5,
    module: 5,
    title: "Timed Readiness & Efficient Problem Solving",
    focus: "Module 5",
    activities: "Decomposition, efficiency, and GCA strategy",
    outcome: "Prioritize remaining GCA review needs",
    icon: Timer,
    color: "bg-[#d69e2e]"
  },
  {
    week: 6,
    module: 6,
    title: "Official General Coding Assessment",
    focus: "Module 6",
    activities: "GCA readiness and official assessment",
    outcome: "Complete the assigned GCA",
    icon: FileCheck,
    color: "bg-[#c53030]"
  },
  {
    week: 7,
    module: 7,
    title: "Career Corner: Translation to Industry",
    focus: "Module 7",
    activities: "Interview evidence, system design, and mock interview",
    outcome: "Create interview-ready career evidence",
    icon: Briefcase,
    color: "bg-[#4a7c59]"
  },
  {
    week: 8,
    module: 8,
    title: "Course Wrap-Up & Next Step",
    focus: "Module 8",
    activities: "Outcome review, remediation, and next step",
    outcome: "Document the next career or certification step",
    icon: Flag,
    color: "bg-[#1a365d]"
  }
];

export default function WeeklySchedule() {
  const { isModuleCompleted, isModuleUnlocked } = useModuleProgress();

  return (
    <div className="space-y-4">
      {/* Desktop View - Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weeklySchedule.map((week) => {
          const Icon = week.icon;
          const isCompleted = isModuleCompleted(week.module);
          const isUnlocked = isModuleUnlocked(week.module);
          const isCurrent = week.week === 1 || (isUnlocked && !isCompleted && week.week > 1);
          
          return (
            <Card 
              key={week.week}
              className={`
                relative overflow-hidden transition-all duration-300
                ${isCompleted 
                  ? 'border-[#4a7c59] bg-[#f0fff4]' 
                  : isCurrent 
                    ? 'border-[#d69e2e] shadow-lg ring-2 ring-[#d69e2e]/20' 
                    : 'border-[#e2e8f0] opacity-75'
                }
              `}
            >
              {/* Week Number Badge */}
              <div className={`
                absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white
                ${isCompleted ? 'bg-[#4a7c59]' : isCurrent ? 'bg-[#d69e2e]' : 'bg-[#718096]'}
              `}>
                Week {week.week}
              </div>
              
              <CardContent className="p-5 pt-8">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`
                    p-2 rounded-lg text-white
                    ${isCompleted ? 'bg-[#4a7c59]' : isCurrent ? week.color : 'bg-[#a0aec0]'}
                  `}>
                    {isCompleted ? (
                      <CheckCircle2 size={20} />
                    ) : !isUnlocked ? (
                      <Lock size={20} />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`
                      font-bold text-sm leading-tight
                      ${isCompleted ? 'text-[#4a7c59]' : isCurrent ? 'text-[#1a365d]' : 'text-[#718096]'}
                    `}>
                      {week.title}
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <p className="text-[#4a5568]">
                    <span className="font-semibold">Focus:</span> {week.focus}
                  </p>
                  <p className="text-[#4a5568] line-clamp-2">
                    <span className="font-semibold">Activities:</span> {week.activities}
                  </p>
                  <p className={`
                    font-medium
                    ${isCompleted ? 'text-[#4a7c59]' : 'text-[#1a365d]'}
                  `}>
                    <span className="font-semibold">Outcome:</span> {week.outcome}
                  </p>
                </div>

                {isCurrent && !isCompleted && (
                  <Link href={week.week === 1 ? "/overview" : `/module/${week.module}`}>
                    <Button size="sm" className="w-full mt-4 bg-[#d69e2e] hover:bg-[#b7791f] text-white">
                      Start Week {week.week}
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </Link>
                )}

                {isCompleted && (
                  <div className="mt-4 flex items-center justify-center gap-1 text-[#4a7c59] text-sm font-medium">
                    <CheckCircle2 size={16} />
                    Completed
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mobile View - List */}
      <div className="md:hidden space-y-3">
        {weeklySchedule.map((week) => {
          const Icon = week.icon;
          const isCompleted = isModuleCompleted(week.module);
          const isUnlocked = isModuleUnlocked(week.module);
          const isCurrent = week.week === 1 || (isUnlocked && !isCompleted && week.week > 1);
          
          return (
            <Card 
              key={week.week}
              className={`
                border-l-4
                ${isCompleted 
                  ? 'border-l-[#4a7c59] bg-[#f0fff4]' 
                  : isCurrent 
                    ? 'border-l-[#d69e2e]' 
                    : 'border-l-[#e2e8f0] opacity-75'
                }
              `}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`
                    p-2 rounded-lg text-white flex-shrink-0
                    ${isCompleted ? 'bg-[#4a7c59]' : isCurrent ? week.color : 'bg-[#a0aec0]'}
                  `}>
                    {isCompleted ? (
                      <CheckCircle2 size={18} />
                    ) : !isUnlocked ? (
                      <Lock size={18} />
                    ) : (
                      <Icon size={18} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant="outline" 
                        className={`
                          text-xs
                          ${isCompleted ? 'border-[#4a7c59] text-[#4a7c59]' : ''}
                        `}
                      >
                        Week {week.week}
                      </Badge>
                      {isCompleted && (
                        <Badge className="bg-[#4a7c59] text-white text-xs">Done</Badge>
                      )}
                      {isCurrent && !isCompleted && (
                        <Badge className="bg-[#d69e2e] text-white text-xs">Current</Badge>
                      )}
                    </div>
                    
                    <h3 className={`
                      font-bold text-sm mb-2
                      ${isCompleted ? 'text-[#4a7c59]' : isCurrent ? 'text-[#1a365d]' : 'text-[#718096]'}
                    `}>
                      {week.title}
                    </h3>
                    
                    <p className="text-xs text-[#4a5568] mb-1">
                      {week.activities}
                    </p>
                    <p className="text-xs font-medium text-[#1a365d]">
                      {week.outcome}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
