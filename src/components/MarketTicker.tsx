import { TrendingUp, TrendingDown } from 'lucide-react';
import { marketData } from '@/lib/data';

export function MarketTicker() {
  const items = [...marketData, ...marketData];

  return (
    <div className="h-9 bg-[hsl(220,25%,4%)] border-b border-border relative ticker-mask">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      <div className="flex items-center h-full animate-ticker whitespace-nowrap">
        {items.map((item, i) => (
          <div key={`${item.symbol}-${i}`} className="flex items-center gap-2.5 px-5 text-[11px] font-mono">
            <span className="font-bold text-cyan-400/90 tracking-wide">{item.symbol}</span>
            <span className="text-white font-semibold tabular-nums">{item.value.toLocaleString()}</span>
            <span className={`flex items-center gap-1 font-semibold tabular-nums ${
              item.change >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {item.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
            </span>
            <div className="w-px h-3.5 bg-slate-700/50 ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
