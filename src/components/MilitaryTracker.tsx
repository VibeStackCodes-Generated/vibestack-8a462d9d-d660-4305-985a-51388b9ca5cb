import { militaryActivities, formatTimeAgo, getSeverityBg } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Crosshair, Anchor, Plane, Rocket, Building, Ship } from 'lucide-react';

export function MilitaryTracker() {
  function getTypeIcon(type: string) {
    if (type.includes('Naval')) return <Anchor className="w-3.5 h-3.5 text-blue-400" />;
    if (type.includes('Air')) return <Plane className="w-3.5 h-3.5 text-cyan-400" />;
    if (type.includes('Missile')) return <Rocket className="w-3.5 h-3.5 text-red-400" />;
    if (type.includes('Base')) return <Building className="w-3.5 h-3.5 text-amber-400" />;
    if (type.includes('Ground')) return <Crosshair className="w-3.5 h-3.5 text-orange-400" />;
    return <Ship className="w-3.5 h-3.5 text-purple-400" />;
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-1.5">
        {militaryActivities.map(activity => (
          <div key={activity.id} className="bg-muted/30 rounded-md p-2.5 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                {getTypeIcon(activity.type)}
                <span className="text-[10px] font-mono font-semibold text-foreground uppercase">{activity.type}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="outline" className={`text-[8px] font-mono px-1 py-0 h-4 border ${getSeverityBg(activity.severity)}`}>
                  {activity.severity.toUpperCase()}
                </Badge>
                <span className="text-[9px] font-mono text-muted-foreground">{formatTimeAgo(activity.timestamp)}</span>
              </div>
            </div>
            <div className="text-[10px] text-foreground/80 mb-1">{activity.description}</div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-cyan-400/70">{activity.region}</span>
              <span className="text-[9px] text-muted-foreground">•</span>
              <span className="text-[9px] font-mono text-muted-foreground">{activity.forces}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
