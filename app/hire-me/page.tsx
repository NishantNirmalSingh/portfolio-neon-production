"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Upload, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { motion, useAnimation } from 'framer-motion';
import { useCursor } from '@/components/providers/CursorProvider';
import { useAudio } from '@/components/providers/AudioProvider';

// ─── Zod schema ────────────────────────────────────────────
const schema = z.object({
  projectType: z.enum(['web-app', 'api', 'mobile', 'automation', 'fullstack', 'other']),
  projectName: z.string().min(3, 'Project name must be at least 3 characters'),
  projectDescription: z.string().min(50, 'Please describe your project in at least 50 characters'),
  estimatedBudget: z.enum(['under-10k', '10k-50k', '50k-1L', '1L-5L', 'above-5L', 'discuss']),
  targetDeadline: z.string().min(1, 'Please select a deadline'),
  name: z.string().min(2, 'Your name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const STEPS = ['Project Type', 'Requirements', 'Budget & Timeline', 'Your Details', 'Review'];

const projectTypes = [
  { value: 'web-app', label: '🌐 Web Application', desc: 'Full-stack web app with frontend + backend' },
  { value: 'api', label: '⚡ API / Backend', desc: 'REST API, microservice, or server-side system' },
  { value: 'mobile', label: '📱 Mobile App', desc: 'iOS / Android or cross-platform' },
  { value: 'automation', label: '⚙️ Automation', desc: 'Scripts, bots, data pipelines' },
  { value: 'fullstack', label: '🏗️ Full Stack System', desc: 'Complete product with admin, auth, DB' },
  { value: 'other', label: '💡 Other', desc: 'Something else — let\'s talk' },
];

const budgetOptions = [
  { value: 'under-10k', label: 'Under ₹10,000' },
  { value: '10k-50k', label: '₹10,000 – ₹50,000' },
  { value: '50k-1L', label: '₹50,000 – ₹1 Lakh' },
  { value: '1L-5L', label: '₹1 Lakh – ₹5 Lakh' },
  { value: 'above-5L', label: 'Above ₹5 Lakh' },
  { value: 'discuss', label: 'Let\'s Discuss' },
];

// ─── Ignition Submit Button ──────────────────────────────
function HoldToSubmit({ onTrigger, disabled }: { onTrigger: () => void, disabled: boolean }) {
  const [progress, setProgress] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onTriggerRef = useRef(onTrigger);
  const { setCursorType } = useCursor();
  const { playSound } = useAudio();

  // Keep ref in sync without re-running effects
  useEffect(() => {
    onTriggerRef.current = onTrigger;
  }, [onTrigger]);

  const startCharge = () => {
    if (disabled || triggered) return;
    playSound("click");
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 100;
        }
        return p + 5;
      });
    }, 50);
  };

  const stopCharge = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progress < 100 && !triggered) {
      setProgress(0);
    }
  };

  useEffect(() => {
    if (progress >= 100 && !triggered) {
      setTriggered(true);
      onTriggerRef.current();
    }
  }, [progress, triggered]);

  return (
    <div className="relative flex flex-col items-center justify-center pointer-events-auto">
      <motion.button
        type="button"
        onPointerDown={startCharge}
        onPointerUp={stopCharge}
        onPointerLeave={stopCharge}
        onMouseEnter={() => setCursorType("pointer")}
        onMouseLeave={() => setCursorType("default")}
        disabled={disabled || triggered}
        animate={{ scale: progress === 100 ? 1.2 : 1 + (progress / 100) * 0.2 }}
        className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all ${disabled || triggered ? 'opacity-50 grayscale' : ''}`}
      >
        {/* The Core Orb */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00f0ff] to-[#7c3aed] shadow-[0_0_20px_#00f0ff] opacity-80" />
        {/* Charge Ring */}
        <svg className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] -rotate-90 pointer-events-none">
          <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
          <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#f72585" strokeWidth="4"
            strokeDasharray="300"
            strokeDashoffset={300 - (300 * progress) / 100}
            className="transition-all duration-75"
          />
        </svg>
        <span className="relative z-10 text-[10px] font-mono font-bold tracking-widest text-black text-center whitespace-nowrap px-2">
          {triggered ? "IGNITED" : progress > 0 ? "CHARGING..." : "HOLD\nTO\nIGNITE"}
        </span>
      </motion.button>
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────
export default function HireMePage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'saving' | 'done'>('idle');
  const [file, setFile] = useState<File | null>(null);
  const { playSound } = useAudio();
  const { setCursorType } = useCursor();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { projectType: undefined, estimatedBudget: undefined },
  });

  const watchAll = watch();

  async function onSubmit(data: FormData) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setUploadStatus(file ? 'uploading' : 'saving');

    try {
      const payload: any = { ...data };

      if (file) {
        // Read file as base64 string to bypass Next.js FormData stream stalls
        const base64Str = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        
        payload.fileData = base64Str; // Format: "data:application/pdf;base64,...""
        payload.fileName = file.name;
        
        setUploadStatus('saving');
      }

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMsg = "Failed to submit request.";
        try {
          const errorData = await res.json();
          if (errorData.error) errorMsg = errorData.error;
        } catch (e) { }
        throw new Error(errorMsg);
      }

      setUploadStatus('done');
      playSound("click");
      setSubmitted(true);
    } catch (error: any) {
      console.error('Submission error:', error);
      setUploadStatus('idle');
      alert(error.message || 'Network Error. Cannot transmit signal.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function nextStep() {
    let isValid = true;

    if (step === 0) {
      isValid = await trigger(['projectType']);
    } else if (step === 1) {
      isValid = await trigger(['projectName', 'projectDescription']);
    } else if (step === 2) {
      isValid = await trigger(['estimatedBudget', 'targetDeadline']);
    } else if (step === 3) {
      isValid = await trigger(['name', 'email', 'phone', 'company']);
    }

    if (isValid) {
      playSound("click");
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    } else {
      // Play error sound or just let form show validation errors
    }
  }
  function prevStep() {
    playSound("click");
    setStep((s) => Math.max(s - 1, 0));
  }

  if (submitted) {
    return (
      <main className="min-h-screen relative flex flex-col pt-24 overflow-hidden z-10">
        <Navbar />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.15),transparent_70%)] pointer-events-none" />
        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-tier-3 border-[#00f0ff]/30 rounded-3xl p-12 text-center max-w-md w-full shadow-[0_0_50px_rgba(0,240,255,0.2)]">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#7c3aed] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_#00f0ff]">
              <CheckCircle size={48} className="text-black" />
            </div>
            <h2 className="heading-cinematic text-3xl mb-4">Signal Transmitted</h2>
            <p className="text-white/60 mb-10 leading-relaxed font-light">
              Your parameters have been logged. Awaiting manual review. I will establish contact shortly.
            </p>
            <Link href="/" className="btn-primary w-full justify-center text-black py-4 rounded-xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#7c3aed]">
              Return to Core
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative pt-28 pb-16 overflow-hidden z-10">
      <Navbar />

      {/* Background Magic Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-20">
        <Link
          href="/"
          onMouseEnter={() => setCursorType("pointer")}
          onMouseLeave={() => setCursorType("default")}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00f0ff]/70 hover:text-[#00f0ff] mb-10 transition-colors uppercase"
        >
          <ArrowLeft size={14} /> Back to Nexus
        </Link>

        {/* Steps Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-2 flex-1 relative">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 z-10 ${i < step
                      ? 'bg-gradient-to-br from-[#00f0ff] to-[#7c3aed] text-black shadow-[0_0_15px_#00f0ff]'
                      : i === step
                        ? 'glass-tier-3 border-[rgba(0,240,255,0.5)] text-[#00f0ff] shadow-[inset_0_0_10px_rgba(0,240,255,0.2)]'
                        : 'glass-tier-1 text-white/30 border-white/5'
                    }`}
                >
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={`text-[10px] uppercase tracking-widest hidden sm:block ${i === step ? 'text-[#00f0ff] font-bold' : 'text-white/30'}`}>
                  {label}
                </span>
                {/* Connecting Line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full h-[2px] -z-10 bg-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] transition-all duration-1000 ease-in-out"
                      style={{ width: step > i ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={(e) => { e.preventDefault(); /* handeled by Ignition */ }}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-tier-2 rounded-3xl p-8 md:p-12 min-h-[420px] flex flex-col relative overflow-hidden"
          >
            {/* Internal aesthetic lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] opacity-50" />

            {/* Step 0: Project Type */}
            {step === 0 && (
              <div className="flex-1">
                <h2 className="heading-cinematic text-2xl mb-8">Define Operating Parameters</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projectTypes.map((type) => (
                    <button
                      type="button"
                      key={type.value}
                      onClick={() => { setValue('projectType', type.value as FormData['projectType']); playSound("click"); }}
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                      className={`text-left p-5 rounded-2xl border transition-all duration-300 group ${watchAll.projectType === type.value
                          ? 'border-[rgba(0,240,255,0.6)] bg-[rgba(0,240,255,0.1)] text-white shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                          : 'border-white/10 glass-tier-1 hover:border-[#00f0ff]/30 text-white/60 hover:text-white'
                        }`}
                    >
                      <div className="font-bold text-sm mb-2">{type.label}</div>
                      <div className="text-xs text-white/40 font-light">{type.desc}</div>
                    </button>
                  ))}
                </div>
                {errors.projectType && <p className="text-[#f72585] text-xs mt-3 uppercase tracking-widest">{errors.projectType.message}</p>}
              </div>
            )}

            {/* Step 1: Requirements */}
            {step === 1 && (
              <div className="space-y-6 flex-1">
                <h2 className="heading-cinematic text-2xl mb-8">Project Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2 block">Project Name *</label>
                    <input
                      {...register('projectName')}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00f0ff]/50 focus:bg-[#00f0ff]/5 transition-all outline-none"
                      placeholder="Transmission Label..."
                    />
                    {errors.projectName && <p className="text-[#f72585] text-xs mt-1">{errors.projectName.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2 block">
                      Scope Definitions *
                    </label>
                    <textarea
                      {...register('projectDescription')}
                      rows={5}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00f0ff]/50 focus:bg-[#00f0ff]/5 transition-all outline-none resize-none mx-0"
                      placeholder="Outline core objectives and required mechanics..."
                    />
                    {errors.projectDescription && <p className="text-[#f72585] text-xs mt-1">{errors.projectDescription.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2 block">
                      Attach Schematics (PDF)
                    </label>
                    <div className="relative">
                      <input
                        type="file" accept="application/pdf" id="pdf-upload" className="sr-only"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f && f.size <= 10 * 1024 * 1024) { setFile(f); playSound("click"); }
                        }}
                      />
                      <label
                        htmlFor="pdf-upload"
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                        className="flex items-center gap-3 p-5 rounded-xl border border-dashed border-white/20 hover:border-[#00f0ff]/50 cursor-pointer transition-all text-sm text-white/40 hover:text-white bg-black/10"
                      >
                        <Upload size={18} />
                        {file ? <span className="text-[#00f0ff]">{file.name}</span> : 'Inject payload (Max 10MB)'}
                      </label>
                      {file && (
                        <button type="button" onClick={() => setFile(null)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all">
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Budget & Timeline */}
            {step === 2 && (
              <div className="space-y-6 flex-1">
                <h2 className="heading-cinematic text-2xl mb-8">Resource Allocation</h2>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3 block">Estimated Budget *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {budgetOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => { setValue('estimatedBudget', opt.value as FormData['estimatedBudget']); playSound("click"); }}
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                        className={`text-sm px-4 py-4 rounded-xl border transition-all ${watchAll.estimatedBudget === opt.value
                            ? 'border-[#00f0ff]/60 bg-[#00f0ff]/10 text-white font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                            : 'border-white/10 glass-tier-1 hover:border-[#00f0ff]/30 text-white/50 hover:text-white'
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {errors.estimatedBudget && <p className="text-[#f72585] text-xs mt-2">{errors.estimatedBudget.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2 block">Target Cycle *</label>
                  <input
                    type="date"
                    {...register('targetDeadline')}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00f0ff]/50 focus:bg-[#00f0ff]/5 transition-all outline-none [color-scheme:dark]"
                  />
                  {errors.targetDeadline && <p className="text-[#f72585] text-xs mt-1">{errors.targetDeadline.message}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && (
              <div className="space-y-6 flex-1">
                <h2 className="heading-cinematic text-2xl mb-8">Identity Verification</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2 block">Entity Name *</label>
                    <input {...register('name')} className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00f0ff]/50 transition-all outline-none" />
                    {errors.name && <p className="text-[#f72585] text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2 block">Identifier (Email) *</label>
                    <input {...register('email')} type="email" className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00f0ff]/50 transition-all outline-none" />
                    {errors.email && <p className="text-[#f72585] text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2 block">Comms Link (Phone)</label>
                    <input {...register('phone')} className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00f0ff]/50 transition-all outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2 block">Faction (Company)</label>
                    <input {...register('company')} className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00f0ff]/50 transition-all outline-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review and Ignition */}
            {step === 4 && (
              <div className="flex-1 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h2 className="heading-cinematic text-2xl mb-6">Verify Payload</h2>
                  <div className="space-y-4 bg-black/20 p-6 rounded-2xl border border-white/5">
                    {[
                      { label: 'Type', value: watchAll.projectType },
                      { label: 'Name', value: watchAll.projectName },
                      { label: 'Budget', value: budgetOptions.find((o) => o.value === watchAll.estimatedBudget)?.label },
                      { label: 'Cycle', value: watchAll.targetDeadline },
                      { label: 'Entity', value: watchAll.name },
                      { label: 'Node', value: watchAll.email },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 border-b border-white/[0.03] pb-3 last:border-0 last:pb-0">
                        <span className="text-[10px] font-mono text-[#00f0ff] w-16 flex-shrink-0 uppercase tracking-widest">{label}</span>
                        <span className="text-sm text-white/80 font-light truncate">{value || '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* The Magic Orb Submit */}
                <div className="flex flex-col items-center justify-center pt-4 md:pt-0 gap-4">
                  <HoldToSubmit
                    onTrigger={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                  />
                  {/* Status feedback — shown while isSubmitting so user knows it's working */}
                  {isSubmitting && (
                    <div className="flex flex-col items-center gap-2 animate-pulse">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                        <span className="text-[11px] font-mono tracking-widest text-[#00f0ff] uppercase">
                          {uploadStatus === 'uploading' && 'Uploading file...'}
                          {uploadStatus === 'saving' && 'Saving to database...'}
                          {uploadStatus === 'done' && 'Done!'}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/30 font-light">Please wait, do not close the page</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 0}
                  onMouseEnter={() => step !== 0 && setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                  className="flex items-center gap-2 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors font-mono uppercase tracking-widest text-xs"
                >
                  <ArrowLeft size={14} /> Revert
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] text-black font-bold text-xs font-mono uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  Proceed <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="flex items-center justify-start mt-10 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={prevStep}
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                  className="flex items-center gap-2 text-white/40 hover:text-white disabled:opacity-20 transition-colors font-mono uppercase tracking-widest text-xs"
                >
                  <ArrowLeft size={14} /> Edit Payload
                </button>
              </div>
            )}

          </motion.div>
        </form>
      </div>
    </main>
  );
}
