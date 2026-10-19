import React, { useState } from 'react';
import { GRAPH_TYPES, GraphTypeKey, DECISION_TREE } from '../data/graphData';
import { ChartPreview } from './ChartPreviews';
import { HelpCircle, RotateCcw, ArrowRight, CheckCircle2, Sparkles, Lightbulb } from 'lucide-react';

interface DecisionWizardProps {
  onSelectGraphType?: (type: GraphTypeKey) => void;
}

export const DecisionWizard: React.FC<DecisionWizardProps> = ({
  onSelectGraphType,
}) => {
  const [selectedResult, setSelectedResult] = useState<GraphTypeKey | null>(null);
  const [activeWhy, setActiveWhy] = useState<string>('');

  const step = DECISION_TREE['start'];

  const handleSelectOption = (resultGraph: GraphTypeKey, whyRule?: string) => {
    setSelectedResult(resultGraph);
    setActiveWhy(whyRule || GRAPH_TYPES[resultGraph].goldenRule);
  };

  const handleReset = () => {
    setSelectedResult(null);
    setActiveWhy('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center justify-center gap-2">
          <span>Interactive Graph Decision Flowchart</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
          Unsure which graph fits your exam case? Identify your scenario's data signature below to discover the exact graph and mathematical reason.
        </p>
      </div>

      {!selectedResult ? (
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <HelpCircle className="w-4 h-4" />
            <span>Decision Step: Identify Data Characteristic</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 font-display">
            {step.question}
          </h3>
          <p className="text-xs text-slate-400 mb-5">
            {step.description}
          </p>

          <div className="space-y-3">
            {step.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => opt.resultGraph && handleSelectOption(opt.resultGraph, opt.whyRule)}
                className="w-full p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all text-left flex items-start justify-between group"
              >
                <div className="space-y-1 pr-4">
                  <div className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {opt.label}
                  </div>
                  <div className="text-xs text-slate-400">
                    {opt.description}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 mt-1" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result State */
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500/50 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                Decision Outcome
              </span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Another Scenario</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">
                Recommended Graph:
              </div>
              <h3
                className="text-2xl sm:text-3xl font-extrabold font-display"
                style={{ color: GRAPH_TYPES[selectedResult].primaryColor }}
              >
                {GRAPH_TYPES[selectedResult].name}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {GRAPH_TYPES[selectedResult].tagline}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs px-3 py-1 rounded font-mono border ${GRAPH_TYPES[selectedResult].badgeBg}`}>
                {GRAPH_TYPES[selectedResult].dataType}
              </span>
            </div>
          </div>

          {/* Why Rule Banner */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>Why This Graph Fits:</span>
            </div>
            <p className="text-slate-100 text-sm leading-relaxed font-medium">
              {activeWhy}
            </p>
          </div>

          {/* Interactive Visual Preview */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3">
              <span className="font-semibold text-slate-300">
                Visual Archetype:
              </span>
              <span className="text-[11px] text-cyan-400 font-mono">
                {GRAPH_TYPES[selectedResult].gapsRule}
              </span>
            </div>
            <ChartPreview type={selectedResult} compact={true} />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white"
            >
              &larr; Choose different data characteristic
            </button>

            {onSelectGraphType && (
              <button
                onClick={() => onSelectGraphType(selectedResult)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
              >
                Inspect {GRAPH_TYPES[selectedResult].shortName} Details &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
