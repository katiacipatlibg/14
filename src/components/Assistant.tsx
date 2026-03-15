import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Matemático! Soy tu asistente de estudio de la Fase 3. ¡Pregúntame cualquier duda que tengas sobre el Programa Sintético!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Keep the chat instance in a ref to maintain history
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (!chatRef.current) {
      chatRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Eres un asistente experto en el "Programa de Estudio para la Educación Primaria: Programa Sintético de la Fase 3" de México.
          Responde de manera clara, educativa y amigable. Tu tono debe ser inspirado en Hora de Aventura (Adventure Time), usando expresiones divertidas y motivadoras (como "¡Algebraico!", "¡Matemático!", "¡Oh mis globos!"), pero manteniendo el rigor educativo.
          Ayuda a los docentes a entender los Campos Formativos (Lenguajes, Saberes y Pensamiento Científico, Ética, Naturaleza y Sociedades, De lo Humano y lo Comunitario) y el Programa Analítico.`
        }
      });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMessage.content });
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || '¡Oh mis globos! Hubo un error al procesar tu pregunta.'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: '¡Rayos! Parece que mi conexión mágica falló. Intenta de nuevo más tarde.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border-4 border-adventure-yellow overflow-hidden">
      {/* Header */}
      <div className="bg-adventure-yellow p-4 flex items-center gap-3 border-b-4 border-orange-300">
        <div className="bg-white p-2 rounded-full">
          <Bot className="text-orange-500 w-6 h-6" />
        </div>
        <div>
          <h2 className="font-fredoka text-xl text-slate-800">Asistente Fase 3</h2>
          <p className="text-xs font-nunito font-semibold text-orange-700">¡Listo para la aventura del saber!</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-adventure-blue text-white' : 'bg-orange-100 text-orange-500'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl font-nunito text-sm sm:text-base shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-adventure-blue text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2 max-w-[80%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 rounded-tl-none shadow-sm flex items-center">
                <Loader2 className="w-5 h-5 animate-spin text-orange-400" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta algo matemático o mágico..."
            className="flex-1 bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-3 font-nunito focus:outline-none focus:border-adventure-yellow focus:bg-white transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-adventure-yellow text-slate-800 p-3 rounded-xl hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
}
