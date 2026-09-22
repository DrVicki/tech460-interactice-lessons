// Professional Studio: consistent navy navigation; course progress is distinct from section review.
import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  BookOpen, 
  Target, 
  Code2, 
  Grid3X3,
  Terminal, 
  CheckCircle2, 
  Menu, 
  X,
  Home,
  StickyNote,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import NotesPanel from "./NotesPanel";
import { toast } from "sonner";
import { useModuleProgress } from "@/contexts/ModuleProgressContext";

interface LessonLayoutProps {
  children: ReactNode;
}

const sections = [
  { path: "/", label: "Home", icon: Home },
  { path: "/overview", label: "Module Overview", icon: BookOpen },
  { path: "/career", label: "Career Foundations", icon: Target },
  { path: "/codesignal", label: "CodeSignal Platform", icon: Terminal },
  { path: "/python", label: "Python Lists", icon: Code2 },
  { path: "/completion", label: "Completion", icon: CheckCircle2 },
  { path: "/module/2", label: "Module 2: Python Foundations", icon: Code2 },
  { path: "/module/3", label: "Module 3: Looping & Implementation", icon: Code2 },
  { path: "/module/4", label: "Module 4: Optimization & Matrices", icon: Grid3X3 },
];

export default function LessonLayout({ children }: LessonLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const { getOverallProgress, getCompletedCount, isModuleCompleted } = useModuleProgress();
  const progress = getOverallProgress();
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const moduleNumber = Number(location.match(/^\/module\/(\d+)/)?.[1] || 1);
  const currentModule = moduleNumber === 4 ? "Module 4: Optimization & Multidimensional Problems" : moduleNumber === 3 ? "Module 3: Looping & Interview Implementation" : moduleNumber === 2 ? "Module 2: Python Foundations & String Operations" : moduleNumber === 1 ? "Module 1: Personalizing Your Career Advancement" : `Module ${moduleNumber}`;
  const noteSections = moduleNumber === 4 ? ["General", "Module Overview", "Lesson 1: Hash Maps", "Lesson 2: Two Pointers", "Lesson 3: Matrices", "Extra Practice", "Engineering Trade-offs", "Complexity Comparison", "Boundary Test", "Debugging Correction", "Completion"] : moduleNumber === 3 ? ["General", "Module Overview", "Lesson 1: Opposite Pairs", "Lesson 2: Nested Loops", "Lesson 3: Simulations", "Your Personal Brand", "Loop Invariant", "Boundary Test", "Debugging Correction", "Completion"] : moduleNumber === 2 ? ["General", "Module Overview", "Lesson 1: Strings", "Lesson 2: Collections", "Lesson 3: Loop Control", "Completion"] : undefined;

  useEffect(() => {
    // Read existing Module 1 records without rewriting or clearing them on mount.
    try {
      const data = JSON.parse(localStorage.getItem("tech460-module1-progress") || '{}');
      setCompletedSections(Array.isArray(data.completed) ? data.completed : []);
    } catch { setCompletedSections([]); }
  }, [location]);

  const resetCourse = () => {
    // Include every module workbook while leaving other sites' data untouched.
    Object.keys(localStorage).filter(key => key.startsWith("tech460-")).forEach(key => localStorage.removeItem(key));
    
    // Show success message
    toast.success("Course progress has been reset", {
      description: "All your progress, notes, and saved data have been cleared."
    });
    
    // Reload the page to ensure all components reset
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a365d] text-white shadow-lg">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              aria-label={sidebarOpen ? "Close course navigation" : "Open course navigation"}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/manus-storage/tech460-logo_04dcbc26.png" 
                alt="TECH460 Logo" 
                className="h-12 w-12 rounded-full ring-1 ring-[#d69e2e]/60"
              />
              <div className="hidden sm:block">
                <div className="font-semibold text-sm leading-tight"><strong className="text-xl font-bold tracking-wide">TECH460</strong><span className="hidden xl:inline mx-3 text-[#d69e2e]">/</span><span className="block xl:inline">Interactive Learning Platform</span></div>
                <p className="text-xs text-white/80">Created by Dr. Vicki Bealman</p>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setNotesOpen(true)}
              aria-label="Open learning notes"
              className="text-white hover:bg-white/10 gap-2"
            >
              <StickyNote size={18} />
              <span className="hidden sm:inline">Notes</span>
            </Button>
            
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-white/80">Course:</span>
              <div className="w-32">
                <Progress value={progress} className="h-2 bg-white/20" />
              </div>
              <span className="text-sm font-semibold">{progress}%</span>
            </div>

            {/* Reset Course Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white hover:bg-white/10 gap-2"
                  title="Reset Course Progress"
                >
                  <RotateCcw size={18} />
                  <span className="hidden sm:inline">Reset</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Course Progress?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your progress, notes, career plan data, 
                    and completed sections. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={resetCourse}
                    className="bg-[#c53030] hover:bg-[#9b2c2c] text-white"
                  >
                    Reset Course
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-[#e2e8f0] overflow-y-auto lg:overflow-visible transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full pt-20 lg:pt-6">
            <nav className="flex-1 px-4 space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = location === section.path || (section.path !== "/" && location.startsWith(section.path + "/"));
                const sectionModule = section.path.match(/^\/module\/(\d+)$/);
                const isCompleted = sectionModule ? isModuleCompleted(Number(sectionModule[1])) : completedSections.includes(section.path);
                
                return (
                  <Link
                    key={section.path}
                    href={section.path}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-[#1a365d] text-white shadow-md" 
                        : "text-[#2d3748] hover:bg-[#f7fafc] hover:text-[#1a365d]",
                      isCompleted && !isActive && "text-[#4a7c59]"
                    )}
                  >
                    <Icon size={20} className={cn(
                      isCompleted && !isActive && "text-[#4a7c59]"
                    )} />
                    <span className="flex-1">{section.label}</span>
                    {isCompleted && (
                      <CheckCircle2 size={18} className={isActive ? "text-white" : "text-[#4a7c59]"} />
                    )}
                  </Link>
                );
              })}
            </nav>
            
            {/* Progress Summary */}
            <div className="p-4 border-t border-[#e2e8f0]">
              <div className="bg-[#f7fafc] rounded-lg p-4">
                <h3 className="font-semibold text-[#1a365d] mb-2">Course Progress</h3>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-sm text-[#4a5568]">
                  {getCompletedCount()} of 8 modules complete
                </p>
              </div>
              
              {/* Reset Button in Sidebar */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 text-[#718096] border-[#e2e8f0] hover:bg-[#f7fafc] hover:text-[#c53030] hover:border-[#c53030]"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Reset Course
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset Course Progress?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your progress, notes, career plan data, 
                      and completed sections. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={resetCourse}
                      className="bg-[#c53030] hover:bg-[#9b2c2c] text-white"
                    >
                      Reset Course
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>

      {/* Notes Panel */}
      <NotesPanel 
        isOpen={notesOpen} 
        onClose={() => setNotesOpen(false)} 
        currentModule={currentModule}
        sectionOptions={noteSections}
      />
    </div>
  );
}
