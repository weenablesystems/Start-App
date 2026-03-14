import { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { FileText, Loader2 } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function BusinessPlanGenerator() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ idea: '', market: '', competition: '', financials: '', marketing: '' });
  const [plan, setPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { key: 'idea', label: 'Business Idea' },
    { key: 'market', label: 'Target Market' },
    { key: 'competition', label: 'Competition' },
    { key: 'financials', label: 'Financial Projections' },
    { key: 'marketing', label: 'Marketing Strategy' },
  ];

  const generatePlan = async () => {
    setIsLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a professional business plan based on: ${JSON.stringify(data)}`,
      });
      setPlan(response.text || 'No plan generated.');
    } catch (error) {
      console.error(error);
      setPlan('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (plan) {
    return (
      <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 prose prose-stone dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-stone-900 dark:text-white">Your Business Plan</h2>
        <pre className="whitespace-pre-wrap font-sans text-stone-800 dark:text-stone-200">{plan}</pre>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700">
      <h2 className="text-2xl font-bold mb-6 text-stone-900 dark:text-white">Guided Business Plan Generator</h2>
      <div className="space-y-4">
        <label className="block font-medium text-stone-900 dark:text-stone-300">{steps[step].label}</label>
        <textarea
          value={data[steps[step].key as keyof typeof data]}
          onChange={(e) => setData({ ...data, [steps[step].key]: e.target.value })}
          className="w-full p-3 border border-stone-200 dark:border-stone-600 dark:bg-stone-900 rounded-lg h-32 dark:text-stone-100"
        />
        <div className="flex justify-between">
          <button disabled={step === 0} onClick={() => setStep(step - 1)} className="px-4 py-2 bg-stone-100 dark:bg-stone-700 rounded-lg text-stone-900 dark:text-stone-100">Back</button>
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(step + 1)} className="px-4 py-2 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg">Next</button>
          ) : (
            <button onClick={generatePlan} className="px-4 py-2 bg-emerald-700 dark:bg-emerald-800 text-white rounded-lg flex items-center gap-2">
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <FileText className="h-5 w-5" />}
              Generate Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
