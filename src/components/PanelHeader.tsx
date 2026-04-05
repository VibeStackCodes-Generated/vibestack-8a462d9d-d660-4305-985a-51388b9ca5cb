import { ReactNode } from 'react';

interface PanelHeaderProps {
  title: string;
  icon: ReactNode;
  badge?: string;
  accentColor?: 'teal' | 'red' | 'amber' | 'purple' | 'emerald' | 'blue';
  children?: ReactNode;
  id?: string;
}

const accents = {
  teal: { line: 'bg-teal-400', bg: 'from-teal-500/6', badge: 'text-teal-400 bg-teal-500/12 border-teal-500/20' },
  red: { line: 'bg-red-400', bg: 'from-red-500/6', badge: 'text-red-400 bg-red-500/12 border-red-500/20' },
  amber: { line: 'bg-amber-400', bg: 'from-amber-500/6', badge: 'text-amber-400 bg-amber-500/12 border-amber-500/20' },
  purple: { line: 'bg-purple-400', bg: 'from-purple-500/6', badge: 'text-purple-400 bg-purple-500/12 border-purple-500/20' },
  emerald: { line: 'bg-emerald-400', bg: 'from-emerald-500/6', badge: 'text-emerald-400 bg-emerald-500/12 border-emerald-500/20' },
  blue: { line: 'bg-blue-400', bg: 'from-blue-500/6', badge: 'text-blue-400 bg-blue-500/12 border-blue-500/20' },
};

export function PanelHeader({ title, icon, badge, accentColor = 'teal', children, id }: PanelHeaderProps) {
  const a = accents[accentColor];
  return (
    <div className={`relative flex items-center justify-between px-3 py-2.5 bg-gradient-to-r ${a.bg} to-transparent shrink-0`} id={id}>
      <div className={`absolute top-0 left-0 w-10 h-[2px] ${a.line} rounded-full opacity-70`} aria-hidden="true" />
      <div className="flex items-center gap-2">
        <span aria-hidden="true">{icon}</span>
        <h2 className="text-[11px] font-display font-bold text-white uppercase tracking-[0.08em]">{title}</h2>
        {badge && (
          <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border ${a.badge}`} aria-label={badge}>
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
