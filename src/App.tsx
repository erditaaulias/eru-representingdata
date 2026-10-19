import React, { useState } from 'react';
import { SCENARIO_CARDS, GRAPH_TYPES, GraphTypeKey } from './data/graphData';
import { FlashcardDeck } from './components/FlashcardDeck';
import { VisualChartGuide } from './components/VisualChartGuide';
import { DecisionWizard } from './components/DecisionWizard';
import { QuizMode } from './components/QuizMode';
import { 
  Sparkles, 
  Layers, 
  HelpCircle, 
  BookOpen, 
  GraduationCap, 
  RotateCw,
  Eye,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'guide' | 'wizard' | 'quiz'>('flashcards');
  const [inspectorType, setInspectorType] = useState<GraphTypeKey>('pie-chart');

  const handleSelectGraphForGuide = (type: GraphTypeKey) => {
    setInspectorType(type);
    setActiveTab('guide');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* ========================================================= */}
      {/* TOP BAR CONTRACT: Zone 1 (Wordmark) — Zone 2 (Links) — Zone 3 (1 Action) */}
      {/* ========================================================= */}
      <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('flashcards');
          }}
          className="text-lg font-extrabold tracking-tight text-white font-display whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors"
        >
          DataViz 16.5
        </a>

        {/* Zone 2: 4-5 single-line clean text nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'flashcards' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'guide' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Chart Guide
          </button>
          <button
            onClick={() => setActiveTab('wizard')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'wizard' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Decision Wizard
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'quiz' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Practice Quiz
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('quiz')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Test Knowledge
          </button>
        </div>
      </header>

      {/* Hero Header Area */}
      <div className="border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-slate-950 py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>Cambridge Secondary Mathematics</span>
              <span aria-hidden="true">·</span>
              <span>Subtopic 16.5 Representing Data</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Differentiating Statistical Graph Types
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Front: Real-world scenarios in simple English. Back: The correct graph choice and clear 'Why' rules with vivid color clarity.
            </p>
          </div>

          {/* Quick Graph Badges / Visual Pills */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
            {Object.values(GRAPH_TYPES).map((g) => (
              <button
                key={g.id}
                onClick={() => handleSelectGraphForGuide(g.id)}
                className={`text-[11px] px-2.5 py-1 rounded-md border font-medium transition-all ${
                  g.badgeBg
                } hover:brightness-125`}
                title={`Explore ${g.name} rules`}
              >
                {g.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Bar Navigation (Below Header) */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'flashcards'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Interactive Flashcards ({SCENARIO_CARDS.length} Cases)</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'guide'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visual Chart Guide & Rules</span>
            </button>

            <button
              onClick={() => setActiveTab('wizard')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'wizard'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Decision Flowchart</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'quiz'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>10-Question Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 py-4">
        {activeTab === 'flashcards' && (
          <FlashcardDeck
            scenarios={SCENARIO_CARDS}
            onSelectGraphType={handleSelectGraphForGuide}
          />
        )}

        {activeTab === 'guide' && (
          <VisualChartGuide
            initialSelectedType={inspectorType}
            onPracticeWithGraph={(type) => {
              setActiveTab('flashcards');
            }}
          />
        )}

        {activeTab === 'wizard' && (
          <DecisionWizard
            onSelectGraphType={handleSelectGraphForGuide}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizMode scenarios={SCENARIO_CARDS} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 px-6 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-400">Subtopic 16.5: Representing Data</span>
            <span className="mx-2">·</span>
            <span>Pie Chart, Time Series, Histogram, Stem-and-Leaf, Compound Bar Chart</span>
          </div>
          <div className="text-slate-600">
            Engineered for conceptual clarity & visual precision
          </div>
        </div>
      </footer>
    </div>
  );
}
