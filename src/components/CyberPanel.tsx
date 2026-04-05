import { cyberThreats, formatTimeAgo, getSeverityBg } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export function CyberPanel() {
  function getStatusDot(status: string) {
    switch (status) {
      case 'active': return <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse-dot shadow-[0_0_8px_rgba(239,68,68,0.5)]" />;
      case 'mitigated': return <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />;
      case 'investigating': return <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse-dot shadow-[0_0_8px_rgba(245,158,11,0.5)]" />;
      default: return null;
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'active': return 'text-red-400';
      case 'mitigated': return 'text-emerald-400';
      case 'investigating': return 'text-amber-400';
      default: return 'text-slate-400';
    }
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2.5 space-y-2">
        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-red-500/8 border border-red-500/20 rounded-lg p-2 text-center">
            <div className="text-lg font-mono font-black text-red-400">{cyberThreats.filter(c => c.status === 'active').length}</div>
            <div className="text-[8px] font-mono font-semibold text-red-400/60 tracking-wider">ACTIVE</div>
          </div>
          <div className="bg-amber-500/8 border border-amber-500/20 rounded-lg p-2 text-center">
            <div className="text-lg font-mono font-black text-amber-400">{cyberThreats.filter(c => c.status === 'investigating').length}</div>
            <div className="text-[8px] font-mono font-semibold text-amber-400/60 tracking-wider">INVESTIGATING</div>
          </div>
          <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-lg p-2 text-center">
            <div className="text-lg font-mono font-black text-emerald-400">{cyberThreats.filter(c => c.status === 'mitigated').length}</div>
            <div className="text-[8px] font-mono font-semibold text-emerald-400/60 tracking-wider">MITIGATED</div>
          </div>
        </div>

        {cyberThreats.map(threat => {
          const leftBorder = threat.severity === 'critical' ? 'border-l-purple-500' : threat.severity === 'high' ? 'border-l-purple-400' : 'border-l-purple-300';
          
          return (
            <div key={threat.id} className={`bg-slate-800/30 rounded-lg p-3 hover:bg-slate-800/50 transition-all border border-slate-700/30 border-l-2 ${leftBorder}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusDot(threat.status)}
                  <Badge variant="outline" className={`text-[8px] font-mono font-bold px-1.5 py-0 h-4 border ${getSeverityBg(threat.severity)}`}>
                    {threat.severity.toUpperCase()}
                  </Badge>
                  <span className={`text-[9px] font-mono font-bold uppercase ${getStatusColor(threat.status)}`}>{threat.status}</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500">{formatTimeAgo(threat.timestamp)}</span>
              </div>
              <div className="text-[11px] font-bold text-white mb-1">{threat.type}</div>
              <div className="text-[10px] text-slate-400 space-y-0.5">
                <div><span className="text-purple-400/70 font-medium">Target:</span> {threat.target}</div>
                <div><span className="text-purple-400/70 font-medium">Origin:</span> {threat.origin}</div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
