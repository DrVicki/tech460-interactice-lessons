import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users, 
  Briefcase,
  Mail,
  Linkedin,
  ExternalLink
} from "lucide-react";

export default function MeetDrVicki() {
  const credentials = [
    { icon: GraduationCap, text: "Ph.D. in Computer Science" },
    { icon: Award, text: "Certified Technical Trainer" },
    { icon: Briefcase, text: "15+ Years Industry Experience" },
    { icon: Users, text: "500+ Students Mentored" }
  ];

  const expertise = [
    "Python Programming",
    "Technical Interview Prep",
    "Career Development",
    "GCA Certification",
    "Data Structures",
    "Algorithm Design"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a365d] mb-4">
              Meet Your Instructor
            </h2>
            <p className="text-lg text-[#4a5568]">
              Learn from an experienced educator dedicated to your success
            </p>
          </div>

          <Card className="border-[#e2e8f0] overflow-hidden">
            <div className="md:flex">
              {/* Profile Image Section */}
              <div className="md:w-1/3 bg-gradient-to-br from-[#1a365d] to-[#2d3748] p-8 flex flex-col items-center justify-center text-white">
                <div className="w-40 h-40 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center mb-6 overflow-hidden">
                  <div className="w-full h-full bg-[#4a7c59] flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">VB</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">Dr. Vicki Bealman</h3>
                <p className="text-white/80 text-center mb-4">Professor of Computer Science</p>
                <div className="flex gap-3">
                  <a 
                    href="mailto:vbealman@devry.edu" 
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    title="Email Dr. Bealman"
                  >
                    <Mail size={20} />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    title="LinkedIn Profile"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>

              {/* Bio Section */}
              <div className="md:w-2/3 p-8">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#1a365d] mb-3 flex items-center gap-2">
                    <BookOpen size={20} />
                    About Dr. Bealman
                  </h4>
                  <p className="text-[#4a5568] leading-relaxed mb-4">
                    Dr. Vicki Bealman is a dedicated educator and industry professional with over 15 years 
                    of experience in computer science and software development. She specializes in preparing 
                    students for technical careers through hands-on learning and practical skill development.
                  </p>
                  <p className="text-[#4a5568] leading-relaxed">
                    Her passion for student success led her to develop this interactive learning platform, 
                    combining her expertise in Python programming, technical interview preparation, and 
                    career development to help students excel in the General Coding Assessment and beyond.
                  </p>
                </div>

                {/* Credentials Grid */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#1a365d] mb-3">Credentials & Experience</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {credentials.map((cred, index) => {
                      const Icon = cred.icon;
                      return (
                        <div key={index} className="flex items-center gap-2 text-sm text-[#4a5568]">
                          <Icon size={16} className="text-[#4a7c59]" />
                          <span>{cred.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Areas of Expertise */}
                <div>
                  <h4 className="text-lg font-semibold text-[#1a365d] mb-3">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {expertise.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="border-[#4a7c59] text-[#4a7c59] hover:bg-[#4a7c59] hover:text-white transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="bg-[#f7fafc] border-t border-[#e2e8f0] p-6">
              <blockquote className="text-center italic text-[#4a5568]">
                "My goal is to empower every student with the skills and confidence they need to succeed 
                in their technical careers. The GCA certification is just the beginning of your journey."
              </blockquote>
              <p className="text-center text-sm text-[#718096] mt-2">— Dr. Vicki Bealman</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
