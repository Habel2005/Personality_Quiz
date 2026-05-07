
"use client";

import React, { useState, useEffect } from 'react';
import { 
  prompts, 
  Choice, 
  getProfile, 
  ProfileResult, 
  TraitVector, 
  Prompt, 
  getNextQuestion, 
  generateCommentary 
} from '@/app/lib/personality-data';
import { QuizStep } from '@/components/quiz/QuizStep';
import { ProfileDisplay } from '@/components/profile/ProfileDisplay';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, ClipboardList, BrainCircuit, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const INITIAL_VECTOR: TraitVector = {
  chaos: 0,
  logic: 0,
  emotion: 0,
  imagination: 0,
  order: 0,
};

const INTRO_SLIDES = [
  {
    title: "The 10-Click Vibe Check",
    subtitle: "Highly accurate. Mildly calling you out.",
    desc: "A personality mapping engine designed to reveal who you are when you aren't trying to impress anyone.",
    icon: <Sparkles className="text-orange-400" />,
    color: "bg-white"
  },
  {
    title: "Adaptive Entropic Probing",
    subtitle: "This isn't a static quiz.",
    desc: "Every click changes the next question. The engine aggressively narrows down your neural trajectory in real-time.",
    icon: <Zap className="text-teal-400" />,
    color: "bg-[#E2F2F0]"
  },
  {
    title: "Privacy First Engine",
    subtitle: "Zero Cloud. Zero AI. Pure Logic.",
    desc: "Calculated locally in your browser. No data leaves this device. We just map the frequencies and present the truth.",
    icon: <ShieldCheck className="text-primary" />,
    color: "bg-[#FEF4E8]"
  }
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(-1); 
  const [introIndex, setIntroIndex] = useState(0);
  const [vector, setVector] = useState<TraitVector>(INITIAL_VECTOR);
  const [profile, setProfile] = useState<ProfileResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [engineComment, setEngineComment] = useState<string | null>(null);
  const [askedIds, setAskedIds] = useState<number[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('vibe_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Auto-cycle intro slides every 4 seconds when on landing page
  useEffect(() => {
    if (currentStep === -1) {
      const timer = setInterval(() => {
        setIntroIndex((prev) => (prev + 1) % INTRO_SLIDES.length);
      }, 4500);
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  const handleStart = () => {
    const firstQuestion = getNextQuestion(INITIAL_VECTOR, [], prompts);
    setCurrentPrompt(firstQuestion);
    setAskedIds([firstQuestion.id]);
    setCurrentStep(0);
  };

  const handleSelect = (choice: Choice) => {
    const nextVector = { ...vector };
    for (const [key, value] of Object.entries(choice.vector)) {
      const k = key as keyof TraitVector;
      nextVector[k] = (nextVector[k] || 0) + (value || 0);
    }
    setVector(nextVector);

    const dynamicComment = generateCommentary(nextVector, currentStep + 1);
    if (dynamicComment) {
      setEngineComment(dynamicComment);
      setTimeout(() => setEngineComment(null), 2500);
    }

    if (currentStep < 9) { 
      const nextQ = getNextQuestion(nextVector, askedIds, prompts);
      setCurrentPrompt(nextQ);
      setAskedIds(prev => [...prev, nextQ.id]);
      setCurrentStep(currentStep + 1);
    } else {
      setIsCalculating(true);
      const finalProfile = getProfile(nextVector);
      
      const newHistory = [
        { ...finalProfile, date: new Date().toISOString() },
        ...history
      ].slice(0, 5);
      localStorage.setItem('vibe_history', JSON.stringify(newHistory));
      setHistory(newHistory);

      setTimeout(() => {
        setProfile(finalProfile);
        setIsCalculating(false);
        setCurrentStep(10);
      }, 2500);
    }
  };

  const handleRestart = () => {
    setCurrentStep(-1);
    setIntroIndex(0);
    setVector(INITIAL_VECTOR);
    setProfile(null);
    setEngineComment(null);
    setAskedIds([]);
    setCurrentPrompt(null);
  };

  const progress = (currentStep / 10) * 100;

  return (
    <main className="min-h-screen flex flex-col bg-[#F5F7F9]">
      {currentStep >= 0 && currentStep < 10 && (
        <div className="w-full max-w-2xl mx-auto p-6 flex items-center justify-between animate-fade-in-up">
          <Button variant="ghost" size="icon" onClick={handleRestart} className="rounded-full border-2 border-black bg-[#E2F2F0]">
            <ArrowRight className="rotate-180" size={20} />
          </Button>
          <div className="flex-1 px-8 relative">
            <Progress value={progress} className="h-3 bg-white border-2 border-black" />
            {engineComment && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                  {engineComment}
                </div>
              </div>
            )}
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center">
            <BrainCircuit size={18} className="animate-pulse text-primary" />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center py-12 px-6">
        {currentStep === -1 && (
          <div className="max-w-md w-full space-y-8">
            <div className="brutal-card p-10 space-y-8 text-center relative overflow-hidden transition-colors duration-500">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>

              {/* Dynamic Intro Slides */}
              <div className="min-h-[220px] flex flex-col justify-center space-y-6">
                {INTRO_SLIDES.map((slide, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "transition-all duration-700 absolute inset-x-0 p-10 flex flex-col items-center space-y-6",
                      introIndex === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                    )}
                  >
                    <div className="w-14 h-14 rounded-2xl border-2 border-black bg-white flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      {slide.icon}
                    </div>
                    <div className="space-y-2">
                      <h1 className="text-3xl font-headline font-bold text-black leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-primary text-xs font-bold uppercase tracking-widest">{slide.subtitle}</p>
                    </div>
                    <div className={cn("border-2 border-black rounded-3xl p-6 text-left transition-colors duration-500", slide.color)}>
                      <p className="text-sm leading-relaxed text-black/70 font-medium">
                        {slide.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 pt-4">
                {INTRO_SLIDES.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setIntroIndex(i)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full border border-black transition-all",
                      introIndex === i ? "bg-black w-6" : "bg-white"
                    )}
                  />
                ))}
              </div>

              <Button 
                size="lg" 
                onClick={handleStart}
                className="w-full brutal-button bg-primary hover:bg-primary/90 text-white rounded-[2rem] h-14 text-lg font-headline font-bold mt-4"
              >
                Sync Neural Map
              </Button>
            </div>

            {history.length > 0 && (
              <div className="brutal-card p-6 bg-white space-y-4 animate-fade-in-up">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40 flex items-center gap-2">
                  <BrainCircuit size={14} /> Neural History
                </h4>
                <div className="space-y-2">
                  {history.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-xs border-b border-black/5 pb-2">
                      <span className="font-bold text-black/70">{h.archetype}</span>
                      <span className="text-[10px] text-black/30">{new Date(h.date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep >= 0 && currentStep < 10 && !isCalculating && currentPrompt && (
          <QuizStep 
            prompt={currentPrompt} 
            onSelect={handleSelect} 
            stepNumber={currentStep + 1}
          />
        )}

        {isCalculating && (
          <div className="flex flex-col items-center space-y-8 text-center animate-pulse">
            <div className="relative">
               <div className="w-24 h-24 rounded-full border-4 border-dashed border-black animate-spin" />
               <BrainCircuit className="absolute inset-0 m-auto text-primary" size={32} />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-headline font-bold">Mapping Neural Vectors...</h3>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Analyzing contradiction clusters</p>
                <div className="flex gap-1 justify-center">
                   <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-75" />
                   <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-150" />
                   <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-225" />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 10 && profile && !isCalculating && (
          <ProfileDisplay profile={profile} onRestart={handleRestart} history={history} />
        )}
      </div>

      <footer className="p-8 text-center text-xs font-bold uppercase tracking-widest text-black/40">
        © 2026 Personality Lab • Vibe Engine V5.0 @HabelShaji
      </footer>
    </main>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
