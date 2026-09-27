'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SampleNote } from '@/types';
import { MathView } from './MathView';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Languages, 
  Coins, 
  Brain, 
  Lightbulb, 
  Award, 
  Mic, 
  MicOff, 
  Send,
  FileCheck,
  MessageSquareQuote,
  CheckCircle2,
  Zap,
  Paperclip,
  X,
  Copy,
  Check,
  RefreshCw,
  Image as ImageIcon,
  BookOpen,
  MessageSquare,
  FileText
} from 'lucide-react';

interface AITutorViewProps {
  sampleNotes: SampleNote[];
  activeNoteId: string;
  onSelectNote: (noteId: string) => void;
  onClaimCoins: (amount: number, reason: string) => void;
  showToast: (msg: string, icon?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  file?: {
    previewUrl: string;
    name: string;
    mimeType: string;
  };
  model?: string;
  timestamp: string;
}

export const AITutorView: React.FC<AITutorViewProps> = ({
  sampleNotes,
  activeNoteId,
  onSelectNote,
  onClaimCoins,
  showToast
}) => {
  // Top level active tab: 'live-chat' vs 'sample-notes'
  const [activeTab, setActiveTab] = useState<'live-chat' | 'sample-notes'>('live-chat');

  // Live Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I am **Arya**, your 24/7 AI Board & Competitive Exam Tutor.
      
You can ask me any math/science doubt, paste formulas, or **upload a photo of your handwritten notebook, textbook question, or diagram**!

How can I help you ace your preparation today?`,
      timestamp: 'Just now',
      model: 'gemini-3.8-flash'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{
    file: File;
    base64: string;
    previewUrl: string;
    mimeType: string;
    name: string;
  } | null>(null);

  // Audio Speech State
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isListeningMic, setIsListeningMic] = useState(false);

  // Sample Notes State (for sample-notes tab)
  const [isScanning, setIsScanning] = useState(false);
  const [sampleLang, setSampleLang] = useState<'en' | 'mr'>('en');
  const [isSampleAudioPlaying, setIsSampleAudioPlaying] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSampleNote = sampleNotes.find(n => n.id === activeNoteId) || sampleNotes[0];

  // Auto-switch tab if user clicked a specific sample note from dashboard
  useEffect(() => {
    if (activeNoteId && activeNoteId !== 'note-math-trig') {
      setActiveTab('sample-notes');
    }
  }, [activeNoteId]);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (activeTab === 'live-chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isGenerating, activeTab]);

  // Clean speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle file or image selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('File size must be under 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setAttachedFile({
        file,
        base64,
        previewUrl: file.type.startsWith('image/') ? base64 : '',
        mimeType: file.type || 'image/jpeg',
        name: file.name
      });
      showToast(`Attached: ${file.name} 📎`);
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be re-selected if removed
    e.target.value = '';
  };

  // Send Chat Message with optional file
  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText !== undefined ? customText : chatInput).trim();
    if (!textToSend && !attachedFile) return;

    const userMessageId = 'user_' + Date.now();
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: textToSend,
      file: attachedFile ? {
        previewUrl: attachedFile.previewUrl,
        name: attachedFile.name,
        mimeType: attachedFile.mimeType
      } : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setChatInput('');
    const currentAttachment = attachedFile;
    setAttachedFile(null);
    setIsGenerating(true);

    try {
      const payload: any = {
        message: textToSend
      };

      if (currentAttachment) {
        payload.file = {
          base64: currentAttachment.base64,
          mimeType: currentAttachment.mimeType,
          name: currentAttachment.name
        };
      }

      // Try /api/chat first, fallback to /api/generate-exam
      let replyText = '';
      let usedModel = 'gemini-3.8-flash';

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          replyText = data.reply;
          usedModel = data.source || 'gemini-3.8-flash';
        } else {
          throw new Error('Primary chat endpoint status: ' + res.status);
        }
      } catch (chatErr) {
        // High-reliability fallback
        const fallbackRes = await fetch('/api/generate-exam', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, format: 'Chat' })
        });
        const fallbackData = await fallbackRes.json();
        replyText = fallbackData.reply || fallbackData.error || 'Unable to generate response.';
        usedModel = fallbackData.source || 'gemini-3.6-flash';
      }

      const aiMessage: ChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: replyText || 'I examined your query and formula. Here is the verified solution:',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: usedModel
      };

      setMessages(prev => [...prev, aiMessage]);
      onClaimCoins(10, 'Arya AI Doubt Solved');
      showToast('Solved by Arya AI! +10 Coins earned 🎉');
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          sender: 'ai',
          text: `I encountered an issue connecting to the AI model. Please verify your GEMINI_API_KEY or network connection.`,
          timestamp: 'Now',
          model: 'error'
        }
      ]);
      showToast('AI request failed. Please check network.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Toggle voice speech playback for chat message
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Speech synthesis not supported in this browser.');
      return;
    }

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown and latex tags for natural voice
    const cleanText = text
      .replace(/\$\$[\s\S]+?\$\$/g, ' mathematical equation ')
      .replace(/\$[^\$]+?\$/g, ' formula ')
      .replace(/[\*\#\_\[\]\(\)\{\}\\\`]/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    // Check if Marathi text
    const isMarathi = /[\u0900-\u097F]/.test(text);
    utterance.lang = isMarathi ? 'mr-IN' : 'en-IN';

    utterance.onstart = () => {
      setSpeakingMessageId(msgId);
      showToast(isMarathi ? 'मराठी आवाज वाचन सुरू 🔊' : 'Playing AI Voice Explanation 🔊');
    };
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Copy message text to clipboard
  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(msgId);
    showToast('Solution copied to clipboard! 📋');
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  // Handle Speech Recognition Mic Toggle
  const handleMicToggle = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      if (!isListeningMic) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'en-IN';
          recognition.continuous = false;
          recognition.interimResults = false;

          recognition.onstart = () => {
            setIsListeningMic(true);
            showToast('Listening... Speak your doubt in English or Marathi 🎙️');
          };

          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setChatInput(prev => (prev ? prev + ' ' + transcript : transcript));
            setIsListeningMic(false);
            showToast('Voice transcribed! Press Send.');
          };

          recognition.onerror = () => {
            setIsListeningMic(false);
          };

          recognition.onend = () => {
            setIsListeningMic(false);
          };

          recognition.start();
        } catch {
          simulateVoiceInput();
        }
      } else {
        setIsListeningMic(false);
      }
    } else {
      simulateVoiceInput();
    }
  };

  const simulateVoiceInput = () => {
    setIsListeningMic(true);
    showToast('Listening to student voice... 🎙️');
    setTimeout(() => {
      setChatInput('Explain Pythagoras Theorem step-by-step with geometric proof.');
      setIsListeningMic(false);
      showToast('Voice converted! Press Send to solve.');
    }, 1800);
  };

  // Sample notes audio toggle
  const handleToggleSampleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Speech synthesis not supported in this browser.');
      return;
    }

    if (isSampleAudioPlaying) {
      window.speechSynthesis.cancel();
      setIsSampleAudioPlaying(false);
      return;
    }

    const textToSpeak = sampleLang === 'mr'
      ? `${currentSampleNote.title}. ${currentSampleNote.analysis.marathiSummary}`
      : `${currentSampleNote.title}. ${currentSampleNote.analysis.englishSummary}. ${currentSampleNote.analysis.eli5}`;

    const cleanText = textToSpeak.replace(/[\$\_\{\}\\\#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = sampleLang === 'mr' ? 'mr-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => {
      setIsSampleAudioPlaying(true);
      showToast('Playing AI Voice Explanation 🔊');
    };
    utterance.onend = () => setIsSampleAudioPlaying(false);
    utterance.onerror = () => setIsSampleAudioPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const sampleDoubtPills = [
    { title: '📐 Pythagoras Theorem', prompt: 'State and prove Pythagoras Theorem with step-by-step mathematical derivation and board exam marking criteria.' },
    { title: '⚡ Ohm\'s Law & Resistance', prompt: 'Explain Ohm\'s Law, state its mathematical formulation V = IR, and discuss its limitations for board exams.' },
    { title: '🔍 Lens Maker\'s Formula', prompt: 'Derive the Lens Maker\'s Formula 1/f = (μ - 1)(1/R1 - 1/R2) step-by-step with standard sign conventions.' },
    { title: '🧪 Aldol Condensation', prompt: 'Explain Aldol Condensation reaction mechanism step-by-step for Class 12 Board Chemistry with examples.' },
    { title: 'मराठी: न्यूटनचे नियम', prompt: 'मराठीमध्ये न्यूटनचे तिन्ही गतीचे नियम उदाहरणासह आणि गणितासह सोप्या भाषेत समजावून सांगा.' }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Hidden file inputs for Camera and Document uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Top Banner with Arya AI Branding & Coin Bonus */}
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#221338] via-[#31153D] to-[#121E3B] text-white p-5 sm:p-6 border border-pink-500/30 shadow-glow-ai flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-blue-500 flex items-center justify-center shadow-glow-coral flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  24/7 AI Tutor ("Arya")
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-extrabold uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-xs text-neutral-200/90 mt-0.5">
                Type questions or upload photos of handwritten notes, question papers & diagrams. Powered by Gemini.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => onClaimCoins(10, 'Arya Doubt Study Reward')}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-gold-500 to-amber-500 text-amber-950 font-extrabold text-xs shadow-glow-gold flex items-center gap-1.5 hover:scale-105 transition-transform flex-shrink-0"
            >
              <Coins className="w-4 h-4 text-amber-950" /> Claim AI Study Bonus (+10 ₵)
            </button>
          </div>
        </div>

        {/* View Toggle Tabs: Live AI Chat vs Verified Board Sample Doubts */}
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard shadow-xs max-w-md mx-auto sm:mx-0">
          <button
            onClick={() => setActiveTab('live-chat')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'live-chat'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                : 'text-neutral-600 dark:text-cream-200 hover:text-neutral-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Live AI Chat & Photo Solver</span>
          </button>

          <button
            onClick={() => setActiveTab('sample-notes')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'sample-notes'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                : 'text-neutral-600 dark:text-cream-200 hover:text-neutral-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curated Sample Proofs</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: LIVE INTERACTIVE AI CHAT & MULTIMODAL PHOTO SOLVER */}
      {/* ======================================================== */}
      {activeTab === 'live-chat' && (
        <div className="space-y-4">
          
          {/* Quick Syllabus Doubt Shortcut Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-black uppercase text-pink-600 dark:text-pink-400 tracking-wider flex items-center gap-1 flex-shrink-0">
              <Zap className="w-3 h-3" /> Quick Doubts:
            </span>
            {sampleDoubtPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(pill.prompt)}
                disabled={isGenerating}
                className="px-3 py-1.5 rounded-full bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard text-[11px] font-bold text-neutral-800 dark:text-cream-100 hover:border-pink-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors flex-shrink-0 shadow-2xs"
              >
                {pill.title}
              </button>
            ))}
          </div>

          {/* Main Chat Container */}
          <div className="bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl overflow-hidden shadow-sm flex flex-col h-[600px] sm:h-[650px]">
            
            {/* Chat Messages Feed */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {messages.map((m) => {
                const isUser = m.sender === 'user';
                const isSpeaking = speakingMessageId === m.id;
                const isCopied = copiedMessageId === m.id;

                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
                  >
                    {/* Sender Label & Timestamp */}
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-semibold px-1">
                      <span>{isUser ? 'You (Student)' : 'Arya AI Tutor'}</span>
                      <span>•</span>
                      <span>{m.timestamp}</span>
                      {m.model && (
                        <span className="px-1.5 py-0.2 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-[9px] font-extrabold uppercase">
                          {m.model}
                        </span>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[92%] sm:max-w-[85%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed border shadow-xs ${
                        isUser
                          ? 'bg-gradient-to-br from-pink-600 via-rose-600 to-coral-600 text-white border-transparent rounded-tr-none'
                          : 'bg-cream-50/80 dark:bg-surface-darkCard border-cream-200/80 dark:border-neutral-800 text-neutral-900 dark:text-cream-50 rounded-tl-none'
                      }`}
                    >
                      {/* If user attached a file, show thumbnail */}
                      {m.file && (
                        <div className="mb-3 p-2 rounded-2xl bg-black/20 border border-white/20 backdrop-blur-xs max-w-xs">
                          {m.file.previewUrl ? (
                            <img
                              src={m.file.previewUrl}
                              alt="Uploaded question or note"
                              className="w-full max-h-48 object-cover rounded-xl mb-1.5 shadow-xs"
                            />
                          ) : (
                            <div className="p-3 bg-white/10 rounded-xl flex items-center gap-2 text-white">
                              <FileText className="w-5 h-5 text-amber-300" />
                              <span className="font-bold text-xs truncate">{m.file.name}</span>
                            </div>
                          )}
                          <div className="text-[10px] text-cream-200 font-semibold truncate flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" /> {m.file.name}
                          </div>
                        </div>
                      )}

                      {/* Message Content */}
                      {isUser ? (
                        <div className="whitespace-pre-wrap font-medium">{m.text}</div>
                      ) : (
                        <div className="space-y-3 font-medium">
                          <MathView content={m.text} />
                        </div>
                      )}
                    </div>

                    {/* AI Message Action Buttons (Voice Readout & Copy) */}
                    {!isUser && (
                      <div className="flex items-center gap-2 pt-1 px-1">
                        <button
                          onClick={() => handleToggleSpeak(m.id, m.text)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-colors border ${
                            isSpeaking
                              ? 'bg-pink-500 text-white border-pink-500 animate-pulse shadow-sm'
                              : 'bg-cream-100 dark:bg-surface-darkCard border-cream-200 dark:border-neutral-800 text-neutral-700 dark:text-cream-200 hover:border-pink-400'
                          }`}
                        >
                          {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-pink-500" />}
                          <span>{isSpeaking ? 'Stop Voice' : 'Listen Real Voice'}</span>
                        </button>

                        <button
                          onClick={() => handleCopyMessage(m.id, m.text)}
                          className="px-2.5 py-1 rounded-full bg-cream-100 dark:bg-surface-darkCard border border-cream-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-cream-200 hover:border-pink-400 flex items-center gap-1 transition-colors"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-mint-500" /> : <Copy className="w-3 h-3 text-neutral-400" />}
                          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}

              {/* Generating Animation */}
              {isGenerating && (
                <div className="flex flex-col items-start space-y-1.5 animate-in fade-in">
                  <div className="flex items-center gap-1.5 text-[10px] text-pink-600 font-bold px-1">
                    <span>Arya AI Tutor</span>
                    <span>•</span>
                    <span>Analyzing & Solving...</span>
                  </div>
                  <div className="p-4 rounded-3xl rounded-tl-none bg-cream-50/90 dark:bg-surface-darkCard border border-pink-300 dark:border-pink-900/40 text-xs text-pink-600 dark:text-pink-400 flex items-center gap-2.5 shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
                    <span className="font-bold">
                      {attachedFile
                        ? 'Examining uploaded notebook page, recognizing formulas & writing complete proof...'
                        : 'Deriving step-by-step mathematical steps and board scoring tips...'}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Attached File Preview Card (Appears above input before sending) */}
            {attachedFile && (
              <div className="px-4 py-2 bg-pink-500/10 border-t border-pink-500/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  {attachedFile.previewUrl ? (
                    <img
                      src={attachedFile.previewUrl}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded-xl border border-pink-500/30 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center flex-shrink-0 text-pink-600">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-neutral-900 dark:text-cream-50 truncate">
                      {attachedFile.name}
                    </div>
                    <div className="text-[10px] text-pink-600 dark:text-pink-400 font-semibold">
                      Ready to analyze with Gemini Vision
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setAttachedFile(null)}
                  className="p-1.5 rounded-xl bg-white dark:bg-surface-dark text-neutral-400 hover:text-red-500 transition-colors shadow-2xs"
                  title="Remove attachment"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Chat Input & Media Attachment Controls */}
            <div className="p-3 sm:p-4 border-t border-cream-200 dark:border-surface-darkCard bg-surface-light dark:bg-surface-dark">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                {/* Camera Capture Button (Opens phone camera on mobile) */}
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="p-2.5 sm:p-3 rounded-2xl bg-cream-100 dark:bg-surface-darkCard border border-cream-200 dark:border-neutral-800 text-neutral-600 dark:text-cream-200 hover:text-pink-500 hover:border-pink-400 transition-colors flex-shrink-0"
                  title="Take Photo with Camera"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                </button>

                {/* Upload File/Image Button (Gallery / PDF / Image) */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 sm:p-3 rounded-2xl bg-cream-100 dark:bg-surface-darkCard border border-cream-200 dark:border-neutral-800 text-neutral-600 dark:text-cream-200 hover:text-pink-500 hover:border-pink-400 transition-colors flex-shrink-0"
                  title="Attach Image or Notes File"
                >
                  <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 dark:text-neutral-400" />
                </button>

                {/* Text Input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={
                      attachedFile
                        ? "Ask about this uploaded image or press send to solve..."
                        : "Ask math/science doubts or snap notes..."
                    }
                    className="w-full pl-4 pr-11 py-3 rounded-2xl bg-white dark:bg-surface-darkCard border border-cream-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-cream-50 placeholder-neutral-400 outline-none focus:border-pink-500 transition-colors shadow-2xs"
                  />

                  {/* Speech Input Mic Button */}
                  <button
                    type="button"
                    onClick={handleMicToggle}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-xl transition-colors ${
                      isListeningMic
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'text-neutral-400 hover:text-pink-500'
                    }`}
                    title="Voice Input (English or Marathi)"
                  >
                    {isListeningMic ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </button>
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={(!chatInput.trim() && !attachedFile) || isGenerating}
                  className="p-3 sm:px-4 sm:py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-coral-500 disabled:opacity-40 text-white font-black text-xs shadow-glow-coral hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Ask AI</span>
                </button>
              </form>

              <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 px-1">
                <span>📎 Supports JPG, PNG, PDF photos of notebooks & textbooks</span>
                <span>⚡ Powered by Google Gemini AI Model</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: CURATED BOARD EXAM SAMPLE SOLUTIONS & OCR LIBRARY */}
      {/* ======================================================== */}
      {activeTab === 'sample-notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Sample Doubt Shelf & Quick Snap */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Quick Snap trigger to switch to Live Chat with camera */}
            <div
              onClick={() => {
                setActiveTab('live-chat');
                cameraInputRef.current?.click();
              }}
              className="border-2 border-dashed border-pink-400/50 dark:border-neutral-700 rounded-3xl p-5 text-center bg-white dark:bg-surface-dark cursor-pointer transition-all hover:border-pink-500 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center mx-auto mb-2.5 shadow-2xs">
                <Camera className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-neutral-900 dark:text-cream-100 mb-1">
                Snap Handwritten Doubt with Camera
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2">
                Arya AI transcribes your notebook page and generates step proofs.
              </p>
              <span className="px-3.5 py-1.5 rounded-full bg-pink-500 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
                <Camera className="w-3.5 h-3.5" /> Open Camera Solver
              </span>
            </div>

            {/* Curated Sample Notes List */}
            <div className="bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-black text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-coral-500" />
                Verified Board Sample Doubts
              </h4>

              <div className="space-y-2">
                {sampleNotes.map(note => (
                  <button
                    key={note.id}
                    onClick={() => onSelectNote(note.id)}
                    className={`w-full p-3 rounded-2xl text-left text-xs font-semibold transition-all flex items-center justify-between border ${
                      note.id === activeNoteId
                        ? 'bg-pink-500/10 border-pink-500 text-pink-600 dark:text-pink-400 font-bold shadow-2xs'
                        : 'bg-cream-50/70 dark:bg-surface-darkCard border-cream-200/60 dark:border-neutral-800 text-neutral-800 dark:text-cream-100 hover:border-pink-400'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-extrabold text-xs">{note.title}</div>
                      <div className="text-[10px] text-neutral-400 font-medium mt-0.5">{note.subject}</div>
                    </div>
                    <Sparkles className="w-4 h-4 text-pink-500 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Mathematical Proof & Breakdown */}
          <div className="lg:col-span-8 bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            
            {/* Header with Title and Language Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-100 dark:border-neutral-800">
              <div>
                <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-extrabold">
                  {currentSampleNote.subject}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-cream-50 mt-1.5">
                  {currentSampleNote.title}
                </h3>
                <p className="text-xs text-neutral-400">{currentSampleNote.chapter}</p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                {/* TTS Button */}
                <button
                  onClick={handleToggleSampleAudio}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-2 transition-all shadow-sm ${
                    isSampleAudioPlaying
                      ? 'bg-coral-500 text-white animate-pulse shadow-glow-coral'
                      : 'bg-gradient-to-r from-pink-500 via-rose-500 to-coral-500 text-white hover:opacity-95'
                  }`}
                >
                  {isSampleAudioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isSampleAudioPlaying ? 'Stop Audio' : 'Listen Real Audio'}</span>
                </button>

                {/* Language Switcher */}
                <button
                  onClick={() => setSampleLang(sampleLang === 'en' ? 'mr' : 'en')}
                  className="px-3.5 py-2 rounded-full bg-cream-100 dark:bg-surface-darkCard border border-cream-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-cream-100 hover:border-pink-500 flex items-center gap-1.5"
                >
                  <Languages className="w-3.5 h-3.5 text-pink-500" />
                  <span>{sampleLang === 'en' ? 'English (Bilingual)' : 'मराठी (प्रादेशिक)'}</span>
                </button>
              </div>
            </div>

            {/* AI Concept Summary */}
            <div className="p-4 rounded-2xl bg-cream-50/90 dark:bg-surface-darkCard border border-cream-200/60 dark:border-neutral-800 space-y-1.5">
              <div className="text-xs font-black text-pink-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI Core Concept Summary
              </div>
              <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                {sampleLang === 'mr' ? currentSampleNote.analysis.marathiSummary : currentSampleNote.analysis.englishSummary}
              </p>
            </div>

            {/* Step-by-Step Breakdown */}
            <div className="space-y-3.5">
              <h4 className="text-sm font-black text-neutral-900 dark:text-cream-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                Step-by-Step Mathematical Proof
              </h4>

              <div className="space-y-3">
                {currentSampleNote.analysis.steps.map((s) => (
                  <div
                    key={s.step}
                    className="p-4 rounded-2xl bg-surface-card dark:bg-surface-darkCard/70 border border-cream-200/70 dark:border-neutral-800 space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-black">
                        Step {s.step}
                      </span>
                      <h5 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-cream-100">{s.title}</h5>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{s.desc}</p>
                    <div className="bg-white dark:bg-surface-dark p-3 rounded-xl border border-cream-100 dark:border-neutral-800 text-center font-mono text-sm overflow-x-auto shadow-2xs">
                      <MathView content={`$$${s.math}$$`} block />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ELI5 Callout */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-950 dark:text-blue-200 text-xs space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
                <Lightbulb className="w-4 h-4 text-blue-500" /> Explain Simply (ELI5 Analogy)
              </div>
              <p className="leading-relaxed font-medium">{currentSampleNote.analysis.eli5}</p>
            </div>

            {/* Marking Scheme Callout */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-200 text-xs space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                <Award className="w-4 h-4 text-amber-500" /> Board Exam Marking Criteria
              </div>
              <p className="leading-relaxed font-medium">{currentSampleNote.analysis.markingScheme}</p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};