import { useMemo } from 'react';
import { seismicEvents, formatTimeAgo } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SeismicMonitor() {
  function getMagColor(mag: number) {
    if (mag >= 7) return 'text-red-400 bg-red-500/15 border-red-500/30';
    if (mag >= 6) return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
    if (mag >= 5) return 'text-yellow-300 bg-yellow-500/15 border-yellow-500/30';
    return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
  }

  function getMagGlow(mag: number) {
    if (mag >= 7) return 'shadow-[0_0_12px_rgba(239,68,68,0.3)]';
    if (mag >= 6) return 'shadow-[0_0_10px_rgba(245,158,11,0.3)]';
    return '';
  }

  // Stable random heights for the bar chart
  const barHeights = useMemo(() => 
    Array.from({ length: 24 }, () => Math.random() * 100),
  []);

  return (
    <ScrollArea className="h-full">
      <div className="p-2.5 space-y-2">
        {seismicEvents.map(event => (
          <div key={event.id} className="bg-slate-800/30 rounded-lg p-3 hover:bg-slate-800/50 transition-all border border-slate-700/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`text-base font-mono font-black px-2.5 py-1.5 rounded-lg border ${getMagColor(event.magnitude)} ${getMagGlow(event.magnitude)}`}>
                  M{event.magnitude.toFixed(1)}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">{event.location}</div>
                  <div className="text-[9px] text-slate-500 font-mono">Depth: {event.depth}km • {event.lat.toFixed(1)}°, {event.lng.toFixed(1)}°</div>
                </div>
              </div>
              <div className="text-[9px] font-mono text-slate-500">{formatTimeAgo(event.timestamp)}</div>
            </div>
          </div>
        ))}

        {/* Seismic activity visualization */}
        <div className="mt-3 bg-slate-800/20 rounded-lg p-3 border border-slate-700/30">
          <div className="text-[9px] font-mono text-cyan-400/70 mb-3 font-semibold tracking-wider">24H SEISMIC ACTIVITY</div>
          <div className="flex items-end gap-0.5 h-16">
            {barHeights.map((height, i) => {
              const color = height > 70 ? 'bg-gradient-to-t from-red-600 to-red-400' : height > 40 ? 'bg-gradient-to-t from-amber-600 to-amber-400' : 'bg-gradient-to-t from-cyan-700 to-cyan-500';
              const glow = height > 70 ? 'shadow-[0_0_4px_rgba(239,68,68,0.3)]' : '';
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${color} ${glow} transition-all`}
                  style={{ height: `${Math.max(height, 4)}%` }}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[8px] font-mono text-slate-600">24h ago</span>
            <span className="text-[8px] font-mono text-slate-600">12h</span>
            <span className="text-[8px] font-mono text-cyan-400/60">Now</span>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
