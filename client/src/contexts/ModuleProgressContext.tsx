import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MODULE3_KEY, parseModule3, readyForModule3 } from "@/lib/module3Progress";

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
    try {
      const saved = JSON.parse(localStorage.getItem("tech460-module-progress") || 'null');
      if (Array.isArray(saved)) return initial.map(entry => {
        const match = saved.find(m => m?.moduleNumber === entry.moduleNumber);
        return match?.completed === true ? { ...entry, completed: true, completedAt: typeof match.completedAt === 'string' ? match.completedAt : undefined } : entry;
      });
    } catch { /* Use an empty course state if browser data is unavailable. */ }
    return initial;
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try { localStorage.setItem("tech460-module-progress", JSON.stringify(moduleProgress)); }
    catch { /* Local-only course remains usable when browser storage is blocked. */ }
  }, [moduleProgress]);

  const markModuleComplete = (moduleNumber: number) => {
    if (moduleNumber === 3) {
      try {
        if (!moduleProgress.find(m => m.moduleNumber === 2)?.completed || !readyForModule3(parseModule3(localStorage.getItem(MODULE3_KEY)))) return;
      } catch { return; }
    }
    setModuleProgress(prev => 
      prev.map(m => 
        m.moduleNumber === moduleNumber && !m.completed
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
