
"use client";

import React from 'react';
import { ProfileResult } from '@/app/lib/personality-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Share2, RefreshCcw, Download } from 'lucide-react';

interface ProfileDisplayProps {
  profile: ProfileResult;
  onRestart: () => void;
}

export const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile, onRestart }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up py-12">
      <header className="text-center space-y-6">
        <Badge variant="outline" className="border-gold text-gold font-headline uppercase tracking-widest py-1 px-4">
          {profile.archetype}
        </Badge>
        <h1 className="text-5xl md:text-7xl font-headline font-bold text-white tracking-tight">
          {profile.title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
          {profile.description}
        </p>
      </header>

      <div className="bg-[#24242C] border border-border/50 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-3xl -z-10" />
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {profile.traits.map((trait) => (
            <div key={trait} className="px-6 py-3 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground font-headline font-medium text-lg">
              {trait}
            </div>
          ))}
        </div>

        <Separator className="bg-border/30 mb-12" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-lg">
            <Share2 className="mr-2" /> Share Result
          </Button>
          <Button variant="outline" size="lg" className="border-border hover:bg-white/5 rounded-full px-10 h-14 text-lg text-white">
            <Download className="mr-2" /> Download Profile
          </Button>
          <Button variant="ghost" size="lg" onClick={onRestart} className="hover:bg-white/5 text-muted-foreground rounded-full px-10 h-14 text-lg">
            <RefreshCcw className="mr-2" /> Restart
          </Button>
        </div>
      </div>
      
      <footer className="text-center pt-8 text-muted-foreground text-sm font-light">
        Meticulously calculated based on your abstract resonances.
      </footer>
    </div>
  );
};
