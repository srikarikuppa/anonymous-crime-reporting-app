import React from 'react';
import { Shield, ShieldAlert, Lock, Search, AlertOctagon, EyeOff } from 'lucide-react';

export default function Header({ onQuickEscape, onOpenLookup }) {
  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Logo & Security Badge */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-glow-teal">
            <Shield className="w-6 h-6 text-black font-bold" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-sans">
                Shield<span className="text-cyan-400">Report</span>
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono">
                v2.4 SECURE
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Zero-Knowledge Anonymous Incident Dispatch System
            </p>
          </div>
        </div>

        {/* Security Live Indicators */}
        <div className="hidden md:flex items-center space-x-4 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800 text-xs font-mono text-slate-300">
          <div className="flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-bit AES</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1.5">
            <EyeOff className="w-3.5 h-3.5 text-cyan-400" />
            <span>IP Scrubbed</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400">No Logs Kept</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenLookup}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
          >
            <Search className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Track Case Status</span>
            <span className="sm:hidden">Track</span>
          </button>

          <button
            onClick={onQuickEscape}
            title="Immediately exit page for safety"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-semibold shadow-glow-red transition-all"
          >
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>Quick Escape</span>
          </button>
        </div>

      </div>
    </header>
  );
}
