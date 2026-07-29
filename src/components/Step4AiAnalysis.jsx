import React, { useState } from 'react';
import { Cpu, Sparkles, AlertTriangle, ShieldCheck, Tag, Zap, Activity, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
import { CRIME_CATEGORIES } from '../mockData/options';

export default function Step4AiAnalysis({ formData, setFormData, onNext, onBack }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState('');
  const [hasAnalyzed, setHasAnalyzed] = useState(formData.aiResult ? true : false);

  const runAiAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisPhase('Tokenizing Narrative & NLP Parsing...');

    setTimeout(() => {
      setAnalysisPhase('Cross-referencing Criminal Code Database & Threat Matrices...');
    }, 900);

    setTimeout(() => {
      setAnalysisPhase('Evaluating Evidence Weight & Urgency Scoring...');
    }, 1800);

    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);

      // Determine simulated category & score based on input
      const matchedCategory = CRIME_CATEGORIES.find((c) => c.id === formData.category) || CRIME_CATEGORIES[0];
      
      const calculatedScore = formData.urgency === 'high' ? 8.8 : formData.urgency === 'medium' ? 6.4 : 3.8;
      
      const aiOutput = {
        primaryCategory: matchedCategory.label,
        categoryCode: matchedCategory.id,
        confidence: '97.4%',
        severityScore: calculatedScore,
        severityLabel: calculatedScore >= 7 ? 'CRITICAL HIGH PRIORITY' : calculatedScore >= 5 ? 'MODERATE PRIORITY' : 'LOW ROUTINE',
        severityBadgeColor: calculatedScore >= 7 ? 'bg-rose-500 text-white' : calculatedScore >= 5 ? 'bg-amber-500 text-black' : 'bg-blue-500 text-white',
        extractedTags: [
          `#${matchedCategory.id.toUpperCase()}`,
          '#IMMEDIATE_DISPATCH',
          '#GEOLOCATION_VERIFIED',
          '#EVIDENCE_ATTACHED',
          '#NIGHT_INCIDENT'
        ],
        summary: `Incident description indicates suspected ${matchedCategory.label.toLowerCase()} occurring near ${formData.district || 'Metro District'}. High probability of recurrence based on historical spatial clusters.`,
        recommendedAuthority: calculatedScore >= 7 ? 'District Police HQ Rapid Response Cell & Emergency 112' : 'Local Police Station Sector 4 Desk'
      };

      setFormData((prev) => ({ ...prev, aiResult: aiOutput }));
    }, 2600);
  };

  const aiResult = formData.aiResult;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex items-start justify-between p-4 rounded-xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-cyan-950/40 border border-purple-500/30">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Step 4: AI Categorization & Severity Scoring
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                ShieldAI Neural Engine
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              ShieldAI parses the narrative and evidence to automatically classify crime severity, extract key facts, and optimize routing.
            </p>
          </div>
        </div>
      </div>

      {/* Trigger AI Scan Section */}
      {!hasAnalyzed && !isAnalyzing && (
        <div className="p-8 text-center rounded-xl bg-slate-900/90 border border-purple-500/20 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-glow-blue">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Ready for ShieldAI Neural Assessment
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Click below to initiate real-time NLP classification, threat matrix scoring, and authority routing recommendations.
            </p>
          </div>
          <button
            type="button"
            onClick={runAiAnalysis}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-glow-teal hover:scale-105 transition-all"
          >
            Run Incident AI Analysis Now
          </button>
        </div>
      )}

      {/* AI Scanning State Animation */}
      {isAnalyzing && (
        <div className="p-8 rounded-xl bg-slate-900/95 border border-purple-500/40 text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-cyan-400 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-cyan-500/20 border-b-purple-400 animate-spin flex items-center justify-center">
              <Cpu className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-mono font-bold text-cyan-300 animate-pulse">
              {analysisPhase}
            </p>
            <p className="text-xs text-slate-500 font-mono">
              [ShieldAI Neural Node #71 - 256 Nodes Active]
            </p>
          </div>
          <div className="w-full max-w-md mx-auto bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      )}

      {/* AI Analysis Output Dashboard */}
      {hasAnalyzed && aiResult && !isAnalyzing && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ShieldAI Intelligence Summary</span>
            </h3>
            <button
              type="button"
              onClick={runAiAnalysis}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Re-run Scan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: Identified Crime Category */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Primary Classification
              </span>
              <p className="text-base font-bold text-white leading-tight">
                {aiResult.primaryCategory}
              </p>
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  Confidence: {aiResult.confidence}
                </span>
                <span className="text-slate-700">|</span>
                <span className="text-[10px] font-mono text-emerald-400">Match High</span>
              </div>
            </div>

            {/* Card 2: Severity & Urgency Score Badge */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Threat Severity Gauge
              </span>
              <div className="flex items-center space-x-3">
                <div className="text-3xl font-extrabold font-mono text-white">
                  {aiResult.severityScore}
                  <span className="text-sm font-normal text-slate-500">/10</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${aiResult.severityBadgeColor}`}>
                  {aiResult.severityLabel}
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800 mt-2">
                <div
                  className={`h-full rounded-full ${
                    aiResult.severityScore >= 7 ? 'bg-rose-500 shadow-glow-red' : 'bg-amber-500 shadow-glow-amber'
                  }`}
                  style={{ width: `${(aiResult.severityScore / 10) * 100}%` }}
                />
              </div>
            </div>

            {/* Card 3: Target Authority Recommendation */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Recommended Authority
              </span>
              <p className="text-xs font-semibold text-slate-200 leading-snug">
                {aiResult.recommendedAuthority}
              </p>
              <span className="inline-block text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
                Auto-Dispatch Priority #1
              </span>
            </div>

          </div>

          {/* Key Extracted NLP Tags Cloud */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Extracted Entity & Context Tags</span>
            </span>

            <div className="flex flex-wrap gap-2">
              {aiResult.extractedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 hover:border-cyan-500/50 transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* AI Narrative Analysis Summary Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
            <span className="text-slate-400 font-mono text-[11px] block mb-1">
              [ShieldAI Legal Risk Matrix Output]:
            </span>
            {aiResult.summary}
          </div>

        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-all"
        >
          &larr; Back to Evidence
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-glow-teal hover:scale-[1.02] transition-all"
        >
          <span>Continue to Final Authority Routing</span>
          <span>&rarr;</span>
        </button>
      </div>

    </div>
  );
}
