
"use client";

import React, { useState, useEffect } from 'react';
import { ProfileResult } from '@/app/lib/personality-data';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Share2, Sparkles, Info, AlertTriangle, Fingerprint, Image as ImageIcon, Loader2 } from 'lucide-react';
import { VibeAnalysisOutput } from '@/ai/flows/vibe-analysis-flow';
import { generateVibePortrait } from '@/ai/flows/vibe-portrait-flow';
import Image from 'next/image';

interface ProfileDisplayProps {
  profile: ProfileResult;
  onRestart: () => void;
  aiAnalysis: VibeAnalysisOutput | null;
}

export const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile, onRestart, aiAnalysis }) => {
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);

  const handleGeneratePortrait = async () => {
    setIsGeneratingPortrait(true);
    try {
      const res = await generateVibePortrait({
        archetype: profile.archetype,
        traits: profile.traits,
      });
      setPortraitUrl(res.imageUrl);
    } catch (error) {
      console.error("Portrait generation failed", error);
    } finally {
      setIsGeneratingPortrait(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-6 animate-fade-in-up pb-12">
      <div className="text-center pb-4">
        <h2 className="text-xl font-headline font-bold uppercase tracking-widest text-black/40">Vibe Check Results</h2>
      </div>

      {/* Main Identity Card */}
      <div className="brutal-card overflow-hidden relative">
         <div 
           className="h-20 w-full" 
           style={{ background: aiAnalysis?.vibeColor || 'linear-gradient(45deg, #E2F2F0, #FEF4E8)' }}
         />
         <div className="p-8 space-y-6 text-center -mt-10">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-[1.5rem] border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                {portraitUrl ? (
                  <Image src={portraitUrl} alt="Vibe Portrait" width={96} height={96} className="object-cover" />
                ) : (
                  <Fingerprint size={40} className="text-primary" />
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Neural Archetype</h3>
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

      {/* AI Analysis Feature */}
      <div className="brutal-card p-8 bg-[#E2F2F0] space-y-4">
        <h4 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
          <Sparkles size={16} className="text-primary" /> The Realness
        </h4>
        {aiAnalysis ? (
          <p className="text-sm font-medium leading-relaxed italic text-black/80">
            "{aiAnalysis.analysis}"
          </p>
        ) : (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-black/5 rounded w-full" />
            <div className="h-4 bg-black/5 rounded w-3/4" />
          </div>
        )}
      </div>

      {/* Portrait Generator Feature */}
      {!portraitUrl && (
        <Button 
          onClick={handleGeneratePortrait} 
          disabled={isGeneratingPortrait}
          className="w-full brutal-button bg-white text-black rounded-[2rem] h-14 font-bold border-2 border-black"
        >
          {isGeneratingPortrait ? (
            <Loader2 className="mr-2 animate-spin" size={18} />
          ) : (
            <ImageIcon className="mr-2" size={18} />
          )}
          Generate Vibe Portrait
        </Button>
      )}

      {/* Vector Statistics */}
      <div className="brutal-card p-8 space-y-6">
        <div className="flex items-center justify-between">
           <h4 className="font-bold flex items-center gap-2">
             <Info size={16} /> Neural Breakdown
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

      {/* Actions */}
      <div className="pt-8 space-y-4">
        <Button size="lg" className="w-full brutal-button bg-primary text-white rounded-[2rem] h-14 font-bold">
          <Share2 className="mr-2" size={18} /> Export Neural ID
        </Button>
        <Button variant="ghost" onClick={onRestart} className="w-full text-black/60 font-bold hover:bg-black/5">
          <RefreshCcw className="mr-2" size={16} /> Re-Sync Frequencies
        </Button>
      </div>
    </div>
  );
};
