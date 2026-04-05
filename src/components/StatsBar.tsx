import { globalStats } from '@/lib/data';
import { AlertTriangle, Globe, Shield, Activity, Radio, Flame } from 'lucide-react';

export function StatsBar() {
  const stats = [
    { icon: Flame, label: 'Active Conflicts', value: globalStats.activeConflicts, color: 'text-red-400', glowClass: 'bg-red-500/8 border-red-500/20', iconBg: 'bg-red-500/15' },
    { icon: Globe, label: 'Watchlist Nations', value: globalStats.watchlistCountries, color: 'text-amber-400', glowClass: 'bg-amber-500/8 border-amber-500/20', iconBg: 'bg-amber-500/15' },
    { icon: Shield, label: 'Cyber Incidents', value: globalStats.cyberIncidents24h.toLocaleString(), color: 'text-purple-400', glowClass: 'bg-purple-500/8 border-purple-500/20', iconBg: 'bg-purple-500/15' },
    { icon: Activity, label: 'Seismic Events', value: globalStats.seismicEvents24h, color: 'text-cyan-400', glowClass: 'bg-cyan-500/8 border-cyan-500/20', iconBg: 'bg-cyan-500/15' },
    { icon: AlertTriangle, label: 'Active Alerts', value: globalStats.activeAlerts, color: 'text-red-400', glowClass: 'bg-red-500/8 border-red-500/20', iconBg: 'bg-red-500/15' },
    { icon: Radio, label: 'Data Sources', value: globalStats.dataSourcesOnline, color: 'text-emerald-400', glowClass: 'bg-emerald-500/8 border-emerald-500/20', iconBg: 'bg-emerald-500/15' },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 px-3 py-2.5">
      {stats.map(stat => (
        <div key={stat.label} className={`rounded-lg px-3 py-2 border ${stat.glowClass} transition-all hover:scale-[1.02]`}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className={`w-5 h-5 rounded ${stat.iconBg} flex items-center justify-center`}>
              <stat.icon className={`w-3 h-3 ${stat.color}`} />
            </div>
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider leading-none">{stat.label}</span>
          </div>
          <div className={`text-xl font-mono font-bold ${stat.color} tabular-nums`}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
