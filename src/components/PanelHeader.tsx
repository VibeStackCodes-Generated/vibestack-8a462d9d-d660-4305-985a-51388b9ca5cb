import { ReactNode } from 'react';

interface PanelHeaderProps {
  title: string;
  icon: ReactNode;
  badge?: string;
  badgeColor?: string;
  accentColor?: 'cyan' | 'red' | 'amber' | 'purple' | 'emerald';
  children?: ReactNode;
}

const accentStyles = {
  cyan: {
    border: 'border-b-cyan-500/30',
    bg: 'bg-gradient-to-r from-cyan-500/8 via-transparent to-transparent',
    line: 'bg-cyan-500',
    badge: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/25',
  },
  red: {
    border: 'border-b-red-500/30',
    bg: 'bg-gradient-to-r from-red-500/8 via-transparent to-transparent',
    line: 'bg-red-500',
    badge: 'text-red-400 bg-red-500/15 border-red-500/25',
  },
  amber: {
    border: 'border-b-amber-500/30',
    bg: 'bg-gradient-to-r from-amber-500/8 via-transparent to-transparent',
    line: 'bg-amber-500',
    badge: 'text-amber-400 bg-amber-500/15 border-amber-500/25',
  },
  purple: {
    border: 'border-b-purple-500/30',
    bg: 'bg-gradient-to-r from-purple-500/8 via-transparent to-transparent',
    line: 'bg-purple-500',
    badge: 'text-purple-400 bg-purple-500/15 border-purple-500/25',
  },
  emerald: {
    border: 'border-b-emerald-500/30',
    bg: 'bg-gradient-to-r from-emerald-500/8 via-transparent to-transparent',
    line: 'bg-emerald-500',
    badge: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/25',
  },
};

export function PanelHeader({ title, icon, badge, badgeColor, accentColor = 'cyan', children }: PanelHeaderProps) {
  const styles = accentStyles[accentColor];
  const resolvedBadgeColor = badgeColor || styles.badge;

  return (
    <div className={`relative flex items-center justify-between px-3 py-2.5 border-b ${styles.border} ${styles.bg} shrink-0`}>
      {/* Accent line at top */}
      <div className={`absolute top-0 left-0 w-12 h-0.5 ${styles.line} rounded-full opacity-60`} />
      
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">{title}</span>
        {badge && (
          <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded border ${resolvedBadgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
