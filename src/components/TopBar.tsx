import { useState, useEffect } from 'react';
import { Shield, Wifi, Activity, Clock, Bell, Search, Globe, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { globalStats } from '@/lib/data';

export function TopBar() {
  const [time, setTime] = useState(new Date());
  const [blinkOn, setBlinkOn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const blinker = setInterval(() => setBlinkOn(p => !p), 1000);
    return () => { clearInterval(timer); clearInterval(blinker); };
  }, []);

  const utcTime = time.toISOString().slice(11, 19);
  const localTime = time.toLocaleTimeString('en-US', { hour12: false });

  return (
    <header className="h-12 bg-[hsl(222,25%,7%)] border-b border-border flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Globe className="w-5 h-5 text-cyan-400" />
            <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 ${blinkOn ? 'opacity-100' : 'opacity-40'}`} />
          </div>
          <span className="font-bold text-sm tracking-wider text-cyan-400">GLOBAL</span>
          <span className="font-bold text-sm tracking-wider text-foreground">SENTINEL</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <Badge variant="outline" className="text-[10px] font-mono border-cyan-500/30 text-cyan-400 gap-1">
          <Zap className="w-3 h-3" />
          AI ACTIVE
        </Badge>
        <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/30 text-emerald-400 gap-1">
          <Wifi className="w-3 h-3" />
          {globalStats.dataSourcesOnline} SOURCES
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>CONFIDENCE: {globalStats.aiConfidence}%</span>
          </div>
          <div className="h-3 w-px bg-border" />
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-amber-400" />
            <span>{globalStats.activeAlerts} ACTIVE ALERTS</span>
          </div>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-[10px] font-mono text-cyan-400">{utcTime} UTC</div>
            <div className="text-[9px] font-mono text-muted-foreground">{localTime} LOCAL</div>
          </div>
          <Clock className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
