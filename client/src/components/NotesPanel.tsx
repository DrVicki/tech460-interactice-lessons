import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Plus, 
  Trash2, 
  Download, 
  Save,
  StickyNote,
  Calendar,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  module: string;
  section: string;
  content: string;
  createdAt: string;
  tags: string[];
}

interface NotesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentModule: string;
}

const sections = [
  "General",
  "Module Overview",
  "Career Foundations",
  "CodeSignal Platform",
  "Python Lists",
  "Completion"
];

export default function NotesPanel({ isOpen, onClose, currentModule }: NotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [selectedSection, setSelectedSection] = useState("General");
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  // Load notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tech460-notes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("tech460-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        module: currentModule,
        section: selectedSection,
        content: newNote.trim(),
        createdAt: new Date().toISOString(),
        tags: selectedTags
      };
      setNotes([note, ...notes]);
      setNewNote("");
      setSelectedTags([]);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const addTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));

  const filteredNotes = filterTag 
    ? notes.filter(n => n.tags.includes(filterTag))
    : notes;

  const exportNotesToPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const groupedNotes = filteredNotes.reduce((acc, note) => {
      if (!acc[note.section]) {
        acc[note.section] = [];
      }
      acc[note.section].push(note);
      return acc;
    }, {} as Record<string, Note[]>);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>TECH460 Learning Notes - ${currentModule}</title>
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
          }
          .section h2 {
            color: #1a365d;
            font-size: 20px;
            border-bottom: 2px solid #4a7c59;
            padding-bottom: 8px;
            margin-bottom: 15px;
          }
          .note-card {
            background: #f7fafc;
            border-left: 4px solid #1a365d;
            padding: 15px;
            margin: 10px 0;
            page-break-inside: avoid;
          }
          .note-meta {
            font-size: 12px;
            color: #718096;
            margin-bottom: 8px;
            display: flex;
            gap: 15px;
          }
          .note-content {
            white-space: pre-wrap;
          }
          .tag {
            display: inline-block;
            background: #d69e2e;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            margin-right: 5px;
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
            .note-card {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>TECH460 Learning Notes</h1>
          <p>${currentModule}</p>
          <p>Created by Dr. Vicki Bealman</p>
          <p>Exported on ${currentDate}</p>
        </div>

        ${Object.entries(groupedNotes).map(([section, sectionNotes]) => `
          <div class="section">
            <h2>${section}</h2>
            ${sectionNotes.map(note => `
              <div class="note-card">
                <div class="note-meta">
                  <span>📅 ${new Date(note.createdAt).toLocaleDateString()}</span>
                  ${note.tags.length > 0 ? `
                    <span>🏷️ ${note.tags.map(t => `<span class="tag">${t}</span>`).join('')}</span>
                  ` : ''}
                </div>
                <div class="note-content">${note.content}</div>
              </div>
            `).join('')}
          </div>
        `).join('')}

        ${filteredNotes.length === 0 ? '<p>No notes recorded yet.</p>' : ''}

        <div class="footer">
          <p>TECH460: Interactive Learning Platform - DeVry University</p>
          <p>Created by Dr. Vicki Bealman</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="bg-[#1a365d] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StickyNote size={24} />
            <div>
              <h2 className="font-bold text-lg">Learning Notes</h2>
              <p className="text-xs text-white/80">{currentModule}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={exportNotesToPDF}
              className="text-white hover:bg-white/10 gap-2"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X size={24} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Add New Note */}
          <Card className="border-[#e2e8f0]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#1a365d]">Add New Note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#4a5568] mb-2 block">
                  Section
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                >
                  {sections.map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-[#4a5568] mb-2 block">
                  Note Content
                </label>
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write your notes, reflections, or questions here..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#4a5568] mb-2 block">
                  Tags (optional)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    className="flex-1 px-3 py-2 border border-[#e2e8f0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a365d] text-sm"
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button onClick={addTag} size="sm" variant="outline">
                    <Plus size={16} />
                  </Button>
                </div>
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map(tag => (
                      <Badge 
                        key={tag} 
                        className="bg-[#d69e2e] text-white flex items-center gap-1"
                      >
                        {tag}
                        <button onClick={() => removeTag(tag)}>
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Button 
                onClick={addNote}
                disabled={!newNote.trim()}
                className="w-full bg-[#1a365d] hover:bg-[#2d4a7a]"
              >
                <Save size={18} className="mr-2" />
                Save Note
              </Button>
            </CardContent>
          </Card>

          {/* Filter by Tag */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-[#4a5568]">Filter:</span>
              <Button
                variant={filterTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterTag(null)}
                className={filterTag === null ? "bg-[#1a365d]" : ""}
              >
                All
              </Button>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={filterTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterTag(tag)}
                  className={filterTag === tag ? "bg-[#d69e2e]" : ""}
                >
                  <Tag size={14} className="mr-1" />
                  {tag}
                </Button>
              ))}
            </div>
          )}

          {/* Notes List */}
          <div className="space-y-3">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-8 text-[#718096]">
                <StickyNote size={48} className="mx-auto mb-4 opacity-50" />
                <p>No notes yet. Start by adding your first note above!</p>
              </div>
            ) : (
              filteredNotes.map(note => (
                <Card key={note.id} className="border-[#e2e8f0]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs text-[#718096]">
                        <Badge variant="outline" className="text-xs">
                          {note.section}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNote(note.id)}
                        className="text-[#c53030] hover:text-[#9b2c2c] hover:bg-[#fff5f5] h-8 w-8 p-0"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <p className="text-[#2d3748] whitespace-pre-wrap">{note.content}</p>
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {note.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="text-xs text-[#d69e2e] border-[#d69e2e]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e2e8f0] p-4 bg-[#f7fafc]">
          <div className="flex items-center justify-between text-sm text-[#4a5568]">
            <span>{filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}</span>
            <span>Created by Dr. Vicki Bealman</span>
          </div>
        </div>
      </div>
    </>
  );
}

