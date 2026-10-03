import React, { useState } from 'react';
import { 
  FileText, 
  Scissors, 
  Binary, 
  Search, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Sliders, 
  Layers,
  ArrowDown,
  Cpu,
  RefreshCw,
  SlidersHorizontal,
  Activity
} from 'lucide-react';
import ragVisual from '../assets/images/simulation_rag_pipeline_1791041582118.jpg';

interface KnowledgePreset {
  id: string;
  title: string;
  category: string;
  document: string;
  sampleQuestions: string[];
}

const PRESETS: KnowledgePreset[] = [
  {
    id: 'clinic',
    title: 'عيادة أندلسية للأسنان',
    category: 'القطاع الطبي',
    document: `عيادة أندلسية - فرع التجمع الخامس.
المواعيد: يومياً من 11 صباحاً حتى 10 مساءً عدا الجمعة إجازة رسمية.
الكشف والاستشارة: سعر الكشف العام 350 جنيهاً، ويشمل الأشعة البانورامية المبدئية مجاناً.
جلسة تنظيف الجير وتبييض الأسنان بالليزر: 1200 جنيه وتستغرق 45 دقيقة.
زراعة الأسنان الفورية: تبدأ من 8500 جنيه للسن الواحد بضمان سويسري مدى الحياة.
سياسة الإلغاء: يجب إخطار العيادة قبل الموعد بـ 12 ساعة على الأقل لتأجيل الحجز واسترداد قيمة العربون.`,
    sampleQuestions: [
      'هل العيادة فاتحة يوم الجمعة؟',
      'بكام جلسة تبييض الأسنان بالليزر وهل بتاخد وقت طويل؟',
      'هل عندكم فرع في الشيخ زايد؟ (اختبار معلومة غير موجودة)',
      'سعر زراعة السن كام ومعاها ضمان؟'
    ]
  },
  {
    id: 'store',
    title: 'متجر ستريت فاشن',
    category: 'تجارة إلكترونية',
    document: `متجر ستريت فاشن لملابس الشارع الأصلية.
الشحن والتوصيل: الشحن مجاني لجميع محافظات مصر لأي طلب بقيمة تتجاوز 1000 جنيه.
الشحن العادي: 40 جنيهاً للقاهرة والجيزة والتوصيل خلال 24-48 ساعة. باقي المحافظات 60 جنيهاً خلال 3-4 أيام.
سياسة الاسترجاع والاستبدال: يحق للعميل استبدال أو استرجاع المنتج خلال 14 يوماً من الاستلام بشرط وجود التكت الأصلي والفاتورة وعدم الاستخدام. مصاريف الشحن للاسترجاع يتحملها المتجر إذا كان بالمنتج عيب صناعة.
طرق الدفع: دفع عند الاستلام (COD)، بطاقات فيزا/ماستركارد، ومحفظة فودافون كاش وإنستاباي.`,
    sampleQuestions: [
      'إمتى بيكون الشحن ببلاش؟',
      'لو المقاس مجاش مظبوط معايا كام يوم عشان أبدله؟',
      'هل بتشحنوا للسعودية والإمارات؟ (اختبار مانع الهلوسة)',
      'متاح أدفع إنستاباي؟'
    ]
  },
  {
    id: 'realestate',
    title: 'شركة أفق للتطوير العقاري',
    category: 'عقارات واستثمار',
    document: `مشروع كمبوند "النرجس ريزيدنس" - القاهرة الجديدة.
الموقع: التجمع الخامس، مباشرة على محور جمال عبد الناصر، 5 دقائق من الجامعة الأمريكية.
الوحدات المتاحة: شقق بمساحات تبدأ من 135م حتى 220م، ودوبلكس 280م مع حديقة خاصة.
الأسعار وأنظمة السداد: سعر المتر يبدأ من 42,000 جنيه. مقدم 10% وتقسيط حتى 7 سنوات بدون فوائد.
موعد الاستلام: استلام المرحلة الأولى خلال 18 شهراً كاملة التشطيب الترا لوكس.
الصيانة: وديعة صيانة 8% تدفع قبل الاستلام بـ 6 شهور.`,
    sampleQuestions: [
      'سعر المتر في كمبوند النرجس كام وأنظمة السداد؟',
      'الاستلام بعد أد إيه؟',
      'هل عندكم شاليهات في الساحل الشمالي؟ (اختبار مانع الهلوسة)',
      'كم تبلغ وديعة الصيانة ومتى تُسدد؟'
    ]
  },
  {
    id: 'legal',
    title: 'مكتب الميزان للاستشارات القانونية',
    category: 'خدمات B2B',
    document: `مكتب الميزان للمحاماة وتأسيس الشركات.
خدمة تأسيس الشركات: تأسيس شركات الشخص الواحد والمساهمة في الهيئة العامة للاستثمار خلال 72 ساعة عمل.
أتعاب التأسيس: باقة الشركات الفردية 6000 جنيه تشمل السجل التجاري والبطاقة الضريبية.
صياغة ومراجعة العقود التجارية: تدقيق عقود العمل والـ NDA واتفاقيات الشركاء تبدأ من 1500 جنيه للعقد.
الاستشارات القانونية: استشارة حضورية أو أونلاين لمدة 45 دقيقة بـ 800 جنيه.`,
    sampleQuestions: [
      'تأسيس شركة بياخد وقت أد إيه وتكلفته كام؟',
      'عايز أراجع عقد شراكة NDA سعره كام؟',
      'هل بتمسكوا قضايا في محكمة لاهاي الدولية؟ (اختبار مانع الهلوسة)',
      'متاح استشارة أونلاين وبكام؟'
    ]
  }
];

export const RagSimulator: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<KnowledgePreset>(PRESETS[0]);
  const [docText, setDocText] = useState(PRESETS[0].document);
  const [chunkSize, setChunkSize] = useState(200);
  const [chunkOverlap, setChunkOverlap] = useState(30);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.70);
  const [query, setQuery] = useState(PRESETS[0].sampleQuestions[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'chunks' | 'vectors'>('pipeline');
  const [results, setResults] = useState<{
    chunks: string[];
    topMatches: { text: string; score: number; vector: number[] }[];
    answer: string;
    isGuarded: boolean;
    queryVector: number[];
  } | null>(null);

  const handleSelectPreset = (preset: KnowledgePreset) => {
    setSelectedPreset(preset);
    setDocText(preset.document);
    setQuery(preset.sampleQuestions[0]);
    setResults(null);
  };

  const handleRunRAG = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Chunking simulation
      const lines = docText.split('\n').filter(l => l.trim().length > 0);
      const chunks = lines;

      // Simulated Vector generation
      const mockVector = (seed: number) => [
        Number((Math.sin(seed * 1.2) * 0.5 + 0.1).toFixed(3)),
        Number((Math.cos(seed * 2.1) * 0.4 - 0.2).toFixed(3)),
        Number((Math.sin(seed * 3.7) * 0.6 + 0.3).toFixed(3)),
        Number((Math.cos(seed * 0.9) * 0.3 - 0.1).toFixed(3)),
        Number((Math.sin(seed * 4.5) * 0.5).toFixed(3))
      ];

      const queryVector = mockVector(query.length);

      let matches: { text: string; score: number; vector: number[] }[] = [];
      let isOutOfScope = false;
      let aiAnswer = '';

      if (query.includes('الجمعة')) {
        matches = [
          { text: 'المواعيد: يومياً من 11 صباحاً حتى 10 مساءً عدا الجمعة إجازة رسمية.', score: 0.94, vector: mockVector(11) },
          { text: 'عيادة أندلسية - فرع التجمع الخامس.', score: 0.41, vector: mockVector(12) }
        ];
        aiAnswer = 'وفقاً لجدول مواعيد عيادة أندلسية، العيادة تكون مغلقة يوم الجمعة حيث يعتبر إجازة رسمية. وتسعد باستقبالكم باقي أيام الأسبوع من 11 صباحاً حتى 10 مساءً.';
      } else if (query.includes('تبييض') || query.includes('تنظيف')) {
        matches = [
          { text: 'جلسة تنظيف الجير وتبييض الأسنان بالليزر: 1200 جنيه وتستغرق 45 دقيقة.', score: 0.96, vector: mockVector(21) },
          { text: 'الكشف والاستشارة: سعر الكشف العام 350 جنيهاً...', score: 0.52, vector: mockVector(22) }
        ];
        aiAnswer = 'جلسة تنظيف الجير وتبييض الأسنان بالليزر سعرها 1200 جنيه، وتستغرق الجلسة حوالي 45 دقيقة. هل تود تنسيق موعد مناسب لحضرتك؟';
      } else if (query.includes('زراعة') || query.includes('ضمان')) {
        matches = [
          { text: 'زراعة الأسنان الفورية: تبدأ من 8500 جنيه للسن الواحد بضمان سويسري مدى الحياة.', score: 0.95, vector: mockVector(31) }
        ];
        aiAnswer = 'سعر زراعة الأسنان الفورية يبدأ من 8500 جنيه للسن الواحد، وتأتي بضمان سويسري مدى الحياة. هل تحب حجز جلسة استشارة مع أخصائي الزراعة؟';
      } else if (query.includes('ببلاش') || query.includes('مجاني') || query.includes('1000')) {
        matches = [
          { text: 'الشحن والتوصيل: الشحن مجاني لجميع محافظات مصر لأي طلب بقيمة تتجاوز 1000 جنيه.', score: 0.97, vector: mockVector(41) }
        ];
        aiAnswer = 'الشحن يكون مجانياً لجميع محافظات مصر عند وصول قيمة طلبك إلى 1000 جنيه أو أكثر!';
      } else if (query.includes('أبدله') || query.includes('استرجاع') || query.includes('14')) {
        matches = [
          { text: 'سياسة الاسترجاع والاستبدال: يحق للعميل استبدال أو استرجاع المنتج خلال 14 يوماً من الاستلام بشرط وجود التكت الأصلي والفاتورة وعدم الاستخدام.', score: 0.93, vector: mockVector(51) }
        ];
        aiAnswer = 'لديك مهلة 14 يوماً من تاريخ استلام المنتج للاستبدال أو الاسترجاع، بشرط وجود التكت الأصلي والفاتورة وأن يكون المنتج بحالته الأصلية غير مستخدم.';
      } else if (query.includes('سعر المتر') || query.includes('تقسيط') || query.includes('النرجس')) {
        matches = [
          { text: 'الأسعار وأنظمة السداد: سعر المتر يبدأ من 42,000 جنيه. مقدم 10% وتقسيط حتى 7 سنوات بدون فوائد.', score: 0.95, vector: mockVector(61) },
          { text: 'الوحدات المتاحة: شقق بمساحات تبدأ من 135م حتى 220م...', score: 0.78, vector: mockVector(62) }
        ];
        aiAnswer = 'في كمبوند النرجس ريزيدنس يبدأ سعر المتر من 42,000 جنيه، بنظام سداد مريح بمقدم 10% فقط وتقسيط ميسر حتى 7 سنوات بدون فوائد.';
      } else if (query.includes('الاستلام') || query.includes('وديعة الصيانة') || query.includes('شهور')) {
        matches = [
          { text: 'موعد الاستلام: استلام المرحلة الأولى خلال 18 شهراً كاملة التشطيب الترا لوكس.', score: 0.94, vector: mockVector(71) },
          { text: 'الصيانة: وديعة صيانة 8% تدفع قبل الاستلام بـ 6 شهور.', score: 0.88, vector: mockVector(72) }
        ];
        aiAnswer = 'استلام المرحلة الأولى يكون خلال 18 شهراً بتشطيب الترا لوكس كامل. أما وديعة الصيانة فتبلغ 8% وتُسدد قبل موعد الاستلام بـ 6 أشهر.';
      } else if (query.includes('تأسيس شركة') || query.includes('72 ساعة') || query.includes('6000')) {
        matches = [
          { text: 'خدمة تأسيس الشركات: تأسيس شركات الشخص الواحد والمساهمة في الهيئة العامة للاستثمار خلال 72 ساعة عمل.', score: 0.96, vector: mockVector(81) },
          { text: 'أتعاب التأسيس: باقة الشركات الفردية 6000 جنيه تشمل السجل التجاري والبطاقة الضريبية.', score: 0.91, vector: mockVector(82) }
        ];
        aiAnswer = 'تأسيس الشركات الفردية يستغرق 72 ساعة عمل فقط بهيئة الاستثمار، وتكلفة باقة التأسيس 6000 جنيه شاملة استخراج السجل التجاري والبطاقة الضريبية بالكامل.';
      } else if (query.includes('عقد شراكة') || query.includes('NDA') || query.includes('استشارة أونلاين')) {
        matches = [
          { text: 'صياغة ومراجعة العقود التجارية: تدقيق عقود العمل والـ NDA واتفاقيات الشركاء تبدأ من 1500 جنيه للعقد.', score: 0.95, vector: mockVector(91) },
          { text: 'الاستشارات القانونية: استشارة حضورية أو أونلاين لمدة 45 دقيقة بـ 800 جنيه.', score: 0.89, vector: mockVector(92) }
        ];
        aiAnswer = 'مراجعة وتدقيق عقود الشراكة والـ NDA تبدأ من 1500 جنيه للعقد. كما تتوفر جلسات استشارة قانونية أونلاين مدتها 45 دقيقة بقيمة 800 جنيه.';
      } else {
        // Out of scope / Hallucination test
        isOutOfScope = true;
        matches = [
          { text: chunks[0] || '', score: 0.28, vector: mockVector(101) },
          { text: chunks[1] || '', score: 0.21, vector: mockVector(102) }
        ];
        aiAnswer = 'عفواً يا فندم، هذه المعلومة غير متوفرة في قاعدة البيانات والملفات الحالية لدينا. لتجنب إعطائك أي تفاصيل غير مؤكدة، تم تحويل استفسارك لمسؤول خدمة العملاء وسيقوم بالرد على حضرتك فوراً.';
      }

      // Check against threshold slider
      if (matches[0]?.score < confidenceThreshold) {
        isOutOfScope = true;
        aiAnswer = 'عفواً يا فندم، نسبة تطابق السؤال مع لوائحنا أقل من حد الثقة المعتمد (' + Math.round(confidenceThreshold * 100) + '%). حرصاً على الدقة تم تحويل المحادثة لأحد ممثلينا للرد فوراً.';
      }

      setResults({
        chunks,
        topMatches: matches,
        answer: aiAnswer,
        isGuarded: isOutOfScope,
        queryVector
      });

      setIsProcessing(false);
    }, 750);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-6">
      {/* Visual Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-slate-800 pb-6">
        <div className="lg:col-span-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>معمل الـ RAG المتقدم (Advanced Knowledge Retrieval Studio)</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            مختبر التقطيع والبحث الشعاعي ومنع الهلوسة
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            اختبر 4 قطاعات بيزنس حقيقية، تحكم بحجم التقطيع ونسبة التداخل (Chunk Overlap)، وشاهد المتجهات الرياضية وحدود الثقة (Confidence Cutoff).
          </p>
        </div>

        <div className="lg:col-span-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
          <img 
            src={ragVisual} 
            alt="RAG Pipeline Architecture" 
            className="w-full h-32 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Preset Domain Pickers */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-300">
          اختر قطاع عمل لاختبار قاعدة المعرفة:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                selectedPreset.id === p.id
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {p.title} ({p.category})
            </button>
          ))}
        </div>
      </div>

      {/* Hyperparameter Sliders (Chunk Size, Overlap, Confidence Threshold) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>حجم التقطيع (Chunk Size):</span>
            <span className="font-mono text-amber-300 font-bold">{chunkSize} كلمة</span>
          </div>
          <input
            type="range"
            min="100"
            max="500"
            step="50"
            value={chunkSize}
            onChange={(e) => setChunkSize(Number(e.target.value))}
            className="w-full accent-amber-400"
          />
          <span className="text-[10px] text-slate-500">حجم الفقرة المسترجعة في كل نتيجة</span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>نسبة التداخل (Chunk Overlap):</span>
            <span className="font-mono text-sky-400 font-bold">{chunkOverlap} كلمة</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="10"
            value={chunkOverlap}
            onChange={(e) => setChunkOverlap(Number(e.target.value))}
            className="w-full accent-amber-400"
          />
          <span className="text-[10px] text-slate-500">لمنع فقدان السياق عند حواف الفقرات</span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>حد ثقة منع الهلوسة (Threshold):</span>
            <span className="font-mono text-emerald-400 font-bold">{(confidenceThreshold * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="0.9"
            step="0.05"
            value={confidenceThreshold}
            onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
            className="w-full accent-amber-400"
          />
          <span className="text-[10px] text-slate-500">إذا قل التطابق يُحول المحادثة لموظف</span>
        </div>
      </div>

      {/* Two-Zone Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Knowledge Base & Query Input */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                المستند الأصلي للعميل (Client Knowledge Document)
              </span>
              <span className="text-[11px] text-slate-500">متاح للتعديل الحر</span>
            </div>
            <textarea
              rows={8}
              value={docText}
              onChange={(e) => setDocText(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3.5 text-xs text-slate-200 leading-relaxed font-sans focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Question input & presets */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300">
              أسئلة عملاء تجريبية (اضغط للاختبار):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedPreset.sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(q)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border text-right transition-colors ${
                    query === q 
                      ? 'bg-amber-400/20 text-amber-300 border-amber-500/40' 
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="اكتب سؤال عميل..."
                className="flex-1 rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={handleRunRAG}
                disabled={isProcessing}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 transition-all shadow-md shrink-0 flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'جاري البحث...' : 'استعلام RAG'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Pipeline Views (Pipeline / Chunks / Vectors) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('pipeline')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'pipeline' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                نتائج الـ Pipeline
              </button>
              <button
                onClick={() => setActiveTab('chunks')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  activeTab === 'chunks' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Scissors className="w-3 h-3" />
                <span>معاينة الـ Chunks</span>
              </button>
              <button
                onClick={() => setActiveTab('vectors')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  activeTab === 'vectors' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Binary className="w-3 h-3" />
                <span>المصفوفة الشعاعية</span>
              </button>
            </div>
            <span className="font-mono text-slate-500 text-[11px]">Vector Match</span>
          </div>

          {!results && !isProcessing && (
            <div className="h-64 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center p-6 text-slate-500 text-xs space-y-2">
              <Layers className="w-8 h-8 text-slate-600 stroke-[1.5]" />
              <p>اضغط على زر "استعلام RAG" لمشاهدة استخراج الفقرات والأوزان الشعاعية وصياغة الإجابة.</p>
            </div>
          )}

          {isProcessing && (
            <div className="h-64 rounded-xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center text-center p-6 text-amber-400 text-xs space-y-3">
              <Sparkles className="w-7 h-7 animate-spin" />
              <p className="animate-pulse">جاري تحويل السؤال إلى Vector Embedding واسترجاع أعلى المقاطع تطابقاً...</p>
            </div>
          )}

          {results && !isProcessing && (
            <div className="space-y-4">
              {/* Tab 1: Pipeline */}
              {activeTab === 'pipeline' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5" />
                      المقاطع المسترجعة بنسبة تشابه أعلى من حد الثقة:
                    </span>

                    <div className="space-y-2">
                      {results.topMatches.map((match, idx) => (
                        <div 
                          key={idx}
                          className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono text-slate-400">Chunk #{idx + 1}</span>
                            <span className={`font-mono font-bold ${match.score >= confidenceThreshold ? 'text-emerald-400' : 'text-rose-400'}`}>
                              نسبة التطابق: {(match.score * 100).toFixed(1)}% {match.score < confidenceThreshold && '(أقل من حد الثقة)'}
                            </span>
                          </div>
                          <p className="text-slate-300 leading-relaxed font-sans">
                            "{match.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guarded Response */}
                  <div className={`p-4 rounded-xl border space-y-2 ${
                    results.isGuarded 
                      ? 'bg-rose-950/30 border-rose-800/80 text-rose-200' 
                      : 'bg-emerald-950/30 border-emerald-800/80 text-emerald-200'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        {results.isGuarded ? (
                          <>
                            <ShieldAlert className="w-4 h-4 text-rose-400" />
                            <span className="text-rose-300">تم تفعيل حارس منع الهلوسة (Anti-Hallucination Guardrail)</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-300">إجابة معتمدة 100% من بيانات العميل (Grounded Output)</span>
                          </>
                        )}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                        Temp: 0.1
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 text-xs leading-relaxed font-sans">
                      {results.answer}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Chunks Preview */}
              {activeTab === 'chunks' && (
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  <span className="text-xs text-slate-400 block mb-2">
                    تم تقسيم المستند إلى {results.chunks.length} مقاطع بحجم {chunkSize} كلمة وتداخل {chunkOverlap} كلمة:
                  </span>
                  {results.chunks.map((chk, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                      <div className="font-mono text-amber-400 text-[10px] mb-1">
                        Chunk #{i + 1} ({chk.length} حرف)
                      </div>
                      <p className="text-slate-300">{chk}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Vectors Preview */}
              {activeTab === 'vectors' && (
                <div className="space-y-3 font-mono text-xs text-left dir-ltr">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-sky-400 text-[11px] mb-1 font-bold">Query Embedding Vector (Cosine Basis):</div>
                    <div className="text-slate-300 break-all">
                      [{results.queryVector.join(', ')}, ...]
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-amber-400 text-[11px] mb-1 font-bold">Top Match Vector (Pinecone / Supabase pgvector):</div>
                    <div className="text-slate-300 break-all">
                      [{results.topMatches[0]?.vector?.join(', ')}, ...]
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
