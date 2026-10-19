import React, { useState } from 'react';
import { GraphTypeKey } from '../data/graphData';

interface ChartPreviewProps {
  type: GraphTypeKey;
  interactive?: boolean;
  compact?: boolean;
  customData?: any;
}

export const ChartPreview: React.FC<ChartPreviewProps> = ({
  type,
  compact = false,
}) => {
  switch (type) {
    case 'pie-chart':
      return <PieChartSvg compact={compact} />;
    case 'time-series':
      return <TimeSeriesSvg compact={compact} />;
    case 'histogram':
      return <HistogramSvg compact={compact} />;
    case 'stem-and-leaf':
      return <StemLeafSvg compact={compact} />;
    case 'compound-bar':
      return <CompoundBarSvg compact={compact} />;
    default:
      return null;
  }
};

// 1. PIE CHART SVG
export const PieChartSvg: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const slices = [
    { label: 'Cakes', pct: 40, color: '#F43F5E', angle: 144, valueText: '40% ($600)' },
    { label: 'Bread', pct: 30, color: '#FB7185', angle: 108, valueText: '30% ($450)' },
    { label: 'Pastries', pct: 20, color: '#FBBF24', angle: 72, valueText: '20% ($300)' },
    { label: 'Coffee', pct: 10, color: '#2DD4BF', angle: 36, valueText: '10% ($150)' },
  ];

  // Helper to convert polar to cartesian coordinates
  const getCoordinates = (angleInDegrees: number, radius: number, cx: number, cy: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + radius * Math.cos(angleInRadians),
      y: cy + radius * Math.sin(angleInRadians),
    };
  };

  const cx = 100;
  const cy = 100;
  const radius = compact ? 70 : 80;

  let currentAngle = 0;
  const slicePaths = slices.map((slice, index) => {
    const startAngle = currentAngle;
    const endAngle = currentAngle + slice.angle;
    currentAngle = endAngle;

    const start = getCoordinates(startAngle, radius, cx, cy);
    const end = getCoordinates(endAngle, radius, cx, cy);
    const largeArcFlag = slice.angle > 180 ? 1 : 0;

    const pathData = [
      `M ${cx} ${cy}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      'Z',
    ].join(' ');

    const midAngle = startAngle + slice.angle / 2;
    const labelPos = getCoordinates(midAngle, radius * 0.65, cx, cy);

    return {
      ...slice,
      index,
      pathData,
      labelPos,
    };
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div className={`relative ${compact ? 'h-44 w-44' : 'h-56 w-56'}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          {slicePaths.map((s) => {
            const isHovered = hoveredSlice === s.index;
            return (
              <g key={s.label} className="cursor-pointer transition-transform duration-200">
                <path
                  d={s.pathData}
                  fill={s.color}
                  stroke="#0F172A"
                  strokeWidth="2.5"
                  className={`transition-all duration-200 ${
                    isHovered ? 'brightness-125 scale-105 origin-center' : 'hover:opacity-90'
                  }`}
                  onMouseEnter={() => setHoveredSlice(s.index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
                <text
                  x={s.labelPos.x}
                  y={s.labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#FFFFFF"
                  className="text-[10px] font-bold pointer-events-none drop-shadow-md"
                >
                  {s.pct}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend / Key feature */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-xs">
        {slices.map((s, idx) => (
          <div
            key={s.label}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-colors ${
              hoveredSlice === idx ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span>{s.label}</span>
            <span className="text-slate-500 text-[11px]">({s.pct}%)</span>
          </div>
        ))}
      </div>

      <div className="mt-2 text-[11px] text-rose-300/90 font-mono tracking-tight bg-rose-950/40 px-2.5 py-1 rounded border border-rose-500/20">
        Rule: All slices total exactly 100% (360°)
      </div>
    </div>
  );
};

// 2. TIME SERIES SVG
export const TimeSeriesSvg: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const points = [
    { time: '06:00', temp: 37.1 },
    { time: '08:00', temp: 37.4 },
    { time: '10:00', temp: 38.2 },
    { time: '12:00', temp: 38.9 },
    { time: '14:00', temp: 38.5 },
    { time: '16:00', temp: 37.8 },
    { time: '18:00', temp: 37.2 },
  ];

  const width = 280;
  const height = compact ? 130 : 160;
  const padLeft = 36;
  const padBottom = 26;
  const padTop = 16;
  const padRight = 16;

  const graphWidth = width - padLeft - padRight;
  const graphHeight = height - padTop - padBottom;

  const minTemp = 36.5;
  const maxTemp = 39.5;

  const coords = points.map((p, i) => {
    const x = padLeft + (i / (points.length - 1)) * graphWidth;
    const y = padTop + graphHeight - ((p.temp - minTemp) / (maxTemp - minTemp)) * graphHeight;
    return { ...p, x, y };
  });

  const pathD = coords.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${padTop + graphHeight} L ${coords[0].x} ${padTop + graphHeight} Z`;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[320px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="timeSeriesGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[37.0, 38.0, 39.0].map((t) => {
            const y = padTop + graphHeight - ((t - minTemp) / (maxTemp - minTemp)) * graphHeight;
            return (
              <g key={t}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#334155"
                  strokeDasharray="2 2"
                  strokeWidth="0.8"
                />
                <text
                  x={padLeft - 6}
                  y={y + 3}
                  textAnchor="end"
                  fill="#94A3B8"
                  className="text-[9px] font-mono"
                >
                  {t}°
                </text>
              </g>
            );
          })}

          {/* Axis lines */}
          <line
            x1={padLeft}
            y1={padTop + graphHeight}
            x2={width - padRight}
            y2={padTop + graphHeight}
            stroke="#64748B"
            strokeWidth="1.2"
          />
          <line
            x1={padLeft}
            y1={padTop}
            x2={padLeft}
            y2={padTop + graphHeight}
            stroke="#64748B"
            strokeWidth="1.2"
          />

          {/* Fill under trend line */}
          <path d={areaD} fill="url(#timeSeriesGlow)" />

          {/* Trend line */}
          <path
            d={pathD}
            fill="none"
            stroke="#06B6D4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data nodes */}
          {coords.map((c, idx) => {
            const isHovered = hoveredPoint === idx;
            return (
              <g
                key={c.time}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(idx)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isHovered ? 5.5 : 3.5}
                  fill="#06B6D4"
                  stroke="#0F172A"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
                {/* X-axis labels */}
                <text
                  x={c.x}
                  y={padTop + graphHeight + 14}
                  textAnchor="middle"
                  fill="#94A3B8"
                  className="text-[8px] font-mono"
                >
                  {c.time}
                </text>

                {/* Hover value tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={c.x - 22}
                      y={c.y - 24}
                      width="44"
                      height="17"
                      rx="4"
                      fill="#0F172A"
                      stroke="#06B6D4"
                      strokeWidth="1"
                    />
                    <text
                      x={c.x}
                      y={c.y - 12}
                      textAnchor="middle"
                      fill="#E2E8F0"
                      className="text-[9px] font-bold font-mono"
                    >
                      {c.temp}°C
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 text-[11px] text-cyan-300/90 font-mono tracking-tight bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-500/20">
        Rule: Time on X-axis · Points connected in sequence
      </div>
    </div>
  );
};

// 3. HISTOGRAM / FREQUENCY DIAGRAM SVG
export const HistogramSvg: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [hoveredBin, setHoveredBin] = useState<number | null>(null);

  const bins = [
    { label: '12-13', count: 6 },
    { label: '13-14', count: 18 },
    { label: '14-15', count: 32 },
    { label: '15-16', count: 16 },
    { label: '16-17', count: 8 },
  ];

  const width = 280;
  const height = compact ? 130 : 160;
  const padLeft = 32;
  const padBottom = 26;
  const padTop = 18;
  const padRight = 16;

  const graphWidth = width - padLeft - padRight;
  const graphHeight = height - padTop - padBottom;
  const maxCount = 35;

  const barWidth = graphWidth / bins.length;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[320px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Y-axis grid marks */}
          {[10, 20, 30].map((v) => {
            const y = padTop + graphHeight - (v / maxCount) * graphHeight;
            return (
              <g key={v}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#334155"
                  strokeDasharray="2 2"
                  strokeWidth="0.8"
                />
                <text
                  x={padLeft - 5}
                  y={y + 3}
                  textAnchor="end"
                  fill="#94A3B8"
                  className="text-[9px] font-mono"
                >
                  {v}
                </text>
              </g>
            );
          })}

          {/* Axis lines */}
          <line
            x1={padLeft}
            y1={padTop + graphHeight}
            x2={width - padRight}
            y2={padTop + graphHeight}
            stroke="#64748B"
            strokeWidth="1.2"
          />
          <line
            x1={padLeft}
            y1={padTop}
            x2={padLeft}
            y2={padTop + graphHeight}
            stroke="#64748B"
            strokeWidth="1.2"
          />

          {/* Histogram Bars: TOUCHING WITH ZERO GAPS */}
          {bins.map((b, idx) => {
            const barHeight = (b.count / maxCount) * graphHeight;
            const x = padLeft + idx * barWidth;
            const y = padTop + graphHeight - barHeight;
            const isHovered = hoveredBin === idx;

            return (
              <g
                key={b.label}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredBin(idx)}
                onMouseLeave={() => setHoveredBin(null)}
              >
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={isHovered ? '#34D399' : '#10B981'}
                  stroke="#0F172A"
                  strokeWidth="1.5"
                  className="transition-colors duration-150"
                />
                {/* Bar frequency number inside or above bar */}
                <text
                  x={x + barWidth / 2}
                  y={y - 4}
                  textAnchor="middle"
                  fill="#A7F3D0"
                  className="text-[9px] font-mono font-bold"
                >
                  {b.count}
                </text>

                {/* X-axis interval */}
                <text
                  x={x + barWidth / 2}
                  y={padTop + graphHeight + 14}
                  textAnchor="middle"
                  fill="#94A3B8"
                  className="text-[8px] font-mono"
                >
                  {b.label}s
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 text-[11px] text-emerald-300/90 font-mono tracking-tight bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/20">
        Rule: Grouped continuous intervals · Zero gaps between bars
      </div>
    </div>
  );
};

// 4. STEM-AND-LEAF SVG / DISPLAY
export const StemLeafSvg: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [highlightedStem, setHighlightedStem] = useState<number | null>(null);

  const data = [
    { stem: 4, leaves: [2, 5, 8] },
    { stem: 5, leaves: [1, 4, 5, 8] },
    { stem: 6, leaves: [0, 2, 3, 5, 7, 8, 9], hasMedian: true, medianLeafIndex: 3 }, // 65 is median
    { stem: 7, leaves: [1, 2, 4, 5, 8] },
    { stem: 8, leaves: [1, 3, 5, 8] },
    { stem: 9, leaves: [1, 2, 5, 6, 8] },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-[320px]">
      <div className={`w-full bg-slate-950/80 rounded-lg p-3 border border-violet-500/30 font-mono ${compact ? 'text-xs' : 'text-sm'}`}>
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-violet-500/20 text-violet-300 font-semibold">
          <span className="w-14 text-center">Stem</span>
          <div className="h-4 w-px bg-violet-500/40" />
          <span className="flex-1 pl-4">Leaves (Ascending Order)</span>
        </div>

        <div className="space-y-1">
          {data.map((row) => {
            const isHovered = highlightedStem === row.stem;
            return (
              <div
                key={row.stem}
                className={`flex items-center transition-colors px-1 py-0.5 rounded cursor-pointer ${
                  isHovered ? 'bg-violet-900/40 text-violet-200' : 'text-slate-300'
                }`}
                onMouseEnter={() => setHighlightedStem(row.stem)}
                onMouseLeave={() => setHighlightedStem(null)}
              >
                {/* Stem Column */}
                <div className="w-14 text-center font-bold text-violet-400">
                  {row.stem}
                </div>

                {/* Vertical Divider Line */}
                <div className="h-5 w-px bg-violet-500/50" />

                {/* Leaves Column */}
                <div className="flex-1 pl-4 flex items-center gap-2 tracking-wider">
                  {row.leaves.map((leaf, lIdx) => {
                    const isMedianLeaf = row.hasMedian && row.medianLeafIndex === lIdx;
                    return (
                      <span
                        key={lIdx}
                        className={`inline-block w-4 text-center ${
                          isMedianLeaf
                            ? 'text-amber-300 font-bold underline decoration-amber-400'
                            : ''
                        }`}
                        title={isMedianLeaf ? 'Median value = 65' : `${row.stem}${leaf}`}
                      >
                        {leaf}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mandatory Key Box */}
        <div className="mt-3 pt-2 border-t border-violet-500/20 flex items-center justify-between text-[11px] text-violet-300/90 bg-violet-950/50 px-2 py-1 rounded">
          <span className="font-semibold text-violet-200">Mandatory Key:</span>
          <span>5 | 1 = 51 marks</span>
        </div>
      </div>

      <div className="mt-2 text-[11px] text-violet-300/90 font-mono tracking-tight bg-violet-950/40 px-2.5 py-1 rounded border border-violet-500/20">
        Rule: Preserves all exact raw values · Mandatory Key
      </div>
    </div>
  );
};

// 5. COMPOUND BAR CHART SVG
export const CompoundBarSvg: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);

  const categories = [
    { name: 'Football', groupA: 45, groupB: 22 },
    { name: 'Basket', groupA: 30, groupB: 35 },
    { name: 'Tennis', groupA: 15, groupB: 28 },
    { name: 'Swim', groupA: 20, groupB: 34 },
  ];

  const width = 280;
  const height = compact ? 130 : 160;
  const padLeft = 32;
  const padBottom = 26;
  const padTop = 18;
  const padRight = 16;

  const graphWidth = width - padLeft - padRight;
  const graphHeight = height - padTop - padBottom;
  const maxValue = 50;

  const clusterWidth = graphWidth / categories.length;
  const barWidth = clusterWidth * 0.35;
  const gap = clusterWidth * 0.05;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[320px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Y-axis grid marks */}
          {[20, 40].map((v) => {
            const y = padTop + graphHeight - (v / maxValue) * graphHeight;
            return (
              <g key={v}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#334155"
                  strokeDasharray="2 2"
                  strokeWidth="0.8"
                />
                <text
                  x={padLeft - 5}
                  y={y + 3}
                  textAnchor="end"
                  fill="#94A3B8"
                  className="text-[9px] font-mono"
                >
                  {v}
                </text>
              </g>
            );
          })}

          {/* Axis lines */}
          <line
            x1={padLeft}
            y1={padTop + graphHeight}
            x2={width - padRight}
            y2={padTop + graphHeight}
            stroke="#64748B"
            strokeWidth="1.2"
          />
          <line
            x1={padLeft}
            y1={padTop}
            x2={padLeft}
            y2={padTop + graphHeight}
            stroke="#64748B"
            strokeWidth="1.2"
          />

          {/* Grouped Bars */}
          {categories.map((cat, idx) => {
            const clusterX = padLeft + idx * clusterWidth;
            const bar1X = clusterX + (clusterWidth - (barWidth * 2 + gap)) / 2;
            const bar2X = bar1X + barWidth + gap;

            const h1 = (cat.groupA / maxValue) * graphHeight;
            const y1 = padTop + graphHeight - h1;

            const h2 = (cat.groupB / maxValue) * graphHeight;
            const y2 = padTop + graphHeight - h2;

            const isHovered = hoveredGroup === idx;

            return (
              <g
                key={cat.name}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredGroup(idx)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                {/* Bar A (e.g. Boys / Blue) */}
                <rect
                  x={bar1X}
                  y={y1}
                  width={barWidth}
                  height={h1}
                  fill="#38BDF8"
                  stroke="#0F172A"
                  strokeWidth="1"
                  className={`transition-opacity ${isHovered ? 'brightness-125' : ''}`}
                />
                {/* Bar B (e.g. Girls / Pink) */}
                <rect
                  x={bar2X}
                  y={y2}
                  width={barWidth}
                  height={h2}
                  fill="#F472B6"
                  stroke="#0F172A"
                  strokeWidth="1"
                  className={`transition-opacity ${isHovered ? 'brightness-125' : ''}`}
                />

                {/* X Category Label */}
                <text
                  x={clusterX + clusterWidth / 2}
                  y={padTop + graphHeight + 14}
                  textAnchor="middle"
                  fill="#94A3B8"
                  className="text-[8px] font-mono"
                >
                  {cat.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1.5 text-sky-400">
          <span className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
          <span>Boys</span>
        </div>
        <div className="flex items-center gap-1.5 text-pink-400">
          <span className="w-2.5 h-2.5 rounded-sm bg-pink-400" />
          <span>Girls</span>
        </div>
      </div>

      <div className="mt-2 text-[11px] text-amber-300/90 font-mono tracking-tight bg-amber-950/40 px-2.5 py-1 rounded border border-amber-500/20">
        Rule: Compares sub-groups side-by-side · Requires Legend
      </div>
    </div>
  );
};
