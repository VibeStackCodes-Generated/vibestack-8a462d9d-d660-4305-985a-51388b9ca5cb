import { useState, useEffect } from 'react';
import { Sparkles, Brain, TrendingUp, AlertTriangle, Shield } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const briefings = [
  {
    title: 'PRIORITY ASSESSMENT',
    icon: AlertTriangle,
    color: 'text-red-400',
    borderColor: 'border-red-500/25',
    bgColor: 'bg-gradient-to-r from-red-500/10 to-transparent',
    accentLine: 'bg-red-500',
    content: 'Taiwan Strait situation has escalated to WATCHLIST PRIORITY. PLA naval deployment exceeds routine exercise parameters by 340%. Recommend elevated monitoring of SIGINT channels and commercial satellite passes over next 72 hours. Cross-strait tension index at 8.9/10 — highest since August 2022.'
  },
  {
    title: 'INFRASTRUCTURE ALERT',
    icon: Shield,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/25',
    bgColor: 'bg-gradient-to-r from-amber-500/10 to-transparent',
    accentLine: 'bg-amber-500',
    content: 'Red Sea cable disruption affecting 25% of EU-Asia data traffic. Combined with active ransomware targeting EU energy grid, European digital infrastructure resilience is at DEGRADED status. Cascading failure probability: 12% over next 48 hours.'
  },
  {
    title: 'TREND ANALYSIS',
    icon: TrendingUp,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/25',
    bgColor: 'bg-gradient-to-r from-cyan-500/10 to-transparent',
    accentLine: 'bg-cyan-500',
    content: 'Global instability index has risen 4.2% over past 7 days. Primary drivers: military escalation in 3 theaters, critical infrastructure attacks, and commodity supply disruptions. VIX surge (+13.21%) correlates with geopolitical risk premium expansion. Gold rally confirms flight-to-safety positioning.'
  },
  {
    title: 'FORECAST',
    icon: Brain,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/25',
    bgColor: 'bg-gradient-to-r from-purple-500/10 to-transparent',
    accentLine: 'bg-purple-500',
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
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-cyan-400 tracking-wide">AI INTELLIGENCE BRIEF</div>
            <div className="text-[8px] font-mono text-slate-500">GENERATED {new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC</div>
          </div>
        </div>

        {briefings.map((brief, idx) => {
          const startChar = charCount;
          charCount += brief.content.length;
          const visibleText = brief.content.slice(0, Math.max(0, visibleChars - startChar));
          const isTyping = visibleChars > startChar && visibleChars < startChar + brief.content.length;

          return (
            <div key={idx} className={`relative ${brief.bgColor} border ${brief.borderColor} rounded-lg p-3 overflow-hidden`}>
              {/* Accent line */}
              <div className={`absolute top-0 left-0 w-1 h-full ${brief.accentLine} rounded-l opacity-60`} />
              
              <div className="flex items-center gap-2 mb-2 pl-2">
                <brief.icon className={`w-4 h-4 ${brief.color}`} />
                <span className={`text-[10px] font-mono font-black ${brief.color} tracking-wider`}>{brief.title}</span>
              </div>
              <p className="text-[11px] text-slate-300/90 leading-relaxed font-mono pl-2">
                {visibleText}
                {isTyping && <span className="inline-block w-1.5 h-3.5 bg-cyan-400 animate-pulse ml-0.5 rounded-sm" />}
              </p>
            </div>
          );
        })}

        <div className="flex items-center justify-center gap-3 text-[9px] font-mono text-slate-600 pt-2 border-t border-slate-800">
          <span>Confidence: <span className="text-emerald-400">94.2%</span></span>
          <span className="text-slate-700">•</span>
          <span>Sources: <span className="text-cyan-400">342</span></span>
          <span className="text-slate-700">•</span>
          <span>Model: <span className="text-purple-400">SENTINEL-4</span></span>
        </div>
      </div>
    </ScrollArea>
  );
}
