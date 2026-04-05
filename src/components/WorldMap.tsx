import { useState } from 'react';
import { threatEvents } from '@/lib/data';
import type { ThreatEvent } from '@/lib/data';
import { formatTimeAgo } from '@/lib/data';

function latLngToXY(lat: number, lng: number, width: number, height: number) {
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

export function WorldMap() {
  const [hoveredEvent, setHoveredEvent] = useState<ThreatEvent | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const W = 900;
  const H = 450;

  const continentPaths = [
    'M 120,80 L 140,75 160,78 180,90 200,85 220,95 240,100 250,120 260,140 255,160 240,170 230,180 220,175 200,185 180,190 160,180 140,175 130,160 120,140 115,120 118,100 Z',
    'M 200,210 L 215,205 230,215 240,230 245,250 248,270 245,290 240,310 230,325 220,330 210,325 200,310 195,290 190,270 192,250 195,230 Z',
    'M 420,75 L 440,70 460,72 480,78 490,85 495,95 490,105 480,110 470,115 460,112 450,108 440,105 430,100 425,90 Z',
    'M 420,140 L 440,135 460,138 480,145 490,160 495,180 498,200 495,220 490,240 480,260 470,270 460,268 445,260 435,245 425,225 420,200 418,180 415,160 Z',
    'M 500,60 L 530,55 560,58 590,62 620,68 650,72 680,78 700,85 720,95 730,110 725,125 710,135 690,140 670,138 650,135 630,130 610,128 590,125 570,120 550,115 530,108 510,100 505,85 Z',
    'M 700,250 L 720,245 740,248 760,255 770,265 768,280 760,290 745,295 730,292 715,285 710,270 705,258 Z',
    'M 490,115 L 510,110 530,115 540,125 535,135 525,140 510,138 500,130 495,120 Z'
  ];

  // Connection lines between related events
  const connections = [
    { from: 't6', to: 't3' }, // Taiwan to SCS
    { from: 't9', to: 't1' }, // Ukraine to Baltic
    { from: 't2', to: 't4' }, // Red Sea to Europe cyber
  ];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-md" style={{ background: 'linear-gradient(180deg, hsl(220 30% 4%) 0%, hsl(220 25% 6%) 50%, hsl(220 30% 4%) 100%)' }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50" />
      
      {/* Radial glow in center */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, hsl(190 95% 50% / 0.03) 0%, transparent 70%)' }} />

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full relative z-10" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(190 95% 50%)" stopOpacity="0.08" />
            <stop offset="50%" stopColor="hsl(190 95% 50%)" stopOpacity="0.03" />
            <stop offset="100%" stopColor="hsl(190 95% 50%)" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * (H / 6)} x2={W} y2={i * (H / 6)} stroke="hsl(190 95% 50%)" strokeWidth="0.3" opacity="0.08" />
        ))}
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`v${i}`} x1={i * (W / 12)} y1={0} x2={i * (W / 12)} y2={H} stroke="hsl(190 95% 50%)" strokeWidth="0.3" opacity="0.08" />
        ))}

        {/* Continents with cyan tint */}
        {continentPaths.map((d, i) => (
          <path key={i} d={d} fill="hsl(200 30% 12%)" stroke="hsl(190 60% 30%)" strokeWidth="0.8" opacity="0.9" />
        ))}

        {/* Connection lines */}
        {connections.map((conn, idx) => {
          const from = threatEvents.find(e => e.id === conn.from);
          const to = threatEvents.find(e => e.id === conn.to);
          if (!from || !to) return null;
          const p1 = latLngToXY(from.lat, from.lng, W, H);
          const p2 = latLngToXY(to.lat, to.lng, W, H);
          return (
            <line key={idx} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke="hsl(190 95% 50%)" strokeWidth="0.5" opacity="0.15" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1s" repeatCount="indefinite" />
            </line>
          );
        })}

        {/* Threat markers */}
        {threatEvents.map((event) => {
          const { x, y } = latLngToXY(event.lat, event.lng, W, H);
          const color = event.severity === 'critical' ? '#ef4444' : event.severity === 'high' ? '#f59e0b' : '#eab308';
          const glowColor = event.severity === 'critical' ? 'rgba(239,68,68,0.3)' : event.severity === 'high' ? 'rgba(245,158,11,0.3)' : 'rgba(234,179,8,0.2)';
          const radius = event.severity === 'critical' ? 7 : event.severity === 'high' ? 5.5 : 4.5;

          return (
            <g key={event.id}
              onMouseEnter={(e) => {
                setHoveredEvent(event);
                setTooltipPos({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredEvent(null)}
              className="cursor-pointer"
            >
              {/* Outer pulse ring */}
              <circle cx={x} cy={y} r={radius * 3} fill="none" stroke={color} strokeWidth="0.8" opacity="0.2">
                <animate attributeName="r" from={String(radius * 1.2)} to={String(radius * 4)} dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" repeatCount="indefinite" />
              </circle>
              {/* Inner pulse ring */}
              <circle cx={x} cy={y} r={radius * 2} fill="none" stroke={color} strokeWidth="0.5" opacity="0.3">
                <animate attributeName="r" from={String(radius)} to={String(radius * 2.5)} dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Glow */}
              <circle cx={x} cy={y} r={radius * 2} fill={glowColor} />
              {/* Core */}
              <circle cx={x} cy={y} r={radius * 0.8} fill={color} opacity="0.95" />
              <circle cx={x} cy={y} r={radius * 0.35} fill="white" opacity="0.9" />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredEvent && (
        <div
          className="fixed z-50 bg-[hsl(220,25%,8%)] border border-cyan-500/25 rounded-lg p-3 shadow-2xl max-w-[240px] pointer-events-none backdrop-blur-sm"
          style={{ left: tooltipPos.x + 14, top: tooltipPos.y - 12 }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${hoveredEvent.severity === 'critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : hoveredEvent.severity === 'high' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-yellow-500'}`} />
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wide">{hoveredEvent.type}</span>
            <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${hoveredEvent.severity === 'critical' ? 'bg-red-500/20 text-red-400' : hoveredEvent.severity === 'high' ? 'bg-amber-500/20 text-amber-400' : 'bg-yellow-500/20 text-yellow-300'}`}>
              {hoveredEvent.severity.toUpperCase()}
            </span>
          </div>
          <div className="text-[11px] text-cyan-400 font-medium mb-0.5">{hoveredEvent.location}</div>
          <div className="text-[10px] text-slate-300">{hoveredEvent.description}</div>
          <div className="text-[9px] text-slate-500 mt-1.5 font-mono">{formatTimeAgo(hoveredEvent.timestamp)}</div>
        </div>
      )}

      {/* Map legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-4 text-[9px] font-mono bg-[hsl(220,25%,6%)]/80 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-slate-700/50">
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]" /> <span className="text-red-400">CRITICAL</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.4)]" /> <span className="text-amber-400">HIGH</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.3)]" /> <span className="text-yellow-300">MEDIUM</span></div>
      </div>

      {/* Event count */}
      <div className="absolute top-3 right-3 text-[10px] font-mono bg-[hsl(220,25%,6%)]/80 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-cyan-500/20">
        <span className="text-cyan-400 font-bold">{threatEvents.length}</span>
        <span className="text-slate-400 ml-1">ACTIVE EVENTS</span>
      </div>
    </div>
  );
}
