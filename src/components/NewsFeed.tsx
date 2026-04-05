import { useState } from 'react';
import { newsItems, formatTimeAgo, getSeverityBg, getCategoryIcon } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export function NewsFeed() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'geopolitical', 'military', 'economic', 'cyber', 'disaster', 'infrastructure'];
  const filtered = filter === 'all' ? newsItems : newsItems.filter(n => n.category === filter);

  return (
    <div className="flex flex-col h-full">
      {/* Filter tabs */}
      <div className="flex items-center gap-1 px-2 py-2 border-b border-border overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-[9px] font-mono uppercase px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
              filter === cat
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_8px_hsl(190_95%_50%/0.1)]'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-slate-800/60">
          {filtered.map(item => {
            const isExpanded = expandedId === item.id;
            const severityLeftBorder = item.severity === 'critical' ? 'border-l-red-500' : item.severity === 'high' ? 'border-l-amber-500' : item.severity === 'medium' ? 'border-l-yellow-500' : 'border-l-emerald-500';
            
            return (
              <div
                key={item.id}
                className={`px-3 py-3 hover:bg-slate-800/30 transition-all cursor-pointer border-l-2 ${severityLeftBorder} ${isExpanded ? 'bg-slate-800/20' : ''}`}
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-base mt-0.5">{getCategoryIcon(item.category)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Badge variant="outline" className={`text-[8px] font-mono font-bold px-1.5 py-0 h-4 border ${getSeverityBg(item.severity)}`}>
                        {item.severity.toUpperCase()}
                      </Badge>
                      <span className="text-[9px] font-mono text-cyan-400/60">{item.source}</span>
                      <span className="text-[9px] text-slate-600">•</span>
                      <span className="text-[9px] font-mono text-slate-500">{formatTimeAgo(item.timestamp)}</span>
                    </div>
                    <h4 className="text-[12px] font-semibold text-slate-200 leading-snug">{item.title}</h4>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Badge variant="outline" className="text-[8px] font-mono px-1.5 py-0 h-4 border-cyan-500/20 text-cyan-400/70 bg-cyan-500/5">
                        {item.region}
                      </Badge>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 space-y-2.5">
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.summary}</p>
                        {item.aiAnalysis && (
                          <div className="bg-gradient-to-r from-cyan-500/8 to-transparent border border-cyan-500/20 rounded-lg p-2.5">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Sparkles className="w-3 h-3 text-cyan-400" />
                              <span className="text-[9px] font-mono font-bold text-cyan-400 tracking-wide">AI ANALYSIS</span>
                            </div>
                            <p className="text-[10px] text-cyan-300/70 leading-relaxed">{item.aiAnalysis}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 mt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
