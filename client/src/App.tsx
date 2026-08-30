import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ModuleOverview from "./pages/ModuleOverview";
import CareerFoundations from "./pages/CareerFoundations";
import CodeSignalIntro from "./pages/CodeSignalIntro";
import PythonLists from "./pages/PythonLists";
import ModuleCompletion from "./pages/ModuleCompletion";
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
        <TooltipProvider>
          <LessonLayout>
            <Toaster />
            <Router />
          </LessonLayout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
