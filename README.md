<div dir="rtl">

# 🤖 خريطة طريق الـ AI Automation — من الصفر لحد أول عميل

> اللي كتب **automation** في الكومنتات… أهلاً بيك 👋
> ده الطريق بالظبط اللي أنصحك تمشي فيه لو عايز تتعلم AI Automation وتحوّله لشغل بيجيب فلوس.

**ستيفن أيمن** — Co-founder @ **Vida AI** · تابعني على إنستجرام: [@steventawfik](https://instagram.com/steventawfik)

---

## 📌 قبل ما نبدأ: الـ Mindset الصح

أهم حاجة تفهمها من الأول:

- **الـ Automation مش أدوات، الـ Automation حل مشاكل.** العميل مش هيشتري منك "n8n workflow"، هيشتري منك "الرد على العملاء في ثانية بدل ساعة" أو "الحجوزات بتتسجل لوحدها".
- **اتعلم وإنت بتبني.** متقعدش شهرين تتفرج على كورسات. كل مرحلة هنا فيها مشاريع، اعملها بإيدك.
- **متحاولش تتعلم كل الأدوات.** اختار Stack واحد وخليك فيه لحد ما تبقى شاطر فيه. (أنا هقولك على الـ Stack اللي بنشتغل بيه تحت 👇)
- **مش محتاج تبقى مبرمج.** بس لازم تفهم الأساسيات (API، JSON، Webhooks). ده اللي هيفرقك عن اللي بيعمل Copy/Paste.

---

## 🗺️ المراحل باختصار

| المرحلة | الموضوع | المدة التقريبية |
|:---:|---|:---:|
| 0 | أساسيات الويب: API · HTTP · JSON · Webhooks | أسبوع – أسبوعين |
| 1 | n8n من الصفر | 3 – 4 أسابيع |
| 2 | إزاي تدخّل الـ AI في الـ Workflows | 2 – 3 أسابيع |
| 3 | الداتابيز والـ RAG (إن الـ AI يعرف بيزنس العميل) | 2 – 3 أسابيع |
| 4 | قنوات التواصل: WhatsApp · Instagram · Messenger · Telegram | 2 – 3 أسابيع |
| 5 | الـ Deployment والـ Self-hosting | أسبوع – أسبوعين |
| 6 | إزاي تبيع الخدمة وتجيب أول عميل | مستمر ♾️ |

> ⏱️ لو بتدي ساعتين لـ 3 ساعات في اليوم، هتكون جاهز تاخد أول مشروع حقيقي في حدود **3 لـ 4 شهور**.

---

## 🧰 الـ Stack اللي هنشتغل بيه

| الاستخدام | الأداة |
|---|---|
| بناء الـ Workflows | **n8n** |
| الـ AI (موديلات اللغة) | **Claude API** · **OpenAI API** |
| الداتابيز | **Supabase** |
| الـ Vector Database (للـ RAG) | **Pinecone** (أو pgvector جوه Supabase) |
| واتساب | **WhatsApp Cloud API** أو **Evolution API** |
| إنستجرام وماسنجر | **Meta Graph API** |
| السيرفر | **VPS** (زي Hostinger) + **Docker** |
| الدومين والحماية | **Cloudflare** |
| الـ CRM | **HubSpot** |

مش لازم تتعلمهم كلهم مرة واحدة — كل واحد ليه مكانه في المراحل.

---

## 🟢 المرحلة 0: أساسيات الويب (متعديهاش!)

ناس كتير بتقفز على الـ n8n على طول وبعدين بتتوه أول ما حاجة تبوظ. الأسبوعين دول هيوفروا عليك شهور.

### هتتعلم إيه
- **يعني إيه API؟** وإزاي برنامجين بيكلموا بعض.
- **HTTP Requests:** الفرق بين `GET` و `POST` و `PUT` و `DELETE`.
- **Headers و Authentication:** يعني إيه API Key و Bearer Token و OAuth.
- **JSON:** إزاي تقرا الداتا وتطلع منها اللي إنت عايزه (Objects و Arrays).
- **Webhooks:** إزاي تطبيق "يزقلك" داتا أول ما حاجة تحصل.
- **Status Codes:** يعني إيه `200` و `401` و `404` و `429` و `500`.

### ✅ اعمل بإيدك
1. نزّل **Postman** وابعت Requests لأي API مجاني (زي API بتاع الطقس).
2. افتح **webhook.site** وابعتله داتا وشوف شكلها بيوصل إزاي.
3. خد أي JSON طويل وحاول تطلع منه قيمة معينة من جوه Array.

---

## 🔵 المرحلة 1: n8n من الصفر

**ليه n8n؟** لأنه مرن جداً، تقدر تعمله Self-host فمبتدفعش على كل Execution، وفيه AI Nodes قوية، وتقدر تكتب JavaScript جواه لما تحتاج.

### هتتعلم إيه
- **الـ Triggers:** Manual · Schedule (Cron) · Webhook · App Triggers.
- **الـ Nodes الأساسية:** HTTP Request · Set/Edit Fields · IF · Switch · Merge · Loop Over Items · Wait.
- **الـ Expressions:** إزاي تستخدم `{{ $json.field }}` وتجيب داتا من Nodes قبلك.
- **الـ Items:** إزاي n8n بيتعامل مع الداتا كـ List of Items (دي أهم حاجة تفهمها في n8n).
- **الـ Code Node:** شوية JavaScript بسيطة (map · filter · تنظيف نصوص).
- **الـ Credentials:** إزاي تربط حساباتك بأمان.
- **Error Handling:** الـ Error Workflow و Retry On Fail — عشان الـ Workflow ميقعش وإنت نايم.
- **Sub-workflows:** إزاي تقسم الـ Workflow الكبير لحتت صغيرة تقدر تعيد استخدامها.

### ✅ مشاريع المرحلة دي
1. **Form → Google Sheets → Email:** حد يملا فورم، الداتا تتسجل في شيت، ويوصله إيميل ترحيب.
2. **تقرير يومي أوتوماتيك:** كل يوم الساعة 9 الصبح يجيب داتا من API ويبعتلك ملخص على تليجرام.
3. **Webhook Receiver:** اعمل Webhook يستقبل داتا، يعمل عليها Validation، ويرد برسالة.

---

## 🟣 المرحلة 2: دخّل الـ AI في الشغل

هنا الشغل بيبقى ممتع بجد 🔥

### هتتعلم إيه
- **إزاي الـ LLMs بتشتغل** (من غير رياضيات): Tokens · Context Window · Temperature.
- **الاتصال بـ Claude و OpenAI** من n8n (سواء بالـ Node الجاهز أو بـ HTTP Request).
- **Prompt Engineering:**
  - System Prompt واضح (مين إنت، بتعمل إيه، ممنوع تعمل إيه).
  - تدي أمثلة (Few-shot).
  - تحدد شكل الرد بالظبط.
- **Structured Output:** إزاي تخلي الـ AI يرجعلك JSON نضيف تقدر تستخدمه في باقي الـ Workflow.
- **AI Agent Node:** الفرق بين "AI بيرد" و "AI Agent بياخد قرار ويستخدم Tools".
- **الـ Tools:** إزاي تدي الـ Agent صلاحية يدور في داتابيز، يحجز ميعاد، يبعت إيميل.
- **الـ Memory:** إزاي الـ Agent يفتكر المحادثة (Window Buffer · Postgres Memory).

### ✅ مشاريع المرحلة دي
1. **مصنّف إيميلات:** الإيميلات اللي بتوصل تتصنف (شكوى / طلب / سؤال) وكل نوع يروح لمكانه.
2. **Content Repurposer:** تديله لينك مقال أو فيديو، يطلعلك بوستات LinkedIn وإنستجرام.
3. **AI Agent بسيط** على تليجرام بيرد على الأسئلة وعنده Tool واحدة على الأقل (مثلاً يدور في Google Sheet).

---

## 🟠 المرحلة 3: الداتابيز والـ RAG

الـ AI لوحده مش عارف أسعار العميل ولا منتجاته ولا مواعيده. الـ **RAG** هو اللي بيخليه يعرف بيزنس العميل ويرد صح.

### هتتعلم إيه
- **SQL الأساسي:** `SELECT` · `INSERT` · `UPDATE` · `WHERE` · `JOIN` (مش محتاج أكتر من كده في الأول).
- **Supabase:** إزاي تعمل Tables وتربطها بـ n8n، وتخزن فيها العملاء والطلبات والمحادثات.
- **يعني إيه Embeddings** و **Vector Database**.
- **الـ RAG Pipeline كاملة:**
  1. تاخد ملفات العميل (PDF · موقع · شيت منتجات).
  2. تقسمها لحتت (Chunking).
  3. تحولها لـ Embeddings وتخزنها في Pinecone أو Supabase.
  4. لما حد يسأل، تدور على أقرب حتت وتديها للـ AI يرد منها.
- **إزاي تقلل الهلوسة:** "لو المعلومة مش موجودة، قول مش عارف وحوّل لموظف".

### ✅ مشاريع المرحلة دي
1. **شات بوت بيرد من ملف PDF** (مثلاً منيو مطعم أو FAQ لشركة).
2. **RAG Booking Agent:** بيجاوب على الأسئلة من الـ Knowledge Base **و** بيحجز مواعيد في Google Calendar ويسجلها في Supabase.

---

## 🔴 المرحلة 4: قنوات التواصل (هنا الفلوس الحقيقية 💰)

أغلب العملاء في مصر والخليج عايزين حاجة واحدة: **رد أوتوماتيك ذكي على واتساب وإنستجرام.** اتقن المرحلة دي كويس.

### هتتعلم إيه
- **Telegram Bot:** أسهل حاجة تبدأ بيها وتجرب عليها (ببلاش ومفيهوش تعقيد).
- **WhatsApp:**
  - **WhatsApp Cloud API** (الرسمي من Meta): محتاج Business Verification، أأمن للعملاء الكبار.
  - **Evolution API** (غير رسمي): أسرع في الـ Setup، بس خلي بالك من مخاطر الحظر.
- **Instagram و Messenger** عن طريق **Meta Graph API:** الرد على الـ DMs والكومنتات.
- **Meta Business Portfolio:** إزاي العميل يديك Access على صفحاته من غير ما ياخد منك الباسورد.
- **Human Handoff:** إزاي الـ Bot يعرف إمتى يسكت ويحوّل لموظف حقيقي.
- **الرسايل الصوتية والصور:** تحويل الـ Voice Notes لنص وقراءة الصور بالـ AI.

### ✅ مشاريع المرحلة دي
1. **Sales Agent على واتساب** لمحل أونلاين: بيرد على أسئلة المنتجات والمقاسات ويودي العميل للموقع.
2. **Auto-reply على كومنتات إنستجرام:** أول ما حد يكتب كلمة معينة في الكومنت، يوصله DM أوتوماتيك. (أيوه، زي اللي أنا عامله دلوقتي 😉)
3. **Multi-channel Agent:** Agent واحد بيرد على واتساب وماسنجر وإنستجرام من نفس الـ Knowledge Base.

---

## ⚫ المرحلة 5: الـ Deployment والـ Self-hosting

مينفعش تسلم لعميل حاجة شغالة على لابتوبك 😅

### هتتعلم إيه
- **VPS:** تأجر سيرفر وتدخل عليه بـ SSH.
- **Docker و Docker Compose:** تشغل n8n بأمر واحد.
- **الدومين و HTTPS:** تربط دومين بالسيرفر وتأمنه (Cloudflare أو Reverse Proxy).
- **Cloudflare Tunnel:** حل سهل عشان تطلع n8n على الإنترنت من غير ما تفتح Ports.
- **Environment Variables و Security:** متحطش API Keys جوه الـ Workflows على المكشوف.
- **Backups:** اعمل Backup للـ Workflows والداتابيز بشكل دوري (ممكن بـ Workflow أوتوماتيك!).
- **Monitoring:** تعرف إن فيه حاجة وقعت قبل ما العميل يكلمك.

### ✅ مشروع المرحلة دي
- ارفع n8n على VPS بدومين خاص بيك، وانقل عليه كل المشاريع اللي عملتها.

---

## 🟡 المرحلة 6: بيع الخدمة وجيب أول عميل

المهارة لوحدها مش كفاية. لازم تعرف تبيعها.

### هتتعلم إيه
- **اختار Niche:** عيادات · فنادق · براندات ملابس · عقارات · مدارس… كل ما تتخصص كل ما تبيع أسهل.
- **الـ Discovery Call:** اسأل عن المشكلة والوقت الضايع والفلوس الضايعة، مش عن الأدوات.
- **احسب الـ ROI للعميل:** "السيستم ده هيوفرلك موظف خدمة عملاء = X جنيه في الشهر".
- **التسعير:** Setup Fee (مرة واحدة) + **Retainer شهري** (صيانة وتطوير واستضافة). الـ Retainer هو اللي بيبني بيزنس مستقر.
- **Proposal احترافي:** اعرض 3 باقات (Basic · Pro · Premium) — العميل بيحب يختار.
- **Case Studies:** أول مشروع أو اتنين اعملهم بسعر رمزي أو ببلاش مقابل Case Study وتقييم حقيقي.
- **المحتوى:** انشر اللي بتبنيه على إنستجرام ولينكدإن. المحتوى هو أحسن Sales Team.

---

## 🏗️ 10 مشاريع لو عملتهم تبقى جاهز

| # | المشروع | المستوى |
|:---:|---|:---:|
| 1 | Form → Sheets → Email ترحيب | 🟢 سهل |
| 2 | تقرير يومي أوتوماتيك على تليجرام | 🟢 سهل |
| 3 | مصنّف إيميلات بالـ AI | 🟢 سهل |
| 4 | Content Repurposer (مقال → بوستات سوشيال) | 🟡 متوسط |
| 5 | Telegram AI Agent بـ Tools و Memory | 🟡 متوسط |
| 6 | شات بوت RAG بيرد من ملفات | 🟡 متوسط |
| 7 | Auto-reply على كومنتات و DMs إنستجرام | 🟡 متوسط |
| 8 | RAG Booking Agent (أسئلة + حجز مواعيد) | 🔴 متقدم |
| 9 | WhatsApp Sales Agent لمتجر أونلاين | 🔴 متقدم |
| 10 | Multi-channel Agent (واتساب + ماسنجر + إنستجرام) | 🔴 متقدم |

---

## ⚠️ غلطات متقعش فيها

- ❌ **تتفرج على كورسات من غير ما تبني.** كل ساعة فرجة لازم يقابلها ساعتين شغل.
- ❌ **تنسخ Templates من غير ما تفهمها.** أول ما تبوظ مش هتعرف تصلحها قدام العميل.
- ❌ **تتنقل بين الأدوات كل أسبوع.** n8n + Supabase + موديل AI واحد يكفوك تبدأ.
- ❌ **تسيب الـ AI يرد من غير حدود.** لازم System Prompt واضح وقواعد إمتى يحوّل لبني آدم.
- ❌ **تتجاهل الـ Error Handling.** الـ Workflow اللي بيقع بالليل من غير ما تعرف = عميل زعلان الصبح.
- ❌ **تستنى لما تبقى "جاهز 100%" عشان تبيع.** عمرك ما هتحس إنك جاهز. ابدأ بمشروع صغير.

---

## 📚 مصادر مجانية تبدأ بيها

**n8n**
- [الـ Documentation الرسمية](https://docs.n8n.io)
- [كورسات n8n الرسمية (Level 1 و Level 2)](https://docs.n8n.io/courses/)
- [مكتبة Templates جاهزة تتعلم منها](https://n8n.io/workflows/)
- [كوميونتي n8n](https://community.n8n.io)

**أساسيات الويب**
- [HTTP Overview — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [JSON — MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
- [Postman](https://www.postman.com) · [Webhook.site](https://webhook.site)

**الـ AI**
- [Prompt Engineering — Claude Docs](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)
- [OpenAI Platform Docs](https://platform.openai.com/docs)

**الداتابيز والـ RAG**
- [Supabase Docs](https://supabase.com/docs)
- [Pinecone Learn](https://www.pinecone.io/learn/)

**قنوات التواصل**
- [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [Evolution API](https://github.com/EvolutionAPI/evolution-api)

---

## 💬 وبعدين؟

لو الـ Roadmap دي فادتك:

- ⭐ اعمل **Star** للـ Repo ده عشان يفضل عندك.
- 📲 تابعني على إنستجرام [@steventawfik](https://instagram.com/steventawfik) — بنزّل محتوى عن الـ AI Automation والمشاريع اللي بنبنيها بجد.
- 🏢 لو عندك بيزنس ومحتاج حد يبنيلك السيستم ده جاهز: كلم **Vida AI**.

**بالتوفيق يا بطل… ابدأ النهارده، مش بكرة. 🚀**

</div>
