import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, AlertCircle, Lock, RefreshCw, Zap } from 'lucide-react';
import Header from './components/Header';
import StepProgressTracker from './components/StepProgressTracker';
import Step1ReportDetails from './components/Step1ReportDetails';
import Step2LocationCapture from './components/Step2LocationCapture';
import Step3EvidenceUpload from './components/Step3EvidenceUpload';
import Step4AiAnalysis from './components/Step4AiAnalysis';
import Step5RoutingSubmit from './components/Step5RoutingSubmit';
import ConfirmationModal from './components/ConfirmationModal';
import CaseLookupModal from './components/CaseLookupModal';
import { PRESET_EVIDENCE } from './mockData/options';

const INITIAL_FORM_DATA = {
  category: 'cyber',
  description: 'Observed suspicious illegal cyber activity and phishing operation operating out of an unmarked commercial basement near the central market area. Multiple unauthorized servers visible through basement window.',
  voiceMemoAttached: false,
  voiceDuration: 0,
  gpsCaptured: false,
  latitude: '',
  longitude: '',
  state: 'UP',
  district: 'Rampur',
  block: 'Sector 4 Market Complex',
  landmark: 'Behind Metro Gate #2',
  urgency: 'high',
  evidenceList: [],
  aiResult: null,
  secretPasskey: '7892-SHIELD',
  caseId: '',
  submittedAt: ''
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLookupModal, setShowLookupModal] = useState(false);
  const [quickEscaped, setQuickEscaped] = useState(false);

  // Quick Escape handler
  const handleQuickEscape = () => {
    setFormData(INITIAL_FORM_DATA);
    setQuickEscaped(true);
    // Redirect to neutral site or show neutral state
    window.location.href = 'https://www.google.com';
  };

  // Demo Autofill preset helper
  const handleAutofillDemo = () => {
    setFormData({
      category: 'theft',
      description: 'Armored vault break-in attempt observed at 11:45 PM. Two masked suspects cut perimeter fence and attempted access to server room. Vehicle parked nearby (Black SUV, license obscured).',
      voiceMemoAttached: true,
      voiceDuration: 14,
      gpsCaptured: true,
      latitude: '19.0760° N',
      longitude: '72.8777° E',
      state: 'MH',
      district: 'Mumbai City',
      block: 'Sector 4 Commercial Plaza',
      landmark: 'Opposite Central Railway Station',
      urgency: 'high',
      evidenceList: PRESET_EVIDENCE,
      aiResult: {
        primaryCategory: 'Theft, Robbery & Burglary',
        categoryCode: 'theft',
        confidence: '98.2%',
        severityScore: 8.8,
        severityLabel: 'CRITICAL HIGH PRIORITY',
        severityBadgeColor: 'bg-rose-500 text-white',
        extractedTags: ['#ARMED_BURGLARY', '#SUSPECT_VEHICLE', '#NIGHT_INCIDENT', '#HIGH_THREAT'],
        summary: 'Incident involves forced entry attempt and vehicle logistics. Urgency score 8.8 triggers immediate police dispatch.',
        recommendedAuthority: 'District Police HQ Rapid Response Cell & Emergency 112'
      },
      secretPasskey: '9921-SHIELD',
      caseId: '',
      submittedAt: ''
    });
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (caseId) => {
    setShowConfirmation(true);
  };

  const handleResetForm = () => {
    setShowConfirmation(false);
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-gray-100 bg-grid-pattern selection:bg-cyan-500 selection:text-black">
      
      {/* Header Bar */}
      <Header
        onQuickEscape={handleQuickEscape}
        onOpenLookup={() => setShowLookupModal(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 md:py-8 space-y-6">
        
        {/* Top Demo Helper Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-slate-300">
              Prototype Mode: 5-Step Guided Wizard
            </span>
          </div>

          <button
            type="button"
            onClick={handleAutofillDemo}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Autofill Sample Incident Data</span>
          </button>
        </div>

        {/* 5-Step Visual Progress Tracker */}
        <div className="glass-panel p-4 md:p-6 rounded-2xl">
          <StepProgressTracker
            currentStep={currentStep}
            onSelectStep={(step) => setCurrentStep(step)}
          />
        </div>

        {/* Wizard Step Views with Framer Motion Animation */}
        <div className="glass-panel p-5 md:p-8 rounded-2xl border border-slate-800 shadow-2xl relative min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {currentStep === 1 && (
                <Step1ReportDetails
                  formData={formData}
                  setFormData={setFormData}
                  onNext={handleNextStep}
                />
              )}

              {currentStep === 2 && (
                <Step2LocationCapture
                  formData={formData}
                  setFormData={setFormData}
                  onNext={handleNextStep}
                  onBack={handleBackStep}
                />
              )}

              {currentStep === 3 && (
                <Step3EvidenceUpload
                  formData={formData}
                  setFormData={setFormData}
                  onNext={handleNextStep}
                  onBack={handleBackStep}
                />
              )}

              {currentStep === 4 && (
                <Step4AiAnalysis
                  formData={formData}
                  setFormData={setFormData}
                  onNext={handleNextStep}
                  onBack={handleBackStep}
                />
              )}

              {currentStep === 5 && (
                <Step5RoutingSubmit
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleFormSubmit}
                  onBack={handleBackStep}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500 font-mono space-y-1">
        <p className="flex items-center justify-center space-x-2">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>ShieldReport Zero-Knowledge Anonymous Crime Reporting System</span>
        </p>
        <p className="text-[11px] text-slate-600">
          Protected by End-to-End Encryption & Ephemeral Transport Nodes. No logs retained.
        </p>
      </footer>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal
          caseId={formData.caseId || '#RC-2026-24578'}
          passkey={formData.secretPasskey}
          submittedAt={formData.submittedAt}
          onClose={() => setShowConfirmation(false)}
          onReset={handleResetForm}
        />
      )}

      {/* Track Case Lookup Modal */}
      <CaseLookupModal
        isOpen={showLookupModal}
        onClose={() => setShowLookupModal(false)}
        defaultCaseId={formData.caseId}
      />

    </div>
  );
}
