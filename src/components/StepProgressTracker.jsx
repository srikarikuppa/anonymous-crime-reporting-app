import React from 'react';
import { FileText, MapPin, Upload, Cpu, Send, Check } from 'lucide-react';

const STEPS = [
  { id: 1, name: 'Report', subtitle: 'Incident Details', icon: FileText },
  { id: 2, name: 'Location', subtitle: 'GPS & Area', icon: MapPin },
  { id: 3, name: 'Evidence', subtitle: 'Media & Files', icon: Upload },
  { id: 4, name: 'AI Processing', subtitle: 'Categorization & Risk', icon: Cpu },
  { id: 5, name: 'Routing', subtitle: 'Submit & Confirm', icon: Send }
];

export default function StepProgressTracker({ currentStep, onSelectStep }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="relative">
        
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-slate-800 rounded-full z-0 hidden md:block">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-glow-teal"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {/* Nodes Grid */}
        <div className="relative z-10 flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;

            return (
              <button
                key={step.id}
                onClick={() => isCompleted && onSelectStep(step.id)}
                disabled={!isCompleted && !isActive}
                className={`flex md:flex-col items-center flex-1 min-w-[140px] md:min-w-0 p-2.5 md:p-0 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-slate-900/90 md:bg-transparent border border-cyan-500/40 md:border-none shadow-glow-teal'
                    : isCompleted
                    ? 'cursor-pointer hover:opacity-90'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Circle Icon Container */}
                <div
                  className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 font-bold text-sm ${
                    isCompleted
                      ? 'bg-cyan-500 text-black shadow-glow-teal scale-100'
                      : isActive
                      ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white ring-4 ring-cyan-500/20 scale-110 shadow-glow-blue'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[3]" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  {isActive && (
                    <span className="absolute -inset-1 rounded-full border border-cyan-400/50 animate-pulse"></span>
                  )}
                </div>

                {/* Text Description */}
                <div className="ml-3 md:ml-0 md:mt-2.5 text-left md:text-center">
                  <div className="flex items-center space-x-1 md:justify-center">
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-cyan-400' : isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
                      0{step.id}.
                    </span>
                    <span className={`text-sm font-semibold tracking-tight ${isActive ? 'text-white font-bold' : isCompleted ? 'text-slate-200' : 'text-slate-400'}`}>
                      {step.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 hidden lg:block mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
