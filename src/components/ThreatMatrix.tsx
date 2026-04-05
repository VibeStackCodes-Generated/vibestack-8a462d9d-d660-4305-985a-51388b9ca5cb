import { countryRisks } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

export function ThreatMatrix() {
  const sorted = [...countryRisks].sort((a, b) => b.score - a.score);

  function getScoreColor(score: number) {
    if (score >= 8.5) return 'text-red-400 bg-red-500/15';
    if (score >= 7.5) return 'text-amber-400 bg-amber-500/15';
    if (score >= 6.5) return 'text-yellow-300 bg-yellow-500/15';
    return 'text-emerald-400 bg-emerald-500/15';
  }

  function getBarColor(score: number) {
    if (score >= 8.5) return 'bg-red-500';
    if (score >= 7.5) return 'bg-amber-500';
    if (score >= 6.5) return 'bg-yellow-500';
    return 'bg-emerald-500';
  }

  function getTrendIcon(trend: string) {
    if (trend === 'rising') return <TrendingUp className="w-3 h-3 text-red-400" />;
    if (trend === 'declining') return <TrendingDown className="w-3 h-3 text-emerald-400" />;
    return <Minus className="w-3 h-3 text-muted-foreground" />;
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-1.5">
        {sorted.map((country, idx) => (
          <div key={country.code} className="bg-muted/30 rounded-md p-2 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-muted-foreground w-4">#{idx + 1}</span>
                <span className="text-xs font-semibold text-foreground">{country.country}</span>
                {getTrendIcon(country.trend)}
              </div>
              <div className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${getScoreColor(country.score)}`}>
                {country.score.toFixed(1)}
              </div>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-1.5">
              <div
                className={`h-full rounded-full ${getBarColor(country.score)} transition-all`}
                style={{ width: `${(country.score / 10) * 100}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {country.factors.map(f => (
                <span key={f} className="text-[8px] font-mono text-muted-foreground bg-muted/50 px-1 py-0.5 rounded">
                  {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
