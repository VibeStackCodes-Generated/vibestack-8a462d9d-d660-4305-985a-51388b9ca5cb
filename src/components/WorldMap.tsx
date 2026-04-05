import { useState } from 'react';
import { threatEvents, getSeverityColor } from '@/lib/data';
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
    // North America
    'M 120,80 L 140,75 160,78 180,90 200,85 220,95 240,100 250,120 260,140 255,160 240,170 230,180 220,175 200,185 180,190 160,180 140,175 130,160 120,140 115,120 118,100 Z',
    // South America
    'M 200,210 L 215,205 230,215 240,230 245,250 248,270 245,290 240,310 230,325 220,330 210,325 200,310 195,290 190,270 192,250 195,230 Z',
    // Europe
    'M 420,75 L 440,70 460,72 480,78 490,85 495,95 490,105 480,110 470,115 460,112 450,108 440,105 430,100 425,90 Z',
    // Africa
    'M 420,140 L 440,135 460,138 480,145 490,160 495,180 498,200 495,220 490,240 480,260 470,270 460,268 445,260 435,245 425,225 420,200 418,180 415,160 Z',
    // Asia
    'M 500,60 L 530,55 560,58 590,62 620,68 650,72 680,78 700,85 720,95 730,110 725,125 710,135 690,140 670,138 650,135 630,130 610,128 590,125 570,120 550,115 530,108 510,100 505,85 Z',
    // Australia
    'M 700,250 L 720,245 740,248 760,255 770,265 768,280 760,290 745,295 730,292 715,285 710,270 705,258 Z',
    // Middle East
    'M 490,115 L 510,110 530,115 540,125 535,135 525,140 510,138 500,130 495,120 Z'
  ];

  return (
    <div className="relative w-full h-full bg-[hsl(222,25%,5%)] overflow-hidden rounded-md">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * (H / 6)} x2={W} y2={i * (H / 6)} stroke="hsl(215 20% 15%)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`v${i}`} x1={i * (W / 12)} y1={0} x2={i * (W / 12)} y2={H} stroke="hsl(215 20% 15%)" strokeWidth="0.5" />
        ))}

        {/* Continents */}
        {continentPaths.map((d, i) => (
          <path key={i} d={d} fill="hsl(215 20% 14%)" stroke="hsl(215 20% 22%)" strokeWidth="0.8" />
        ))}

        {/* Threat markers */}
        {threatEvents.map((event) => {
          const { x, y } = latLngToXY(event.lat, event.lng, W, H);
          const color = event.severity === 'critical' ? '#ef4444' : event.severity === 'high' ? '#f59e0b' : '#eab308';
          const radius = event.severity === 'critical' ? 6 : event.severity === 'high' ? 5 : 4;

          return (
            <g key={event.id}
              onMouseEnter={(e) => {
                setHoveredEvent(event);
                setTooltipPos({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredEvent(null)}
              className="cursor-pointer"
            >
              {/* Pulse ring */}
              <circle cx={x} cy={y} r={radius * 2.5} fill="none" stroke={color} strokeWidth="0.5" opacity="0.3">
                <animate attributeName="r" from={String(radius)} to={String(radius * 3)} dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Outer glow */}
              <circle cx={x} cy={y} r={radius * 1.5} fill={color} opacity="0.15" />
              {/* Core dot */}
              <circle cx={x} cy={y} r={radius * 0.7} fill={color} opacity="0.9" />
              <circle cx={x} cy={y} r={radius * 0.3} fill="white" opacity="0.8" />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredEvent && (
        <div
          className="fixed z-50 bg-[hsl(222,25%,10%)] border border-border rounded-md p-2.5 shadow-xl max-w-[220px] pointer-events-none"
          style={{ left: tooltipPos.x + 12, top: tooltipPos.y - 10 }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <div className={`w-2 h-2 rounded-full ${hoveredEvent.severity === 'critical' ? 'bg-red-500' : hoveredEvent.severity === 'high' ? 'bg-amber-500' : 'bg-yellow-500'}`} />
            <span className="text-[10px] font-mono font-semibold text-foreground uppercase">{hoveredEvent.type}</span>
          </div>
          <div className="text-[10px] text-muted-foreground mb-0.5">{hoveredEvent.location}</div>
          <div className="text-[10px] text-foreground/80">{hoveredEvent.description}</div>
          <div className="text-[9px] text-muted-foreground mt-1 font-mono">{formatTimeAgo(hoveredEvent.timestamp)}</div>
        </div>
      )}

      {/* Map legend */}
      <div className="absolute bottom-2 left-2 flex items-center gap-3 text-[9px] font-mono text-muted-foreground bg-background/60 backdrop-blur-sm rounded px-2 py-1">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> CRITICAL</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500" /> HIGH</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500" /> MEDIUM</div>
      </div>

      {/* Event count */}
      <div className="absolute top-2 right-2 text-[9px] font-mono text-muted-foreground bg-background/60 backdrop-blur-sm rounded px-2 py-1">
        {threatEvents.length} ACTIVE EVENTS
      </div>
    </div>
  );
}
