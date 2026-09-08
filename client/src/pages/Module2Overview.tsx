import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  MessageSquare,
  FileText,
  Code2,
  Clock,
  Target,
  CheckCircle2,
  ListOrdered,
  Repeat,
  Type,
  Award
} from "lucide-react";

export default function Module2Overview() {
  interface ModuleItem {
    type: string;
    title: string;
    dueDate: string;
    points: number;
    icon: any;
    link?: string;
  }

  interface ModuleSection {
    type: string;
    title: string;
    link?: string;
    items: ModuleItem[];
  }

  const moduleItems: ModuleSection[] = [
    {
      type: "header",
      title: "Discussion",
      items: [
        {
          type: "discussion",
          title: "Module 2: Discussion - Certifications and Competencies",
          dueDate: "Sep 14",
          points: 25,
          icon: MessageSquare
        }
      ]
    },
    {
      type: "header",
      title: "Lesson 1: Manipulating Strings: Reversing Words in a Sentence",
      link: "/module/2/lesson1",
      items: [
        {
          type: "lesson",
          title: "Module 2 - Lesson 1: Manipulating Strings: Reversing Words in a Sentence",
          dueDate: "Sep 14",
          points: 0,
          icon: Type,
          link: "/module/2/lesson1"
        },
        {
          type: "practice",
          title: "Practice 1: Rotating Characters in Words of a String",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson1"
        },
        {
          type: "practice",
          title: "Practice 2: Transforming Words with English Alphabet's Opposite Characters",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson1"
        },
        {
          type: "practice",
          title: "Practice 3: Capitalizing and Lowercasing String Words",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson1"
        }
      ]
    },
    {
      type: "header",
      title: "Lesson 2: Exploring Python Collections: Lists and Strings Essential Guide",
      link: "/module/2/lesson2",
      items: [
        {
          type: "lesson",
          title: "Module 2 - Lesson 2: Exploring Python Collections: Lists and Strings Essential Guide",
          dueDate: "Sep 14",
          points: 0,
          icon: ListOrdered,
          link: "/module/2/lesson2"
        },
        {
          type: "practice",
          title: "Practice 1: Refining the Journey Packing List",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson2"
        },
        {
          type: "practice",
          title: "Practice 2: Suitcase Packing Validator",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson2"
        },
        {
          type: "practice",
          title: "Practice 3: Add Essentials to Your Travel Bag Using Python Lists",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson2"
        },
        {
          type: "practice",
          title: "Practice 4: Add an Item Check to the Packing List",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson2"
        },
        {
          type: "practice",
          title: "Practice 5: Space Voyager's Suitcase Preparation",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson2"
        },
        {
          type: "practice",
          title: "Practice 6: Updating an Immutable Mission Name",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson2"
        }
      ]
    },
    {
      type: "header",
      title: "Lesson 3: Mastering Python: Conditional Looping, Break, and Continue",
      link: "/module/2/lesson3",
      items: [
        {
          type: "lesson",
          title: "Module 2 - Lesson 3: Mastering Python: Conditional Looping, Break, and Continue",
          dueDate: "Sep 14",
          points: 0,
          icon: Repeat,
          link: "/module/2/lesson3"
        },
        {
          type: "practice",
          title: "Practice 1: Adjust Loop Termination Condition",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson3"
        },
        {
          type: "practice",
          title: "Practice 2: Temperature Check Loop Debugging",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson3"
        },
        {
          type: "practice",
          title: "Practice 3: Add Temperature Conditions to Weather Loop",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson3"
        },
        {
          type: "practice",
          title: "Practice 4: Add Temperature Control to Weather App",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson3"
        },
        {
          type: "practice",
          title: "Practice 5: Temperature Loop Control Challenge",
          dueDate: "Sep 14",
          points: 10,
          icon: Code2,
          link: "/module/2/lesson3"
        }
      ]
    },
    {
      type: "header",
      title: "Complete Module 2",
      link: "/module/2/completion",
      items: [
        {
          type: "survey",
          title: "Module 2 Pulse Survey",
          dueDate: "Sep 14",
          points: 0,
          icon: FileText,
          link: "/module/2/completion"
        }
      ]
    }
  ];

  const totalPoints = moduleItems.reduce((sum, section) =>
    sum + section.items.reduce((s, item) => s + item.points, 0), 0
  );
  const totalPractices = moduleItems.reduce((sum, section) =>
    sum + section.items.filter(i => i.type === "practice").length, 0
  );

  return (
    <div className="py-8 lg:py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[#4a5568] mb-4">
            <Link href="/" className="hover:text-[#1a365d]">Home</Link>
            <span>/</span>
            <span className="text-[#1a365d]">Module 2</span>
          </div>

          <Badge className="bg-[#d69e2e] text-white mb-3">Week 2</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#1a365d] mb-4">
            Python Foundations &amp; String Operations
          </h1>
          <p className="text-lg text-[#4a5568] leading-relaxed">
            Master Python fundamentals and string manipulation techniques. Learn implementation
            planning and document reliable foundation habits for consistent coding practice.
          </p>
        </div>

        {/* Module Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-[#e2e8f0] text-center">
            <CardContent className="pt-6">
              <BookOpen className="mx-auto text-[#1a365d] mb-2" size={24} />
              <p className="text-2xl font-bold text-[#1a365d]">3</p>
              <p className="text-sm text-[#4a5568]">Lessons</p>
            </CardContent>
          </Card>
          <Card className="border-[#e2e8f0] text-center">
            <CardContent className="pt-6">
              <Code2 className="mx-auto text-[#4a7c59] mb-2" size={24} />
              <p className="text-2xl font-bold text-[#1a365d]">{totalPractices}</p>
              <p className="text-sm text-[#4a5568]">Practice Activities</p>
            </CardContent>
          </Card>
          <Card className="border-[#e2e8f0] text-center">
            <CardContent className="pt-6">
              <Award className="mx-auto text-[#d69e2e] mb-2" size={24} />
              <p className="text-2xl font-bold text-[#1a365d]">{totalPoints}</p>
              <p className="text-sm text-[#4a5568]">Total Points</p>
            </CardContent>
          </Card>
          <Card className="border-[#e2e8f0] text-center">
            <CardContent className="pt-6">
              <Clock className="mx-auto text-[#1a365d] mb-2" size={24} />
              <p className="text-2xl font-bold text-[#1a365d]">5</p>
              <p className="text-sm text-[#4a5568]">Hours Estimated</p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Objectives */}
        <Card className="border-[#e2e8f0] mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1a365d]">
              <Target size={24} />
              Module 2 Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                <span className="text-[#4a5568]">
                  Master Python string methods including slicing, splitting, joining, and case manipulation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                <span className="text-[#4a5568]">
                  Implement string transformation algorithms such as reversing, rotating, and character mapping
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                <span className="text-[#4a5568]">
                  Differentiate between mutable lists and immutable strings, and apply appropriate operations to each
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                <span className="text-[#4a5568]">
                  Control loop execution with conditional logic, break, and continue statements
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                <span className="text-[#4a5568]">
                  Connect technical competencies to industry certifications and career advancement
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Module Contents */}
        <h2 className="text-2xl font-bold text-[#1a365d] mb-6">Module Contents</h2>
        <div className="space-y-6 mb-8">
          {moduleItems.map((section, sIndex) => (
            <Card key={sIndex} className="border-[#e2e8f0] overflow-hidden">
              <CardHeader className="bg-[#f7fafc] border-b border-[#e2e8f0] py-3">
                {section.link ? (
                  <Link href={section.link}>
                    <CardTitle className="text-base text-[#1a365d] hover:text-[#d69e2e] transition-colors cursor-pointer">
                      {section.title}
                    </CardTitle>
                  </Link>
                ) : (
                  <CardTitle className="text-base text-[#1a365d]">{section.title}</CardTitle>
                )}
              </CardHeader>
              <CardContent className="p-0">
                {section.items.map((item, iIndex) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={iIndex}
                      className="flex items-center justify-between px-6 py-3 border-b border-[#e2e8f0] last:border-b-0 hover:bg-[#faf8f5] transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Icon size={18} className="text-[#4a7c59] flex-shrink-0" />
                        {item.link ? (
                          <Link href={item.link} className="text-sm text-[#2d3748] hover:text-[#1a365d] truncate">
                            {item.title}
                          </Link>
                        ) : (
                          <span className="text-sm text-[#2d3748] truncate">{item.title}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                        <span className="text-xs text-[#718096]">{item.dueDate}</span>
                        <Badge variant="outline" className="text-xs border-[#e2e8f0]">
                          {item.points} pts
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly Completion Guidance */}
        <Card className="border-[#d69e2e]/30 bg-[#fffbeb] mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1a365d]">
              <Clock size={24} className="text-[#d69e2e]" />
              Weekly Completion Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#4a5568]">
              Complete all three lessons and their practice activities. Keep a record of the string
              manipulation patterns and loop control techniques you practiced — you will apply them
              directly to the looping and interview implementation problems in Week 3. Document
              reliable foundation habits: consistent naming, incremental testing, and reading error
              messages carefully.
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#e2e8f0]">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={18} />
              Back to Home
            </Button>
          </Link>
          <Link href="/module/2/lesson1">
            <Button className="bg-[#1a365d] hover:bg-[#2d4a7a] gap-2">
              Start Lesson 1: Manipulating Strings
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
