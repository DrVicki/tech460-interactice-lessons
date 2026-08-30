import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ModuleProgress {
  moduleNumber: number;
  completed: boolean;
  completedAt?: string;
}

interface ModuleProgressContextType {
  moduleProgress: ModuleProgress[];
  markModuleComplete: (moduleNumber: number) => void;
  isModuleUnlocked: (moduleNumber: number) => boolean;
  isModuleCompleted: (moduleNumber: number) => boolean;
  getCompletedCount: () => number;
  getOverallProgress: () => number;
  resetProgress: () => void;
}

const ModuleProgressContext = createContext<ModuleProgressContextType | undefined>(undefined);

const TOTAL_MODULES = 8;

export function ModuleProgressProvider({ children }: { children: ReactNode }) {
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>(() => {
    // Initialize with Module 1 unlocked, others locked
    const initial: ModuleProgress[] = [];
    for (let i = 1; i <= TOTAL_MODULES; i++) {
      initial.push({
        moduleNumber: i,
        completed: false
      });
    }
    return initial;
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tech460-module-progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setModuleProgress(parsed);
      } catch (e) {
        console.error("Failed to parse module progress:", e);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("tech460-module-progress", JSON.stringify(moduleProgress));
  }, [moduleProgress]);

  const markModuleComplete = (moduleNumber: number) => {
    setModuleProgress(prev => 
      prev.map(m => 
        m.moduleNumber === moduleNumber 
          ? { ...m, completed: true, completedAt: new Date().toISOString() }
          : m
      )
    );
  };

  const isModuleUnlocked = (moduleNumber: number) => {
    if (moduleNumber === 1) return true;
    // Module is unlocked if previous module is completed
    const previousModule = moduleProgress.find(m => m.moduleNumber === moduleNumber - 1);
    return previousModule?.completed || false;
  };

  const isModuleCompleted = (moduleNumber: number) => {
    const module = moduleProgress.find(m => m.moduleNumber === moduleNumber);
    return module?.completed || false;
  };

  const getCompletedCount = () => {
    return moduleProgress.filter(m => m.completed).length;
  };

  const getOverallProgress = () => {
    return Math.round((getCompletedCount() / TOTAL_MODULES) * 100);
  };

  const resetProgress = () => {
    const initial: ModuleProgress[] = [];
    for (let i = 1; i <= TOTAL_MODULES; i++) {
      initial.push({
        moduleNumber: i,
        completed: false
      });
    }
    setModuleProgress(initial);
  };

  return (
    <ModuleProgressContext.Provider value={{
      moduleProgress,
      markModuleComplete,
      isModuleUnlocked,
      isModuleCompleted,
      getCompletedCount,
      getOverallProgress,
      resetProgress
    }}>
      {children}
    </ModuleProgressContext.Provider>
  );
}

export function useModuleProgress() {
  const context = useContext(ModuleProgressContext);
  if (context === undefined) {
    throw new Error("useModuleProgress must be used within a ModuleProgressProvider");
  }
  return context;
}
