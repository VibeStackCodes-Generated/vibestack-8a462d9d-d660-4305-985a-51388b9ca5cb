import { seismicEvents, formatTimeAgo } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity } from 'lucide-react';

export function SeismicMonitor() {
  function getMagColor(mag: number) {
    if (mag >= 7) return 'text-red-400 bg-red-500/15 border-red-500/30';
    if (mag >= 6) return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
    if (mag >= 5) return 'text-yellow-300 bg-yellow-500/15 border-yellow-500/30';
    return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-1.5">
        {seismicEvents.map(event => (
          <div key={event.id} className="bg-muted/30 rounded-md p-2.5 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`text-sm font-mono font-bold px-2 py-1 rounded border ${getMagColor(event.magnitude)}`}>
                  M{event.magnitude.toFixed(1)}
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-foreground">{event.location}</div>
                  <div className="text-[9px] text-muted-foreground font-mono">Depth: {event.depth}km</div>
                </div>
              </div>
              <div className="text-[9px] font-mono text-muted-foreground">{formatTimeAgo(event.timestamp)}</div>
            </div>
          </div>
        ))}

        {/* Seismic activity visualization */}
        <div className="mt-2 bg-muted/20 rounded-md p-2">
          <div className="text-[9px] font-mono text-muted-foreground mb-2">24H SEISMIC ACTIVITY</div>
          <div className="flex items-end gap-0.5 h-12">
            {Array.from({ length: 24 }, (_, i) => {
              const height = Math.random() * 100;
              const color = height > 70 ? 'bg-red-500' : height > 40 ? 'bg-amber-500' : 'bg-cyan-500/50';
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${color} transition-all`}
                  style={{ height: `${Math.max(height, 5)}%` }}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[8px] font-mono text-muted-foreground">24h ago</span>
            <span className="text-[8px] font-mono text-muted-foreground">Now</span>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
