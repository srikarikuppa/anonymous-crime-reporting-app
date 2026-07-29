import React, { useState } from 'react';
import { Search, X, ShieldCheck, CheckCircle2, Clock, MapPin, Building2, FileText, ArrowRight } from 'lucide-react';

export default function CaseLookupModal({ isOpen, onClose, defaultCaseId }) {
  const [inputCaseId, setInputCaseId] = useState(defaultCaseId || '#RC-2026-24578');
  const [inputPasskey, setInputPasskey] = useState('7892-SHIELD');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      setSearchResult({
        caseId: inputCaseId || '#RC-2026-24578',
        status: 'Under Active Investigation',
        stage: 3, // 1: Submitted, 2: Reviewed, 3: Dispatched, 4: Resolved
        timestamp: '2026-07-29 23:45 IST',
        jurisdiction: 'Rampur Local Police Station - Sector 4 Patrol Unit',
        severityRating: 'High Priority (8.5/10)',
        officerAssigned: 'Inspector R. Sharma (Badge #8821)',
        notes: 'Patrol unit dispatched to site. Surveillance video feed requested from municipal traffic camera #14.'
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-xl p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-sans">
              Track Anonymous Case Status
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Case Tracking ID
              </label>
              <input
                type="text"
                value={inputCaseId}
                onChange={(e) => setInputCaseId(e.target.value)}
                placeholder="#RC-2026-XXXXX"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Secret Passkey
              </label>
              <input
                type="text"
                value={inputPasskey}
                onChange={(e) => setInputPasskey(e.target.value)}
                placeholder="Passkey"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-glow-teal transition-all flex items-center justify-center space-x-2"
          >
            {isSearching ? (
              <span>Searching Secure Database...</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Fetch Status Updates</span>
              </>
            )}
          </button>
        </form>

        {/* Search Results Display */}
        {searchResult && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <span className="font-mono text-cyan-400 font-bold">
                  {searchResult.caseId}
                </span>
                <p className="text-[11px] text-slate-400">
                  Last Updated: {searchResult.timestamp}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono text-[10px] font-bold">
                {searchResult.status}
              </span>
            </div>

            {/* Status Timeline */}
            <div className="grid grid-cols-4 gap-2 text-center font-mono text-[10px]">
              {[
                { name: 'Submitted', done: true },
                { name: 'AI Scored', done: true },
                { name: 'Dispatched', done: true },
                { name: 'Resolved', done: false }
              ].map((step, idx) => (
                <div key={idx} className="space-y-1">
                  <div className={`h-1.5 rounded-full ${step.done ? 'bg-cyan-400 shadow-glow-teal' : 'bg-slate-800'}`}></div>
                  <span className={step.done ? 'text-cyan-300 font-bold' : 'text-slate-600'}>{step.name}</span>
                </div>
              ))}
            </div>

            {/* Case Details */}
            <div className="space-y-2 text-slate-300 pt-2 border-t border-slate-900">
              <div className="flex justify-between">
                <span className="text-slate-500">Jurisdiction Unit:</span>
                <span className="font-semibold text-slate-200">{searchResult.jurisdiction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Lead:</span>
                <span className="font-semibold text-cyan-400">{searchResult.officerAssigned}</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-slate-300 mt-2">
                <span className="text-slate-500 text-[10px] block font-mono">LATEST ACTION LOG:</span>
                {searchResult.notes}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
