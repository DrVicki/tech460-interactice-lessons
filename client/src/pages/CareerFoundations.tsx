import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import SectionCard from "@/components/SectionCard";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import CheckpointButton from "@/components/CheckpointButton";
import { 
  ArrowRight, 
  ArrowLeft,
  Target,
  MessageSquare,
  CheckCircle2,
  Plus,
  Trash2,
  Award,
  TrendingUp,
  Download,
  FileText
} from "lucide-react";

interface Goal {
  id: string;
  type: "short" | "long";
  title: string;
  description: string;
  targetDate: string;
}

export default function CareerFoundations() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<{ type: "short" | "long"; title: string; description: string; targetDate: string }>({ type: "short", title: "", description: "", targetDate: "" });
  const [strengths, setStrengths] = useState<string[]>([]);
  const [growthAreas, setGrowthAreas] = useState<string[]>([]);
  const [newStrength, setNewStrength] = useState("");
  const [newGrowthArea, setNewGrowthArea] = useState("");
  const [missionStatement, setMissionStatement] = useState("");

  const addGoal = () => {
    if (newGoal.title && newGoal.targetDate) {
      setGoals([...goals, { ...newGoal, id: Date.now().toString() }]);
      setNewGoal({ type: "short", title: "", description: "", targetDate: "" });
    }
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const addStrength = () => {
    if (newStrength.trim()) {
      setStrengths([...strengths, newStrength.trim()]);
      setNewStrength("");
    }
  };

  const addGrowthArea = () => {
    if (newGrowthArea.trim()) {
      setGrowthAreas([...growthAreas, newGrowthArea.trim()]);
      setNewGrowthArea("");
    }
  };

  const exportToPDF = () => {
    // Create a printable version of the career plan
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>TECH460 Career Advancement Plan</title>
        <style>
          body {
            font-family: 'Source Sans 3', Arial, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #1a365d;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #1a365d;
            font-size: 28px;
            margin: 0 0 10px 0;
          }
          .header p {
            color: #4a5568;
            margin: 0;
          }
          .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .section h2 {
            color: #1a365d;
            font-size: 20px;
            border-bottom: 2px solid #4a7c59;
            padding-bottom: 8px;
            margin-bottom: 15px;
          }
          .badge {
            display: inline-block;
            background: #4a7c59;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            margin: 4px;
          }
          .badge.growth {
            background: #d69e2e;
          }
          .goal-card {
            background: #f7fafc;
            border-left: 4px solid #1a365d;
            padding: 15px;
            margin: 10px 0;
          }
          .goal-card.short-term {
            border-left-color: #4a7c59;
          }
          .goal-card h3 {
            margin: 0 0 8px 0;
            color: #1a365d;
          }
          .goal-meta {
            font-size: 14px;
            color: #718096;
            margin-bottom: 8px;
          }
          .mission-statement {
            background: #f0fff4;
            border: 1px solid #4a7c59;
            padding: 20px;
            border-radius: 8px;
            font-style: italic;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #718096;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
          }
          @media print {
            body {
              padding: 20px;
            }
            .section {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>TECH460 Career Advancement Plan</h1>
          <p>Module 1: Personalizing Your Career Advancement</p>
          <p>Generated on ${currentDate}</p>
        </div>

        <div class="section">
          <h2>Professional Strengths</h2>
          <div>
            ${strengths.length > 0 
              ? strengths.map(s => `<span class="badge">${s}</span>`).join('')
              : '<p>No strengths identified yet.</p>'
            }
          </div>
        </div>

        <div class="section">
          <h2>Areas for Growth</h2>
          <div>
            ${growthAreas.length > 0 
              ? growthAreas.map(a => `<span class="badge growth">${a}</span>`).join('')
              : '<p>No growth areas identified yet.</p>'
            }
          </div>
        </div>

        <div class="section">
          <h2>SMART Career Goals</h2>
          ${goals.length > 0 
            ? goals.map(goal => `
              <div class="goal-card ${goal.type}-term">
                <h3>${goal.title}</h3>
                <div class="goal-meta">
                  <strong>Type:</strong> ${goal.type === 'short' ? 'Short-term' : 'Long-term'} | 
                  <strong>Target Date:</strong> ${new Date(goal.targetDate).toLocaleDateString()}
                </div>
                ${goal.description ? `<p>${goal.description}</p>` : ''}
              </div>
            `).join('')
            : '<p>No goals created yet.</p>'
          }
        </div>

        <div class="section">
          <h2>Personal Mission Statement</h2>
          <div class="mission-statement">
            ${missionStatement || '<p>No mission statement written yet.</p>'}
          </div>
        </div>

        <div class="footer">
          <p>TECH460 Senior Project - DeVry University</p>
          <p>This document was generated from the interactive Module 1 lesson.</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[#4a5568] mb-4">
            <Link href="/" className="hover:text-[#1a365d]">Home</Link>
            <span>/</span>
            <span className="text-[#1a365d]">Career Foundations</span>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#4a7c59] text-white">
              <Target size={28} />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1a365d]">
                Career Foundations
              </h1>
              <p className="text-[#4a5568]">Estimated time: 45 minutes</p>
            </div>
          </div>
          
          <p className="text-lg text-[#4a5568] leading-relaxed">
            In this section, you'll develop a personalized career advancement strategy through 
            self-assessment, goal setting, and mission statement creation. This foundation will 
            guide your work throughout the TECH460 Senior Project course.
          </p>
          
          {/* Export Button */}
          <div className="mt-6 flex justify-end">
            <Button
              onClick={exportToPDF}
              variant="outline"
              className="gap-2 border-[#1a365d] text-[#1a365d] hover:bg-[#1a365d] hover:text-white"
            >
              <Download size={18} />
              Export Career Plan as PDF
            </Button>
          </div>
        </div>

        {/* Step 1: Self-Assessment */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1a365d] text-white flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-2xl font-bold text-[#1a365d]">Self-Assessment</h2>
          </div>

          <SectionCard 
            title="Identify Your Professional Strengths" 
            description="List 3-5 technical or soft skills where you excel"
            className="mb-6"
          >
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newStrength}
                  onChange={(e) => setNewStrength(e.target.value)}
                  placeholder="e.g., Python programming, problem-solving, team collaboration..."
                  onKeyPress={(e) => e.key === "Enter" && addStrength()}
                />
                <Button onClick={addStrength} className="bg-[#4a7c59] hover:bg-[#3d6b4a]">
                  <Plus size={18} />
                </Button>
              </div>
              
              {strengths.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {strengths.map((strength, index) => (
                    <Badge 
                      key={index} 
                      className="bg-[#4a7c59] text-white px-3 py-1 flex items-center gap-2"
                    >
                      {strength}
                      <button 
                        onClick={() => setStrengths(strengths.filter((_, i) => i !== index))}
                        className="hover:text-white/80"
                      >
                        <Trash2 size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard 
            title="Identify Areas for Growth" 
            description="List 2-3 skills or competencies you want to develop"
            className="mb-6"
          >
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newGrowthArea}
                  onChange={(e) => setNewGrowthArea(e.target.value)}
                  placeholder="e.g., cloud architecture, public speaking, project management..."
                  onKeyPress={(e) => e.key === "Enter" && addGrowthArea()}
                />
                <Button onClick={addGrowthArea} className="bg-[#d69e2e] hover:bg-[#b7791f]">
                  <Plus size={18} />
                </Button>
              </div>
              
              {growthAreas.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {growthAreas.map((area, index) => (
                    <Badge 
                      key={index} 
                      className="bg-[#d69e2e] text-white px-3 py-1 flex items-center gap-2"
                    >
                      {area}
                      <button 
                        onClick={() => setGrowthAreas(growthAreas.filter((_, i) => i !== index))}
                        className="hover:text-white/80"
                      >
                        <Trash2 size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>

          <ReflectionPrompt
            title="Reflection: Certification Alignment"
            prompt="Consider your career goals and the growth areas you identified. What industry certifications (e.g., AWS, Azure, CompTIA, PMP) would align with your career advancement strategy? How would earning these certifications support your goals?"
            placeholder="Reflect on certifications that align with your career path..."
          />
        </div>

        {/* Step 2: SMART Goals */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1a365d] text-white flex items-center justify-center font-bold">
              2
            </div>
            <h2 className="text-2xl font-bold text-[#1a365d]">Set SMART Career Goals</h2>
          </div>

          <SectionCard 
            title="Understanding SMART Goals" 
            variant="highlight"
            className="mb-6"
          >
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-[#d69e2e]/30">
                <div className="font-bold text-[#d69e2e] text-lg">S</div>
                <div className="font-semibold text-[#1a365d]">Specific</div>
                <p className="text-sm text-[#4a5568] mt-1">Clear and well-defined</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-[#d69e2e]/30">
                <div className="font-bold text-[#d69e2e] text-lg">M</div>
                <div className="font-semibold text-[#1a365d]">Measurable</div>
                <p className="text-sm text-[#4a5568] mt-1">Trackable progress</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-[#d69e2e]/30">
                <div className="font-bold text-[#d69e2e] text-lg">A</div>
                <div className="font-semibold text-[#1a365d]">Attainable</div>
                <p className="text-sm text-[#4a5568] mt-1">Realistic and achievable</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-[#d69e2e]/30">
                <div className="font-bold text-[#d69e2e] text-lg">R</div>
                <div className="font-semibold text-[#1a365d]">Relevant</div>
                <p className="text-sm text-[#4a5568] mt-1">Aligned with your career</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-[#d69e2e]/30">
                <div className="font-bold text-[#d69e2e] text-lg">T</div>
                <div className="font-semibold text-[#1a365d]">Time-bound</div>
                <p className="text-sm text-[#4a5568] mt-1">Has a deadline</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard 
            title="Create Your Career Goals" 
            description="Add at least one short-term (within 1 year) and one long-term (1-5 years) goal"
          >
            <div className="space-y-6">
              {/* Add New Goal Form */}
              <div className="p-4 bg-[#f7fafc] rounded-lg space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="goal-type">Goal Type</Label>
                    <select
                      id="goal-type"
                      value={newGoal.type}
                      onChange={(e) => setNewGoal({...newGoal, type: e.target.value as "short" | "long"})}
                      className="w-full mt-1 px-3 py-2 border border-[#e2e8f0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                    >
                      <option value="short">Short-term (within 1 year)</option>
                      <option value="long">Long-term (1-5 years)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="goal-date">Target Date</Label>
                    <Input
                      id="goal-date"
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="goal-title">Goal Title</Label>
                  <Input
                    id="goal-title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    placeholder="e.g., Earn AWS Solutions Architect certification"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="goal-description">Description & Action Steps</Label>
                  <Textarea
                    id="goal-description"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    placeholder="Describe your goal and the specific steps you'll take to achieve it..."
                    className="mt-1"
                  />
                </div>
                <Button onClick={addGoal} className="bg-[#1a365d] hover:bg-[#2d4a7a]">
                  <Plus size={18} className="mr-2" />
                  Add Goal
                </Button>
              </div>

              {/* Goals List */}
              {goals.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#1a365d]">Your Career Goals</h3>
                  {goals.map((goal) => (
                    <Card key={goal.id} className="border-[#e2e8f0]">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={goal.type === "short" ? "bg-[#4a7c59]" : "bg-[#1a365d]"}>
                                {goal.type === "short" ? "Short-term" : "Long-term"}
                              </Badge>
                              <span className="text-sm text-[#718096]">
                                Target: {new Date(goal.targetDate).toLocaleDateString()}
                              </span>
                            </div>
                            <h4 className="font-semibold text-[#1a365d]">{goal.title}</h4>
                            {goal.description && (
                              <p className="text-sm text-[#4a5568] mt-1">{goal.description}</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeGoal(goal.id)}
                            className="text-[#c53030] hover:text-[#9b2c2c] hover:bg-[#fff5f5]"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Step 3: Mission Statement */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1a365d] text-white flex items-center justify-center font-bold">
              3
            </div>
            <h2 className="text-2xl font-bold text-[#1a365d]">Craft Your Mission Statement</h2>
          </div>

          <SectionCard 
            title="Personal Mission Statement Guidelines" 
            className="mb-6"
          >
            <div className="prose prose-slate max-w-none">
              <p className="text-[#4a5568] mb-4">
                A personal mission statement articulates your purpose, values, and professional 
                aspirations. It serves as a compass for your career decisions and helps you stay 
                focused on what matters most.
              </p>
              <div className="bg-[#f7fafc] p-4 rounded-lg">
                <h4 className="font-semibold text-[#1a365d] mb-2">Your mission statement should:</h4>
                <ul className="space-y-1 text-[#4a5568]">
                  <li>• Reflect your core values and what drives you professionally</li>
                  <li>• Describe the impact you want to make in your field</li>
                  <li>• Be concise (2-4 sentences) and memorable</li>
                  <li>• Guide your decision-making and goal-setting</li>
                </ul>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Write Your Mission Statement">
            <div className="space-y-4">
              <Textarea
                value={missionStatement}
                onChange={(e) => setMissionStatement(e.target.value)}
                placeholder="Example: 'To leverage technology and continuous learning to solve complex problems, mentor emerging professionals, and drive innovation in software development while maintaining integrity and work-life balance.'"
                className="min-h-[120px]"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#718096]">
                  {missionStatement.length} characters
                </span>
                <Button 
                  disabled={!missionStatement.trim()}
                  className="bg-[#4a7c59] hover:bg-[#3d6b4a]"
                >
                  <CheckCircle2 size={18} className="mr-2" />
                  Save Mission Statement
                </Button>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Discussion Preparation */}
        <SectionCard 
          title="Prepare for Discussions" 
          variant="career"
          className="mb-8"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MessageSquare className="text-[#4a7c59] flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-semibold text-[#1a365d]">Module 1: Course Objectives Discussion (5 pts)</h4>
                <p className="text-[#4a5568] text-sm mt-1">
                  Review the course objectives and share your thoughts on how they align with your 
                  career goals. Due: Sep 7
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MessageSquare className="text-[#4a7c59] flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-semibold text-[#1a365d]">Module 1: Goals and Mission Statement Discussion (20 pts)</h4>
                <p className="text-[#4a5568] text-sm mt-1">
                  Share your career goals and mission statement with the class. Provide constructive 
                  feedback to at least two peers. Due: Sep 7
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#e2e8f0]">
          <Link href="/overview">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={18} />
              Back to Overview
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={exportToPDF}
              variant="outline"
              className="gap-2 border-[#4a7c59] text-[#4a7c59] hover:bg-[#4a7c59] hover:text-white"
            >
              <FileText size={18} />
              Export PDF
            </Button>
            
            <CheckpointButton 
              label="Mark Career Foundations Complete" 
              onComplete={() => {
                const saved = localStorage.getItem("tech460-module1-progress");
                const data = saved ? JSON.parse(saved) : { completed: [] };
                if (!data.completed.includes("/career")) {
                  data.completed.push("/career");
                  localStorage.setItem("tech460-module1-progress", JSON.stringify(data));
                }
              }}
            />
            
            <Link href="/codesignal">
              <Button className="bg-[#1a365d] hover:bg-[#2d4a7a] gap-2">
                Next: CodeSignal Platform
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
