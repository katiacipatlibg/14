import { useState } from 'react';
import { motion } from 'motion/react';
import { flashcards } from '../data';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-fredoka text-adventure-dark mb-2">Tarjetas de Estudio</h2>
        <p className="text-slate-600 font-nunito">
          Tarjeta {currentIndex + 1} de {flashcards.length}
        </p>
      </div>

      <div className="relative w-full max-w-md aspect-[4/3] [perspective:1000px]">
        <motion.div
          className="w-full h-full relative [transform-style:preserve-3d] cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute w-full h-full [backface-visibility:hidden] bg-white rounded-3xl shadow-xl border-4 border-adventure-blue flex flex-col items-center justify-center p-8 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl sm:text-3xl font-fredoka text-adventure-dark">
              {currentCard.title}
            </h3>
            <p className="text-sm text-slate-400 mt-8 font-nunito flex items-center gap-1">
              <RotateCcw size={16} /> Toca para voltear
            </p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full [backface-visibility:hidden] bg-adventure-yellow rounded-3xl shadow-xl border-4 border-orange-400 flex flex-col items-center justify-center p-8 text-center [transform:rotateY(180deg)]">
            <p className="text-lg sm:text-xl font-nunito font-semibold text-slate-800 leading-relaxed">
              {currentCard.content}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button
          onClick={prevCard}
          className="p-4 bg-white rounded-full shadow-md text-adventure-blue hover:bg-blue-50 transition-colors border-2 border-blue-100"
        >
          <ChevronLeft size={32} />
        </button>
        <div className="flex gap-2">
          {flashcards.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-adventure-blue' : 'bg-blue-200'
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextCard}
          className="p-4 bg-white rounded-full shadow-md text-adventure-blue hover:bg-blue-50 transition-colors border-2 border-blue-100"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
