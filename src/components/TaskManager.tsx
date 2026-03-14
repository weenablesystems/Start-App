import { useState, useMemo, useEffect } from 'react';
import { Plus, CheckCircle, Circle, Calendar as CalendarIcon, Filter, Bell, Trash2 } from 'lucide-react';
import { Task } from '../types';

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterCategory, setFilterCategory] = useState<'all' | 'Business' | 'Personal' | 'Urgent'>('all');
  const [showCalendar, setShowCalendar] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: 'Medium' as const, category: 'Business' as const });

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
    const interval = setInterval(() => {
      tasks.forEach(task => {
        if (!task.completed && new Date(task.dueDate).getTime() - Date.now() < 3600000 && new Date(task.dueDate).getTime() - Date.now() > 0) {
          if (Notification.permission === 'granted') {
            new Notification(`Task Reminder: ${task.title}`, { body: `Due at ${task.dueDate.toLocaleTimeString()}` });
          }
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: new Date(newTask.dueDate),
      priority: newTask.priority,
      category: newTask.category,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', dueDate: '', priority: 'Medium', category: 'Business' });
  };

  const toggleTask = (id: string) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const filteredTasks = useMemo(() => 
    filterCategory === 'all' ? tasks : tasks.filter(t => t.category === filterCategory),
    [tasks, filterCategory]
  );

  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);
  }, [tasks]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-library-brown dark:text-library-beige">Task Management</h2>
        <div className="flex gap-2">
          <button onClick={() => setShowCalendar(!showCalendar)} className="p-2 bg-library-brown/10 dark:bg-library-beige/10 rounded-lg"><CalendarIcon /></button>
          <select onChange={(e) => setFilterCategory(e.target.value as any)} className="bg-library-brown/10 dark:bg-library-beige/10 p-2 rounded-lg">
            <option value="all">All</option>
            <option value="Business">Business</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-library-brown p-6 rounded-2xl border border-library-brown/20 dark:border-library-brown/50">
        <h3 className="font-bold mb-2">Overall Progress: {progress}%</h3>
        <div className="w-full bg-library-brown/10 dark:bg-library-beige/10 rounded-full h-4">
          <div className="bg-library-burnt-orange h-4 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="bg-white dark:bg-library-brown p-6 rounded-2xl border border-library-brown/20 dark:border-library-brown/50 space-y-4">
        <input type="text" placeholder="Task Title" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} className="w-full p-2 rounded-lg border border-library-brown/20" />
        <textarea placeholder="Description" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} className="w-full p-2 rounded-lg border border-library-brown/20" />
        <div className="flex gap-4">
          <input type="date" value={newTask.dueDate} onChange={e => setNewTask({...newTask, dueDate: e.target.value})} className="p-2 rounded-lg border border-library-brown/20" />
          <select value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value as any})} className="p-2 rounded-lg border border-library-brown/20">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select value={newTask.category} onChange={e => setNewTask({...newTask, category: e.target.value as any})} className="p-2 rounded-lg border border-library-brown/20">
            <option value="Business">Business</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
          <button onClick={addTask} className="bg-library-burnt-orange text-white p-2 rounded-lg flex items-center gap-2"><Plus /> Add Task</button>
        </div>
      </div>

      {showCalendar ? (
        <div className="bg-white dark:bg-library-brown p-6 rounded-2xl border border-library-brown/20 dark:border-library-brown/50">
          <h3 className="font-bold mb-4">Calendar View</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="font-bold text-center">{d}</div>)}
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="border border-library-brown/20 p-2 h-20">
                {i + 1}
                {filteredTasks.filter(t => t.dueDate.getDate() === i + 1).map(t => <div key={t.id} className="text-xs bg-library-dark-yellow p-1 rounded mt-1">{t.title}</div>)}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-white dark:bg-library-brown rounded-xl border border-library-brown/20">
              <div className="flex items-center gap-4">
                <button onClick={() => toggleTask(task.id)}>{task.completed ? <CheckCircle className="text-library-burnt-orange" /> : <Circle />}</button>
                <div>
                  <h4 className={`font-bold ${task.completed ? 'line-through text-library-brown/50' : ''}`}>{task.title}</h4>
                  <p className="text-sm text-library-brown/70">{task.description} - {task.dueDate.toLocaleDateString()} - {task.priority}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${task.category === 'Urgent' ? 'bg-library-burnt-orange/20 text-library-burnt-orange' : 'bg-library-brown/10'}`}>{task.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
