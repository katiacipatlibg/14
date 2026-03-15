import { useState } from 'react';
import { motion } from 'motion/react';
import { questions } from '../data';
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    if (index === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl border-4 border-adventure-pink max-w-md w-full"
        >
          <Trophy className="w-24 h-24 text-adventure-yellow mx-auto mb-6" />
          <h2 className="text-3xl font-fredoka text-adventure-dark mb-4">¡Examen Terminado!</h2>
          <p className="text-xl font-nunito mb-6">
            Tu puntuación: <span className="font-bold text-adventure-pink">{score}</span> de {questions.length}
          </p>
          <button
            onClick={restart}
            className="w-full py-4 bg-adventure-pink text-white rounded-xl font-fredoka text-xl hover:bg-pink-500 transition-colors shadow-md"
          >
            Intentar de nuevo
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-fredoka text-adventure-dark">Preguntas tipo examen</h2>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border-2 border-pink-100">
          <span className="font-fredoka text-adventure-pink">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border-4 border-adventure-pink mb-6"
      >
        <h3 className="text-lg sm:text-xl font-nunito font-bold text-slate-800 mb-6 leading-relaxed">
          {currentQuestion.question}
        </h3>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            let btnClass = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
            let icon = null;

            if (showResult) {
              if (idx === currentQuestion.answer) {
                btnClass = "bg-green-100 border-green-400 text-green-800";
                icon = <CheckCircle2 className="text-green-500" />;
              } else if (idx === selectedOption) {
                btnClass = "bg-red-100 border-red-400 text-red-800";
                icon = <XCircle className="text-red-500" />;
              } else {
                btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${btnClass}`}
              >
                <span className="font-nunito font-semibold text-sm sm:text-base">{option}</span>
                {icon && <span className="ml-2 flex-shrink-0">{icon}</span>}
              </button>
            );
          })}
        </div>
      </motion.div>

      {showResult && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-end"
        >
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-4 bg-adventure-pink text-white rounded-xl font-fredoka text-lg hover:bg-pink-500 transition-colors shadow-md"
          >
            {currentIndex < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
            <ArrowRight size={20} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
