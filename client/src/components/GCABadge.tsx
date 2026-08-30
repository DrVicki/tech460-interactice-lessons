import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  CheckCircle2, 
  Code2, 
  Target,
  TrendingUp,
  Shield,
  Star
} from "lucide-react";

export default function GCABadge() {
  const benefits = [
    { icon: CheckCircle2, text: "Industry-recognized credential" },
    { icon: TrendingUp, text: "Demonstrates coding proficiency" },
    { icon: Target, text: "Validates problem-solving skills" },
    { icon: Shield, text: "Employer-trusted assessment" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#1a365d] to-[#2d3748]">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Badge Visual */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Outer Ring */}
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#d69e2e] to-[#b7791f] p-2 shadow-2xl">
                  {/* Inner Circle */}
                  <div className="w-full h-full rounded-full bg-[#1a365d] flex flex-col items-center justify-center text-white p-6 border-4 border-white/20">
                    {/* Star decoration */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Star size={32} className="text-[#d69e2e] fill-[#d69e2e]" />
                    </div>
                    
                    {/* Badge Content */}
                    <Award size={48} className="text-[#d69e2e] mb-3" />
                    <h3 className="text-2xl font-bold text-center mb-1">GCA</h3>
                    <p className="text-sm text-white/80 text-center mb-2">General Coding</p>
                    <p className="text-sm text-white/80 text-center mb-3">Assessment</p>
                    <Badge className="bg-[#4a7c59] text-white border-0">
                      Certified
                    </Badge>
                    
                    {/* Code decoration */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                      <Code2 size={16} className="text-white/40" />
                      <Code2 size={16} className="text-white/40" />
                      <Code2 size={16} className="text-white/40" />
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#4a7c59] rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 size={24} className="text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-[#d69e2e] rounded-full flex items-center justify-center shadow-lg">
                  <Code2 size={20} className="text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-white">
              <Badge className="bg-[#d69e2e] text-white border-0 mb-4">
                Certification Goal
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Earn Your GCA Certification
              </h2>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                The General Coding Assessment (GCA) is an industry-recognized certification 
                that validates your programming skills to employers. Through this course, 
                you'll build the knowledge and confidence needed to pass the GCA and 
                showcase your technical abilities.
              </p>
              
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-1.5 bg-[#4a7c59] rounded-full">
                        <Icon size={16} className="text-white" />
                      </div>
                      <span className="text-white/90">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                <p className="text-sm text-white/80">
                  <strong className="text-white">Did you know?</strong> Many top tech companies 
                  use CodeSignal assessments in their hiring process. Your GCA score can be 
                  shared directly with potential employers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
