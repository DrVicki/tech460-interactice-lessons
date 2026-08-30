import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({ 
  code, 
  language = "python",
  showLineNumbers = true 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </Button>
      </div>
      <div className="bg-[#2d3748] rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-[#1a202c] border-b border-[#4a5568]">
          <span className="text-xs text-white/60 font-mono">{language}</span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-[#e2e8f0]">
            {showLineNumbers ? (
              lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-8 text-[#718096] select-none">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
