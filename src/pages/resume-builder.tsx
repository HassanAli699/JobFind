import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Plus, Trash2, FileText, User, Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Building, ExternalLink } from "lucide-react";
import SEOHead from "@/components/SEOHead";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: string[];
}

interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  styles: {
    headerBg: string;
    headerText: string;
    sectionColor: string;
    accentColor: string;
    fontFamily: string;
    layout: 'single' | 'two-column';
  };
}

interface ResumeSettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  sectionOrder: string[];
  customStyles: {
    boldSummary: boolean;
    boldJobTitles: boolean;
    boldCompanyNames: boolean;
    italicDates: boolean;
    underlineHeaders: boolean;
  };
}

const initialData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: ""
  },
  summary: "",
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  certifications: []
};

const templates: ResumeTemplate[] = [
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Clean and traditional design perfect for corporate environments',
    preview: 'Simple black and white layout with clear sections',
    styles: {
      headerBg: '#1f2937',
      headerText: '#ffffff',
      sectionColor: '#374151',
      accentColor: '#3b82f6',
      fontFamily: 'Arial, sans-serif',
      layout: 'single'
    }
  },
  {
    id: 'modern',
    name: 'Modern Tech',
    description: 'Contemporary design with blue accents, ideal for tech roles',
    preview: 'Modern layout with blue header and clean typography',
    styles: {
      headerBg: '#3b82f6',
      headerText: '#ffffff',
      sectionColor: '#1e40af',
      accentColor: '#60a5fa',
      fontFamily: 'Helvetica, Arial, sans-serif',
      layout: 'single'
    }
  },
  {
    id: 'creative',
    name: 'Creative Design',
    description: 'Vibrant and stylish template for creative professionals',
    preview: 'Colorful design with purple accents and modern fonts',
    styles: {
      headerBg: '#7c3aed',
      headerText: '#ffffff',
      sectionColor: '#6d28d9',
      accentColor: '#a78bfa',
      fontFamily: 'Georgia, serif',
      layout: 'single'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Minimalist design focusing on content over decoration',
    preview: 'Ultra-clean layout with subtle green accents',
    styles: {
      headerBg: '#059669',
      headerText: '#ffffff',
      sectionColor: '#047857',
      accentColor: '#10b981',
      fontFamily: 'Verdana, sans-serif',
      layout: 'single'
    }
  }
];

const fontOptions = [
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Verdana', value: 'Verdana, sans-serif' },
  { name: 'Calibri', value: 'Calibri, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' }
];

const defaultSettings: ResumeSettings = {
  fontSize: 14,
  fontFamily: 'Arial, sans-serif',
  lineHeight: 1.6,
  sectionOrder: ['summary', 'experience', 'education', 'projects', 'skills', 'certifications'],
  customStyles: {
    boldSummary: false,
    boldJobTitles: true,
    boldCompanyNames: true,
    italicDates: true,
    underlineHeaders: false
  }
};

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [activeSection, setActiveSection] = useState("template");
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(templates[0]);
  const [resumeSettings, setResumeSettings] = useState<ResumeSettings>(defaultSettings);
  const [previewMode, setPreviewMode] = useState<'side' | 'overlay'>('side');

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: ""
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      url: ""
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim()) {
      const skills = skill.split(',').map(s => s.trim()).filter(s => s && !resumeData.skills.includes(s));
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, ...skills]
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addCertification = (cert: string) => {
    if (cert.trim() && !resumeData.certifications.includes(cert.trim())) {
      setResumeData(prev => ({
        ...prev,
        certifications: [...prev.certifications, cert.trim()]
      }));
    }
  };

  const removeCertification = (cert: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== cert)
    }));
  };

  const downloadResume = (format: 'html' | 'pdf' = 'html') => {
    const styles = selectedTemplate.styles;
    
    // Create a styled HTML version of the resume
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.personalInfo.fullName} - Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: ${styles.fontFamily}; 
            line-height: 1.6; 
            color: #333; 
            max-width: 8.5in; 
            margin: 0 auto; 
            padding: 0.5in;
            background: white;
        }
        .header { 
            background: ${styles.headerBg}; 
            color: ${styles.headerText}; 
            padding: 30px 40px; 
            text-align: center; 
            margin: -0.5in -0.5in 30px -0.5in;
            border-radius: 0;
        }
        .name { 
            font-size: 32px; 
            font-weight: bold; 
            margin-bottom: 10px; 
            letter-spacing: 1px;
        }
        .contact { 
            font-size: 14px; 
            opacity: 0.9;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
        }
        .contact-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .section { 
            margin-bottom: 30px; 
        }
        .section-title { 
            font-size: 20px; 
            font-weight: bold; 
            color: ${styles.sectionColor};
            border-bottom: 3px solid ${styles.accentColor}; 
            padding-bottom: 8px; 
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .experience-item, .education-item, .project-item { 
            margin-bottom: 20px; 
            padding-left: 20px;
            border-left: 3px solid ${styles.accentColor};
            padding-left: 15px;
        }
        .item-header { 
            font-weight: bold; 
            margin-bottom: 5px; 
            color: ${styles.sectionColor};
            font-size: 16px;
        }
        .item-company {
            font-weight: 600;
            color: ${styles.accentColor};
            margin-bottom: 3px;
        }
        .item-meta { 
            font-style: italic; 
            color: #666; 
            margin-bottom: 8px;
            font-size: 13px;
        }
        .item-description {
            color: #444;
            line-height: 1.5;
        }
        .skills { 
            display: flex; 
            flex-wrap: wrap; 
            gap: 10px; 
        }
        .skill { 
            background: ${styles.accentColor}; 
            color: white;
            padding: 6px 12px; 
            border-radius: 20px; 
            font-size: 12px;
            font-weight: 500;
        }
        .summary-text {
            background: #f8f9fa;
            padding: 20px;
            border-left: 4px solid ${styles.accentColor};
            font-style: italic;
            line-height: 1.6;
        }
        .certifications-list {
            list-style: none;
            padding: 0;
        }
        .certifications-list li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
            color: #444;
        }
        .certifications-list li:last-child {
            border-bottom: none;
        }
        .project-tech {
            margin-top: 8px;
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
        .tech-tag {
            background: #f1f3f4;
            color: ${styles.sectionColor};
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
        }
        @media print { 
            body { margin: 0; padding: 0.5in; }
            .header { margin: -0.5in -0.5in 20px -0.5in; }
            .section { page-break-inside: avoid; }
            .experience-item, .education-item, .project-item { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${resumeData.personalInfo.fullName}</div>
        <div class="contact">
            ${resumeData.personalInfo.email ? `<span class="contact-item">📧 ${resumeData.personalInfo.email}</span>` : ''}
            ${resumeData.personalInfo.phone ? `<span class="contact-item">📞 ${resumeData.personalInfo.phone}</span>` : ''}
            ${resumeData.personalInfo.location ? `<span class="contact-item">📍 ${resumeData.personalInfo.location}</span>` : ''}
            ${resumeData.personalInfo.website ? `<span class="contact-item">🌐 ${resumeData.personalInfo.website}</span>` : ''}
            ${resumeData.personalInfo.linkedin ? `<span class="contact-item">💼 ${resumeData.personalInfo.linkedin}</span>` : ''}
            ${resumeData.personalInfo.github ? `<span class="contact-item">🔗 ${resumeData.personalInfo.github}</span>` : ''}
        </div>
    </div>

    ${resumeData.summary ? `
    <div class="section">
        <div class="section-title">Professional Summary</div>
        <div class="summary-text">${resumeData.summary}</div>
    </div>
    ` : ''}

    ${resumeData.experiences.length > 0 ? `
    <div class="section">
        <div class="section-title">Professional Experience</div>
        ${resumeData.experiences.map(exp => `
        <div class="experience-item">
            <div class="item-header">${exp.title}</div>
            <div class="item-company">${exp.company}</div>
            <div class="item-meta">${exp.location} • ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
            ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
        </div>
        `).join('')}
    </div>
    ` : ''}

    ${resumeData.education.length > 0 ? `
    <div class="section">
        <div class="section-title">Education</div>
        ${resumeData.education.map(edu => `
        <div class="education-item">
            <div class="item-header">${edu.degree}</div>
            <div class="item-company">${edu.school}</div>
            <div class="item-meta">${edu.location} • ${edu.startDate} - ${edu.endDate}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
        </div>
        `).join('')}
    </div>
    ` : ''}

    ${resumeData.projects.length > 0 ? `
    <div class="section">
        <div class="section-title">Projects</div>
        ${resumeData.projects.map(proj => `
        <div class="project-item">
            <div class="item-header">${proj.name}${proj.url ? ` 🔗` : ''}</div>
            ${proj.description ? `<div class="item-description">${proj.description}</div>` : ''}
            ${proj.technologies.length > 0 ? `
            <div class="project-tech">
                ${proj.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            ` : ''}
        </div>
        `).join('')}
    </div>
    ` : ''}

    ${resumeData.skills.length > 0 ? `
    <div class="section">
        <div class="section-title">Skills & Technologies</div>
        <div class="skills">
            ${resumeData.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
        </div>
    </div>
    ` : ''}

    ${resumeData.certifications.length > 0 ? `
    <div class="section">
        <div class="section-title">Certifications</div>
        <ul class="certifications-list">
            ${resumeData.certifications.map(cert => `<li>🏆 ${cert}</li>`).join('')}
        </ul>
    </div>
    ` : ''}
</body>
</html>
    `;

    if (format === 'pdf') {
      // Create a temporary window for PDF generation
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for content to load then print
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    } else {
      // Download as HTML
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume_${selectedTemplate.name.replace(/\s+/g, '_')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const sections = [
    { id: "template", label: "Template", icon: FileText },
    { id: "personal", label: "Personal Info", icon: User },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: Building },
    { id: "skills", label: "Skills", icon: Award },
    { id: "customize", label: "Customize", icon: Award }
  ];

  const reorderSection = (dragIndex: number, hoverIndex: number) => {
    const newOrder = [...resumeSettings.sectionOrder];
    const dragItem = newOrder[dragIndex];
    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragItem);
    
    setResumeSettings(prev => ({
      ...prev,
      sectionOrder: newOrder
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEOHead 
        title="Free Resume Builder | Create Professional Resume Online - JobFind"
        description="Build a professional resume in minutes with JobFind's free resume builder. Choose from templates, add your experience, and download instantly. Perfect for remote job applications."
        keywords="free resume builder, resume template, CV maker, job application, professional resume, resume download, career tools"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Professional Resume Builder
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Create a professional resume in minutes. Fill in your information, customize the layout, and download your resume ready for job applications.
          </p>
        </div>

        {/* Preview Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 border shadow-sm">
            <button
              onClick={() => setPreviewMode('side')}
              className={`px-4 py-2 rounded-md transition-all ${
                previewMode === 'side' 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Side by Side
            </button>
            <button
              onClick={() => setPreviewMode('overlay')}
              className={`px-4 py-2 rounded-md transition-all ${
                previewMode === 'overlay' 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Full Preview
            </button>
          </div>
        </div>

        <div className={`grid gap-8 ${previewMode === 'side' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'}`}>
          {/* Editor Panel */}
          <div className={`space-y-6 ${previewMode === 'side' ? '' : 'lg:col-span-2'}`}>
            {/* Section Navigation */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resume Builder
                </CardTitle>
                <CardDescription>
                  Choose a template and fill in your information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {sections.map(section => {
                    const Icon = section.icon;
                    return (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveSection(section.id)}
                        className="flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {section.label}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Template Selection */}
            {activeSection === "template" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Choose Resume Template
                  </CardTitle>
                  <CardDescription>
                    Select a professional template that matches your style and industry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map(template => (
                      <div
                        key={template.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedTemplate.id === template.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{template.name}</h3>
                            <p className="text-sm text-slate-600">{template.description}</p>
                          </div>
                          {selectedTemplate.id === template.id && (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        {/* Template Preview */}
                        <div 
                          className="w-full h-32 rounded border-2 border-gray-100 p-2 text-xs overflow-hidden"
                          style={{ 
                            background: `linear-gradient(to bottom, ${template.styles.headerBg} 25%, white 25%)`,
                            fontFamily: template.styles.fontFamily
                          }}
                        >
                          <div className="text-center text-white font-bold mb-1" style={{ fontSize: '8px' }}>
                            {resumeData.personalInfo.fullName || 'Your Name'}
                          </div>
                          <div className="text-white text-center mb-2" style={{ fontSize: '6px' }}>
                            {resumeData.personalInfo.email || 'email@example.com'}
                          </div>
                          <div className="bg-white p-1 h-20">
                            <div 
                              className="font-semibold border-b mb-1" 
                              style={{ 
                                color: template.styles.sectionColor, 
                                borderColor: template.styles.accentColor,
                                fontSize: '7px'
                              }}
                            >
                              EXPERIENCE
                            </div>
                            <div style={{ fontSize: '6px' }}>
                              <div className="font-medium" style={{ color: template.styles.sectionColor }}>
                                Job Title
                              </div>
                              <div style={{ color: template.styles.accentColor }}>Company Name</div>
                              <div className="text-gray-500">2020 - Present</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <div className="flex gap-1">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: template.styles.headerBg }}
                            ></div>
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: template.styles.accentColor }}
                            ></div>
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: template.styles.sectionColor }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate-500 capitalize">
                            {template.styles.layout} column
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Selected Template: {selectedTemplate.name}</h4>
                    <p className="text-sm text-blue-700">{selectedTemplate.description}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Customization Section */}
            {activeSection === "customize" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Customize Appearance
                  </CardTitle>
                  <CardDescription>
                    Adjust fonts, spacing, and text styling
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Font Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Font Family</label>
                      <select
                        value={resumeSettings.fontFamily}
                        onChange={(e) => setResumeSettings(prev => ({
                          ...prev,
                          fontFamily: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {fontOptions.map(font => (
                          <option key={font.value} value={font.value}>
                            {font.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Font Size: {resumeSettings.fontSize}px</label>
                      <input
                        type="range"
                        min="10"
                        max="18"
                        value={resumeSettings.fontSize}
                        onChange={(e) => setResumeSettings(prev => ({
                          ...prev,
                          fontSize: parseInt(e.target.value)
                        }))}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Line Height: {resumeSettings.lineHeight}</label>
                    <input
                      type="range"
                      min="1.2"
                      max="2.0"
                      step="0.1"
                      value={resumeSettings.lineHeight}
                      onChange={(e) => setResumeSettings(prev => ({
                        ...prev,
                        lineHeight: parseFloat(e.target.value)
                      }))}
                      className="w-full"
                    />
                  </div>

                  <Separator />

                  {/* Text Styling Options */}
                  <div>
                    <h4 className="font-medium mb-3">Text Styling</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'boldSummary', label: 'Bold Professional Summary' },
                        { key: 'boldJobTitles', label: 'Bold Job Titles' },
                        { key: 'boldCompanyNames', label: 'Bold Company Names' },
                        { key: 'italicDates', label: 'Italic Dates' },
                        { key: 'underlineHeaders', label: 'Underline Section Headers' }
                      ].map(option => (
                        <div key={option.key} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={option.key}
                            checked={resumeSettings.customStyles[option.key as keyof typeof resumeSettings.customStyles]}
                            onChange={(e) => setResumeSettings(prev => ({
                              ...prev,
                              customStyles: {
                                ...prev.customStyles,
                                [option.key]: e.target.checked
                              }
                            }))}
                            className="rounded"
                          />
                          <label htmlFor={option.key} className="text-sm">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Section Order */}
                  <div>
                    <h4 className="font-medium mb-3">Section Order</h4>
                    <p className="text-sm text-slate-600 mb-3">Drag to reorder sections in your resume</p>
                    <div className="space-y-2">
                      {resumeSettings.sectionOrder.map((sectionId, index) => (
                        <div
                          key={sectionId}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border cursor-move"
                          draggable
                          onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                            reorderSection(dragIndex, index);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                            </svg>
                            <span className="font-medium capitalize">{sectionId.replace(/([A-Z])/g, ' $1')}</span>
                          </div>
                          <span className="text-xs text-slate-500">#{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Personal Information */}
            {activeSection === "personal" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Basic contact information and professional links
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                        }))}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, email: e.target.value }
                        }))}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <Input
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, phone: e.target.value }
                        }))}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location *</label>
                      <Input
                        value={resumeData.personalInfo.location}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, location: e.target.value }
                        }))}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Website</label>
                      <Input
                        value={resumeData.personalInfo.website}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, website: e.target.value }
                        }))}
                        placeholder="https://johndoe.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">LinkedIn</label>
                      <Input
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                        }))}
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Professional Summary */}
            {activeSection === "summary" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Professional Summary
                  </CardTitle>
                  <CardDescription>
                    A brief overview of your professional background and key strengths
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={resumeData.summary}
                    onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="Write a compelling professional summary that highlights your key achievements, skills, and career objectives. Keep it concise and focused on what makes you unique."
                    rows={6}
                    className="w-full"
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    Tip: Focus on your most relevant achievements and what value you bring to employers.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Experience Section */}
            {activeSection === "experience" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Work Experience
                  </CardTitle>
                  <CardDescription>
                    List your professional experience starting with the most recent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.experiences.map((exp, index) => (
                    <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Experience #{index + 1}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Job Title</label>
                          <Input
                            value={exp.title}
                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                            placeholder="Software Engineer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Company</label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            placeholder="Tech Company Inc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Location</label>
                          <Input
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                            placeholder="San Francisco, CA"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Start Date</label>
                          <Input
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            placeholder="January 2022"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">End Date</label>
                          <Input
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            placeholder="Present"
                            disabled={exp.current}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          />
                          <label htmlFor={`current-${exp.id}`} className="text-sm">
                            I currently work here
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Job Description</label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          placeholder="Describe your responsibilities, achievements, and impact in this role. Use bullet points and quantify results when possible."
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}
                  <Button onClick={addExperience} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Education Section */}
            {activeSection === "education" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Education
                  </CardTitle>
                  <CardDescription>
                    Add your educational background and qualifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Education #{index + 1}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Degree</label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Bachelor of Science in Computer Science"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">School</label>
                          <Input
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            placeholder="University of California"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Location</label>
                          <Input
                            value={edu.location}
                            onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                            placeholder="Berkeley, CA"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">GPA (Optional)</label>
                          <Input
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            placeholder="3.8/4.0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Start Date</label>
                          <Input
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                            placeholder="September 2018"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">End Date</label>
                          <Input
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                            placeholder="May 2022"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={addEducation} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Projects Section */}
            {activeSection === "projects" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Projects
                  </CardTitle>
                  <CardDescription>
                    Showcase your personal or professional projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.projects.map((project, index) => (
                    <div key={project.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Project #{index + 1}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProject(project.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Project Name</label>
                          <Input
                            value={project.name}
                            onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                            placeholder="E-commerce Platform"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Project URL (Optional)</label>
                          <Input
                            value={project.url}
                            onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          placeholder="Describe what the project does, your role, and the impact it had."
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Technologies Used</label>
                        <Input
                          value={project.technologies.join(', ')}
                          onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                          placeholder="React, Node.js, MongoDB, AWS"
                        />
                        <p className="text-sm text-slate-500 mt-1">Separate technologies with commas</p>
                      </div>
                    </div>
                  ))}
                  <Button onClick={addProject} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Skills Section */}
            {activeSection === "skills" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Skills & Certifications
                  </CardTitle>
                  <CardDescription>
                    Add your technical and soft skills, plus any certifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Skills</label>
                    <div className="flex flex-wrap gap-2 mb-4 max-h-40 overflow-y-auto">
                      {resumeData.skills.map((skill, index) => (
                        <Badge key={`${skill}-${index}`} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-1 text-slate-500 hover:text-red-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add skills (separate multiple with commas)"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const input = e.target as HTMLInputElement;
                            addSkill(input.value);
                            input.value = '';
                          }
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                          addSkill(input.value);
                          input.value = '';
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                      Add multiple skills at once by separating them with commas
                    </p>
                  </div>

                  <Separator />

                  {/* Certifications */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Certifications</label>
                    <div className="space-y-2 mb-4">
                      {resumeData.certifications.map(cert => (
                        <div key={cert} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                          <span>{cert}</span>
                          <button
                            onClick={() => removeCertification(cert)}
                            className="text-slate-500 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a certification (e.g., AWS Certified Solutions Architect)"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const input = e.target as HTMLInputElement;
                            addCertification(input.value);
                            input.value = '';
                          }
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                          addCertification(input.value);
                          input.value = '';
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview Panel */}
          <div className={`${previewMode === 'side' ? '' : 'lg:col-span-1'}`}>
            <div className={`sticky top-8 ${previewMode === 'side' ? 'h-screen overflow-hidden' : ''}`}>
              <Card className="bg-white h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Resume Preview</span>
                    <div className="flex gap-2">
                      <Button onClick={() => downloadResume('html')} size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        HTML
                      </Button>
                      <Button onClick={() => downloadResume('pdf')} size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Live preview • {selectedTemplate.name} template
                  </CardDescription>
                </CardHeader>
                <CardContent 
                  className={`space-y-6 overflow-y-auto p-4 ${
                    previewMode === 'side' ? 'h-[calc(100vh-200px)]' : 'max-h-96'
                  }`}
                  style={{
                    fontSize: `${resumeSettings.fontSize}px`,
                    fontFamily: resumeSettings.fontFamily,
                    lineHeight: resumeSettings.lineHeight
                  }}
                >
                  {/* Styled Preview Header */}
                  <div 
                    className="text-center text-white p-6 rounded-lg mx-2 mb-6 shadow-sm"
                    style={{ 
                      backgroundColor: selectedTemplate.styles.headerBg,
                      fontFamily: selectedTemplate.styles.fontFamily
                    }}
                  >
                    <h2 className="text-xl font-bold mb-3 break-words">
                      {resumeData.personalInfo.fullName || "Your Name"}
                    </h2>
                    <div className="text-sm opacity-90 flex flex-wrap justify-center gap-4">
                      {resumeData.personalInfo.email && (
                        <div className="flex items-center gap-1 break-all">
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate max-w-[150px]">{resumeData.personalInfo.email}</span>
                        </div>
                      )}
                      {resumeData.personalInfo.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <span>{resumeData.personalInfo.phone}</span>
                        </div>
                      )}
                      {resumeData.personalInfo.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate max-w-[120px]">{resumeData.personalInfo.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Section Rendering */}
                  {resumeSettings.sectionOrder.map((sectionId) => {
                    switch (sectionId) {
                      case 'summary':
                        return resumeData.summary ? (
                          <div key={sectionId} className="px-2">
                            <h3 
                              className={`font-semibold mb-3 pb-1 border-b-2 uppercase text-sm tracking-wide ${
                                resumeSettings.customStyles.underlineHeaders ? 'underline' : ''
                              }`}
                              style={{ 
                                color: selectedTemplate.styles.sectionColor,
                                borderColor: selectedTemplate.styles.accentColor 
                              }}
                            >
                              Professional Summary
                            </h3>
                            <div 
                              className={`text-sm text-slate-700 p-4 rounded-lg border-l-4 leading-relaxed ${
                                resumeSettings.customStyles.boldSummary ? 'font-semibold' : ''
                              }`}
                              style={{ 
                                backgroundColor: '#f8f9fa',
                                borderColor: selectedTemplate.styles.accentColor 
                              }}
                            >
                              {resumeData.summary}
                            </div>
                          </div>
                        ) : null;

                      case 'experience':
                        return resumeData.experiences.length > 0 ? (
                          <div key={sectionId} className="px-2">
                            <h3 
                              className={`font-semibold mb-4 pb-1 border-b-2 uppercase text-sm tracking-wide ${
                                resumeSettings.customStyles.underlineHeaders ? 'underline' : ''
                              }`}
                              style={{ 
                                color: selectedTemplate.styles.sectionColor,
                                borderColor: selectedTemplate.styles.accentColor 
                              }}
                            >
                              Professional Experience
                            </h3>
                            <div className="space-y-4">
                              {resumeData.experiences.map(exp => (
                                <div 
                                  key={exp.id} 
                                  className="text-sm pl-4 border-l-3 py-1"
                                  style={{ borderColor: selectedTemplate.styles.accentColor }}
                                >
                                  <div 
                                    className={`${resumeSettings.customStyles.boldJobTitles ? 'font-bold' : 'font-semibold'} mb-1`}
                                    style={{ color: selectedTemplate.styles.sectionColor }}
                                  >
                                    {exp.title || "Job Title"}
                                  </div>
                                  <div 
                                    className={`${resumeSettings.customStyles.boldCompanyNames ? 'font-bold' : 'font-medium'} mb-1`}
                                    style={{ color: selectedTemplate.styles.accentColor }}
                                  >
                                    {exp.company || "Company Name"}
                                  </div>
                                  <div className={`text-xs text-slate-500 mb-2 ${resumeSettings.customStyles.italicDates ? 'italic' : ''}`}>
                                    {exp.location && `${exp.location} • `}
                                    {exp.startDate || "Start"} - {exp.current ? 'Present' : (exp.endDate || "End")}
                                  </div>
                                  {exp.description && (
                                    <div className="text-xs text-slate-700 leading-relaxed">
                                      {exp.description}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null;

                      case 'education':
                        return resumeData.education.length > 0 ? (
                          <div key={sectionId} className="px-2">
                            <h3 
                              className={`font-semibold mb-3 pb-1 border-b-2 uppercase text-sm tracking-wide ${
                                resumeSettings.customStyles.underlineHeaders ? 'underline' : ''
                              }`}
                              style={{ 
                                color: selectedTemplate.styles.sectionColor,
                                borderColor: selectedTemplate.styles.accentColor 
                              }}
                            >
                              Education
                            </h3>
                            <div className="space-y-3">
                              {resumeData.education.map(edu => (
                                <div key={edu.id} className="text-sm pl-1">
                                  <div className="font-medium mb-1">{edu.degree || "Degree"}</div>
                                  <div className="text-slate-600 mb-1">{edu.school || "School"}</div>
                                  <div className={`text-xs text-slate-500 ${resumeSettings.customStyles.italicDates ? 'italic' : ''}`}>
                                    {edu.location && `${edu.location} • `}
                                    {edu.startDate || "Start"} - {edu.endDate || "End"}
                                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null;

                      case 'projects':
                        return resumeData.projects.length > 0 ? (
                          <div key={sectionId} className="px-2">
                            <h3 
                              className={`font-semibold mb-3 pb-1 border-b-2 uppercase text-sm tracking-wide ${
                                resumeSettings.customStyles.underlineHeaders ? 'underline' : ''
                              }`}
                              style={{ 
                                color: selectedTemplate.styles.sectionColor,
                                borderColor: selectedTemplate.styles.accentColor 
                              }}
                            >
                              Projects
                            </h3>
                            <div className="space-y-3">
                              {resumeData.projects.map(project => (
                                <div key={project.id} className="text-sm pl-1">
                                  <div className="font-medium flex items-center gap-1 mb-1">
                                    {project.name || "Project Name"}
                                    {project.url && <ExternalLink className="w-3 h-3" />}
                                  </div>
                                  {project.description && (
                                    <div className="text-xs text-slate-700 leading-relaxed mb-2">
                                      {project.description}
                                    </div>
                                  )}
                                  {project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      {project.technologies.slice(0, 3).map(tech => (
                                        <Badge key={tech} variant="outline" className="text-xs px-2 py-0.5">
                                          {tech}
                                        </Badge>
                                      ))}
                                      {project.technologies.length > 3 && (
                                        <Badge variant="outline" className="text-xs px-2 py-0.5">
                                          +{project.technologies.length - 3}
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null;

                      case 'skills':
                        return resumeData.skills.length > 0 ? (
                          <div key={sectionId} className="px-2">
                            <h3 
                              className={`font-semibold mb-3 pb-1 border-b-2 uppercase text-sm tracking-wide ${
                                resumeSettings.customStyles.underlineHeaders ? 'underline' : ''
                              }`}
                              style={{ 
                                color: selectedTemplate.styles.sectionColor,
                                borderColor: selectedTemplate.styles.accentColor 
                              }}
                            >
                              Skills & Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2 p-1">
                              {resumeData.skills.map((skill, index) => (
                                <span
                                  key={`${skill}-${index}`}
                                  className="text-xs px-3 py-1.5 rounded-full text-white font-medium shadow-sm"
                                  style={{ backgroundColor: selectedTemplate.styles.accentColor }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : null;

                      case 'certifications':
                        return resumeData.certifications.length > 0 ? (
                          <div key={sectionId} className="px-2">
                            <h3 
                              className={`font-semibold mb-3 pb-1 border-b-2 uppercase text-sm tracking-wide ${
                                resumeSettings.customStyles.underlineHeaders ? 'underline' : ''
                              }`}
                              style={{ 
                                color: selectedTemplate.styles.sectionColor,
                                borderColor: selectedTemplate.styles.accentColor 
                              }}
                            >
                              Certifications
                            </h3>
                            <div className="space-y-2 pl-1">
                              {resumeData.certifications.map(cert => (
                                <div key={cert} className="text-xs text-slate-700 leading-relaxed">
                                  • {cert}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null;

                      default:
                        return null;
                    }
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}