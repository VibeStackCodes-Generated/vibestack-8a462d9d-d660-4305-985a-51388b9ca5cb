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
  AlertTriangle, Maximize2, Minimize2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Index() {
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

  const toggleExpand = (panel: string) => {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background noise-bg">
      <TopBar />
      <MarketTicker />
      <StatsBar />

      {/* Main content area */}
      <div className="flex-1 overflow-hidden px-3 pb-3">
        {/* Desktop layout */}
        <div className="hidden lg:grid grid-cols-12 gap-2.5 h-full">
          {/* Left column - News Feed */}
          <div className={`${expandedPanel === 'news' ? 'col-span-12' : 'col-span-3'} flex flex-col rounded-lg border border-cyan-500/15 overflow-hidden transition-all panel-glow-cyan`}>
            <PanelHeader
              title="Intelligence Feed"
              icon={<Newspaper className="w-3.5 h-3.5 text-emerald-400" />}
              badge="LIVE"
              accentColor="emerald"
              badgeColor="text-emerald-400 bg-emerald-500/15 border-emerald-500/25"
            >
              <button onClick={() => toggleExpand('news')} className="text-slate-500 hover:text-white transition-colors">
                {expandedPanel === 'news' ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </PanelHeader>
            <div className="flex-1 overflow-hidden bg-[hsl(220,22%,7%)]">
              <NewsFeed />
            </div>
          </div>

          {/* Center column - Map + AI Brief */}
          {expandedPanel !== 'news' && (
            <div className="col-span-6 flex flex-col gap-2.5 overflow-hidden">
              {/* World Map */}
              <div className={`${expandedPanel === 'map' ? 'flex-1' : 'h-[55%]'} rounded-lg border border-cyan-500/15 overflow-hidden flex flex-col shrink-0 panel-glow-cyan`}>
                <PanelHeader
                  title="Global Threat Map"
                  icon={<Globe className="w-3.5 h-3.5 text-cyan-400" />}
                  badge="12 EVENTS"
                  accentColor="cyan"
                >
                  <button onClick={() => toggleExpand('map')} className="text-slate-500 hover:text-white transition-colors">
                    {expandedPanel === 'map' ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                </PanelHeader>
                <div className="flex-1 overflow-hidden">
                  <WorldMap />
                </div>
              </div>

              {/* AI Brief */}
              {expandedPanel !== 'map' && (
                <div className="flex-1 rounded-lg border border-purple-500/15 overflow-hidden flex flex-col min-h-0 panel-glow-purple">
                  <PanelHeader
                    title="AI Intelligence Brief"
                    icon={<Sparkles className="w-3.5 h-3.5 text-purple-400" />}
                    badge="SENTINEL-4"
                    accentColor="purple"
                  />
                  <div className="flex-1 overflow-hidden bg-[hsl(220,22%,7%)]">
                    <AIBrief />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Right column - Tabbed panels */}
          {expandedPanel !== 'news' && (
            <div className="col-span-3 flex flex-col rounded-lg border border-amber-500/15 overflow-hidden panel-glow-amber">
              <Tabs defaultValue="threats" className="flex flex-col h-full">
                <TabsList className="w-full rounded-none border-b border-slate-800 bg-[hsl(220,22%,7%)] h-auto p-0 shrink-0">
                  <TabsTrigger value="threats" className="flex-1 text-[9px] font-mono font-semibold rounded-none data-[state=active]:bg-amber-500/8 data-[state=active]:text-amber-400 data-[state=active]:border-b-2 data-[state=active]:border-b-amber-500 text-slate-500 py-2.5 transition-all">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    THREATS
                  </TabsTrigger>
                  <TabsTrigger value="military" className="flex-1 text-[9px] font-mono font-semibold rounded-none data-[state=active]:bg-blue-500/8 data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 text-slate-500 py-2.5 transition-all">
                    <Crosshair className="w-3 h-3 mr-1" />
                    MILITARY
                  </TabsTrigger>
                  <TabsTrigger value="cyber" className="flex-1 text-[9px] font-mono font-semibold rounded-none data-[state=active]:bg-purple-500/8 data-[state=active]:text-purple-400 data-[state=active]:border-b-2 data-[state=active]:border-b-purple-500 text-slate-500 py-2.5 transition-all">
                    <Shield className="w-3 h-3 mr-1" />
                    CYBER
                  </TabsTrigger>
                  <TabsTrigger value="seismic" className="flex-1 text-[9px] font-mono font-semibold rounded-none data-[state=active]:bg-cyan-500/8 data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-b-cyan-500 text-slate-500 py-2.5 transition-all">
                    <Activity className="w-3 h-3 mr-1" />
                    SEISMIC
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="threats" className="flex-1 overflow-hidden m-0 bg-[hsl(220,22%,7%)]">
                  <ThreatMatrix />
                </TabsContent>
                <TabsContent value="military" className="flex-1 overflow-hidden m-0 bg-[hsl(220,22%,7%)]">
                  <MilitaryTracker />
                </TabsContent>
                <TabsContent value="cyber" className="flex-1 overflow-hidden m-0 bg-[hsl(220,22%,7%)]">
                  <CyberPanel />
                </TabsContent>
                <TabsContent value="seismic" className="flex-1 overflow-hidden m-0 bg-[hsl(220,22%,7%)]">
                  <SeismicMonitor />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden h-full overflow-hidden">
          <Tabs defaultValue="map" className="flex flex-col h-full">
            <TabsList className="w-full rounded-lg mb-2 shrink-0 bg-slate-900 border border-slate-800">
              <TabsTrigger value="map" className="flex-1 text-[10px] font-mono data-[state=active]:text-cyan-400 data-[state=active]:bg-cyan-500/10">
                <Globe className="w-3 h-3 mr-1" />
                Map
              </TabsTrigger>
              <TabsTrigger value="news" className="flex-1 text-[10px] font-mono data-[state=active]:text-emerald-400 data-[state=active]:bg-emerald-500/10">
                <Newspaper className="w-3 h-3 mr-1" />
                Feed
              </TabsTrigger>
              <TabsTrigger value="threats" className="flex-1 text-[10px] font-mono data-[state=active]:text-amber-400 data-[state=active]:bg-amber-500/10">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Threats
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex-1 text-[10px] font-mono data-[state=active]:text-purple-400 data-[state=active]:bg-purple-500/10">
                <Sparkles className="w-3 h-3 mr-1" />
                AI
              </TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="flex-1 overflow-hidden m-0 rounded-lg border border-cyan-500/15">
              <WorldMap />
            </TabsContent>
            <TabsContent value="news" className="flex-1 overflow-hidden m-0 rounded-lg border border-emerald-500/15 bg-[hsl(220,22%,7%)]">
              <NewsFeed />
            </TabsContent>
            <TabsContent value="threats" className="flex-1 overflow-hidden m-0">
              <Tabs defaultValue="risk" className="flex flex-col h-full">
                <TabsList className="w-full rounded-lg mb-1 shrink-0 bg-slate-900 border border-slate-800">
                  <TabsTrigger value="risk" className="flex-1 text-[9px] font-mono data-[state=active]:text-amber-400">Risk</TabsTrigger>
                  <TabsTrigger value="military" className="flex-1 text-[9px] font-mono data-[state=active]:text-blue-400">Military</TabsTrigger>
                  <TabsTrigger value="cyber" className="flex-1 text-[9px] font-mono data-[state=active]:text-purple-400">Cyber</TabsTrigger>
                  <TabsTrigger value="seismic" className="flex-1 text-[9px] font-mono data-[state=active]:text-cyan-400">Seismic</TabsTrigger>
                </TabsList>
                <TabsContent value="risk" className="flex-1 overflow-hidden m-0 rounded-lg border border-amber-500/15 bg-[hsl(220,22%,7%)]">
                  <ThreatMatrix />
                </TabsContent>
                <TabsContent value="military" className="flex-1 overflow-hidden m-0 rounded-lg border border-blue-500/15 bg-[hsl(220,22%,7%)]">
                  <MilitaryTracker />
                </TabsContent>
                <TabsContent value="cyber" className="flex-1 overflow-hidden m-0 rounded-lg border border-purple-500/15 bg-[hsl(220,22%,7%)]">
                  <CyberPanel />
                </TabsContent>
                <TabsContent value="seismic" className="flex-1 overflow-hidden m-0 rounded-lg border border-cyan-500/15 bg-[hsl(220,22%,7%)]">
                  <SeismicMonitor />
                </TabsContent>
              </Tabs>
            </TabsContent>
            <TabsContent value="ai" className="flex-1 overflow-hidden m-0 rounded-lg border border-purple-500/15 bg-[hsl(220,22%,7%)]">
              <AIBrief />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="h-7 bg-[hsl(220,25%,4%)] border-t border-slate-800 flex items-center justify-between px-5 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
            <span className="text-[9px] font-mono font-semibold text-emerald-400">SYSTEM OPERATIONAL</span>
          </div>
          <span className="text-[9px] font-mono text-slate-600">UPTIME: 99.97%</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono text-slate-600">LATENCY: <span className="text-emerald-400/70">12ms</span></span>
          <span className="text-[9px] font-mono text-slate-600">ENCRYPTION: <span className="text-cyan-400/70">AES-256</span></span>
          <span className="text-[9px] font-mono text-slate-500">v4.2.1</span>
        </div>
      </div>
    </div>
  );
}
