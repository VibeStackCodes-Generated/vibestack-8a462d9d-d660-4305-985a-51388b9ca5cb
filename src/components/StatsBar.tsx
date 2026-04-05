import { globalStats } from '@/lib/data';
import { AlertTriangle, Globe, Shield, Activity, Radio, Brain, Zap, Flame } from 'lucide-react';

export function StatsBar() {
  const stats = [
    { icon: Flame, label: 'Active Conflicts', value: globalStats.activeConflicts, color: 'text-red-400' },
    { icon: Globe, label: 'Watchlist Nations', value: globalStats.watchlistCountries, color: 'text-amber-400' },
    { icon: Shield, label: 'Cyber Incidents (24h)', value: globalStats.cyberIncidents24h.toLocaleString(), color: 'text-purple-400' },
    { icon: Activity, label: 'Seismic Events (24h)', value: globalStats.seismicEvents24h, color: 'text-cyan-400' },
    { icon: AlertTriangle, label: 'Active Alerts', value: globalStats.activeAlerts, color: 'text-red-400' },
    { icon: Radio, label: 'Data Sources', value: globalStats.dataSourcesOnline, color: 'text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 px-3 py-2">
      {stats.map(stat => (
        <div key={stat.label} className="bg-muted/30 rounded-md px-2.5 py-2 border border-border/50">
          <div className="flex items-center gap-1.5 mb-1">
            <stat.icon className={`w-3 h-3 ${stat.color}`} />
            <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</span>
          </div>
          <div className="text-lg font-mono font-bold text-foreground">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
