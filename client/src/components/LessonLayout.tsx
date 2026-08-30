import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Target, 
  Code2, 
  Terminal, 
  CheckCircle2, 
  Menu, 
  X,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

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
];

export default function LessonLayout({ children }: LessonLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem("tech460-module1-progress");
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedSections(data.completed || []);
      setProgress(data.progress || 0);
    }
  }, []);

  useEffect(() => {
    // Update progress based on completed sections
    const newProgress = Math.round((completedSections.length / (sections.length - 1)) * 100);
    setProgress(newProgress);
    localStorage.setItem("tech460-module1-progress", JSON.stringify({
      completed: completedSections,
      progress: newProgress
    }));
  }, [completedSections]);

  const markComplete = (path: string) => {
    if (!completedSections.includes(path) && path !== "/") {
      setCompletedSections([...completedSections, path]);
    }
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
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/manus-storage/tech460-logo_04dcbc26.png" 
                alt="TECH460 Logo" 
                className="h-10 w-10 rounded-full"
              />
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg leading-tight">TECH460</h1>
                <p className="text-xs text-white/80">Module 1: Career Advancement</p>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-white/80">Progress:</span>
              <div className="w-32">
                <Progress value={progress} className="h-2 bg-white/20" />
              </div>
              <span className="text-sm font-semibold">{progress}%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-[#e2e8f0] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full pt-20 lg:pt-6">
            <nav className="flex-1 px-4 space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = location === section.path;
                const isCompleted = completedSections.includes(section.path);
                
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
                      <CheckCircle2 size={18} className="text-[#4a7c59]" />
                    )}
                  </Link>
                );
              })}
            </nav>
            
            {/* Progress Summary */}
            <div className="p-4 border-t border-[#e2e8f0]">
              <div className="bg-[#f7fafc] rounded-lg p-4">
                <h3 className="font-semibold text-[#1a365d] mb-2">Your Progress</h3>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-sm text-[#4a5568]">
                  {completedSections.length} of {sections.length - 1} sections complete
                </p>
              </div>
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
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
