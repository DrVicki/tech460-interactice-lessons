import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionCard from "@/components/SectionCard";
import KnowledgeCheck from "@/components/KnowledgeCheck";
import CheckpointButton from "@/components/CheckpointButton";
import CodeEditor from "@/components/CodeEditor";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import {
  ArrowRight,
  ArrowLeft,
  Repeat,
  CheckCircle2,
  Clock,
  Lightbulb,
  AlertTriangle
} from "lucide-react";

export default function Module2Lesson3() {
  const knowledgeCheckQuestions = [
    {
      id: "q1",
      question: "What does the 'break' statement do inside a loop?",
      options: [
        "Skips the current iteration and moves to the next one",
        "Exits the loop entirely, immediately",
        "Pauses the loop until a condition changes",
        "Restarts the loop from the beginning"
      ],
      correctAnswer: 1,
      explanation: "break exits the innermost loop immediately — no further iterations run and control moves to the first statement after the loop. continue is the statement that skips to the next iteration."
    },
    {
      id: "q2",
      question: "In a weather-monitoring loop, what does 'continue' accomplish when a sensor reading is invalid?",
      options: [
        "It terminates the monitoring program",
        "It skips processing for that reading and checks the next one",
        "It resets the loop counter to zero",
        "It raises an exception"
      ],
      correctAnswer: 1,
      explanation: "continue jumps straight to the loop's next iteration, skipping the rest of the loop body for the current item — ideal for filtering out bad data without stopping the whole process."
    },
    {
      id: "q3",
      question: "Why is 'while temperature < 100:' risky if the loop body never changes 'temperature'?",
      options: [
        "The loop will raise a SyntaxError",
        "The condition never becomes False, creating an infinite loop",
        "The loop will only run once",
        "Python will automatically fix the condition"
      ],
      correctAnswer: 1,
      explanation: "A while loop repeats until its condition is False. If nothing in the body updates the variable being tested, the condition stays True forever — the classic infinite loop bug. Always ensure progress toward the termination condition."
    },
    {
      id: "q4",
      question: "Which pattern safely finds the first temperature above a threshold and stops?",
      options: [
        "A for loop with no break",
        "for t in readings: if t > threshold: result = t; break",
        "while True: with no break statement",
        "A list comprehension alone"
      ],
      correctAnswer: 1,
      explanation: "Iterating with for and breaking on the first match is the cleanest 'find first' pattern. A list comprehension would evaluate every element; a while True without break never ends."
    }
  ];

  return (
    <div className="py-8 lg:py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[#4a5568] mb-4">
            <Link href="/" className="hover:text-[#1a365d]">Home</Link>
            <span>/</span>
            <Link href="/module/2" className="hover:text-[#1a365d]">Module 2</Link>
            <span>/</span>
            <span className="text-[#1a365d]">Lesson 3</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#2d3748] text-white">
              <Repeat size={28} />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1a365d]">
                Mastering Python: Conditional Looping, Break, and Continue
              </h1>
              <p className="text-[#4a5568]">Module 2 • Lesson 3 • Estimated time: 90 minutes</p>
            </div>
          </div>

          <p className="text-lg text-[#4a5568] leading-relaxed">
            Loop control is where correct programs separate from buggy ones. In this lesson you will
            adjust termination conditions, debug a temperature-check loop, and layer conditional
            logic into a weather application using break and continue — skills that carry directly
            into Week 3's looping and interview-implementation module.
          </p>
        </div>

        {/* Core Concept */}
        <SectionCard
          title="Core Concept: Directing Loop Execution"
          description="Termination conditions, break, and continue"
          className="mb-8"
        >
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-[#e2e8f0]">
              <thead className="bg-[#f7fafc]">
                <tr>
                  <th className="text-left p-3 border-b border-[#e2e8f0] text-[#1a365d]">Tool</th>
                  <th className="text-left p-3 border-b border-[#e2e8f0] text-[#1a365d]">Behavior</th>
                  <th className="text-left p-3 border-b border-[#e2e8f0] text-[#1a365d]">Typical Use</th>
                </tr>
              </thead>
              <tbody className="text-[#4a5568]">
                <tr>
                  <td className="p-3 border-b border-[#e2e8f0] font-mono">while condition:</td>
                  <td className="p-3 border-b border-[#e2e8f0]">Repeats while condition is True</td>
                  <td className="p-3 border-b border-[#e2e8f0]">Unknown iteration count; sensor polling</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-[#e2e8f0] font-mono">break</td>
                  <td className="p-3 border-b border-[#e2e8f0]">Exits the loop immediately</td>
                  <td className="p-3 border-b border-[#e2e8f0]">Stop at first match; safety cutoff</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-[#e2e8f0] font-mono">continue</td>
                  <td className="p-3 border-b border-[#e2e8f0]">Skips to the next iteration</td>
                  <td className="p-3 border-b border-[#e2e8f0]">Filter invalid data; skip categories</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">for ... else:</td>
                  <td className="p-3">else runs only if NO break occurred</td>
                  <td className="p-3">"Search failed" handling</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-[#2d3748] rounded-lg p-4 font-mono text-sm text-white overflow-x-auto">
            <pre>{`# The anatomy of a controlled weather loop
readings = [72, 68, -999, 75, 105, 70]

for temp in readings:
    if temp == -999:          # invalid sensor reading
        continue              # skip it, keep looping
    if temp > 100:            # dangerous temperature
        print(f"ALERT at {temp}F — shutting down")
        break                 # stop everything
    print(f"{temp}F is normal")
else:
    print("All readings processed without alerts")`}</pre>
          </div>
        </SectionCard>

        {/* Practice 1 & 2 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Practices 1 &amp; 2: Loop Termination &amp; Temperature Check Debugging</h2>
            <span className="text-sm text-[#718096]">20 points • Due Sep 14</span>
          </div>

          <SectionCard
            title="Debugging Loop Termination"
            description="Find and fix the infinite loop"
            className="mb-4"
          >
            <p className="text-[#4a5568] mb-4">
              The most common while-loop bug is a body that never moves the tested variable toward
              termination. Study this broken temperature check:
            </p>
            <div className="bg-[#2d3748] rounded-lg p-4 font-mono text-sm text-white overflow-x-auto mb-4">
              <pre>{`# BROKEN — infinite loop!
temperature = 60
while temperature < 100:
    print(f"Heating... {temperature}F")
    # BUG: temperature is never updated!

# FIXED — increment drives the condition toward False
temperature = 60
while temperature < 100:
    print(f"Heating... {temperature}F")
    temperature += 10   # progress toward termination`}</pre>
            </div>
            <div className="p-4 bg-[#fff5f5] border border-[#c53030]/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle size={18} className="text-[#c53030] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#4a5568]">
                  <strong>Debug habit:</strong> For every while loop you write, ask: "Which statement
                  in this body makes the condition eventually False?" If there isn't one, the loop
                  is infinite.
                </p>
              </div>
            </div>
          </SectionCard>

          <CodeEditor
            title="Practices 1 & 2: Fix the Termination Condition"
            description="Debug the temperature loop so it terminates correctly and counts the readings checked"
            initialCode={`# Practice 1: Adjust Loop Termination Condition
# Practice 2: Temperature Check Loop Debugging
#
# The loop below is BROKEN in two ways:
#   1. It never terminates (infinite loop)
#   2. It checks one temperature too many (should stop AT 100)
#
# TODO: Fix the condition and the update so it prints
#       60, 70, 80, 90 and then "Target reached" exactly once.

temperature = 60
checked = 0

while temperature <= 100:      # BUG: off-by-one + no update
    print(f"Checking {temperature}F")
    checked += 1
    # BUG: temperature never changes!

print("Target reached")
print(f"Readings checked: {checked}")  # Expected: 4`}
            stdin=""
            height="440px"
          />
        </div>

        {/* Practice 3 & 4 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Practices 3 &amp; 4: Temperature Conditions &amp; Control in the Weather App</h2>
            <span className="text-sm text-[#718096]">20 points • Due Sep 14</span>
          </div>

          <SectionCard
            title="Layering Conditional Logic into a Loop"
            description="Classify readings, skip invalid data, break on danger"
            className="mb-4"
          >
            <div className="bg-[#2d3748] rounded-lg p-4 font-mono text-sm text-white overflow-x-auto">
              <pre>{`def analyze_weather(readings):
    report = {"cold": 0, "mild": 0, "hot": 0, "invalid": 0}

    for temp in readings:
        if temp == -999:            # sensor error code
            report["invalid"] += 1
            continue                # skip classification
        if temp > 110:              # extreme danger
            print("EMERGENCY SHUTDOWN")
            break
        if temp < 50:
            report["cold"] += 1
        elif temp <= 85:
            report["mild"] += 1
        else:
            report["hot"] += 1

    return report

print(analyze_weather([45, 72, -999, 95, 60]))
# {'cold': 1, 'mild': 2, 'hot': 1, 'invalid': 1}`}</pre>
            </div>
          </SectionCard>

          <CodeEditor
            title="Practices 3 & 4: Weather App Temperature Control"
            description="Implement the full classification loop with invalid-data skipping and emergency break"
            initialCode={`# Practice 3: Add Temperature Conditions to Weather Loop
# Practice 4: Add Temperature Control to Weather App
#
# TODO: Complete analyze_weather(readings) so it returns a dict
# counting 'cold' (<50), 'mild' (50-85), and 'hot' (>85) days.
# Rules:
#   - A reading of -999 is invalid: count it as 'invalid' and SKIP
#     classification (use continue)
#   - A reading above 110 triggers an emergency: print
#     "EMERGENCY SHUTDOWN" and stop processing (use break)

def analyze_weather(readings):
    report = {"cold": 0, "mild": 0, "hot": 0, "invalid": 0}
    # Your code here
    return report

print(analyze_weather([45, 72, -999, 95, 60]))
# Expected: {'cold': 1, 'mild': 2, 'hot': 1, 'invalid': 1}

print(analyze_weather([70, 115, 80]))
# Expected: EMERGENCY SHUTDOWN
#           {'cold': 0, 'mild': 1, 'hot': 0, 'invalid': 0}`}
            stdin=""
            height="480px"
          />
        </div>

        {/* Practice 5: Challenge */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Practice 5: Temperature Loop Control Challenge</h2>
            <span className="text-sm text-[#718096]">10 points • Due Sep 14</span>
          </div>

          <SectionCard
            title="Capstone Challenge"
            description="Combine while loops, break, and continue in one solution"
            className="mb-4"
          >
            <p className="text-[#4a5568]">
              This challenge mirrors a GCA-style problem: monitor a temperature stream, skip invalid
              readings, count safe days, and halt at the first dangerous reading — then report a
              complete summary. Try to solve it without looking back at the earlier examples.
            </p>
          </SectionCard>

          <CodeEditor
            title="Practice 5: Temperature Loop Control Challenge"
            description="Find the first dangerous reading using a while loop, skipping invalid sensor data"
            initialCode={`# Practice 5: Temperature Loop Control Challenge
#
# TODO: Using a WHILE loop with index-based iteration:
#   1. Skip any reading of -999 (invalid) with continue
#   2. If a reading exceeds 105, record it in 'danger' and break
#   3. Otherwise count the reading as a safe day
#   4. After the loop, print the summary exactly as shown
#
# Expected output for the data below:
#   Safe days before danger: 3
#   Dangerous reading: 108 at index 4

readings = [68, -999, 72, 75, 108, 80]

index = 0
safe = 0
danger = None

# Your code here

print(f"Safe days before danger: {safe}")
if danger is not None:
    print(f"Dangerous reading: {danger} at index {index}")`}
            stdin=""
            height="460px"
          />
        </div>

        {/* Knowledge Check */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Knowledge Check</h2>
          </div>

          <KnowledgeCheck
            title="Module 2 - Lesson 3: Loop Control Knowledge Check"
            questions={knowledgeCheckQuestions}
          />
        </div>

        {/* Reflection */}
        <div className="mb-8">
          <ReflectionPrompt
            title="Reflection: Debugging Loops Under Time Pressure"
            prompt="The GCA is timed, and infinite loops cost precious minutes. Write down your personal checklist for reviewing a loop before running it (e.g., 'Does the body update the tested variable? Is my break reachable?'). Save this checklist in your Notes — you will use it in Week 3."
            placeholder="Example: My loop checklist: 1) What makes the condition False? 2) Can every branch reach break or the next iteration? 3) What happens with an empty input?..."
          />
        </div>

        {/* Summary */}
        <Card className="border-[#4a7c59]/30 bg-[#f0fff4] mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb size={24} className="text-[#4a7c59] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-[#1a365d] mb-2">Lesson 3 Summary</h3>
                <ul className="space-y-1 text-[#4a5568] text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                    <span>Every while loop must make progress toward its termination condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                    <span><code>break</code> exits the loop; <code>continue</code> skips to the next iteration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                    <span>Use <code>for...else</code> to detect when no break occurred</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                    <span>Guard clauses (invalid-data checks with continue) keep loop bodies clean</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#e2e8f0]">
          <Link href="/module/2/lesson2">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={18} />
              Back to Lesson 2
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <CheckpointButton
              label="Mark Lesson 3 Complete"
              onComplete={() => {
                const saved = localStorage.getItem("tech460-module2-progress");
                const data = saved ? JSON.parse(saved) : { completed: [] };
                if (!data.completed.includes("/module/2/lesson3")) {
                  data.completed.push("/module/2/lesson3");
                  localStorage.setItem("tech460-module2-progress", JSON.stringify(data));
                }
              }}
            />

            <Link href="/module/2/completion">
              <Button className="bg-[#1a365d] hover:bg-[#2d4a7a] gap-2">
                Next: Complete Module 2
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

