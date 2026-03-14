export const categories = [
  { id: 'cat1', name: 'Business Strategy' },
  { id: 'cat2', name: 'Marketing & Sales' },
  { id: 'cat3', name: 'Finance & Accounting' },
  { id: 'cat4', name: 'Operations & Management' },
  { id: 'cat5', name: 'Product Development' },
  { id: 'cat6', name: 'Legal & Compliance' },
  { id: 'cat7', name: 'Human Resources' },
  { id: 'cat8', name: 'Technology & Innovation' },
  { id: 'cat9', name: 'Leadership & Soft Skills' },
  { id: 'cat10', name: 'Growth & Scaling' },
];

export const lessons = categories.flatMap(cat => 
  Array.from({ length: 10 }, (_, i) => ({
    id: `${cat.id}-l${i + 1}`,
    categoryId: cat.id,
    title: `${cat.name} Lesson ${i + 1}`,
    description: `Master the fundamentals of ${cat.name} - Part ${i + 1}. This lesson covers essential concepts for production-grade business success.`,
  }))
);
