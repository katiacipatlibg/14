import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckSquare, Briefcase, Bot } from 'lucide-react';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';
import Cases from './components/Cases';
import Assistant from './components/Assistant';

export default function App() {
  const [activeTab, setActiveTab] = useState('flashcards');

  const tabs = [
    { id: 'flashcards', label: 'Tarjetas', icon: BookOpen, color: 'text-adventure-blue' },
    { id: 'quiz', label: 'Examen', icon: CheckSquare, color: 'text-adventure-pink' },
    { id: 'cases', label: 'Casos', icon: Briefcase, color: 'text-adventure-green' },
    { id: 'assistant', label: 'Asistente', icon: Bot, color: 'text-adventure-yellow' },
  ];

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed top-20 left-10 text-6xl opacity-20 pointer-events-none">☁️</div>
      <div className="fixed top-40 right-20 text-5xl opacity-20 pointer-events-none">☁️</div>
      <div className="fixed bottom-32 left-20 text-6xl opacity-20 pointer-events-none">🌲</div>
      <div className="fixed bottom-20 right-10 text-7xl opacity-20 pointer-events-none">⛰️</div>

      {/* Header */}
      <header className="bg-adventure-blue text-white p-4 sm:p-6 shadow-lg relative z-10 border-b-4 border-blue-600">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-fredoka tracking-wide drop-shadow-md">
              Fase 3: ¡Hora de Estudiar!
            </h1>
            <p className="text-blue-100 text-sm sm:text-base font-nunito font-semibold mt-1">
              Programa Sintético de Educación Primaria
            </p>
          </div>
          <div className="text-4xl hidden sm:flex gap-2 drop-shadow-md">
            👦🏼🐶👑
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 mt-4 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'flashcards' && <Flashcards />}
            {activeTab === 'quiz' && <Quiz />}
            {activeTab === 'cases' && <Cases />}
            {activeTab === 'assistant' && <Assistant />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.1)] z-50 border-t-4 border-slate-200">
        <div className="max-w-4xl mx-auto flex justify-around p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-slate-100 scale-110' : 'hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${isActive ? tab.color : 'text-slate-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-xs sm:text-sm font-fredoka mt-1 ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`w-1 h-1 rounded-full mt-1 bg-current ${tab.color}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Watermark */}
      <div className="fixed bottom-24 right-4 opacity-60 pointer-events-none z-40 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/40 shadow-sm">
        <p className="font-fredoka text-sm sm:text-base text-slate-600 flex items-center gap-2">
          <span>✨</span> Miss Karu
        </p>
      </div>
    </div>
  );
}
