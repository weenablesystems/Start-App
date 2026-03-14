/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import Auth from './components/Auth';
import Layout from './components/Layout';
import AiAssistant from './components/AiAssistant';
import ResourceLibrary from './components/ResourceLibrary';
import MarketResearch from './components/MarketResearch';
import BusinessPlanGenerator from './components/BusinessPlanGenerator';
import TaskManager from './components/TaskManager';
import BrandAssetsGenerator from './components/BrandAssetsGenerator';
import Onboarding from './components/Onboarding';

export default function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAiMentorOpen, setIsAiMentorOpen] = useState(false);

  useEffect(() => {
    if (user && !localStorage.getItem('onboarding_seen')) {
      setShowOnboarding(true);
    }
  }, [user]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding_seen', 'true');
    setShowOnboarding(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-library-beige dark:bg-library-brown text-library-brown dark:text-library-beige">Loading...</div>;
  if (!user) return <Auth />;

  return (
    <>
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'lessons' && <ResourceLibrary />}
          {activeTab === 'research' && <MarketResearch />}
          {activeTab === 'plan' && <BusinessPlanGenerator />}
          {activeTab === 'tasks' && <TaskManager />}
          {activeTab === 'brand' && <BrandAssetsGenerator />}
        </motion.div>
      </Layout>

      {/* AI Mentor Pop-up */}
      <AnimatePresence>
        {isAiMentorOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-96 z-50 bg-white dark:bg-library-brown rounded-2xl shadow-2xl border border-library-brown/20 dark:border-library-brown/50 overflow-hidden"
          >
            <div className="p-4 border-b border-library-brown/20 dark:border-library-brown/50 flex justify-between items-center">
              <h3 className="font-bold text-library-brown dark:text-library-beige">AI Mentor</h3>
              <button onClick={() => setIsAiMentorOpen(false)} className="text-library-brown/50 hover:text-library-brown dark:hover:text-library-beige">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <AiAssistant />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsAiMentorOpen(!isAiMentorOpen)}
        className="fixed bottom-6 left-6 z-50 bg-library-burnt-orange text-white p-4 rounded-full shadow-lg hover:bg-library-burnt-orange/90 transition"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    </>
  );
}

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-3 bg-white dark:bg-library-brown p-8 rounded-3xl shadow-sm border border-library-brown/20 dark:border-library-brown/50">
        <h2 className="text-3xl font-bold mb-4 text-library-brown dark:text-library-beige">Welcome back, Entrepreneur!</h2>
        <p className="text-library-brown/70 dark:text-library-beige/70 text-lg">Your business journey continues here. What's on your mind today?</p>
      </div>
    </div>
  );
}
