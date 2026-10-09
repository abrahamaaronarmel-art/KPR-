"use client"
import { useState, useRef, useEffect } from "react"
import { 
  Send, Mic, Sparkles, User, AlertCircle, Globe, Link2, MicOff, Stethoscope, 
  ShieldCheck, XCircle, Copy, Check, KeyRound, MapPin, ExternalLink, Navigation, 
  Phone, HelpCircle, ShieldAlert, HeartPulse, Building2, Bandage, Clock, CheckCircle2,
  Paperclip, Image as ImageIcon, FileText, Smile, MoreHorizontal, Wifi, WifiOff, X,
  ArrowRight, Activity, Flame, Zap, Droplets, AlertTriangle, ChevronRight, FileUp
} from "lucide-react"
import Link from "next/link"
import { AbhaModal } from "@/components/AbhaModal"
import { PhoneSimulator, SimulationMessage } from "@/components/PhoneSimulator"
import { useLanguage, LANGUAGES, LangCode } from "@/lib/i18n"
import { 
  processFirstAidQuery, 
  FIRST_AID_SECTIONS, 
  WHAT_NOT_TO_DO_RULES, 
  FirstAidResponse,
  NearbyFacility,
  SuggestedDoctor
} from "@/lib/firstAidKnowledge"

type AttachedFile = {
  name: string
  type: string
  size?: number
  url?: string
  isImage?: boolean
}

type Message = {
  id: string
  role: "user" | "ai"
  content: string
  timestamp: string
  attachedFile?: AttachedFile
  riskLevel?: "low" | "moderate" | "high" | "critical"
  category?: string
  ruleOfThumb?: string
  firstAidTips?: string[]
  whatNotToDo?: string[]
  diagnosticQuestions?: string[]
  suggestedDoctor?: SuggestedDoctor
  nearbyFacilities?: NearbyFacility[]
  isOffline?: boolean
}

export default function MedRelayAIChatPage() {
  const { lang, setLang, t } = useLanguage()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [abhaLinked, setAbhaLinked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [simMessages, setSimMessages] = useState<SimulationMessage[]>([])
  const [pendingDiagnostics, setPendingDiagnostics] = useState<any[]>([])
  const [patientCode, setPatientCode] = useState("PT-8891")
  const [userName, setUserName] = useState("Rajesh Kumar")
  const [copiedCode, setCopiedCode] = useState(false)
  
  // Attachment state
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Offline Simulation & Network Status
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [networkOnline, setNetworkOnline] = useState(true)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showQuickGuideModal, setShowQuickGuideModal] = useState(false)
  const [showMascotBanner, setShowMascotBanner] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Detect real online/offline browser state
  useEffect(() => {
    const handleOnline = () => setNetworkOnline(true)
    const handleOffline = () => setNetworkOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    setNetworkOnline(navigator.onLine)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Initialize greeting with user's name & time
  useEffect(() => {
    const storedName = localStorage.getItem("medrelay.user_name") || "Rajesh Kumar"
    setUserName(storedName)

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    setMessages(prev => {
      if (prev.length === 0 || (prev.length === 1 && prev[0].role === "ai")) {
        return [
          {
            id: "1",
            role: "ai",
            content: `Hello, ${storedName}! I am Dr. Owl & MedRelay AI Clinical Triage Assistant. I work both ONLINE and 100% OFFLINE with complete national first aid protocols (112/108).\n\nDescribe your symptoms, tap a quick first aid chip, or attach photos of wounds/X-rays/prescriptions for instant AI analysis.`,
            timestamp: currentTime,
            ruleOfThumb: "CHECK the scene & person → CALL 112/108 for life threats → CARE within training.",
            firstAidTips: [
              "Emergency in India: Call 112 (National Emergency) or 108 (Ambulance).",
              "You can attach photos of wounds, fractures, X-rays, or prescriptions using the 📎 button.",
              "Works completely offline without internet connection."
            ]
          }
        ]
      }
      return prev
    })
  }, [lang, t])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (!localStorage.getItem("medrelay.user_unique_code")) {
      localStorage.setItem("medrelay.user_unique_code", "PT-8891")
    }
    setPatientCode(localStorage.getItem("medrelay.user_unique_code") || "PT-8891")

    const fetchState = () => {
      const p = JSON.parse(localStorage.getItem("medrelay.pending_diagnostics") || "[]")
      setPendingDiagnostics(p)
    }
    fetchState()
    const interval = setInterval(fetchState, 1500)
    return () => clearInterval(interval)
  }, [])

  // Handle file uploads (Images & Documents)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isImg = file.type.startsWith("image/")
    const objectUrl = URL.createObjectURL(file)

    setAttachedFile({
      name: file.name,
      type: file.type,
      size: file.size,
      url: objectUrl,
      isImage: isImg
    })

    // Reset input so re-selecting works
    e.target.value = ""
  }

  // Voice Recognition
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser.")
      return
    }

    if (isRecording) {
      setIsRecording(false)
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'ta' ? 'ta-IN' : 'en-US'

    setIsRecording(true)

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setIsRecording(false)
    }

    recognition.onerror = () => {
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }

  // Core Chat Send Handler (Online with seamless Offline fallback)
  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim()
    const currentAttachment = attachedFile

    if (!query && !currentAttachment) return

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMessageId = Date.now().toString()

    const userMessage: Message = {
      id: userMessageId,
      role: "user",
      content: query || (currentAttachment ? `Analyzed attachment: ${currentAttachment.name}` : ""),
      timestamp: timeNow,
      attachedFile: currentAttachment || undefined
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setAttachedFile(null)
    setIsTyping(true)

    const shouldUseOffline = isOfflineMode || !networkOnline

    if (shouldUseOffline) {
      // Execute 100% Client-Side Local Offline Engine with 0 latency
      setTimeout(() => {
        const offlineResult: FirstAidResponse = processFirstAidQuery(query, currentAttachment)
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: offlineResult.replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          riskLevel: offlineResult.riskLevel,
          category: offlineResult.category,
          ruleOfThumb: offlineResult.ruleOfThumb,
          firstAidTips: offlineResult.immediateSteps,
          whatNotToDo: offlineResult.whatNotToDo,
          diagnosticQuestions: offlineResult.diagnosticQuestions,
          suggestedDoctor: offlineResult.suggestedDoctor,
          nearbyFacilities: offlineResult.nearbyFacilities,
          isOffline: true
        }
        setMessages(prev => [...prev, aiMessage])
        setIsTyping(false)
      }, 500)
      return
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: query, 
          language: lang,
          attachedFile: currentAttachment ? { name: currentAttachment.name, type: currentAttachment.type } : null
        })
      })

      if (!response.ok) throw new Error("Network request failed")

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        riskLevel: data.riskLevel,
        category: data.category,
        ruleOfThumb: data.ruleOfThumb,
        firstAidTips: data.firstAidTips,
        whatNotToDo: data.whatNotToDo,
        diagnosticQuestions: data.diagnosticQuestions,
        suggestedDoctor: data.suggestedDoctor,
        nearbyFacilities: data.nearbyFacilities,
        isOffline: data.isOffline || false
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (err) {
      // Seamlessly fallback to offline local knowledge base on any network glitch
      console.warn("Falling back to local offline first aid engine:", err)
      const fallbackResult = processFirstAidQuery(query, currentAttachment)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: fallbackResult.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        riskLevel: fallbackResult.riskLevel,
        category: fallbackResult.category,
        ruleOfThumb: fallbackResult.ruleOfThumb,
        firstAidTips: fallbackResult.immediateSteps,
        whatNotToDo: fallbackResult.whatNotToDo,
        diagnosticQuestions: fallbackResult.diagnosticQuestions,
        suggestedDoctor: fallbackResult.suggestedDoctor,
        nearbyFacilities: fallbackResult.nearbyFacilities,
        isOffline: true
      }
      setMessages(prev => [...prev, aiMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(patientCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Quick Chips
  const QUICK_PROMPT_CHIPS = [
    { label: "🩸 Severe Bleeding", query: "Someone is severely bleeding from a deep wound. What first aid should I do?" },
    { label: "🫁 Choking Aid", query: "An adult is choking on food and cannot breathe. How do I help?" },
    { label: "🔥 Burns & Scalds", query: "First aid for a hot boiling water burn on arm." },
    { label: "🦴 Broken Hand / Bone", query: "I think I have a fracture / broken bone in my hand from a fall." },
    { label: "❤️ Unresponsive / CPR", query: "Person is unresponsive and not breathing normally. How do I do CPR?" },
    { label: "🧠 Seizure Care", query: "Someone is having a seizure on the floor. What should I do?" },
    { label: "🧪 Poisoning / Overdose", query: "Suspected chemical or pesticide poisoning first aid." },
    { label: "😮‍💨 Asthma Inhaler", query: "Severe asthma breathing difficulty first aid." },
    { label: "😵 Fainting / Dizzy", query: "My mind feels light and dizzy, what should I do?" },
    { label: "🚫 What NOT to Do", query: "What NOT to do in first aid emergency?" },
    { label: "🩺 Headache & BP", query: "I have had a severe throbbing headache for 2 days." }
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-5.5rem)] max-w-5xl mx-auto px-2 sm:px-4 py-2 text-[#143827]">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*,.pdf,.doc,.docx,.txt" 
        className="hidden" 
      />

      {/* ABHA Modal */}
      <AbhaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => setAbhaLinked(true)} 
      />

      {/* Phone Simulator for SMS / WhatsApp alerts */}
      <PhoneSimulator 
        messages={simMessages} 
        onDismiss={(id: string) => setSimMessages(prev => prev.filter(m => m.id !== id))} 
      />

      {/* Quick First Aid Guide Modal */}
      {showQuickGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#E2E8D5] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8D5] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <h3 className="font-bold text-lg text-[#143827]">Bystander Emergency First Aid Guide</h3>
              </div>
              <button 
                onClick={() => setShowQuickGuideModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-rose-50 border border-rose-200 text-rose-900 p-3.5 rounded-2xl text-xs flex items-center justify-between">
              <div>
                <span className="font-bold">National Emergency Helpline (India):</span>
                <p className="mt-0.5">Dial <strong>112</strong> for National Emergency or <strong>108</strong> for Ambulance Services.</p>
              </div>
              <a href="tel:108" className="px-3 py-1.5 bg-rose-600 text-white rounded-full font-bold text-xs shrink-0">
                Call 108
              </a>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#143827]">Quick Decision Framework:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {FIRST_AID_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setShowQuickGuideModal(false)
                      handleSend(`Tell me about: ${sec.title}`)
                    }}
                    className="text-left p-3 rounded-2xl bg-[#F6F8F0] hover:bg-[#EBF0E4] border border-[#E2E8D5] transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-2 font-bold text-[#143827] mb-1">
                      <span>{sec.icon}</span>
                      <span className="line-clamp-1">{sec.title}</span>
                    </div>
                    <p className="text-[11px] text-[#5E806E] line-clamp-2">{sec.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#E2E8D5] pt-3">
              <h4 className="font-bold text-xs text-rose-800 uppercase tracking-wider mb-2">7 Critical 'What NOT to Do' Rules:</h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {WHAT_NOT_TO_DO_RULES.map((rule, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 shrink-0">
        
        {/* Left: Triage Mode & Unique Code */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#EBF0E4] border border-[#E2E8D5] text-[#143827] px-3 py-1.5 rounded-full text-xs font-bold shadow-2xs">
            <Sparkles size={14} className="text-[#143827]" />
            <span>MedRelay AI Guide</span>
          </div>

          <button 
            type="button"
            onClick={handleCopyCode}
            title="Click to copy unique code"
            className="hidden sm:flex items-center gap-1 bg-[#EBF0E4] hover:bg-[#E2E8D5] border border-[#E2E8D5] text-[#143827] px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
          >
            <KeyRound size={12} className="text-[#5E806E]" />
            <span className="text-[11px] text-[#5E806E]">Unique Code:</span>
            <span className="font-mono font-bold text-xs">{patientCode}</span>
            {copiedCode ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} className="text-[#5E806E]" />}
          </button>
        </div>

        {/* Right: Offline / Online Toggle, ABHA, First Aid Button */}
        <div className="flex items-center gap-2">
          
          {/* Offline / Online Engine Toggle */}
          <button
            type="button"
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              isOfflineMode || !networkOnline
                ? "bg-amber-100 text-amber-900 border-amber-300 shadow-xs"
                : "bg-[#EBF0E4] text-[#143827] border-[#E2E8D5] hover:bg-[#E2E8D5]"
            }`}
            title="Switch between live server API and 100% offline local first-aid engine"
          >
            {isOfflineMode || !networkOnline ? (
              <>
                <WifiOff size={13} className="text-amber-700" />
                <span>Offline Engine Active</span>
              </>
            ) : (
              <>
                <Wifi size={13} className="text-emerald-700" />
                <span>Online (ABDM Live)</span>
              </>
            )}
          </button>

          {/* Quick First Aid Guide Button */}
          <button
            onClick={() => setShowQuickGuideModal(true)}
            className="flex items-center gap-1.5 bg-[#143827] text-white hover:bg-[#0E2419] px-3 py-1.5 rounded-full text-xs font-bold shadow-xs transition-all"
          >
            <span>📋 First Aid Guide</span>
          </button>

          {/* ABHA Link */}
          <button 
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 bg-[#EBF0E4] hover:bg-[#E2E8D5] border border-[#E2E8D5] text-[#143827] px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
          >
            <ShieldCheck size={13} className="text-teal-700" />
            <span>{abhaLinked ? "ABHA Linked" : "Link ABHA ID"}</span>
          </button>
        </div>
      </div>

      {/* Mascot Dr. Owl Illustrated Banner (Matching Image Attachment Style) */}
      {showMascotBanner && (
        <div className="relative mb-2 bg-gradient-to-r from-[#EBF0E4] via-[#F4F6EC] to-[#E2E8D5] border border-[#E2E8D5] rounded-3xl p-3 sm:p-4 shadow-xs shrink-0 overflow-hidden">
          <div className="flex items-center justify-between relative z-10 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#143827] text-[#C6F052] flex items-center justify-center text-2xl shadow-md shrink-0">
                🦉
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm sm:text-base text-[#143827]">
                    Dr. Owl • MedRelay AI Care Guide
                  </h4>
                  <span className="text-[10px] font-bold bg-[#143827] text-[#C6F052] px-2 py-0.5 rounded-full uppercase">
                    24x7 Active
                  </span>
                </div>
                <p className="text-xs text-[#5E806E] mt-0.5">
                  Trained on National First Aid Protocols (112 / 108) • Instant diagnosis questions, image inspection, and offline care
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowMascotBanner(false)}
              className="text-[#5E806E] hover:text-[#143827] p-1.5 rounded-full hover:bg-white/50 text-xs"
              title="Dismiss banner"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Chat Message Scroll Container */}
      <div className="flex-1 overflow-y-auto space-y-4 px-2 sm:px-4 py-3 bg-white/70 backdrop-blur-sm border border-[#E2E8D5] rounded-3xl shadow-xs">
        
        {messages.map((m) => {
          const isUser = m.role === "user"

          return (
            <div 
              key={m.id} 
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
            >
              <div className={`flex items-end gap-2 max-w-[92%] sm:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${
                  isUser 
                    ? 'bg-[#143827] text-white font-bold text-xs' 
                    : 'bg-[#143827] text-[#C6F052] font-bold text-sm'
                }`}>
                  {isUser ? userName.slice(0, 1).toUpperCase() || 'U' : '🦉'}
                </div>

                {/* Message Bubble Container */}
                <div className="space-y-2">
                  
                  {/* Speech Bubble */}
                  <div className={`p-4 rounded-3xl shadow-xs text-sm leading-relaxed ${
                    isUser 
                      ? 'bg-[#143827] text-white rounded-br-xs' 
                      : 'bg-[#F4F6EC] text-[#143827] border border-[#E2E8D5] rounded-bl-xs'
                  }`}>
                    
                    {/* Attached Image / File Preview in Bubble */}
                    {m.attachedFile && (
                      <div className="mb-3 p-2 bg-white/10 rounded-2xl border border-white/20">
                        {m.attachedFile.isImage && m.attachedFile.url ? (
                          <div className="rounded-xl overflow-hidden max-h-48 mb-2">
                            <img 
                              src={m.attachedFile.url} 
                              alt="Attachment preview" 
                              className="w-full h-auto object-cover rounded-xl"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 p-2 bg-white/10 rounded-xl text-xs font-semibold">
                            <FileText size={18} />
                            <span>{m.attachedFile.name}</span>
                          </div>
                        )}
                        <span className="text-[10px] opacity-80 block">Attached for Medical Analysis</span>
                      </div>
                    )}

                    {/* Main Content Text */}
                    <div className="whitespace-pre-line font-medium">
                      {m.content}
                    </div>

                    {/* Category & Rule of Thumb */}
                    {m.ruleOfThumb && (
                      <div className="mt-3 pt-2.5 border-t border-black/10 text-xs font-semibold text-[#5E806E]">
                        💡 <strong>First Aid Rule:</strong> {m.ruleOfThumb}
                      </div>
                    )}

                    {/* Offline Badge */}
                    {m.isOffline && (
                      <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                        <WifiOff size={10} /> Local Offline First Aid Engine
                      </div>
                    )}

                    {/* Timestamp */}
                    <div className={`text-[10px] mt-1.5 flex items-center justify-end ${
                      isUser ? 'text-white/70' : 'text-[#5E806E]'
                    }`}>
                      <span>{m.timestamp}</span>
                    </div>

                  </div>

                  {/* AI Extra Clinical Cards (Diagnostic Questions, Doctor, Maps) */}
                  {!isUser && (
                    <div className="space-y-3">
                      
                      {/* 1. Step-by-Step Immediate First Aid Steps */}
                      {m.firstAidTips && m.firstAidTips.length > 0 && (
                        <div className="bg-white border border-[#E2E8D5] rounded-2xl p-4 shadow-xs text-xs space-y-2">
                          <h5 className="font-bold text-[#143827] flex items-center gap-1.5 text-xs uppercase tracking-wide">
                            <Bandage size={14} className="text-[#143827]" />
                            Immediate Action Protocol:
                          </h5>
                          <ul className="space-y-1.5 text-slate-700">
                            {m.firstAidTips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-[#EBF0E4] text-[#143827] font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                                  {idx + 1}
                                </span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 2. Critical 'What NOT to Do' Rules */}
                      {m.whatNotToDo && m.whatNotToDo.length > 0 && (
                        <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-3.5 text-xs text-rose-900 space-y-1.5">
                          <h5 className="font-bold text-rose-800 flex items-center gap-1 text-xs uppercase tracking-wide">
                            <AlertTriangle size={14} className="text-rose-600" />
                            What NOT to Do (Safety Rules):
                          </h5>
                          <ul className="space-y-1 text-rose-800 list-disc list-inside">
                            {m.whatNotToDo.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 3. Doctor Diagnostic Questions */}
                      {m.diagnosticQuestions && m.diagnosticQuestions.length > 0 && (
                        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-3.5 text-xs text-blue-950 space-y-1.5">
                          <h5 className="font-bold text-blue-900 flex items-center gap-1 text-xs uppercase tracking-wide">
                            <Stethoscope size={14} className="text-blue-700" />
                            Doctor Diagnostic Questions:
                          </h5>
                          <ul className="space-y-1 text-blue-900 list-disc list-inside">
                            {m.diagnosticQuestions.map((q, idx) => (
                              <li key={idx}>{q}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 4. Suggested Doctor Card */}
                      {m.suggestedDoctor && (
                        <div className="bg-[#F4F6EC] border border-[#E2E8D5] rounded-2xl p-4 shadow-xs text-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#143827] flex items-center gap-1.5 uppercase tracking-wide">
                              <Stethoscope size={14} className="text-[#143827]" />
                              Recommended Specialist
                            </span>
                            <span className="text-[10px] font-bold bg-[#143827] text-[#C6F052] px-2 py-0.5 rounded-full">
                              {m.suggestedDoctor.specialty}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-sm text-[#143827]">{m.suggestedDoctor.doctorName}</p>
                            <p className="text-[11px] text-[#5E806E]">{m.suggestedDoctor.qualification}</p>
                            <p className="text-[11px] text-[#143827] font-semibold mt-1">
                              Reason: {m.suggestedDoctor.reason}
                            </p>
                          </div>
                          <Link
                            href="/consultation"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#143827] text-white font-bold rounded-full text-xs hover:bg-[#0E2419] transition-all"
                          >
                            <span>{m.suggestedDoctor.actionText}</span>
                            <ArrowRight size={12} />
                          </Link>
                        </div>
                      )}

                      {/* 5. Nearby Facilities & Google Maps Links */}
                      {m.nearbyFacilities && m.nearbyFacilities.length > 0 && (
                        <div className="bg-white border border-[#E2E8D5] rounded-2xl p-4 shadow-xs text-xs space-y-3">
                          <h5 className="font-bold text-[#143827] flex items-center gap-1.5 uppercase tracking-wide">
                            <MapPin size={14} className="text-[#143827]" />
                            Nearby Hospitals &amp; PHCs (Google Maps):
                          </h5>
                          <div className="space-y-2">
                            {m.nearbyFacilities.map((fac, idx) => (
                              <div 
                                key={idx} 
                                className="p-3 rounded-xl bg-[#F6F8F0] border border-[#E2E8D5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                              >
                                <div>
                                  <p className="font-bold text-[#143827] text-xs">{fac.name}</p>
                                  <p className="text-[11px] text-[#5E806E]">{fac.type} • {fac.distance}</p>
                                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">📞 {fac.phone} • {fac.timings}</p>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <a 
                                    href={fac.googleMapsUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 bg-[#143827] text-white rounded-full text-[11px] font-bold hover:bg-[#0E2419] flex items-center gap-1"
                                  >
                                    <Navigation size={10} />
                                    <span>Maps</span>
                                  </a>
                                  <a 
                                    href={`tel:${fac.phone}`}
                                    className="px-2.5 py-1 bg-[#EBF0E4] text-[#143827] rounded-full text-[11px] font-bold hover:bg-[#E2E8D5] flex items-center gap-1"
                                  >
                                    <Phone size={10} />
                                    <span>Call</span>
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>

              </div>
            </div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-2 animate-in fade-in">
            <div className="w-8 h-8 rounded-full bg-[#143827] text-[#C6F052] flex items-center justify-center font-bold text-sm">
              🦉
            </div>
            <div className="bg-[#F4F6EC] border border-[#E2E8D5] rounded-2xl rounded-tl-sm p-4 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-[#143827] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#143827] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-[#143827] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips Bar (Matching Image 2 Style) */}
      <div className="py-2 overflow-x-auto flex items-center gap-2 scrollbar-none shrink-0">
        {QUICK_PROMPT_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.query)}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all bg-[#EBF0E4] text-[#143827] hover:bg-[#143827] hover:text-[#C6F052] border border-[#E2E8D5] shadow-2xs hover:scale-105 active:scale-95 shrink-0"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Pending Attachment Preview Bar */}
      {attachedFile && (
        <div className="mb-2 p-2.5 bg-[#EBF0E4] border border-[#E2E8D5] rounded-2xl flex items-center justify-between gap-3 shadow-xs animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {attachedFile.isImage && attachedFile.url ? (
              <img 
                src={attachedFile.url} 
                alt="Upload preview" 
                className="w-10 h-10 rounded-xl object-cover border border-[#E2E8D5]"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#143827] text-white flex items-center justify-center shrink-0">
                <FileText size={20} />
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#143827] truncate">{attachedFile.name}</p>
              <p className="text-[10px] text-[#5E806E]">Ready to send for multimodal AI analysis</p>
            </div>
          </div>

          <button
            onClick={() => setAttachedFile(null)}
            className="p-1 rounded-full hover:bg-rose-100 text-rose-600 transition-colors"
            title="Remove attachment"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Bottom Input Area (Styled like Image 2 with Attachment, Web, Emoji, Mic, Send) */}
      <div className="bg-white border border-[#E2E8D5] rounded-[28px] p-2 sm:p-3 shadow-md flex items-end gap-2 shrink-0">
        
        {/* 1. Attachment Button (📎) */}
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2.5 rounded-full text-[#5E806E] hover:text-[#143827] hover:bg-[#EBF0E4] transition-colors shrink-0"
          title="Attach photo of wound, fracture, X-ray, or medical prescription"
        >
          <Paperclip size={20} />
        </button>

        {/* 2. Web / Offline status icon (🌐) */}
        <button 
          type="button"
          onClick={() => setIsOfflineMode(!isOfflineMode)}
          className={`p-2.5 rounded-full transition-colors shrink-0 ${
            isOfflineMode ? 'text-amber-700 bg-amber-50' : 'text-[#5E806E] hover:text-[#143827] hover:bg-[#EBF0E4]'
          }`}
          title={isOfflineMode ? "Running 100% Offline (Click to switch to Online)" : "Running Online (Click to test Offline Engine)"}
        >
          <Globe size={20} />
        </button>

        {/* 3. Quick First Aid Guide icon (😊 / 📋) */}
        <button 
          type="button"
          onClick={() => setShowQuickGuideModal(true)}
          className="p-2.5 rounded-full text-[#5E806E] hover:text-[#143827] hover:bg-[#EBF0E4] transition-colors shrink-0 hidden sm:flex"
          title="Open Bystander First Aid Matrix"
        >
          <Smile size={20} />
        </button>

        {/* 4. Textarea Input */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex-1 flex items-end relative">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder={isRecording ? "Listening to your voice..." : "Ask anything or describe symptoms (e.g. broken hand, bleeding, burns)..."} 
            className="w-full bg-transparent border-none resize-none max-h-28 min-h-[40px] py-2 focus:outline-none focus:ring-0 text-[#143827] text-xs sm:text-sm placeholder:text-[#5E806E]"
            rows={1}
          />
        </form>

        {/* 5. Voice Input Button */}
        <button 
          type="button"
          onClick={handleVoiceInput}
          className={`p-2.5 rounded-full transition-all shrink-0 ${
            isRecording ? 'bg-rose-100 text-rose-600 animate-pulse' : 'text-[#5E806E] hover:text-[#143827] hover:bg-[#EBF0E4]'
          }`}
          title={isRecording ? "Stop Recording" : "Voice Speech Triage"}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        {/* 6. Send Button (Green Circle with Paper Plane) */}
        <button 
          type="button"
          onClick={() => handleSend()}
          disabled={!input.trim() && !attachedFile}
          className="p-3 bg-[#143827] text-[#C6F052] hover:bg-[#0E2419] disabled:opacity-40 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 shrink-0"
          title="Send message"
        >
          <Send size={16} />
        </button>

      </div>

      <p className="text-center text-[10px] text-[#5E806E] mt-1 font-medium">
        MedRelay AI provides bystander first-aid guidance. In critical emergencies, immediately call <strong>112</strong> / <strong>108</strong>.
      </p>

    </div>
  )
}
