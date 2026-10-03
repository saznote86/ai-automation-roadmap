import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'ar' | 'fr' | 'en';

export const LANGUAGE_META: Record<Language, { label: string; nativeLabel: string; dir: 'rtl' | 'ltr' }> = {
  ar: { label: 'العربية', nativeLabel: 'العربية', dir: 'rtl' },
  fr: { label: 'Français', nativeLabel: 'FR', dir: 'ltr' },
  en: { label: 'English', nativeLabel: 'EN', dir: 'ltr' }
};

type TranslationKey = keyof typeof translations.en;
const translations = {
  en: {
    brand: 'AI Automation Roadmap', subtitle: 'From zero to your first client', roadmap: 'Learning roadmap', n8n: 'n8n simulator', rag: 'RAG lab', projects: '10 projects', roi: 'ROI calculator', pitch: 'Close clients', performance: 'Progress dashboard', pricing: 'Price your first client', pricingShort: 'Pricing', level: 'View current level', progress: 'Roadmap progress', lessons: 'lessons', projectsDone: 'practical projects', remaining: 'remaining to reach your goal', completed: 'Roadmap completed! 🎉', continue: 'Continue learning', heroEyebrow: 'Practical roadmap 2026', heroProof: 'Built from real market experience', heroTitle: 'Master AI Automation and turn it into a profitable business 🚀', heroDescription: 'Automation is not about tools. It solves real problems, saves time and drives sales. Learn Webhooks, n8n, RAG databases and how to close your first monthly contract.', start: 'Start learning now', trySimulator: 'Try the interactive n8n simulator', followInstagram: 'Follow on Instagram', stages: '7 stages', stagesCaption: 'from fundamentals to sales', portfolio: '10 projects', portfolioCaption: 'to build a strong portfolio', duration: '3–4 months', durationCaption: 'at 2–3 hours per day', completedConcepts: 'completed concepts', financialFormula: 'The golden formula for financial stability', setup: 'Setup Fee', retainer: 'monthly Retainer', roadmapTitle: 'Complete learning path (7 milestones)', roadmapHint: 'Select a stage to explore its concepts, code and projects', totalDuration: 'Total duration', courses: 'lessons', backTop: 'Back to top', language: 'Language', menu: 'Navigation', loading: 'Loading interactive experience…', showLevel: 'View progress level and current rank'
  },
  fr: {
    brand: 'AI Automation Roadmap', subtitle: 'De zéro à votre premier client', roadmap: 'Parcours d’apprentissage', n8n: 'Simulateur n8n', rag: 'Laboratoire RAG', projects: '10 projets', roi: 'Calculateur ROI', pitch: 'Conclure des clients', performance: 'Tableau de progression', pricing: 'Tarifer votre premier client', pricingShort: 'Tarifs', level: 'Voir le niveau actuel', progress: 'Progression du parcours', lessons: 'leçons', projectsDone: 'projets pratiques', remaining: 'restantes pour atteindre l’objectif', completed: 'Parcours terminé ! 🎉', continue: 'Continuer l’apprentissage', heroEyebrow: 'Roadmap pratique 2026', heroProof: 'Fondée sur une expérience réelle du marché', heroTitle: 'Maîtrisez l’AI Automation et transformez-la en activité rentable 🚀', heroDescription: 'L’automatisation ne se résume pas aux outils. Elle résout de vrais problèmes, fait gagner du temps et augmente les ventes. Apprenez les Webhooks, n8n, les bases RAG et la vente de votre premier contrat mensuel.', start: 'Commencer maintenant', trySimulator: 'Tester le simulateur n8n', followInstagram: 'Suivre sur Instagram', stages: '7 étapes', stagesCaption: 'des bases à la vente', portfolio: '10 projets', portfolioCaption: 'pour un portfolio solide', duration: '3–4 mois', durationCaption: 'à raison de 2–3 h par jour', completedConcepts: 'notions terminées', financialFormula: 'La formule gagnante de la stabilité financière', setup: 'Frais de mise en place', retainer: 'abonnement mensuel', roadmapTitle: 'Parcours complet (7 étapes)', roadmapHint: 'Sélectionnez une étape pour découvrir ses notions, son code et ses projets', totalDuration: 'Durée totale', courses: 'leçons', backTop: 'Retour en haut', language: 'Langue', menu: 'Navigation', loading: 'Chargement de l’expérience interactive…', showLevel: 'Voir le niveau et le rang actuel'
  },
  ar: {
    brand: 'خريطة AI Automation', subtitle: 'من الصفر لحد أول عميل', roadmap: 'المراحل التعليمية', n8n: 'محاكي n8n', rag: 'معمل RAG', projects: '10 مشاريع', roi: 'حاسبة ROI', pitch: 'إغلاق العملاء', performance: 'لوحة الإنجاز', pricing: 'احسب تسعير أول عميل', pricingShort: 'التسعير', level: 'عرض المستوى الحالي', progress: 'نسبة إنجاز الخريطة', lessons: 'دروس', projectsDone: 'مشاريع عملية', remaining: 'متبقي للوصول للهدف', completed: 'أتممت المسار بالكامل! 🎉', continue: 'متابعة التعلّم', heroEyebrow: 'خريطة طريق عملية 2026', heroProof: 'مبنية على تجربة سوق حقيقية', heroTitle: 'احترف الـ AI Automation وحوّله لبيزنس بيجيب فلوس 🚀', heroDescription: 'الـ Automation مش أدوات؛ هو حل لمشاكل حقيقية يوفر الوقت ويزيد المبيعات. تعلم Webhooks وn8n وقواعد RAG وحتى إغلاق أول عقد شهري.', start: 'ابدأ رحلة التعلّم الآن', trySimulator: 'جرّب محاكي n8n التفاعلي', followInstagram: 'تابع على إنستجرام', stages: '7 مراحل', stagesCaption: 'من الأساسيات للبيع', portfolio: '10 مشاريع', portfolioCaption: 'لبناء بورتفوليو قوي', duration: '3 - 4 شهور', durationCaption: 'بمعدل 2-3 ساعات يومياً', completedConcepts: 'المفاهيم المكتملة', financialFormula: 'المعادلة الذهبية للاستقرار المالي', setup: 'دفعة أولى', retainer: 'Retainer شهري', roadmapTitle: 'مسار التعلّم الكامل (7 محطات)', roadmapHint: 'اضغط على أي مرحلة لاستعراض مفاهيمها وأكوادها ومشاريعها', totalDuration: 'المدة الإجمالية', courses: 'دروس', backTop: 'للأعلى', language: 'اللغة', menu: 'التنقل', loading: 'جاري تجهيز تجربتك التفاعلية…', showLevel: 'عرض مستوى التقدم والرتبة الحالية'
  }
} as const;

interface I18nContextValue { language: Language; setLanguage: (language: Language) => void; dir: 'rtl' | 'ltr'; t: (key: TranslationKey) => string; }
const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ai_roadmap_language');
    return saved === 'ar' || saved === 'fr' || saved === 'en' ? saved : 'ar';
  });
  const setLanguage = (next: Language) => setLanguageState(next);
  useEffect(() => {
    localStorage.setItem('ai_roadmap_language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = LANGUAGE_META[language].dir;
  }, [language]);
  const value = useMemo(() => ({ language, setLanguage, dir: LANGUAGE_META[language].dir, t: (key: TranslationKey) => translations[language][key] }), [language]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
};