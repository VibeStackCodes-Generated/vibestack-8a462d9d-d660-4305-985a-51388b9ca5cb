import { useState, useEffect } from 'react';
import { Shield, Wifi, Activity, Clock, Globe, Zap, Radio } from 'lucide-react';
import { globalStats } from '@/lib/data';

export function TopBar() {
  const [time, setTime] = useState(new Date());
  const [blinkOn, setBlinkOn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const blinker = setInterval(() => setBlinkOn(p => !p), 800);
    return () => { clearInterval(timer); clearInterval(blinker); };
  }, []);

  const utcTime = time.toISOString().slice(11, 19);
  const localTime = time.toLocaleTimeString('en-US', { hour12: false });

  return (
    <header className="h-13 bg-gradient-to-r from-[hsl(220,25%,6%)] via-[hsl(220,25%,7%)] to-[hsl(220,25%,6%)] border-b border-cyan-500/15 flex items-center justify-between px-5 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
              <Globe className="w-4.5 h-4.5 text-cyan-400" />
            </div>
            <div className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[hsl(220,25%,6%)] ${blinkOn ? 'bg-emerald-400' : 'bg-emerald-400/40'}`} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-widest text-cyan-400">GLOBAL</span>
              <span className="font-bold text-sm tracking-widest text-white">SENTINEL</span>
            </div>
            <div className="text-[8px] font-mono text-cyan-400/50 tracking-[0.2em] -mt-0.5">INTELLIGENCE PLATFORM</div>
          </div>
        </div>

        <div className="h-6 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-cyan-500/8 border border-cyan-500/20 rounded-md px-2.5 py-1">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] font-mono font-medium text-cyan-400">AI ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/8 border border-emerald-500/20 rounded-md px-2.5 py-1">
            <Radio className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-mono font-medium text-emerald-400">{globalStats.dataSourcesOnline} FEEDS</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] font-mono">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-400/80">CONFIDENCE</span>
            <span className="text-emerald-400 font-bold">{globalStats.aiConfidence}%</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-[10px] font-mono">
            <Shield className="w-3 h-3 text-amber-400" />
            <span className="text-amber-400/80">ALERTS</span>
            <span className="text-amber-400 font-bold">{globalStats.activeAlerts}</span>
          </div>
        </div>
        <div className="h-6 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <div className="text-[11px] font-mono font-semibold text-cyan-400 tabular-nums">{utcTime} <span className="text-cyan-400/50">UTC</span></div>
            <div className="text-[9px] font-mono text-slate-500 tabular-nums">{localTime} LOCAL</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
