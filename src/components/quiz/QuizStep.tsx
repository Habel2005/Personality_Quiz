
"use client";

import React from 'react';
import { Prompt, Choice } from '@/app/lib/personality-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import * as Icons from 'lucide-react';

interface QuizStepProps {
  prompt: Prompt;
  onSelect: (choice: Choice) => void;
  stepNumber: number;
}

export const QuizStep: React.FC<QuizStepProps> = ({ prompt, onSelect, stepNumber }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto space-y-12 animate-fade-in-up">
      <div className="text-center space-y-4">
        <span className="text-accent font-headline tracking-widest uppercase text-xs">
          Click {stepNumber} / 10
        </span>
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-[#F8F8F8] leading-tight max-w-2xl mx-auto">
          {prompt.question}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {prompt.choices.map((choice) => {
          // @ts-ignore
          const IconComponent = Icons[choice.icon] || Icons.Circle;
          
          return (
            <Card 
              key={choice.id}
              className="group relative overflow-hidden bg-[#1A1A20] border-border/50 hover:border-primary transition-all duration-500 cursor-pointer p-8 flex flex-col items-center text-center space-y-6"
              onClick={() => onSelect(choice)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <IconComponent size={32} strokeWidth={1.5} />
              </div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed group-hover:text-white transition-colors">
                {choice.text}
              </p>
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8">
                  Select
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
