import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Lightbulb, Save } from "lucide-react";

interface ReflectionPromptProps {
  title: string;
  prompt: string;
  placeholder?: string;
  onSave?: (response: string) => void;
}

export default function ReflectionPrompt({
  title,
  prompt,
  placeholder = "Type your reflection here...",
  onSave
}: ReflectionPromptProps) {
  const [response, setResponse] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (response.trim()) {
      onSave?.(response);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <Card className="bg-[#fffbeb] border-[#d69e2e]/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#1a365d]">
          <Lightbulb size={24} className="text-[#d69e2e]" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-[#4a5568]">{prompt}</p>
        <Textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder={placeholder}
          className="min-h-[120px] bg-white border-[#e2e8f0] focus:border-[#d69e2e]"
        />
        <Button
          onClick={handleSave}
          disabled={!response.trim()}
          className="gap-2 bg-[#d69e2e] hover:bg-[#b7791f] text-white"
        >
          <Save size={18} />
          {saved ? "Saved!" : "Save Reflection"}
        </Button>
      </CardContent>
    </Card>
  );
}

