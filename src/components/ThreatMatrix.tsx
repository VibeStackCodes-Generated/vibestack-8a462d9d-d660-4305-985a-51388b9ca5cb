import { countryRisks } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function ThreatMatrix() {
  const sorted = [...countryRisks].sort((a, b) => b.score - a.score);

  function getScoreColor(score: number) {
    if (score >= 8.5) return 'text-red-400';
    if (score >= 7.5) return 'text-amber-400';
    if (score >= 6.5) return 'text-yellow-300';
    return 'text-emerald-400';
  }

  function getScoreBg(score: number) {
    if (score >= 8.5) return 'bg-red-500/15 border-red-500/25';
    if (score >= 7.5) return 'bg-amber-500/15 border-amber-500/25';
    if (score >= 6.5) return 'bg-yellow-500/15 border-yellow-500/25';
    return 'bg-emerald-500/15 border-emerald-500/25';
  }

  function getBarGradient(score: number) {
    if (score >= 8.5) return 'from-red-600 to-red-400';
    if (score >= 7.5) return 'from-amber-600 to-amber-400';
    if (score >= 6.5) return 'from-yellow-600 to-yellow-400';
    return 'from-emerald-600 to-emerald-400';
  }

  function getBarGlow(score: number) {
    if (score >= 8.5) return 'shadow-[0_0_8px_rgba(239,68,68,0.3)]';
    if (score >= 7.5) return 'shadow-[0_0_8px_rgba(245,158,11,0.3)]';
    return '';
  }

  function getTrendIcon(trend: string) {
    if (trend === 'rising') return <TrendingUp className="w-3.5 h-3.5 text-red-400" />;
    if (trend === 'declining') return <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />;
    return <Minus className="w-3.5 h-3.5 text-slate-500" />;
  }

  function getTrendLabel(trend: string) {
    if (trend === 'rising') return <span className="text-[8px] font-mono text-red-400">▲ RISING</span>;
    if (trend === 'declining') return <span className="text-[8px] font-mono text-emerald-400">▼ DECLINING</span>;
    return <span className="text-[8px] font-mono text-slate-500">— STABLE</span>;
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2.5 space-y-2">
        {sorted.map((country, idx) => {
          const leftBorder = country.score >= 8.5 ? 'border-l-red-500' : country.score >= 7.5 ? 'border-l-amber-500' : country.score >= 6.5 ? 'border-l-yellow-500' : 'border-l-emerald-500';
          
          return (
            <div key={country.code} className={`bg-slate-800/30 rounded-lg p-2.5 hover:bg-slate-800/50 transition-all border-l-2 ${leftBorder} border border-l-2 border-slate-700/30`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-600 w-5 font-bold">#{idx + 1}</span>
                  <span className="text-xs font-bold text-white">{country.country}</span>
                  {getTrendIcon(country.trend)}
                  {getTrendLabel(country.trend)}
                </div>
                <div className={`text-sm font-mono font-black px-2 py-0.5 rounded-md border ${getScoreBg(country.score)} ${getScoreColor(country.score)}`}>
                  {country.score.toFixed(1)}
                </div>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getBarGradient(country.score)} ${getBarGlow(country.score)} transition-all`}
                  style={{ width: `${(country.score / 10) * 100}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-1">
                {country.factors.map(f => (
                  <span key={f} className="text-[8px] font-mono text-slate-400 bg-slate-800/60 border border-slate-700/40 px-1.5 py-0.5 rounded">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
