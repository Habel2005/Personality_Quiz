
"use client";

import React, { useState, useEffect } from 'react';
import { prompts, Choice, getProfile, ProfileResult } from '@/app/lib/personality-data';
import { QuizStep } from '@/components/quiz/QuizStep';
import { ProfileDisplay } from '@/components/profile/ProfileDisplay';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 is landing
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
      }, 2500); // Simulated "sophisticated backend logic" delay
    }
  };

  const handleRestart = () => {
    setCurrentStep(-1);
    setSelections([]);
    setProfile(null);
  };

  const progress = (currentStep / prompts.length) * 100;

  return (
    <main className="min-h-screen relative flex flex-col">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4839A8]/10 blur-[150px] opacity-40" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4CB3BF]/10 blur-[150px] opacity-40" />
      </div>

      {/* Progress Bar (Visible during quiz) */}
      {currentStep >= 0 && currentStep < prompts.length && !isCalculating && (
        <div className="fixed top-0 left-0 w-full z-50 p-4">
          <div className="max-w-4xl mx-auto space-y-2">
            <Progress value={progress} className="h-1 bg-white/5" />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        {currentStep === -1 && (
          <div className="max-w-3xl text-center space-y-12 animate-fade-in-up">
            <div className="space-y-6">
              <BadgeContainer />
              <h1 className="text-6xl md:text-8xl font-headline font-bold text-white tracking-tighter leading-[0.9]">
                Personality in <span className="text-gold">10 Clicks</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                A journey through the weird, the abstract, and the ultra-specific. Discover the architecture of your subconscious.
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={handleStart}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-12 h-16 text-xl font-headline shadow-2xl shadow-primary/20"
            >
              Begin Resonance
            </Button>
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
          <div className="flex flex-col items-center space-y-8 animate-pulse">
            <div className="relative">
               <div className="w-24 h-24 rounded-full border-t-4 border-primary animate-spin" />
               <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold" size={32} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-3xl font-headline font-medium text-white">Synthesizing Profile...</h3>
              <p className="text-muted-foreground font-light">Analyzing abstract choice patterns against 40,000 archetypal variables.</p>
            </div>
          </div>
        )}

        {currentStep === prompts.length && profile && !isCalculating && (
          <ProfileDisplay profile={profile} onRestart={handleRestart} />
        )}
      </div>

      {/* Aesthetic Footer Branding */}
      <footer className="p-8 flex items-center justify-between text-xs tracking-widest uppercase text-muted-foreground font-headline border-t border-white/5">
        <span>© 2024 Abstract Collective</span>
        <span className="hidden sm:inline">Crafted with introspection</span>
        <span>Version 4.4.4</span>
      </footer>
    </main>
  );
}

function BadgeContainer() {
  return (
    <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-muted-foreground tracking-widest uppercase font-headline">
      <Sparkles size={14} className="text-gold" />
      <span>Advanced Archetypal Engine</span>
    </div>
  );
}
