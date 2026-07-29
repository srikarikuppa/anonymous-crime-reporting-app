import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, QrCode, Download, ShieldCheck, ArrowRight, Lock, Printer } from 'lucide-react';

export default function ConfirmationModal({ caseId, passkey, submittedAt, onClose, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(caseId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-glow-teal space-y-6 text-center overflow-hidden">
        
        {/* Glow backdrop behind modal */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Success Animated Shield Icon */}
        <div className="relative z-10 w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 p-1 shadow-glow-teal">
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Report Dispatched Anonymously
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            Your encrypted incident packet has been routed to local emergency dispatch & law enforcement servers.
          </p>
        </div>

        {/* Case Tracking ID Card */}
        <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-3">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
            Generated Case Tracking Identification ID
          </span>

          <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 font-mono">
            <span className="text-xl font-extrabold text-cyan-300 tracking-wider">
              {caseId}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-500 text-black'
                  : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black border border-cyan-500/40'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
            <span>Passkey: <span className="text-slate-200 font-bold">{passkey}</span></span>
            <span>Time: <span className="text-slate-300">{submittedAt}</span></span>
          </div>
        </div>

        {/* Simulated QR Code / Barcode Scanner */}
        <div className="flex items-center justify-center space-x-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="p-2 rounded-lg bg-white">
            <QrCode className="w-12 h-12 text-black" />
          </div>
          <div className="text-left text-xs space-y-1">
            <p className="font-semibold text-slate-200">
              Scannable Mobile Case Token
            </p>
            <p className="text-[11px] text-slate-400 leading-tight">
              Scan with mobile camera or save screenshot to monitor progress on public kiosk terminals.
            </p>
          </div>
        </div>

        {/* Security Reminders */}
        <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-left flex items-start space-x-2 text-xs text-emerald-300 font-sans">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <span>
            Save your Case ID now. For your security, this window will self-purge when closed and no browser history will be stored.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print Receipt</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-glow-teal transition-all"
          >
            <span>Submit Another Report</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
