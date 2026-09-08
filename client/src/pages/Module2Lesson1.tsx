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
  Type,
  CheckCircle2,
  Clock,
  Lightbulb
} from "lucide-react";

export default function Module2Lesson1() {
  const knowledgeCheckQuestions = [
    {
      id: "q1",
      question: "What does the expression 'hello world'[::-1] produce in Python?",
      options: [
        "'hello world'",
        "'dlrow olleh'",
        "'world hello'",
        "A TypeError because strings cannot be sliced with a negative step"
      ],
      correctAnswer: 1,
      explanation: "The slice [::-1] reverses the entire string character by character, producing 'dlrow olleh'. To reverse word order instead, split the string into words first."
    },
    {
      id: "q2",
      question: "Which sequence correctly reverses the order of words in the sentence 'Python is fun'?",
      options: [
        "'Python is fun'.reverse()",
        "' '.join('Python is fun'.split()[::-1])",
        "'Python is fun'.split().reverse().join(' ')",
        "reversed('Python is fun')"
      ],
      correctAnswer: 1,
      explanation: "split() breaks the sentence into ['Python', 'is', 'fun'], [::-1] reverses the list to ['fun', 'is', 'Python'], and ' '.join() reassembles it into 'fun is Python'. Strings have no .reverse() method, and reversed() on a string returns an iterator of characters."
    },
    {
      id: "q3",
      question: "Why does word[1:] + word[0] 'rotate' a string one character to the left?",
      options: [
        "It moves the first character to the end by concatenating the slice from index 1 onward with the character at index 0",
        "It deletes the last character and prepends it to the front",
        "It uses Python's built-in rotate() method on strings",
        "It reverses the string twice"
      ],
      correctAnswer: 0,
      explanation: "word[1:] captures every character after the first, and word[0] is the first character. Concatenating them moves the first character to the end — a left rotation by one position."
    },
    {
      id: "q4",
      question: "In the 'opposite character' (Atbash) transformation, what does the letter 'b' map to?",
      options: [
        "'a'",
        "'c'",
        "'y'",
        "'z'"
      ],
      correctAnswer: 2,
      explanation: "The alphabet's opposite mapping pairs position i with position 25-i: a↔z, b↔y, c↔x, and so on. For 'b' (index 1), the opposite is chr(ord('a') + 25 - 1) = 'y'."
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
            <span className="text-[#1a365d]">Lesson 1</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#2d3748] text-white">
              <Type size={28} />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1a365d]">
                Manipulating Strings: Reversing Words in a Sentence
              </h1>
              <p className="text-[#4a5568]">Module 2 • Lesson 1 • Estimated time: 90 minutes</p>
            </div>
          </div>

          <p className="text-lg text-[#4a5568] leading-relaxed">
            String manipulation is one of the most frequently tested skill areas on the General
            Coding Assessment. In this lesson you will learn to reverse words in a sentence, rotate
            characters within words, map characters to their alphabet opposites, and control
            capitalization — the building blocks for GCA string problems.
          </p>
        </div>

        {/* Core Concept */}
        <SectionCard
          title="Core Concept: Reversing Words in a Sentence"
          description="The canonical GCA-style string problem"
          className="mb-8"
        >
          <p className="text-[#4a5568] mb-4">
            Reversing the <em>order of words</em> in a sentence is different from reversing the
            characters. The pattern uses three string/list operations chained together:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-[#4a5568] mb-4">
            <li><strong>split()</strong> — break the sentence into a list of words</li>
            <li><strong>[::-1]</strong> — reverse the list of words with a negative-step slice</li>
            <li><strong>' '.join()</strong> — reassemble the words into a single string</li>
          </ol>
          <div className="bg-[#2d3748] rounded-lg p-4 font-mono text-sm text-white overflow-x-auto">
            <pre>{`sentence = "The quick brown fox"

# Step-by-step
words = sentence.split()        # ['The', 'quick', 'brown', 'fox']
reversed_words = words[::-1]    # ['fox', 'brown', 'quick', 'The']
result = ' '.join(reversed_words)

print(result)  # 'fox brown quick The'

# One-liner version
print(' '.join(sentence.split()[::-1]))`}</pre>
          </div>
          <div className="mt-4 p-4 bg-[#f0fff4] border border-[#4a7c59]/30 rounded-lg">
            <p className="text-sm text-[#2f855a]">
              <strong>GCA Tip:</strong> When a problem says "reverse the words," always clarify
              whether it means word order or characters within each word. Then handle edge cases:
              empty strings, single words, and extra whitespace.
            </p>
          </div>
        </SectionCard>

        {/* Practice 1: Rotating Characters */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Practice 1: Rotating Characters in Words of a String</h2>
            <span className="text-sm text-[#718096]">10 points • Due Sep 14</span>
          </div>

          <SectionCard
            title="Character Rotation"
            description="Move characters within each word by a fixed number of positions"
            className="mb-4"
          >
            <p className="text-[#4a5568] mb-4">
              A left rotation by <code className="bg-[#f7fafc] px-1 rounded">k</code> positions moves
              the first <code className="bg-[#f7fafc] px-1 rounded">k</code> characters of a word to
              its end. The key insight is that slicing makes this a two-part concatenation:
              <code className="bg-[#f7fafc] px-1 rounded">word[k:] + word[:k]</code>.
            </p>
            <div className="bg-[#2d3748] rounded-lg p-4 font-mono text-sm text-white overflow-x-auto">
              <pre>{`def rotate_word(word, k):
    k = k % len(word)          # handle k larger than the word
    return word[k:] + word[:k]

def rotate_words(sentence, k):
    return ' '.join(rotate_word(w, k) for w in sentence.split())

print(rotate_words("hello world", 1))   # 'elloh orldw'
print(rotate_words("hello world", 2))   # 'llohe rldwo'`}</pre>
            </div>
          </SectionCard>

          <CodeEditor
            title="Practice 1: Rotating Characters in Words"
            description="Complete the rotate_word function so each word rotates left by k positions"
            initialCode={`# Practice 1: Rotating Characters in Words of a String
# TODO: Complete the rotate_word function.
# It should move the first k characters of word to the end.
# Example: rotate_word("python", 2) -> "thonpy"

def rotate_word(word, k):
    k = k % len(word)
    # Your code here
    pass

def rotate_words(sentence, k):
    return ' '.join(rotate_word(w, k) for w in sentence.split())

# Test your code
print(rotate_words("hello world", 1))   # Expected: elloh orldw
print(rotate_words("coding is fun", 2)) # Expected: dingco s nufi... check your result!`}
            stdin=""
            height="420px"
          />
        </div>

        {/* Practice 2: Opposite Characters */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Practice 2: Transforming Words with English Alphabet's Opposite Characters</h2>
            <span className="text-sm text-[#718096]">10 points • Due Sep 14</span>
          </div>

          <SectionCard
            title="The Atbash Transformation"
            description="Map each letter to its mirror position in the alphabet (a↔z, b↔y, ...)"
            className="mb-4"
          >
            <p className="text-[#4a5568] mb-4">
              The opposite-character transformation replaces every letter with the letter at the
              mirrored position in the alphabet. Use <code className="bg-[#f7fafc] px-1 rounded">ord()</code> to
              get a character's numeric code and <code className="bg-[#f7fafc] px-1 rounded">chr()</code> to
              convert back. The formula for a lowercase letter is:
            </p>
            <div className="bg-[#2d3748] rounded-lg p-4 font-mono text-sm text-white overflow-x-auto mb-4">
              <pre>{`def opposite_char(c):
    if 'a' <= c <= 'z':
        return chr(ord('z') - (ord(c) - ord('a')))
    if 'A' <= c <= 'Z':
        return chr(ord('Z') - (ord(c) - ord('A')))
    return c  # keep non-letters unchanged

def atbash(word):
    return ''.join(opposite_char(c) for c in word)

print(atbash("abc"))    # 'zyx'
print(atbash("Hello"))  # 'Svool'`}</pre>
            </div>
            <div className="p-4 bg-[#fffbeb] border border-[#d69e2e]/30 rounded-lg">
              <p className="text-sm text-[#4a5568]">
                <strong>Common mistake:</strong> Forgetting to preserve uppercase letters and
                non-alphabetic characters (spaces, digits, punctuation). GCA problems often include
                mixed input — handle every branch explicitly.
              </p>
            </div>
          </SectionCard>

          <CodeEditor
            title="Practice 2: Alphabet Opposite Transformation"
            description="Implement the opposite-character transformation for a full sentence"
            initialCode={`# Practice 2: Transforming Words with Alphabet Opposites
# TODO: Complete opposite_char so each letter maps to its
# mirror in the alphabet: a->z, b->y, c->x, ... z->a.
# Preserve case and leave non-letters unchanged.

def opposite_char(c):
    # Your code here
    pass

def transform_sentence(sentence):
    return ' '.join(''.join(opposite_char(c) for c in word)
                    for word in sentence.split())

# Test your code
print(transform_sentence("abc xyz"))     # Expected: zyx cba
print(transform_sentence("Hello World")) # Expected: Svool Dliow`}
            stdin=""
            height="420px"
          />
        </div>

        {/* Practice 3: Capitalizing and Lowercasing */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Practice 3: Capitalizing and Lowercasing String Words</h2>
            <span className="text-sm text-[#718096]">10 points • Due Sep 14</span>
          </div>

          <SectionCard
            title="Controlling Case"
            description="capitalize(), upper(), lower(), title(), and swapcase()"
            className="mb-4"
          >
            <p className="text-[#4a5568] mb-4">
              Python provides a family of case methods. Choosing the right one matters on the GCA:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-[#e2e8f0]">
                <thead className="bg-[#f7fafc]">
                  <tr>
                    <th className="text-left p-3 border-b border-[#e2e8f0] text-[#1a365d]">Method</th>
                    <th className="text-left p-3 border-b border-[#e2e8f0] text-[#1a365d]">Effect on "hELLO wORLD"</th>
                  </tr>
                </thead>
                <tbody className="text-[#4a5568]">
                  <tr><td className="p-3 border-b border-[#e2e8f0] font-mono">capitalize()</td><td className="p-3 border-b border-[#e2e8f0] font-mono">"Hello world"</td></tr>
                  <tr><td className="p-3 border-b border-[#e2e8f0] font-mono">title()</td><td className="p-3 border-b border-[#e2e8f0] font-mono">"Hello World"</td></tr>
                  <tr><td className="p-3 border-b border-[#e2e8f0] font-mono">upper()</td><td className="p-3 border-b border-[#e2e8f0] font-mono">"HELLO WORLD"</td></tr>
                  <tr><td className="p-3 border-b border-[#e2e8f0] font-mono">lower()</td><td className="p-3 border-b border-[#e2e8f0] font-mono">"hello world"</td></tr>
                  <tr><td className="p-3 font-mono">swapcase()</td><td className="p-3 font-mono">"Hello World"</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#4a5568]">
              A common GCA pattern is normalizing each word: lowercase everything, then capitalize
              the first letter — <code className="bg-[#f7fafc] px-1 rounded">word[0].upper() + word[1:].lower()</code>.
            </p>
          </SectionCard>

          <CodeEditor
            title="Practice 3: Capitalizing and Lowercasing Words"
            description="Normalize each word so the first letter is uppercase and the rest lowercase"
            initialCode={`# Practice 3: Capitalizing and Lowercasing String Words
# TODO: Complete normalize_word so that:
#   - The first letter is uppercase
#   - All remaining letters are lowercase
# Example: normalize_word("pYTHON") -> "Python"

def normalize_word(word):
    # Your code here
    pass

def normalize_sentence(sentence):
    return ' '.join(normalize_word(w) for w in sentence.split())

# Test your code
print(normalize_sentence("tHE qUICK bROWN fOX"))  # Expected: The Quick Brown Fox
print(normalize_sentence("gCA cERTIFICATION"))    # Expected: Gca Certification`}
            stdin=""
            height="420px"
          />
        </div>

        {/* Knowledge Check */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-[#d69e2e]" size={24} />
            <h2 className="text-2xl font-bold text-[#1a365d]">Knowledge Check</h2>
          </div>

          <KnowledgeCheck
            title="Module 2 - Lesson 1: String Manipulation Knowledge Check"
            questions={knowledgeCheckQuestions}
          />
        </div>

        {/* Reflection */}
        <div className="mb-8">
          <ReflectionPrompt
            title="Reflection: Foundation Habits"
            prompt="String manipulation errors are often off-by-one mistakes or forgotten edge cases. Describe one habit you will adopt this week (e.g., testing with an empty string, tracing slices on paper, printing intermediate results) and explain how it will make your GCA practice more reliable."
            placeholder="Example: I will always test my string functions with three inputs: a normal sentence, a single word, and an empty string..."
          />
        </div>

        {/* Summary */}
        <Card className="border-[#4a7c59]/30 bg-[#f0fff4] mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb size={24} className="text-[#4a7c59] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-[#1a365d] mb-2">Lesson 1 Summary</h3>
                <ul className="space-y-1 text-[#4a5568] text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                    <span>Reverse word order with <code>' '.join(sentence.split()[::-1])</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                    <span>Rotate a word left by k with <code>word[k:] + word[:k]</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                    <span>Map letters to alphabet opposites with <code>ord()</code> and <code>chr()</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                    <span>Choose the correct case method: capitalize, title, upper, lower, swapcase</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#e2e8f0]">
          <Link href="/module/2">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={18} />
              Module 2 Overview
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <CheckpointButton
              label="Mark Lesson 1 Complete"
              onComplete={() => {
                const saved = localStorage.getItem("tech460-module2-progress");
                const data = saved ? JSON.parse(saved) : { completed: [] };
                if (!data.completed.includes("/module/2/lesson1")) {
                  data.completed.push("/module/2/lesson1");
                  localStorage.setItem("tech460-module2-progress", JSON.stringify(data));
                }
              }}
            />

            <Link href="/module/2/lesson2">
              <Button className="bg-[#1a365d] hover:bg-[#2d4a7a] gap-2">
                Next: Lesson 2 - Python Collections
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

