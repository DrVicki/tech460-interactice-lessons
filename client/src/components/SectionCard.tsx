import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "highlight" | "code" | "career";
}

export default function SectionCard({ 
  title, 
  description, 
  children, 
  className,
  variant = "default" 
}: SectionCardProps) {
  const variantStyles = {
    default: "bg-white border-[#e2e8f0]",
    highlight: "bg-[#fffbeb] border-[#d69e2e]/30",
    code: "bg-[#2d3748] text-white border-[#4a5568]",
    career: "bg-[#f0fff4] border-[#4a7c59]/30"
  };

  return (
    <Card className={cn(
      "shadow-sm hover:shadow-md transition-shadow duration-200",
      variantStyles[variant],
      className
    )}>
      <CardHeader>
        <CardTitle className={cn(
          "text-xl",
          variant === "code" ? "text-white" : "text-[#1a365d]"
        )}>
          {title}
        </CardTitle>
        {description && (
          <CardDescription className={cn(
            variant === "code" ? "text-white/70" : "text-[#4a5568]"
          )}>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
