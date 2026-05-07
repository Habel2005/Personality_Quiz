
"use client";

import React from 'react';
import { ProfileResult } from '@/app/lib/personality-data';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Share2, Info, AlertTriangle, Fingerprint, Trophy, History } from 'lucide-react';
import { getEarnedBadges } from '@/app/lib/achievements';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

interface ProfileDisplayProps {
  profile: ProfileResult;
  onRestart: () => void;
  history: any[];
}

export const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile, onRestart, history }) => {
  const badges = getEarnedBadges(profile.vector);
  
  const chartData = [
    { subject: 'Chaos', A: profile.vector.chaos, fullMark: 20 },
    { subject: 'Logic', A: profile.vector.logic, fullMark: 20 },
    { subject: 'Emotion', A: profile.vector.emotion, fullMark: 20 },
    { subject: 'Imagination', A: profile.vector.imagination, fullMark: 20 },
    { subject: 'Order', A: profile.vector.order, fullMark: 20 },
  ];

  return (
    <div className="max-w-md w-full space-y-6 animate-fade-in-up pb-12">
      <div className="text-center pb-4">
        <h2 className="text-xl font-headline font-bold uppercase tracking-widest text-black/40">Vibe Map: Complete</h2>
      </div>

      {/* Main Identity Card */}
      <div className="brutal-card overflow-hidden relative">
         <div className="h-4 w-full bg-primary" />
         <div className="p-8 space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-[1.5rem] border-2 border-black bg-[#E2F2F0] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Fingerprint size={40} className="text-primary" />
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
                   Logic Confidence: {Math.round(profile.confidence * 100)}%
                 </span>
                 {profile.isContradictory && (
                   <span className="text-[10px] font-bold uppercase bg-orange-100 px-2 py-0.5 border border-black rounded flex items-center gap-1">
                     <AlertTriangle size={10} /> Paradox State
                   </span>
                 )}
              </div>
            </div>

            <p className="text-sm leading-relaxed text-black/70 italic">
              "{profile.description}"
            </p>
         </div>
      </div>

      {/* Digital Badges / Achievements */}
      {badges.length > 0 && (
        <div className="brutal-card p-6 bg-white space-y-4">
          <h4 className="font-bold flex items-center gap-2 text-xs uppercase tracking-widest text-black/40">
            <Trophy size={14} /> Unlocked Achievements
          </h4>
          <div className="flex flex-wrap gap-3">
            {badges.map(badge => (
              <div key={badge.id} className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-black ${badge.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                <span className="text-lg">{badge.icon}</span>
                <span className="text-[10px] font-bold uppercase">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Radar Chart Visual */}
      <div className="brutal-card p-6 space-y-4 bg-white">
        <h4 className="font-bold flex items-center gap-2 text-xs uppercase tracking-widest text-black/40">
           <Info size={14} /> Neural Breakdown
        </h4>
        <div className="h-[250px] w-full flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#000" strokeOpacity={0.1} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#000', fontSize: 10, fontWeight: 'bold' }} />
              <Radar
                name="Traits"
                dataKey="A"
                stroke="#305"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* History Log */}
      <div className="brutal-card p-6 space-y-4 bg-[#E2F2F0]">
        <h4 className="font-bold flex items-center gap-2 text-xs uppercase tracking-widest text-black/40">
           <History size={14} /> Vibe Evolution
        </h4>
        <div className="space-y-3">
          {history.map((h, i) => (
            <div key={i} className="flex justify-between items-center bg-white/50 p-2 rounded-lg border border-black/10">
              <div>
                <p className="text-[10px] font-bold uppercase">{h.archetype}</p>
                <p className="text-[9px] text-black/40">{new Date(h.date).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-1">
                {h.traits.slice(0, 2).map((t: string) => (
                  <span key={t} className="text-[8px] bg-black text-white px-1 rounded">{t}</span>
                ))}
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
