import { useState, useEffect } from 'react';
import { Sparkles, Brain, TrendingUp, AlertTriangle, Shield } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const briefings = [
  {
    title: 'PRIORITY ASSESSMENT',
    icon: AlertTriangle,
    color: 'text-red-400',
    borderColor: 'border-red-500/20',
    bgColor: 'bg-red-500/5',
    content: 'Taiwan Strait situation has escalated to WATCHLIST PRIORITY. PLA naval deployment exceeds routine exercise parameters by 340%. Recommend elevated monitoring of SIGINT channels and commercial satellite passes over next 72 hours. Cross-strait tension index at 8.9/10 — highest since August 2022.'
  },
  {
    title: 'INFRASTRUCTURE ALERT',
    icon: Shield,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/5',
    content: 'Red Sea cable disruption affecting 25% of EU-Asia data traffic. Combined with active ransomware targeting EU energy grid, European digital infrastructure resilience is at DEGRADED status. Cascading failure probability: 12% over next 48 hours.'
  },
  {
    title: 'TREND ANALYSIS',
    icon: TrendingUp,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/5',
    content: 'Global instability index has risen 4.2% over past 7 days. Primary drivers: military escalation in 3 theaters, critical infrastructure attacks, and commodity supply disruptions. VIX surge (+13.21%) correlates with geopolitical risk premium expansion. Gold rally confirms flight-to-safety positioning.'
  },
  {
    title: 'FORECAST',
    icon: Brain,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/20',
    bgColor: 'bg-purple-500/5',
    content: '72-hour outlook: HIGH probability of DPRK ballistic missile test (satellite imagery confirms launch preparation). MODERATE probability of additional NATO force posture adjustments in Baltic region. LOW probability of Taiwan Strait kinetic engagement, but diplomatic deterioration expected.'
  }
];

export function AIBrief() {
  const [visibleChars, setVisibleChars] = useState(0);
  const totalChars = briefings.reduce((sum, b) => sum + b.content.length, 0);

  useEffect(() => {
    if (visibleChars < totalChars) {
      const timer = setTimeout(() => setVisibleChars(prev => prev + 3), 10);
      return () => clearTimeout(timer);
    }
  }, [visibleChars, totalChars]);

  let charCount = 0;

  return (
    <ScrollArea className="h-full">
      <div className="p-3 space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px] font-mono text-cyan-400">AI INTELLIGENCE BRIEF — GENERATED {new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC</span>
        </div>

        {briefings.map((brief, idx) => {
          const startChar = charCount;
          charCount += brief.content.length;
          const visibleText = brief.content.slice(0, Math.max(0, visibleChars - startChar));
          const isTyping = visibleChars > startChar && visibleChars < startChar + brief.content.length;

          return (
            <div key={idx} className={`${brief.bgColor} border ${brief.borderColor} rounded-md p-2.5`}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <brief.icon className={`w-3.5 h-3.5 ${brief.color}`} />
                <span className={`text-[10px] font-mono font-bold ${brief.color}`}>{brief.title}</span>
              </div>
              <p className="text-[11px] text-foreground/80 leading-relaxed font-mono">
                {visibleText}
                {isTyping && <span className="inline-block w-1.5 h-3 bg-cyan-400 animate-pulse ml-0.5" />}
              </p>
            </div>
          );
        })}

        <div className="text-[9px] font-mono text-muted-foreground text-center pt-2">
          Analysis confidence: 94.2% • Sources analyzed: 342 • Model: SENTINEL-4 LLM
        </div>
      </div>
    </ScrollArea>
  );
}
