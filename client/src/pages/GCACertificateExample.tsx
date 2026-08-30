import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Download, 
  ExternalLink, 
  CheckCircle2,
  Code2,
  Calendar,
  User,
  Link as LinkIcon
} from "lucide-react";

export default function GCACertificateExample() {
  const [studentName, setStudentName] = useState("John Smith");
  const [scoreLink, setScoreLink] = useState("https://app.codesignal.com/score/abc123");
  const [completionDate, setCompletionDate] = useState("August 30, 2026");
  const [showPreview, setShowPreview] = useState(false);

  const generateCertificate = () => {
    setShowPreview(true);
  };

  const downloadCertificate = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>GCA Certificate - ${studentName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Source Sans 3', sans-serif; 
              background: #f5f5f5;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 20px;
            }
            .certificate {
              width: 900px;
              background: white;
              border: 3px solid #1a365d;
              padding: 60px;
              position: relative;
              box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            }
            .certificate::before {
              content: '';
              position: absolute;
              top: 10px;
              left: 10px;
              right: 10px;
              bottom: 10px;
              border: 1px solid #d69e2e;
              pointer-events: none;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .logo {
              width: 200px;
              height: auto;
              margin: 0 auto 20px;
              display: block;
            }
            .university {
              font-family: 'Playfair Display', serif;
              font-size: 28px;
              color: #1a365d;
              margin-bottom: 5px;
            }
            .course {
              font-size: 14px;
              color: #4a5568;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .title {
              font-family: 'Playfair Display', serif;
              font-size: 42px;
              color: #1a365d;
              text-align: center;
              margin: 30px 0;
            }
            .subtitle {
              text-align: center;
              font-size: 18px;
              color: #4a5568;
              margin-bottom: 40px;
            }
            .recipient {
              text-align: center;
              margin: 40px 0;
            }
            .recipient-label {
              font-size: 14px;
              color: #718096;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 10px;
            }
            .recipient-name {
              font-family: 'Playfair Display', serif;
              font-size: 36px;
              color: #1a365d;
              border-bottom: 2px solid #d69e2e;
              display: inline-block;
              padding-bottom: 10px;
            }
            .details {
              display: flex;
              justify-content: center;
              gap: 60px;
              margin: 40px 0;
            }
            .detail {
              text-align: center;
            }
            .detail-label {
              font-size: 12px;
              color: #718096;
              text-transform: uppercase;
              margin-bottom: 5px;
            }
            .detail-value {
              font-size: 16px;
              color: #1a365d;
              font-weight: 600;
            }
            .score-link {
              text-align: center;
              margin: 30px 0;
              padding: 20px;
              background: #f7fafc;
              border-radius: 8px;
            }
            .score-link-label {
              font-size: 12px;
              color: #718096;
              margin-bottom: 5px;
            }
            .score-link-url {
              font-size: 14px;
              color: #1a365d;
              word-break: break-all;
            }
            .footer {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              margin-top: 50px;
              padding-top: 30px;
              border-top: 1px solid #e2e8f0;
            }
            .signature {
              text-align: center;
            }
            .signature-line {
              width: 200px;
              border-bottom: 1px solid #1a365d;
              margin-bottom: 10px;
            }
            .signature-name {
              font-family: 'Playfair Display', serif;
              font-size: 18px;
              color: #1a365d;
            }
            .signature-title {
              font-size: 12px;
              color: #718096;
            }
            .seal {
              width: 100px;
              height: 100px;
              border: 3px solid #d69e2e;
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: #d69e2e;
            }
            .seal-icon {
              font-size: 24px;
              margin-bottom: 5px;
            }
            .seal-text {
              font-size: 10px;
              text-transform: uppercase;
              text-align: center;
              line-height: 1.2;
            }
            .certificate-id {
              position: absolute;
              bottom: 20px;
              right: 30px;
              font-size: 10px;
              color: #a0aec0;
            }
            @media print {
              body { background: white; }
              .certificate { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">
              <img src="/manus-storage/devry-logo_02b8d366.png" alt="DeVry University" class="logo" />
              <div class="course">TECH460 - Senior Project Course</div>
            </div>
            
            <div class="title">Certificate of Achievement</div>
            <div class="subtitle">General Coding Assessment (GCA)</div>
            
            <div class="recipient">
              <div class="recipient-label">This certifies that</div>
              <div class="recipient-name">${studentName}</div>
            </div>
            
            <div class="subtitle" style="max-width: 600px; margin: 0 auto 30px;">
              has successfully completed the General Coding Assessment, demonstrating 
              proficiency in programming fundamentals, problem-solving, and algorithmic thinking.
            </div>
            
            <div class="details">
              <div class="detail">
                <div class="detail-label">Completion Date</div>
                <div class="detail-value">${completionDate}</div>
              </div>
              <div class="detail">
                <div class="detail-label">Assessment Platform</div>
                <div class="detail-value">CodeSignal</div>
              </div>
            </div>
            
            <div class="score-link">
              <div class="score-link-label">Verified Score Report</div>
              <div class="score-link-url">${scoreLink}</div>
            </div>
            
            <div class="footer">
              <div class="signature">
                <div class="signature-line"></div>
                <div class="signature-name">Dr. Vicki Bealman</div>
                <div class="signature-title">Professor of Computer Science</div>
              </div>
              
              <div class="seal">
                <div class="seal-icon">&#9733;</div>
                <div class="seal-text">GCA<br>Certified</div>
              </div>
            </div>
            
            <div class="certificate-id">
              Certificate ID: GCA-${Date.now().toString(36).toUpperCase()}
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-[#d69e2e] text-white border-0 mb-4">
            Example Preview
          </Badge>
          <h1 className="text-3xl font-bold text-[#1a365d] mb-2">
            GCA Certificate Generator
          </h1>
          <p className="text-[#4a5568]">
            This is an example of the certificate design. Review and provide feedback before implementation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="border-[#e2e8f0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1a365d] flex items-center gap-2">
                <User size={20} />
                Certificate Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="scoreLink">CodeSignal Score Link</Label>
                <div className="relative mt-1">
                  <LinkIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096]" />
                  <Input
                    id="scoreLink"
                    value={scoreLink}
                    onChange={(e) => setScoreLink(e.target.value)}
                    placeholder="https://app.codesignal.com/score/..."
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-[#718096] mt-1">
                  Paste your CodeSignal score report URL here
                </p>
              </div>

              <div>
                <Label htmlFor="completionDate">Completion Date</Label>
                <div className="relative mt-1">
                  <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096]" />
                  <Input
                    id="completionDate"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    placeholder="Month DD, YYYY"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button 
                  onClick={generateCertificate}
                  className="w-full bg-[#1a365d] hover:bg-[#2d3748]"
                >
                  <Award size={18} className="mr-2" />
                  Generate Preview
                </Button>
                
                <Button 
                  onClick={downloadCertificate}
                  variant="outline"
                  className="w-full border-[#4a7c59] text-[#4a7c59] hover:bg-[#4a7c59] hover:text-white"
                >
                  <Download size={18} className="mr-2" />
                  Download PDF Certificate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Preview */}
          <Card className="border-[#e2e8f0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1a365d] flex items-center gap-2">
                <Award size={20} />
                Certificate Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showPreview ? (
                <div className="bg-white border-2 border-[#1a365d] p-6 rounded-lg">
                  {/* Mini Certificate Preview */}
                  <div className="text-center border border-[#d69e2e] p-4 rounded">
                    <img 
                      src="/manus-storage/devry-logo_02b8d366.png" 
                      alt="DeVry University" 
                      className="h-8 mx-auto mb-3"
                    />
                    <p className="text-xs text-[#718096] mb-3">TECH460 - Senior Project</p>
                    
                    <div className="border-t border-b border-[#e2e8f0] py-3 my-3">
                      <p className="text-xs text-[#718096]">Certificate of Achievement</p>
                      <p className="font-bold text-[#1a365d]">{studentName}</p>
                    </div>
                    
                    <div className="text-xs text-[#4a5568] space-y-1">
                      <p>General Coding Assessment</p>
                      <p className="text-[#4a7c59] flex items-center justify-center gap-1">
                        <CheckCircle2 size={12} />
                        Certified
                      </p>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-[#e2e8f0]">
                      <p className="text-xs text-[#718096]">Score Report</p>
                      <p className="text-xs text-[#1a365d] truncate">{scoreLink}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-[#4a5568]">
                      Click "Download PDF Certificate" to see the full design
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#f7fafc] border-2 border-dashed border-[#e2e8f0] rounded-lg p-12 text-center">
                  <Award size={48} className="text-[#a0aec0] mx-auto mb-4" />
                  <p className="text-[#718096]">
                    Fill in the form and click "Generate Preview" to see your certificate
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features List */}
        <Card className="border-[#e2e8f0] mt-8">
          <CardHeader>
            <CardTitle className="text-lg text-[#1a365d]">Certificate Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#4a7c59] mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1a365d]">DeVry University Branding</h4>
                  <p className="text-sm text-[#4a5568]">Official university logo and course identification</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#4a7c59] mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1a365d]">Personalized Name</h4>
                  <p className="text-sm text-[#4a5568]">Student name prominently displayed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#4a7c59] mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1a365d]">CodeSignal Score Link</h4>
                  <p className="text-sm text-[#4a5568]">Verifiable link to official score report</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#4a7c59] mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1a365d]">PDF Download</h4>
                  <p className="text-sm text-[#4a5568]">Print-ready certificate for portfolios</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Course
          </Button>
          <Button className="bg-[#4a7c59] hover:bg-[#3d6b4a]">
            Approve & Add to Site
          </Button>
        </div>
      </div>
    </div>
  );
}
