"use client";

import React from 'react';
import { Prompt, Choice } from '@/app/lib/personality-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface QuizStepProps {
  prompt: Prompt;
  onSelect: (choice: Choice) => void;
  stepNumber: number;
}

export const QuizStep: React.FC<QuizStepProps> = ({ prompt, onSelect, stepNumber }) => {
  return (
    <div className="w-full max-w-lg mx-auto space-y-8 animate-fade-in-up">
      <div className="relative pb-4">
        <div className="brutal-card p-10 space-y-8 relative">
          <div className="absolute -top-4 left-6 w-8 h-8 rounded-full border-2 border-black bg-[#E2F2F0] flex items-center justify-center font-bold">
            {stepNumber}
          </div>

          <h2 className="text-2xl font-headline font-bold text-black leading-tight pt-2">
            {prompt.question}
          </h2>

          <div className="space-y-4">
            {prompt.choices.map((choice, index) => (
              <button
                key={choice.id}
                onClick={() => onSelect(choice)}
                className={cn(
                  "w-full p-6 text-left border-2 border-black rounded-[1.5rem] flex items-center justify-between transition-all group",
                  "hover:bg-[#F5F7F9] hover:translate-x-1 hover:translate-y-1"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border-2 border-black bg-white flex items-center justify-center font-bold group-hover:bg-[#E2F2F0]">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium text-lg text-black/80">{choice.text}</span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-black bg-white group-hover:bg-[#C1E57A] flex items-center justify-center">
                  <Check size={14} className="opacity-0 group-hover:opacity-100" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
