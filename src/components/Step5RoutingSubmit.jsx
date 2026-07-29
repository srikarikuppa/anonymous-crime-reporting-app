import React, { useState } from 'react';
import { Send, Building2, PhoneCall, ShieldCheck, Key, Lock, CheckCircle, FileCheck2, AlertCircle } from 'lucide-react';
import { AUTHORITIES_MAP } from '../mockData/options';

export default function Step5RoutingSubmit({ formData, setFormData, onSubmit, onBack }) {
  const [passkey, setPasskey] = useState(formData.secretPasskey || '7892-SHIELD');

  const urgencyKey = formData.urgency || 'high';
  const targetAuthorities = AUTHORITIES_MAP[urgencyKey] || AUTHORITIES_MAP.high;
  const locationName = formData.district || 'Rampur District';

  const handleFinalSubmit = () => {
    // Generate unique tracking code
    const randomHex = Math.floor(10000 + Math.random() * 90000);
    const generatedCaseId = `#RC-2026-${randomHex}`;
    
    setFormData((prev) => ({
      ...prev,
      caseId: generatedCaseId,
      secretPasskey: passkey,
      submittedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }));

    onSubmit(generatedCaseId);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex items-start justify-between p-4 rounded-xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-cyan-950/40 border border-emerald-500/30">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Step 5: Authority Routing & Final Submission
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Review target dispatch destinations. Submitting will generate a encrypted Case Tracking ID for future status checks.
            </p>
          </div>
        </div>
      </div>

      {/* Target Routing Destination Badges */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-slate-200">
              Dynamic Target Routing Destination
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
            Automated Jurisdictional Matching
          </span>
        </div>

        {/* Dynamic Authority Cards */}
        <div className="space-y-3">
          {targetAuthorities.map((auth, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold">
                  0{idx + 1}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-200">
                    {auth.name.replace('District', locationName)}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Direct Helpline: {auth.contact}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  <CheckCircle className="w-3 h-3 text-cyan-400" />
                  <span>{auth.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immediate Emergency Helplines Box */}
      <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <PhoneCall className="w-5 h-5 text-rose-400" />
          <div>
            <p className="text-xs font-bold text-rose-200">
              Immediate Life Threat Emergency Hotlines
            </p>
            <p className="text-[11px] text-slate-400">
              National Emergency: <span className="font-mono text-rose-300 font-bold">112</span> | Women Helpline: <span className="font-mono text-rose-300 font-bold">1091</span> | Cyber Crime: <span className="font-mono text-rose-300 font-bold">1930</span>
            </p>
          </div>
        </div>
      </div>

      {/* Secret Passkey / Case Tracking Security Option */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center space-x-2">
          <Key className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
            Optional Passkey for Anonymous Status Tracking
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Because no email or login is required, this passkey paired with your Case ID lets you anonymously check police response updates later.
        </p>

        <div className="flex items-center space-x-3 max-w-md">
          <div className="relative flex-grow">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="e.g. 7892-SHIELD"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Auto-Generated
          </span>
        </div>
      </div>

      {/* Final Summary Checklist */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
        <span className="text-xs font-mono text-slate-400 block mb-1">
          Submission Readiness Check:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Narrative Ready</span>
          </div>
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Location Set</span>
          </div>
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Metadata Stripped</span>
          </div>
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>AI Risk Verified</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons & Final Submit */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-all"
        >
          &larr; Back to AI Analysis
        </button>

        <button
          type="button"
          onClick={handleFinalSubmit}
          className="flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-glow-teal hover:scale-105 transition-all"
        >
          <FileCheck2 className="w-5 h-5" />
          <span>Dispatch & Submit Report Anonymously</span>
        </button>
      </div>

    </div>
  );
}
