import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Copy, 
  Check, 
  Users, 
  Sparkles, 
  Award,
  Zap,
  CheckCircle2,
  XCircle,
  Printer,
  FileText
} from 'lucide-react';
import growthVisual from '../assets/images/client_acquisition_growth_1791041592228.jpg';

interface IndustryBenchmark {
  id: string;
  name: string;
  defaultMessages: number;
  conversionBoost: number;
  avgOrderValue: number;
}

const INDUSTRIES: IndustryBenchmark[] = [
  { id: 'clinic', name: 'عيادات ومراكز طبية', defaultMessages: 1200, conversionBoost: 35, avgOrderValue: 50 },
  { id: 'ecommerce', name: 'متاجر تجارة إلكترونية', defaultMessages: 3500, conversionBoost: 40, avgOrderValue: 40 },
  { id: 'realestate', name: 'شركات ووسطاء عقارات', defaultMessages: 800, conversionBoost: 25, avgOrderValue: 300 },
  { id: 'hospitality', name: 'فنادق ومنتجعات سياحية', defaultMessages: 1500, conversionBoost: 30, avgOrderValue: 120 },
  { id: 'b2b', name: 'شركات خدمات واستشارات B2B', defaultMessages: 600, conversionBoost: 28, avgOrderValue: 250 }
];

interface CurrencyConfig {
  code: string;
  symbol: string;
  rateToUsd: number;
}

const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rateToUsd: 1 },
  EGP: { code: 'EGP', symbol: 'ج.م', rateToUsd: 50 },
  SAR: { code: 'SAR', symbol: 'ر.س', rateToUsd: 3.75 },
  AED: { code: 'AED', symbol: 'د.إ', rateToUsd: 3.67 }
};

export const RoiPricingCalculator: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryBenchmark>(INDUSTRIES[0]);
  const [currencyCode, setCurrencyCode] = useState<string>('USD');
  const [monthlyMessages, setMonthlyMessages] = useState<number>(1200);
  const [csEmployees, setCsEmployees] = useState<number>(2);
  const [employeeSalaryUsd, setEmployeeSalaryUsd] = useState<number>(450);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);
  const [copiedQuotation, setCopiedQuotation] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'calculator' | 'comparison' | 'quotation'>('calculator');

  const curr = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const formatMoney = (valUsd: number) => {
    const converted = Math.round(valUsd * curr.rateToUsd);
    return `${curr.symbol} ${converted.toLocaleString('ar-EG')}`;
  };

  // Calculations
  const hoursSpentManually = Math.round((monthlyMessages * 4) / 60);
  const totalMonthlyPayrollUsd = csEmployees * employeeSalaryUsd;
  const repetitiveCostMonthlyUsd = Math.round(totalMonthlyPayrollUsd * 0.7);

  // Suggested Agency Pricing
  const suggestedSetupFeeUsd = Math.max(750, Math.round(monthlyMessages * 0.45));
  const suggestedRetainerUsd = Math.max(200, Math.round(repetitiveCostMonthlyUsd * 0.35));

  const netMonthlySavingsUsd = repetitiveCostMonthlyUsd - suggestedRetainerUsd;
  const netYearlySavingsUsd = (netMonthlySavingsUsd * 12) - suggestedSetupFeeUsd;
  const estimatedNewBookingsOrSales = Math.round(monthlyMessages * 0.05 * (selectedIndustry.conversionBoost / 100));

  const generateProposalPitch = () => {
    return `مرحبا يا فندم،
بناءً على مكالمة الاستكشاف وتحليل استفسارات ${selectedIndustry.name} الخاصة بكم:

📊 الوضع الحالي:
• حجم الاستفسارات الشهرية: ${monthlyMessages.toLocaleString('ar-EG')} محادثة على واتساب وسوشيال ميديا.
• الوقت اليدوي المستهلك للرد: قرابة ${hoursSpentManually} ساعة شهرياً.
• تكلفة الرواتب المهدورة في الإجابات المتكررة: ~${formatMoney(repetitiveCostMonthlyUsd)} شهرياً.

🚀 الحل المقترح بنظام AI Automation:
1. الرد الذكي اللحظي 24/7 خلال أقل من 8 ثوانٍ لجميع العملاء.
2. حجز المواعيد/الطلبات في التقويم وقاعدة البيانات تلقائياً.
3. تحويل المحادثات الحرجة فقط للموظفين (Human Handoff).

💰 هيكل الاستثمار والعائد:
• رسوم التأسيس والربط (Setup Fee مرة واحدة): ${formatMoney(suggestedSetupFeeUsd)}
• الاشتراك الشهري الشامل للاستضافة والتطوير (Monthly Retainer): ${formatMoney(suggestedRetainerUsd)}/شهرياً
• صافي الوفر المالي لشركتكم في السنة الأولى: أكثر من ${formatMoney(netYearlySavingsUsd)}
• نمو متوقع في المبيعات والحجوزات بنسبة +${selectedIndustry.conversionBoost}% بفضل السرعة الفائقة!`;
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(generateProposalPitch());
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-6">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-slate-800 pb-6">
        <div className="lg:col-span-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Calculator className="w-4 h-4" />
            <span>حاسبة الـ ROI والتسعير المالي الذكي (AI Automation Investment Suite)</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            حساب العائد الاستثماري وتسعير العقود الشهرية
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            حدد أتعابك بناءً على القيمة (Value-based Pricing). احسب الوفر المالي للعميل بالعملة المفضلة، واعرض مقارنة بالأرقام تقنعه بتوقيع العقد فوراً.
          </p>

          {/* Subtabs for Calculator vs Comparison vs Quotation */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'calculator' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              حاسبة التسعير والـ ROI
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'comparison' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              مقارنة الوضع الحالي vs نظام الأتمتة
            </button>
            <button
              onClick={() => setActiveTab('quotation')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'quotation' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>عرض السعر الرسمي (Quotation)</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
          <img 
            src={growthVisual} 
            alt="Client ROI Growth Dashboard" 
            className="w-full h-32 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Currency Switcher & Industry Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">قطاع العميل:</span>
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              onClick={() => {
                setSelectedIndustry(ind);
                setMonthlyMessages(ind.defaultMessages);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedIndustry.id === ind.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>

        {/* Currency select */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400">العملة:</span>
          <div className="flex rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {Object.keys(CURRENCIES).map((cKey) => (
              <button
                key={cKey}
                onClick={() => setCurrencyCode(cKey)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-colors ${
                  currencyCode === cKey 
                    ? 'bg-amber-400 text-slate-950' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cKey}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab 1: Calculator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-5 p-5 rounded-xl bg-slate-950/70 border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>بيانات التكاليف اليدوية الحالية</span>
            </h3>

            {/* Slider 1: Monthly Messages */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">حجم الرسائل الشهرية:</span>
                <span className="font-mono font-bold text-amber-400 tabular-nums">
                  {monthlyMessages.toLocaleString('ar-EG')} رسالة
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="15000"
                step="100"
                value={monthlyMessages}
                onChange={(e) => setMonthlyMessages(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            {/* Slider 2: CS Employees */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">موظفي خدمة العملاء والشات:</span>
                <span className="font-mono font-bold text-amber-400 tabular-nums">
                  {csEmployees} موظف
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={csEmployees}
                onChange={(e) => setCsEmployees(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            {/* Slider 3: Employee Salary */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">متوسط راتب الموظف الواحد:</span>
                <span className="font-mono font-bold text-emerald-400 tabular-nums">
                  {formatMoney(employeeSalaryUsd)}/شهر
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="2500"
                step="50"
                value={employeeSalaryUsd}
                onChange={(e) => setEmployeeSalaryUsd(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-rose-300">
                <Clock className="w-3.5 h-3.5" />
                <span>الوقت والمال المستنزف شهرياً:</span>
              </div>
              <p>
                يضيع العميل قرابة <strong className="text-white font-mono">{hoursSpentManually} ساعة</strong> شهرياً وتكلفة رواتب متكررة تصل إلى <strong className="text-white font-mono">{formatMoney(repetitiveCostMonthlyUsd)}</strong>.
              </p>
            </div>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7 space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400">Setup Fee المقترح</span>
                <div className="text-xl font-mono font-extrabold text-white tabular-nums">
                  {formatMoney(suggestedSetupFeeUsd)}
                </div>
                <span className="text-[10px] text-slate-500 block">دفعة أولى لمرة واحدة</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/40 space-y-1 ring-1 ring-amber-500/20">
                <span className="text-[11px] text-amber-400 font-semibold">Retainer شهري مقترح</span>
                <div className="text-xl font-mono font-extrabold text-amber-400 tabular-nums">
                  {formatMoney(suggestedRetainerUsd)}/ش
                </div>
                <span className="text-[10px] text-slate-400 block">صيانة واستضافة وتطوير</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-emerald-400 font-semibold">صافي وفر العميل (سنة 1)</span>
                <div className="text-xl font-mono font-extrabold text-emerald-400 tabular-nums">
                  +{formatMoney(netYearlySavingsUsd)}
                </div>
                <span className="text-[10px] text-slate-500 block">بعد خصم كافة أتعابك</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <Zap className="w-4 h-4" />
                  معدل تسريع الاستجابة والمبيعات
                </span>
                <span className="font-mono text-emerald-400 font-bold">+{selectedIndustry.conversionBoost}% مبيعات</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                تحويل زمن الرد من ساعتين إلى <strong className="text-white">8 ثوانٍ فقط</strong> يولد قرابة <strong className="text-white font-mono">{estimatedNewBookingsOrSales} حجز/طلب إضافي</strong> كل شهر.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  ملخص العرض التجاري السريع:
                </span>
                <button
                  onClick={handleCopyPitch}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-sm"
                >
                  {copiedPitch ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPitch ? 'تم النسخ!' : 'نسخ النص للواتساب'}</span>
                </button>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 leading-relaxed font-sans max-h-40 overflow-y-auto whitespace-pre-line">
                {generateProposalPitch()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Comparison Matrix */}
      {activeTab === 'comparison' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            مقارنة مباشرة بالأرقام والميزات لتوضيح الفرق الصادم بين الوضع اليدوي الحالي ونظام الأتمتة:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Current Manual State */}
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <XCircle className="w-5 h-5 shrink-0" />
                <span>الوضع اليدوي الحالي (قبل الأتمتة)</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">✕</span>
                  <span>متوسط وقت الرد: 45 دقيقة إلى ساعتين (وقت طويل يضيع العميل للمنافسين).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">✕</span>
                  <span>ساعات العمل: 8 ساعات فقط باليوم، وتوقف تام بالمساء والعطلات.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">✕</span>
                  <span>تكلفة مستمرة: {formatMoney(totalMonthlyPayrollUsd)} شهرياً رواتب لموظفي الشات.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">✕</span>
                  <span>أخطاء بشرية وتشتت أثناء ضغط الرسائل وتأخير تسجيل المواعيد في الشيت.</span>
                </li>
              </ul>
            </div>

            {/* AI Automated State */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>نظام AI Automation المتكامل</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>متوسط وقت الرد: <strong>أقل من 8 ثوانٍ</strong> 24 ساعة بدون انقطاع.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>تغطية بنسبة 100% ليلاً وأيام الإجازات لحصد كل عميل محتمل فوراً.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>تكلفة مخفضة: {formatMoney(suggestedRetainerUsd)} شهرياً فقط مع وفر سنوي يتجاوز {formatMoney(netYearlySavingsUsd)}.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>تسجيل آلي في Supabase و Google Calendar مع تحويل الحالات الخاصة للموظفين.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Official Quotation / Proposal Sheet */}
      {activeTab === 'quotation' && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 text-xs text-slate-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-lg font-bold text-white tracking-tight">
                عرض سعر رسمي: نظام أتمتة الذكاء الاصطناعي (AI Automation Quotation)
              </div>
              <div className="text-slate-400 text-xs mt-0.5">
                العميل المستهدف: {selectedIndustry.name} · التاريخ: {new Date().toLocaleDateString('ar-EG')}
              </div>
            </div>

            <button
              onClick={() => {
                window.print();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700 text-amber-300 text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة / حفظ PDF</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <span className="text-slate-400 font-semibold">1. رسوم التأسيس والربط (Setup Fee):</span>
                <div className="text-lg font-mono font-bold text-white">{formatMoney(suggestedSetupFeeUsd)}</div>
                <p className="text-slate-400 text-[11px]">تشمل: بناء مسارات n8n، تدريب نموذج RAG، الربط بـ WhatsApp Cloud API، واختبار مانع الهلوسة.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <span className="text-amber-400 font-semibold">2. اشتراك الصيانة والدعم (Monthly Retainer):</span>
                <div className="text-lg font-mono font-bold text-amber-300">{formatMoney(suggestedRetainerUsd)}/شهرياً</div>
                <p className="text-slate-400 text-[11px]">تشمل: استضافة السيرفر السحابي، تحديث مستمر لقاعدة المعرفة، مراقبة الأعطال 24/7، ونسخ احتياطي أسبوعي.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="font-bold text-white block">شروط التنفيذ والضمان:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-400 leading-relaxed">
                <li>مدة تسليم وتدشين النظام: 7 إلى 10 أيام عمل من تاريخ استلام ملفات المنتجات والاعتماد.</li>
                <li>ضمان تشغيلي كامل: إصلاح أي توقف أو عطل تقني خلال 4 ساعات عمل كحد أقصى.</li>
                <li>دفع 50% مقدم عند التعاقد، و 50% بعد اكتمال مرحلة الاختبار الميداني والتسليم الرسمي.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
