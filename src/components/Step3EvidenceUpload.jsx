import React, { useState } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, Film, Music, ShieldCheck, Check, Trash2, Plus, Sparkles, RefreshCw } from 'lucide-react';
import { PRESET_EVIDENCE } from '../mockData/options';

export default function Step3EvidenceUpload({ formData, setFormData, onNext, onBack }) {
  const [evidenceList, setEvidenceList] = useState(formData.evidenceList || PRESET_EVIDENCE);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(100);

  const handleAddPreset = (preset) => {
    if (evidenceList.some((e) => e.id === preset.id)) return;
    
    setIsScrubbing(true);
    setScrubProgress(20);

    setTimeout(() => setScrubProgress(60), 250);
    setTimeout(() => {
      setScrubProgress(100);
      setIsScrubbing(false);
      const newList = [...evidenceList, preset];
      setEvidenceList(newList);
      setFormData((prev) => ({ ...prev, evidenceList: newList }));
    }, 600);
  };

  const handleRemoveEvidence = (id) => {
    const newList = evidenceList.filter((item) => item.id !== id);
    setEvidenceList(newList);
    setFormData((prev) => ({ ...prev, evidenceList: newList }));
  };

  const handleSimulatedFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsScrubbing(true);
    setScrubProgress(30);

    setTimeout(() => {
      setScrubProgress(100);
      setIsScrubbing(false);
      const newItems = files.map((file, idx) => ({
        id: `custom-${Date.now()}-${idx}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'audio',
        originalExif: { camera: 'User Upload', gps: 'Stripped', timestamp: 'Sanitized' },
        status: 'Scrubbed',
        scrubbedTime: '0.2s'
      }));

      const combined = [...evidenceList, ...newItems];
      setEvidenceList(combined);
      setFormData((prev) => ({ ...prev, evidenceList: combined }));
    }, 800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex items-start justify-between p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-emerald-500/20">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Step 3: Evidence Upload & Automated EXIF Scrubbing
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Upload photos, video, or audio evidence. All files are automatically sanitized to remove camera serials, timestamps, and embedded GPS metadata.
            </p>
          </div>
        </div>
      </div>

      {/* Drag & Drop Upload Container */}
      <div className="relative p-8 rounded-xl bg-slate-900/80 border-2 border-dashed border-slate-700 hover:border-cyan-500/50 text-center transition-all group">
        <input
          type="file"
          multiple
          onChange={handleSimulatedFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-4 rounded-full bg-slate-950 border border-slate-800 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all">
            <UploadCloud className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">
              Drag & Drop Evidence Files Here
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supports JPG, PNG, MP4, WAV, MP3, PDF (Max 50MB per file)
            </p>
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-slate-800 group-hover:bg-cyan-500 group-hover:text-black text-slate-300 text-xs font-semibold transition-all border border-slate-700"
          >
            Browse Files from Device
          </button>
        </div>
      </div>

      {/* Preset Demo Evidence Quick Attach */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fast Prototype Demo Presets</span>
          </span>
          <span className="text-[11px] text-slate-500">Click to quickly add mock evidence</span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {PRESET_EVIDENCE.map((preset) => {
            const isAdded = evidenceList.some((e) => e.id === preset.id);
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleAddPreset(preset)}
                disabled={isAdded}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isAdded
                    ? 'bg-slate-950 text-slate-500 border-slate-800 cursor-default opacity-60'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span>{preset.name} ({preset.size})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrubbing Animation Progress Bar */}
      {isScrubbing && (
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-300 flex items-center space-x-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>Stripping EXIF GPS & Device Headers...</span>
            </span>
            <span className="text-cyan-400 font-bold">{scrubProgress}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-cyan-400 h-full rounded-full transition-all duration-300 shadow-glow-teal"
              style={{ width: `${scrubProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Attached Evidence List & Anonymization Status Badges */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
            Attached & Anonymized Evidence Files ({evidenceList.length})
          </h3>
          <span className="text-xs text-emerald-400 font-mono flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>All Metadata Stripped</span>
          </span>
        </div>

        {evidenceList.length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-slate-950 border border-slate-800 text-slate-500 text-xs font-mono">
            No evidence files attached yet. (Evidence is optional but recommended).
          </div>
        ) : (
          <div className="space-y-2">
            {evidenceList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-950 text-cyan-400 border border-slate-800">
                    {item.type === 'image' ? (
                      <ImageIcon className="w-5 h-5" />
                    ) : item.type === 'video' ? (
                      <Film className="w-5 h-5" />
                    ) : (
                      <Music className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs font-semibold text-slate-200">
                        {item.name}
                      </p>
                      <span className="text-[10px] font-mono text-slate-400">
                        ({item.size})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="inline-flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Anonymized / EXIF Cleared ({item.scrubbedTime})</span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveEvidence(item.id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-all"
                  title="Remove File"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-all"
        >
          &larr; Back to Location
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-glow-teal hover:scale-[1.02] transition-all"
        >
          <span>Continue to AI Analysis</span>
          <span>&rarr;</span>
        </button>
      </div>

    </div>
  );
}
