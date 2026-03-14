import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, BookOpen, FileText, Search, X } from 'lucide-react';

const slides = [
  {
    title: "Welcome to Izwi!",
    description: "Your AI-powered business mentor and toolkit. Let's get you started.",
    icon: Brain,
    color: "text-emerald-600"
  },
  {
    title: "AI Business Mentor",
    description: "Ask questions, brainstorm ideas, and get professional advice anytime.",
    icon: Brain,
    color: "text-blue-600"
  },
  {
    title: "Market Research & Planning",
    description: "Conduct market research and generate professional business plans in minutes.",
    icon: Search,
    color: "text-purple-600"
  },
  {
    title: "Learn & Grow",
    description: "Access our curated library of lessons and resources to build your skills.",
    icon: BookOpen,
    color: "text-orange-600"
  }
];

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-2xl max-w-md w-full relative"
      >
        <button onClick={onComplete} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200">
          <X className="h-6 w-6" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className={`mx-auto w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center mb-6`}>
              {(() => {
                const Icon = slides[step].icon;
                return <Icon className={`h-8 w-8 ${slides[step].color}`} />;
              })()}
            </div>
            <h2 className="text-2xl font-bold mb-2 text-stone-900 dark:text-white">{slides[step].title}</h2>
            <p className="text-stone-600 dark:text-stone-300 mb-8">{slides[step].description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {slides.map((_, i) => (
              <div key={i} className={`h-2 w-2 rounded-full ${i === step ? 'bg-emerald-600' : 'bg-stone-200 dark:bg-stone-600'}`} />
            ))}
          </div>
          {step < slides.length - 1 ? (
            <button onClick={() => setStep(step + 1)} className="px-6 py-2 bg-emerald-600 text-white rounded-xl">Next</button>
          ) : (
            <button onClick={onComplete} className="px-6 py-2 bg-emerald-600 text-white rounded-xl">Get Started</button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
