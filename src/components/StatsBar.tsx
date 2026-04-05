import { TriangleAlert, Globe, Shield, Activity, Radio, Flame } from 'lucide-react';

const stats = [
  { icon: Flame, label: 'Active Conflicts', value: '34', color: 'text-red-400', bg: 'bg-red-500/6 border-red-500/12', iconBg: 'bg-red-500/12' },
  { icon: Globe, label: 'Watchlist Nations', value: '47', color: 'text-amber-400', bg: 'bg-amber-500/6 border-amber-500/12', iconBg: 'bg-amber-500/12' },
  { icon: Shield, label: 'Cyber Incidents', value: '1,247', color: 'text-purple-400', bg: 'bg-purple-500/6 border-purple-500/12', iconBg: 'bg-purple-500/12' },
  { icon: Activity, label: 'Seismic Events', value: '—', color: 'text-teal-400', bg: 'bg-teal-500/6 border-teal-500/12', iconBg: 'bg-teal-500/12', live: true },
  { icon: TriangleAlert, label: 'Active Alerts', value: '12', color: 'text-red-400', bg: 'bg-red-500/6 border-red-500/12', iconBg: 'bg-red-500/12' },
  { icon: Radio, label: 'Data Sources', value: '342', color: 'text-emerald-400', bg: 'bg-emerald-500/6 border-emerald-500/12', iconBg: 'bg-emerald-500/12' },
];

export function StatsBar({ earthquakeCount }: { earthquakeCount?: number }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 md:gap-2 px-3 py-2" role="region" aria-label="Global statistics overview">
      {stats.map((stat, idx) => {
        const displayValue = stat.live && earthquakeCount !== undefined ? String(earthquakeCount) : stat.value;
        return (
          <div
            key={stat.label}
            className={`animate-panel-in delay-${idx + 1} rounded-lg px-2.5 py-2 border ${stat.bg}`}
            role="status"
            aria-label={`${stat.label}: ${displayValue}`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <div className={`w-5 h-5 rounded-md ${stat.iconBg} flex items-center justify-center`}>
                <stat.icon className={`w-3 h-3 ${stat.color}`} aria-hidden="true" />
              </div>
              <span className="text-[7px] md:text-[8px] font-mono text-[hsl(220,15%,40%)] uppercase tracking-wider leading-none">{stat.label}</span>
            </div>
            <div className={`text-lg md:text-xl font-mono font-extrabold ${stat.color} tabular-nums leading-none`}>{displayValue}</div>
          </div>
        );
      })}
    </div>
  );
}
