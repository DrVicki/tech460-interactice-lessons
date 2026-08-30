import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionCard from "@/components/SectionCard";
import CodeBlock from "@/components/CodeBlock";
import PythonSandbox from "@/components/PythonSandbox";
import CodeEditor from "@/components/CodeEditor";
import KnowledgeCheck from "@/components/KnowledgeCheck";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import CheckpointButton from "@/components/CheckpointButton";
import { 
  ArrowRight, 
  ArrowLeft,
  Code2,
  ListOrdered,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from "lucide-react";

export default function PythonLists() {
  const [activeTab, setActiveTab] = useState("accessing");

  const accessingQuestions = [
    {
      id: "a1",
      question: "Given the list `fruits = ['apple', 'banana', 'cherry', 'date']`, what does `fruits[2]` return?",
      options: [
        "'apple'",
        "'banana'",
        "'cherry'",
        "'date'"
      ],
      correctAnswer: 2,
      explanation: "Python uses zero-based indexing, so fruits[0] is 'apple', fruits[1] is 'banana', and fruits[2] is 'cherry'."
    },
    {
      id: "a2",
      question: "What does `fruits[-1]` return for the same list?",
      options: [
        "'apple'",
        "'banana'",
        "'cherry'",
        "'date'"
      ],
      correctAnswer: 3,
      explanation: "Negative indexing starts from the end of the list. fruits[-1] returns the last element, which is 'date'."
    },
    {
      id: "a3",
      question: "What does the slice `fruits[1:3]` return?",
      options: [
        "['apple', 'banana']",
        "['banana', 'cherry']",
        "['banana', 'cherry', 'date']",
        "['cherry', 'date']"
      ],
      correctAnswer: 1,
      explanation: "Slicing includes the start index but excludes the end index. fruits[1:3] returns elements at indices 1 and 2: ['banana', 'cherry']."
    },
    {
      id: "a4",
      question: "How do you check if 'apple' exists in the fruits list?",
      options: [
        "fruits.contains('apple')",
        "'apple' in fruits",
        "fruits.has('apple')",
        "fruits.find('apple')"
      ],
      correctAnswer: 1,
      explanation: "The 'in' keyword is used to check membership in Python lists: 'apple' in fruits returns True."
    }
  ];

  const manipulatingQuestions = [
    {
      id: "m1",
      question: "Which method adds an element to the END of a list?",
      options: [
        "list.add()",
        "list.append()",
        "list.insert()",
        "list.push()"
      ],
      correctAnswer: 1,
      explanation: "The append() method adds a single element to the end of the list. Note that it modifies the list in place and returns None."
    },
    {
      id: "m2",
      question: "What is the difference between `list.remove(x)` and `list.pop()`?",
      options: [
        "remove() deletes by index, pop() deletes by value",
        "remove() deletes by value, pop() deletes by index and returns the value",
        "They are identical in functionality",
        "remove() returns the value, pop() does not"
      ],
      correctAnswer: 1,
      explanation: "remove(x) searches for and removes the first occurrence of value x. pop() removes and returns the element at a given index (or the last element if no index is specified)."
    },
    {
      id: "m3",
      question: "What does `list.insert(0, 'x')` do?",
      options: [
        "Replaces the first element with 'x'",
        "Adds 'x' at the beginning of the list, shifting other elements right",
        "Adds 'x' at the end of the list",
        "Raises an error because index 0 is invalid"
      ],
      correctAnswer: 1,
      explanation: "insert(index, element) inserts the element at the specified index, shifting all subsequent elements to the right. insert(0, 'x') adds 'x' at the front."
    },
    {
      id: "m4",
      question: "After executing `numbers = [1, 2, 3]; numbers.extend([4, 5])`, what is the value of numbers?",
      options: [
        "[1, 2, 3, [4, 5]]",
        "[1, 2, 3, 4, 5]",
        "[[1, 2, 3], [4, 5]]",
        "[4, 5, 1, 2, 3]"
      ],
      correctAnswer: 1,
      explanation: "extend() adds all elements from the iterable to the end of the list. Unlike append(), it does not add the list as a single element."
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
            <span className="text-[#1a365d]">Python Lists</span>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#d69e2e] text-white">
              <Code2 size={28} />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1a365d]">
                Python List Fundamentals
              </h1>
              <p className="text-[#4a5568]">Estimated time: 60 minutes</p>
            </div>
          </div>
          
          <p className="text-lg text-[#4a5568] leading-relaxed">
            Master the essential skills of accessing and manipulating Python lists. These 
            fundamental operations are building blocks for data manipulation in your senior 
            project and technical interviews.
          </p>
        </div>

        {/* Introduction */}
        <SectionCard 
          title="Why Python Lists Matter" 
          className="mb-8"
        >
          <div className="prose prose-slate max-w-none">
            <p className="text-[#4a5568] mb-4">
              Lists are one of the most versatile and commonly used data structures in Python. 
              They allow you to store collections of items, access them by position, and modify 
              them dynamically. Whether you're processing data, building algorithms, or preparing 
              for technical interviews, list manipulation is an essential skill.
            </p>
            <div className="bg-[#f7fafc] p-4 rounded-lg">
              <h4 className="font-semibold text-[#1a365d] mb-2">In this lesson, you will:</h4>
              <ul className="space-y-1 text-[#4a5568]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                  <span>Access list elements using positive and negative indexing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                  <span>Extract sublists using slicing notation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                  <span>Modify lists using append(), insert(), remove(), and pop()</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-[#4a7c59] mt-0.5 flex-shrink-0" />
                  <span>Understand common pitfalls and best practices</span>
                </li>
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="accessing" className="flex items-center gap-2">
              <ListOrdered size={18} />
              Practice 1: Accessing Elements
            </TabsTrigger>
            <TabsTrigger value="manipulating" className="flex items-center gap-2">
              <Edit3 size={18} />
              Practice 2: Manipulating Lists
            </TabsTrigger>
          </TabsList>

          {/* Accessing List Elements Tab */}
          <TabsContent value="accessing" className="space-y-8">
            <SectionCard 
              title="Understanding List Indexing" 
              description="Learn how to access individual elements in a Python list"
            >
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-[#1a365d] mb-3">Zero-Based Indexing</h4>
                  <p className="text-[#4a5568] mb-4">
                    Python lists use zero-based indexing, meaning the first element is at index 0, 
                    the second at index 1, and so on.
                  </p>
                  <CodeBlock 
                    code={`# Creating a list
fruits = ['apple', 'banana', 'cherry', 'date']

# Accessing elements by index
print(fruits[0])   # Output: apple (first element)
print(fruits[1])   # Output: banana (second element)
print(fruits[2])   # Output: cherry (third element)
print(fruits[3])   # Output: date (fourth element)

# Getting the list length
print(len(fruits))  # Output: 4`}
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-[#1a365d] mb-3">Negative Indexing</h4>
                  <p className="text-[#4a5568] mb-4">
                    Negative indices count from the end of the list. -1 is the last element, 
                    -2 is the second-to-last, and so on.
                  </p>
                  <CodeBlock 
                    code={`fruits = ['apple', 'banana', 'cherry', 'date']

# Negative indexing
print(fruits[-1])  # Output: date (last element)
print(fruits[-2])  # Output: cherry (second to last)
print(fruits[-4])  # Output: apple (first element)`}
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-[#1a365d] mb-3">List Slicing</h4>
                  <p className="text-[#4a5568] mb-4">
                    Slicing allows you to extract a portion of the list using the syntax 
                    <code className="bg-[#f7fafc] px-2 py-1 rounded mx-1">list[start:end]</code>. 
                    The start index is included, but the end index is excluded.
                  </p>
                  <CodeBlock 
                    code={`fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry']

# Basic slicing
print(fruits[1:4])   # Output: ['banana', 'cherry', 'date']
print(fruits[:3])    # Output: ['apple', 'banana', 'cherry'] (from start)
print(fruits[2:])    # Output: ['cherry', 'date', 'elderberry'] (to end)
print(fruits[:])     # Output: ['apple', 'banana', 'cherry', 'date', 'elderberry'] (copy)

# Negative indices in slicing
print(fruits[-3:-1]) # Output: ['cherry', 'date']
print(fruits[:-2])   # Output: ['apple', 'banana', 'cherry']`}
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-[#1a365d] mb-3">Checking Membership</h4>
                  <p className="text-[#4a5568] mb-4">
                    Use the <code className="bg-[#f7fafc] px-2 py-1 rounded">in</code> keyword 
                    to check if an element exists in a list.
                  </p>
                  <CodeBlock 
                    code={`fruits = ['apple', 'banana', 'cherry', 'date']

# Check if element exists
if 'apple' in fruits:
    print("Yes, apple is in the list")

if 'mango' not in fruits:
    print("Mango is not in the list")`}
                  />
                </div>
              </div>
            </SectionCard>

            <div className="bg-[#fffbeb] border border-[#d69e2e]/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-[#d69e2e] flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-[#1a365d]">Common Pitfall: IndexError</h4>
                  <p className="text-[#4a5568] text-sm mt-1">
                    Accessing an index that doesn't exist raises an IndexError. Always ensure 
                    your index is within the valid range (0 to len(list)-1, or -len(list) to -1).
                  </p>
                  <CodeBlock 
                    code={`fruits = ['apple', 'banana']
# print(fruits[5])   # IndexError: list index out of range
# print(fruits[-5])  # IndexError: list index out of range`}
                  />
                </div>
              </div>
            </div>

            <KnowledgeCheck 
              title="Knowledge Check: Accessing List Elements"
              questions={accessingQuestions}
            />

            <PythonSandbox
              title="Practice 1: Accessing List Elements"
              description="Try it yourself! Write code to access list elements using indexing and slicing."
              initialCode={`# Practice: Accessing List Elements
# Given the list of programming languages below, complete the exercises

languages = ['Python', 'JavaScript', 'Java', 'C++', 'Ruby', 'Go']

# Exercise 1: Print the first language
# Your code here:

# Exercise 2: Print the last language using negative indexing
# Your code here:

# Exercise 3: Print the first three languages using slicing
# Your code here:

# Exercise 4: Check if 'Python' is in the list
# Your code here:
`}
              testCases={[
                { input: "languages[0]", expectedOutput: "Python", description: "Access first element" },
                { input: "languages[-1]", expectedOutput: "Go", description: "Access last element with negative index" },
                { input: "languages[:3]", expectedOutput: "['Python', 'JavaScript', 'Java']", description: "Slice first three elements" },
                { input: "'Python' in languages", expectedOutput: "True", description: "Check membership" }
              ]}
              solution={`# Practice: Accessing List Elements - Solution

languages = ['Python', 'JavaScript', 'Java', 'C++', 'Ruby', 'Go']

# Exercise 1: Print the first language
print(languages[0])  # Output: Python

# Exercise 2: Print the last language using negative indexing
print(languages[-1])  # Output: Go

# Exercise 3: Print the first three languages using slicing
print(languages[:3])  # Output: ['Python', 'JavaScript', 'Java']

# Exercise 4: Check if 'Python' is in the list
if 'Python' in languages:
    print("Python is in the list!")
`}
            />

            <CodeEditor
              title="Interactive Python Practice"
              description="Practice list operations with a full-featured code editor"
              initialCode={`# Python List Practice
# Try accessing and manipulating lists below

fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry']

# Print the first fruit
print("First fruit:", fruits[0])

# Print the last fruit
print("Last fruit:", fruits[-1])

# Print fruits 2-4
print("Middle fruits:", fruits[1:4])

# Add a new fruit
fruits.append('fig')
print("After append:", fruits)

# Insert at position 1
fruits.insert(1, 'apricot')
print("After insert:", fruits)

# Remove 'banana'
fruits.remove('banana')
print("After remove:", fruits)

# Sort the list
fruits.sort()
print("Sorted:", fruits)

# Reverse the list
fruits.reverse()
print("Reversed:", fruits)

# List length
print("Total fruits:", len(fruits))`}
              stdin=""
              height="450px"
            />

            <ReflectionPrompt
              title="Practice Reflection"
              prompt="After completing Practice 1: Accessing List Elements, reflect on which concepts were most challenging. What strategies helped you understand indexing and slicing? What will you focus on practicing in Week 2?"
              placeholder="Reflect on your learning experience with list indexing and slicing..."
            />
          </TabsContent>

          {/* Manipulating Lists Tab */}
          <TabsContent value="manipulating" className="space-y-8">
            <SectionCard 
              title="List Modification Methods" 
              description="Learn to add, remove, and modify list elements"
            >
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-[#1a365d] mb-3">Adding Elements</h4>
                  <CodeBlock 
                    code={`fruits = ['apple', 'banana']

# append() - adds to the end
fruits.append('cherry')
print(fruits)  # ['apple', 'banana', 'cherry']

# insert() - adds at specific position
fruits.insert(0, 'apricot')  # Insert at beginning
print(fruits)  # ['apricot', 'apple', 'banana', 'cherry']

# extend() - adds multiple elements
fruits.extend(['date', 'elderberry'])
print(fruits)  # ['apricot', 'apple', 'banana', 'cherry', 'date', 'elderberry']

# Using + operator (creates new list)
more_fruits = fruits + ['fig', 'grape']
print(more_fruits)  # ['apricot', 'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape']`}
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-[#1a365d] mb-3">Removing Elements</h4>
                  <CodeBlock 
                    code={`fruits = ['apple', 'banana', 'cherry', 'date', 'banana']

# remove() - removes first occurrence by value
fruits.remove('banana')
print(fruits)  # ['apple', 'cherry', 'date', 'banana']

# pop() - removes by index and returns the value
last_fruit = fruits.pop()      # Removes and returns last element
print(last_fruit)  # 'banana'
print(fruits)      # ['apple', 'cherry', 'date']

second_fruit = fruits.pop(1)   # Removes and returns element at index 1
print(second_fruit)  # 'cherry'
print(fruits)        # ['apple', 'date']

# del statement - removes by index or slice
numbers = [1, 2, 3, 4, 5]
del numbers[0]      # Remove first element
print(numbers)      # [2, 3, 4, 5]
del numbers[1:3]    # Remove slice
print(numbers)      # [2, 5]

# clear() - removes all elements
numbers.clear()
print(numbers)      # []`}
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-[#1a365d] mb-3">Other Useful Methods</h4>
                  <CodeBlock 
                    code={`fruits = ['banana', 'apple', 'cherry', 'date']

# sort() - sorts in place
fruits.sort()
print(fruits)  # ['apple', 'banana', 'cherry', 'date']

fruits.sort(reverse=True)  # Descending order
print(fruits)  # ['date', 'cherry', 'banana', 'apple']

# reverse() - reverses in place
fruits.reverse()
print(fruits)  # ['apple', 'banana', 'cherry', 'date']

# index() - finds position of element
position = fruits.index('cherry')
print(position)  # 2

# count() - counts occurrences
numbers = [1, 2, 2, 3, 2, 4]
print(numbers.count(2))  # 3`}
                  />
                </div>
              </div>
            </SectionCard>

            <div className="bg-[#fff5f5] border border-[#c53030]/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-[#c53030] flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-[#1a365d]">Important: Methods Modify In Place</h4>
                  <p className="text-[#4a5568] text-sm mt-1 mb-3">
                    Most list methods (append, insert, remove, pop, sort, reverse) modify the 
                    original list and return None. A common mistake is trying to assign the result:
                  </p>
                  <CodeBlock 
                    code={`# WRONG - append() returns None
fruits = ['apple']
result = fruits.append('banana')
print(result)  # None
print(fruits)  # ['apple', 'banana']

# CORRECT - call the method, then use the modified list
fruits = ['apple']
fruits.append('banana')
print(fruits)  # ['apple', 'banana']`}
                  />
                </div>
              </div>
            </div>

            <SectionCard 
              title="Building Lists Incrementally" 
              description="A common pattern for constructing lists"
            >
              <CodeBlock 
                code={`# Start with an empty list and build it up
squares = []
for x in range(10):
    squares.append(x ** 2)
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# List comprehension (more concise)
squares = [x ** 2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Filtering with list comprehension
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]`}
              />
            </SectionCard>

            <KnowledgeCheck 
              title="Knowledge Check: Manipulating Lists"
              questions={manipulatingQuestions}
            />

            <PythonSandbox
              title="Practice 2: Manipulating Lists in Python"
              description="Practice adding, removing, and modifying list elements."
              initialCode={`# Practice: Manipulating Lists
# Given the list of skills below, complete the exercises

skills = ['Python', 'SQL', 'Git']

# Exercise 1: Add 'JavaScript' to the end of the list
# Your code here:

# Exercise 2: Insert 'AWS' at the beginning of the list
# Your code here:

# Exercise 3: Remove 'SQL' from the list
# Your code here:

# Exercise 4: Add multiple skills: 'Docker', 'Kubernetes'
# Your code here:

# Exercise 5: Sort the list alphabetically
# Your code here:
`}
              testCases={[
                { input: "skills.append('JavaScript')", expectedOutput: "['Python', 'SQL', 'Git', 'JavaScript']", description: "Append element to end" },
                { input: "skills.insert(0, 'AWS')", expectedOutput: "['AWS', 'Python', 'SQL', 'Git']", description: "Insert at beginning" },
                { input: "skills.remove('SQL')", expectedOutput: "['Python', 'Git']", description: "Remove element by value" },
                { input: "skills.extend(['Docker', 'Kubernetes'])", expectedOutput: "['Python', 'SQL', 'Git', 'Docker', 'Kubernetes']", description: "Extend with multiple elements" },
                { input: "skills.sort()", expectedOutput: "['Git', 'Python', 'SQL']", description: "Sort alphabetically" }
              ]}
              solution={`# Practice: Manipulating Lists - Solution

skills = ['Python', 'SQL', 'Git']

# Exercise 1: Add 'JavaScript' to the end of the list
skills.append('JavaScript')
print(skills)  # ['Python', 'SQL', 'Git', 'JavaScript']

# Exercise 2: Insert 'AWS' at the beginning of the list
skills.insert(0, 'AWS')
print(skills)  # ['AWS', 'Python', 'SQL', 'Git', 'JavaScript']

# Exercise 3: Remove 'SQL' from the list
skills.remove('SQL')
print(skills)  # ['AWS', 'Python', 'Git', 'JavaScript']

# Exercise 4: Add multiple skills: 'Docker', 'Kubernetes'
skills.extend(['Docker', 'Kubernetes'])
print(skills)  # ['AWS', 'Python', 'Git', 'JavaScript', 'Docker', 'Kubernetes']

# Exercise 5: Sort the list alphabetically
skills.sort()
print(skills)  # ['AWS', 'Docker', 'Git', 'JavaScript', 'Kubernetes', 'Python']
`}
            />

            <CodeEditor
              title="Build Your Own List Program"
              description="Create a program that manages a list of your skills or goals"
              initialCode={`# Create your own list management program
# Example: Track your technical skills

skills = []

# Add at least 3 skills using append()
skills.append('Python')
skills.append('SQL')
skills.append('Git')

# Add a skill at the beginning using insert()
skills.insert(0, 'Problem Solving')

# Print your skills
print("My Technical Skills:")
for i, skill in enumerate(skills, 1):
    print(f"{i}. {skill}")

# Try these operations:
# - Remove a skill you want to deprioritize
# - Sort your skills alphabetically
# - Find the position of a specific skill
# - Create a slice of your top 3 skills

# Your code below:

`}
              stdin=""
              height="450px"
            />

            <ReflectionPrompt
              title="Practice Reflection"
              prompt="After completing Practice 2: Manipulating Lists in Python, consider how these operations apply to real-world scenarios. How might you use list manipulation in your senior project? What questions do you still have about Python lists?"
              placeholder="Reflect on list manipulation techniques and their applications..."
            />
          </TabsContent>
        </Tabs>

        {/* Summary */}
        <SectionCard 
          title="Key Takeaways" 
          variant="highlight"
          className="mb-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#1a365d] mb-3 flex items-center gap-2">
                <ListOrdered size={20} />
                Accessing Elements
              </h4>
              <ul className="space-y-2 text-[#4a5568] text-sm">
                <li>• Use zero-based indexing: list[0] is first element</li>
                <li>• Negative indices count from end: list[-1] is last</li>
                <li>• Slicing: list[start:end] excludes end index</li>
                <li>• Check membership with 'in' keyword</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1a365d] mb-3 flex items-center gap-2">
                <Edit3 size={20} />
                Manipulating Lists
              </h4>
              <ul className="space-y-2 text-[#4a5568] text-sm">
                <li>• append() adds to end, insert() adds at position</li>
                <li>• remove() deletes by value, pop() deletes by index</li>
                <li>• Methods modify in place and return None</li>
                <li>• Use extend() or + to add multiple elements</li>
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#e2e8f0]">
          <Link href="/codesignal">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={18} />
              Back to CodeSignal
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <CheckpointButton 
              label="Mark Python Lists Complete" 
              onComplete={() => {
                const saved = localStorage.getItem("tech460-module1-progress");
                const data = saved ? JSON.parse(saved) : { completed: [] };
                if (!data.completed.includes("/python")) {
                  data.completed.push("/python");
                  localStorage.setItem("tech460-module1-progress", JSON.stringify(data));
                }
              }}
            />
            
            <Link href="/completion">
              <Button className="bg-[#1a365d] hover:bg-[#2d4a7a] gap-2">
                Next: Module Completion
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
