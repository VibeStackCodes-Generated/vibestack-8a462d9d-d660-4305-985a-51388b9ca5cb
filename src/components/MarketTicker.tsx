import { TrendingUp, TrendingDown } from 'lucide-react';
import { marketData } from '@/lib/data';

export function MarketTicker() {
  const items = [...marketData, ...marketData, ...marketData];

  return (
    <div
      className="h-8 bg-[hsl(225,25%,3%)] border-b border-[hsl(225,15%,10%)] overflow-hidden relative"
      role="marquee"
      aria-label="Live market data ticker"
    >
      <div className="flex items-center h-full animate-ticker whitespace-nowrap">
        {items.map((item, i) => (
          <div key={`${item.symbol}-${i}`} className="flex items-center gap-2 px-4 text-[11px] font-mono">
            <span className="font-bold text-teal-400/80 tracking-wide">{item.symbol}</span>
            <span className="text-white font-semibold tabular-nums">{item.value.toLocaleString()}</span>
            <span
              className={`flex items-center gap-0.5 font-semibold tabular-nums ${
                item.change >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
              aria-label={`${item.change >= 0 ? 'up' : 'down'} ${Math.abs(item.changePercent).toFixed(2)} percent`}
            >
              {item.change >= 0 ? (
                <TrendingUp className="w-3 h-3" aria-hidden="true" />
              ) : (
                <TrendingDown className="w-3 h-3" aria-hidden="true" />
              )}
              {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
            </span>
            <div className="w-px h-3 bg-[hsl(225,15%,12%)] ml-1" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
