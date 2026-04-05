import { cyberThreats, formatTimeAgo, getSeverityBg } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Shield, Wifi, AlertTriangle, Search } from 'lucide-react';

export function CyberPanel() {
  function getStatusIcon(status: string) {
    switch (status) {
      case 'active': return <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse-dot" />;
      case 'mitigated': return <div className="w-2 h-2 rounded-full bg-emerald-500" />;
      case 'investigating': return <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-dot" />;
      default: return null;
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'active': return 'text-red-400';
      case 'mitigated': return 'text-emerald-400';
      case 'investigating': return 'text-amber-400';
      default: return 'text-muted-foreground';
    }
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-1.5">
        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          <div className="bg-red-500/10 border border-red-500/20 rounded p-1.5 text-center">
            <div className="text-sm font-mono font-bold text-red-400">{cyberThreats.filter(c => c.status === 'active').length}</div>
            <div className="text-[8px] font-mono text-red-400/70">ACTIVE</div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded p-1.5 text-center">
            <div className="text-sm font-mono font-bold text-amber-400">{cyberThreats.filter(c => c.status === 'investigating').length}</div>
            <div className="text-[8px] font-mono text-amber-400/70">INVESTIGATING</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-1.5 text-center">
            <div className="text-sm font-mono font-bold text-emerald-400">{cyberThreats.filter(c => c.status === 'mitigated').length}</div>
            <div className="text-[8px] font-mono text-emerald-400/70">MITIGATED</div>
          </div>
        </div>

        {cyberThreats.map(threat => (
          <div key={threat.id} className="bg-muted/30 rounded-md p-2.5 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                {getStatusIcon(threat.status)}
                <Badge variant="outline" className={`text-[8px] font-mono px-1 py-0 h-4 border ${getSeverityBg(threat.severity)}`}>
                  {threat.severity.toUpperCase()}
                </Badge>
                <span className={`text-[9px] font-mono uppercase ${getStatusColor(threat.status)}`}>{threat.status}</span>
              </div>
              <span className="text-[9px] font-mono text-muted-foreground">{formatTimeAgo(threat.timestamp)}</span>
            </div>
            <div className="text-[10px] font-semibold text-foreground mb-0.5">{threat.type}</div>
            <div className="text-[9px] text-muted-foreground">
              <span className="text-foreground/70">Target:</span> {threat.target}
            </div>
            <div className="text-[9px] text-muted-foreground">
              <span className="text-foreground/70">Origin:</span> {threat.origin}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
