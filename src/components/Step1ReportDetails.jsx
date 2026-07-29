import React, { useState, useEffect } from 'react';
import { Mic, Square, Play, ShieldCheck, Sparkles, AlertCircle, Info, RefreshCw } from 'lucide-react';
import { CRIME_CATEGORIES } from '../mockData/options';

export default function Step1ReportDetails({ formData, setFormData, onNext }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [hasVoiceMemo, setHasVoiceMemo] = useState(formData.voiceMemoAttached || false);

  // Recording Timer effect
  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      setRecordSeconds(0);
      setIsRecording(true);
    } else {
      setIsRecording(false);
      setHasVoiceMemo(true);
      setFormData((prev) => ({ ...prev, voiceMemoAttached: true, voiceDuration: recordSeconds }));
    }
  };

  const deleteVoiceMemo = () => {
    setHasVoiceMemo(false);
    setRecordSeconds(0);
    setFormData((prev) => ({ ...prev, voiceMemoAttached: false, voiceDuration: 0 }));
  };

  const handleCategoryToggle = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category === categoryId ? '' : categoryId
    }));
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const isFormValid = formData.description && formData.description.trim().length > 10;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex items-start justify-between p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/20">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Step 1: Anonymous Report & Details
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Encrypted Channel
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Provide as much detail as safe. Your personal identity, IP address, and device headers are completely stripped.
            </p>
          </div>
        </div>
      </div>

      {/* Category Quick Selectors */}
      <div>
        <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
          Select Crime Category (Optional Quick Tag)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {CRIME_CATEGORIES.map((cat) => {
            const isSelected = formData.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryToggle(cat.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-20 ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-glow-teal scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-500'}`}>
                    {isSelected ? 'SELECTED' : 'TAG'}
                  </span>
                </div>
                <span className="text-xs font-semibold leading-tight line-clamp-2">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Incident Narrative Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <span>Detailed Incident Narrative</span>
            <span className="text-rose-400">*</span>
          </label>
          <span className="text-xs text-slate-500 font-mono">
            {formData.description ? formData.description.length : 0} / 2000 chars
          </span>
        </div>

        <textarea
          rows={5}
          value={formData.description || ''}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Describe what happened... Include dates, times, suspect features, vehicles, or suspicious activities. Do NOT include your own personal contact info unless requested."
          className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm leading-relaxed transition-all resize-y"
        />

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span className="flex items-center space-x-1 text-slate-500">
            <Info className="w-3.5 h-3.5" />
            <span>Minimum 10 characters required to activate AI Analysis</span>
          </span>
        </div>
      </div>

      {/* Voice Audio Recording Module */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mic className={`w-4 h-4 ${isRecording ? 'text-rose-500 animate-pulse' : 'text-cyan-400'}`} />
            <span className="text-xs font-semibold text-slate-200">
              Optional Voice Report Memo
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Voice Pitch-Shift Scrubbing Active
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-lg bg-slate-950 border border-slate-800/80">
          
          {/* Recording Control Button & Timer */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={toggleRecording}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all ${
                isRecording
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-glow-red'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-glow-teal'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop Recording ({formatTime(recordSeconds)})</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5" />
                  <span>{hasVoiceMemo ? 'Re-record Voice Memo' : 'Record Audio Note'}</span>
                </>
              )}
            </button>

            {/* Audio Wave Visualizer Animation when recording */}
            {isRecording && (
              <div className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-rose-500/30">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping mr-1"></span>
                <span className="w-1 bg-rose-500 rounded-full animate-wave-1"></span>
                <span className="w-1 bg-cyan-400 rounded-full animate-wave-2"></span>
                <span className="w-1 bg-blue-500 rounded-full animate-wave-3"></span>
                <span className="w-1 bg-emerald-400 rounded-full animate-wave-4"></span>
                <span className="w-1 bg-purple-500 rounded-full animate-wave-5"></span>
              </div>
            )}
          </div>

          {/* Voice Memo Status Badge */}
          {hasVoiceMemo && !isRecording && (
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                <Play className="w-3.5 h-3.5 text-cyan-400" />
                <span>Voice Note ({formatTime(formData.voiceDuration || recordSeconds)}) - Voice Masked</span>
              </div>
              <button
                type="button"
                onClick={deleteVoiceMemo}
                className="text-xs text-rose-400 hover:text-rose-300 underline font-mono"
              >
                Delete
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Anonymous Guarantee Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-500/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <p className="text-xs font-semibold text-emerald-300">
              Anonymous & Un-tracked Submission Lock Enabled
            </p>
            <p className="text-[11px] text-slate-400">
              No IP addresses logged • Browser fingerprints stripped • No account registration required
            </p>
          </div>
        </div>
      </div>

      {/* Next Step Action Bar */}
      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onNext}
          disabled={!isFormValid}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            isFormValid
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-glow-teal hover:scale-[1.02]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <span>Continue to Location Step</span>
          <span>&rarr;</span>
        </button>
      </div>

    </div>
  );
}
