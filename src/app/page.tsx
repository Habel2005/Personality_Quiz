
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
import { ArrowRight, Clock, ClipboardList, BrainCircuit } from 'lucide-react';

const INITIAL_VECTOR: TraitVector = {
  chaos: 0,
  logic: 0,
  emotion: 0,
  imagination: 0,
  order: 0,
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(-1); 
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
      
      // Save to history (Local Database)
      const newHistory = [
        { ...finalProfile, date: new Date().toISOString() },
        ...history
      ].slice(0, 5); // Keep last 5
      localStorage.setItem('vibe_history', JSON.stringify(newHistory));
      setHistory(newHistory);

      setTimeout(() => {
        setProfile(finalProfile);
        setIsCalculating(false);
        setCurrentStep(10);
      }, 2000);
    }
  };

  const handleRestart = () => {
    setCurrentStep(-1);
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
        <div className="w-full max-w-2xl mx-auto p-6 flex items-center justify-between">
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
          <div className="max-w-md w-full space-y-8 animate-fade-in-up">
            <div className="brutal-card p-10 space-y-8 text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold text-black leading-tight">
                  The Vibe Engine
                </h1>
                <p className="text-muted-foreground text-sm italic">Direct. Honest. Logic-driven.</p>
              </div>

              <div className="flex justify-center gap-6 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <ClipboardList size={18} className="text-orange-400" />
                  <span>10 Probes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-teal-400" />
                  <span>Adaptive Flow</span>
                </div>
              </div>

              <div className="bg-[#E2F2F0] border-2 border-black rounded-3xl p-6 text-left space-y-3">
                <h3 className="font-bold text-lg">No Cloud AI.</h3>
                <p className="text-sm leading-relaxed text-black/70">
                  This engine calculates your neural vector locally. Your data stays in your browser. We just map the frequencies.
                </p>
              </div>

              <Button 
                size="lg" 
                onClick={handleStart}
                className="w-full brutal-button bg-primary hover:bg-primary/90 text-white rounded-[2rem] h-14 text-lg font-headline font-bold"
              >
                Sync Frequencies
              </Button>
            </div>

            {history.length > 0 && (
              <div className="brutal-card p-6 bg-white space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-black/40">Neural History</h4>
                <div className="space-y-2">
                  {history.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-black/5 pb-2">
                      <span className="font-bold">{h.archetype}</span>
                      <span className="text-xs text-black/40">{new Date(h.date).toLocaleDateString()}</span>
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
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="relative">
               <div className="w-24 h-24 rounded-full border-4 border-dashed border-black animate-spin" />
               <BrainCircuit className="absolute inset-0 m-auto text-primary" size={32} />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-headline font-bold">Compiling neural map...</h3>
              <p className="text-sm font-bold uppercase tracking-widest text-black/40">Logic engine processing...</p>
            </div>
          </div>
        )}

        {currentStep === 10 && profile && !isCalculating && (
          <ProfileDisplay profile={profile} onRestart={handleRestart} history={history} />
        )}
      </div>

      <footer className="p-8 text-center text-xs font-bold uppercase tracking-widest text-black/40">
        © 2026 Personality Lab • Offline Core V5.0
      </footer>
    </main>
  );
}
