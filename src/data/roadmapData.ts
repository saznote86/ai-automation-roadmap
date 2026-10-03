import { Phase, PortfolioProject, CommonMistake, TechStackItem } from '../types';

export const ROADMAP_PHASES: Phase[] = [
  {
    id: 0,
    slug: 'web-fundamentals',
    number: 'المرحلة 0',
    title: 'أساسيات الويب (متعديهاش!)',
    duration: 'أسبوع – أسبوعين',
    badgeColor: 'emerald',
    summary: 'فهم كيف تتواصل البرمجيات عبر الإنترنت قبل لمس أي أداة أتمتة لتجنب الوقوع في أخطاء غامضة.',
    importance: 'ناس كتير بتقفز على الـ n8n على طول وبعدين بتتوه أول ما حاجة تبوظ. الأسبوعين دول هيوفروا عليك شهور من التخبط.',
    topics: [
      {
        id: 'api-basics',
        title: 'يعني إيه API وكيف تتحدث التطبيقات؟',
        explanation: 'الـ API (واجهة برمجة التطبيقات) هي مثل النادل في المطعم: يأخذ طلبك (Request) إلى المطبخ (السيرفر) ثم يعود لك بالطبق الجاهز (Response). في الأتمتة، أنت تقوم بربط نادل متجر إلكتروني بنادل قاعدة بيانات بنادل واتساب.',
        codeSnippet: {
          language: 'bash',
          caption: 'مثال استدعاء API بسيط بواسطة cURL',
          code: 'curl -X GET "https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=Cairo"'
        },
        keyTakeaways: [
          'الـ Client هو من يرسل الطلب (مثل n8n)',
          'الـ Server يعالج الطلب ويعيد البيانات',
          'كل خدمة تحتاج API Endpoint فريد'
        ]
      },
      {
        id: 'http-methods',
        title: 'الفرق بين أفعال HTTP: GET, POST, PUT, DELETE',
        explanation: 'البروتوكول يحدد نية الطلب:\n• GET: طلب قراءة بيانات فقط دون تعديل (مثل جلب قائمة الطلبات).\n• POST: إنشاء بيانات جديدة (مثل إرسال رسالة واتساب جديدة أو تسجيل عميل).\n• PUT / PATCH: تعديل بيانات موجودة مسبقاً (مثل تحديث حالة الحجز إلى "مكتمل").\n• DELETE: حذف سجل من النظام.',
        codeSnippet: {
          language: 'json',
          caption: 'مكونات طلب HTTP نموذجي',
          code: 'POST /v1/messages HTTP/1.1\nHost: api.provider.com\nAuthorization: Bearer sec_xyz123\nContent-Type: application/json\n\n{\n  "recipient": "+201000000000",\n  "text": "مرحباً بك! تم تأكيد حجزك بنجاح."\n}'
        },
        keyTakeaways: [
          'GET لا ترسل Body مع الطلب، البيانات تكون في URL Query',
          'POST ترسل Body يحمل البيانات المشفرة بصيغة JSON',
          'استخدام الفعل الخاطئ يسبب خطأ 405 Method Not Allowed'
        ]
      },
      {
        id: 'headers-auth',
        title: 'Headers والمصادقة (API Key و Bearer Token)',
        explanation: 'الـ Headers هي معلومات إضافية تصف الطلب. أهمها الـ Authorization: كيف يثبت برنامجك هويته ليسمح له السيرفر بالدخول؟\n• API Key: مفتاح ثابت يُمرر في Header أو Query.\n• Bearer Token: رمز وصول آمن يسبقه كلمة Bearer وغالباً يُستخرج عبر OAuth.',
        codeSnippet: {
          language: 'http',
          caption: 'أشهر الترويسات (Headers)',
          code: 'Authorization: Bearer sk-ant-api03-xxx\nContent-Type: application/json\nAccept: application/json'
        },
        keyTakeaways: [
          'ممنوع مشاركة المفاتيح أو كتابتها علناً في الكود (ضعها في Credentials)',
          'Header Content-Type يخبر السيرفر بنوع البيانات المرسلة'
        ]
      },
      {
        id: 'json-parsing',
        title: 'صيغة JSON وقراءة المصفوفات والكائنات',
        explanation: 'لغة التخاطب العالمية بين الأنظمة هي JSON. تتكون من كائنات (Objects {}) وقوائم (Arrays []). في n8n ستحتاج دائماً لاستخراج حقول محددة مثل اسم العميل ورقم هاتفه من كائن متداخل.',
        codeSnippet: {
          language: 'json',
          caption: 'عينة JSON متداخل لطلب عميل',
          code: '{\n  "customer": {\n    "name": "أحمد علي",\n    "phone": "+966501234567"\n  },\n  "items": [\n    { "id": 101, "name": "كورس الأتمتة", "price": 150 }\n  ],\n  "total_paid": 150\n}'
        },
        keyTakeaways: [
          'استخراج الاسم في n8n يتم عبر التعبير: {{$json.customer.name}}',
          'المصفوفة تبدأ بفهرس 0: {{$json.items[0].name}}'
        ]
      },
      {
        id: 'webhooks',
        title: 'الـ Webhooks: كيف يدفع التطبيق البيانات لحظياً؟',
        explanation: 'بدل أن يقوم n8n بسؤال النظام كل دقيقة: "هل يوجد عميل جديد؟" (Polling الذي يستهلك الخادم)، يطلب n8n من النظام: "أول ما يدخل عميل، ابعث بياناته مباشرة لهذا الرابط" (Webhook). هذا هو محرك الأتمتة اللحظية.',
        codeSnippet: {
          language: 'text',
          caption: 'رابط Webhook نموذجي في n8n',
          code: 'https://n8n.yourdomain.com/webhook/c38a9d12-4fb6-4e89-b2bf-01ab23cd45ef'
        },
        keyTakeaways: [
          'Webhook = Event-Driven Architecture',
          'استخدم أدوات مثل webhook.site لاختبار وتفحص البيانات الواردة'
        ]
      },
      {
        id: 'status-codes',
        title: 'أكواد الحالة (HTTP Status Codes) وقراءة الأخطاء',
        explanation: 'عندما يستجيب السيرفر يعطي رقماً ثلاثياً يعبر عن النتيجة:\n• 200 OK / 201 Created: نجح الطلب.\n• 400 Bad Request: بياناتك المرسلة ناقصة أو غير صحيحة.\n• 401 Unauthorized / 403 Forbidden: الـ Token غير صالح أو تفتقد الصلاحية.\n• 404 Not Found: الرابط غير موجود.\n• 429 Too Many Requests: تجاوزت حدود السرعة (Rate Limit).\n• 500 / 502 Server Error: المشكلة داخل خادم الخدمة نفسها.',
        keyTakeaways: [
          'عند حدوث خطأ، انظر للرقم أولاً لمعرفة هل العيب منك (4xx) أم من السيرفر (5xx)'
        ]
      }
    ],
    projects: [
      {
        id: 'p0-1',
        title: 'إرسال أول طلب API بـ Postman',
        description: 'قم بتنزيل أداة Postman أو استخدم نسختها على الويب، ونفّذ طلب GET إلى OpenWeather API أو Cat Facts API المجاني.',
        deliverables: ['استقبال كود 200 OK وتفحص JSON في التبويب Response'],
        tips: 'جرب إرسال بارامتر خاطئ وشاهد كيف يتغير الكود إلى 400 أو 401.'
      },
      {
        id: 'p0-2',
        title: 'اختبار Webhook عبر Webhook.site',
        description: 'افتح موقع webhook.site وانسخ الرابط الخاص بك، ثم املأ نموذج Google Form أو أرسل POST من Postman لرؤية البيانات الواردة فورياً.',
        deliverables: ['فهم الـ Headers والـ Payload المستلم في اللحظة نفسها'],
        tips: 'لاحظ كيف تصل أرقام الهواتف والأسماء مشفرة داخل JSON.'
      }
    ],
    quiz: [
      {
        id: 'q0-1',
        question: 'ما هو كود الحالة (Status Code) الذي يعني أن مفتاح الـ API غير صالح أو ناقص؟',
        options: ['200 OK', '401 Unauthorized', '404 Not Found', '500 Internal Server Error'],
        correctIndex: 1,
        explanation: 'كود 401 يعني فشل المصادقة، وأن السيرفر لم يتعرف على تصريحك.'
      },
      {
        id: 'q0-2',
        question: 'لماذا نفضل الـ Webhook على الـ Polling في بناء أتمتة العملاء؟',
        options: [
          'لأنه مجاني دائماً والـ Polling مدفوع',
          'لأنه يرسل البيانات لحظياً فور حدوث الحدث دون هدر موارد السيرفر بالاستعلام المتكرر',
          'لأنه يلغي الحاجة إلى JSON',
          'لأنه يعمل بدون إنترنت'
        ],
        correctIndex: 1,
        explanation: 'الـ Webhook هو Event-Driven يطلق التنفيذ فورياً أول ما يسجل العميل بياناته دون تأخير.'
      }
    ]
  },
  {
    id: 1,
    slug: 'n8n-from-scratch',
    number: 'المرحلة 1',
    title: 'n8n من الصفر',
    duration: '3 – 4 أسابيع',
    badgeColor: 'sky',
    summary: 'إتقان محرك الأتمتة الأساسي: الـ Nodes، والـ Expressions، وهندسة معالجة الـ Items، وكتابة كود JS بسيط، وإدارة أخطاء التشغيل.',
    importance: 'ليه n8n بالذات؟ لأنه مفتوح المصدر وتقدر تستضيفه بنفسك (Self-host) بدون دفع اشتراك على كل Execution مثل Make أو Zapier، ويحتوي على بيئة AI متطورة جداً.',
    topics: [
      {
        id: 'n8n-nodes',
        title: 'أنواع الـ Nodes: Triggers و Regular Nodes',
        explanation: 'كل مسار في n8n يبدأ بـ Trigger Node واحد (مثل: وصول إيميل، Webhook، جدول زمني Schedule Cron، رسالة تيليجرام)، يليه سلسلة من الـ Nodes العادية لتنفيذ العمليات: قراءة، تحويل، اتخاذ قرار، إرسال.',
        keyTakeaways: [
          'الـ Trigger هو الشرارة التي تبدأ المسار',
          'كل عقدة تُمرر مخرجاتها كمدخل للعقدة التي تليها'
        ]
      },
      {
        id: 'n8n-items',
        title: 'كيف يتعامل n8n مع الـ Data: مفهوم الـ Items List',
        explanation: 'أهم سر لفهم n8n: كل عقدة تُخرج مصفوفة من العناصر (List of Items). إذا كان لديك 10 صفوف من شيت إكسل، العقدة التالية ستنفذ 10 مرات تلقائياً (Looping مدمج) ما لم تجمعهم في عنصر واحد.',
        codeSnippet: {
          language: 'json',
          caption: 'هيكل الـ Items الداخلي في n8n',
          code: '[\n  { "json": { "id": 1, "name": "خالد", "city": "الرياض" } },\n  { "json": { "id": 2, "name": "سارة", "city": "القاهرة" } }\n]'
        },
        keyTakeaways: [
          'فهم بنية الـ Items يمنع تكرار الإرسال بالخطأ',
          'استخدم Item Lists Node لتقسيم أو دمج العناصر'
        ]
      },
      {
        id: 'n8n-expressions',
        title: 'التعبيرات والديناميكية: {{ $json.field }}',
        explanation: 'كيف تشير لعنصر من عقدة سابقة؟ عبر التعبيرات الديناميكية. يمكنك كتابة تعبير لجلب رقم العميل من الـ Webhook حتى لو كنت على بعد 5 خطوات في المسار.',
        codeSnippet: {
          language: 'javascript',
          caption: 'أمثلة على Expressions شائعة في n8n',
          code: '{{ $json.phone }}\n{{ $("Webhook Trigger").item.json.body.user_name }}\n{{ $now.format("yyyy-MM-dd HH:mm") }}'
        },
        keyTakeaways: [
          'يمكنك دمج نص عادي مع تعبير: "أهلاً بك يا {{ $json.name }}"',
          'يدعم دوال التاريخ والحساب المدمجة'
        ]
      },
      {
        id: 'n8n-code-node',
        title: 'الـ Code Node: كتابة JavaScript خفيفة لتنظيف الداتا',
        explanation: 'أحياناً تحتاج لتنظيف رقم هاتف العميل (إزالة المسافات، إضافة كود الدولة) أو تصفية مصفوفة. سطران من JavaScript في Code Node يحلان المشكلة في ثوانٍ.',
        codeSnippet: {
          language: 'javascript',
          caption: 'كود تنظيف وتنسيق أرقام الهواتف',
          code: 'for (const item of $input.all()) {\n  let phone = item.json.phone || "";\n  // إزالة أي رموز غير أرقام\n  phone = phone.replace(/[^0-9]/g, "");\n  if (phone.startsWith("01")) {\n    phone = "20" + phone.slice(1); // صيغة مصرية دولية\n  }\n  item.json.clean_phone = phone;\n}\nreturn $input.all();'
        },
        keyTakeaways: [
          'Run Once for Each Item vs Run Once for All Items',
          'استخدم Code Node لتجهيز البيانات قبل إرسالها لـ APIs حساسة'
        ]
      },
      {
        id: 'n8n-error-handling',
        title: 'معالجة الأخطاء (Error Workflows & Retry on Fail)',
        explanation: 'مينفعش الـ Workflow يقع بالليل والعميل يصحى يلاقي طلباته تائهة! فعل خاصية Retry on Fail مع Exponential Backoff، واصنع Error Trigger مسار يرسل تنبيهاً فورياً لقناة تيليجرام خاصة بك كأدمن فور حدوث أي فشل.',
        keyTakeaways: [
          'Retry on Fail: يعيد المحاولة تلقائياً عند انقطاع مؤقت لـ API',
          'Error Workflow: ينقذ السجلات الفاشلة ويخزنها للمراجعة'
        ]
      }
    ],
    projects: [
      {
        id: 'p1-1',
        title: 'Form → Google Sheets → بريد ترحيبي',
        description: 'بناء مسار متكامل: فورم تسجيل عميل جديد، حفظ البيانات مباشرة في Google Sheets، وإرسال بريد إلكتروني ترحيبي مخصص باسمه.',
        deliverables: ['Workflow شغال، ملف JSON للمسار، جدول بيانات متزامن'],
        tips: 'تأكد من تنسيق كود الدولة وتاريخ التسجيل.'
      },
      {
        id: 'p1-2',
        title: 'تقرير يومي أوتوماتيكي على تليجرام الساعة 9 صباحاً',
        description: 'استخدام Schedule Trigger يعمل يومياً، يستدعي API للطقس أو العملات أو مبيعات اليوم، ويصيغ رسالة منظمة يرسلها لقناة تليجرام.',
        deliverables: ['مسار مجدول مع Telegram Bot Token'],
        tips: 'استخدم Markdown في تنسيق رسالة تليجرام لتظهر بشكل احترافي.'
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'إذا استلمت عقدة في n8n مصفوفة من 5 عناصر، ماذا سيحدث افتراضياً في العقدة التالية؟',
        options: [
          'ستتوقف وتطلب تدخلاً يدوياً',
          'ستنفذ العقدة 5 مرات تلقائياً (مرة لكل عنصر)',
          'ستنفذ للعنصر الأول فقط وتهمل الباقي',
          'ستحدث رسالة خطأ Syntax'
        ],
        correctIndex: 1,
        explanation: 'n8n يتعامل مع كل مخرجات العقد كقائمة عناصر وينفذ العمليات التالية لكل عنصر ما لم تقم بتجميعهم.'
      }
    ]
  },
  {
    id: 2,
    slug: 'ai-in-workflows',
    number: 'المرحلة 2',
    title: 'إزاي تدخّل الـ AI في الشغل',
    duration: '2 – 3 أسابيع',
    badgeColor: 'purple',
    summary: 'الانتقال من الأتمتة البسيطة إلى الأتمتة الذكية: ربط نماذج اللغة (Claude / OpenAI)، وهندسة الأوامر المتقدمة، وخرجات JSON المنظمة، ووكلاء الذكاء الاصطناعي (AI Agents) بالأدوات والذاكرة.',
    importance: 'هنا يبدأ السحر الحقيقي والأسعار المرتفعة! العملاء لا يدفعون للأتمتة القديمة، بل يدفعون لنظام يفهم كلام البشر ويرد بذكاء ويأخذ قرارات.',
    topics: [
      {
        id: 'llm-mechanics',
        title: 'كيف تعمل النماذج اللغوية (Tokens, Context Window, Temperature)',
        explanation: '• Tokens: أجزاء الكلمات التي يقرأها النموذج ويحاسبك عليها بالمليون.\n• Context Window: سعة ذاكرة النموذج في الجلسة الواحدة.\n• Temperature: درجة إبداع النموذج؛ في الأتمتة التجارية نريد دقة وانضباطاً فنضعها منخفضة (0.0 إلى 0.3) لمنع التأليف.',
        keyTakeaways: [
          'استخدم Temperature = 0 للمهام الاستخراجية وتصنيف النصوص',
          'كلما صغر حجم الـ Prompt حافظت على التكلفة والسرعة'
        ]
      },
      {
        id: 'system-prompts',
        title: 'هندسة الأوامر (System Prompts) وتقنية Few-Shot',
        explanation: 'الـ System Prompt هو عقد العمل بينك وبين الموديل. يجب أن يحتوي على:\n1. الدور والهوية (أنت وكيل خدمة عملاء لعيادة أسنان د. سيف).\n2. سياق العمل والممنوعات الصارمة (ممنوع تشخيص أمراض أو إعطاء أدوية).\n3. أمثلة حية لسؤال ورد (Few-shot Examples) لتدريب النموذج على نبرة الرد المطلوبة بدقة.',
        codeSnippet: {
          language: 'markdown',
          caption: 'قالب System Prompt احترافي مانع للهلوسة',
          code: 'أنت وكيل ذكي لشركة "أفق العقارية". مهمتك هي الرد على استفسارات المشترين.\nالقواعد الصارمة:\n- أجب فقط بالاعتماد على بيانات المشاريع المرفقة.\n- إذا سألك العميل عن مشروع غير موجود، قل بلباقة: "عفواً هذا المشروع غير متوفر لدينا حالياً وسأحول استفسارك لمستشارنا".\n- لا تخترع أسعاراً أبداً.\n\nأمثلة:\nس: هل يوجد شقق استلام فوري في التجمع؟\nج: نعم، متوفر وحدات في كمبوند النرجس بمساحات تبدأ من 140م. هل تحب أرسل لك بروشور الأسعار؟'
        },
        keyTakeaways: [
          'تحديد الممنوعات أهم من سرد الصلاحيات',
          'الأمثلة (Few-shot) ترفع دقة الرد بنسبة تتجاوز 80%'
        ]
      },
      {
        id: 'structured-output',
        title: 'المخرجات المنظمة (Structured JSON Output)',
        explanation: 'إذا طلبت من الذكاء الاصطناعي "صنف الإيميل"، قد يرد بجملة شاعرية يصعب برمجتها. لكن عندما تجبره على إخراج JSON Schema محدد، يمكنك استهلاك النتيجة فوراً في الخطوات التالية (مثل: إرسال تصنيف الشكوى لقسم الدعم).',
        codeSnippet: {
          language: 'json',
          caption: 'Schema لمخرجات تصنيف العملاء',
          code: '{\n  "intent": "complaint" | "inquiry" | "booking",\n  "urgency": "low" | "medium" | "high",\n  "sentiment": "negative" | "neutral" | "positive",\n  "summary_arabic": "العميل مستاء من تأخر الشحنة 3 أيام"\n}'
        },
        keyTakeaways: [
          'استخدم JSON Mode أو Tools Call للحصول على استجابة برمجية موثوقة',
          'تحقق من صحة الـ JSON قبل تمريره لقاعدة البيانات'
        ]
      },
      {
        id: 'ai-agents-memory',
        title: 'الـ AI Agent Node والفرق بين الموديل والوكيل الذكي',
        explanation: 'النموذج العادي (LLM) يتكلم فقط. أما الـ Agent فيمتلك ثلاث قدرات إضافية:\n1. التفكير واتخاذ القرار (Reasoning).\n2. الأدوات (Tools): صلاحية البحث في شيت، جلب حالة طلب، أو حجز ميعاد.\n3. الذاكرة (Memory): تذكر المحادثات السابقة عبر Window Buffer أو Postgres Memory.',
        keyTakeaways: [
          'الوكيل يحدد بنفسه متى يستخدم الأداة ومتى يكتفي بالرد',
          'الذاكرة هي ما يجعل المحادثة تبدو كأنها مع إنسان يفهم السياق'
        ]
      }
    ],
    projects: [
      {
        id: 'p2-1',
        title: 'مصنّف إيميلات ذكي بالـ AI',
        description: 'ربط بريد وارد بـ n8n وموديل AI يقرأ نص الرسالة، يصنفها (طلب شراء / شكوى / سؤال عام)، ويوجه رسائل الشكاوى العاجلة مباشرة لـ Slack أو Telegram.',
        deliverables: ['Workflow يعالج رسائل تجريبية بنتيجة JSON دقيقة'],
        tips: 'ضع احتمالات واضحة مثل Urgent/Normal لسرعة الفلترة.'
      },
      {
        id: 'p2-2',
        title: 'Content Repurposer (تحويل مقال لمنشورات سوشيال)',
        description: 'مسار يستقبل رابط مقال أو نصاً طويلاً، ويقوم بتلخيصه وإعادة صياغته إلى منشور LinkedIn مهني، وثريد X، وكابشن إنستجرام جذاب.',
        deliverables: ['توليد 3 نصوص مختلفة النبرة من مدخل واحد بنقرة زر'],
        tips: 'خصص System Prompt مختلف لكل منصة (لينكدإن رسمي، إكس مكثف).'
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'إذا كنت تبني نظام استخراج بيانات من فواتير للعملاء، ما هي قيمة الـ Temperature المثالية؟',
        options: ['1.0 (إبداع عالٍ)', '0.0 أو 0.1 (دقة متناهية وانعدام تأليف)', '0.8', '2.0'],
        correctIndex: 1,
        explanation: 'في مهام استخراج البيانات والأتمتة الحسابية نريد أقل نسبة تباين ممكنة لمنع الهلوسة.'
      }
    ]
  },
  {
    id: 3,
    slug: 'databases-and-rag',
    number: 'المرحلة 3',
    title: 'الداتابيز والـ RAG (إن الـ AI يعرف بيزنس العميل)',
    duration: '2 – 3 أسابيع',
    badgeColor: 'amber',
    summary: 'كيف تدمج قواعد البيانات (Supabase / PostgreSQL) مع تقنية الـ RAG ليتمكن الذكاء الاصطناعي من الإجابة بدقة من ملفات العميل، وقوائم منتجاته، وسياساته.',
    importance: 'الـ AI لوحده مش عارف أسعار العميل ولا فروعه ولا سياسة الاسترجاع الخاصة به. الـ RAG هو الجسر الذهبي الذي يجعله خبيراً متخصصاً في بيزنس العميل.',
    topics: [
      {
        id: 'sql-basics',
        title: 'أساسيات SQL واستخدام Supabase',
        explanation: 'Supabase هو البديل السحابي مفتوح المصدر لـ Firebase والمبني على PostgreSQL العملاقة. يعطيك جداول، ومصادقة، وواجهة API جاهزة فورياً. لن تحتاج سوى الأوامر الأساسية: SELECT, INSERT, UPDATE, WHERE, JOIN.',
        codeSnippet: {
          language: 'sql',
          caption: 'إنشاء جدول حجوزات العملاء في Supabase',
          code: 'CREATE TABLE appointments (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  client_name TEXT NOT NULL,\n  client_phone TEXT NOT NULL,\n  service_type TEXT,\n  appointment_time TIMESTAMP WITH TIME ZONE,\n  status TEXT DEFAULT \'pending\',\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);'
        },
        keyTakeaways: [
          'Supabase يوفر لوحة تحكم شبيهة بالإكسل وسهلة التعديل',
          'ربطه بـ n8n يتم بضغطة زر عبر العقد المخصصة أو Postgres Node'
        ]
      },
      {
        id: 'embeddings-vectordb',
        title: 'ما هي الـ Embeddings وقواعد البيانات الشعاعية (Vector DB)؟',
        explanation: 'الكمبيوتر لا يفهم معنى الكلمات إلا إذا تحولت لأرقام رياضية (Vectors). الـ Embedding هو تحويل الفقرة لمتجه من 1536 رقماً يعبر عن معناها. الكلمات ذات المعنى المتقارب ("سعر الكورس" و "بكام التدريب؟") تكون متقاربة في الفضاء الرقمي حتى لو اختلفت الحروف!',
        keyTakeaways: [
          'البحث الشعاعي يجد المعنى وليس مجرد مطابقة الكلمات المفتاحية',
          'أشهر الأدوات: Pinecone أو pgvector مباشرة داخل Supabase'
        ]
      },
      {
        id: 'rag-pipeline',
        title: 'خطوات خط إنتاج الـ RAG الكاملة (The 4-Step Pipeline)',
        explanation: '1. استلام الملفات: جمع مستندات العميل (PDF، موقع إلكتروني، قائمة الأسئلة الشائعة).\n2. التقطيع (Chunking): تقسيم المستند لفقرات صغيرة (300-500 كلمة) يسهل استرجاعها.\n3. التضمين والتخزين: تحويل كل فقرة لـ Embedding وتخزينها في قاعدة البيانات.\n4. الاسترجاع والإجابة: عندما يسأل العميل، يُبحث عن أكثر 3 فقرات شبهاً بسؤاله، وتُرسل للـ AI ليصيغ الرد منها حصراً.',
        keyTakeaways: [
          'جودة الرد تعتمد على جودة ونظافة ملفات العميل الأصلية',
          'حجم الـ Chunk ونسبة التداخل (Overlap) يحددان دقة السياق'
        ]
      },
      {
        id: 'anti-hallucination',
        title: 'إيقاف الهلوسة والتحويل الذكي للبني آدمين (Human Handoff)',
        explanation: 'أكبر خوف عند أصحاب البيزنس هو أن يخترع البوت معلومة خاطئة أو يعطي خصماً وهمياً. السر هو شرط الحراسة الصارم: "إذا لم تكن الإجابة موجودة نصاً في المستندات، قل للعميل: هذه المعلومة ليست متوفرة لدي وسأحولك لأحد ممثلينا، ولا تخمن أبداً".',
        keyTakeaways: [
          'وضع حدود واضحة يكسب ثقة العميل في نظامك',
          'برمجة زر أو تنبيه لنقل المحادثة لموظف حقيقي'
        ]
      }
    ],
    projects: [
      {
        id: 'p3-1',
        title: 'شات بوت يجيب من ملف PDF (منيو مطعم أو لوائح شركة)',
        description: 'رفع ملف PDF لقائمة مطعم، تقطيعه وتخزينه في Vector Store، وبناء واجهة تسأله عن أسعار الوجبات والمكونات ويجيب بدقة وسرعة.',
        deliverables: ['بوت RAG متصل بـ Vector Store مع تجربة أسئلة متنوعة'],
        tips: 'اختبر البوت بأسئلة غير موجودة في المنيو للتأكد من عدم هلوسة النظام.'
      },
      {
        id: 'p3-2',
        title: 'RAG Booking Agent مع Google Calendar و Supabase',
        description: 'وكيل ذكي متكامل: يجيب على أسئلة العميل من قاعدة المعرفة، وحين يطلب حجز موعد يتحقق من التوافر في Google Calendar ويسجل الحجز في Supabase.',
        deliverables: ['Workflow يربط RAG + التقويم + قاعدة البيانات في تجربة محادثة واحدة'],
        tips: 'استخدم الأدوات المخصصة (Tools) في n8n لربط دوال الحجز.'
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'ما هي أهم فائدة لتقنية التضمين (Embeddings) في البحث داخل ملفات العميل؟',
        options: [
          'تلوين الكلمات باللون الأزرق',
          'البحث عن المعنى الدلالي حتى لو استخدم العميل مرادفات لم ترد بالحرف في الملف',
          'حذف الملفات التالفة تلقائياً',
          'تسريع تشغيل خادم n8n'
        ],
        correctIndex: 1,
        explanation: 'الـ Embeddings تحول النصوص لمتجهات رياضية تمثل المعنى، فتفهم أن "بكام" تعني "ما هو السعر".'
      }
    ]
  },
  {
    id: 4,
    slug: 'communication-channels',
    number: 'المرحلة 4',
    title: 'قنوات التواصل (هنا الفلوس الحقيقية 💰)',
    duration: '2 – 3 أسابيع',
    badgeColor: 'rose',
    summary: 'الربط مع قنوات المحادثات الأكثر طلباً في الشرق الأوسط والخليج: WhatsApp و Instagram و Messenger و Telegram مع ميزات الرسائل الصوتية وتحويل المحادثة للموظفين.',
    importance: 'أغلب العملاء في العالم العربي يريدون شيئاً واحداً واضحاً: رد تلقائي ذكي وسريع على واتساب وإنستجرام يغلق المبيعات. إتقان هذه المرحلة هو تذكرتك لأول عقد حقيقي.',
    topics: [
      {
        id: 'telegram-testing',
        title: 'تيليجرام: منصة التجارب المجانية السريعة',
        explanation: 'إنشاء Telegram Bot يأخذ دقيقتين عبر @BotFather وبلا تكاليف أو شروط توثيق. استخدمه كبيئة تدريب واختبار لكل أفكارك والـ Agents قبل تطبيقها على القنوات الأخرى.',
        keyTakeaways: [
          'أسرع وأسهل قناة لتجربة الـ Webhooks والردود الذكية',
          'يدعم الأزرار المخصصة والقوائم التفاعلية'
        ]
      },
      {
        id: 'whatsapp-apis',
        title: 'واتساب: الفرق بين Cloud API الرسمي و Evolution API',
        explanation: '• WhatsApp Cloud API (الرسمي من Meta): يحتاج Meta Business Manager موثق؛ هو الخيار الآمن 100% للشركات الكبرى والعيادات والبراندات لمنع الحظر.\n• Evolution API (حل غير رسمي مبني على Baileys): خادم مفتوح المصدر تربطه عبر QR Code كأنك تفتح WhatsApp Web؛ سريع جداً في البدء ومناسب للشركات الناشئة لكن يحمل مخاطر الحظر إن استُخدم للإرسال المزعج (Spam).',
        keyTakeaways: [
          'احرص دائماً على نصح العميل بالحل الرسمي إذا كان رقم عمله ثميناً',
          'استخدم Evolution API للاختبار والمشاريع التي تتطلب سرعة فائقة'
        ]
      },
      {
        id: 'meta-graph-api',
        title: 'إنستجرام وماسنجر عبر Meta Graph API',
        explanation: 'الرد التلقائي على الرسائل الخاصة (DMs) والرد الذكي على التعليقات في منشورات وريلز إنستجرام. أول ما يكتب العميل كلمة معينة (مثل: "تفاصيل") يُرسل له كود الخصم أو رابط الشراء في الخاص فوراً.',
        keyTakeaways: [
          'تحتاج إلى حساب Instagram Professional مربوط بصفحة Facebook',
          'تفعيل ميزة Human Handoff لإيقاف الأتمتة فور تدخل المدير'
        ]
      },
      {
        id: 'voice-and-ocr',
        title: 'معالجة الرسائل الصوتية والصور بالذكاء الاصطناعي',
        explanation: 'في الوطن العربي، نصف العملاء يرسلون Voice Notes أو صور إيصالات تحويل! في هذا المسار نقوم بتنزيل المقطع الصوتي، تمريره لـ OpenAI Whisper لتحويله لنص عربي، ثم تغذيته للـ Agent ليرد وكأنه استمع للتسجيل بنفسه.',
        keyTakeaways: [
          'دعم اللهجات العربية عبر Whisper أو Gemini 2.5 Flash',
          'قراءة إيصالات الدفع والصور عبر نماذج الرؤية الحاسوبية (Vision Models)'
        ]
      }
    ],
    projects: [
      {
        id: 'p4-1',
        title: 'Sales Agent متكامل على واتساب لمتجر إلكتروني',
        description: 'روبوت واتساب متصل بقاعدة بيانات منتجات، يستقبل أسئلة العملاء، يقترح المقاسات والألوان، ويعطي روابط إتمام الطلب المباشرة.',
        deliverables: ['نظام رد واتساب متصل بـ Webhook مع محاكاة محادثات حية'],
        tips: 'ضع ردوداً سريعة بأزرار لتسهيل تصفح الأقسام على العميل.'
      },
      {
        id: 'p4-2',
        title: 'أتمتة تعليقات إنستجرام (Comment-to-DM)',
        description: 'مسار يستمع للتعليقات على منشورات إنستجرام؛ فور كتابة العميل كلمة مستهدفة، يرد على الكومنت بلباقة ويرسل التفاصيل كاملة في رسالة خاصة.',
        deliverables: ['Webhooks استماع لـ Meta Events وتوجيه الرسائل الخاصة'],
        tips: 'اجعل الرد على التعليق متغيراً من بين 5 صيغ مختلفة لتجنب اعتبار الحساب آلياً.'
      }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'شركة كبرى تعتمد على رقم واتساب موحد في إعلانات ممولة بآلاف الدولارات، ما هو الحل التقني الذي تنصحها به؟',
        options: [
          'استخدام كود سريالي غير رسمي لتوفير المصاريف',
          'استخدام WhatsApp Cloud API الرسمي من Meta وربطه بـ Business Portfolio موثق',
          'تشغيل هاتف قديم مفتوح 24 ساعة',
          'منع العملاء من المراسلة عبر واتساب'
        ],
        correctIndex: 1,
        explanation: 'الرقم التجاري الحساس يجب أن يعمل عبر WhatsApp Cloud API الرسمي لضمان استقرار الخدمة وتجنب الحظر المفاجئ.'
      }
    ]
  },
  {
    id: 5,
    slug: 'deployment-and-selfhosting',
    number: 'المرحلة 5',
    title: 'الـ Deployment والـ Self-hosting',
    duration: 'أسبوع – أسبوعين',
    badgeColor: 'slate',
    summary: 'تشغيل n8n والأنظمة المساعدة على خوادم سحابية خاصة (VPS) باستخدام Docker و Docker Compose وتأمينها بنطاق خاص وشهادات SSL.',
    importance: 'مينفعش تسلم لعميل حاجة شغالة على لابتوبك الشخصي 😅! الاستضافة الذاتية هي ما يجعلك خبيراً محترفاً تسلم أنظمة تعمل 24/7 دون انقطاع وتتحكم في تكاليفك تماماً.',
    topics: [
      {
        id: 'vps-basics',
        title: 'استئجار VPS والدخول عليه بـ SSH',
        explanation: 'الـ Virtual Private Server هو كمبيوترك السحابي الصغير الدائم الاتصال بالإنترنت (من مزودين مثل Hetzner أو Hostinger أو DigitalOcean). الدخول يتم عبر طرفية الأوامر (Terminal) باستخدام مفاتيح SSH الآمنة.',
        codeSnippet: {
          language: 'bash',
          caption: 'أمر الاتصال بالخادم وتحديث الحزم',
          code: 'ssh root@YOUR_SERVER_IP\napt update && apt upgrade -y'
        },
        keyTakeaways: [
          'خادم بتكلفة 5-10 دولار شهرياً قادر على تشغيل مئات الـ Workflows',
          'عطّل تسجيل الدخول بكلمة المرور واعتمد على SSH Keys للأمان'
        ]
      },
      {
        id: 'docker-compose',
        title: 'تشغيل n8n بأمر واحد عبر Docker Compose',
        explanation: 'دوكر هو حاوية تضمن أن التطبيق يعمل بنفس الطريقة تماماً على أي جهاز. بملف docker-compose.yml بسيط، يمكنك تشغيل n8n مع قاعدة بيانات PostgreSQL في ثوانٍ معدودة.',
        codeSnippet: {
          language: 'yaml',
          caption: 'ملف docker-compose.yml النموذجي لـ n8n',
          code: 'version: "3.8"\nservices:\n  n8n:\n    image: docker.n8n.io/n8nio/n8n\n    restart: always\n    ports:\n      - "5678:5678"\n    environment:\n      - N8N_HOST=n8n.youragency.com\n      - N8N_PORT=5678\n      - N8N_PROTOCOL=https\n      - WEBHOOK_URL=https://n8n.youragency.com/\n    volumes:\n      - n8n_data:/home/node/.n8n\nvolumes:\n  n8n_data:'
        },
        keyTakeaways: [
          'الأمر: docker compose up -d يشغل السيرفر في الخلفية',
          'مجلدات الـ Volumes تحفظ بياناتك والـ Workflows حتى لو تم تحديث النظام'
        ]
      },
      {
        id: 'domains-cloudflare',
        title: 'الدومين والحماية: Cloudflare Tunnels و HTTPS',
        explanation: 'بدل تعقيدات فتح المنافذ (Port Forwarding) وإعداد شهادات NGINX يدوياً، يتيح لك Cloudflare Tunnel ربط خادمك بنطاقك المشفر https://n8n.yourdomain.com بأمان تام وبدون كشف IP السيرفر الحقيقي.',
        keyTakeaways: [
          'حماية مجانية من هجمات DDoS وتشفير SSL فوري',
          'سهولة توجيه الـ Webhooks من Meta و Stripe لنطاقك'
        ]
      },
      {
        id: 'backups-monitoring',
        title: 'النسخ الاحتياطي التلقائي ومراقبة الأداء (Monitoring)',
        explanation: 'اصنع مساراً في n8n يقوم أسبوعياً بتصدير كافة الـ Workflows وحفظها في Google Drive أو GitHub. واستخدم خدمة مراقبة مجانية مثل Uptime Kuma أو Better Stack لترسل لك رسالة SMS أو إشعار إذا توقف الخادم.',
        keyTakeaways: [
          'تعرف أن هناك مشكلة قبل أن يتصل بك العميل الغاضب',
          'النسخ الاحتياطي الدوري ينقذ عملك وعملائك في أي طارئ'
        ]
      }
    ],
    projects: [
      {
        id: 'p5-1',
        title: 'رفع n8n على VPS خاص بدومين مشفر SSL',
        description: 'حجز خادم VPS وتثبيت Docker ورفع n8n مع ربطه بدومين فرعي خاص بك والتأكد من استقبال Webhooks الخارجية بنجاح.',
        deliverables: ['رابط n8n شغال ومحمي بكلمة مرور ونطاق رسمي'],
        tips: 'تأكد من ضبط متغير البيئة WEBHOOK_URL بشكل سليم لكي تعمل الـ Webhooks الخارجية.'
      }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'ما فائدة استخدام Docker Volumes عند تشغيل n8n على خادمك؟',
        options: [
          'زيادة سرعة الإنترنت للضعف',
          'الحفاظ على الـ Workflows والـ Credentials ومسارات العمل دون أن تضيع عند إعادة تشغيل الحاوية أو تحديثها',
          'منع استهلاك الكهرباء',
          'تغيير لغة البرنامج للغة العربية'
        ],
        correctIndex: 1,
        explanation: 'الـ Volumes تربط مجلداً حقيقياً على قرص الخادم بداخل الحاوية لضمان استمرارية البيانات (Data Persistence).'
      }
    ]
  },
  {
    id: 6,
    slug: 'selling-and-first-client',
    number: 'المرحلة 6',
    title: 'بيع الخدمة وجيب أول عميل',
    duration: 'مستمر ♾️',
    badgeColor: 'amber',
    summary: 'تحويل المهارة التقنية إلى بيزنس مربح: اختيار التخصص، مكالمة الاستكشاف (Discovery Call)، حساب العائد الاستثماري (ROI)، التسعير بالـ Retainer، وبناء العروض المقنعة.',
    importance: 'المهارة لوحدها مش كفاية! العميل لن يبحث عنك؛ يجب أن تفهم كيف تتحدث بلغة البيزنس والأرقام، وتبيع حلولاً توفر وقتاً وفلوساً للشركات.',
    topics: [
      {
        id: 'niche-selection',
        title: 'اختيار الـ Niche: التخصص هو سر الإغلاق السهل',
        explanation: 'لا تقل "أنا أعمل كل أنواع الأتمتة لأي شركة في العالم". اختر تخصصاً واحداً في البداية:\n• عيادات ومراكز تجميل (حجوزات، تذكير بالمواعيد، استفسارات الأسعار).\n• شركات عقارات (تأهيل الـ Leads وتوزيعهم على مسؤولي المبيعات).\n• براندات ملابس وتجارة إلكترونية (متابعة الشحنات وتوصيات المنتجات والرد على إنستجرام).\nكلما تخصصت، فهمت مشاكل العميل قبل أن ينطق بها.',
        keyTakeaways: [
          'التخصص يجعلك خبيراً مرجعياً وليس مجرد منفذ مهام',
          'إمكانية إعادة استخدام وتكرار نفس الـ Workflow بين عملاء نفس القطاع'
        ]
      },
      {
        id: 'discovery-call',
        title: 'مكالمة الاستكشاف (Discovery Call) وأسئلة الذهب',
        explanation: 'في المكالمة الأولى، لا تتحدث عن n8n أو APIs أو Docker! اسأل عن المشكلة والفلوس:\n1. "كم استفسار بيوصلكم في اليوم على واتساب وإنستجرام؟"\n2. "الرد بياخد وقت أد إيه؟ وكم عميل بيضيع عشان الرد بيتأخر ساعتين؟"\n3. "كم موظف شغال بس عشان يرد على نفس الأسئلة المتكررة؟"\n4. "لو وفرنالك 4 ساعات يومياً وضاعفنا نسبة إغلاق المبيعات، إيه أثر ده على دخلكم؟"',
        keyTakeaways: [
          'الاستماع 80% والحديث 20%',
          'حساب التكلفة الحالية للفرصة الضائعة في ذهن العميل'
        ]
      },
      {
        id: 'roi-calculation',
        title: 'حساب الـ ROI للعميل: إقناع بالأرقام الرياضية',
        explanation: 'العميل لا ينظر لسعرك، بل ينظر للعائد. مثال مقنع:\n"يا فندم موظف خدمة العملاء يكلفك 8000 جنيه شهرياً وبيرد 8 ساعات فقط. نظامنا الذكي يشتغل 24 ساعة، يرد في ثوانٍ، ويكلفك Setup لمرة واحدة + Retainer 3000 جنيه شهرياً. كده وفرت أكثر من 60% من تكلفة الموظف واستجبت لـ 100% من العملاء في ثوانٍ".',
        keyTakeaways: [
          'تحويل السعر من تكلفة إلى استثمار يوفر أضعافه'
        ]
      },
      {
        id: 'pricing-model',
        title: 'هيكل التسعير: Setup Fee + Retainer شهري',
        explanation: 'الخطأ القاتل هو العمل بنظام المشروع لمرة واحدة فقط. البيزنس المستقر يُبنى على الإيراد المتكرر:\n• Setup Fee (دفعة أولى): من 500$ إلى 2000$ لتصميم وبناء واختبار النظام.\n• Monthly Retainer (اشتراك شهري): من 150$ إلى 500$ شهرياً للصيانة، والاستضافة، وتحديث البيانات، والـ Error Handling المستمر.',
        keyTakeaways: [
          '10 عملاء باشتراك شهري = دخل ثابت ومستقر يغطي كافة مصاريفك',
          'تقديم 3 باقات في العرض (Basic · Pro · Premium) لدفع العميل لاختيار الأنسب'
        ]
      },
      {
        id: 'content-sales',
        title: 'المحتوى: أفضل فريق مبيعات يأتيك بالعملاء',
        explanation: 'انشر ما تبنيه! سجل شاشتك لمدة دقيقة توضح كيف يرد نظامك على إنستجرام تلقائياً، وانشرها على LinkedIn وإنستجرام وTikTok. أصحاب البيزنس يشاهدون العمل الملموس ويسألونك في التعليقات: "بكام ده؟".',
        keyTakeaways: [
          'Show, Don\'t Tell: النماذج المرئية تبيع نفسها بنفسها',
          'اعرض أول مشروع أو اثنين بسعر رمزي مقابل تقييم وCase Study مصورة'
        ]
      }
    ],
    projects: [
      {
        id: 'p6-1',
        title: 'تصميم أول عرض سعر احترافي (3-Tier Proposal)',
        description: 'إعداد مقترح عمل لعميل افتراضي في قطاع العيادات أو المتاجر مقسم إلى 3 باقات (Starter, Growth, Ultimate) مع حساب الـ ROI المتوقع.',
        deliverables: ['ملف مقترح عمل متكامل باللغة العربية جاهز للإرسال'],
        tips: 'ركز في المقترح على النتائج الملموسة وليس على قائمة الأدوات التقنية.'
      }
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'ما هو نموذج التسعير الأمثل لبناء وكالة أتمتة مستقرة مالياً؟',
        options: [
          'العمل بالساعة فقط وبأقل سعر ممكن',
          'Setup Fee لمرة واحدة لتأسيس النظام + Retainer شهري للصيانة والاستضافة والتطوير',
          'المشروع مجاني تماماً دائماً',
          'أخذ عمولة غير مضمونة دون أي دفعة مقدمة'
        ],
        correctIndex: 1,
        explanation: 'الـ Setup Fee يغطي جهد البناء، بينما الـ Monthly Retainer يضمن لك إيراداً متكرراً شهرياً يمنحك الاستقرار المالي والنمو.'
      }
    ]
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 1,
    title: 'Form → Google Sheets → بريد ترحيبي ذكي',
    difficulty: 'سهل',
    difficultyColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40',
    summary: 'تسجيل بيانات العملاء من استمارة ويب في جدول بيانات جوجل وإرسال إيميل ترحيبي مخصص فورياً.',
    businessValue: 'الاستجابة الفورية تزيد احتمالية تحول العميل المحتمل بنسبة 391% مقارنة بالرد المتأخر.',
    tools: ['n8n', 'Google Forms / Tally', 'Google Sheets', 'Gmail / Resend'],
    steps: [
      'إنشاء Form لجمع الاسم والبريد الإلكتروني ورقم الهاتف والاهتمام.',
      'إنشاء Webhook Trigger في n8n يستقبل بيانات النموذج لحظياً.',
      'إضافة Google Sheets Node لإدراج صف جديد في قاعدة البيانات.',
      'إضافة Gmail Node لإرسال بريد ترحيبي ديناميكي يحتوي اسم العميل.'
    ],
    samplePayload: {
      input: '{\n  "name": "كريم فؤاد",\n  "email": "karim@example.com",\n  "service": "استشارة نمو"\n}',
      output: '{\n  "status": "success",\n  "sheet_row_id": 42,\n  "email_sent_to": "karim@example.com",\n  "timestamp": "2026-10-03T10:15:00Z"\n}'
    }
  },
  {
    id: 2,
    title: 'تقرير يومي أوتوماتيكي على تليجرام',
    difficulty: 'سهل',
    difficultyColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40',
    summary: 'تجميع مؤشرات الأعمال اليومية من عدة مصادر وإرسال ملخص تنفيذي منسق في التاسعة صباحاً كل يوم.',
    businessValue: 'توفير 30 دقيقة يومياً من التجميع اليدوي لمؤشرات الشركة لإدارة البيزنس.',
    tools: ['n8n', 'Schedule Cron', 'HTTP Request', 'Telegram Bot'],
    steps: [
      'استخدام Schedule Trigger يعمل يومياً في الساعة 09:00 بتوقيت الرياض.',
      'استدعاء HTTP Request لجلب أسعار الصرف أو إجمالي مبيعات المتجر من API.',
      'معالجة البيانات بواسطة Code Node لتنسيق الأرقام.',
      'إرسال رسالة تيليجرام منسقة بـ Markdown للقناة الإدارية.'
    ],
    samplePayload: {
      input: 'Trigger: Cron 09:00 AM (Monday - Friday)',
      output: '📢 صباح الخير يا فندم! ☕\nتقرير مبيعات الأمس:\n• إجمالي الطلبات: 64 طلب\n• صافي المبيعات: 18,450 ريال\n• أعلى صنف مبيعاً: باقة النخبة (22)'
    }
  },
  {
    id: 3,
    title: 'مصنّف إيميلات تلقائي بالـ AI وتوجيه المهام',
    difficulty: 'سهل',
    difficultyColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40',
    summary: 'قراءة الإيميلات الواردة، وتحليل فحواها ونبرتها بواسطة نموذج ذكاء اصطناعي، وتوجيه الشكاوى العاجلة مباشرة لقسم الدعم.',
    businessValue: 'خفض زمن حل الشكاوى الحرجة من 6 ساعات إلى 15 دقيقة فقط.',
    tools: ['n8n', 'Email Read Node', 'OpenAI / Claude', 'Slack / Telegram'],
    steps: [
      'استماع للبريد الوارد عبر IMAP أو Gmail Trigger.',
      'تمرير عنوان ومحتوى البريد إلى AI Model مع System Prompt دقيق للتصنيف.',
      'الحصول على مخرجات JSON محددة (نوع الرسالة، الأهمية، الملخص).',
      'فلترة الرسائل عبر IF Node: إذا كانت "شكوى عاجلة" يُرسل إشعار تنبيه فوري.'
    ],
    samplePayload: {
      input: 'Subject: الشحنة رقم 9812 تأخرت أسبوع وأريد استرداد أموالي فوراً!',
      output: '{\n  "category": "complaint",\n  "urgency": "critical",\n  "sentiment": "negative",\n  "action_required": "notify_support_manager"\n}'
    }
  },
  {
    id: 4,
    title: 'Content Repurposer (مقال أو فيديو → بوستات سوشيال)',
    difficulty: 'متوسط',
    difficultyColor: 'text-amber-400 bg-amber-950/60 border-amber-800/40',
    summary: 'إدخال رابط مقال أو نص طويل، وتوليد حزمة محتوى كاملة مخصصة لكل شبكة اجتماعية بأسلوبها ونبرتها.',
    businessValue: 'مضاعفة إنتاجية فريق التسويق 5 أضعاف وإنشاء محتوى مستمر دون كلفة كتابة جديدة.',
    tools: ['n8n', 'HTTP / Webhook', 'Claude 3.5 Sonnet', 'Notion'],
    steps: [
      'استقبال النص الأساسي من نموذج أو Webhook.',
      'إرسال النص إلى Claude بمطالبات مخصصة (LinkedIn نبرة احترافية، X أسلوب مشوق، IG كابشن بصري).',
      'حفظ المخرجات في قاعدة بيانات Notion كبطاقات محتوى جاهزة للجدولة.'
    ],
    samplePayload: {
      input: 'مقال من 1200 كلمة يشرح استراتيجية توفير الوقت في إدارة المبيعات.',
      output: '{\n  "linkedin_post": "المديرون يقضون 30% من وقتهم في المهام الروتينية...",\n  "x_thread_hook": "5 أدوات أتمتة وفرت لشركتنا 120 ساعة الشهر الماضي (ثريد👇):",\n  "ig_carousel_slides": ["سلايد 1: الفخ الأكبر...", "سلايد 2: كيف تبدأ..."]\n}'
    }
  },
  {
    id: 5,
    title: 'Telegram AI Agent مزود بـ Tools و Memory',
    difficulty: 'متوسط',
    difficultyColor: 'text-amber-400 bg-amber-950/60 border-amber-800/40',
    summary: 'مساعد ذكي على تيليجرام يتذكر المحادثة السابقة ويمتلك أدوات للبحث في قاعدة بيانات وتحديث السجلات.',
    businessValue: 'توفير مساعد شخصي متكامل للموظفين أو العملاء متاح 24/7 دون الحاجة لفتح برامج معقدة.',
    tools: ['n8n', 'Telegram Trigger', 'AI Agent Node', 'Window Memory', 'Supabase Tool'],
    steps: [
      'ربط Telegram Bot مع n8n Telegram Trigger.',
      'توصيل العقدة بـ AI Agent مع تحديد Model و Window Buffer Memory.',
      'إضافة Tool مخصصة للبحث في جدول بيانات الشركة عبر SQL أو REST API.',
      'إعادة إجابة الوكيل إلى المستخدم في نفس المحادثة.'
    ],
    samplePayload: {
      input: 'سؤال المستخدم: "هل العميل طارق سدد دفعة شهر مارس؟"',
      output: 'الوكيل الذكي استدعى Tool: SearchClientDb(name="طارق") -> وجد السجل -> رد: "نعم يا فندم، تم تسديد 5000 ريال بتاريخ 15 مارس بموجب إيصال #8819."'
    }
  },
  {
    id: 6,
    title: 'شات بوت RAG خبير يجيب من ملفات ومستندات العميل',
    difficulty: 'متوسط',
    difficultyColor: 'text-amber-400 bg-amber-950/60 border-amber-800/40',
    summary: 'روبوت إجابة استفسارات معتمد على لوائح وسياسات الشركة دون تأليف أو تخمين.',
    businessValue: 'إلغاء 80% من الأسئلة الروتينية المتكررة وإتاحة المعلومات لموظفي وعملاء الشركة بدقة متناهية.',
    tools: ['n8n', 'Pinecone / Supabase Vector', 'Text Splitter', 'OpenAI Embeddings'],
    steps: [
      'تقسيم مستند PDF إلى أجزاء بحجم 400 كلمة مع تداخل 50 كلمة.',
      'تحويل المقاطع إلى Embeddings وتخزينها في قاعدة البيانات الشعاعية.',
      'بناء مسار استقبال الأسئلة، واستخراج أكثر الفقرات صلة بالسؤال.',
      'تغذية النموذج بالنصوص المسترجعة مع أوامر تقييد الإجابة عليها حصراً.'
    ],
    samplePayload: {
      input: 'السؤال: "ما هي شروط استرجاع المنتج بعد 14 يوماً؟"',
      output: 'المستند المسترجع: [المادة 4: يقبل الاسترجاع خلال 14 يوماً فقط بحالته الأصلية...]\nإجابة البوت: "وفقاً لسياسة المتجر، لا يمكن استرجاع المنتج بعد مرور 14 يوماً من تاريخ الاستلام."'
    }
  },
  {
    id: 7,
    title: 'الرد التلقائي على كومنتات وإنستجرام DMs (Comment to DM)',
    difficulty: 'متوسط',
    difficultyColor: 'text-amber-400 bg-amber-950/60 border-amber-800/40',
    summary: 'الاستماع التلقائي لأي تعليق يحتوي كلمة مفتاحية، والرد على العميل بالتعليقات وإرسال الرابط في الرسائل الخاصة.',
    businessValue: 'رفع معدل التحويل في الإعلانات ومنشورات الريلز بنسبة 300% عبر الاستجابة الفورية.',
    tools: ['Meta Graph API', 'Instagram Webhooks', 'n8n', 'Instagram Send Message'],
    steps: [
      'تكوين Webhook في Meta Developer Portal للاستماع لحدث comment_mention.',
      'فلترة الكلمة المستهدفة (مثلاً "مهتم" أو "كتاب" أو "سعر").',
      'إرسال رد علني عشوائي من بين 4 صيغ لضمان المظهر الطبيعي.',
      'إرسال رسالة خاصة للعميل فوراً تحوي الرابط وتفاصيل العرض.'
    ],
    samplePayload: {
      input: 'تعليق من @salma: "بكام التفاصيل لو سمحت؟"',
      output: 'رد على الكومنت: "أهلاً سلمى! شيكي على الخاص بعتنا لك التفاصيل كاملة 💌"\nرسالة DM: "أهلاً سلمى! بخصوص استفسارك، تفاصيل كورس الأتمتة ورابط التسجيل متاح هنا: [Link]"'
    }
  },
  {
    id: 8,
    title: 'RAG Booking Agent لحجز المواعيد والتحقق من التقويم',
    difficulty: 'متقدم',
    difficultyColor: 'text-rose-400 bg-rose-950/60 border-rose-800/40',
    summary: 'وكيل استشاري يجيب على استفسارات الخدمات ثم يعرض المواعيد المتاحة ويحجزها في Google Calendar ويسجلها في قاعدة البيانات.',
    businessValue: 'حجز المواعيد على مدار 24 ساعة للعيادات والمكاتب دون الحاجة لانتظار فتح أوقات الدوام.',
    tools: ['n8n', 'Google Calendar API', 'Supabase', 'AI Agent with Custom Tools', 'WhatsApp / Web'],
    steps: [
      'تجهيز أداة التحقق من الأوقات المتاحة في Google Calendar.',
      'تجهيز أداة إنشاء الحجز وإرسال كود التأكيد.',
      'ربط الوكيل بقاعدة بيانات أسعار وخدمات العيادة (RAG).',
      'حفظ الحجز في Supabase وإرسال تذكير للعميل قبل الموعد بـ 24 ساعة.'
    ],
    samplePayload: {
      input: 'العميل: "عايز أحجز كشف باطنة بكرة بعد العصر."',
      output: 'الوكيل: "أهلاً بك! الأوقات المتاحة غداً بعد العصر مع د. حسام هي 4:30 م أو 5:30 م. أيهما يناسبك لتأكيد الحجز؟"'
    }
  },
  {
    id: 9,
    title: 'WhatsApp Sales Agent متكامل لمتجر إلكتروني',
    difficulty: 'متقدم',
    difficultyColor: 'text-rose-400 bg-rose-950/60 border-rose-800/40',
    summary: 'بائع ذكي على واتساب يستقبل طلبات الشراء، يقترح البدائل والمقاسات، ويعالج الصور والرسائل الصوتية.',
    businessValue: 'استبدال موظفي الشات ومضاعفة مبيعات الواتساب في مواسم الذروة دون زيادة تكاليف التشغيل.',
    tools: ['WhatsApp Cloud API', 'Whisper Voice OCR', 'n8n', 'E-commerce API / Shopify'],
    steps: [
      'استقبال الرسائل عبر WhatsApp Webhook والتعرف على نوع الرسالة (نص، صوت، صورة).',
      'تحويل الصوت لنص بواسطة Whisper في حال أرسل العميل تسجيلاً.',
      'ربط الوكيل بكتالوج المنتجات من API المتجر.',
      'إنشاء رابط الدفع المباشر للعميل داخل الشات.'
    ],
    samplePayload: {
      input: 'رسالة صوتية (12 ثانية): "يا غالي مقاس 43 من السنيكرز الأبيض متوفر؟ وتوصيل المعادي بكام؟"',
      output: 'تحويل صوتي: "مقاس 43 متوفر... التوصيل للمعادي 40 جنيه"\nرد الوكيل: "أهلاً بك يا فندم! نعم مقاس 43 متوفر حالياً متبقي منه 3 قطع. تكلفة الشحن للمعادي 40 جنيهاً والتوصيل خلال 48 ساعة. هل تحب أثبت لك الطلب الآن؟"'
    }
  },
  {
    id: 10,
    title: 'Multi-Channel AI Agent الموحد (WhatsApp + IG + Messenger)',
    difficulty: 'متقدم',
    difficultyColor: 'text-rose-400 bg-rose-950/60 border-rose-800/40',
    summary: 'نظام إدارة محادثات موحد يستقبل كل رسائل الشركة من شتى المنصات في عقل ذكي واحد متصل بقاعدة المعرفة نفسها مع سجل عملاء موحد.',
    businessValue: 'القضاء على تشتت رسائل العملاء وتقديم تجربة احترافية متسقة عبر كافة القنوات الرقمية.',
    tools: ['Meta Graph API', 'WhatsApp Cloud API', 'Supabase CRM', 'Unified n8n Sub-workflows'],
    steps: [
      'تصميم Sub-workflow منفصل لكل قناة لاستقبال وتطبيع شكل الرسائل في هيكل موحد.',
      'تمرير كل الرسائل إلى Central AI Brain لمعالجة الطلب وصياغة الرد.',
      'التحقق من هوية العميل في Supabase (سواء راسلنا سابقاً من إنستجرام أو واتساب).',
      'إعادة توجيه الرد لنفس القناة الأصلية مع حفظ تاريخ المحادثة بالكامل.'
    ],
    samplePayload: {
      input: 'وصول رسالة من أي قناة -> توحيد الهيكل: { user_id, channel, message_text }',
      output: 'معالجة موحدة -> حفظ السجل في CRM -> رد مباشر عبر نفس المنصة خلال ثوانٍ معدودة.'
    }
  }
];

export const COMMON_MISTAKES: CommonMistake[] = [
  {
    id: 1,
    mistake: 'المشاهدة السلبية للكورسات دون بناء عملي بأيديك',
    whyItHurts: 'ستشعر أنك تفهم كل شيء، لكن عند أول عائق عملي مع عميل حقيقي ستتجمد.',
    theFix: 'قاعدة 1:2 — كل ساعة مشاهدة لكورس يجب أن يقابلها ساعتان من التطبيق العملي وبناء الـ Workflows بنفسك.'
  },
  {
    id: 2,
    mistake: 'نسخ قوالب (Templates) جاهزة دون فهم تفاصيل عملها',
    whyItHurts: 'أول ما يعطل الـ Workflow (وهذا سيحدث حتماً)، لن تعرف أين الخطأ وستفقد مصداقيتك أمام العميل.',
    theFix: 'ابنِ كل مسار من الصفر أول مرتين على الأقل، واقرأ مخرجات كل عقدة لتفهم رحلة البيانات من البداية للنهاية.'
  },
  {
    id: 3,
    mistake: 'التنقل بين عشرات الأدوات كل أسبوع وتشتيت التركيز',
    whyItHurts: 'لن تصل لمستوى الإتقان والسرعة في أي أداة وستظل دائماً في مرحلة المبتدئ.',
    theFix: 'التزم بالـ Core Stack: محرك n8n + قاعدة Supabase + موديل ذكاء اصطناعي واحد حتى تكسب أول 3 عملاء.'
  },
  {
    id: 4,
    mistake: 'ترك الذكاء الاصطناعي يرد بحرية دون قيود صارمة (Guardrails)',
    whyItHurts: 'النموذج سيهلوس بأسعار خاطئة أو وعود لا يستطيع العميل الوفاء بها مما يسبب كوارث للبيزنس.',
    theFix: 'صمم System Prompt يحدد الممنوعات بدقة ويفعل زر التحويل لموظف حقيقي (Human Handoff) فوراً عند الشك.'
  },
  {
    id: 5,
    mistake: 'تجاهل معالجة الأخطاء (Error Handling) في مشاريع العملاء',
    whyItHurts: 'إذا تعطل سيرفر API بالليل دون أن تشعر، سيصحو العميل ليجد النظام متوقفاً ويفقد الثقة فيك فورياً.',
    theFix: 'فعل خاصية Retry On Fail على العقد الحساسة، واصنع مسار Error Trigger يرسل تنبيهاً فورياً لقناتك على تيليجرام.'
  },
  {
    id: 6,
    mistake: 'الانتظار حتى تصبح "جاهزاً 100%" قبل محاولة البيع وجلب عميل',
    whyItHurts: 'لن تشعر أبداً أنك جاهز 100%، وسيمر العام دون أن تحقق أي دخل حقيقي.',
    theFix: 'بعد إنهاء أول 4 مشاريع من الـ Roadmap، ابدأ فوراً بالتواصل وعرض بناء أنظمة لعملاء حقيقيين وابدأ صغيراً.'
  }
];

export const TECH_STACK: TechStackItem[] = [
  {
    category: 'بناء مسارات الأتمتة (Workflows)',
    primaryTool: 'n8n',
    alternatives: ['Make', 'Zapier'],
    description: 'الأقوى عالمياً لمرونته وإمكانية استضافته مجاناً على خادمك الخاص (Self-hosted) وتكاملاته المتقدمة مع وكلاء الذكاء الاصطناعي.',
    badge: 'الخيار الأساسي'
  },
  {
    category: 'نماذج الذكاء الاصطناعي اللغوية (LLMs)',
    primaryTool: 'Claude 3.5 Sonnet / OpenAI GPT-4o',
    alternatives: ['Gemini 2.5 Flash', 'DeepSeek'],
    description: 'نماذج التفكير وصياغة الردود الذكية بدقة مذهلة، مع دعم فائق للغة العربية واستخراج بيانات JSON المنظمة.',
    badge: 'دقة قصوى'
  },
  {
    category: 'قواعد البيانات السحابية (Databases)',
    primaryTool: 'Supabase',
    alternatives: ['Firebase', 'PostgreSQL'],
    description: 'قاعدة بيانات علائقية كاملة مع واجهات استعلام سهلة، وتخزين للملفات، وجداول شبيهة بالإكسل يسهل مشاركتها مع العميل.',
    badge: 'سريعة وقوية'
  },
  {
    category: 'قواعد البيانات الشعاعية للـ RAG (Vector DB)',
    primaryTool: 'Pinecone / pgvector في Supabase',
    alternatives: ['Qdrant', 'ChromaDB'],
    description: 'تخزين متجهات المعاني والبحث الدلالي السريع في ملفات وبيانات عميلك لتغذية الشات بوت الذكي.',
    badge: 'أساس الـ RAG'
  },
  {
    category: 'قنوات واتساب (WhatsApp Messaging)',
    primaryTool: 'WhatsApp Cloud API (الرسمي من Meta)',
    alternatives: ['Evolution API'],
    description: 'الحل المعتمد والمستقر للشركات الكبرى لمنع حظر الأرقام، مع إمكانية استخدام Evolution API للتجارب والمشاريع السريعة.',
    badge: 'قناة الدخل الأكبر'
  },
  {
    category: 'إنستجرام وماسنجر (Social Messaging)',
    primaryTool: 'Meta Graph API',
    alternatives: ['ManyChat'],
    description: 'الرد التلقائي على الرسائل الخاصة (DMs) والتعليقات على منشورات وريلز إنستجرام لجذب المبيعات اللحظية.',
    badge: 'صائد المبيعات'
  },
  {
    category: 'الخوادم والاستضافة (Infrastructure)',
    primaryTool: 'VPS (Hetzner / Hostinger) + Docker',
    alternatives: ['DigitalOcean', 'AWS Lightsail'],
    description: 'استضافة خادم n8n والخدمات المساعدة بتكلفة لا تتجاوز 5-10 دولار شهرياً وبكفاءة تشغيل 24/7 دون انقطاع.',
    badge: 'أقل تكلفة وأعلى تحكم'
  },
  {
    category: 'النطاق والحماية (Security & CDN)',
    primaryTool: 'Cloudflare',
    alternatives: ['NGINX Reverse Proxy'],
    description: 'تأمين الاتصال بشهادات SSL مجانية وربط الـ Webhooks عبر Cloudflare Tunnels بدون الحاجة لفتح منافذ خطرة في الخادم.',
    badge: 'أمان فوري'
  }
];
