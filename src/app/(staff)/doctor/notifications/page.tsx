"use client"

import { useState } from "react"
import { 
  Mail, Inbox, Star, Send, Trash2, Search, Filter, 
  Clock, Paperclip, AlertCircle, CheckCircle2, ChevronRight, 
  Sparkles, RefreshCw, Archive, Tag, Plus, X, User, ShieldAlert
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface DoctorEmail {
  id: string
  sender: string
  email: string
  subject: string
  preview: string
  body: string
  time24: string
  date: string
  starred: boolean
  unread: boolean
  folder: "inbox" | "starred" | "sent" | "reminders" | "alerts"
  hasAttachment?: boolean
  tag?: string
}

export default function DoctorNotificationsPage() {
  const [activeFolder, setActiveFolder] = useState<"inbox" | "starred" | "sent" | "reminders" | "alerts">("inbox")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmail, setSelectedEmail] = useState<DoctorEmail | null>(null)
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Compose Form
  const [composeTo, setComposeTo] = useState("")
  const [composeSubject, setComposeSubject] = useState("")
  const [composeBody, setComposeBody] = useState("")

  const [emails, setEmails] = useState<DoctorEmail[]>([
    {
      id: "mail-1",
      sender: "Puducherry DHS Emergency Gateway",
      email: "emergency-108@dhs.py.gov.in",
      subject: "🚨 Critical Inbound 108 Emergency: Murugan Swamy (PT-9102)",
      preview: "ECG confirms acute anterior wall STEMI. Patient dispatched via 108 Ambulance Unit 04 with Cath Lab standby request...",
      body: `Dear Dr. Marcus Chen,

An emergency 108 relay ambulance is en route to Indira Gandhi Govt General Hospital with patient Murugan Swamy (58Y, Male, UHID PT-9102).

Clinical Findings:
- Severe crushing chest pain radiating to left shoulder and jaw
- Vitals: BP 155/98 mmHg, Pulse 108 bpm, SpO2 94% on room air
- 12-Lead ECG: Marked ST elevation in leads V1-V4, reciprocal ST depression in II, III, aVF
- Stat medications administered: Aspirin 300mg, Clopidogrel 300mg, Atorvastatin 80mg

ETA at Emergency Trauma Bay: 14:15 HRS. Please have Primary PCI and Cath Lab team on standby.

Emergency Command Centre
Directorate of Health & Family Welfare Services, Puducherry`,
      time24: "14:15",
      date: "09 Oct 2026",
      starred: true,
      unread: true,
      folder: "inbox",
      hasAttachment: true,
      tag: "Emergency Alert"
    },
    {
      id: "mail-2",
      sender: "Automated Medication Reminder Gateway",
      email: "med-alerts@medrelay.hospital.gov.in",
      subject: "Medication Compliance Log: Rajesh Kumar (PT-8891) - 08:30 HRS Dose",
      preview: "Patient logged morning dose of Cefuroxime 500mg and Aceclofenac successfully. Adherence rating 100%...",
      body: `Dear Doctor,

Patient Rajesh Kumar (PT-8891) has confirmed taking their prescribed 08:30 HRS medication dose:
- Cefuroxime Axetil 500mg (1 tablet) — Taken with meal
- Aceclofenac 100mg + Paracetamol 325mg (1 tablet) — Taken with meal

Patient reports pain score 2/10 at immobilized wrist. Next scheduled dose: 20:30 HRS.

MedRelay Medication Adherence Engine`,
      time24: "08:35",
      date: "09 Oct 2026",
      starred: false,
      unread: false,
      folder: "reminders",
      hasAttachment: false,
      tag: "Med Reminder"
    },
    {
      id: "mail-3",
      sender: "Dr. Sarah Jenkins (Chief Medical Officer)",
      email: "cmo@iggh.py.gov.in",
      subject: "Hospital ICU & General Bed Allocation Review - Shift 08:00 - 16:00 HRS",
      preview: "Please review the updated bed occupancy matrix for 3rd Floor Inpatient Ward A & B. 2 ICU transfers scheduled...",
      body: `Hi Marcus,

Please find the updated floor occupancy breakdown for today:
- 1st Floor ICU: 18/20 Beds Occupied (2 Isolation units available)
- 3rd Floor Inpatient Ward A (Rooms A1-A8): 6/8 Beds filled
- 3rd Floor Inpatient Ward B (Rooms B1-B8): 7/8 Beds filled

Please conduct rounds at 11:30 HRS to review discharge suitability for Ward B patients.

Regards,
Dr. Sarah Jenkins, MD
CMO, IGGGH`,
      time24: "07:45",
      date: "09 Oct 2026",
      starred: true,
      unread: false,
      folder: "inbox",
      hasAttachment: true,
      tag: "Hospital Admin"
    },
    {
      id: "mail-4",
      sender: "Central Diagnostic Lab (IGGGH)",
      email: "lab-diagnostics@iggh.py.gov.in",
      subject: "Lab Test Reports Ready: Priya Sundaram (PT-4421) - Serum Electrolytes",
      preview: "Biochemical analysis complete. Sodium 138 mEq/L, Potassium 4.2 mEq/L, Serum Creatinine 0.9 mg/dL...",
      body: `Dear Dr. Marcus Chen,

The laboratory diagnostic panel for Priya Sundaram (PT-4421) is completed:
- Fasting Blood Sugar: 94 mg/dL (Normal)
- Serum Sodium: 138 mEq/L (Normal)
- Serum Potassium: 4.2 mEq/L (Normal)
- Serum Creatinine: 0.9 mg/dL (Normal)
- Complete Blood Count: Hb 13.2 g/dL, WBC 7,400 /mcL

Report is attached as FHIR-compliant PDF.

Central Clinical Laboratory, IGGGH Puducherry`,
      time24: "10:50",
      date: "09 Oct 2026",
      starred: false,
      unread: false,
      folder: "inbox",
      hasAttachment: true,
      tag: "Lab Report"
    }
  ])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEmails(prev => prev.map(m => m.id === id ? { ...m, starred: !m.starred } : m))
  }

  const handleSendCompose = (e: React.FormEvent) => {
    e.preventDefault()
    showToast(`✅ Message sent to ${composeTo}`)
    setIsComposeOpen(false)
    setComposeTo("")
    setComposeSubject("")
    setComposeBody("")
  }

  const filteredEmails = emails.filter(m => {
    const matchesSearch = m.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.preview.toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchesSearch) return false

    if (activeFolder === "starred") return m.starred
    if (activeFolder === "reminders") return m.folder === "reminders" || m.tag === "Med Reminder"
    if (activeFolder === "alerts") return m.tag === "Emergency Alert"
    return true
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 text-[#143827]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#143827] text-[#C6F052] px-5 py-3 rounded-2xl shadow-xl border border-[#C6F052]/30 text-xs font-bold animate-in fade-in flex items-center gap-2">
          <Sparkles size={16} className="text-[#C6F052]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Compose Email Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-[#E2E8D5] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8D5] pb-3">
              <h3 className="font-black text-lg text-[#143827] flex items-center gap-2">
                <Mail size={18} className="text-emerald-700" />
                <span>Compose Clinical Notification</span>
              </h3>
              <button 
                onClick={() => setIsComposeOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#F6F8F0] text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSendCompose} className="space-y-4 text-xs font-bold">
              <div>
                <label className="text-[#5E806E] uppercase block mb-1">To (Patient / Hospital Staff Email)</label>
                <input
                  type="text"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  placeholder="patient@medrelay.com or cmo@iggh.py.gov.in"
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827]"
                  required
                />
              </div>

              <div>
                <label className="text-[#5E806E] uppercase block mb-1">Subject</label>
                <input
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  placeholder="e.g. Medicine Timing Reminder / Clinical Test Review"
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827]"
                  required
                />
              </div>

              <div>
                <label className="text-[#5E806E] uppercase block mb-1">Message Content</label>
                <textarea
                  rows={5}
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827] font-medium"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsComposeOpen(false)}
                  className="rounded-full border-[#E2E8D5] text-[#143827]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#143827] hover:bg-[#0E2419] text-[#C6F052] rounded-full px-5 flex items-center gap-2"
                >
                  <Send size={14} />
                  <span>Send Notification</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Gmail-Style Container */}
      <div className="bg-white border border-[#E2E8D5] rounded-[32px] overflow-hidden shadow-xs flex flex-col md:flex-row min-h-[640px]">
        
        {/* Left Gmail Sidebar */}
        <div className="w-full md:w-64 bg-[#F6F8F0] border-r border-[#E2E8D5] p-4 flex flex-col justify-between">
          <div className="space-y-3">
            
            {/* Compose Button */}
            <Button
              onClick={() => setIsComposeOpen(true)}
              className="w-full bg-[#143827] hover:bg-[#0E2419] text-[#C6F052] rounded-2xl py-3 font-black text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus size={16} />
              <span>Compose</span>
            </Button>

            {/* Folder Navigation */}
            <nav className="space-y-1 pt-2 text-xs font-bold">
              <button
                onClick={() => { setActiveFolder("inbox"); setSelectedEmail(null); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeFolder === "inbox" ? "bg-[#143827] text-white" : "text-[#5E806E] hover:bg-[#E2E8D5]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Inbox size={16} className={activeFolder === "inbox" ? "text-[#C6F052]" : "text-[#5E806E]"} />
                  <span>Inbox</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">{emails.length}</span>
              </button>

              <button
                onClick={() => { setActiveFolder("starred"); setSelectedEmail(null); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeFolder === "starred" ? "bg-[#143827] text-white" : "text-[#5E806E] hover:bg-[#E2E8D5]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Star size={16} className={activeFolder === "starred" ? "text-[#C6F052]" : "text-[#5E806E]"} />
                  <span>Starred</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                  {emails.filter(e => e.starred).length}
                </span>
              </button>

              <button
                onClick={() => { setActiveFolder("reminders"); setSelectedEmail(null); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeFolder === "reminders" ? "bg-[#143827] text-white" : "text-[#5E806E] hover:bg-[#E2E8D5]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className={activeFolder === "reminders" ? "text-[#C6F052]" : "text-[#5E806E]"} />
                  <span>Medicine Reminders</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveFolder("alerts"); setSelectedEmail(null); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeFolder === "alerts" ? "bg-rose-700 text-white" : "text-[#5E806E] hover:bg-rose-100 hover:text-rose-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldAlert size={16} className={activeFolder === "alerts" ? "text-white" : "text-rose-600"} />
                  <span>108 Emergency Alerts</span>
                </div>
              </button>
            </nav>

          </div>

          <div className="text-[11px] text-[#5E806E] pt-4 border-t border-[#E2E8D5] flex items-center justify-between">
            <span>Server: 24h Node Live</span>
            <span className="font-mono font-bold text-[#143827]">GMAIL PROTOCOL</span>
          </div>
        </div>

        {/* Right Gmail Main Email Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Search & Toolbar */}
          <div className="p-4 border-b border-[#E2E8D5] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search mail, sender, or clinical subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#F6F8F0] border border-[#E2E8D5] rounded-full text-xs font-bold text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast("Inbox refreshed")}
                className="rounded-full text-xs font-bold border-[#E2E8D5] text-[#143827]"
              >
                <RefreshCw size={13} className="mr-1" />
                <span>Refresh</span>
              </Button>
            </div>
          </div>

          {/* Email View or List */}
          {selectedEmail ? (
            /* Reading Email Full View */
            <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto bg-white animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#E2E8D5] pb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedEmail(null)}
                  className="rounded-full text-xs font-bold border-[#E2E8D5] text-[#143827]"
                >
                  ← Back to Inbox
                </Button>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => toggleStar(selectedEmail.id, e)}
                    className="p-2 rounded-full hover:bg-[#F6F8F0]"
                  >
                    <Star size={18} className={selectedEmail.starred ? "text-amber-500 fill-amber-500" : "text-slate-400"} />
                  </button>
                  <button 
                    onClick={() => {
                      setEmails(prev => prev.filter(m => m.id !== selectedEmail.id))
                      setSelectedEmail(null)
                      showToast("Email deleted")
                    }}
                    className="p-2 rounded-full hover:bg-rose-50 text-rose-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Subject & Sender */}
              <div className="space-y-3">
                <h2 className="text-xl font-black text-[#143827]">{selectedEmail.subject}</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#143827] text-[#C6F052] font-black text-sm flex items-center justify-center">
                      {selectedEmail.sender.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#143827]">{selectedEmail.sender}</div>
                      <div className="text-xs text-[#5E806E] font-mono">{selectedEmail.email}</div>
                    </div>
                  </div>

                  <div className="text-right text-xs font-mono font-bold text-[#5E806E]">
                    <div>{selectedEmail.time24} HRS</div>
                    <div className="text-[10px]">{selectedEmail.date}</div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 bg-[#F6F8F0] border border-[#E2E8D5] rounded-3xl text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                {selectedEmail.body}
              </div>

              {/* Quick Reply Box */}
              <div className="pt-2 flex gap-3">
                <Button
                  onClick={() => {
                    setComposeTo(selectedEmail.email)
                    setComposeSubject(`Re: ${selectedEmail.subject}`)
                    setIsComposeOpen(true)
                  }}
                  className="bg-[#143827] hover:bg-[#0E2419] text-[#C6F052] rounded-full text-xs font-bold px-5"
                >
                  <Send size={13} className="mr-1.5" />
                  <span>Reply</span>
                </Button>
              </div>

            </div>
          ) : (
            /* Email List (Gmail Style) */
            <div className="flex-1 overflow-y-auto divide-y divide-[#E2E8D5]">
              {filteredEmails.length === 0 ? (
                <div className="p-16 text-center text-[#5E806E]">
                  <Mail size={40} className="mx-auto mb-3 opacity-30 text-[#143827]" />
                  <p className="font-bold text-sm">No messages in this folder.</p>
                </div>
              ) : (
                filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className={`p-4 sm:px-6 flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                      email.unread ? "bg-white font-bold" : "bg-[#F6F8F0]/40 hover:bg-[#F6F8F0]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Star button */}
                      <button
                        onClick={(e) => toggleStar(email.id, e)}
                        className="text-slate-400 hover:text-amber-500 shrink-0"
                      >
                        <Star size={16} className={email.starred ? "text-amber-500 fill-amber-500" : ""} />
                      </button>

                      {/* Sender */}
                      <span className="text-xs font-black text-[#143827] w-36 sm:w-48 truncate shrink-0">
                        {email.sender}
                      </span>

                      {/* Subject & Preview */}
                      <div className="text-xs truncate min-w-0">
                        <span className="text-[#143827] font-bold">{email.subject}</span>
                        <span className="text-[#5E806E] ml-2 font-normal hidden sm:inline truncate">
                          — {email.preview}
                        </span>
                      </div>
                    </div>

                    {/* Timestamp & Attachment */}
                    <div className="flex items-center gap-2 shrink-0 text-right">
                      {email.hasAttachment && (
                        <Paperclip size={14} className="text-slate-400" />
                      )}
                      <span className="text-[11px] font-mono font-bold text-[#143827]">
                        {email.time24} HRS
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  )
}

