import { useState } from 'react';
import { newsItems, formatTimeAgo, getSeverityBg, getCategoryIcon } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export function NewsFeed() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'geopolitical', 'military', 'economic', 'cyber', 'disaster', 'infrastructure'];
  const filtered = filter === 'all' ? newsItems : newsItems.filter(n => n.category === filter);

  return (
    <div className="flex flex-col h-full">
      {/* Filter tabs */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded transition-colors whitespace-nowrap ${
              filter === cat
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {filtered.map(item => (
            <div
              key={item.id}
              className="px-3 py-2.5 hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div className="flex items-start gap-2">
                <span className="text-sm mt-0.5">{getCategoryIcon(item.category)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Badge variant="outline" className={`text-[8px] font-mono px-1 py-0 h-4 border ${getSeverityBg(item.severity)}`}>
                      {item.severity.toUpperCase()}
                    </Badge>
                    <span className="text-[9px] font-mono text-muted-foreground">{item.source}</span>
                    <span className="text-[9px] font-mono text-muted-foreground">•</span>
                    <span className="text-[9px] font-mono text-muted-foreground">{formatTimeAgo(item.timestamp)}</span>
                  </div>
                  <h4 className="text-xs font-medium text-foreground leading-tight">{item.title}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-[8px] font-mono px-1 py-0 h-3.5 border-border text-muted-foreground">
                      {item.region}
                    </Badge>
                  </div>

                  {expandedId === item.id && (
                    <div className="mt-2 space-y-2">
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{item.summary}</p>
                      {item.aiAnalysis && (
                        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Sparkles className="w-3 h-3 text-cyan-400" />
                            <span className="text-[9px] font-mono font-semibold text-cyan-400">AI ANALYSIS</span>
                          </div>
                          <p className="text-[10px] text-cyan-300/80 leading-relaxed">{item.aiAnalysis}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="shrink-0">
                  {expandedId === item.id ? (
                    <ChevronUp className="w-3 h-3 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
