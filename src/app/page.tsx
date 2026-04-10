"use client";

import React, { useState } from 'react';
import { prompts, Choice, getProfile, ProfileResult } from '@/app/lib/personality-data';
import { QuizStep } from '@/components/quiz/QuizStep';
import { ProfileDisplay } from '@/components/profile/ProfileDisplay';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Clock, ClipboardList } from 'lucide-react';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(-1); 
  const [selections, setSelections] = useState<string[]>([]);
  const [profile, setProfile] = useState<ProfileResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleStart = () => {
    setCurrentStep(0);
  };

  const handleSelect = (choice: Choice) => {
    const nextSelections = [...selections, choice.trait];
    setSelections(nextSelections);

    if (currentStep < prompts.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setProfile(getProfile(nextSelections));
        setIsCalculating(false);
        setCurrentStep(prompts.length);
      }, 2000);
    }
  };

  const handleRestart = () => {
    setCurrentStep(-1);
    setSelections([]);
    setProfile(null);
  };

  const progress = (currentStep / prompts.length) * 100;

  return (
    <main className="min-h-screen flex flex-col bg-[#F5F7F9]">
      {/* Header Area */}
      {currentStep >= 0 && currentStep < prompts.length && (
        <div className="w-full max-w-2xl mx-auto p-6 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handleRestart} className="rounded-full border-2 border-black bg-[#E2F2F0]">
            <ArrowRight className="rotate-180" size={20} />
          </Button>
          <div className="flex-1 px-8">
            <Progress value={progress} className="h-3 bg-white border-2 border-black" />
          </div>
          <Button disabled className="brutal-button bg-primary text-white rounded-xl px-6">
            Submit
          </Button>
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
                  Understand your personality
                </h1>
                <p className="text-muted-foreground text-sm italic">Self-assessment</p>
              </div>

              <div className="flex justify-center gap-6 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <ClipboardList size={18} className="text-orange-400" />
                  <span>10 Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-teal-400" />
                  <span>~2 minutes</span>
                </div>
              </div>

              <div className="bg-[#E2F2F0] border-2 border-black rounded-3xl p-6 text-left space-y-3">
                <h3 className="font-bold text-lg">About assessment</h3>
                <p className="text-sm leading-relaxed text-black/70">
                  This framework is designed to identify the unique architecture of your subconscious through abstract resonances.
                </p>
              </div>

              <div className="bg-[#FEF4E8] border-2 border-black border-dashed rounded-3xl p-6 text-left space-y-3">
                <h3 className="font-bold text-lg">Instruction</h3>
                <ul className="text-sm space-y-2 text-black/70 list-disc list-inside">
                  <li>There is no right or wrong answer</li>
                  <li>Choose the answer that feels true to you</li>
                </ul>
              </div>

              <Button 
                size="lg" 
                onClick={handleStart}
                className="w-full brutal-button bg-primary hover:bg-primary/90 text-white rounded-[2rem] h-14 text-lg font-headline font-bold"
              >
                Start test
              </Button>
            </div>
          </div>
        )}

        {currentStep >= 0 && currentStep < prompts.length && !isCalculating && (
          <QuizStep 
            prompt={prompts[currentStep]} 
            onSelect={handleSelect} 
            stepNumber={currentStep + 1}
          />
        )}

        {isCalculating && (
          <div className="flex flex-col items-center space-y-8 animate-pulse text-center">
            <div className="w-16 h-16 rounded-full border-4 border-black border-t-primary animate-spin" />
            <div className="space-y-2">
              <h3 className="text-2xl font-headline font-bold">Mapping your archetype...</h3>
              <p className="text-muted-foreground">Synthesizing choices into geometric personality structures.</p>
            </div>
          </div>
        )}

        {currentStep === prompts.length && profile && !isCalculating && (
          <ProfileDisplay profile={profile} onRestart={handleRestart} />
        )}
      </div>

      <footer className="p-8 text-center text-xs font-bold uppercase tracking-widest text-black/40">
        © 2024 Personality Lab • Assessment V4
      </footer>
    </main>
  );
}
