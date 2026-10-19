import React, { useState } from 'react';
import { ScenarioCard, GRAPH_TYPES, GraphTypeKey } from '../data/graphData';
import { ChartPreview } from './ChartPreviews';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Lightbulb, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModeProps {
  scenarios: ScenarioCard[];
}

export const QuizMode: React.FC<QuizModeProps> = ({ scenarios }) => {
  const [quizQuestions, setQuizQuestions] = useState<ScenarioCard[]>(() => {
    return [...scenarios].sort(() => Math.random() - 0.5).slice(0, 10);
  });
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<GraphTypeKey | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [history, setHistory] = useState<{ card: ScenarioCard; answer: GraphTypeKey; correct: boolean }[]>([]);

  const currentQ = quizQuestions[currentQIndex];

  const handleSelectOption = (graphKey: GraphTypeKey) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(graphKey);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    const isCorrect = selectedAnswer === currentQ.correctGraph;
    if (isCorrect) {
      setScore((s) => s + 1);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
      });
    }
    setHistory((prev) => [...prev, { card: currentQ, answer: selectedAnswer, correct: isCorrect }]);
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < quizQuestions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  const handleRestartQuiz = () => {
    setQuizQuestions([...scenarios].sort(() => Math.random() - 0.5).slice(0, 10));
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setHistory([]);
  };

  if (quizFinished) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center mx-auto mb-4 text-cyan-400">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-1">
            Exam Practice Complete!
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Subtopic 16.5 Graph Differentiation Challenge
          </p>

          <div className="inline-flex items-center gap-6 p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6">
            <div>
              <div className="text-xs text-slate-400">Final Score</div>
              <div className="text-3xl font-extrabold text-cyan-400 font-mono">
                {score} / {quizQuestions.length}
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <div className="text-xs text-slate-400">Accuracy</div>
              <div className="text-3xl font-extrabold text-white font-mono">
                {percentage}%
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto mb-6">
            {percentage >= 80
              ? 'Excellent mastery! You clearly know the criteria for continuous time series, histograms, stem-and-leaf, and compound charts.'
              : 'Good effort! Review the flashcard deck to solidify why certain continuous intervals require a histogram versus a line graph.'}
          </p>

          <button
            onClick={handleRestartQuiz}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm mx-auto shadow-md transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake 10-Question Quiz</span>
          </button>

          {/* Answer Breakdown */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-left">
            <h4 className="text-sm font-bold text-slate-300 mb-3">
              Performance Breakdown:
            </h4>
            <div className="space-y-2">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-xs flex items-start justify-between gap-3 ${
                    item.correct
                      ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-200'
                      : 'bg-rose-950/20 border-rose-500/20 text-rose-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-white">
                      Q{idx + 1}: {item.card.title}
                    </div>
                    <div className="text-slate-400 mt-0.5">
                      Correct: <strong className="text-emerald-400">{GRAPH_TYPES[item.card.correctGraph].shortName}</strong>
                      {!item.correct && (
                        <span> · Your answer: <strong className="text-rose-400">{GRAPH_TYPES[item.answer]?.shortName || item.answer}</strong></span>
                      )}
                    </div>
                  </div>
                  <div>
                    {item.correct ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      {/* Quiz Header & Progress */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-cyan-400 font-bold">
            Question {currentQIndex + 1} of {quizQuestions.length}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">Score: <strong className="text-white font-mono">{score}</strong></span>
        </div>

        <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-cyan-500 h-full transition-all duration-300"
            style={{ width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Scenario Question Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Real-World Scenario #{currentQIndex + 1}
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            {currentQ.category}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white font-display">
          {currentQ.title}
        </h3>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-100 text-sm sm:text-base leading-relaxed">
          "{currentQ.scenario}"
        </div>

        {/* 5 Graph Choice Options */}
        <div className="pt-2">
          <div className="text-xs font-semibold text-slate-300 mb-2.5">
            Select the most appropriate statistical graph type:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {Object.values(GRAPH_TYPES).map((g) => {
              const isSelected = selectedAnswer === g.id;
              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (g.id === currentQ.correctGraph) {
                  btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50';
                } else if (isSelected && g.id !== currentQ.correctGraph) {
                  btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-40';
                }
              } else if (isSelected) {
                btnStyle = 'bg-cyan-950 border-cyan-500 text-cyan-200 ring-2 ring-cyan-500/50';
              }

              return (
                <button
                  key={g.id}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(g.id)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${btnStyle}`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: g.primaryColor }}
                  />
                  <span className="text-xs font-bold leading-tight">{g.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit or Next Question Action */}
        <div className="pt-2 flex justify-end">
          {!isAnswerSubmitted ? (
            <button
              disabled={!selectedAnswer}
              onClick={handleSubmitAnswer}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedAnswer
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer shadow-md'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Confirm Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md cursor-pointer"
            >
              <span>{currentQIndex + 1 < quizQuestions.length ? 'Next Question' : 'View Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Post-Submit 'Why' Rule & Feedback */}
        {isAnswerSubmitted && (
          <div
            className={`p-4 rounded-xl border mt-4 text-xs animate-fadeIn ${
              selectedAnswer === currentQ.correctGraph
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1.5">
              {selectedAnswer === currentQ.correctGraph ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Correct! {GRAPH_TYPES[currentQ.correctGraph].name} is the exact choice.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Incorrect. The right graph is {GRAPH_TYPES[currentQ.correctGraph].name}.</span>
                </>
              )}
            </div>

            <p className="text-slate-100 text-xs sm:text-sm leading-relaxed mb-2">
              <strong className="text-amber-300">The 'Why' Rule:</strong> {currentQ.whyRule}
            </p>

            <div className="text-slate-300 text-[11px] pt-1 border-t border-slate-800/80">
              <strong className="text-slate-400">Exam Trap Warning:</strong> {currentQ.pitfallWarning}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
