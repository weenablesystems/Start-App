export interface Product {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'template' | 'tool';
  content?: string; // For lessons/guides
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  products: Product[];
}

export const productLibrary: Category[] = [
  {
    id: 'edu',
    name: 'Educational Digital Products',
    icon: 'BookOpen',
    products: [
      { id: 'edu-1', title: 'Financial Literacy Guide', description: 'Comprehensive guide to personal finance.', type: 'guide', content: '...content...' },
      { id: 'edu-2', title: 'Business Start-up Guide', description: 'Step-by-step guide to launching your startup.', type: 'guide', content: '...content...' },
    ]
  },
  {
    id: 'biz',
    name: 'Business & Entrepreneurship',
    icon: 'Briefcase',
    products: [
      { id: 'biz-1', title: 'Business Plan Generator', description: 'Generate a professional business plan.', type: 'tool' },
      { id: 'biz-2', title: 'Branding Kit Template', description: 'Template for your brand identity.', type: 'template' },
    ]
  },
  {
    id: 'social',
    name: 'Social Media & Content',
    icon: 'Share2',
    products: [
      { id: 'social-1', title: 'Content Calendar Template', description: 'Plan your social media content.', type: 'template' },
      { id: 'social-2', title: 'Instagram Highlight Covers', description: 'Design templates for highlights.', type: 'template' },
    ]
  },
  {
    id: 'fin',
    name: 'Finance Digital Products',
    icon: 'DollarSign',
    products: [
      { id: 'fin-1', title: 'Budget Planner', description: 'Tool to track your income and expenses.', type: 'tool' },
      { id: 'fin-2', title: 'Investment Tracker', description: 'Tool to monitor your investments.', type: 'tool' },
    ]
  },
  {
    id: 'dev',
    name: 'Personal Development',
    icon: 'Target',
    products: [
      { id: 'dev-1', title: 'Habit Tracker', description: 'Tool to build and track habits.', type: 'tool' },
      { id: 'dev-2', title: 'Guided Journal', description: 'Template for daily reflection.', type: 'template' },
    ]
  }
];
