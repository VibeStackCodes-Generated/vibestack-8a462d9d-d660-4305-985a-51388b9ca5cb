import { TrendingUp, TrendingDown } from 'lucide-react';
import { marketData } from '@/lib/data';

export function MarketTicker() {
  const items = [...marketData, ...marketData];

  return (
    <div className="h-7 bg-[hsl(222,25%,6%)] border-b border-border overflow-hidden relative">
      <div className="flex items-center h-full animate-ticker whitespace-nowrap">
        {items.map((item, i) => (
          <div key={`${item.symbol}-${i}`} className="flex items-center gap-2 px-4 text-[10px] font-mono">
            <span className="text-muted-foreground font-semibold">{item.symbol}</span>
            <span className="text-foreground">{item.value.toLocaleString()}</span>
            <span className={`flex items-center gap-0.5 ${item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {item.change >= 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
            </span>
            <div className="w-px h-3 bg-border ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
