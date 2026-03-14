import { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Search, Loader2 } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function MarketResearch() {
  const [topic, setTopic] = useState('');
  const [report, setReport] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const runResearch = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setReport('');

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Conduct market research on: ${topic}. Include industry trends, competitor analysis, and target audience demographics. Present in a clear, concise report format.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      setReport(response.text || 'No report generated.');
    } catch (error) {
      console.error(error);
      setReport('An error occurred during research.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-white">AI Market Research Tool</h2>
      <div className="flex gap-2">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter industry or business idea..."
          className="flex-1 p-3 border border-stone-200 dark:border-stone-600 dark:bg-stone-900 rounded-lg dark:text-stone-100"
        />
        <button onClick={runResearch} className="bg-emerald-600 dark:bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-800 flex items-center gap-2">
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Search className="h-5 w-5" />}
          Run Research
        </button>
      </div>
      {report && (
        <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 prose prose-stone dark:prose-invert max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-stone-800 dark:text-stone-200">{report}</pre>
        </div>
      )}
    </div>
  );
}
