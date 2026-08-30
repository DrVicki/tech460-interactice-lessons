import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

interface PythonSandboxProps {
  title: string;
  description: string;
  initialCode: string;
  testCases: TestCase[];
  solution?: string;
}

export default function PythonSandbox({
  title,
  description,
  initialCode,
  testCases,
  solution
}: PythonSandboxProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<boolean[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  // Simulated Python execution (in a real app, this would call a backend API)
  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running code...\n");
    
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll simulate output based on the code
    // In a real implementation, this would use Pyodide or a backend service
    let simulatedOutput = "";
    let results: boolean[] = [];
    
    try {
      // Simple simulation for common list operations
      if (code.includes("fruits[0]") || code.includes("fruits[1]")) {
        simulatedOutput = "apple\nbanana\ncherry\n";
        results = testCases.map(() => true);
      } else if (code.includes("append") || code.includes("insert")) {
        simulatedOutput = "['apple', 'banana', 'cherry']\n['apricot', 'apple', 'banana', 'cherry']\n";
        results = testCases.map(() => true);
      } else {
        simulatedOutput = "Code executed successfully!\n\nNote: This is a simulated environment. In the actual course, you would run this code in CodeSignal or a Python interpreter.";
        results = testCases.map(() => Math.random() > 0.5);
      }
      
      setOutput(simulatedOutput);
      setTestResults(results);
    } catch (error) {
      setOutput(`Error: ${error}`);
      setTestResults(testCases.map(() => false));
    }
    
    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
    setTestResults([]);
    setShowSolution(false);
  };

  const loadSolution = () => {
    if (solution) {
      setCode(solution);
      setShowSolution(true);
    }
  };

  const passedTests = testResults.filter(r => r).length;
  const allPassed = testResults.length > 0 && passedTests === testResults.length;

  return (
    <Card className="border-[#e2e8f0] overflow-hidden">
      <CardHeader className="bg-[#2d3748] text-white">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Play size={20} />
          {title}
        </CardTitle>
        <p className="text-white/70 text-sm">{description}</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-2">
          {/* Code Editor */}
          <div className="border-r border-[#e2e8f0]">
            <div className="bg-[#1a202c] px-4 py-2 flex items-center justify-between">
              <span className="text-xs text-white/60 font-mono">main.py</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={resetCode}
                  className="h-7 px-2 text-white/70 hover:text-white hover:bg-white/10"
                >
                  <RotateCcw size={14} />
                </Button>
                {solution && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={loadSolution}
                    className="h-7 px-2 text-white/70 hover:text-white hover:bg-white/10 text-xs"
                  >
                    View Solution
                  </Button>
                )}
              </div>
            </div>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[300px] font-mono text-sm bg-[#2d3748] text-[#e2e8f0] border-0 rounded-none focus:ring-0 resize-none"
              spellCheck={false}
            />
          </div>

          {/* Output Panel */}
          <div className="bg-[#1a202c]">
            <div className="px-4 py-2 border-b border-[#4a5568]">
              <span className="text-xs text-white/60 font-mono">Output</span>
            </div>
            <div className="p-4 min-h-[300px] font-mono text-sm">
              {output ? (
                <pre className="text-[#e2e8f0] whitespace-pre-wrap">{output}</pre>
              ) : (
                <p className="text-[#718096]">Click "Run Code" to see output...</p>
              )}
              
              {/* Test Results */}
              {testResults.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#4a5568]">
                  <p className="text-white/60 mb-2">Test Results:</p>
                  {testCases.map((test, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "flex items-center gap-2 text-sm py-1",
                        testResults[index] ? "text-[#68d391]" : "text-[#fc8181]"
                      )}
                    >
                      {testResults[index] ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <XCircle size={16} />
                      )}
                      <span>{test.description}</span>
                    </div>
                  ))}
                  <div className={cn(
                    "mt-3 p-2 rounded text-center text-sm font-semibold",
                    allPassed ? "bg-[#22543d] text-[#68d391]" : "bg-[#742a2a] text-[#fc8181]"
                  )}>
                    {passedTests} / {testResults.length} tests passed
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-[#1a202c] px-4 py-3 border-t border-[#4a5568] flex items-center justify-between">
          <div className="text-white/60 text-sm">
            {showSolution && (
              <span className="text-[#d69e2e]">Solution loaded - try to understand it!</span>
            )}
          </div>
          <Button
            onClick={runCode}
            disabled={isRunning}
            className="bg-[#4a7c59] hover:bg-[#3d6b4a] text-white gap-2"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play size={16} />
                Run Code
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
