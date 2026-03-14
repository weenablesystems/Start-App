import { useState } from 'react';
import { CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface Module {
  id: string;
  title: string;
  content: string;
  quiz: Question[];
  exercise: string;
}

const modules: Module[] = [
  {
    id: 'm1',
    title: 'Business Model Canvas',
    content: 'The Business Model Canvas is a strategic management tool...',
    quiz: [
      { question: 'What is the primary purpose of the BMC?', options: ['To write a 50-page plan', 'To visualize your business model', 'To calculate taxes'], correct: 1 }
    ],
    exercise: 'Draft your own BMC using the 9 building blocks.'
  }
];

export default function TrainingModule({ moduleId, onBack }: { moduleId: string, onBack: () => void }) {
  const module = modules.find(m => m.id === moduleId)!;
  const [quizState, setQuizState] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="space-y-6 bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700">
      <button onClick={onBack} className="text-emerald-700 dark:text-emerald-300 font-medium">&larr; Back to Library</button>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-white">{module.title}</h2>
      <div className="prose prose-stone dark:prose-invert max-w-none">{module.content}</div>
      
      <div className="border-t border-stone-100 dark:border-stone-700 pt-6">
        <h3 className="text-lg font-semibold mb-4 text-stone-900 dark:text-white">Quiz</h3>
        {module.quiz.map((q, i) => (
          <div key={i} className="mb-4">
            <p className="font-medium text-stone-900 dark:text-stone-300">{q.question}</p>
            {q.options.map((opt, j) => (
              <button key={j} onClick={() => !showResults && setQuizState(prev => [...prev.filter((_, idx) => idx !== i), j])} className={`block w-full text-left p-2 rounded ${quizState[i] === j ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100' : 'bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200'}`}>
                {opt}
              </button>
            ))}
          </div>
        ))}
        <button onClick={() => setShowResults(true)} className="bg-emerald-600 dark:bg-emerald-700 text-white px-4 py-2 rounded-lg">Submit Quiz</button>
      </div>

      <div className="border-t border-stone-100 dark:border-stone-700 pt-6">
        <h3 className="text-lg font-semibold mb-4 text-stone-900 dark:text-white">Practical Exercise</h3>
        <p className="bg-stone-50 dark:bg-stone-900 p-4 rounded-lg border border-stone-200 dark:border-stone-600 text-stone-800 dark:text-stone-200">{module.exercise}</p>
      </div>
    </div>
  );
}
