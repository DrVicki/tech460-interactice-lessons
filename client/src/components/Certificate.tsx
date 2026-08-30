import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Award, 
  Download, 
  CheckCircle2,
  Calendar,
  User
} from "lucide-react";
import { useModuleProgress } from "@/contexts/ModuleProgressContext";

export default function Certificate() {
  const { getCompletedCount, getOverallProgress } = useModuleProgress();
  const [studentName, setStudentName] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  
  const completedCount = getCompletedCount();
  const overallProgress = getOverallProgress();
  const isComplete = completedCount === 8;
  
  const certificateId = `TECH460-${Date.now().toString(36).toUpperCase()}`;
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const generateCertificate = () => {
    if (studentName.trim()) {
      setShowCertificate(true);
    }
  };

  const downloadCertificate = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>TECH460 Course Completion Certificate</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Source+Sans+3:wght@400;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Source Sans 3', Arial, sans-serif;
            background: #f7fafc;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
          }
          
          .certificate {
            background: white;
            width: 100%;
            max-width: 900px;
            padding: 60px;
            border: 3px solid #1a365d;
            position: relative;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
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
            width: 80px;
            height: 80px;
            background: #1a365d;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            color: white;
            font-weight: bold;
            font-size: 14px;
          }
          
          .title {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 36px;
            color: #1a365d;
            margin-bottom: 10px;
          }
          
          .subtitle {
            color: #4a5568;
            font-size: 18px;
          }
          
          .content {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .presented-to {
            font-size: 14px;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10px;
          }
          
          .student-name {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 42px;
            color: #1a365d;
            margin-bottom: 20px;
            border-bottom: 2px solid #d69e2e;
            display: inline-block;
            padding-bottom: 10px;
          }
          
          .achievement {
            font-size: 18px;
            color: #4a5568;
            line-height: 1.8;
            max-width: 600px;
            margin: 0 auto;
          }
          
          .details {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin-top: 40px;
          }
          
          .detail-item {
            text-align: center;
          }
          
          .detail-label {
            font-size: 12px;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
          }
          
          .detail-value {
            font-size: 16px;
            color: #1a365d;
            font-weight: 600;
          }
          
          .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid #e2e8f0;
          }
          
          .signature {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 18px;
            color: #1a365d;
            margin-bottom: 5px;
          }
          
          .signature-title {
            font-size: 14px;
            color: #718096;
          }
          
          .certificate-id {
            margin-top: 20px;
            font-size: 12px;
            color: #a0aec0;
          }
          
          @media print {
            body {
              background: white;
            }
            .certificate {
              box-shadow: none;
              max-width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <div class="logo">TECH460</div>
            <h1 class="title">Certificate of Completion</h1>
            <p class="subtitle">TECH460: Senior Project Course</p>
          </div>
          
          <div class="content">
            <p class="presented-to">This certificate is presented to</p>
            <h2 class="student-name">${studentName}</h2>
            <p class="achievement">
              for successfully completing all 8 modules of the TECH460 Senior Project Course, 
              demonstrating proficiency in career development, technical skills, and 
              professional project management.
            </p>
            
            <div class="details">
              <div class="detail-item">
                <p class="detail-label">Completion Date</p>
                <p class="detail-value">${completionDate}</p>
              </div>
              <div class="detail-item">
                <p class="detail-label">Modules Completed</p>
                <p class="detail-value">8 of 8</p>
              </div>
              <div class="detail-item">
                <p class="detail-label">Final Score</p>
                <p class="detail-value">100%</p>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p class="signature">Dr. Vicki Bealman</p>
            <p class="signature-title">Course Instructor, DeVry University</p>
            <p class="certificate-id">Certificate ID: ${certificateId}</p>
          </div>
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

  if (!isComplete) {
    return (
      <Card className="border-[#e2e8f0]">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-[#e2e8f0] rounded-full flex items-center justify-center mx-auto mb-4">
            <Award size={32} className="text-[#718096]" />
          </div>
          <h3 className="text-xl font-bold text-[#1a365d] mb-2">
            Course Certificate
          </h3>
          <p className="text-[#4a5568] mb-4">
            Complete all 8 modules to earn your TECH460 Course Completion Certificate.
          </p>
          <div className="bg-[#f7fafc] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#4a5568]">Your Progress</span>
              <span className="text-sm font-semibold text-[#1a365d]">{completedCount}/8 modules</span>
            </div>
            <div className="w-full bg-[#e2e8f0] rounded-full h-2">
              <div 
                className="bg-[#4a7c59] h-2 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#4a7c59] bg-gradient-to-br from-[#f0fff4] to-white">
      <CardContent className="p-8">
        {!showCertificate ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-[#4a7c59] rounded-full flex items-center justify-center mx-auto mb-6">
              <Award size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1a365d] mb-2">
              Congratulations!
            </h3>
            <p className="text-[#4a5568] mb-6">
              You've completed all 8 modules of TECH460. Enter your name below to 
              generate your Course Completion Certificate.
            </p>
            
            <div className="max-w-sm mx-auto space-y-4">
              <div>
                <Label htmlFor="studentName" className="text-left block mb-2">
                  Your Full Name
                </Label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]" />
                  <Input
                    id="studentName"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter your full name"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button 
                onClick={generateCertificate}
                disabled={!studentName.trim()}
                className="w-full bg-[#4a7c59] hover:bg-[#3d6b4a] text-white gap-2"
              >
                <Award size={18} />
                Generate Certificate
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-[#4a7c59] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1a365d] mb-2">
              Certificate Ready!
            </h3>
            <p className="text-[#4a5568] mb-6">
              Your TECH460 Course Completion Certificate has been generated. 
              Click below to download or print.
            </p>
            
            <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 mb-6">
              <div className="flex items-center justify-center gap-4 text-left">
                <div className="w-12 h-12 bg-[#1a365d] rounded-full flex items-center justify-center">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#1a365d]">{studentName}</p>
                  <p className="text-sm text-[#4a5568] flex items-center gap-1">
                    <Calendar size={14} />
                    {completionDate}
                  </p>
                  <p className="text-xs text-[#718096]">ID: {certificateId}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={downloadCertificate}
                className="bg-[#1a365d] hover:bg-[#2d4a7a] text-white gap-2"
              >
                <Download size={18} />
                Download PDF
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowCertificate(false)}
              >
                Edit Name
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
