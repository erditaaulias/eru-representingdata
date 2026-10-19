import React, { useState, useEffect } from 'react';
import { 
  ScenarioCard, 
  GRAPH_TYPES, 
  GraphTypeKey 
} from '../data/graphData';
import { ChartPreview } from './ChartPreviews';
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Eye, 
  Shuffle, 
  Check, 
  AlertTriangle,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlashcardDeckProps {
  scenarios: ScenarioCard[];
  onSelectGraphType?: (type: GraphTypeKey) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  scenarios,
  onSelectGraphType,
}) => {
  const [deck, setDeck] = useState<ScenarioCard[]>(scenarios);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedGuess, setSelectedGuess] = useState<GraphTypeKey | null>(null);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState<string>('all');
  const [showIndonesianHint, setShowIndonesianHint] = useState(false);

  // Filter scenarios
  useEffect(() => {
    let filtered = scenarios;
    if (filterType !== 'all') {
      filtered = scenarios.filter((s) => s.correctGraph === filterType);
    }
    setDeck(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedGuess(null);
  }, [filterType, scenarios]);

  const currentCard = deck[currentIndex] || deck[0];
  const graphInfo = currentCard ? GRAPH_TYPES[currentCard.correctGraph] : GRAPH_TYPES['pie-chart'];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setSelectedGuess(null);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setSelectedGuess(null);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedGuess(null);
  };

  const handleGuess = (typeKey: GraphTypeKey) => {
    setSelectedGuess(typeKey);
    setIsFlipped(true);
    if (typeKey === currentCard.correctGraph) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      setMasteredIds((prev) => new Set(prev).add(currentCard.id));
    }
  };

  const toggleMastery = (cardId: string) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentIndex, deck.length]);

  if (!currentCard) {
    return (
      <div className="p-8 text-center text-slate-400">
        No scenarios available for this filter.
      </div>
    );
  }

  const isGuessed = selectedGuess !== null;
  const isGuessCorrect = selectedGuess === currentCard.correctGraph;
  const isMastered = masteredIds.has(currentCard.id);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 py-4">
      {/* Top Filter & Deck Controls */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium text-xs">Filter by Graph:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({scenarios.length})
            </button>
            {Object.values(GRAPH_TYPES).map((g) => {
              const count = scenarios.filter((s) => s.correctGraph === g.id).length;
              return (
                <button
                  key={g.id}
                  onClick={() => setFilterType(g.id)}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors border ${
                    filterType === g.id
                      ? `${g.badgeBg} font-semibold`
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {g.shortName} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Shuffle Scenario Cards"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mastered: <strong className="text-emerald-400 font-mono">{masteredIds.size}</strong>/{scenarios.length}</span>
          </div>
        </div>
      </div>

      {/* Progress & Card Counter Header */}
      <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-200 font-semibold">
            Card {currentIndex + 1} of {deck.length}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 font-medium">Domain: {currentCard.category}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowIndonesianHint(!showIndonesianHint)}
            className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
              showIndonesianHint 
                ? 'bg-indigo-600 text-white font-medium' 
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>{showIndonesianHint ? 'Hide ID Note' : 'Bantuan ID'}</span>
          </button>

          <span className="text-slate-500 hidden sm:inline text-[11px] font-mono">
            [Space] flip · [←][→] next
          </span>
        </div>
      </div>

      {/* Optional Indonesian Helper Drawer */}
      {showIndonesianHint && (
        <div className="w-full mb-3 p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-lg text-xs text-indigo-200 animate-fadeIn">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-indigo-100">Catatan Ringkas / Terjemahan Bahasa Indonesia:</p>
              <p className="mt-0.5 text-indigo-200/90">{currentCard.indonesianSummary}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3D PERSPECTIVE CARD CONTAINER */}
      <div className="w-full min-h-[460px] perspective-1000 my-2 select-none">
        <div
          className={`relative w-full h-full min-h-[460px] duration-500 transform-style-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ========================================================= */}
          {/* FRONT CARD: Real-World Scenario in Simple English */}
          {/* ========================================================= */}
          <div
            className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 ${
              isGuessed
                ? isGuessCorrect
                  ? 'border-emerald-500/70 shadow-lg shadow-emerald-950/30'
                  : 'border-rose-500/70 shadow-lg shadow-rose-950/30'
                : 'border-slate-700/80 hover:border-slate-600'
            } p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-colors`}
          >
            <div>
              {/* Front Top Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                    Real-World Scenario · Front
                  </span>
                  <span className="text-slate-600">/</span>
                  <span className="text-xs text-slate-400 font-medium">
                    {currentCard.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isMastered && (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      <Check className="w-3 h-3" /> Mastered
                    </span>
                  )}
                  <button
                    onClick={handleFlip}
                    className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 px-3 py-1.5 rounded-md border border-cyan-500/30 font-medium transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Flip Card</span>
                  </button>
                </div>
              </div>

              {/* Title & Core Scenario Description in Simple English */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
                  {currentCard.title}
                </h3>
                
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-100 text-base sm:text-lg leading-relaxed">
                  "{currentCard.scenario}"
                </div>

                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>Core task:</strong> {currentCard.scenarioSimple}</span>
                </p>
              </div>

              {/* Real-World Data Snippet */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
                  <span>Collected Sample Data Preview:</span>
                  {currentCard.dataSnippet.notes && (
                    <span className="text-[11px] text-slate-500 font-normal italic">
                      {currentCard.dataSnippet.notes}
                    </span>
                  )}
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/80 p-2.5">
                  <table className="w-full text-xs text-left font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-medium">
                        {currentCard.dataSnippet.headers.map((h, i) => (
                          <th key={i} className="px-2.5 py-1 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentCard.dataSnippet.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="text-slate-300 hover:bg-slate-900/50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-2.5 py-1 whitespace-nowrap">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Front Bottom Interactive "Guess the Graph" Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">
                  Which graph is the correct choice? (Click to reveal Back):
                </span>
                <span className="text-[11px] text-slate-500">
                  Click an option or 'Flip Card'
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.values(GRAPH_TYPES).map((g) => {
                  return (
                    <button
                      key={g.id}
                      onClick={() => handleGuess(g.id)}
                      className={`px-3 py-2 text-xs rounded-lg font-medium border text-center transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                        g.badgeBg
                      } hover:brightness-125 hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <span className="font-semibold text-slate-100">{g.shortName}</span>
                      <span className="text-[10px] opacity-80 line-clamp-1">{g.dataType.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BACK CARD: Correct Choice, 'Why' Rule & Visual Chart */}
          {/* ========================================================= */}
          <div
            className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 ${
              graphInfo.borderClass
            } p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto`}
          >
            <div>
              {/* Back Top Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: graphInfo.primaryColor }}
                  />
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                    Answer & 'Why' Rule · Back
                  </span>
                  <span className="text-slate-600">/</span>
                  <span className="text-xs text-slate-400">
                    {currentCard.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleMastery(currentCard.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                      isMastered
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isMastered ? 'Marked Mastered' : 'Mark as Mastered'}</span>
                  </button>

                  <button
                    onClick={handleFlip}
                    className="flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-md border border-slate-700 font-medium transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Front</span>
                  </button>
                </div>
              </div>

              {/* Main Result Headline with Distinctive Color Coding */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <div className="text-xs text-slate-400 font-medium mb-1">
                    Correct Graph Type:
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display"
                      style={{ color: graphInfo.primaryColor }}
                    >
                      {graphInfo.name}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded font-mono border ${graphInfo.badgeBg}`}>
                      {graphInfo.shortName}
                    </span>
                  </div>
                </div>

                {/* Guess Feedback if user guessed */}
                {selectedGuess && (
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      isGuessCorrect
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {isGuessCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Spot on! You selected {graphInfo.shortName}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>You chose {GRAPH_TYPES[selectedGuess]?.shortName || selectedGuess}</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Two-Column Explanation & Live Chart Visualization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Left: The "Why" Rule & Trigger Clues */}
                <div className="space-y-3">
                  {/* The Golden "Why" Rule Box */}
                  <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/80">
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>The 'Why' Rule:</span>
                    </div>
                    <p className="text-slate-100 text-sm leading-relaxed font-medium">
                      {currentCard.whyRule}
                    </p>
                  </div>

                  {/* Trigger Clues in Scenario */}
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <div className="text-xs font-semibold text-slate-400 mb-1.5">
                      Key Clues in the Prompt:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentCard.keywordClues.map((clue, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-slate-900 border border-slate-700 text-cyan-300 px-2 py-0.5 rounded font-mono"
                        >
                          "{clue}"
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pitfall to avoid */}
                  <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200">
                    <div className="flex items-center gap-1 text-rose-400 font-semibold mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Common Exam Trap / Pitfall:</span>
                    </div>
                    <p className="leading-relaxed text-slate-300">
                      {currentCard.pitfallWarning}
                    </p>
                  </div>
                </div>

                {/* Right: Live Visual Chart Preview */}
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                  <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-slate-300 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      Visual Model:
                    </span>
                    <button
                      onClick={() => onSelectGraphType && onSelectGraphType(currentCard.correctGraph)}
                      className="text-cyan-400 hover:text-cyan-300 text-[11px] underline"
                    >
                      Explore in Visual Guide &rarr;
                    </button>
                  </div>

                  {/* Render Chart Component */}
                  <div className="w-full flex justify-center py-1">
                    <ChartPreview type={currentCard.correctGraph} compact={true} />
                  </div>
                </div>
              </div>
            </div>

            {/* Back Card Bottom Navigation */}
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Case</span>
              </button>

              <button
                onClick={handleFlip}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                Return to Scenario
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors shadow-sm"
              >
                <span>Next Case</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Deck Controls Below Card */}
      <div className="w-full flex items-center justify-between mt-4 px-2">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-sm font-medium border border-slate-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-2">
          {deck.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                setIsFlipped(false);
                setSelectedGuess(null);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex
                  ? 'w-6 bg-cyan-400'
                  : masteredIds.has(deck[i]?.id)
                  ? 'bg-emerald-400'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              title={`Jump to scenario ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold shadow-md transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
