"use client";

import React from 'react';
import { ProfileResult } from '@/app/lib/personality-data';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Share2, User } from 'lucide-react';

interface ProfileDisplayProps {
  profile: ProfileResult;
  onRestart: () => void;
}

export const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile, onRestart }) => {
  return (
    <div className="max-w-md w-full space-y-6 animate-fade-in-up pb-12">
      <div className="text-center pb-4">
        <h2 className="text-xl font-headline font-bold uppercase tracking-widest text-black/40">Test Results</h2>
      </div>

      {/* Main Identity Card */}
      <div className="brutal-card overflow-hidden relative">
         <div className="p-8 space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-[1.5rem] border-2 border-black bg-[#E2F2F0] flex items-center justify-center">
                <User size={40} />
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Individual Archetype</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">{profile.archetype}</p>
            </div>

            <div className="bg-[#FEF4E8] border-y-2 border-dashed border-black py-6 -mx-8 px-8">
              <h2 className="text-2xl font-headline font-bold text-primary">{profile.title}</h2>
              <p className="text-xs text-muted-foreground mt-1">Profile ID: AR-CH-{Math.floor(Math.random() * 9000) + 1000}</p>
            </div>

            <p className="text-sm leading-relaxed text-black/70 italic">
              "{profile.description}"
            </p>
         </div>
      </div>

      {/* Connection Rings */}
      <div className="flex justify-center h-8 relative">
        <div className="w-[2px] bg-black border-l-2 border-dotted h-full" />
        <div className="absolute -top-1 w-3 h-3 rounded-full border-2 border-black bg-white" />
        <div className="absolute -bottom-1 w-3 h-3 rounded-full border-2 border-black bg-white" />
      </div>

      {/* Traits Section */}
      <div className="brutal-card p-8 space-y-6">
        <div className="flex items-center gap-4">
           <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-[#F5F7F9]"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={175}
                  strokeDashoffset={175 * (1 - 0.79)}
                  className="text-primary"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">79%</span>
           </div>
           <div>
              <h4 className="font-bold">Core Resonance</h4>
              <p className="text-xs text-muted-foreground">Alignment with archetypal traits</p>
           </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.traits.map(trait => (
            <div key={trait} className="px-4 py-2 rounded-xl border-2 border-black bg-white text-xs font-bold uppercase">
              {trait}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-8 space-y-4">
        <Button size="lg" className="w-full brutal-button bg-primary text-white rounded-[2rem] h-14 font-bold">
          <Share2 className="mr-2" size={18} /> Share Test Result
        </Button>
        <Button variant="ghost" onClick={onRestart} className="w-full text-black/60 font-bold hover:bg-black/5">
          <RefreshCcw className="mr-2" size={16} /> Restart Assessment
        </Button>
      </div>
    </div>
  );
};
