"use client";

import React from 'react';
import { ProfileResult } from '@/app/lib/personality-data';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Share2, User, Info, AlertTriangle } from 'lucide-react';

interface ProfileDisplayProps {
  profile: ProfileResult;
  onRestart: () => void;
}

export const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile, onRestart }) => {
  return (
    <div className="max-w-md w-full space-y-6 animate-fade-in-up pb-12">
      <div className="text-center pb-4">
        <h2 className="text-xl font-headline font-bold uppercase tracking-widest text-black/40">Neural Map Results</h2>
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
              <h3 className="text-lg font-bold">Primary Resonance</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">{profile.archetype}</p>
            </div>

            <div className="bg-[#FEF4E8] border-y-2 border-dashed border-black py-6 -mx-8 px-8">
              <h2 className="text-2xl font-headline font-bold text-primary">{profile.title}</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                 <span className="text-[10px] font-bold uppercase bg-white px-2 py-0.5 border border-black rounded">
                   Confidence: {Math.round(profile.confidence * 100)}%
                 </span>
                 {profile.isContradictory && (
                   <span className="text-[10px] font-bold uppercase bg-orange-100 px-2 py-0.5 border border-black rounded flex items-center gap-1">
                     <AlertTriangle size={10} /> Paradox Detected
                   </span>
                 )}
              </div>
            </div>

            <p className="text-sm leading-relaxed text-black/70 italic">
              "{profile.description}"
            </p>
         </div>
      </div>

      {/* Vector Statistics */}
      <div className="brutal-card p-8 space-y-6">
        <div className="flex items-center justify-between">
           <h4 className="font-bold flex items-center gap-2">
             <Info size={16} /> Trait Distribution
           </h4>
        </div>

        <div className="space-y-3">
          {Object.entries(profile.vector).map(([trait, value]) => (
            <div key={trait} className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                <span>{trait}</span>
                <span>{value} pts</span>
              </div>
              <div className="h-2 w-full bg-[#F5F7F9] border border-black rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000" 
                  style={{ width: `${Math.min(100, (value / 15) * 100)}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traits Summary */}
      <div className="flex flex-wrap gap-2 justify-center">
        {profile.traits.map(trait => (
          <div key={trait} className="px-4 py-2 rounded-xl border-2 border-black bg-white text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {trait}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="pt-8 space-y-4">
        <Button size="lg" className="w-full brutal-button bg-primary text-white rounded-[2rem] h-14 font-bold">
          <Share2 className="mr-2" size={18} /> Export Profile Data
        </Button>
        <Button variant="ghost" onClick={onRestart} className="w-full text-black/60 font-bold hover:bg-black/5">
          <RefreshCcw className="mr-2" size={16} /> Re-Calculate Vector
        </Button>
      </div>
    </div>
  );
};
