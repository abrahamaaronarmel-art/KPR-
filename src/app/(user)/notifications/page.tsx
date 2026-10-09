"use client"

import { useState, useEffect } from "react"
import { 
  Inbox, Star, Archive, Trash2, Mail, MailOpen, Clock, 
  Search, RefreshCw, CheckSquare, Square, ChevronLeft, 
  ChevronRight, ArrowLeft, Pill, Stethoscope, FlaskConical, 
  Coins, AlertTriangle, ShieldCheck, Check, ShoppingBag, 
  MoreVertical, Paperclip, Send, Bell, Tag
} from "lucide-react"
import Link from "next/link"

interface EmailNotification {
  id: string
  sender: string
  senderEmail: string
  senderAvatar: string
  subject: string
  snippet: string
  body: string
  time: string
  date: string
  read: boolean
  starred: boolean
  category: "medicine" | "doctor" | "lab" | "pharmacy" | "system"
  badgeText: string
  actionUrl?: string
  actionLabel?: string
  medicineDetails?: {
    name: string
    dosage: string
    timing: string
    coins: number
  }
}

export default function NotificationsPage() {
  const [activeFolder, setActiveFolder] = useState<"inbox" | "medicine" | "doctor" | "lab" | "pharmacy" | "starred" | "archive" | "trash">("inbox")
  const [selectedEmail, setSelectedEmail] = useState<EmailNotification | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [medCoins, setMedCoins] = useState(250)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const [notifications, setNotifications] = useState<EmailNotification[]>([
    {
      id: "notif-1",
      sender: "Medication Reminder System",
      senderEmail: "reminders@medrelay.com",
      senderAvatar: "💊",
      subject: "🔔 Scheduled Dose (20:30): Amoxicillin 625mg & Levocetirizine",
      snippet: "It's 20:30. Please take 1 tablet of Amoxicillin 625mg after dinner to maintain antibiotic therapy...",
      body: "Hello Rajesh,\n\nThis is your scheduled in-time medicine alert:\n\n• Medication: Tab. Amoxicillin & Clavulanate 625mg (Augmentin)\n• Schedule: 20:30 (After Food)\n• Purpose: Acute Bacterial Pharyngitis treatment (Day 3 of 5)\n• Prescribed by: Dr. Emily Rodriguez (Villianur PHC)\n\nPlease take this dose with a glass of water. Mark as taken below to log your adherence and claim +10 MedCoins!",
      time: "20:30",
      date: "Today",
      read: false,
      starred: true,
      category: "medicine",
      badgeText: "Medicine Alert",
      actionUrl: "/quick-access",
      actionLabel: "Mark as Taken (+10 🪙)",
      medicineDetails: {
        name: "Amoxicillin & Clavulanate 625mg",
        dosage: "1 Tablet After Dinner",
        timing: "20:30",
        coins: 10
      }
    },
    {
      id: "notif-2",
      sender: "MedRelay Pharmacy Network",
      senderEmail: "orders@medrelay.com",
      senderAvatar: "🪙",
      subject: "🎉 +50 MedCoins Credited! Medicine Order #MR-8921 Dispatched",
      snippet: "Your doorstep delivery containing Paracetamol 650mg & First Aid Kit is out with courier rider. ETA 25 mins...",
      body: "Hello Rajesh,\n\nYour medicine order #MR-8921 has been packed from Villianur Jan Aushadhi Pharmacy and is currently out for delivery!\n\nOrder Summary:\n• Dolo 650 Paracetamol (15 Tabs) - ₹32\n• Emergency First Aid & Burn Dressing Kit - ₹299\n• Total Paid: ₹331\n• Coins Earned: 🪙 50 MedCoins added to your balance!\n\nDelivery Address: No. 14, Main Road, Villianur, Puducherry.\nDelivery Partner: Selvam (+91 98401 23456)",
      time: "16:15",
      date: "Today",
      read: false,
      starred: false,
      category: "pharmacy",
      badgeText: "Pharmacy & Coins",
      actionUrl: "/pharmacy",
      actionLabel: "Track Live Delivery"
    },
    {
      id: "notif-3",
      sender: "Dr. Marcus Chen, MS (Ortho)",
      senderEmail: "marcus.chen@iggh.gov.in",
      senderAvatar: "👨‍⚕️",
      subject: "👨‍⚕️ Clinical Advisory: Right Wrist Fracture Splinting Guidance",
      snippet: "Thank you for the consultation today. Digital X-Ray confirms non-displaced distal radius stress fracture. Follow these guidelines...",
      body: "Dear Rajesh,\n\nFollowing our triage review today at IGGGH:\n\n1. Digital X-Ray confirms a mild hairline stress line on the right distal radius.\n2. Keep your wrist splint firmly tied and completely dry.\n3. Apply cold packs wrapped in a towel for 15 mins twice daily.\n4. Take Paracetamol 650mg only if pain exceeds tolerance.\n\nSchedule a follow-up review after 7 days or report immediately if you notice finger numbness or cold extremities.",
      time: "11:20",
      date: "Today",
      read: true,
      starred: true,
      category: "doctor",
      badgeText: "Doctor Note",
      actionUrl: "/records",
      actionLabel: "View X-Ray Report"
    },
    {
      id: "notif-4",
      sender: "Puducherry Central Diagnostic Lab",
      senderEmail: "reports@health.py.gov.in",
      senderAvatar: "🧪",
      subject: "🧪 Verified Lab Report: Complete Blood Count & Metabolic Panel",
      snippet: "Your blood test sample collected on Oct 8 has been verified by Chief Pathologist Dr. Sarah Jenkins...",
      body: "ABDM Health Information Provider (HIP) Notification:\n\nDiagnostic Report for Patient PT-8891 (Rajesh Kumar):\n• Test: Complete Blood Count (CBC) + Lipid Panel\n• Status: Verified & Normal\n• Performed by: Indira Gandhi Govt General Hospital Central Lab\n• Verified by: Dr. Sarah Jenkins, MD (Pathology)\n\nThis document has been securely stored in your ABHA health locker and is available in your Medical Records tab.",
      time: "09:00 AM",
      date: "Yesterday",
      read: true,
      starred: false,
      category: "lab",
      badgeText: "Lab Report",
      actionUrl: "/records",
      actionLabel: "Open Digital Report"
    },
    {
      id: "notif-5",
      sender: "Ayushman Bharat Digital Mission (NHA)",
      senderEmail: "notifications@abdm.gov.in",
      senderAvatar: "🛡️",
      subject: "🛡️ ABHA Health Locker Synchronization Successful",
      snippet: "Your 14-digit ABHA ID (91-4902-8819-2041) is successfully linked with MedRelay Health System...",
      body: "National Health Authority (NHA) Security Confirmation:\n\nYour ABHA profile is now actively integrated with MedRelay. You have full control over your health data consent managers and can share longitudinal records seamlessly across all government PHCs and specialty hospitals.",
      time: "Oct 7",
      date: "Oct 7",
      read: true,
      starred: false,
      category: "system",
      badgeText: "ABDM Sync",
      actionUrl: "/records",
      actionLabel: "Manage ABHA Consent"
    }
  ])

  useEffect(() => {
    const storedCoins = localStorage.getItem("medrelay.coins")
    if (storedCoins) setMedCoins(parseInt(storedCoins))
  }, [])

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, starred: !n.starred } : n))
  }

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  const markSelectedAsRead = () => {
    setNotifications(prev => prev.map(n => selectedIds.includes(n.id) ? { ...n, read: true } : n))
    setSelectedIds([])
    showToast("Marked as read")
  }

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selectedIds.includes(n.id)))
    setSelectedIds([])
    showToast("Moved to Trash")
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    showToast("All notifications marked as read")
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleOpenEmail = (email: EmailNotification) => {
    setSelectedEmail(email)
    setNotifications(prev => prev.map(n => n.id === email.id ? { ...n, read: true } : n))
  }

  const handleClaimMedicineCoins = (coins: number) => {
    const updated = medCoins + coins
    setMedCoins(updated)
    localStorage.setItem("medrelay.coins", updated.toString())
    showToast(`+${coins} MedCoins Credited! Total: ${updated} Coins`)
  }

  // Filtered Notifications based on folder & search
  const filteredNotifications = notifications.filter(n => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const match = n.subject.toLowerCase().includes(q) || n.sender.toLowerCase().includes(q) || n.snippet.toLowerCase().includes(q)
      if (!match) return false
    }

    if (activeFolder === "inbox") return true
    if (activeFolder === "starred") return n.starred
    if (activeFolder === "medicine") return n.category === "medicine"
    if (activeFolder === "doctor") return n.category === "doctor"
    if (activeFolder === "lab") return n.category === "lab"
    if (activeFolder === "pharmacy") return n.category === "pharmacy"
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="max-w-6xl mx-auto pb-12 text-[#143827]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#143827] text-[#C6F052] px-4 py-2.5 rounded-2xl shadow-xl border border-[#C6F052]/30 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Gmail Container Box */}
      <div className="bg-white border border-[#E2E8D5] rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[680px]">
        
        {/* Left Sidebar (Gmail Style) */}
        <div className="w-full md:w-60 bg-[#F6F8F0] border-r border-[#E2E8D5] p-4 flex flex-col justify-between shrink-0">
          
          <div className="space-y-4">
            
            {/* Header / MedRelay Mail Logo */}
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="w-8 h-8 rounded-xl bg-[#143827] text-[#C6F052] flex items-center justify-center font-bold">
                <Mail size={16} />
              </div>
              <div>
                <h2 className="font-black text-sm text-[#143827]">MedRelay Mail</h2>
                <p className="text-[10px] text-[#5E806E]">Inbox &amp; Reminders</p>
              </div>
            </div>

            {/* Folder Navigation */}
            <nav className="space-y-1 text-xs font-bold">
              <button
                onClick={() => { setActiveFolder("inbox"); setSelectedEmail(null); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  activeFolder === "inbox" 
                    ? "bg-[#143827] text-white shadow-xs" 
                    : "text-[#143827] hover:bg-[#EBF0E4]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Inbox size={15} className={activeFolder === "inbox" ? "text-[#C6F052]" : "text-[#5E806E]"} />
                  <span>Inbox</span>
                </div>
                {unreadCount > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    activeFolder === "inbox" ? "bg-[#C6F052] text-[#143827]" : "bg-[#143827] text-white"
                  }`}>
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setActiveFolder("medicine"); setSelectedEmail(null); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  activeFolder === "medicine" 
                    ? "bg-[#143827] text-white shadow-xs" 
                    : "text-[#143827] hover:bg-[#EBF0E4]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Pill size={15} className={activeFolder === "medicine" ? "text-[#C6F052]" : "text-purple-600"} />
                  <span>Medicine Reminders</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveFolder("pharmacy"); setSelectedEmail(null); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  activeFolder === "pharmacy" 
                    ? "bg-[#143827] text-white shadow-xs" 
                    : "text-[#143827] hover:bg-[#EBF0E4]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={15} className={activeFolder === "pharmacy" ? "text-[#C6F052]" : "text-emerald-600"} />
                  <span>Pharmacy &amp; Orders</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveFolder("doctor"); setSelectedEmail(null); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  activeFolder === "doctor" 
                    ? "bg-[#143827] text-white shadow-xs" 
                    : "text-[#143827] hover:bg-[#EBF0E4]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Stethoscope size={15} className={activeFolder === "doctor" ? "text-[#C6F052]" : "text-blue-600"} />
                  <span>Doctor Notes</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveFolder("lab"); setSelectedEmail(null); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  activeFolder === "lab" 
                    ? "bg-[#143827] text-white shadow-xs" 
                    : "text-[#143827] hover:bg-[#EBF0E4]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FlaskConical size={15} className={activeFolder === "lab" ? "text-[#C6F052]" : "text-amber-600"} />
                  <span>Lab Reports</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveFolder("starred"); setSelectedEmail(null); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  activeFolder === "starred" 
                    ? "bg-[#143827] text-white shadow-xs" 
                    : "text-[#143827] hover:bg-[#EBF0E4]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Star size={15} className={activeFolder === "starred" ? "text-[#C6F052]" : "text-amber-500"} />
                  <span>Starred</span>
                </div>
              </button>
            </nav>

          </div>

          {/* User MedCoins Balance Widget */}
          <div className="bg-white border border-[#E2E8D5] rounded-2xl p-3.5 mt-6 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#143827] mb-1">
              <Coins size={14} className="text-[#143827]" />
              <span>MedCoins Balance</span>
            </div>
            <div className="text-lg font-black text-[#143827]">{medCoins} Coins</div>
            <p className="text-[10px] text-[#5E806E] mt-0.5">Use on Pharmacy for ₹{medCoins} discount</p>
          </div>

        </div>

        {/* Right Main Panel (Gmail Mail List or Detailed Reading Pane) */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          
          {/* Top Search & Action Bar */}
          <div className="p-3 sm:p-4 border-b border-[#E2E8D5] flex items-center justify-between gap-3 bg-white">
            
            {selectedEmail ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="p-2 rounded-full hover:bg-[#EBF0E4] text-[#143827] transition-colors"
                  title="Back to list"
                >
                  <ArrowLeft size={18} />
                </button>
                <span className="text-xs font-bold text-[#5E806E]">Back to {activeFolder}</span>
              </div>
            ) : (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5E806E] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search mail, medicine reminders, alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-full pl-10 pr-4 py-2 text-xs text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827] font-medium"
                />
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center gap-1.5 text-xs">
              {selectedIds.length > 0 && (
                <>
                  <button
                    onClick={markSelectedAsRead}
                    className="p-2 rounded-full hover:bg-[#EBF0E4] text-[#143827]"
                    title="Mark selected as read"
                  >
                    <MailOpen size={16} />
                  </button>
                  <button
                    onClick={deleteSelected}
                    className="p-2 rounded-full hover:bg-rose-50 text-rose-600"
                    title="Delete selected"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}

              <button
                onClick={markAllAsRead}
                className="hidden sm:inline-flex items-center gap-1 bg-[#EBF0E4] hover:bg-[#E2E8D5] text-[#143827] font-bold px-3 py-1.5 rounded-full text-xs transition-colors"
              >
                <Check size={12} />
                <span>Mark all read</span>
              </button>
            </div>

          </div>

          {/* Email View Area */}
          {selectedEmail ? (
            /* DETAILED EMAIL READING PANE (Gmail Style) */
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
              
              {/* Subject Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8D5] pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EBF0E4] text-[#143827] px-2.5 py-0.5 rounded-full border border-[#E2E8D5]">
                    {selectedEmail.badgeText}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#143827] mt-1">
                    {selectedEmail.subject}
                  </h2>
                </div>

                <div className="text-xs text-[#5E806E] font-medium shrink-0">
                  {selectedEmail.date} at {selectedEmail.time}
                </div>
              </div>

              {/* Sender Details */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#143827] text-[#C6F052] flex items-center justify-center text-lg font-bold">
                    {selectedEmail.senderAvatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#143827]">{selectedEmail.sender}</h4>
                    <p className="text-xs text-[#5E806E]">&lt;{selectedEmail.senderEmail}&gt;</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => toggleStar(selectedEmail.id, e)}
                    className="p-2 rounded-full hover:bg-[#EBF0E4]"
                  >
                    <Star size={18} className={selectedEmail.starred ? "fill-amber-400 text-amber-400" : "text-[#5E806E]"} />
                  </button>
                </div>
              </div>

              {/* Medicine Action Card inside email if applicable */}
              {selectedEmail.medicineDetails && (
                <div className="bg-[#F4F6EC] border border-[#E2E8D5] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                      <Pill size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-[#143827]">{selectedEmail.medicineDetails.name}</h5>
                      <p className="text-xs text-[#5E806E]">
                        {selectedEmail.medicineDetails.dosage} • Due at {selectedEmail.medicineDetails.timing}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleClaimMedicineCoins(selectedEmail.medicineDetails!.coins)}
                    className="px-4 py-2 bg-[#143827] text-white rounded-full text-xs font-bold hover:bg-[#0E2419] flex items-center gap-1.5 shadow-xs transition-all shrink-0"
                  >
                    <Check size={14} className="text-[#C6F052]" />
                    <span>Mark as Taken (+{selectedEmail.medicineDetails.coins} 🪙)</span>
                  </button>
                </div>
              )}

              {/* Email Body */}
              <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line bg-[#F6F8F0] p-6 rounded-3xl border border-[#E2E8D5]">
                {selectedEmail.body}
              </div>

              {/* Action Button */}
              {selectedEmail.actionUrl && (
                <div className="pt-2">
                  <Link
                    href={selectedEmail.actionUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#143827] text-white rounded-full text-xs font-bold hover:bg-[#0E2419] shadow-md transition-all"
                  >
                    <span>{selectedEmail.actionLabel || "View Action"}</span>
                    <ArrowLeft size={14} className="rotate-180" />
                  </Link>
                </div>
              )}

            </div>
          ) : (
            /* EMAIL LIST VIEW (Gmail Rows) */
            <div className="flex-1 overflow-y-auto divide-y divide-[#E2E8D5]">
              {filteredNotifications.length === 0 ? (
                <div className="p-16 text-center text-[#5E806E]">
                  <Inbox size={48} className="mx-auto mb-3 opacity-30 text-[#143827]" />
                  <p className="font-bold text-sm text-[#143827]">No notifications in this folder</p>
                  <p className="text-xs text-[#5E806E] mt-1">You're all caught up with your reminders and health alerts!</p>
                </div>
              ) : (
                filteredNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleOpenEmail(notif)}
                    className={`p-3.5 sm:px-4 flex items-center gap-3 cursor-pointer transition-all hover:bg-[#F6F8F0] group ${
                      notif.read ? 'bg-white' : 'bg-[#F4F6EC]/70 font-semibold'
                    }`}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={(e) => toggleSelect(notif.id, e)}
                      className="text-[#5E806E] hover:text-[#143827] p-1"
                    >
                      {selectedIds.includes(notif.id) ? (
                        <CheckSquare size={16} className="text-[#143827]" />
                      ) : (
                        <Square size={16} />
                      )}
                    </button>

                    {/* Star */}
                    <button
                      onClick={(e) => toggleStar(notif.id, e)}
                      className="text-[#5E806E] hover:text-amber-500 p-1"
                    >
                      <Star size={16} className={notif.starred ? "fill-amber-400 text-amber-400" : ""} />
                    </button>

                    {/* Sender & Badge */}
                    <div className="w-36 sm:w-44 truncate shrink-0">
                      <span className={`text-xs ${notif.read ? 'text-slate-700' : 'text-[#143827] font-black'}`}>
                        {notif.sender}
                      </span>
                    </div>

                    {/* Subject & Snippet */}
                    <div className="flex-1 flex items-center gap-2 truncate text-xs">
                      <span className={`truncate ${notif.read ? 'text-slate-700 font-medium' : 'text-[#143827] font-bold'}`}>
                        {notif.subject}
                      </span>
                      <span className="text-[#5E806E] truncate hidden sm:inline text-[11px]">
                        - {notif.snippet}
                      </span>
                    </div>

                    {/* Category Tag Badge */}
                    <span className="hidden md:inline-block text-[10px] font-bold bg-[#EBF0E4] text-[#143827] px-2 py-0.5 rounded-full border border-[#E2E8D5] shrink-0">
                      {notif.badgeText}
                    </span>

                    {/* Date / Time */}
                    <span className={`text-[11px] shrink-0 ${notif.read ? 'text-[#5E806E]' : 'text-[#143827] font-bold'}`}>
                      {notif.time}
                    </span>

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

