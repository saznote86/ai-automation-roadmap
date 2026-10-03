import React from 'react';
import { TECH_STACK } from '../data/roadmapData';
import { ExternalLink, BookOpen, Layers, Server, Shield, Sparkles } from 'lucide-react';

export const ResourcesDirectory: React.FC = () => {
  const resourceLinks = [
    {
      category: 'n8n الرسمية',
      links: [
        { title: 'الـ Documentation الرسمية لـ n8n', url: 'https://docs.n8n.io', note: 'الدليل المرجعي لكافة الـ Nodes والميزات' },
        { title: 'كورسات n8n الرسمية (Level 1 و Level 2)', url: 'https://docs.n8n.io/courses/', note: 'تدريب تفاعلي مجاني بالكامل بشهادات رسمية' },
        { title: 'مكتبة الـ Workflows و Templates الجاهزة', url: 'https://n8n.io/workflows/', note: 'آلاف المسارات الجاهزة للدراسة والتعديل' },
        { title: 'منتدى ومجتمع n8n Community', url: 'https://community.n8n.io', note: 'أفضل مكان لحل أي مشكلة أو خطأ تقني' }
      ]
    },
    {
      category: 'أساسيات الويب والـ APIs',
      links: [
        { title: 'HTTP Overview — MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', note: 'أفضل شرح لبروتوكول الويب والـ Headers' },
        { title: 'دليل JSON — MDN', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON', note: 'فهم بنية الكائنات والمصفوفات' },
        { title: 'أداة Postman لاختبار الـ APIs', url: 'https://www.postman.com', note: 'البرنامج الأساسي لفحص طلبات السيرفر' },
        { title: 'موقع Webhook.site', url: 'https://webhook.site', note: 'توليد رابط Webhook مجاني لفحص الداتا الواصلة لحظياً' }
      ]
    },
    {
      category: 'الذكاء الاصطناعي وهندسة الأوامر',
      links: [
        { title: 'Claude Prompt Engineering — Anthropic', url: 'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview', note: 'الدليل الذهبي لبناء System Prompts مانعة للهلوسة' },
        { title: 'OpenAI Platform Documentation', url: 'https://platform.openai.com/docs', note: 'توثيق نماذج GPT و Structured JSON Outputs' }
      ]
    },
    {
      category: 'قواعد البيانات والـ RAG',
      links: [
        { title: 'Supabase Documentation', url: 'https://supabase.com/docs', note: 'بديل فايربيس المفتوح المصدر مع PostgreSQL' },
        { title: 'Pinecone Vector DB Learn', url: 'https://www.pinecone.io/learn/', note: 'تعلم كيف تعمل الـ Embeddings والبحث الدلالي' }
      ]
    },
    {
      category: 'قنوات واتساب وميتا',
      links: [
        { title: 'WhatsApp Cloud API الرسمية من Meta', url: 'https://developers.facebook.com/docs/whatsapp/cloud-api', note: 'الحل الآمن والمعتمد للشركات الكبرى' },
        { title: 'مستودع Evolution API مفتوح المصدر', url: 'https://github.com/EvolutionAPI/evolution-api', note: 'خادم ربط واتساب مجاني عبر QR Code' }
      ]
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-8">
      {/* Recommended Tech Stack Section */}
      <div className="space-y-4">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
            <Layers className="w-4 h-4" />
            <span>الـ Tech Stack الموصى به (The Proven Stack)</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            الأدوات التي نعتمد عليها في مشاريع السوق الحقيقية
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            لا تشتت نفسك بتجربة 50 أداة جديدة. هذا الـ Stack كافٍ لبناء 95% من أنظمة الأتمتة وإغلاق عملاء بالآلاف.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {TECH_STACK.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400 block">{item.category}</span>
                <h3 className="text-sm font-bold text-amber-300">
                  {item.primaryTool}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>البدائل: {item.alternatives.join(' · ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free Curated Resources Library */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">
              مكتبة المصادر والروابط المجانية الرسمية
            </h3>
            <p className="text-xs text-slate-400">
              أفضل وأوثق المصادر للتعلم والتطبيق المباشر
            </p>
          </div>
          <BookOpen className="w-5 h-5 text-amber-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resourceLinks.map((cat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
              <h4 className="text-xs font-bold text-amber-400 border-b border-slate-800 pb-1.5">
                {cat.category}
              </h4>
              <div className="space-y-2">
                {cat.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 hover:border-amber-400/40 border border-slate-800 transition-colors group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                      <span>{link.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {link.note}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
