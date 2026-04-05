import { militaryActivities, formatTimeAgo, getSeverityBg } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Crosshair, Anchor, Plane, Rocket, Building, Ship } from 'lucide-react';

export function MilitaryTracker() {
  function getTypeIcon(type: string) {
    if (type.includes('Naval')) return <Anchor className="w-4 h-4 text-blue-400" />;
    if (type.includes('Air')) return <Plane className="w-4 h-4 text-cyan-400" />;
    if (type.includes('Missile')) return <Rocket className="w-4 h-4 text-red-400" />;
    if (type.includes('Base')) return <Building className="w-4 h-4 text-amber-400" />;
    if (type.includes('Ground')) return <Crosshair className="w-4 h-4 text-orange-400" />;
    return <Ship className="w-4 h-4 text-purple-400" />;
  }

  function getTypeColor(type: string) {
    if (type.includes('Naval')) return 'bg-blue-500/10 border-blue-500/20';
    if (type.includes('Air')) return 'bg-cyan-500/10 border-cyan-500/20';
    if (type.includes('Missile')) return 'bg-red-500/10 border-red-500/20';
    if (type.includes('Base')) return 'bg-amber-500/10 border-amber-500/20';
    if (type.includes('Ground')) return 'bg-orange-500/10 border-orange-500/20';
    return 'bg-purple-500/10 border-purple-500/20';
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2.5 space-y-2">
        {militaryActivities.map(activity => (
          <div key={activity.id} className="bg-slate-800/30 rounded-lg p-3 hover:bg-slate-800/50 transition-all border border-slate-700/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-md ${getTypeColor(activity.type)} border flex items-center justify-center`}>
                  {getTypeIcon(activity.type)}
                </div>
                <span className="text-[11px] font-mono font-bold text-white uppercase">{activity.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-[8px] font-mono font-bold px-1.5 py-0 h-4 border ${getSeverityBg(activity.severity)}`}>
                  {activity.severity.toUpperCase()}
                </Badge>
                <span className="text-[9px] font-mono text-slate-500">{formatTimeAgo(activity.timestamp)}</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-300 mb-1.5 leading-relaxed">{activity.description}</div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-cyan-400 font-medium bg-cyan-500/8 px-1.5 py-0.5 rounded">{activity.region}</span>
              <span className="text-[9px] text-slate-600">•</span>
              <span className="text-[9px] font-mono text-slate-500">{activity.forces}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
