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
  ListOrdered,
  CheckCircle2,
  Clock,
  Lightbulb
} from "lucide-react";

export default function Module2Lesson2() {
  const knowledgeCheckQuestions = [
    {
      id: "q1",
      question: "What is the key difference between a Python list and a Python string?",
      options: [
        "Lists can store numbers; strings cannot",
        "Lists are mutable (can be changed in place); strings are immutable (cannot be changed in place)",
        "Strings support indexing; lists do not",
        "Lists are faster than strings for all operations"
      ],
      correctAnswer: 1,
      explanation: "Lists are mutable: you can assign to items, append, insert, and remove. Strings are immutable: any 'modification' like replace() or concatenation creates a new string object. This is why 'name[0] = 'A'' raises a TypeError but 'items[0] = 'new'' works on a list."
    },
    {
      id: "q2",
      question: "Given packing = ['tent', 'map', 'rope'], what is the result of packing.append('water') followed by packing.remove('map')?",
      options: [
        "['tent', 'rope', 'water']",
        "['tent', 'map', 'rope', 'water']",
        "['map', 'rope', 'water']",
        "A ValueError because 'map' was already removed"
      ],
      correctAnswer: 0,
      explanation: "append('water') adds 'water' to the end: ['tent', 'map', 'rope', 'water']. remove('map') deletes the first occurrence of 'map', leaving ['tent', 'rope', 'water']."
    },
    {
      id: "q3",
      question: "Which expression checks whether 'flashlight' is in the list bag?",
      options: [
        "bag.contains('flashlight')",
        "'flashlight' in bag",
        "bag.has('flashlight')",
        "exists('flashlight', bag)"
      ],
      correctAnswer: 1,
      explanation: "Python uses the 'in' operator for membership testing: 'flashlight' in bag returns True or False. The same operator also works for substrings in strings."
    },
    {
      id: "q4",
      question: "Why does mission = 'Apollo'; mission[0] = 'Z' raise a TypeError, and how do you 'update' it correctly?",
      options: [
        "Strings are immutable; create a new string such as mission = 'Z' + mission[1:]",
        "The index is out of range; use mission[1] = 'Z'",
        "You must call mission.update('Z') first",
        "Python requires mission = mission.replace('A', 'Z', 1) to avoid the error"
      ],
      correctAnswer: 0,
      explanation: "Strings are immutable, so item assignment is forbidden. To change a string, build a new one — e.g., 'Z' + mission[1:] produces 'Zpollo'. (replace() also works; option 4 would too, but option 1 states the underlying reason and the direct fix.)"
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
            <span className="text-[#1a365d]">Lesson 2</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#2d3748] text-white">
              <ListOrdered size={28} />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1a365d]">
                Exploring Python Collections: Lists and Strings Essential Guide
              </h1>
              <p className="text-[#4a5568]">Module 2 • Lesson 2 • Estimated time: 120 minutes</p>
            </div>
          </div>

          <p className="text-lg text-[#4a5568] leading-relaxed">
            Lists and strings are the two collection types you will use most on the GCA. This
            lesson builds fluency with list operations (append, insert, remove, pop, slicing,
            membership) and reinforces the critical distinction between mutable lists and immutable
            strings — all through a travel-packing scenario.
          </p>
        </div>

        {/* Core Concept */}
        <SectionCard
          title="Core Concept: Mutable Lists vs. Immutable Strings"
          description="The single most important collection distinction on the GCA"
          className="mb-8"
        >
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-[#e2e8f0]">
              <thead className="bg-[#f7fafc]">
                <tr>
                  <th className="text-left p-3 border-b border-[#e2e8f0] text-[#1a365d]">Operation</th>
                  <th className="text-left p-3 border-b border-[#e2e8f0] text-[#1a365d]">List (mutable)</th>
                  <th className="text-left p-3 border-b border-[#e2e8f0] text-[#1a365d]">String (immutable)</th>
                </tr>
              </thead>
              <tbody className="text-[#4a5568] font-mono">
                <tr>
                  <td className="p-3 border-b border-[#e2e8f0]">Indexing</td>
                  <td className="p-3 border-b border-[#e2e8f0]">items[0] ✓</td>
                  <td className="p-3 border-b border-[#e2e8f0]">name[0] ✓</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-[#e2e8f0]">Item assignment</td>
                  <td className="p-3 border-b border-[#e2e8f0]">items[0] = 'x' ✓</td>
                  <td className="p-3 border-b border-[#e2e8f0]">name[0] = 'X' ✗ TypeError</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-[#e2e8f0]">Add elements</td>
                  <td className="p-3 border-b border-[#e2e8f0]">append() / insert()</td>
                  <td className="p-3 border-b border-[#e2e8f0]">concatenation: name + 'x'</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-[#e2e8f0]">Remove elements</td>
                  <td className="p-3 border-b border-[#e2e8f0]">remove() / pop() / del</td>
                  <td className="p-3 border-b border-[#e2e8f0]">replace() returns a new string</td>
                </tr>
                <tr>
                  <td className="p-3">Membership test</td>
                  <td className="p-3">'x' in items ✓</td>
                  <td className="p-3">'x' in name ✓ (substring)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-[#fffbeb] border border-[#d69e2e]/30 rounded-lg">
            <p className="text-sm text-[#4a5568]">
              <strong>GCA Tip:</strong> When a problem requires many character changes to a string,
              convert it to a list (<code className="bg-[#f7fafc] px-1 rounded">chars = list(name)</code>),
              modify the list, then reassemble with <code className="bg-[#f7fafc] px-1 rounded">''.join(chars)</code>.
              This avoids creating a new string on every edit.
            </p>
          </div>
        </SectionCard>

        {/* Practice 1 & 2: Refining the Packing List / Validator */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Practices 1 &amp; 2: Refining the Journey Packing List &amp; Suitcase Packing Validator</h2>
            <span className="text-sm text-[#718096]">20 points • Due Sep 14</span>
          </div>

          <SectionCard
            title="Removing and Validating List Items"
            description="remove(), pop(), and membership testing"
            className="mb-4"
          >
            <p className="text-[#4a5568] mb-4">
              Refining a packing list means removing non-essentials and validating that required
              items are present. Two removal tools behave differently:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#4a5568] mb-4">
              <li><code className="bg-[#f7fafc] px-1 rounded">remove(value)</code> deletes the <em>first matching value</em> — raises ValueError if absent</li>
              <li><code className="bg-[#f7fafc] px-1 rounded">pop(index)</code> deletes <em>by position</em> and returns the removed item</li>
            </ul>
            <div className="bg-[#2d3748] rounded-lg p-4 font-mono text-sm text-white overflow-x-auto">
              <pre>{`packing = ['tent', 'map', 'rope', 'snacks']

# Refine: remove non-essentials safely
for item in ['snacks']:
    if item in packing:          # membership test first!
        packing.remove(item)

# Validate: required items present?
required = ['tent', 'rope']
missing = [r for r in required if r not in packing]
print("Missing:", missing)       # Missing: []
print(packing)                   # ['tent', 'map', 'rope']`}</pre>
            </div>
          </SectionCard>

          <CodeEditor
            title="Practices 1 & 2: Packing List Refinement and Validator"
            description="Remove non-essentials from the list, then validate required items are present"
            initialCode={`# Practice 1: Refining the Journey Packing List
# TODO 1: Remove every non-essential item in NON_ESSENTIALS
#         from the packing list, but ONLY if it is present.
#
# Practice 2: Suitcase Packing Validator
# TODO 2: Complete validate_packing to return a list of
#         required items that are MISSING from the bag.

packing = ['tent', 'map', 'rope', 'snacks', 'radio', 'water']
NON_ESSENTIALS = ['snacks', 'radio']

# TODO 1: refine the list


def validate_packing(bag, required):
    # Your code here
    pass

# Tests
print(packing)  # Expected: ['tent', 'map', 'rope', 'water']
print(validate_packing(packing, ['tent', 'rope']))     # Expected: []
print(validate_packing(packing, ['tent', 'compass']))  # Expected: ['compass']`}
            stdin=""
            height="460px"
          />
        </div>

        {/* Practice 3 & 4: Adding Items */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Practices 3 &amp; 4: Adding Essentials and Item Checks</h2>
            <span className="text-sm text-[#718096]">20 points • Due Sep 14</span>
          </div>

          <SectionCard
            title="Adding Items: append() vs. insert()"
            description="Choose the right tool for where the new item belongs"
            className="mb-4"
          >
            <div className="bg-[#2d3748] rounded-lg p-4 font-mono text-sm text-white overflow-x-auto mb-4">
              <pre>{`bag = ['water', 'map']

bag.append('snacks')      # add to END    -> ['water', 'map', 'snacks']
bag.insert(0, 'id card')  # add at INDEX  -> ['id card', 'water', 'map', 'snacks']

# Guarded add: only add if not already packed
def add_if_missing(bag, item):
    if item not in bag:
        bag.append(item)
    return bag

add_if_missing(bag, 'water')   # no duplicate added
add_if_missing(bag, 'rope')    # appended
print(bag)`}</pre>
            </div>
            <p className="text-[#4a5568]">
              The "add an item check" pattern — test membership before appending — prevents
              duplicates and appears constantly in GCA data-cleaning problems.
            </p>
          </SectionCard>

          <CodeEditor
            title="Practices 3 & 4: Add Essentials with an Item Check"
            description="Add essential items to the bag only if they are not already packed"
            initialCode={`# Practice 3: Add Essentials to Your Travel Bag Using Python Lists
# Practice 4: Add an Item Check to the Packing List
# TODO: Complete add_essentials so each essential is appended
#       to bag ONLY if it is not already present.
#       Return the number of items actually added.

def add_essentials(bag, essentials):
    added = 0
    # Your code here
    return added

bag = ['water', 'map']
print(add_essentials(bag, ['rope', 'water', 'tent']))  # Expected: 2
print(bag)  # Expected: ['water', 'map', 'rope', 'tent']`}
            stdin=""
            height="420px"
          />
        </div>

        {/* Practice 5 & 6 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Practices 5 &amp; 6: Space Voyager's Suitcase &amp; Immutable Mission Name</h2>
            <span className="text-sm text-[#718096]">20 points • Due Sep 14</span>
          </div>

          <SectionCard
            title="Capstone: Preparing a Full Suitcase + Updating an Immutable String"
            description="Combine list operations, then work around string immutability"
            className="mb-4"
          >
            <p className="text-[#4a5568] mb-4">
              The Space Voyager capstone chains everything: start from a base list, remove
              non-essentials, add mission-critical gear without duplicates, and sort the final
              manifest. Then practice "updating" an immutable mission name by constructing a new
              string from slices.
            </p>
            <div className="bg-[#2d3748] rounded-lg p-4 font-mono text-sm text-white overflow-x-auto">
              <pre>{`# Updating an immutable mission name
mission = "Apollo 11"

# Change "Apollo" to "Artemis" -> build a NEW string
parts = mission.split()
parts[0] = "Artemis"
new_mission = ' '.join(parts)
print(new_mission)              # 'Artemis 11'

# Or by slicing: replace the first character
code = "X-742"
code = "Z" + code[1:]           # 'Z-742'`}</pre>
            </div>
          </SectionCard>

          <CodeEditor
            title="Practices 5 & 6: Space Voyager's Suitcase + Immutable Mission Name"
            description="Prepare the suitcase with refined list operations, then update the mission name"
            initialCode={`# Practice 5: Space Voyager's Suitcase Preparation
# TODO 1: Write prepare_suitcase(base, remove_items, add_items) that:
#   1. Starts from a COPY of base
#   2. Removes every item in remove_items (only if present)
#   3. Appends each item in add_items (only if NOT already present)
#   4. Returns the suitcase sorted alphabetically

def prepare_suitcase(base, remove_items, add_items):
    # Your code here
    pass

base = ['oxygen', 'snacks', 'map', 'radio']
print(prepare_suitcase(base, ['snacks'], ['fuel', 'map', 'helmet']))
# Expected: ['fuel', 'helmet', 'map', 'oxygen']


# Practice 6: Updating an Immutable Mission Name
# TODO 2: Replace the FIRST word of mission with new_name,
#         keeping the rest unchanged. Strings are immutable,
#         so build a new string.

def update_mission(mission, new_name):
    # Your code here
    pass

print(update_mission("Apollo 11", "Artemis"))  # Expected: 'Artemis 11'`}
            stdin=""
            height="500px"
          />
        </div>

        {/* Knowledge Check */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Knowledge Check</h2>
          </div>

          <KnowledgeCheck
            title="Module 2 - Lesson 2: Lists & Strings Knowledge Check"
            questions={knowledgeCheckQuestions}
          />
        </div>

        {/* Reflection */}
        <div className="mb-8">
          <ReflectionPrompt
            title="Reflection: Mutable vs. Immutable Thinking"
            prompt="Describe a GCA-style scenario where confusing a list with a string (or vice versa) would cause a bug. How will you remember which operations are safe on each type? Consider adding this distinction to your course Notes."
            placeholder="Example: If I need to build a string character by character in a loop, I should append to a list and join at the end instead of using += on a string..."
          />
        </div>

        {/* Summary */}
        <Card className="border-[#4a7c59]/30 bg-[#f0fff4] mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb size={24} className="text-[#4a7c59] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-[#1a365d] mb-2">Lesson 2 Summary</h3>
                <ul className="space-y-1 text-[#4a5568] text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                    <span>Lists are mutable; strings are immutable — choose operations accordingly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                    <span><code>remove(value)</code> vs. <code>pop(index)</code>; guard removals with <code>in</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                    <span><code>append()</code> adds at the end; <code>insert(i, x)</code> adds at a position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                    <span>"Update" a string by building a new one via slices or <code>split()</code>/<code>join()</code></span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#e2e8f0]">
          <Link href="/module/2/lesson1">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={18} />
              Back to Lesson 1
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <CheckpointButton
              label="Mark Lesson 2 Complete"
              onComplete={() => {
                const saved = localStorage.getItem("tech460-module2-progress");
                const data = saved ? JSON.parse(saved) : { completed: [] };
                if (!data.completed.includes("/module/2/lesson2")) {
                  data.completed.push("/module/2/lesson2");
                  localStorage.setItem("tech460-module2-progress", JSON.stringify(data));
                }
              }}
            />

            <Link href="/module/2/lesson3">
              <Button className="bg-[#1a365d] hover:bg-[#2d4a7a] gap-2">
                Next: Lesson 3 - Conditional Looping
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
