import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  FileCheck, 
  Send, 
  ShieldCheck, 
  HelpCircle, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Award,
  FileSignature,
  Calendar,
  MessageSquare,
  Users,
  Plus,
  Trash2,
  DollarSign
} from 'lucide-react';

interface ProspectLead {
  id: string;
  name: string;
  industry: string;
  stage: 'new' | 'contacted' | 'discovery' | 'proposal' | 'won';
  dealValue: string;
  notes: string;
}

const DEFAULT_LEADS: ProspectLead[] = [
  { id: '1', name: 'عيادة د. حسام للأسنان', industry: 'عيادات ومراكز طبية', stage: 'discovery', dealValue: '$800 + $250/ش', notes: 'مهتم بحجز المواعيد الآلي على واتساب' },
  { id: '2', name: 'براند إيليت فاشن', industry: 'تجارة إلكترونية', stage: 'contacted', dealValue: '$1,200 + $350/ش', notes: 'يحتاجون رد آلي على إنستجرام DMs' },
  { id: '3', name: 'أركان للاستثمار العقاري', industry: 'عقارات', stage: 'new', dealValue: '$2,000 + $600/ش', notes: 'تأهيل الـ Leads وتوزيعهم على المبيعات' }
];

interface RoleplayScenario {
  id: number;
  clientContext: string;
  clientSaid: string;
  options: {
    text: string;
    isBest: boolean;
    feedback: string;
  }[];
}

const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  {
    id: 1,
    clientContext: 'مدير مركز تجميل وعيادات ليزر في مكالمة Discovery',
    clientSaid: '"يا فندم إحنا عندنا 3 سكرتيرات بيردوا على الواتساب، والزبائن بيحبوا التعامل مع بني آدمين مش روبوتات!"',
    options: [
      {
        text: 'الروبوت بتاعنا ذكي جداً وبيستخدم موديل Claude 3.5 Sonnet ومش هتحتاج أي سكرتارية خالص!',
        isBest: false,
        feedback: 'خطأ: دخلت في تفاصيل تقنية وأفزعت العميل بفكرة طرد موظفيه بدلاً من حل مشكلته الحقيقية.'
      },
      {
        text: 'أكيد يا فندم واللمسة الإنسانية مهمة جداً! لكن كم رسالة بتوصلكم بالليل بعد الساعة 10 م لما العيادة بتقفل ومحدش بيرد غير تاني يوم الصبح؟',
        isBest: true,
        feedback: 'إجابة عبقرية: أكدت على نقطته وسألته عن الثغرة التي تخسر المركز آلاف الجنيهات ليلاً، مما جعله يدرك الحاجة فوراً.'
      },
      {
        text: 'طب إيه رأيك أعملك خصم 50% وتجرب السيستم شهر؟',
        isBest: false,
        feedback: 'خطأ قاتل: خفضت قيمتك وسعرك قبل أن يفهم العميل أصلاً ما المشكلة التي تحلها.'
      }
    ]
  },
  {
    id: 2,
    clientContext: 'صاحب براند ملابس أونلاين بعد تقديم عرض السعر',
    clientSaid: '"سعرك $1,200 لتأسيس النظام غالي جداً! فيه واحد على فايفر عرض يعملهولي بـ $80!"',
    options: [
      {
        text: 'الناس بتوع فايفر بيعملوا شغل تعبان وبيبوظوا الحسابات ومبيفهموش حاجة.',
        isBest: false,
        feedback: 'خطأ: مهاجمة المنافسين تبدو دفاعية وضعيفة وتقلل من احترافيتك.'
      },
      {
        text: 'معاك حق يا فندم، الـ $80 ممتازة لو محتاج مجرد Template شات بوت تقليدي يرمي ردود ثابتة. لكن نظامنا Sales Agent متكامل بيقرأ الصور والرسائل الصوتية ويحمي رقمك التجاري من الحظر على WhatsApp Cloud API الرسمي ويوفرلك $900 شهرياً في الرواتب. هل تحب نراجع العائد المتوقع سوا؟',
        isBest: true,
        feedback: 'ممتاز: فرقت بين الـ Template الرخيص وبين نظام الأعمال الاستثماري الآمن الذي يحمي سمعته ويضاعف مبيعاته.'
      },
      {
        text: 'طب ممكن أوصل معاك لـ $400 عشان نبدأ وخلاص.',
        isBest: false,
        feedback: 'خطأ: التراجع الفوري عن السعر يثبت للعميل أن تسعيرك الأصلي كان مبالغاً فيه.'
      }
    ]
  }
];

export const ClientPitchDeck: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'discovery' | 'roleplay' | 'proposal' | 'contract' | 'followup' | 'crm' | 'outreach'>('discovery');
  const [clientName, setClientName] = useState('د. طارق - عيادات رويال');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // CRM state
  const [leads, setLeads] = useState<ProspectLead[]>(() => {
    try {
      const saved = localStorage.getItem('ai_roadmap_crm_leads');
      return saved ? JSON.parse(saved) : DEFAULT_LEADS;
    } catch {
      return DEFAULT_LEADS;
    }
  });

  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadIndustry, setNewLeadIndustry] = useState('عيادات ومراكز طبية');
  const [newLeadDealValue, setNewLeadDealValue] = useState('$800 + $250/ش');

  useEffect(() => {
    try {
      localStorage.setItem('ai_roadmap_crm_leads', JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
  }, [leads]);

  const addLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;
    const newL: ProspectLead = {
      id: `lead-${Date.now()}`,
      name: newLeadName.trim(),
      industry: newLeadIndustry,
      stage: 'new',
      dealValue: newLeadDealValue,
      notes: 'عميل مستهدف جديد'
    };
    setLeads(prev => [newL, ...prev]);
    setNewLeadName('');
  };

  const updateLeadStage = (id: string, stage: ProspectLead['stage']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  // Roleplay state
  const [selectedRoleplayIndex, setSelectedRoleplayIndex] = useState(0);
  const [chosenOptionIndex, setChosenOptionIndex] = useState<number | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const discoveryQuestions = [
    {
      q: '1. "كم استفسار ورسالة بتوصلكم في اليوم على واتساب وإنستجرام؟"',
      goal: 'معرفة حجم الضغط ومصداقية الحاجة لأتمتة فورية.',
      tip: 'دعه يتحدث عن فوضى الرسائل في أوقات المساء والويك إند.'
    },
    {
      q: '2. "متوسط الرد على العميل بياخد وقت أد إيه؟ وكم عميل بيضيع بسبب التأخير؟"',
      goal: 'تحسيس العميل بحجم الفرص الضائعة وأثر سرعة الرد.',
      tip: 'أكثر من 50% من المشترين يشترون من أول شركة ترد عليهم.'
    },
    {
      q: '3. "كم موظف شغال عندكم مهمته الأساسية بس الرد على نفس الأسئلة المتكررة؟"',
      goal: 'تحديد تكلفة الرواتب المهدورة وتثبيت نقطة المقارنة السعرية.',
      tip: 'إذا كان راتب الموظف 8000 ج، فسعرك البالغ 3000 ج سيبدو صفقة رابحة جداً.'
    },
    {
      q: '4. "لو وفرنالك 4 ساعات يومياً وضاعفنا نسبة إغلاق المبيعات، إيه أثر ده على دخل الشركة؟"',
      goal: 'نقل تفكيره من تكلفة الخدمة إلى حجم العائد المتوقع وتخيل مستقبل مريح.',
      tip: 'اجعل العميل هو من يقول بلسانه كم سيكسب من النظام.'
    },
    {
      q: '5. "لو عملنا تجربة على جزء محدد (مثل حجز المواعيد أو الرد على الأسئلة الشائعة)، إمتى تحب نبدأ؟"',
      goal: 'إغلاق الصفقة والبدء بمشروع صغير وسريع.',
      tip: 'دائماً ابدأ بـ Low Hanging Fruit يرى العميل نتائجه خلال 5 أيام.'
    }
  ];

  const proposalTemplates = [
    {
      tier: 'الباقة الأساسية (Starter)',
      price: '$650 Setup + $150/شهرياً',
      bestFor: 'للشركات الناشئة والعيادات الفردية',
      features: [
        'ربط واتساب أو إنستجرام للرد الذكي',
        'قاعدة معرفة RAG بملف المنتجات أو الخدمات',
        'مانع الهلوسة ونظام التحويل للموظفين',
        'استضافة كاملة ودعم فني على مدار الشهر'
      ]
    },
    {
      tier: 'الباقة الاحترافية (Growth) — الأكثر طلباً 🔥',
      price: '$1,200 Setup + $350/شهرياً',
      bestFor: 'للبراندات والمتاجر والعيادات الكبرى',
      features: [
        'ربط متعدد القنوات (واتساب + إنستجرام + ماسنجر)',
        'حجز مواعيد متزامن مع Google Calendar أو شيت المبيعات',
        'معالجة الرسائل الصوتية وتحويلها لنصوص',
        'نظام استعادة الأخطاء (Retry on Fail) ونسخ احتياطي أسبوعي',
        'تقارير أداء أسبوعية وملخص للرسائل'
      ]
    },
    {
      tier: 'باقة التوسع الشامل (Scale & CRM)',
      price: '$2,200 Setup + $600/شهرياً',
      bestFor: 'لشركات العقارات والشركات ذات المبيعات الضخمة',
      features: [
        'ربط كامل مع CRM (HubSpot أو Supabase مخصص)',
        'تأهيل وتصنيف العملاء المحتملين وتوزيعهم على مندوبي المبيعات',
        'سيرفر VPS خاص ومستقل بنطاق خاص بالشركة',
        'أتمتة تعليقات المنشورات والريلز (Comment-to-DM)',
        'تطوير وتحديث شهري لمسارات الأتمتة'
      ]
    }
  ];

  const contractText = `عقد تقديم خدمات أتمتة الذكاء الاصطناعي (AI Automation SLA)
الطرف الأول (مقدم الخدمة): [اسمك / اسم وكالتك]
الطرف الثاني (العميل): ${clientName}

البند الأول: نطاق العمل (Scope of Work):
يقوم الطرف الأول بتصميم وبرمجة وتشغيل نظام أتمتة ذكي متعدد القنوات، يتضمن ربط Webhooks وتدريب نموذج RAG بقاعدة ملفات الطرف الثاني، وضبط حدود منع الهلوسة ونظام التحويل للموظفين.

البند الثاني: المقابل المالي والدفع:
- رسوم التأسيس والبرمجة: [المبلغ] تُدفع 50% كدفعة مقدمة غير مستردة عند التوقيع، و50% بعد تدشين النظام واكتمال مرحلة الاختبار.
- الاشتراك الشهري (Retainer): [المبلغ] يُستحق بداية كل شهر ميلادي لتغطية الاستضافة والصيانة والدعم التقني.

البند الثالث: سرية البيانات والملكية الفكرية:
يلتزم الطرف الأول بالمحافظة على سرية بيانات عملاء الطرف الثاني وعدم مشاركة أي ملفات أو محادثات مع أي طرف ثالث. تؤول ملكية البيانات للطرف الثاني.

البند الرابع: مستوى الخدمة (SLA):
يلتزم الطرف الأول بضمان استقرار النظام بنسبة لا تقل عن 99%، ومعالجة أي توقف فني خلال 4 ساعات عمل من الإخطار.`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>حقيبة إغلاق الصفقات والتعاقدات (Enterprise Agency Closing Kit)</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          من أول مكالمة استكشاف حتى توقيع العقد الرسمي
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          الأدوات لا تبيع نفسها. استخدم محاكي مكالمات الاستكشاف، ونماذج العروض السعرية، وصيغة العقد القانوني لحسم صفقاتك باحترافية.
        </p>

        {/* Sub-tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button
            onClick={() => setActiveSubTab('discovery')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              activeSubTab === 'discovery' 
                ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold' 
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            مكالمة الاستكشاف (5 أسئلة)
          </button>
          <button
            onClick={() => setActiveSubTab('roleplay')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'roleplay' 
                ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold' 
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>محاكي مكالمة العميل (Roleplay)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('proposal')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              activeSubTab === 'proposal' 
                ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold' 
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            مقترح الباقات الثلاث (3-Tier)
          </button>
          <button
            onClick={() => setActiveSubTab('contract')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'contract' 
                ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold' 
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <FileSignature className="w-3.5 h-3.5" />
            <span>نموذج العقد الرسمي (SLA Contract)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('followup')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'followup' 
                ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold' 
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>جدول المتابعة (7-Day Followup)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('crm')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'crm' 
                ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold' 
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>متابعة العملاء (Mini CRM) ({leads.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('outreach')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              activeSubTab === 'outreach' 
                ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold' 
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            رسائل التواصل البارد
          </button>
        </div>
      </div>

      {/* Subtab 1: Discovery */}
      {activeSubTab === 'discovery' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-400 font-semibold block mb-1">
              قاعدة المبيعات الأولى: الاستماع 80% والحديث 20%
            </strong>
            لا تبدأ المكالمة بالحديث عن n8n أو APIs أو Docker! العميل لا يهتم بكيف صنعت النظام، بل يهتم بـ "هل هذا النظام سيوفر لي وقت وفلوس ويزيد مبيعاتي أم لا؟".
          </div>

          <div className="space-y-3">
            {discoveryQuestions.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold text-white">
                    {item.q}
                  </h3>
                  <button
                    onClick={() => copyText(item.q, `disc-${idx}`)}
                    className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                    title="نسخ السؤال"
                  >
                    {copiedSection === `disc-${idx}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-sky-400">الهدف من السؤال:</strong> {item.goal}
                </div>
                <div className="text-xs text-slate-400">
                  💡 <strong>نصيحة إغلاق:</strong> {item.tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 2: Interactive Roleplay */}
      {activeSubTab === 'roleplay' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">
              تمرين عملي: اختبر مهاراتك في الرد على اعتراضات العملاء الصعبة
            </span>
            <div className="flex gap-2">
              {ROLEPLAY_SCENARIOS.map((sc, i) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    setSelectedRoleplayIndex(i);
                    setChosenOptionIndex(null);
                  }}
                  className={`px-3 py-1 rounded-lg font-medium border text-xs ${
                    selectedRoleplayIndex === i
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  سيناريو #{i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Current scenario box */}
          {(() => {
            const currentSc = ROLEPLAY_SCENARIOS[selectedRoleplayIndex];
            return (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="text-xs font-semibold text-amber-400">
                  السياق: {currentSc.clientContext}
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm font-bold text-white">
                  العميل قال: {currentSc.clientSaid}
                </div>

                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-semibold text-slate-300 block">
                    كيف ترد عليه بطريقة استشارية تكسب ثقته وتغلق الصفقة؟
                  </span>

                  {currentSc.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => setChosenOptionIndex(optIdx)}
                      className={`w-full text-right p-3.5 rounded-xl border text-xs leading-relaxed transition-all ${
                        chosenOptionIndex === optIdx
                          ? opt.isBest
                            ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                            : 'bg-rose-950/40 border-rose-600 text-rose-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                {/* Feedback */}
                {chosenOptionIndex !== null && (
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    currentSc.options[chosenOptionIndex].isBest
                      ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
                      : 'bg-rose-950/30 border-rose-800 text-rose-300'
                  }`}>
                    <div className="font-bold mb-1">
                      {currentSc.options[chosenOptionIndex].isBest ? '✅ تحليل رائع ومقنع:' : '❌ تحليل الخطأ:'}
                    </div>
                    <div>{currentSc.options[chosenOptionIndex].feedback}</div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Subtab 3: 3-Tier Proposal */}
      {activeSubTab === 'proposal' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-slate-300">
              لماذا 3 باقات؟ لأن العميل حين يرى 3 باقات يسأل نفسه: "أي باقة أختار؟" بدلاً من "أشتري أم لا؟".
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">اسم العميل:</span>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-amber-300 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {proposalTemplates.map((p, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  idx === 1 
                    ? 'bg-slate-950 border-amber-500/80 shadow-lg ring-1 ring-amber-500/30' 
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">
                      {p.tier}
                    </span>
                    {idx === 1 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                        موصى بها
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-lg font-mono font-extrabold text-white">
                      {p.price}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {p.bestFor}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-300">ما يشمله العرض:</span>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {p.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800">
                  <button
                    onClick={() => copyText(`مقترح عمل مخصص لـ: ${clientName}\nالباقة: ${p.tier}\nالتكلفة: ${p.price}\nالمزايا:\n${p.features.map(f => '• ' + f).join('\n')}`, `prop-${idx}`)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 transition-colors"
                  >
                    {copiedSection === `prop-${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">تم نسخ الباقة!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ نص العرض للعميل</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 4: Contract SLA */}
      {activeSubTab === 'contract' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">
                عقد اتفاقية تقديم خدمات الأتمتة ومستوى الخدمة (SLA Contract)
              </h3>
              <p className="text-xs text-slate-400">
                صيغة قانونية تحميك وتضمن حقوقك المالية وحقوق العميل في الملكية الفكرية
              </p>
            </div>

            <button
              onClick={() => copyText(contractText, 'contract-copy')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-sm"
            >
              {copiedSection === 'contract-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'contract-copy' ? 'تم نسخ العقد!' : 'نسخ العقد بالكامل'}</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-sans text-xs text-slate-300 leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto">
            {contractText}
          </div>
        </div>
      )}

      {/* Subtab 5: 7-Day Follow-Up */}
      {activeSubTab === 'followup' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-400 font-semibold block mb-1">
              أكثر من 60% من الصفقات تغلق في المتابعة (Follow-up) وليس في المكالمة الأولى!
            </strong>
            إذا لم يرد العميل بعد إرسال المقترح، لا تيأس. أرسل هذه الرسائل المجدولة بلباقة.
          </div>

          <div className="space-y-3">
            {/* Followup 1 */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">اليوم التالي (اليوم 1 بعد إرسال العرض):</span>
                <button
                  onClick={() => copyText(`مساء الخير يا فندم 👋 حبيت أطمن لحضرتك إن مقترح نظام أتمتة الردود وصل تمام. هل فيه أي استفسار بخصوص الباقات أو الربط التقني تحب نوضحه؟`, 'f1')}
                  className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1"
                >
                  {copiedSection === 'f1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>نسخ</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "مساء الخير يا فندم 👋 حبيت أطمن لحضرتك إن مقترح نظام أتمتة الردود وصل تمام. هل فيه أي استفسار بخصوص الباقات أو الربط التقني تحب نوضحه؟"
              </p>
            </div>

            {/* Followup 2 */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400">اليوم الثالث (إضافة قيمة / Case Study):</span>
                <button
                  onClick={() => copyText(`أهلاً بحضرتك يا فندم. جهزت لحضرتك نموذج سريع (ديمو 30 ثانية) يوضح شكل الرد الذكي على أسئلة الحجز الخاصة بالعيادة. تقدر تشوف التجربة هنا [رابط]. تحب ننسق مكالمة 5 دقائق لتثبيت الميعاد؟`, 'f2')}
                  className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1"
                >
                  {copiedSection === 'f2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>نسخ</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "أهلاً بحضرتك يا فندم. جهزت لحضرتك نموذج سريع (ديمو 30 ثانية) يوضح شكل الرد الذكي على أسئلة الحجز الخاصة بالعيادة. تقدر تشوف التجربة هنا [رابط]. تحب ننسق مكالمة 5 دقائق لتثبيت الميعاد؟"
              </p>
            </div>

            {/* Followup 3 */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400">اليوم السابع (Breakup Email بلباقة):</span>
                <button
                  onClick={() => copyText(`تحياتي يا فندم. بتفهم جداً انشغالكم هذا الأسبوع. حتى لا أزعج حضرتك، سأغلق ملف المقترح حالياً. لو احتجتم إطلاق نظام الأتمتة وتوفير وقت الفريق مستقبلاً، تقدر ترجعلي في أي وقت. بالتوفيق الدائم لبيزنس حضراتكم!`, 'f3')}
                  className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1"
                >
                  {copiedSection === 'f3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>نسخ</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "تحياتي يا فندم. بتفهم جداً انشغالكم هذا الأسبوع. حتى لا أزعج حضرتك، سأغلق ملف المقترح حالياً. لو احتجتم إطلاق نظام الأتمتة وتوفير وقت الفريق مستقبلاً، تقدر ترجعلي في أي وقت. بالتوفيق الدائم لبيزنس حضراتكم!"
              </p>
              <div className="text-[11px] text-amber-300/80">
                💡 <strong>السر النفسي:</strong> رسالة الـ Breakup تجعل العميل يشعر أنه فقد اهتمامك، وغالباً يرد فوراً بـ "نعتذر عن التأخير، خلينا نوقع العقد!".
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 6: Mini CRM Lead Pipeline */}
      {activeSubTab === 'crm' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>إدارة خط مبيعات العملاء المحتملين (Agency Pipeline CRM)</span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                سجل الشركات والعيادات التي تستهدفها وتابع تقدم المحادثات من أول تواصل حتى التعاقد.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">الصفقات المغلقة:</span>
              <strong className="text-emerald-400 font-mono font-bold">
                {leads.filter(l => l.stage === 'won').length} من {leads.length}
              </strong>
            </div>
          </div>

          {/* Add New Lead Form */}
          <form onSubmit={addLead} className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <input
              type="text"
              value={newLeadName}
              onChange={(e) => setNewLeadName(e.target.value)}
              placeholder="اسم الشركة أو العيادة أو البراند..."
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />

            <select
              value={newLeadIndustry}
              onChange={(e) => setNewLeadIndustry(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-400"
            >
              <option value="عيادات ومراكز طبية">عيادات ومراكز طبية</option>
              <option value="تجارة إلكترونية">تجارة إلكترونية</option>
              <option value="عقارات واستثمار">عقارات واستثمار</option>
              <option value="فنادق وسياحة">فنادق وسياحة</option>
              <option value="خدمات واستشارات B2B">خدمات B2B</option>
            </select>

            <input
              type="text"
              value={newLeadDealValue}
              onChange={(e) => setNewLeadDealValue(e.target.value)}
              placeholder="قيمة الصفقة المقترحة (مثلاً $1,000 + $300/ش)..."
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة عميل مستهدف</span>
            </button>
          </form>

          {/* Leads Table / List */}
          <div className="space-y-2.5">
            {leads.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl text-xs text-slate-500">
                لا يوجد عملاء حالياً في الـ Pipeline. أضف أول عميل مستهدف بالأعلى!
              </div>
            ) : (
              leads.map((lead) => {
                const stageLabels: Record<string, { label: string; color: string }> = {
                  new: { label: 'عميل جديد', color: 'bg-slate-800 text-slate-300 border-slate-700' },
                  contacted: { label: 'تم إرسال رسالة', color: 'bg-sky-950 text-sky-300 border-sky-800' },
                  discovery: { label: 'مكالمة استكشاف', color: 'bg-amber-950 text-amber-300 border-amber-800' },
                  proposal: { label: 'تم إرسال العرض', color: 'bg-purple-950 text-purple-300 border-purple-800' },
                  won: { label: 'تم التعاقد والـ Retainer 🎉', color: 'bg-emerald-950 text-emerald-300 border-emerald-800 font-bold' }
                };

                return (
                  <div
                    key={lead.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{lead.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-slate-400">
                          {lead.industry}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span>القيمة المتوقعة: <strong className="text-emerald-400 font-mono">{lead.dealValue}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>ملاحظات: {lead.notes}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Stage Selector */}
                      <select
                        value={lead.stage}
                        onChange={(e) => updateLeadStage(lead.id, e.target.value as any)}
                        className={`rounded-lg px-2.5 py-1 text-xs border font-medium focus:outline-none ${stageLabels[lead.stage]?.color || ''}`}
                      >
                        <option value="new">عميل جديد</option>
                        <option value="contacted">تم إرسال رسالة</option>
                        <option value="discovery">مكالمة استكشاف</option>
                        <option value="proposal">تم إرسال العرض</option>
                        <option value="won">تم التعاقد والـ Retainer 🎉</option>
                      </select>

                      <button
                        onClick={() => copyText(`مساء الخير يا فندم بخصوص ${lead.name}، جهزنا لحضرتك ديمو لأتمتة الردود وحجز المواعيد على واتساب يختصر 80% من وقت الفريق. تحب نعرضه على حضرتك في مكالمة 5 دقائق؟`, `crm-${lead.id}`)}
                        className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors rounded-lg bg-slate-900 border border-slate-800"
                        title="نسخ رسالة تواصل مخصصة لهذا العميل"
                      >
                        {copiedSection === `crm-${lead.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Send className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors rounded-lg bg-slate-900 border border-slate-800"
                        title="حذف العميل"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Subtab 7: Cold Outreach */}
      {activeSubTab === 'outreach' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white">
                رسالة إنستجرام DM موجهة لبراند ملابس أو متجر إلكتروني:
              </h3>
              <button
                onClick={() => copyText(`مساء الخير يا فندم 👋 ما شاء الله شغل البراند تحفة ومتميز جداً!

كنت بشتري قطعة من الموقع ولاحظت إن الرد على المقاسات والشحن على الشات بياخد شوية وقت، وطبيعي مع ضغط الرسايل.

إحنا بنبني نظام AI Sales Agent على واتساب وإنستجرام بيرد في 5 ثوانٍ، يقترح المقاس المظبوط ويبعت رابط الدفع، وبيوفر أكتر من 20 ساعة أسبوعياً لفريقكم.

حابب أهديلكم تجربة مجانية على جزء من منتجاتكم تشوفوا سرعتها بنفسكم، لو مناسب أبعت لحضرتك ديمو مدته دقيقة؟`, 'dm-script')}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
              >
                {copiedSection === 'dm-script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>نسخ القالب</span>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed">
              {`مساء الخير يا فندم 👋 ما شاء الله شغل البراند تحفة ومتميز جداً!

كنت بشتري قطعة من الموقع ولاحظت إن الرد على المقاسات والشحن على الشات بياخد شوية وقت، وطبيعي مع ضغط الرسايل.

إحنا بنبني نظام AI Sales Agent على واتساب وإنستجرام بيرد في 5 ثوانٍ، يقترح المقاس المظبوط ويبعت رابط الدفع، وبيوفر أكتر من 20 ساعة أسبوعياً لفريقكم.

حابب أهديلكم تجربة مجانية على جزء من منتجاتكم تشوفوا سرعتها بنفسكم، لو مناسب أبعت لحضرتك ديمو مدته دقيقة؟`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
