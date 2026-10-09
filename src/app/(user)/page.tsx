"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Sparkles, Stethoscope, AlertTriangle, ShieldCheck, MapPin, Activity, 
  Users, Building2, Phone, ArrowRight, CheckCircle2, Globe, HeartPulse, 
  BrainCircuit, Zap, Clock, ShieldAlert, FileText, ChevronRight, HelpCircle,
  ExternalLink, Navigation, Bandage, User, Play, ChevronDown, Check, Star
} from "lucide-react"
import { useLanguage, LANGUAGES, LangCode } from "@/lib/i18n"

export default function LandingPage() {
  const { lang, setLang, t } = useLanguage()
  const [userName, setUserName] = useState("Rajesh Kumar")
  const [activeTab, setActiveTab] = useState<"fracture" | "headache" | "cardiac">("fracture")

  useEffect(() => {
    const stored = localStorage.getItem("medrelay.user_name") || "Rajesh Kumar"
    setUserName(stored)
  }, [])

  return (
    <div className="min-h-screen bg-[#F6F8F0] text-[#143827] font-sans selection:bg-[#C6F052] selection:text-[#143827]">
      
      {/* 1. VIORA Style Clean Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#F6F8F0]/90 backdrop-blur-md border-b border-[#E2E8D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo (MedRelay Cross Badge) */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-[#143827] text-[#C6F052] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <HeartPulse size={22} className="animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#143827] uppercase">
                MED<span className="text-[#5E806E]">RELAY</span>
              </span>
            </div>
          </Link>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#5E806E]">
            <a href="#about" className="hover:text-[#143827] transition-colors">About</a>
            <a href="#services" className="hover:text-[#143827] transition-colors">Services</a>
            <a href="#whats-inside" className="hover:text-[#143827] transition-colors">What's Inside</a>
            <a href="#ai-triage" className="hover:text-[#143827] transition-colors">AI Triage</a>
            <a href="#clinics" className="hover:text-[#143827] transition-colors">Clinics &amp; Maps</a>
          </nav>

          {/* Right Corner: Language & Get Started / Demo Login */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#EBF0E4] hover:bg-[#E2E8D5] border border-[#E2E8D5] rounded-full px-3 py-1.5 transition-colors">
              <Globe size={14} className="text-[#5E806E] shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as LangCode)}
                className="bg-transparent text-xs font-bold text-[#143827] focus:outline-none cursor-pointer pr-1"
                aria-label="Select Language"
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.nativeLabel}
                  </option>
                ))}
              </select>
            </div>

            {/* VIORA Style Pill Button (Get Started / Demo Login) */}
            <Link 
              href="/login"
              className="inline-flex items-center gap-2 bg-[#143827] text-white hover:bg-[#0E2419] font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <span>Get Started</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight size={12} />
              </span>
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Hero Section (Exact Match to VIORA Reference Design) */}
      <section className="px-4 sm:px-8 pt-6 pb-16 max-w-7xl mx-auto">
        <div className="bg-[#F4F6EC] border border-[#E2E8D5] rounded-[36px] p-6 sm:p-10 md:p-14 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Typography, Social Proof & CTA */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              
              {/* Massive Hero Heading */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#143827] leading-[1.08]">
                  Feel Better.
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#5E806E] leading-[1.08]">
                  Live Healthier.
                </h1>
              </div>

              {/* Social Proof Avatar Stack & Ratings */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-[#F4F6EC] bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs">
                    👨🏽
                  </div>
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-[#F4F6EC] bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs">
                    👩🏻
                  </div>
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-[#F4F6EC] bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                    👨🏾‍⚕️
                  </div>
                  <div className="inline-flex h-10 w-10 rounded-full ring-2 ring-[#F4F6EC] bg-[#143827] text-white items-center justify-center font-bold text-xs">
                    3K+
                  </div>
                </div>

                <div className="text-xs">
                  <div className="flex items-center gap-1 font-bold text-[#143827]">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span>4.9/5 Happy users</span>
                  </div>
                  <p className="text-[#5E806E] font-medium text-[11px]">Personalized triage &amp; health gateway</p>
                </div>
              </div>

              {/* Subtitle Description */}
              <p className="text-base sm:text-lg text-[#5E806E] font-normal leading-relaxed max-w-lg">
                A smarter way to understand your health, build better habits, and create a wellness &amp; clinical care routine that actually fits your life.
              </p>

              {/* VIORA Start Your Wellness Journey Button */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-4 bg-[#143827] text-white hover:bg-[#0E2419] font-bold text-base px-7 py-4 rounded-full transition-all duration-300 shadow-xl shadow-[#143827]/20 hover:shadow-2xl hover:scale-[1.02] active:scale-95 group"
                >
                  <span>Start Your Wellness Journey</span>
                  <span className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#C6F052] group-hover:text-[#143827] flex items-center justify-center transition-colors">
                    <ArrowRight size={16} />
                  </span>
                </Link>

                <Link
                  href="/ai"
                  className="inline-flex items-center gap-2 bg-[#EBF0E4] hover:bg-[#E2E8D5] text-[#143827] font-bold text-sm px-5 py-4 rounded-full transition-colors border border-[#E2E8D5]"
                >
                  <Sparkles size={16} className="text-[#143827]" />
                  <span>Try AI Triage Free</span>
                </Link>
              </div>

            </div>

            {/* Right Column: Hero Visual with Floating Metric Badges */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Main Rounded Image Container */}
              <div className="w-full h-[400px] sm:h-[480px] rounded-[32px] overflow-hidden relative shadow-lg border border-[#E2E8D5] bg-gradient-to-tr from-[#EBF0E4] via-[#F4F6EC] to-[#E2E8D5]">
                {/* Clean Nature / Wellness Visual Imagery */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(198,240,82,0.2),transparent_70%)]" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-[#143827] text-[#C6F052] flex items-center justify-center shadow-xl mb-4 animate-bounce duration-1000">
                    <HeartPulse size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-[#143827] max-w-xs">
                    Connected Care Across Every Level
                  </h3>
                  <p className="text-xs text-[#5E806E] font-semibold mt-1 max-w-xs">
                    Citizen • ASHA Worker • PHC Doctor • Super-Specialty Hospital
                  </p>
                </div>
              </div>

              {/* Floating Top-Left Dark Forest Badge: Energy Trend +18.4% */}
              <div className="absolute -top-4 -left-3 sm:-left-6 bg-[#143827] text-white rounded-2xl p-4 shadow-2xl border border-white/10 w-44 sm:w-48 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="text-[11px] font-medium text-white/70">Energy Trend</div>
                <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5 tracking-tight flex items-center justify-between">
                  <span>+18.4%</span>
                  <span className="text-[10px] text-[#C6F052] bg-white/10 px-1.5 py-0.5 rounded font-mono">PEAK</span>
                </div>
                
                {/* 6 Lime Vertical Chart Bars (like reference image) */}
                <div className="flex items-end justify-between gap-1.5 h-10 mt-3 pt-1 border-t border-white/10">
                  <div className="w-full bg-[#C6F052] rounded-t-sm h-[40%]" />
                  <div className="w-full bg-[#C6F052] rounded-t-sm h-[65%]" />
                  <div className="w-full bg-[#C6F052] rounded-t-sm h-[50%]" />
                  <div className="w-full bg-[#C6F052] rounded-t-sm h-[85%]" />
                  <div className="w-full bg-[#C6F052] rounded-t-sm h-[70%]" />
                  <div className="w-full bg-[#C6F052] rounded-t-sm h-[100%]" />
                </div>
              </div>

              {/* Floating Bottom-Right White Badge: Weekly Progress 76% */}
              <div className="absolute -bottom-4 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-[#E2E8D5] w-48 sm:w-52 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between text-xs text-[#5E806E]">
                  <span className="font-semibold text-[11px]">Weekly Progress</span>
                  <span className="text-slate-400 font-mono text-xs">···</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#143827] mt-1 tracking-tight">
                  76%
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-[#EBF0E4] h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#143827] h-full rounded-full w-[76%]" />
                </div>
                
                <div className="flex items-center justify-between mt-2 text-[10px] text-[#5E806E] font-bold">
                  <span className="text-emerald-700 flex items-center gap-0.5">
                    ↑ +12% From Last Week
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Section: What's Inside (VIORA Feature Pillars) */}
      <section id="whats-inside" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#5E806E] uppercase tracking-widest bg-[#EBF0E4] px-3.5 py-1 rounded-full border border-[#E2E8D5]">
            Unified Digital Health Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#143827] tracking-tight">
            Designed to support every step of your health journey
          </h2>
          <p className="text-[#5E806E] text-sm sm:text-base">
            MedRelay connects rural patients, ASHA ground workers, primary health officers, and super-specialty hospitals on a single high-speed network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white border border-[#E2E8D5] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all hover:border-[#143827] group">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF0E4] text-[#143827] flex items-center justify-center group-hover:bg-[#143827] group-hover:text-[#C6F052] transition-colors mb-5">
              <BrainCircuit size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#143827] mb-2">Multilingual AI Triage</h3>
            <p className="text-xs text-[#5E806E] leading-relaxed">
              Clinical symptom analysis in 8+ Indian languages. Accurately stratifies risk and asks doctor-grade questions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#E2E8D5] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all hover:border-[#143827] group">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF0E4] text-[#143827] flex items-center justify-center group-hover:bg-[#143827] group-hover:text-[#C6F052] transition-colors mb-5">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#143827] mb-2">ABDM &amp; ABHA Locker</h3>
            <p className="text-xs text-[#5E806E] leading-relaxed">
              14-digit ABHA ID integration. Encrypted FHIR R4 medical records, blood reports, X-rays, and e-prescriptions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#E2E8D5] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all hover:border-[#143827] group">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF0E4] text-[#143827] flex items-center justify-center group-hover:bg-[#143827] group-hover:text-[#C6F052] transition-colors mb-5">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#143827] mb-2">Google Maps Directions</h3>
            <p className="text-xs text-[#5E806E] leading-relaxed">
              Instant routing to verified Primary Health Centres, 24x7 trauma wards, and available specialty consultants.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-[#E2E8D5] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all hover:border-[#143827] group">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF0E4] text-[#143827] flex items-center justify-center group-hover:bg-[#143827] group-hover:text-[#C6F052] transition-colors mb-5">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#143827] mb-2">1-Tap Emergency SOS</h3>
            <p className="text-xs text-[#5E806E] leading-relaxed">
              Critical emergency gateway connecting directly to 108 ambulances, trauma centers, and district command hubs.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Section: Interactive AI Clinical Triage Simulator */}
      <section id="ai-triage" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-[#143827] text-white rounded-[36px] p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <span className="text-xs font-bold text-[#C6F052] uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
              Interactive Clinical Simulation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Try MedRelay AI Clinical Triage Live
            </h2>
            <p className="text-sm text-white/70">
              Select a clinical scenario below to see how our AI evaluates severity, asks diagnostic questions, and provides live Google Maps hospital links.
            </p>
          </div>

          {/* Scenario Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab("fracture")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === "fracture"
                  ? "bg-[#C6F052] text-[#143827] shadow-lg scale-105"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
              }`}
            >
              🦴 Suspected Broken Hand / Fracture
            </button>
            <button
              onClick={() => setActiveTab("headache")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === "headache"
                  ? "bg-[#C6F052] text-[#143827] shadow-lg scale-105"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
              }`}
            >
              🩺 Severe Headache / BP Check
            </button>
            <button
              onClick={() => setActiveTab("cardiac")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === "cardiac"
                  ? "bg-rose-500 text-white shadow-lg scale-105"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
              }`}
            >
              🚨 Acute Chest Pain / Cardiac SOS
            </button>
          </div>

          {/* Interactive Simulation Output Card */}
          <div className="bg-white text-[#143827] rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
            
            {activeTab === "fracture" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-lg">
                      ⚠️
                    </span>
                    <div>
                      <h4 className="font-bold text-base text-slate-900">Suspected Musculoskeletal Fracture / Injury</h4>
                      <p className="text-xs text-slate-500">Query: "I fell down and think I broke my hand with severe swelling"</p>
                    </div>
                  </div>
                  <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200 self-start sm:self-auto">
                    HIGH RISK • Orthopedic Urgency
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                      <Stethoscope size={14} className="text-teal-600" />
                      Doctor Diagnostic Checklist:
                    </h5>
                    <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                      <li>Can you move your fingers or does movement cause sharp bone pain?</li>
                      <li>Is there visible bone deformity, abnormal curvature, or dark bruising?</li>
                      <li>Did you hear an audible snap or pop at the moment of impact?</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                      <Bandage size={14} className="text-teal-600" />
                      Recommended Specialist:
                    </h5>
                    <p className="font-bold text-slate-900">Dr. Marcus Chen, MS (Ortho)</p>
                    <p className="text-slate-500">Senior Orthopedic Surgeon • Digital X-Ray &amp; Splinting</p>
                    <p className="text-[11px] text-teal-700 font-semibold mt-2">Action: Immobilize limb &amp; proceed to nearest X-Ray centre.</p>
                  </div>
                </div>

                {/* Google Maps Hospital Link */}
                <div className="bg-[#EBF0E4] border border-[#E2E8D5] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#143827] text-[#C6F052] flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-[#143827]">Indira Gandhi Govt General Hospital (IGGGH)</h5>
                      <p className="text-xs text-[#5E806E]">24x7 Trauma Care &amp; Digital X-Ray Unit • 1.8 km (6 mins away)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Indira+Gandhi+Government+General+Hospital+Puducherry" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#143827] text-white rounded-full text-xs font-bold hover:bg-[#0E2419] flex items-center gap-1.5 transition-colors"
                    >
                      <Navigation size={12} />
                      <span>Open in Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "headache" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                      🩺
                    </span>
                    <div>
                      <h4 className="font-bold text-base text-slate-900">Headache &amp; Vital Evaluation</h4>
                      <p className="text-xs text-slate-500">Query: "I have had a severe throbbing headache for two days"</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                    MODERATE RISK • PHC Consult Recommended
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h5 className="font-bold text-slate-800 mb-2">Doctor Diagnostic Checklist:</h5>
                    <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                      <li>Is there nausea, light sensitivity, or blurred vision?</li>
                      <li>Was onset gradual or sudden "worst headache of life"?</li>
                      <li>Are you adequately hydrated with normal blood pressure?</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h5 className="font-bold text-slate-800 mb-2">Suggested Facility / Doctor:</h5>
                    <p className="font-bold text-slate-900">Dr. S. Ramanathan, MD (Gen Med)</p>
                    <p className="text-slate-500">Villianur Primary Health Centre (PHC)</p>
                    <p className="text-[11px] text-teal-700 font-semibold mt-2">Action: Walk-in OPD visit for immediate BP check &amp; treatment.</p>
                  </div>
                </div>

                {/* Google Maps Link */}
                <div className="bg-[#EBF0E4] border border-[#E2E8D5] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#143827] text-[#C6F052] flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-[#143827]">Villianur Primary Health Centre (PHC)</h5>
                      <p className="text-xs text-[#5E806E]">Walk-in OPD &amp; Vital Screening • 0.9 km (3 mins away)</p>
                    </div>
                  </div>

                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Villianur+PHC+Puducherry" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#143827] text-white rounded-full text-xs font-bold hover:bg-[#0E2419] flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <Navigation size={12} />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            )}

            {activeTab === "cardiac" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg animate-pulse">
                      🚨
                    </span>
                    <div>
                      <h4 className="font-bold text-base text-rose-900">Acute Chest Pain / Cardiac Emergency</h4>
                      <p className="text-xs text-rose-700">Query: "Crushing chest tightness radiating down left arm with sweating"</p>
                    </div>
                  </div>
                  <span className="bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full animate-pulse self-start sm:self-auto">
                    CRITICAL EMERGENCY • CALL 108
                  </span>
                </div>

                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs space-y-2 text-rose-900">
                  <p className="font-bold text-sm">Immediate Actions Required:</p>
                  <p>1. Keep patient resting quietly in semi-seated position; do not allow walking.</p>
                  <p>2. Dial 108 Emergency Medical Services immediately for cardiac ALS ambulance.</p>
                  <p>3. Nearest Tertiary Cath Lab notified at JIPMER Super-Specialty Hospital.</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href="/emergency"
                    className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-full text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <span>🚨 Trigger 1-Tap Emergency SOS</span>
                  </Link>
                  <a
                    href="tel:108"
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full text-xs transition-colors flex items-center gap-2"
                  >
                    <Phone size={14} />
                    <span>Call 108 Ambulance</span>
                  </a>
                </div>
              </div>
            )}

          </div>

          <div className="text-center mt-8">
            <Link 
              href="/ai" 
              className="inline-flex items-center gap-2 text-xs font-bold text-[#C6F052] hover:underline"
            >
              <span>Launch Fullscreen MedRelay AI Chat Interface</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Minimalist VIORA Footer */}
      <footer className="bg-[#143827] text-white/80 py-12 px-4 sm:px-8 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#C6F052] text-[#143827] flex items-center justify-center font-bold">
              <HeartPulse size={18} />
            </div>
            <div>
              <span className="font-black text-white text-lg uppercase tracking-tight">MedRelay</span>
              <p className="text-[11px] text-white/60">Ayushman Bharat Digital Mission (ABDM) Integrated</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white/70">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#ai-triage" className="hover:text-white transition-colors">AI Triage</a>
            <Link href="/login" className="hover:text-[#C6F052] font-bold transition-colors">Demo Login</Link>
          </div>

          <div className="text-xs text-white/50">
            © 2026 MedRelay Health Systems. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  )
}
