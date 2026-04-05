import { ReactNode } from 'react';

interface PanelHeaderProps {
  title: string;
  icon: ReactNode;
  badge?: string;
  badgeColor?: string;
  children?: ReactNode;
}

export function PanelHeader({ title, icon, badge, badgeColor = 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30', children }: PanelHeaderProps) {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/20 shrink-0">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[11px] font-mono font-semibold text-foreground uppercase tracking-wider">{title}</span>
        {badge && (
          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
