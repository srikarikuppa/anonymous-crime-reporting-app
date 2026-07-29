import React, { useState } from 'react';
import { MapPin, Navigation, Compass, AlertTriangle, CheckCircle, RefreshCw, Layers } from 'lucide-react';
import { STATES } from '../mockData/options';

export default function Step2LocationCapture({ formData, setFormData, onNext, onBack }) {
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsDetected, setGpsDetected] = useState(formData.gpsCaptured || false);

  const selectedStateObj = STATES.find((s) => s.id === formData.state) || STATES[0];

  const handleDetectGps = () => {
    setIsDetectingGps(true);
    setTimeout(() => {
      setIsDetectingGps(false);
      setGpsDetected(true);
      setFormData((prev) => ({
        ...prev,
        gpsCaptured: true,
        latitude: '19.0760° N',
        longitude: '72.8777° E',
        state: 'MH',
        district: 'Mumbai City',
        block: 'Sector 4 Metro Area',
        landmark: 'Near Central Railway Gate No. 2'
      }));
    }, 1800);
  };

  const handleStateChange = (stateId) => {
    const newState = STATES.find((s) => s.id === stateId);
    setFormData((prev) => ({
      ...prev,
      state: stateId,
      district: newState ? newState.districts[0] : ''
    }));
  };

  const isFormValid = (formData.gpsCaptured || (formData.state && formData.district)) && formData.urgency;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex items-start justify-between p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-blue-500/20">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Step 2: Incident Location & Urgency Level
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Location details allow AI to automatically route your report to the nearest jurisdiction and emergency dispatch center.
            </p>
          </div>
        </div>
      </div>

      {/* Option A: Auto GPS Radar Detection */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-slate-200">
              Option A: Automated GPS Location Detection
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            Coarse Cell-Tower Triangulation
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
          
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleDetectGps}
              disabled={isDetectingGps}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                isDetectingGps
                  ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-wait'
                  : gpsDetected
                  ? 'bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold shadow-glow-teal'
              }`}
            >
              {isDetectingGps ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Acquiring Satellite Fix...</span>
                </>
              ) : gpsDetected ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>GPS Fix Captured (Re-scan)</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  <span>Detect GPS Location Now</span>
                </>
              )}
            </button>

            {/* Simulated Satellite Radar Graphic */}
            {isDetectingGps && (
              <div className="relative w-10 h-10 rounded-full border border-cyan-500/40 flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 border border-cyan-400/20 rounded-full animate-ping"></div>
                <div className="w-full h-full border-t-2 border-cyan-400 animate-radar rounded-full"></div>
                <MapPin className="w-4 h-4 text-cyan-400 z-10" />
              </div>
            )}
          </div>

          {/* Captured Coordinates Banner */}
          {gpsDetected && !isDetectingGps && (
            <div className="w-full sm:w-auto text-right font-mono text-xs text-slate-300 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
              <span className="text-cyan-400">LAT:</span> {formData.latitude || '19.0760° N'} | <span className="text-cyan-400">LONG:</span> {formData.longitude || '72.8777° E'}
              <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                Precision: ~15 meters (Privacy Fuzzed)
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Divider */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-800"></div>
        <span className="flex-shrink mx-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
          OR Manual Fallback Mapping
        </span>
        <div className="flex-grow border-t border-slate-800"></div>
      </div>

      {/* Option B: Manual Selection Dropdowns */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold text-slate-200">
            Option B: Manual State & District Selection
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* State Selector */}
          <div>
            <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
              Select State / Territory <span className="text-rose-400">*</span>
            </label>
            <select
              value={formData.state || ''}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-all"
            >
              <option value="" disabled>-- Choose State --</option>
              {STATES.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* District Selector */}
          <div>
            <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
              Select District / Region <span className="text-rose-400">*</span>
            </label>
            <select
              value={formData.district || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, district: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-all"
            >
              <option value="" disabled>-- Choose District --</option>
              {selectedStateObj.districts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Village / Block / Sector */}
          <div>
            <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
              Village / Block / Sector / Neighborhood
            </label>
            <input
              type="text"
              value={formData.block || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, block: e.target.value }))}
              placeholder="e.g. Sector 4, Civil Lines, Rampur"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-all placeholder-slate-600"
            />
          </div>

          {/* Nearest Landmark */}
          <div>
            <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
              Nearest Landmark / Cross Street
            </label>
            <input
              type="text"
              value={formData.landmark || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, landmark: e.target.value }))}
              placeholder="e.g. Behind Metro Gate #2, opposite Hospital"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-all placeholder-slate-600"
            />
          </div>

        </div>
      </div>

      {/* Emergency & Urgency Assessment */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Report Threat & Urgency Level</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'low', label: 'Standard / Past Incident', desc: 'No immediate threat to life/property', color: 'border-slate-700 bg-slate-950 text-slate-300' },
            { id: 'medium', label: 'Moderate Priority', desc: 'Ongoing property damage or harassment', color: 'border-amber-500/40 bg-amber-950/30 text-amber-200' },
            { id: 'high', label: 'Critical / In Progress', desc: 'Immediate physical threat or armed violence', color: 'border-rose-500/50 bg-rose-950/40 text-rose-200' }
          ].map((level) => {
            const isSelected = formData.urgency === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, urgency: level.id }))}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'ring-2 ring-cyan-400 bg-cyan-950/70 border-cyan-400 shadow-glow-teal scale-[1.02]'
                    : level.color
                }`}
              >
                <div className="font-semibold text-xs flex items-center justify-between">
                  <span>{level.label}</span>
                  {isSelected && <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {level.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-all"
        >
          &larr; Back to Step 1
        </button>

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
          <span>Continue to Evidence Upload</span>
          <span>&rarr;</span>
        </button>
      </div>

    </div>
  );
}
