'use client';

import React, { useState, useEffect } from 'react';
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
  Zap
} from 'lucide-react';

interface AITutorViewProps {
  sampleNotes: SampleNote[];
  activeNoteId: string;
  onSelectNote: (noteId: string) => void;
  onClaimCoins: (amount: number, reason: string) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const AITutorView: React.FC<AITutorViewProps> = ({
  sampleNotes,
  activeNoteId,
  onSelectNote,
  onClaimCoins,
  showToast
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [doubtInput, setDoubtInput] = useState('');

  const currentNote = sampleNotes.find(n => n.id === activeNoteId) || sampleNotes[0];

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeNoteId]);

  const handleSimulateOCR = () => {
    setIsScanning(true);
    showToast('Scanning notebook page via AI Vision OCR...');
    setTimeout(() => {
      setIsScanning(false);
      showToast('OCR Complete! Generated step solutions.');
    }, 1500);
  };

  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Speech synthesis not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak = lang === 'mr'
      ? `${currentNote.title}. ${currentNote.analysis.marathiSummary}`
      : `${currentNote.title}. ${currentNote.analysis.englishSummary}. ${currentNote.analysis.eli5}`;

    const cleanText = textToSpeak.replace(/[\$\_\{\}\\\#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'mr' ? 'mr-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      showToast('Playing AI Voice Explanation 🔊');
    };

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleMicToggle = () => {
    if (!isListeningMic) {
      setIsListeningMic(true);
      showToast('Listening... Speak your doubt in English or Marathi 🎙️');
      setTimeout(() => {
        setDoubtInput("Explain Pythagoras Theorem step-by-step with proof.");
        setIsListeningMic(false);
        showToast('Voice converted! Press Send to solve.');
      }, 2000);
    } else {
      setIsListeningMic(false);
    }
  };

  const handleSendDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtInput.trim()) return;
    handleSimulateOCR();
    setDoubtInput('');
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* Rich Pink & Blue Gradient Banner with Decent Ambient Glow */}
      <div className="space-y-2">
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
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/30 border border-pink-400/40 text-pink-300 text-[10px] font-extrabold uppercase">
                  ● Online
                </span>
              </div>
              <p className="text-xs text-neutral-200/90 mt-0.5">
                Snap handwritten formulas or ask any concept for step-by-step proofs with speech audio.
              </p>
            </div>
          </div>

          <button
            onClick={() => onClaimCoins(10, 'Arya Doubt Study Reward')}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-gold-500 to-amber-500 text-amber-950 font-extrabold text-xs shadow-glow-gold flex items-center gap-1.5 hover:scale-105 transition-transform self-start sm:self-center flex-shrink-0"
          >
            <Coins className="w-4 h-4 text-amber-950" /> Claim AI Study Bonus (+10 ₵)
          </button>
        </div>

        {/* 'AI Tutor Ask and Talk' Tagline Line Below Banner */}
        <div className="flex items-center justify-center gap-2 py-0.5 text-xs font-black tracking-widest text-pink-600 dark:text-pink-400 uppercase">
          <MessageSquareQuote className="w-4 h-4 text-pink-500" />
          <span>AI Tutor Ask and Talk</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: OCR Dropzone, Sample Doubts & Voice Input */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* OCR Dropzone */}
          <div
            onClick={handleSimulateOCR}
            className={`border-2 border-dashed border-pink-400/50 dark:border-neutral-700 rounded-3xl p-6 text-center bg-white dark:bg-surface-dark cursor-pointer transition-all hover:border-pink-500 shadow-sm ${
              isScanning ? 'radar-scan-active ring-2 ring-pink-500 bg-pink-500/5' : ''
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <Camera className="w-7 h-7" />
            </div>
            <h4 className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-cream-100 mb-1">
              {isScanning ? 'Scanning Notebook via AI OCR...' : 'Snap or Upload Notebook Page'}
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 leading-relaxed">
              Drag & drop handwritten formulas, diagrams, or textbook PDF screenshots.
            </p>
            <button className="px-4 py-1.5 rounded-full bg-cream-100 dark:bg-surface-darkCard text-xs font-bold text-neutral-800 dark:text-cream-200 inline-flex items-center gap-1.5 shadow-2xs hover:bg-pink-50 transition-colors">
              <Upload className="w-3.5 h-3.5" /> Select Image / PDF
            </button>
          </div>

          {/* Sample Notes Database Shelf */}
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

          {/* Ask Doubt Input Bar */}
          <form onSubmit={handleSendDoubt} className="relative">
            <input
              type="text"
              value={doubtInput}
              onChange={(e) => setDoubtInput(e.target.value)}
              placeholder="Ask any math or science doubt..."
              className="w-full pl-4 pr-24 py-3 rounded-full bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard text-xs text-neutral-900 dark:text-cream-50 outline-none focus:border-pink-500 shadow-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleMicToggle}
                className={`p-2 rounded-full transition-colors ${
                  isListeningMic ? 'bg-red-500 text-white animate-pulse' : 'text-neutral-400 hover:text-pink-500'
                }`}
                title="Voice Input"
              >
                {isListeningMic ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              </button>
              <button
                type="submit"
                className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm hover:scale-105 transition-transform"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

        </div>

        {/* Right Column: AI Solution Feed & Real Voice Synthesis */}
        <div className="lg:col-span-8 bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          
          {/* Solution Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-100 dark:border-neutral-800">
            <div>
              <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-extrabold">
                {currentNote.subject}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-cream-50 mt-1.5">
                {currentNote.title}
              </h3>
              <p className="text-xs text-neutral-400">{currentNote.chapter}</p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* TTS Button */}
              <button
                onClick={handleToggleAudio}
                className={`px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-2 transition-all shadow-sm ${
                  isPlayingAudio
                    ? 'bg-coral-500 text-white animate-pulse shadow-glow-coral'
                    : 'bg-gradient-to-r from-pink-500 via-rose-500 to-coral-500 text-white hover:opacity-95'
                }`}
              >
                {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isPlayingAudio ? 'Stop Audio' : 'Listen Real Audio'}</span>
              </button>

              {/* Language Switcher */}
              <button
                onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
                className="px-3.5 py-2 rounded-full bg-cream-100 dark:bg-surface-darkCard border border-cream-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-cream-100 hover:border-pink-500 flex items-center gap-1.5"
              >
                <Languages className="w-3.5 h-3.5 text-pink-500" />
                <span>{lang === 'en' ? 'English (Bilingual)' : 'मराठी (प्रादेशिक)'}</span>
              </button>
            </div>
          </div>

          {/* AI Concept Summary */}
          <div className="p-4 rounded-2xl bg-cream-50/90 dark:bg-surface-darkCard border border-cream-200/60 dark:border-neutral-800 space-y-1.5">
            <div className="text-xs font-black text-pink-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> AI Core Concept Summary
            </div>
            <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
              {lang === 'mr' ? currentNote.analysis.marathiSummary : currentNote.analysis.englishSummary}
            </p>
          </div>

          {/* Step-by-Step Breakdown */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-black text-neutral-900 dark:text-cream-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              Step-by-Step Mathematical Proof
            </h4>

            <div className="space-y-3">
              {currentNote.analysis.steps.map((s) => (
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
            <p className="leading-relaxed font-medium">{currentNote.analysis.eli5}</p>
          </div>

          {/* Marking Scheme Callout */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-200 text-xs space-y-1">
            <div className="font-extrabold flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
              <Award className="w-4 h-4 text-amber-500" /> Board Exam Marking Criteria
            </div>
            <p className="leading-relaxed font-medium">{currentNote.analysis.markingScheme}</p>
          </div>

        </div>

      </div>

    </div>
  );
};