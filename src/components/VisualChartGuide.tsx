import React, { useState } from 'react';
import { GRAPH_TYPES, GraphTypeKey, GraphTypeInfo } from '../data/graphData';
import { ChartPreview } from './ChartPreviews';
import { 
  CheckCircle2, 
  XCircle, 
  Info, 
  Sparkles, 
  AlertTriangle, 
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

interface VisualChartGuideProps {
  initialSelectedType?: GraphTypeKey;
  onPracticeWithGraph?: (type: GraphTypeKey) => void;
}

export const VisualChartGuide: React.FC<VisualChartGuideProps> = ({
  initialSelectedType = 'pie-chart',
  onPracticeWithGraph,
}) => {
  const [selectedType, setSelectedType] = useState<GraphTypeKey>(initialSelectedType);
  const [viewMode, setViewMode] = useState<'detail' | 'matrix'>('detail');

  const activeGraph: GraphTypeInfo = GRAPH_TYPES[selectedType];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4">
      {/* View Mode Toggle & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2">
            <span>Visual Chart Inspector & Rules</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Master the 5 core graph types with clear color-coded visual anatomy and non-negotiable Cambridge rules.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('detail')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'detail'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Deep Inspector
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'matrix'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Comparison Matrix
          </button>
        </div>
      </div>

      {viewMode === 'detail' ? (
        <div className="space-y-6">
          {/* Vibrant 5-Tab Selector with Distinct Visual Identities */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {Object.values(GRAPH_TYPES).map((g) => {
              const isSelected = selectedType === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setSelectedType(g.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 relative overflow-hidden ${
                    isSelected
                      ? `bg-slate-900 ${g.borderClass} ring-1 ring-offset-2 ring-offset-slate-950 ring-${g.primaryColor.slice(1)} shadow-lg`
                      : 'bg-slate-950/70 border-slate-800 hover:bg-slate-900/60 opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: isSelected ? g.primaryColor : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: g.primaryColor }}
                    />
                    <span className="text-[10px] uppercase font-mono text-slate-400">
                      Type {Object.keys(GRAPH_TYPES).indexOf(g.id) + 1}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-tight font-display">
                    {g.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {g.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Card for Selected Graph */}
          <div
            className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 ${activeGraph.borderClass} shadow-xl`}
          >
            {/* Top Bar for Selected Graph */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: activeGraph.primaryColor }}
                  />
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    Graph Type Blueprint
                  </span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-extrabold font-display"
                  style={{ color: activeGraph.primaryColor }}
                >
                  {activeGraph.name}
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  {activeGraph.tagline}
                </p>
              </div>

              {onPracticeWithGraph && (
                <button
                  onClick={() => onPracticeWithGraph(activeGraph.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors self-start md:self-auto"
                >
                  <span>Practice {activeGraph.shortName} Flashcards</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Split: Interactive SVG Live Visual & Rules Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Visual Rendering */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-4 flex items-center gap-1.5 self-start">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Live Interactive SVG Model:</span>
                </div>
                
                <ChartPreview type={activeGraph.id} compact={false} />

                {/* Anatomy Notes Below Chart */}
                <div className="w-full mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Visual Anatomy:
                  </div>
                  {activeGraph.anatomy.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: activeGraph.primaryColor }}
                      />
                      <span className="text-slate-200">
                        <strong className="text-white">{item.label}:</strong> {item.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Rules, When to use, Gaps, Pitfalls */}
              <div className="lg:col-span-7 space-y-4">
                {/* The Golden Rule */}
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>The Golden Rule:</span>
                  </div>
                  <p className="text-base text-slate-100 font-medium leading-relaxed">
                    {activeGraph.goldenRule}
                  </p>
                </div>

                {/* Primary Data Type & Gaps Rules Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-semibold text-slate-400 mb-1">
                      Data Nature:
                    </div>
                    <div className="text-xs text-slate-200 font-mono">
                      {activeGraph.dataType}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-semibold text-slate-400 mb-1">
                      Gaps / Layout Rule:
                    </div>
                    <div className="text-xs text-slate-200">
                      {activeGraph.gapsRule}
                    </div>
                  </div>
                </div>

                {/* Main Purpose */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  <div className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Primary Purpose:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {activeGraph.mainPurpose}
                  </p>
                </div>

                {/* Key Distinctive Feature */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  <div className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Distinctive Exam Clue:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {activeGraph.keyFeature}
                  </p>
                </div>

                {/* Common Exam Pitfall */}
                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs">
                  <div className="font-semibold text-rose-400 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Fatal Exam Mistake to Avoid:</span>
                  </div>
                  <p className="text-rose-200/90 leading-relaxed">
                    {activeGraph.commonPitfall}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* COMPARISON MATRIX (Cheat Sheet) */
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-950 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">
              Subtopic 16.5 Graph Comparison Cheat Sheet
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Side-by-side comparison matrix for quick exam revision.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-300 font-semibold">
                  <th className="p-3.5">Graph Type</th>
                  <th className="p-3.5">Primary Purpose</th>
                  <th className="p-3.5">Data Type</th>
                  <th className="p-3.5">Gaps Between Bars?</th>
                  <th className="p-3.5">Preserves Raw Values?</th>
                  <th className="p-3.5 min-w-[200px]">The Golden 'Why' Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {Object.values(GRAPH_TYPES).map((g) => (
                  <tr key={g.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-bold flex items-center gap-2" style={{ color: g.primaryColor }}>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.primaryColor }} />
                      <span>{g.name}</span>
                    </td>
                    <td className="p-3.5 text-slate-300">
                      {g.mainPurpose}
                    </td>
                    <td className="p-3.5 text-slate-400 font-mono">
                      {g.dataType}
                    </td>
                    <td className="p-3.5">
                      {g.id === 'histogram' ? (
                        <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                          NO GAPS (Contiguous)
                        </span>
                      ) : g.id === 'compound-bar' ? (
                        <span className="text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                          Gaps between categories
                        </span>
                      ) : (
                        <span className="text-slate-500">N/A</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      {g.id === 'stem-and-leaf' ? (
                        <span className="text-violet-400 font-bold bg-violet-950/60 px-2 py-0.5 rounded border border-violet-500/30">
                          YES (Every single value + Key)
                        </span>
                      ) : (
                        <span className="text-slate-500">No (Aggregated)</span>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-200">
                      {g.goldenRule}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
