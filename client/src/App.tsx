import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ModuleProgressProvider } from "./contexts/ModuleProgressContext";
import Home from "./pages/Home";
import ModuleOverview from "./pages/ModuleOverview";
import CareerFoundations from "./pages/CareerFoundations";
import CodeSignalIntro from "./pages/CodeSignalIntro";
import PythonLists from "./pages/PythonLists";
import ModuleCompletion from "./pages/ModuleCompletion";
import ModulePlaceholder from "./pages/ModulePlaceholder";
import GCACertificateExample from "./pages/GCACertificateExample";
import LessonLayout from "./components/LessonLayout";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/overview"} component={ModuleOverview} />
      <Route path={"/career"} component={CareerFoundations} />
      <Route path={"/codesignal"} component={CodeSignalIntro} />
      <Route path={"/python"} component={PythonLists} />
      <Route path={"/completion"} component={ModuleCompletion} />
      <Route path={"/module/2"} component={() => <ModulePlaceholder moduleNumber={2} />} />
      <Route path={"/module/3"} component={() => <ModulePlaceholder moduleNumber={3} />} />
      <Route path={"/module/4"} component={() => <ModulePlaceholder moduleNumber={4} />} />
      <Route path={"/module/5"} component={() => <ModulePlaceholder moduleNumber={5} />} />
      <Route path={"/module/6"} component={() => <ModulePlaceholder moduleNumber={6} />} />
      <Route path={"/module/7"} component={() => <ModulePlaceholder moduleNumber={7} />} />
      <Route path={"/module/8"} component={() => <ModulePlaceholder moduleNumber={8} />} />
      <Route path={"/certificate-example"} component={GCACertificateExample} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <ModuleProgressProvider>
          <TooltipProvider>
            <LessonLayout>
              <Toaster />
              <Router />
            </LessonLayout>
          </TooltipProvider>
        </ModuleProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
