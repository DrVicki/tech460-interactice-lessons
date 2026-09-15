// Professional Studio: readable code workspaces with explicit external-editor boundaries.
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Play, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  ExternalLink,
  Lightbulb
} from "lucide-react";

interface CodeEditorProps {
  title?: string;
  description?: string;
  initialCode?: string;
  stdin?: string;
  height?: string;
}

export default function CodeEditor({
  title = "Python Code Editor",
  description = "Write and run Python code directly in your browser",
  initialCode = "name = input()\nage = int(input())\nprint(f\"Hello, {name}! You are {age} years old.\")",
  stdin = "Alice\n30",
  height = "500px"
}: CodeEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [key, setKey] = useState(0);

  // Encode the code and stdin for the Coddy embed URL
  const encode = (text: string) => btoa(Array.from(new TextEncoder().encode(text), byte => String.fromCharCode(byte)).join(''));
  const params = new URLSearchParams({ lang: 'python', theme: 'light', code: encode(initialCode), stdin: encode(stdin), credit: '0' });
  const embedUrl = `https://coddy.tech/embed-editor?${params.toString()}`;

  const resetEditor = () => {
    setKey(prev => prev + 1);
  };

  const openInNewTab = () => {
    window.open(embedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="border-[#e2e8f0] overflow-hidden">
      <CardHeader className="bg-[#2d3748] text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#4a7c59] rounded-lg">
              <Code2 size={20} />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className="text-white/70 text-sm">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-white/70 border-white/30 text-xs">
              Python 3
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetEditor}
              className="text-white/70 hover:text-white hover:bg-white/10"
              title="Reset Editor"
              aria-label="Reset Editor"
            >
              <RotateCcw size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white/70 hover:text-white hover:bg-white/10"
              title={isExpanded ? "Minimize" : "Maximize"}
              aria-label={isExpanded ? "Minimize editor" : "Maximize editor"}
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={openInNewTab}
              className="text-white/70 hover:text-white hover:bg-white/10"
              title="Open in New Tab"
              aria-label="Open Python editor in new tab"
            >
              <ExternalLink size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          className={`
            relative transition-all duration-300 bg-white
            ${isExpanded ? 'fixed inset-4 z-50 rounded-lg shadow-2xl' : ''}
          `}
          style={{ height: isExpanded ? 'calc(100vh - 2rem)' : height }}
        >
          {isExpanded && (
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsExpanded(false)}
            />
          )}
          {isExpanded && <Button onClick={() => setIsExpanded(false)} className="absolute right-3 top-3 z-[60] bg-[#1a365d] text-white">Close expanded editor</Button>}
          <iframe
            key={key}
            src={embedUrl}
            className={`
              w-full h-full border-0
              ${isExpanded ? 'relative z-50 rounded-lg' : ''}
            `}
            title="Python Code Editor"
            allow="clipboard-write"
            loading="lazy"
          />
        </div>
        
        {/* Tips Section */}
        <div className="bg-[#f7fafc] border-t border-[#e2e8f0] p-4">
          <div className="flex items-start gap-3">
            <Lightbulb size={18} className="text-[#d69e2e] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-[#4a5568]">
              <p className="font-semibold text-[#1a365d] mb-1">Tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Click the play button or press Ctrl+Enter to run your code</li>
                <li>Use the input section to provide test data for your program</li>
                <li>This external editor does not submit to Canvas. Copy your code before resetting, switching activities, or leaving the page.</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
