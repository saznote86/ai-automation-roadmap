/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { getLocalizedRoadmap } from './data/localizedData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { PhaseCard } from './components/PhaseCard';
import { N8nSimulator } from './components/N8nSimulator';
import { RagSimulator } from './components/RagSimulator';
import { ProjectsLibrary } from './components/ProjectsLibrary';
import { RoiPricingCalculator } from './components/RoiPricingCalculator';
import { ClientPitchDeck } from './components/ClientPitchDeck';
import { MistakesShield } from './components/MistakesShield';
import { ResourcesDirectory } from './components/ResourcesDirectory';
import { Footer } from './components/Footer';
import { LevelUpModal, GamificationToast, MILESTONES, MilestoneData } from './components/LevelUpModal';
import { DailyActionPlan } from './components/DailyActionPlan';
import { TopProgressBar } from './components/TopProgressBar';
import { PerformanceDashboard } from './components/PerformanceDashboard';
import { useI18n } from './i18n';

export default function App() {
  const { language, t } = useI18n();
  const roadmapPhases = getLocalizedRoadmap(language);
  const [activeTab, setActiveTab] = useState<string>('roadmap');
  const [currentPhaseId, setCurrentPhaseId] = useState<number>(0);
  
  // Gamification state
  const [activeMilestoneModal, setActiveMilestoneModal] = useState<MilestoneData | null>(null);
  const [toastNotification, setToastNotification] = useState<{ title: string; message: string } | null>(null);

  // Local storage persisted progress
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('ai_roadmap_completed_topics');
      return saved ? new Set(JSON.parse(saved)) : new Set(['api-basics']);
    } catch {
      return new Set(['api-basics']);
    }
  });

  const [completedProjects, setCompletedProjects] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('ai_roadmap_completed_projects');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [claimedMilestones, setClaimedMilestones] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('ai_roadmap_claimed_milestones');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ai_roadmap_completed_topics', JSON.stringify(Array.from(completedTopics)));
    } catch (e) {
      console.error(e);
    }
  }, [completedTopics]);

  useEffect(() => {
    try {
      localStorage.setItem('ai_roadmap_completed_projects', JSON.stringify(Array.from(completedProjects)));
    } catch (e) {
      console.error(e);
    }
  }, [completedProjects]);

  useEffect(() => {
    try {
      localStorage.setItem('ai_roadmap_claimed_milestones', JSON.stringify(Array.from(claimedMilestones)));
    } catch (e) {
      console.error(e);
    }
  }, [claimedMilestones]);

  const totalTopicsCount = roadmapPhases.reduce((acc, p) => acc + p.topics.length, 0);

  // Check for Level Up trigger
  const checkMilestoneThresholds = (newCompletedTopicsCount: number) => {
    const newPercent = Math.round((newCompletedTopicsCount / Math.max(1, totalTopicsCount)) * 100);
    const thresholds = [100, 75, 50, 25];

    for (const threshold of thresholds) {
      if (newPercent >= threshold && !claimedMilestones.has(threshold)) {
        // Trigger Level Up Modal!
        const milestone = MILESTONES[threshold];
        if (milestone) {
          setActiveMilestoneModal(milestone);
          setClaimedMilestones(prev => {
            const next = new Set(prev);
            next.add(threshold);
            return next;
          });
          break;
        }
      }
    }
  };

  const toggleTopic = (topicId: string) => {
    setCompletedTopics(prev => {
      const next = new Set(prev);
      const wasAdding = !next.has(topicId);
      if (wasAdding) {
        next.add(topicId);
      } else {
        next.delete(topicId);
      }

      if (wasAdding) {
        checkMilestoneThresholds(next.size);
      }
      return next;
    });
  };

  const toggleProject = (projectId: number) => {
    setCompletedProjects(prev => {
      const next = new Set(prev);
      const isAdding = !next.has(projectId);
      if (isAdding) {
        next.add(projectId);
        setToastNotification({
          title: `🎯 ${t('projects')}`,
          message: `${next.size}/10 ${t('projectsDone')}`
        });
        setTimeout(() => setToastNotification(null), 5000);
      } else {
        next.delete(projectId);
      }
      return next;
    });
  };

  // Determine Current Level
  const currentPercentage = Math.round((completedTopics.size / Math.max(1, totalTopicsCount)) * 100);
  let currentLevelTitle = language === 'fr' ? 'Explorateur débutant' : language === 'en' ? 'Beginner explorer' : 'مستكشف مبتدئ';
  let currentLevelBadgeIcon = '🌱';
  let currentMilestoneData = MILESTONES[25];

  if (currentPercentage >= 100) {
    currentLevelTitle = language === 'fr' ? 'Consultant automation certifié' : language === 'en' ? 'Certified automation consultant' : 'مستشار أتمتة معتمد';
    currentLevelBadgeIcon = '🏆';
    currentMilestoneData = MILESTONES[100];
  } else if (currentPercentage >= 75) {
    currentLevelTitle = language === 'fr' ? 'Expert RAG et conversations' : language === 'en' ? 'RAG and conversation master' : 'سيد الـ RAG والمحادثات';
    currentLevelBadgeIcon = '🧠';
    currentMilestoneData = MILESTONES[75];
  } else if (currentPercentage >= 50) {
    currentLevelTitle = language === 'fr' ? 'Ingénieur de workflows n8n' : language === 'en' ? 'n8n workflow engineer' : 'مهندس مسارات n8n';
    currentLevelBadgeIcon = '⚡';
    currentMilestoneData = MILESTONES[50];
  } else if (currentPercentage >= 25) {
    currentLevelTitle = language === 'fr' ? 'Explorateur Web et APIs' : language === 'en' ? 'Web and API explorer' : 'مستكشف الويب والـ APIs';
    currentLevelBadgeIcon = '🌐';
    currentMilestoneData = MILESTONES[25];
  }

  const currentPhase = roadmapPhases.find(p => p.id === currentPhaseId) || roadmapPhases[0];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = () => {
    setActiveTab('roadmap');
    const el = document.getElementById('phase-details-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Header (Top Bar Contract) */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          scrollToTop();
        }}
        completedTopicsCount={completedTopics.size}
        totalTopicsCount={totalTopicsCount}
        onOpenLevelModal={() => setActiveMilestoneModal(currentMilestoneData)}
        currentLevelTitle={currentLevelTitle}
        currentLevelBadgeIcon={currentLevelBadgeIcon}
      />

      {/* Top Visible Progress Bar */}
      <TopProgressBar
        completedTopicsCount={completedTopics.size}
        totalTopicsCount={totalTopicsCount}
        completedProjectsCount={completedProjects.size}
        totalProjectsCount={10}
        currentLevelTitle={currentLevelTitle}
        currentLevelBadgeIcon={currentLevelBadgeIcon}
        onOpenLevelModal={() => setActiveMilestoneModal(currentMilestoneData)}
        onJumpToCurrentPhase={() => {
          setActiveTab('roadmap');
          const el = document.getElementById('phase-details-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      />

      {/* 2. Hero Section */}
      <Hero
        onStartLearning={handleStartLearning}
        onOpenSimulator={() => {
          setActiveTab('n8n-simulator');
          scrollToTop();
        }}
        completedCount={completedTopics.size}
        totalTopics={totalTopicsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {activeTab === 'roadmap' && (
          <div className="space-y-10">
            {/* Visual Roadmap Selector */}
            <RoadmapTimeline
              phases={roadmapPhases}
              currentPhaseId={currentPhaseId}
              onSelectPhase={(id) => {
                setCurrentPhaseId(id);
                const el = document.getElementById('phase-details-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              completedTopics={completedTopics}
            />

            {/* Daily Action Plan Component */}
            <DailyActionPlan />

            {/* Active Selected Phase Details */}
            <div id="phase-details-section">
              <PhaseCard
                phase={currentPhase}
                completedTopics={completedTopics}
                onToggleTopic={toggleTopic}
                onOpenProjects={() => {
                  setActiveTab('projects');
                  scrollToTop();
                }}
              />
            </div>

            {/* Quick Interactive Call to Action to Simulators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => {
                  setActiveTab('n8n-simulator');
                  scrollToTop();
                }}
                className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 hover:border-amber-400/50 cursor-pointer transition-all shadow-md group"
              >
                <div className="text-xs font-semibold text-amber-400 mb-1">
                  أداة تفاعلية
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  جرب محاكي n8n التفاعلي ⚡
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  اختبر معالجة رسائل الواتساب، وأمر الـ JavaScript، وقرارات الـ Claude AI Agent، ومزامنة الداتابيز مباشرة.
                </p>
              </div>

              <div 
                onClick={() => {
                  setActiveTab('rag-simulator');
                  scrollToTop();
                }}
                className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 hover:border-amber-400/50 cursor-pointer transition-all shadow-md group"
              >
                <div className="text-xs font-semibold text-sky-400 mb-1">
                  أداة تفاعلية
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                  اختبر معمل الـ RAG وقواعد المعرفة 🧠
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  تعلم كيف يقطع النظام مستندات العميل ويحولها لمتجهات ويفحص الأسئلة ويمنع الهلوسة.
                </p>
              </div>
            </div>

            {/* Mistakes & Shield */}
            <MistakesShield />

            {/* Curated Stack & Resources */}
            <ResourcesDirectory />
          </div>
        )}

        {/* 3. n8n Interactive Simulator Tab */}
        {activeTab === 'n8n-simulator' && (
          <div className="space-y-6">
            <N8nSimulator />
          </div>
        )}

        {/* 4. RAG Lab Simulator Tab */}
        {activeTab === 'rag-simulator' && (
          <div className="space-y-6">
            <RagSimulator />
          </div>
        )}

        {/* 5. 10 Portfolio Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <ProjectsLibrary
              completedProjectIds={completedProjects}
              onToggleProject={toggleProject}
            />
          </div>
        )}

        {/* 6. ROI Pricing Calculator Tab */}
        {activeTab === 'roi-calculator' && (
          <div className="space-y-6">
            <RoiPricingCalculator />
          </div>
        )}

        {/* 7. Pitch Deck & Closing Toolkit Tab */}
        {activeTab === 'pitch-deck' && (
          <div className="space-y-6">
            <ClientPitchDeck />
          </div>
        )}

        {/* 8. Performance Dashboard Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <PerformanceDashboard
              completedTopicsCount={completedTopics.size}
              totalTopicsCount={totalTopicsCount}
              completedProjectsCount={completedProjects.size}
              totalProjectsCount={10}
              completedTopicIds={completedTopics}
              currentLevelTitle={currentLevelTitle}
              currentLevelBadgeIcon={currentLevelBadgeIcon}
              onOpenLevelModal={() => setActiveMilestoneModal(currentMilestoneData)}
              onGoToRoadmap={() => {
                setActiveTab('roadmap');
                scrollToTop();
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onBackToTop={scrollToTop} />

      {/* Gamification Level Up Celebration Modal */}
      {activeMilestoneModal && (
        <LevelUpModal
          milestone={activeMilestoneModal}
          onClose={() => setActiveMilestoneModal(null)}
          onExploreNext={() => {
            setActiveTab('roadmap');
            const el = document.getElementById('phase-details-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      )}

      {/* Quick Gamification Toast */}
      {toastNotification && (
        <GamificationToast
          title={toastNotification.title}
          message={toastNotification.message}
          onDismiss={() => setToastNotification(null)}
          onViewDetails={() => {
            setToastNotification(null);
            setActiveMilestoneModal(currentMilestoneData);
          }}
        />
      )}
    </div>
  );
}
