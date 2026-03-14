import { useState } from 'react';
import { Sparkles, Download, Image as ImageIcon } from 'lucide-react';

export default function BrandAssetsGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAsset = async () => {
    if (!prompt) return;
    setLoading(true);
    // Simulating generation process
    setTimeout(() => {
      setGeneratedImage(`https://picsum.photos/seed/${encodeURIComponent(prompt)}/800/600`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-library-brown rounded-3xl border border-library-brown/20">
      <h2 className="text-3xl font-bold text-library-brown dark:text-library-beige">Brand Assets Generator</h2>
      <p className="text-library-brown/70 dark:text-library-beige/70">Generate photorealistic logos and marketing images for 🎓Start-App™.</p>
      
      <div className="flex gap-4">
        <input 
          type="text" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A minimalist logo for a library-themed startup..."
          className="flex-grow p-3 rounded-xl border border-library-brown/20 bg-library-beige dark:bg-library-brown/50"
        />
        <button 
          onClick={generateAsset}
          disabled={loading}
          className="bg-library-burnt-orange text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-library-burnt-orange/90 disabled:opacity-50"
        >
          {loading ? 'Generating...' : <><Sparkles /> Generate</>}
        </button>
      </div>

      {generatedImage && (
        <div className="mt-6 border-2 border-library-brown/20 rounded-2xl overflow-hidden">
          <img src={generatedImage} alt="Generated Asset" className="w-full h-auto" referrerPolicy="no-referrer" />
          <div className="p-4 bg-library-beige dark:bg-library-brown/50 flex justify-between items-center">
            <span className="text-sm font-medium">Generated Asset</span>
            <a href={generatedImage} download="brand-asset.jpg" className="flex items-center gap-2 text-library-burnt-orange hover:underline">
              <Download size={16} /> Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
