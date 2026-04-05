import { useState, useEffect } from 'react';
import { Wifi, Activity, Clock, Zap, Radio, TriangleAlert } from 'lucide-react';

export function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const utcTime = time.toISOString().slice(11, 19);

  return (
    <header role="banner" className="h-12 bg-[hsl(225,22%,5%)] border-b border-[hsl(225,15%,12%)] flex items-center justify-between px-4 md:px-5 shrink-0">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5" aria-label="VIBESTACK SENTINEL home">
          <div className="relative w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(168 80% 50% / 0.15), hsl(262 70% 60% / 0.15))' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="hsl(168 80% 50%)" strokeWidth="1.5" />
              <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="hsl(168 80% 50%)" strokeWidth="1" opacity="0.5" />
              <circle cx="12" cy="12" r="2" fill="hsl(168 80% 50%)" />
            </svg>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" aria-hidden="true" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-[13px] tracking-[0.15em] text-teal-400">VIBESTACK</span>
              <span className="font-display font-bold text-[13px] tracking-[0.15em] text-white">SENTINEL</span>
            </div>
            <div className="text-[7px] font-mono text-teal-500/50 tracking-[0.25em] -mt-0.5">INTELLIGENCE PLATFORM</div>
          </div>
        </div>

        <div className="h-5 w-px bg-[hsl(225,15%,14%)]" aria-hidden="true" />

        {/* Status badges */}
        <div className="hidden md:flex items-center gap-2" role="status" aria-label="System status">
          <div className="flex items-center gap-1.5 bg-teal-500/8 border border-teal-500/15 rounded-md px-2 py-1">
            <Zap className="w-3 h-3 text-teal-400" aria-hidden="true" />
            <span className="text-[10px] font-mono font-medium text-teal-400">AI ONLINE</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/8 border border-emerald-500/15 rounded-md px-2 py-1">
            <Radio className="w-3 h-3 text-emerald-400" aria-hidden="true" />
            <span className="text-[10px] font-mono font-medium text-emerald-400">342 FEEDS</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] font-mono" role="status">
            <Activity className="w-3 h-3 text-emerald-400" aria-hidden="true" />
            <span className="text-[hsl(220,15%,48%)]">CONFIDENCE</span>
            <span className="text-emerald-400 font-bold">94.2%</span>
          </div>
          <div className="h-4 w-px bg-[hsl(225,15%,14%)]" aria-hidden="true" />
          <div className="flex items-center gap-1.5 text-[10px] font-mono" role="status">
            <TriangleAlert className="w-3 h-3 text-amber-400" aria-hidden="true" />
            <span className="text-[hsl(220,15%,48%)]">ALERTS</span>
            <span className="text-amber-400 font-bold">12</span>
          </div>
        </div>
        <div className="h-5 w-px bg-[hsl(225,15%,14%)]" aria-hidden="true" />
        <div className="flex items-center gap-2" aria-label={`UTC time: ${utcTime}`}>
          <div className="text-right">
            <div className="text-[11px] font-mono font-semibold text-teal-400 tabular-nums">{utcTime} <span className="text-teal-500/40">UTC</span></div>
          </div>
          <Clock className="w-4 h-4 text-[hsl(220,15%,35%)]" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
