import React, { useState, useCallback, useRef } from 'react';
import { Section } from './types.ts';
import { generateContent } from './services/groqService.ts'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HeroSection } from './components/HeroSection.tsx';
import { KalamInput } from './components/ui/KalamInput.tsx';
import { BlurFade } from './components/ui/blur-fade.tsx';
import { Footer } from './components/Footer.tsx';
import { Copy, Download } from 'lucide-react';
import { FeaturesSection } from './components/FeaturesSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';

// --- HELPER FUNCTIONS ---

const exportToTxt = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const exportToPdf = async (elementId: string, filename: string) => {
    const input = document.getElementById(elementId);
    if (input) {
        // Temporarily change text color to be visible on a light background for PDF
        const originalColor = input.style.color;
        input.style.color = '#333';
        const canvas = await html2canvas(input, { 
            backgroundColor: '#ffffff', // White background for PDF
            scale: 2 
        });
        input.style.color = originalColor; // Revert text color

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
        pdf.save(`${filename}.pdf`);
    }
};


// --- COMMON COMPONENTS ---

const Loader: React.FC = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#a89080]"></div>
    </div>
);

interface OutputDisplayProps {
    output: string | null;
    isLoading: boolean;
    exportOptions?: { pdf: boolean; word: boolean; };
    outputId: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, isLoading, exportOptions, outputId }) => {
    const [copyText, setCopyText] = useState('Copy');

    const handleCopy = () => {
        if (output) {
            navigator.clipboard.writeText(output);
            setCopyText('Copied!');
            setTimeout(() => setCopyText('Copy'), 2000);
        }
    };

    return (
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 h-full flex flex-col relative min-h-[300px] lg:min-h-[400px] w-full max-w-4xl mx-auto mt-8 border border-white/10 shadow-lg">
            {isLoading && <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl z-10"><Loader /></div>}
            
            <div className="flex justify-between items-center mb-3 px-2">
                <h3 className="text-lg font-semibold text-[#c8b4a0]">Generated Output</h3>
                <div className="flex items-center space-x-1">
                    {output && !isLoading && (
                        <>
                            {exportOptions?.pdf && (
                                <button onClick={() => exportToPdf(outputId, 'kalam-output')} className="p-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors" title="Export as PDF"><Download className="w-4 h-4" /></button>
                            )}
                            {exportOptions?.word && (
                                <button onClick={() => exportToTxt(output, 'kalam-output')} className="p-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors" title="Export as TXT"><Download className="w-4 h-4" /></button>
                            )}
                            <button onClick={handleCopy} className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-md hover:bg-white/20 transition-colors text-sm text-gray-200">
                                <Copy className="w-4 h-4" />
                                <span>{copyText}</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
                    <div id={outputId} className="prose prose-invert max-w-none flex-grow overflow-y-auto p-4 bg-black/40 rounded-lg text-[#e6e1d7] font-sans" style={{ fontFamily: 'Poppins, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
                        {output ? (
                            <StructuredOutput text={output} />
                        ) : (
                            <div className="text-gray-500">Your AI-generated content will appear here...</div>
                        )}
                    </div>
        </div>
    );
};

        // Small presentational parser to make plain-text output look structured.
        function StructuredOutput({ text }: { text: string }) {
            // Split into paragraph blocks separated by blank lines
            const blocks = text.split(/\n\s*\n/).filter(Boolean);

            return (
                <div className="w-full">
                    {blocks.map((block, i) => {
                        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
                        if (lines.length === 0) return null;

                        const first = lines[0];

                        // Detect a heading: either ends with ':' or is short (<60) and capitalized
                        const isHeading = first.endsWith(':') || (/^[A-Z][A-Za-z0-9\s'"-]{0,59}$/.test(first) && first.length < 60);

                        // Detect a simple list (each line starts with '-' or '*')
                        const isList = lines.every((ln) => /^[-*]\s+/.test(ln));

                        if (isList) {
                            return (
                                <ul key={i} className="list-disc ml-6 mb-4 text-[#e6e1d7]">
                                    {lines.map((ln, idx) => (
                                        <li key={idx} className="mb-1">{ln.replace(/^[-*]\s+/, '')}</li>
                                    ))}
                                </ul>
                            );
                        }

                        if (isHeading && lines.length > 1) {
                            const headingText = first.replace(/:$/, '');
                            const body = lines.slice(1).join('\n');
                            return (
                                <div key={i} className="mb-4">
                                    <h3 className="font-bold text-lg mb-2 text-white">{headingText}</h3>
                                    <p className="whitespace-pre-wrap text-[#e6e1d7]">{body}</p>
                                </div>
                            );
                        }

                        // If block looks like a short single-line heading
                        if (isHeading && lines.length === 1) {
                            return (
                                <h3 key={i} className="font-bold text-lg mb-4 text-white">{first.replace(/:$/, '')}</h3>
                            );
                        }

                        // Default: render as paragraph keeping line breaks
                        return (
                            <p key={i} className="whitespace-pre-wrap mb-4 text-[#e6e1d7]">
                                {block}
                            </p>
                        );
                    })}
                </div>
            );
        }

// --- CONFIG ---

// Fix: Add a type for the section configuration to ensure consistent property access.
interface SectionConfig {
  title: string;
  subtitle: string;
  placeholder: string;
  showWordLimit: boolean;
  showFileUpload: boolean;
  exportOptions: { pdf: boolean; word: boolean; } | undefined;
  inputMinHeight?: number;
  inputMaxHeight?: number;
}

const SECTION_CONFIG: Record<Section, SectionConfig> = {
  [Section.Ask]: {
    title: "Ask Kalam",
    subtitle: "Ready to turn your ideas into compelling text?",
    placeholder: "e.g., An article about the future of renewable energy...",
    showWordLimit: true,
    showFileUpload: false,
        exportOptions: undefined,
        inputMinHeight: 180,
        inputMaxHeight: 500,
  },
  [Section.Rewrite]: {
    title: "Kalam Rewrite",
    subtitle: "Paste your content to get a plagiarism-free, human-like version.",
    placeholder: "Paste your text here...",
    showWordLimit: true,
    showFileUpload: false,
    exportOptions: { pdf: true, word: true },
    inputMinHeight: 180,
    inputMaxHeight: 500,
  },
  [Section.Mail]: {
    title: "Kalam Mail",
    subtitle: "Generate a short, crisp, and professional cold mail.",
    placeholder: "Paste the job description or describe the role you're applying for...",
    showWordLimit: true,
    showFileUpload: false,
        exportOptions: undefined,
        inputMinHeight: 180,
        inputMaxHeight: 500,
  },
  [Section.Research]: {
    title: "Kalam Research",
    subtitle: "What's your research topic? Get a curated article.",
    placeholder: "e.g., The impact of quantum computing on cryptography...",
    showWordLimit: true,
    showFileUpload: false,
        exportOptions: undefined,
        inputMinHeight: 180,
        inputMaxHeight: 500,
  },
  [Section.Post]: {
    title: "Kalam Post",
    subtitle: "What's your post about? Get a well-curated LinkedIn post.",
    placeholder: "e.g., The importance of work-life balance in the tech industry...",
    showWordLimit: true,
    showFileUpload: false,
        exportOptions: undefined,
        inputMinHeight: 180,
        inputMaxHeight: 500,
  },
};

// --- MAIN APP ---

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<Section>(Section.Ask);
    const [wordLimit, setWordLimit] = useState('');
    const [output, setOutput] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async (prompt: string) => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setOutput(null);

        const fileContent = ''; // Removed file functionality

        let fullPrompt = '';
        let expectJson = false;
        
        switch (activeSection) {
            case Section.Ask:
    fullPrompt = `
You are *Kalam*, an expert and insightful writer known for producing original, plagiarism-free, and human-like text. 
Your writing should be engaging, logically structured, and demonstrate clarity, creativity, and depth. 

Write a well-crafted and thoughtful piece on the topic: **"${prompt}"**.

${wordLimit ? `Aim for around ${wordLimit} words, ensuring the content remains coherent, balanced, and impactful.` : ''}

Focus on:
- A clear introduction, body, and conclusion
- Smooth transitions and natural tone
- Creative yet professional expression
- Original ideas with strong readability
`;
    break;

            case Section.Rewrite:
    fullPrompt = `
You are *Kalam*, an expert editor and rewriter renowned for transforming text into engaging, polished, and natural prose. 
Your task is to comprehensively rewrite the given content to enhance clarity, flow, and readability — not merely paraphrase it.

Guidelines:
- Maintain the original meaning and intent.  
- Eliminate all traces of plagiarism — ensure the rewrite is 100% original.  
- Use a natural, human-like tone with smooth transitions and coherent structure.  
- Improve vocabulary, sentence rhythm, and overall quality without overcomplicating the language.  

Here is the original text to rewrite:
"""
${prompt}
"""
`;
    break;

            case Section.Mail:
    expectJson = true;
    fullPrompt = `
You are *Kalam*, an expert career coach and professional writer skilled in crafting personalized, high-impact cold emails for job applications. 

Your task:
Write a short, crisp, and persuasive cold email (around 80–200 words) tailored for a specific job role.

Guidelines:
- The tone should be confident, polite, and genuinely human-like and must be natural not like ai generated.  
- Clearly convey enthusiasm and alignment with the job.  
- Keep the message concise and professional — avoid buzzwords or exaggeration.  
- The email must feel natural and personalized, not robotic or templated.  
- Say thanks and express eagerness for a response in next line.

Format your response **strictly** as a single JSON object with the following keys:
{
  "subject": "string",
  "body": "string",
  "Regards": "string"
}

Job Description:
"""
${prompt}
"""
`;
    break;

            case Section.Research:
    fullPrompt = `
You are *Kalam*, an expert researcher and academic writer known for producing insightful, original, and well-structured research articles. 
Your goal is to create a plagiarism-free, human-like, and comprehensive research piece on the given topic.

Guidelines:
- Maintain a formal and objective academic tone.  
- Organize the article into clear sections: Abstract, Introduction, Methodology, Results/Discussion, and Conclusion (where relevant).  
- Ensure logical flow, strong coherence, and evidence-backed arguments.  
- Avoid repetition, filler, or generic statements.  
- Cite or refer to ideas conceptually without copying — everything must be authentically written.  

Topic:
**"${prompt}"**

${wordLimit ? `Target length: approximately ${wordLimit} words.` : ''}
`;
    break;

            case Section.Post:
    fullPrompt = `
You are *Kalam*, an expert social media strategist and storyteller known for crafting highly engaging and authentic LinkedIn posts. 

Your task:
Write a professional, conversational, and thought-provoking LinkedIn post about the topic below.

Guidelines:
- Start with a strong hook that grabs attention in the first line.  
- Use a natural, human-like tone — avoid sounding robotic or overly polished.  
- Share a clear insight, takeaway, or personal perspective related to the topic.  
- Encourage readers to reflect, comment, or share their thoughts.  
- Maintain professionalism while keeping it relatable and warm.  
- Add 3–5 relevant hashtags at the end for visibility.  

Topic:
**"${prompt}"**

${wordLimit ? `Target length: around ${wordLimit} words.` : ''}
`;
    break;

        }
        
        const result = await generateContent(fullPrompt, expectJson);

        if (expectJson) {
             try {
                // Gemini returns a JSON string, sometimes with markdown backticks
                const cleanResult = result.replace(/```json/g, '').replace(/```/g, '').trim();
                const parsed = JSON.parse(cleanResult);
                const formattedOutput = `Subject: ${parsed.subject}\n\n${parsed.body}`;
                setOutput(formattedOutput);
            } catch (e) {
                console.error("Error parsing JSON:", e);
                setOutput(`Error parsing the response. Raw output:\n\n${result}`);
            }
        } else {
            setOutput(result);
        }
       
        setIsLoading(false);
    };
    
    const config = SECTION_CONFIG[activeSection];
    const outputId = `${activeSection.replace(/\s+/g, '-').toLowerCase()}-output`;


    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26] text-foreground font-sans relative">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path
                      d="M 60 0 L 0 0 0 60"
                      fill="none"
                      stroke="rgba(200,180,160,0.08)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <HeroSection activeSection={activeSection} setActiveSection={setActiveSection} />
            <FeaturesSection setActiveSection={setActiveSection} />
            <div id="tools" className="bg-transparent">
                <main className="flex-grow p-4 md:p-8 relative overflow-hidden">
                    <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col items-center">
                        <header className="text-center mb-6 pt-16">
                            <BlurFade delay={0.25} inView>
                                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-[#e6e1d7]">
                                    {config.title}
                                </h2>
                            </BlurFade>
                            <BlurFade delay={0.35} inView>
                                <p className="font-sans text-lg text-[#a89080] max-w-2xl mx-auto mt-2">
                                  {config.subtitle}
                                </p>
                            </BlurFade>
                        </header>
                        
                        <KalamInput
                            onSubmit={handleGenerate}
                            onFileSelect={undefined}
                            placeholder={config.placeholder}
                            showWordLimit={config.showWordLimit}
                            wordLimit={wordLimit}
                            onWordLimitChange={setWordLimit}
                            isLoading={isLoading}
                            minHeight={config.inputMinHeight}
                            maxHeight={config.inputMaxHeight}
                        />

                        { (output || isLoading) && <OutputDisplay output={output} isLoading={isLoading} exportOptions={config.exportOptions} outputId={outputId} />}
                    </div>
                </main>
                <AboutSection />
                <Footer setActiveSection={setActiveSection} />
            </div>
        </div>
    );
};

export default App;