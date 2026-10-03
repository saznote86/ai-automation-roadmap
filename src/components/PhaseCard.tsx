import React, { useState } from 'react';
import { Phase, Topic } from '../types';
import { 
  Check, 
  Copy, 
  Code2, 
  Clock, 
  HelpCircle, 
  Briefcase, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  AlertCircle,
  Search,
  Download,
  BookOpen,
  Award
} from 'lucide-react';

interface PhaseCardProps {
  phase: Phase;
  completedTopics: Set<string>;
  onToggleTopic: (topicId: string) => void;
  onOpenProjects: () => void;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({
  phase,
  completedTopics,
  onToggleTopic,
  onOpenProjects
}) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'cheatsheet' | 'projects' | 'quiz'>('topics');
  const [searchTopic, setSearchTopic] = useState('');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(phase.topics[0]?.id || null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const phaseCompletedCount = phase.topics.filter(t => completedTopics.has(t.id)).length;
  const isPhaseFullyDone = phaseCompletedCount === phase.topics.length && phase.topics.length > 0;

  const filteredTopics = phase.topics.filter(t => 
    t.title.toLowerCase().includes(searchTopic.toLowerCase()) ||
    t.explanation.toLowerCase().includes(searchTopic.toLowerCase())
  );

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleCopyPhaseTemplate = () => {
    const template = {
      phase: phase.number,
      title: phase.title,
      starterNodes: phase.topics.map((t, idx) => ({
        id: `node-${idx}`,
        name: t.title,
        type: 'educational-milestone',
        takeaways: t.keyTakeaways
      }))
    };
    navigator.clipboard.writeText(JSON.stringify(template, null, 2));
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handleSelectQuizAnswer = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const correctAnswersCount = phase.quiz.filter(q => selectedAnswers[q.id] === q.correctIndex).length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-all">
      {/* Phase Top Header Bar */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span>{phase.number}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-400 font-normal">
                <Clock className="w-3.5 h-3.5" />
                {phase.duration}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal">
                مكتمل: {phaseCompletedCount} من {phase.topics.length}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight">
              {phase.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {phase.summary}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyPhaseTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-colors"
              title="نسخ قالب المسار المبدئي للمرحلة"
            >
              {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copiedTemplate ? 'تم النسخ!' : 'Starter Template (JSON)'}</span>
            </button>

            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
              isPhaseFullyDone 
                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800' 
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
              <CheckCircle2 className={`w-4 h-4 ${isPhaseFullyDone ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{isPhaseFullyDone ? 'تم إتمام المرحلة ✅' : 'قيد التعلّم'}</span>
            </div>
          </div>
        </div>

        {/* Why this matters callout */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-amber-400 ml-1.5">💡 ليه المرحلة دي مهمة؟</span>
          {phase.importance}
        </div>

        {/* Tab Controls (Segmented clean buttons) */}
        <div className="flex flex-wrap items-center gap-1 mt-6 p-1 bg-slate-950/80 rounded-xl border border-slate-800 w-fit">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'topics' 
                ? 'bg-amber-400 text-slate-950 shadow-sm font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            المفاهيم والأكواد ({phase.topics.length})
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'cheatsheet' 
                ? 'bg-amber-400 text-slate-950 shadow-sm font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>بطاقة المراجعة السريعة</span>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'projects' 
                ? 'bg-amber-400 text-slate-950 shadow-sm font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            مشاريع المرحلة ({phase.projects.length})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'quiz' 
                ? 'bg-amber-400 text-slate-950 shadow-sm font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            اختبار الفهم ({phase.quiz.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Topics & Code */}
      {activeTab === 'topics' && (
        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 mb-2">
            <span>اضغط على أي درس لقراءة الشرح وتجربة الأكواد:</span>
            
            {/* Search topic within phase */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchTopic}
                onChange={(e) => setSearchTopic(e.target.value)}
                placeholder="ابحث في دروس هذه المرحلة..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pr-8 pl-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredTopics.map((topic, index) => {
              const isExpanded = expandedTopic === topic.id;
              const isCompleted = completedTopics.has(topic.id);

              return (
                <div 
                  key={topic.id}
                  className={`rounded-xl border transition-all ${
                    isExpanded 
                      ? 'border-amber-500/40 bg-slate-950/60 shadow-lg' 
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                  }`}
                >
                  {/* Topic Bar Header */}
                  <div className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleTopic(topic.id);
                        }}
                        aria-label={`تحديد درس ${topic.title} كمكتمل`}
                        className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                            : 'border-slate-700 hover:border-amber-400 text-transparent'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>

                      <button
                        onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                        className="text-right flex-1 min-w-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-500">#{index + 1}</span>
                          <span className={`text-sm font-semibold truncate ${isCompleted ? 'text-slate-300 line-through' : 'text-white'}`}>
                            {topic.title}
                          </span>
                        </div>
                      </button>
                    </div>

                    <button
                      onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                      aria-label="توسيع أو طي الدرس"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Expanded Content Body */}
                  {isExpanded && (
                    <div className="px-4 pb-6 pt-2 border-t border-slate-800/80 space-y-4">
                      <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-normal">
                        {topic.explanation}
                      </div>

                      {topic.codeSnippet && (
                        <div className="space-y-1.5">
                          {topic.codeSnippet.caption && (
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <span className="flex items-center gap-1.5 font-medium">
                                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                                {topic.codeSnippet.caption}
                              </span>
                              <button
                                onClick={() => handleCopyCode(topic.codeSnippet!.code, topic.id)}
                                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
                              >
                                {copiedCodeId === topic.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400">تم النسخ</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>نسخ الكود</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                          <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-amber-200/90 text-left dir-ltr overflow-x-auto">
                            <pre className="whitespace-pre">
                              <code>{topic.codeSnippet.code}</code>
                            </pre>
                          </div>
                        </div>
                      )}

                      {topic.keyTakeaways && topic.keyTakeaways.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                          <div className="text-xs font-semibold text-slate-200">
                            📌 خلاصة الدرس العملية:
                          </div>
                          <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                            {topic.keyTakeaways.map((point, idx) => (
                              <li key={idx} className="leading-relaxed">{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => onToggleTopic(topic.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                            isCompleted
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isCompleted ? 'إلغاء التحديد' : 'حدّد كدرس مكتمل'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Cheatsheet */}
      {activeTab === 'cheatsheet' && (
        <div className="p-6 space-y-4">
          <div className="text-xs text-slate-400">
            ملخص سريع لكافة النقاط الجوهرية في {phase.title} للمراجعة قبل المقابلات أو العمل على مشاريع العملاء:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {phase.topics.map((t, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="font-mono text-slate-500">#{idx + 1}</span>
                  <span>{t.title}</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  {t.keyTakeaways.map((k, kIdx) => (
                    <li key={kIdx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">●</span>
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Projects */}
      {activeTab === 'projects' && (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>نفّذ هذه المشاريع بيدك لترسيخ ما تعلمته في هذه المرحلة:</span>
            <button
              onClick={onOpenProjects}
              className="text-amber-400 hover:underline font-medium"
            >
              عرض الـ 10 مشاريع الكاملة ←
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {phase.projects.map((proj) => (
              <div 
                key={proj.id}
                className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <Briefcase className="w-4 h-4" />
                    <span>مشروع عملي</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">المخرجات المطلوبة:</span>
                    <ul className="list-disc list-inside mt-1 text-slate-300">
                      {proj.deliverables.map((del, i) => (
                        <li key={i}>{del}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                    💡 <strong>نصيحة:</strong> {proj.tips}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Interactive Quiz */}
      {activeTab === 'quiz' && (
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white">
                اختبر استيعابك لمفاهيم {phase.title}
              </h3>
              <p className="text-xs text-slate-400">
                أسئلة واقعية مستوحاة من سيناريوهات المشاريع والعملاء
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {showQuizResults && (
                <div className="px-3 py-1 rounded-lg bg-slate-805 border border-slate-700 text-xs font-bold text-amber-300 font-mono">
                  النتيجة: {correctAnswersCount} / {phase.quiz.length}
                </div>
              )}
              <button
                onClick={() => setShowQuizResults(!showQuizResults)}
                className="px-3.5 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg border border-slate-700 transition-colors"
              >
                {showQuizResults ? 'إخفاء الإجابات' : 'التحقق من الإجابات'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {phase.quiz.map((q, qIndex) => {
              const selected = selectedAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correctIndex;

              return (
                <div key={q.id} className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-amber-400 flex items-center justify-center shrink-0">
                      {qIndex + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-white leading-relaxed">
                      {q.question}
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isOptionSelected = selected === optIndex;
                      let optionStyle = 'border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 text-slate-300';

                      if (showQuizResults && isAnswered) {
                        if (optIndex === q.correctIndex) {
                          optionStyle = 'border-emerald-600 bg-emerald-950/60 text-emerald-200 font-medium';
                        } else if (isOptionSelected) {
                          optionStyle = 'border-rose-600 bg-rose-950/60 text-rose-200';
                        }
                      } else if (isOptionSelected) {
                        optionStyle = 'border-amber-500 bg-amber-950/40 text-amber-200 font-medium';
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleSelectQuizAnswer(q.id, optIndex)}
                          className={`w-full text-right p-3 rounded-lg border text-xs leading-relaxed transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {showQuizResults && optIndex === q.correctIndex && (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation feedback */}
                  {showQuizResults && isAnswered && (
                    <div className={`p-3 rounded-lg text-xs leading-relaxed border ${
                      isCorrect 
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' 
                        : 'bg-rose-950/40 border-rose-800 text-rose-300'
                    }`}>
                      <div className="font-semibold mb-1">
                        {isCorrect ? '✅ إجابة صحيحة وممتازة!' : '❌ إجابة غير دقيقة، إليك التفسير:'}
                      </div>
                      <div>{q.explanation}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
