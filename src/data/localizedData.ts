import { Language } from '../i18n';
import { Phase, PortfolioProject } from '../types';
import { PORTFOLIO_PROJECTS, ROADMAP_PHASES } from './roadmapData';

type PhaseCopy = Partial<Pick<Phase, 'number' | 'title' | 'duration' | 'summary' | 'importance'>>;

const phaseCopy: Record<Language, Record<number, PhaseCopy>> = {
  ar: {},
  fr: {
    0: { number: 'Étape 0', title: 'Les fondamentaux du Web (à ne pas sauter)', duration: '1 à 2 semaines', summary: 'Comprendre les échanges entre logiciels sur Internet avant d’utiliser l’automatisation.', importance: 'Ces bases évitent les erreurs difficiles à diagnostiquer lorsque vous commencerez avec n8n.' },
    1: { number: 'Étape 1', title: 'Maîtriser n8n', duration: '2 à 3 semaines', summary: 'Construire des workflows fiables avec les nodes, les expressions et la gestion des erreurs.', importance: 'Vous passez de simples essais à des automatisations reproductibles et maintenables.' },
    2: { number: 'Étape 2', title: 'IA générative et agents', duration: '2 à 3 semaines', summary: 'Concevoir des prompts, des sorties structurées et des agents capables d’utiliser des outils.', importance: 'La maîtrise de l’IA transforme un workflow classique en véritable assistant métier.' },
    3: { number: 'Étape 3', title: 'Bases de données et RAG', duration: '2 à 3 semaines', summary: 'Stocker, retrouver et citer les connaissances d’une entreprise sans hallucination.', importance: 'Les données fiables sont la base des assistants utiles en production.' },
    4: { number: 'Étape 4', title: 'Canaux et intégrations', duration: '2 à 3 semaines', summary: 'Connecter WhatsApp, Telegram, Meta, la voix et la reconnaissance de documents.', importance: 'Les clients paient pour des expériences complètes, pas pour des outils isolés.' },
    5: { number: 'Étape 5', title: 'Déploiement et fiabilité', duration: '1 à 2 semaines', summary: 'Déployer, sécuriser, sauvegarder et surveiller des automatisations en production.', importance: 'La fiabilité protège vos clients et votre réputation.' },
    6: { number: 'Étape 6', title: 'Choisir une niche et vendre', duration: '2 à 3 semaines', summary: 'Transformer vos compétences techniques en offre claire, rentable et vendable.', importance: 'Une bonne offre et une bonne découverte client valent autant que la technique.' }
  },
  en: {
    0: { number: 'Stage 0', title: 'Web fundamentals (do not skip)', duration: '1–2 weeks', summary: 'Understand how software communicates over the Internet before touching automation tools.', importance: 'These foundations prevent hard-to-diagnose issues when you start with n8n.' },
    1: { number: 'Stage 1', title: 'Mastering n8n', duration: '2–3 weeks', summary: 'Build reliable workflows with nodes, expressions and error handling.', importance: 'You move from experiments to repeatable, maintainable automations.' },
    2: { number: 'Stage 2', title: 'Generative AI and agents', duration: '2–3 weeks', summary: 'Design prompts, structured outputs and agents that can use tools.', importance: 'AI turns a standard workflow into a real business assistant.' },
    3: { number: 'Stage 3', title: 'Databases and RAG', duration: '2–3 weeks', summary: 'Store, retrieve and cite company knowledge without hallucinations.', importance: 'Reliable data is the foundation of useful production assistants.' },
    4: { number: 'Stage 4', title: 'Channels and integrations', duration: '2–3 weeks', summary: 'Connect WhatsApp, Telegram, Meta, voice and document recognition.', importance: 'Clients pay for complete experiences, not isolated tools.' },
    5: { number: 'Stage 5', title: 'Deployment and reliability', duration: '1–2 weeks', summary: 'Deploy, secure, back up and monitor production automations.', importance: 'Reliability protects your clients and your reputation.' },
    6: { number: 'Stage 6', title: 'Choose a niche and sell', duration: '2–3 weeks', summary: 'Turn technical skills into a clear, profitable and sellable offer.', importance: 'A strong offer and discovery call matter as much as the technology.' }
  }
};

const difficultyLabels: Record<Language, Record<string, string>> = {
  ar: { سهل: 'سهل', متوسط: 'متوسط', متقدم: 'متقدم' },
  fr: { سهل: 'Facile', متوسط: 'Intermédiaire', متقدم: 'Avancé' },
  en: { سهل: 'Easy', متوسط: 'Intermediate', متقدم: 'Advanced' }
};

export function getLocalizedRoadmap(language: Language): Phase[] {
  return ROADMAP_PHASES.map((phase) => ({ ...phase, ...phaseCopy[language][phase.id] }));
}

export function getLocalizedProjects(language: Language): PortfolioProject[] {
  return PORTFOLIO_PROJECTS.map((project) => ({ ...project, difficulty: difficultyLabels[language][project.difficulty] ?? project.difficulty }));
}