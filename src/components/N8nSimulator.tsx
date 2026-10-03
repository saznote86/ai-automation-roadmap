import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Code2, 
  Cpu, 
  Database, 
  Send, 
  Radio, 
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ArrowDown,
  ArrowLeft,
  Download,
  Copy,
  Check,
  Settings2,
  Terminal,
  Layers,
  Sliders,
  Mic,
  Image as ImageIcon,
  FileCheck,
  Pause,
  SkipForward
} from 'lucide-react';

interface SimulatedNode {
  id: string;
  name: string;
  type: string;
  icon: React.ReactNode;
  status: 'idle' | 'running' | 'success' | 'error';
  executionTimeMs?: number;
  inputData?: any;
  outputData?: any;
  config?: Record<string, any>;
}

const PRESET_MESSAGES = {
  ar: [
  {
    label: 'حجز موعد عيادة (نص)',
    text: 'أهلاً، عايز أحجز كشف باطنة بكرة بعد العصر لو سمحت. أنا أحمد علي.',
    type: 'text',
    scenario: 'booking'
  },
  {
    label: 'رسالة صوتية (Voice Note)',
    text: '[تسجيل صوتي 12 ثانية]: "يا فندم مقاس 43 من السنيكرز الأبيض متوفر؟ وتوصيل المعادي بكام؟"',
    type: 'voice',
    scenario: 'voice'
  },
  {
    label: 'صورة إيصال تحويل (Image OCR)',
    text: '[صورة إيصال فودافون كاش]: "تم تحويل 1200 جنيه على المحفظة لتأكيد حجز عملية زراعة الأسنان."',
    type: 'image',
    scenario: 'ocr'
  },
  {
    label: 'شكوى تأخير عاجلة',
    text: 'الطلب رقم #8912 متأخر بقاله أسبوع! عايز أعرف فين أوردراتي وفلوسي؟',
    type: 'text',
    scenario: 'complaint'
  },
  {
    label: 'اختبار الهلوسة (خارج النطاق)',
    text: 'ممكن تديني رقم الدكتور الشخصي عشان أسأله في موضوع خاص بالبيت؟',
    type: 'text',
    scenario: 'guardrail'
  }
  ],
  fr: [
    { label: 'Rendez-vous en clinique (texte)', text: 'Bonjour, je voudrais prendre rendez-vous demain après-midi. Je m’appelle Ahmed Ali.', type: 'text', scenario: 'booking' },
    { label: 'Message vocal', text: '[Message vocal de 12 secondes] : « La pointure 43 des baskets blanches est-elle disponible ? Et la livraison à Maadi coûte combien ? »', type: 'voice', scenario: 'voice' },
    { label: 'Photo d’un reçu (OCR)', text: '[Reçu Vodafone Cash] : « 1 200 EGP transférés pour confirmer le rendez-vous d’implant dentaire. »', type: 'image', scenario: 'ocr' },
    { label: 'Réclamation urgente', text: 'La commande n°8912 a une semaine de retard ! Où est-elle et quand serai-je remboursé ?', type: 'text', scenario: 'complaint' },
    { label: 'Test anti-hallucination', text: 'Pouvez-vous me donner le numéro personnel du médecin pour une question privée ?', type: 'text', scenario: 'guardrail' }
  ],
  en: [
    { label: 'Clinic booking (text)', text: 'Hi, I would like to book an internal medicine appointment tomorrow afternoon. I’m Ahmed Ali.', type: 'text', scenario: 'booking' },
    { label: 'Voice note', text: '[12-second voice note]: “Is size 43 of the white sneakers available? How much is delivery to Maadi?”', type: 'voice', scenario: 'voice' },
    { label: 'Transfer receipt image (OCR)', text: '[Vodafone Cash receipt]: “EGP 1,200 transferred to confirm the dental implant appointment.”', type: 'image', scenario: 'ocr' },
    { label: 'Urgent delivery complaint', text: 'Order #8912 is a week late! Where is it and what about my refund?', type: 'text', scenario: 'complaint' },
    { label: 'Hallucination test (out of scope)', text: 'Can you give me the doctor’s personal number for a private matter?', type: 'text', scenario: 'guardrail' }
  ]
} as const;

export const N8nSimulator: React.FC = () => {
  const { language } = useI18n();
  const presets = PRESET_MESSAGES[language];
  const [customerMessage, setCustomerMessage] = useState<string>(presets[0].text);
  const [messageType, setMessageType] = useState<'text' | 'voice' | 'image'>('text');
  const [selectedChannel, setSelectedChannel] = useState<'whatsapp' | 'instagram' | 'telegram'>('whatsapp');
  const [selectedModel, setSelectedModel] = useState<'claude-3-5-sonnet' | 'gpt-4o' | 'gemini-2-5-flash'>('claude-3-5-sonnet');
  const [temperature, setTemperature] = useState(0.1);
  const [simulateError, setSimulateError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>('node-1');
  const [copiedWorkflow, setCopiedWorkflow] = useState(false);
  const [activeView, setActiveView] = useState<'inspector' | 'console' | 'config'>('inspector');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const [nodes, setNodes] = useState<SimulatedNode[]>([
    {
      id: 'node-1',
      name: 'Channel Webhook Trigger',
      type: 'Trigger Node',
      icon: <Radio className="w-5 h-5 text-emerald-400" />,
      status: 'idle',
      config: {
        httpMethod: 'POST',
        path: '/webhook/channel-receiver',
        authentication: 'Header Auth (HMAC)'
      }
    },
    {
      id: 'node-2',
      name: 'Code & Media Node (JS & Whisper)',
      type: 'Data & Media Transformation',
      icon: <Code2 className="w-5 h-5 text-sky-400" />,
      status: 'idle',
      config: {
        mode: 'runOnceForEachItem',
        language: 'JavaScript ES2022',
        whisperModel: 'whisper-large-v3 (Arabic Dialects)',
        cleanRegex: '/[^0-9]/g'
      }
    },
    {
      id: 'node-3',
      name: 'AI Agent & RAG Brain',
      type: 'Intelligence & Decision',
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      status: 'idle',
      config: {
        model: selectedModel,
        temperature: temperature,
        memoryType: 'WindowBufferMemory (Size: 10)',
        tools: ['check_calendar', 'query_inventory', 'escalate_to_human']
      }
    },
    {
      id: 'node-4',
      name: 'Supabase Database Sync',
      type: 'Database / CRM',
      icon: <Database className="w-5 h-5 text-amber-400" />,
      status: 'idle',
      config: {
        table: 'conversations_log',
        operation: 'UPSERT (phone_number)',
        schema: 'public'
      }
    },
    {
      id: 'node-5',
      name: 'Channel Send Outbound',
      type: 'Outbound Messaging',
      icon: <Send className="w-5 h-5 text-emerald-400" />,
      status: 'idle',
      config: {
        channel: selectedChannel,
        retryOnFail: true,
        maxRetries: 3
      }
    }
  ]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setExecutionLogs(prev => [`[${time}] ${msg}`, ...prev]);
  };

  const resetWorkflow = () => {
    setIsRunning(false);
    setCurrentStepIndex(0);
    setActiveNodeId('node-1');
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle', executionTimeMs: undefined })));
    addLog('🔄 تم إعادة تعيين حالة المسار.');
  };

  const runSimulation = async () => {
    setIsRunning(true);
    setActiveNodeId('node-1');
    setExecutionLogs([]);
    addLog(`🚀 بدء تشغيل المسار للرسالة نوع [${messageType}] عبر قناة ${selectedChannel}`);

    // Reset nodes
    const initialNodes = nodes.map(n => ({ ...n, status: 'idle' as const, executionTimeMs: undefined }));
    setNodes(initialNodes);

    // Node 1: Webhook
    setNodes(prev => prev.map(n => n.id === 'node-1' ? { ...n, status: 'running' } : n));
    addLog('⚡ Node 1 [Webhook]: استقبال payload من المنصة والتحقق من التوقيع الرقمي...');
    await new Promise(r => setTimeout(r, 450));
    setNodes(prev => prev.map(n => n.id === 'node-1' ? {
      ...n,
      status: 'success',
      executionTimeMs: 14,
      inputData: {
        http_method: 'POST',
        headers: { 'x-hub-signature-256': 'sha256=9f8a4bc1...', 'content-type': 'application/json' },
        source: selectedChannel === 'whatsapp' ? 'WhatsApp Cloud API' : selectedChannel === 'instagram' ? 'Meta Graph API' : 'Telegram Bot API'
      },
      outputData: {
        from: '+201098765432',
        sender_name: 'Ahmed Ali',
        channel: selectedChannel,
        payload_type: messageType,
        message_id: 'msg_' + Math.floor(Math.random() * 900000),
        timestamp: new Date().toISOString(),
        raw_content: customerMessage
      }
    } : n));
    addLog('✅ Node 1 اكتمل بنجاح (200 OK) خلال 14ms.');
    setActiveNodeId('node-2');

    // Node 2: Code Node & Whisper
    setNodes(prev => prev.map(n => n.id === 'node-2' ? { ...n, status: 'running' } : n));
    if (messageType === 'voice') {
      addLog('🎙️ Node 2 [Voice Whisper]: تفريغ المقطع الصوتي وتحويله لنص عربي دقيق عبر OpenAI Whisper...');
    } else if (messageType === 'image') {
      addLog('🖼️ Node 2 [Vision OCR]: قراءة بيانات التحويل من صورة الإيصال واستخراج القيمة والتاريخ...');
    } else {
      addLog('🔧 Node 2 [Code Node]: تنظيف وتوحيد رقم الهاتف، إزالة الرموز، واستخراج كود الدولة...');
    }
    await new Promise(r => setTimeout(r, 650));
    
    const cleanPhone = '201098765432';
    setNodes(prev => prev.map(n => n.id === 'node-2' ? {
      ...n,
      status: 'success',
      executionTimeMs: messageType === 'voice' ? 240 : 12,
      inputData: { raw_phone: '+201098765432', raw_text: customerMessage },
      outputData: {
        clean_phone: cleanPhone,
        country_code: 'EG',
        processed_text: messageType === 'voice' ? 'مقاس 43 متوفر من السنيكرز الأبيض ومصاريف الشحن للمعادي كام' : customerMessage.trim(),
        media_extracted: messageType !== 'text',
        session_id: 'sess_' + Math.floor(Math.random() * 90000 + 10000)
      }
    } : n));
    addLog('✅ Node 2 اكتمل: معالجة المدخل وتجهيز النص النظيف.');
    setActiveNodeId('node-3');

    // Node 3: AI Agent & RAG
    setNodes(prev => prev.map(n => n.id === 'node-3' ? { ...n, status: 'running' } : n));
    addLog(`🧠 Node 3 [AI Brain - ${selectedModel}]: تحليل النية، استرجاع معرفة الـ RAG، والتحقق من حدود الحراسة (Guardrails)...`);
    await new Promise(r => setTimeout(r, 950));

    let aiDecision: any = {};
    if (customerMessage.includes('حجز') || customerMessage.includes('موعد')) {
      aiDecision = {
        intent: 'book_appointment',
        entities: { specialty: 'باطنة', time_preference: 'بعد العصر (16:00 - 18:00)', name: 'أحمد علي' },
        rag_knowledge_used: 'جدول مواعيد د. حسام - استشاري الباطنة (متاح غداً 4:30م و 5:30م)',
        ai_reply: 'أهلاً بك يا أستاذ أحمد! المواعيد المتاحة غداً مع د. حسام (استشاري الباطنة) هي الساعة 4:30 مساءً أو 5:30 مساءً. هل تفضل تأكيد ميعاد 4:30م؟',
        tool_called: 'check_calendar_availability',
        confidence: 0.98
      };
    } else if (messageType === 'voice' || customerMessage.includes('السنيكرز')) {
      aiDecision = {
        intent: 'product_voice_inquiry',
        entities: { product: 'سنيكرز أبيض', size: '43', area: 'المعادي' },
        rag_knowledge_used: 'كتالوج الأحذية: مقاس 43 متوفر (3 قطع). مصاريف شحن المعادي 40 جنيه.',
        ai_reply: 'أهلاً بحضرتك! استمعنا لرسالتك الصوتية: مقاس 43 سنيكرز أبيض متوفر حالياً. تكلفة الشحن للمعادي 40 جنيهاً والتوصيل خلال 24 ساعة. هل تحب نثبت الطلب لحضرتك؟',
        tool_called: 'query_inventory',
        confidence: 0.99
      };
    } else if (messageType === 'image' || customerMessage.includes('إيصال')) {
      aiDecision = {
        intent: 'payment_receipt_verification',
        entities: { amount: 1200, method: 'فودافون كاش', service: 'عربون زراعة أسنان' },
        rag_knowledge_used: 'سجل الحجوزات المعلقة: ميعاد د. سيف يتطلب 1200 جنيه عربون.',
        ai_reply: 'تم استلام وتأكيد إيصال التحويل بمبلغ 1200 جنيه بنجاح يا فندم! تم تأكيد ميعاد حضرتك غداً في تمام الساعة 6:00 مساءً بفرع التجمع.',
        tool_called: 'confirm_booking_deposit',
        confidence: 0.99
      };
    } else if (customerMessage.includes('شكوى') || customerMessage.includes('متأخر') || customerMessage.includes('فلوسي')) {
      aiDecision = {
        intent: 'urgent_complaint',
        sentiment: 'negative',
        urgency: 'critical',
        ai_reply: 'نعتذر جداً لحضرتك يا فندم عن أي تأخير. تم تحويل تذكرة رقم #8912 ذات الأولوية القصوى لمدير خدمة العملاء وسيقوم بالتواصل معك هاتفياً خلال 15 دقيقة لحل الأمر فوراً.',
        tool_called: 'escalate_to_human_agent',
        confidence: 0.99
      };
    } else if (customerMessage.includes('رقم الدكتور الشخصي') || customerMessage.includes('خاص بالبيت')) {
      aiDecision = {
        intent: 'out_of_scope_policy',
        guardrail_triggered: true,
        ai_reply: 'عفواً يا فندم، وفقاً لسياسة الخصوصية الخاصة بالعيادة لا يمكننا مشاركة الأرقام الشخصية للأطباء، لكن يسعدنا جداً استقبال استفسارك الطبي عبر حجز كشف رسمي أو ترك رسالتك لنعرضها على الطبيب في أقرب وقت.',
        tool_called: 'none (strict_guardrail_applied)',
        confidence: 0.96
      };
    } else {
      aiDecision = {
        intent: 'product_pricing_inquiry',
        entities: { item: 'حذاء الجري', size: '43', color: 'أبيض', city: 'المنصورة' },
        rag_knowledge_used: 'كتالوج المنتجات: مقاس 43 أبيض متوفر (4 قطع) بسعر 650 ج. مصاريف شحن المنصورة 45 ج.',
        ai_reply: 'أهلاً بحضرتك! نعم حذاء الجري مقاس 43 باللون الأبيض متوفر حالياً بسعر 650 جنيهاً. تكلفة الشحن للمنصورة 45 جنيهاً والتوصيل خلال يومين. هل تحب أثبت لك الأوردر الآن؟',
        tool_called: 'query_product_inventory',
        confidence: 0.97
      };
    }

    setNodes(prev => prev.map(n => n.id === 'node-3' ? {
      ...n,
      status: 'success',
      executionTimeMs: 380,
      inputData: {
        model: selectedModel,
        system_prompt: 'أنت وكيل ذكي رسمي لخدمة العملاء. التزم بدقة بالـ RAG وحافظ على لهجة ودودة وأمان تام.',
        user_message: customerMessage,
        temperature: temperature
      },
      outputData: aiDecision
    } : n));
    addLog(`✅ Node 3 اكتمل: اتخاذ القرار بنية [${aiDecision.intent}] وثقة ${Math.round(aiDecision.confidence * 100)}%.`);
    setActiveNodeId('node-4');

    // Node 4: Supabase
    setNodes(prev => prev.map(n => n.id === 'node-4' ? { ...n, status: 'running' } : n));
    addLog('💾 Node 4 [Supabase DB]: إدراج سجل المحادثة وتحديث ملف العميل في جدول conversations...');
    await new Promise(r => setTimeout(r, 550));

    if (simulateError) {
      setNodes(prev => prev.map(n => n.id === 'node-4' ? {
        ...n,
        status: 'error',
        executionTimeMs: 120,
        inputData: { table: 'conversations_log' },
        outputData: { error: 'Database timeout / Connection refused (Error 504). Triggering Error Workflow with retry in 3 seconds...' }
      } : n));
      addLog('❌ فشل Node 4: خطأ 504 Gateway Timeout. تم تشغيل مسار Error Trigger لإرسال تنبيه للمشرف.');
      setIsRunning(false);
      return;
    }

    setNodes(prev => prev.map(n => n.id === 'node-4' ? {
      ...n,
      status: 'success',
      executionTimeMs: 32,
      inputData: {
        table: 'conversations_log',
        record: { phone: cleanPhone, last_intent: aiDecision.intent }
      },
      outputData: {
        inserted_id: 'db_row_' + Math.floor(Math.random() * 100000),
        status: '201 Created',
        sync_time: new Date().toISOString()
      }
    } : n));
    addLog('✅ Node 4 اكتمل: تم حفظ السجل بنجاح في قاعدة البيانات.');
    setActiveNodeId('node-5');

    // Node 5: Outbound Send
    setNodes(prev => prev.map(n => n.id === 'node-5' ? { ...n, status: 'running' } : n));
    addLog(`📤 Node 5 [${selectedChannel} Outbound]: إرسال الرسالة إلى هاتف العميل...`);
    await new Promise(r => setTimeout(r, 600));

    setNodes(prev => prev.map(n => n.id === 'node-5' ? {
      ...n,
      status: 'success',
      executionTimeMs: 78,
      inputData: {
        channel: selectedChannel,
        to: cleanPhone,
        text: { body: aiDecision.ai_reply }
      },
      outputData: {
        messages: [{ id: 'wamid.' + Math.random().toString(36).substring(2, 10) }],
        delivery_status: 'delivered',
        read_receipt: 'pending'
      }
    } : n));
    addLog('🎉 اكتمل المسار كاملاً بنجاح! تم استلام الرسالة والرد الآلي خلال أقل من ثانيتين.');

    setIsRunning(false);
  };

  const selectedNodeData = nodes.find(n => n.id === activeNodeId);

  const generateN8nWorkflowJson = () => {
    const n8nJson = {
      name: "AI Automation Multi-Channel Enterprise Agent",
      nodes: [
        {
          parameters: { httpMethod: "POST", path: "webhook-intake", responseMode: "onReceived" },
          name: "Webhook Trigger",
          type: "n8n-nodes-base.webhook",
          typeVersion: 2,
          position: [240, 300]
        },
        {
          parameters: {
            jsCode: "for (const item of $input.all()) {\n  let phone = item.json.body.from || '';\n  phone = phone.replace(/[^0-9]/g, '');\n  item.json.clean_phone = phone;\n}\nreturn $input.all();"
          },
          name: "JS Code Sanitizer",
          type: "n8n-nodes-base.code",
          typeVersion: 2,
          position: [460, 300]
        },
        {
          parameters: {
            promptType: "define",
            text: "={{ $json.clean_phone }}: {{ $json.body.text }}",
            systemMessage: "أنت وكيل ذكي رسمي لخدمة العملاء معتمد على RAG. التزم بالملفات المرفقة وتجنب الهلوسة."
          },
          name: "AI Agent Node",
          type: "@n8n/n8n-nodes-langchain.agent",
          typeVersion: 1.6,
          position: [680, 300]
        },
        {
          parameters: { operation: "insert", table: "conversations_log" },
          name: "Supabase DB",
          type: "n8n-nodes-base.supabase",
          typeVersion: 1,
          position: [900, 300]
        },
        {
          parameters: { operation: "send", text: "={{ $json.output }}" },
          name: "Channel Sender",
          type: "n8n-nodes-base.httpRequest",
          typeVersion: 4.2,
          position: [1120, 300]
        }
      ],
      connections: {
        "Webhook Trigger": { main: [[{ node: "JS Code Sanitizer", type: "main", index: 0 }]] },
        "JS Code Sanitizer": { main: [[{ node: "AI Agent Node", type: "main", index: 0 }]] },
        "AI Agent Node": { main: [[{ node: "Supabase DB", type: "main", index: 0 }]] },
        "Supabase DB": { main: [[{ node: "Channel Sender", type: "main", index: 0 }]] }
      }
    };
    return JSON.stringify(n8nJson, null, 2);
  };

  const handleCopyWorkflowJson = () => {
    navigator.clipboard.writeText(generateN8nWorkflowJson());
    setCopiedWorkflow(true);
    setTimeout(() => setCopiedWorkflow(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>محاكي n8n المتقدم الحي (Advanced Interactive n8n Visualizer)</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            استوديو محاكاة واختبار مسارات الـ Automation
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            عدّل إعدادات القنوات والنماذج، اختبر الرسائل الصوتية وصور الإيصالات، وشاهد تدفق النبضات البصرية في السيرفر.
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={resetWorkflow}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            title="إعادة تعيين الحالة"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط</span>
          </button>

          <button
            onClick={handleCopyWorkflowJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            title="نسخ ملف JSON صالح للاستيراد في n8n الحقيقي"
          >
            {copiedWorkflow ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">تم نسخ Workflow JSON!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>تصدير لـ n8n (JSON)</span>
              </>
            )}
          </button>

          <button
            onClick={runSimulation}
            disabled={isRunning}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
              isRunning 
                ? 'bg-amber-600/50 text-slate-300 cursor-not-allowed' 
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-95'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : 'fill-slate-950'}`} />
            <span>{isRunning ? 'جاري التنفيذ...' : 'تشغيل المسار الآن'}</span>
          </button>
        </div>
      </div>

      {/* Advanced Control Settings (Channel & Model & Temperature) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
        {/* Channel select */}
        <div className="space-y-1.5">
          <label className="text-slate-400 font-medium block">قناة المراسلة (Channel):</label>
          <div className="flex gap-1">
            <button
              onClick={() => setSelectedChannel('whatsapp')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium border text-center transition-colors ${
                selectedChannel === 'whatsapp' 
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700' 
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              واتساب الرسمي
            </button>
            <button
              onClick={() => setSelectedChannel('instagram')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium border text-center transition-colors ${
                selectedChannel === 'instagram' 
                  ? 'bg-rose-950 text-rose-300 border-rose-700' 
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              إنستجرام DMs
            </button>
            <button
              onClick={() => setSelectedChannel('telegram')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium border text-center transition-colors ${
                selectedChannel === 'telegram' 
                  ? 'bg-sky-950 text-sky-300 border-sky-700' 
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              تيليجرام
            </button>
          </div>
        </div>

        {/* Model select */}
        <div className="space-y-1.5">
          <label className="text-slate-400 font-medium block">عقل الذكاء الاصطناعي (Model):</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (أعلى دقة لغوية)</option>
            <option value="gpt-4o">OpenAI GPT-4o (استدعاء أدوات منظم)</option>
            <option value="gemini-2-5-flash">Gemini 2.5 Flash (سرعة استجابة فائقة)</option>
          </select>
        </div>

        {/* Temperature & Error toggle */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label className="text-slate-400 font-medium">Temperature: {temperature}</label>
            <label className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={simulateError}
                onChange={(e) => setSimulateError(e.target.checked)}
                className="accent-amber-400 rounded"
              />
              <span>محاكاة خطأ 504</span>
            </label>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-amber-400"
          />
        </div>
      </div>

      {/* Preset selection bar with Message Type indicators */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-300">
          اختر نوع وسيناريو رسالة العميل (نص، صوت Whisper، صورة OCR):
        </span>
        <div className="flex flex-wrap gap-2">
              {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCustomerMessage(preset.text);
                setMessageType(preset.type as any);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                customerMessage === preset.text
                  ? 'bg-amber-400/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {preset.type === 'voice' && <Mic className="w-3.5 h-3.5 text-amber-400" />}
              {preset.type === 'image' && <ImageIcon className="w-3.5 h-3.5 text-sky-400" />}
              {preset.type === 'text' && <MessageSquare className="w-3.5 h-3.5 text-slate-400" />}
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
        
        {/* Custom text field */}
        <div className="relative mt-2">
          <input
            type="text"
            value={customerMessage}
            onChange={(e) => setCustomerMessage(e.target.value)}
            placeholder="اكتب رسالة عميل تجريبية..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Workflow Visual Canvas with animated wire indicators */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>مخطط مسار العمل المتصل (Connected Visual Pipeline):</span>
          <span>اضغط على أي عقدة لفحص الـ JSON وسجلات التشغيل</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
          {nodes.map((node, index) => {
            const isSelected = activeNodeId === node.id;
            let statusBadge = (
              <span className="text-[10px] text-slate-500 font-mono">في الانتظار</span>
            );

            if (node.status === 'running') {
              statusBadge = (
                <span className="text-[10px] text-amber-400 font-mono animate-pulse">جاري المعالجة...</span>
              );
            } else if (node.status === 'success') {
              statusBadge = (
                <span className="text-[10px] text-emerald-400 font-mono tabular-nums">200 OK · {node.executionTimeMs}ms</span>
              );
            } else if (node.status === 'error') {
              statusBadge = (
                <span className="text-[10px] text-rose-400 font-mono">فشل 504 Error</span>
              );
            }

            return (
              <div key={node.id} className="relative flex flex-col justify-between">
                <button
                  onClick={() => setActiveNodeId(node.id)}
                  className={`text-right p-4 rounded-xl border transition-all flex flex-col justify-between relative group w-full h-full ${
                    isSelected
                      ? 'bg-slate-950 border-amber-400 ring-1 ring-amber-400 shadow-lg'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Node Step Number */}
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                      {node.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Node info */}
                  <div className="space-y-1 w-full">
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {node.name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {node.type}
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="pt-3 mt-3 border-t border-slate-800/80 w-full flex items-center justify-between">
                    {statusBadge}
                    {node.status === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    {node.status === 'error' && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs for Bottom Panel: Inspector vs Console vs Config */}
      <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('inspector')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeView === 'inspector' 
                  ? 'bg-amber-400 text-slate-950' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              فحص البيانات (JSON Inspector)
            </button>
            <button
              onClick={() => setActiveView('console')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeView === 'console' 
                  ? 'bg-amber-400 text-slate-950' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>سجل التنفيذ (Execution Console) ({executionLogs.length})</span>
            </button>
            <button
              onClick={() => setActiveView('config')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeView === 'config' 
                  ? 'bg-amber-400 text-slate-950' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings2 className="w-3 h-3" />
              <span>إعدادات العقدة (Node Config)</span>
            </button>
          </div>

          {selectedNodeData && (
            <span className="text-xs text-slate-400">
              العقدة المحددة: <strong className="text-white">{selectedNodeData.name}</strong>
            </span>
          )}
        </div>

        {/* View 1: JSON Inspector */}
        {activeView === 'inspector' && selectedNodeData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>المدخلات (Input Data):</span>
                <span className="font-mono text-[11px] text-slate-500">$input.first().json</span>
              </div>
              <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3.5 font-mono text-xs text-slate-300 text-left dir-ltr overflow-x-auto max-h-56">
                <pre>{JSON.stringify(selectedNodeData.inputData || { status: 'waiting for execution' }, null, 2)}</pre>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>المخرجات (Output Data):</span>
                <span className="font-mono text-[11px] text-slate-500">$json</span>
              </div>
              <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3.5 font-mono text-xs text-amber-200/90 text-left dir-ltr overflow-x-auto max-h-56">
                <pre>{JSON.stringify(selectedNodeData.outputData || { status: 'waiting for execution' }, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Execution Console */}
        {activeView === 'console' && (
          <div className="rounded-lg bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-slate-300 dir-ltr text-left max-h-60 overflow-y-auto space-y-1">
            {executionLogs.length === 0 ? (
              <span className="text-slate-500">لا توجد سجلات تنفيذ حالية. اضغط "تشغيل المسار الآن" لبدء التدفق.</span>
            ) : (
              executionLogs.map((log, i) => (
                <div key={i} className={log.includes('❌') ? 'text-rose-400' : log.includes('✅') || log.includes('🎉') ? 'text-emerald-300' : 'text-slate-300'}>
                  {log}
                </div>
              ))
            )}
          </div>
        )}

        {/* View 3: Node Config */}
        {activeView === 'config' && selectedNodeData && (
          <div className="rounded-lg bg-slate-900 border border-slate-800 p-4 text-xs space-y-3">
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <Settings2 className="w-4 h-4 text-amber-400" />
              <span>معاملات تكوين العقدة (Parameters & Settings):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(selectedNodeData.config || {}).map(([key, val], idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="font-mono text-slate-400">{key}:</span>
                  <span className="font-semibold text-amber-300">{Array.isArray(val) ? val.join(', ') : String(val)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final output visual response preview */}
        {nodes[4].status === 'success' && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs space-y-1.5">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>الرسالة المستلمة على هاتف العميل عبر {selectedChannel}:</span>
            </div>
            <div className="text-slate-200 p-3 rounded-lg bg-slate-900/90 border border-slate-800 font-sans text-sm leading-relaxed">
              {nodes[4].inputData?.text?.body}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
