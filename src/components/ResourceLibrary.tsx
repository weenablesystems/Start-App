import { useState } from 'react';
import { BookOpen, Youtube, Loader2, Briefcase, Share2, DollarSign, Target, FileText, Filter } from 'lucide-react';
import { productLibrary, Product } from '../data/productLibrary';

const icons: Record<string, any> = { BookOpen, Briefcase, Share2, DollarSign, Target };

export default function ResourceLibrary() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const startProduct = (product: Product) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveProduct(product);
      setIsLoading(false);
    }, 1000);
  };

  const filteredLibrary = productLibrary
    .filter(cat => selectedCategory === 'all' || cat.id === selectedCategory)
    .map(cat => ({
      ...cat,
      products: cat.products.filter(p => selectedType === 'all' || p.type === selectedType)
    }))
    .filter(cat => cat.products.length > 0);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 text-emerald-600 animate-spin mb-4" />
        <p className="text-lg font-medium text-stone-900 dark:text-white">Preparing your product...</p>
      </div>
    );
  }

  if (activeProduct) {
    return (
      <div className="space-y-4">
        <button onClick={() => setActiveProduct(null)} className="text-stone-500 hover:text-stone-900 dark:hover:text-white">← Back to Library</button>
        <div className="p-8 bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700">
          <h2 className="text-3xl font-bold mb-4 text-stone-900 dark:text-white">{activeProduct.title}</h2>
          <p className="text-stone-600 dark:text-stone-300 mb-6">{activeProduct.description}</p>
          {activeProduct.type === 'tool' && (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
              <p className="text-emerald-800 dark:text-emerald-200">Tool interface for {activeProduct.title} would be here.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="text-3xl font-bold text-stone-900 dark:text-white">Digital Product Library</h2>
        
        <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-stone-800 p-4 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-sm">
          <div className="flex items-center gap-2 text-stone-500">
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filter:</span>
          </div>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="bg-stone-100 dark:bg-stone-700 p-2 rounded-lg text-stone-900 dark:text-white">
            <option value="all">All Categories</option>
            {productLibrary.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="bg-stone-100 dark:bg-stone-700 p-2 rounded-lg text-stone-900 dark:text-white">
            <option value="all">All Types</option>
            <option value="guide">Guides</option>
            <option value="template">Templates</option>
            <option value="tool">Tools</option>
          </select>
        </div>
      </div>
      
      {filteredLibrary.length > 0 ? (
        filteredLibrary.map(cat => {
          const Icon = icons[cat.icon] || BookOpen;
          return (
            <section key={cat.id}>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-stone-900 dark:text-white">
                <Icon className="h-6 w-6 text-emerald-600" /> {cat.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.products.map(p => (
                  <div key={p.id} className="p-6 bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-sm hover:shadow-md transition">
                    <h4 className="font-bold text-lg text-stone-900 dark:text-white mb-2">{p.title}</h4>
                    <p className="text-stone-600 dark:text-stone-400 mb-6">{p.description}</p>
                    <button onClick={() => startProduct(p)} className="w-full bg-stone-100 dark:bg-stone-700 hover:bg-emerald-600 hover:text-white text-stone-900 dark:text-white font-medium py-2 rounded-lg transition">
                      {p.type === 'tool' ? 'Open Tool' : 'View Content'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <p className="text-center text-stone-500 py-12">No products found matching your filters.</p>
      )}
    </div>
  );
}
