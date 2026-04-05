import { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { MarketTicker } from '@/components/MarketTicker';
import { StatsBar } from '@/components/StatsBar';
import { WorldMap } from '@/components/WorldMap';
import { NewsFeed } from '@/components/NewsFeed';
import { ThreatMatrix } from '@/components/ThreatMatrix';
import { CyberPanel } from '@/components/CyberPanel';
import { MilitaryTracker } from '@/components/MilitaryTracker';
import { SeismicMonitor } from '@/components/SeismicMonitor';
import { AIBrief } from '@/components/AIBrief';
import { PanelHeader } from '@/components/PanelHeader';
import {
  Newspaper, Globe, Shield, Crosshair, Activity, Sparkles,
  AlertTriangle, Maximize2, Minimize2, LayoutGrid
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Index() {
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

  const toggleExpand = (panel: string) => {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <TopBar />
      <MarketTicker />
      <StatsBar />

      {/* Main content area */}
      <div className="flex-1 overflow-hidden px-3 pb-3">
        {/* Desktop layout */}
        <div className="hidden lg:grid grid-cols-12 gap-2 h-full">
          {/* Left column - News Feed */}
          <div className={`${expandedPanel === 'news' ? 'col-span-12' : 'col-span-3'} flex flex-col bg-card rounded-md border border-border overflow-hidden transition-all`}>
            <PanelHeader
              title="Intelligence Feed"
              icon={<Newspaper className="w-3.5 h-3.5 text-cyan-400" />}
              badge="LIVE"
              badgeColor="text-emerald-400 bg-emerald-500/15 border-emerald-500/30"
            >
              <button onClick={() => toggleExpand('news')} className="text-muted-foreground hover:text-foreground">
                {expandedPanel === 'news' ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </PanelHeader>
            <div className="flex-1 overflow-hidden">
              <NewsFeed />
            </div>
          </div>

          {/* Center column - Map + AI Brief */}
          {expandedPanel !== 'news' && (
            <div className="col-span-6 flex flex-col gap-2 overflow-hidden">
              {/* World Map */}
              <div className={`${expandedPanel === 'map' ? 'flex-1' : 'h-[55%]'} bg-card rounded-md border border-border overflow-hidden flex flex-col shrink-0`}>
                <PanelHeader
                  title="Global Threat Map"
                  icon={<Globe className="w-3.5 h-3.5 text-cyan-400" />}
                  badge="12 EVENTS"
                >
                  <button onClick={() => toggleExpand('map')} className="text-muted-foreground hover:text-foreground">
                    {expandedPanel === 'map' ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                </PanelHeader>
                <div className="flex-1 overflow-hidden">
                  <WorldMap />
                </div>
              </div>

              {/* AI Brief */}
              {expandedPanel !== 'map' && (
                <div className="flex-1 bg-card rounded-md border border-border overflow-hidden flex flex-col min-h-0">
                  <PanelHeader
                    title="AI Intelligence Brief"
                    icon={<Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
                    badge="SENTINEL-4"
                    badgeColor="text-purple-400 bg-purple-500/15 border-purple-500/30"
                  />
                  <div className="flex-1 overflow-hidden">
                    <AIBrief />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Right column - Tabbed panels */}
          {expandedPanel !== 'news' && (
            <div className="col-span-3 flex flex-col bg-card rounded-md border border-border overflow-hidden">
              <Tabs defaultValue="threats" className="flex flex-col h-full">
                <TabsList className="w-full rounded-none border-b border-border bg-muted/20 h-auto p-0 shrink-0">
                  <TabsTrigger value="threats" className="flex-1 text-[9px] font-mono rounded-none data-[state=active]:bg-muted/40 data-[state=active]:text-foreground py-2">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    THREATS
                  </TabsTrigger>
                  <TabsTrigger value="military" className="flex-1 text-[9px] font-mono rounded-none data-[state=active]:bg-muted/40 data-[state=active]:text-foreground py-2">
                    <Crosshair className="w-3 h-3 mr-1" />
                    MILITARY
                  </TabsTrigger>
                  <TabsTrigger value="cyber" className="flex-1 text-[9px] font-mono rounded-none data-[state=active]:bg-muted/40 data-[state=active]:text-foreground py-2">
                    <Shield className="w-3 h-3 mr-1" />
                    CYBER
                  </TabsTrigger>
                  <TabsTrigger value="seismic" className="flex-1 text-[9px] font-mono rounded-none data-[state=active]:bg-muted/40 data-[state=active]:text-foreground py-2">
                    <Activity className="w-3 h-3 mr-1" />
                    SEISMIC
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="threats" className="flex-1 overflow-hidden m-0">
                  <ThreatMatrix />
                </TabsContent>
                <TabsContent value="military" className="flex-1 overflow-hidden m-0">
                  <MilitaryTracker />
                </TabsContent>
                <TabsContent value="cyber" className="flex-1 overflow-hidden m-0">
                  <CyberPanel />
                </TabsContent>
                <TabsContent value="seismic" className="flex-1 overflow-hidden m-0">
                  <SeismicMonitor />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden h-full overflow-hidden">
          <Tabs defaultValue="map" className="flex flex-col h-full">
            <TabsList className="w-full rounded-md mb-2 shrink-0">
              <TabsTrigger value="map" className="flex-1 text-[10px]">
                <Globe className="w-3 h-3 mr-1" />
                Map
              </TabsTrigger>
              <TabsTrigger value="news" className="flex-1 text-[10px]">
                <Newspaper className="w-3 h-3 mr-1" />
                Feed
              </TabsTrigger>
              <TabsTrigger value="threats" className="flex-1 text-[10px]">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Threats
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex-1 text-[10px]">
                <Sparkles className="w-3 h-3 mr-1" />
                AI
              </TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="flex-1 overflow-hidden m-0 bg-card rounded-md border border-border">
              <WorldMap />
            </TabsContent>
            <TabsContent value="news" className="flex-1 overflow-hidden m-0 bg-card rounded-md border border-border">
              <NewsFeed />
            </TabsContent>
            <TabsContent value="threats" className="flex-1 overflow-hidden m-0">
              <Tabs defaultValue="risk" className="flex flex-col h-full">
                <TabsList className="w-full rounded-md mb-1 shrink-0">
                  <TabsTrigger value="risk" className="flex-1 text-[9px]">Risk</TabsTrigger>
                  <TabsTrigger value="military" className="flex-1 text-[9px]">Military</TabsTrigger>
                  <TabsTrigger value="cyber" className="flex-1 text-[9px]">Cyber</TabsTrigger>
                  <TabsTrigger value="seismic" className="flex-1 text-[9px]">Seismic</TabsTrigger>
                </TabsList>
                <TabsContent value="risk" className="flex-1 overflow-hidden m-0 bg-card rounded-md border border-border">
                  <ThreatMatrix />
                </TabsContent>
                <TabsContent value="military" className="flex-1 overflow-hidden m-0 bg-card rounded-md border border-border">
                  <MilitaryTracker />
                </TabsContent>
                <TabsContent value="cyber" className="flex-1 overflow-hidden m-0 bg-card rounded-md border border-border">
                  <CyberPanel />
                </TabsContent>
                <TabsContent value="seismic" className="flex-1 overflow-hidden m-0 bg-card rounded-md border border-border">
                  <SeismicMonitor />
                </TabsContent>
              </Tabs>
            </TabsContent>
            <TabsContent value="ai" className="flex-1 overflow-hidden m-0 bg-card rounded-md border border-border">
              <AIBrief />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="h-6 bg-[hsl(222,25%,6%)] border-t border-border flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
            <span className="text-[9px] font-mono text-emerald-400">SYSTEM OPERATIONAL</span>
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">UPTIME: 99.97%</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-muted-foreground">LATENCY: 12ms</span>
          <span className="text-[9px] font-mono text-muted-foreground">ENCRYPTION: AES-256</span>
          <span className="text-[9px] font-mono text-muted-foreground">v4.2.1</span>
        </div>
      </div>
    </div>
  );
}
