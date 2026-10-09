"use client"

import { useState, useEffect } from "react"
import { 
  Calendar as CalendarIcon, Clock, Bell, CheckCircle2, AlertCircle, 
  Pill, HeartPulse, ChevronLeft, ChevronRight, Plus, Sparkles, 
  Check, ArrowRight, ShieldAlert, Phone, FileText, User, ShoppingBag, Coins
} from "lucide-react"
import Link from "next/link"

interface MedicationReminder {
  id: string
  name: string
  dosage: string
  time24: string // 24-hour time format e.g. "07:30", "13:30", "20:30", "22:00"
  foodRelation: "Before Food" | "After Food" | "With Food"
  prescribedBy: string
  taken: boolean
  takenTime24?: string
  coinsEarned: number
}

interface ImportantMessage {
  id: string
  sender: string
  title: string
  snippet: string
  time24: string
  priority: "high" | "normal"
  category: "Doctor Instruction" | "Lab Result" | "ABHA Alert"
  actionUrl?: string
  actionLabel?: string
}

export default function QuickAccessPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date().getDate())
  const [userName, setUserName] = useState("Rajesh Kumar")
  const [medCoins, setMedCoins] = useState(250)
  const [streakDays, setStreakDays] = useState(5)
  const [celebrateCoin, setCelebrateCoin] = useState<string | null>(null)

  // Medication Schedule State (24-Hour Military Time without Morning/Evening labels)
  const [medications, setMedications] = useState<MedicationReminder[]>([
    {
      id: "med-1",
      name: "Cap. Pantoprazole 40mg",
      dosage: "1 Capsule (Pan-40)",
      time24: "07:30",
      foodRelation: "Before Food",
      prescribedBy: "Dr. Emily Rodriguez (PHC)",
      taken: true,
      takenTime24: "07:35",
      coinsEarned: 10
    },
    {
      id: "med-2",
      name: "Tab. Multi-Vitamin & Zinc",
      dosage: "1 Tablet (Becozinc)",
      time24: "08:30",
      foodRelation: "After Food",
      prescribedBy: "Dr. Emily Rodriguez (PHC)",
      taken: true,
      takenTime24: "08:42",
      coinsEarned: 10
    },
    {
      id: "med-3",
      name: "Tab. Paracetamol 650mg",
      dosage: "1 Tablet (Dolo 650)",
      time24: "13:30",
      foodRelation: "After Food",
      prescribedBy: "Dr. Marcus Chen (Ortho)",
      taken: false,
      coinsEarned: 10
    },
    {
      id: "med-4",
      name: "Tab. Amoxicillin & Clavulanate 625mg",
      dosage: "1 Tablet (Augmentin)",
      time24: "20:30",
      foodRelation: "After Food",
      prescribedBy: "Dr. Emily Rodriguez (PHC)",
      taken: false,
      coinsEarned: 10
    },
    {
      id: "med-5",
      name: "Tab. Levocetirizine 5mg",
      dosage: "1 Tablet (At Bedtime)",
      time24: "22:00",
      foodRelation: "After Food",
      prescribedBy: "Dr. Emily Rodriguez (PHC)",
      taken: false,
      coinsEarned: 10
    }
  ])

  // Important Messages (24-Hour Time)
  const [importantMessages, setImportantMessages] = useState<ImportantMessage[]>([
    {
      id: "msg-1",
      sender: "Dr. Marcus Chen, MS (Ortho)",
      title: "Orthopedic Immobilization Reminder",
      snippet: "Keep your splint clean and dry. Avoid weight bearing on your right wrist for 4 more days.",
      time24: "10:30",
      priority: "high",
      category: "Doctor Instruction",
      actionUrl: "/records",
      actionLabel: "View X-Ray & Notes"
    },
    {
      id: "msg-2",
      sender: "Villianur Central Diagnostic Lab",
      title: "Blood Biochemistry Report Verified",
      snippet: "Your Complete Blood Count (CBC) and Lipid Panel are available in your ABHA health records.",
      time24: "08:15",
      priority: "normal",
      category: "Lab Result",
      actionUrl: "/records",
      actionLabel: "Open Lab Report"
    },
    {
      id: "msg-3",
      sender: "MedRelay Pharmacy Network",
      title: "Doorstep Medicine Delivery Dispatched",
      snippet: "Your Jan Aushadhi refill order #MR-8921 is out for delivery. Rider ETA: 25 mins.",
      time24: "09:00",
      priority: "normal",
      category: "ABHA Alert",
      actionUrl: "/pharmacy",
      actionLabel: "Track Delivery"
    }
  ])

  useEffect(() => {
    const storedName = localStorage.getItem("medrelay.user_name") || "Rajesh Kumar"
    setUserName(storedName)
    const storedCoins = localStorage.getItem("medrelay.coins")
    if (storedCoins) setMedCoins(parseInt(storedCoins))
  }, [])

  const handleToggleTaken = (id: string) => {
    setMedications(prev => prev.map(med => {
      if (med.id === id) {
        const newTaken = !med.taken
        if (newTaken) {
          const addedCoins = medCoins + 10
          setMedCoins(addedCoins)
          localStorage.setItem("medrelay.coins", addedCoins.toString())
          setCelebrateCoin(`+10 MedCoins Earned for taking ${med.name.split(' ')[1]}!`)
          setTimeout(() => setCelebrateCoin(null), 3000)
        }
        
        // Format live time in 24-hour format (e.g. 14:35)
        const now = new Date()
        const now24 = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

        return {
          ...med,
          taken: newTaken,
          takenTime24: newTaken ? now24 : undefined
        }
      }
      return med
    }))
  }

  // Mini Calendar Calculations
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const takenCount = medications.filter(m => m.taken).length
  const totalCount = medications.length
  const progressPercent = Math.round((takenCount / totalCount) * 100)

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 text-[#143827]">
      
      {/* Coin Celebration Toast */}
      {celebrateCoin && (
        <div className="fixed top-6 right-6 z-50 bg-[#143827] text-[#C6F052] px-4 py-3 rounded-2xl shadow-2xl border border-[#C6F052]/30 flex items-center gap-2 text-sm font-black animate-in slide-in-from-top-4 duration-300">
          <Coins size={18} className="animate-bounce" />
          <span>{celebrateCoin}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black tracking-tight text-[#143827]">Quick Access Hub</h1>
            <span className="text-xs font-bold bg-[#EBF0E4] text-[#143827] border border-[#E2E8D5] px-3 py-1 rounded-full flex items-center gap-1.5">
              <Clock size={12} /> 24-Hour Time Schedule
            </span>
          </div>
          <p className="text-sm text-[#5E806E] mt-1">
            Track your exact 24-hour medicine timetable, calendar events, and important clinical notifications.
          </p>
        </div>

        {/* MedCoins & Streak Header Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#143827] text-white px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-md">
            <Coins size={18} className="text-[#C6F052]" />
            <div>
              <div className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">Your MedCoins</div>
              <div className="text-sm font-black text-[#C6F052]">{medCoins} Coins (₹{medCoins})</div>
            </div>
          </div>

          <div className="bg-[#EBF0E4] border border-[#E2E8D5] text-[#143827] px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5">
            <span>🔥 {streakDays}-Day Streak</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Small Calendar & Important Messages (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Interactive Small Calendar Widget */}
          <div className="bg-white border border-[#E2E8D5] rounded-3xl p-5 shadow-xs">
            
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#143827] text-[#C6F052] flex items-center justify-center">
                  <CalendarIcon size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#143827]">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h3>
                  <p className="text-[11px] text-[#5E806E]">Today: {new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button 
                  onClick={prevMonth}
                  className="w-7 h-7 rounded-full hover:bg-[#EBF0E4] flex items-center justify-center text-[#143827]"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={nextMonth}
                  className="w-7 h-7 rounded-full hover:bg-[#EBF0E4] flex items-center justify-center text-[#143827]"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Weekday Names */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-[#5E806E] mb-2">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-8" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()
                const isSelected = day === selectedDay

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`h-8 w-8 mx-auto rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all relative ${
                      isSelected 
                        ? 'bg-[#143827] text-[#C6F052] shadow-sm scale-105' 
                        : isToday 
                          ? 'bg-[#EBF0E4] text-[#143827] border border-[#143827]' 
                          : 'text-[#143827] hover:bg-[#F6F8F0]'
                    }`}
                  >
                    <span>{day}</span>
                    {(day === 8 || day === 9 || day === 12 || day === 15) && (
                      <span className={`w-1 h-1 rounded-full -mt-0.5 ${isSelected ? 'bg-[#C6F052]' : 'bg-emerald-600'}`} />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Day Schedule Summary Card */}
            <div className="mt-4 pt-3 border-t border-[#E2E8D5] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#5E806E]">
                <Clock size={13} />
                <span>Selected: <strong>{selectedDay} {monthNames[currentDate.getMonth()]}</strong></span>
              </div>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                5 Doses Scheduled
              </span>
            </div>

          </div>

          {/* 2. Important Messages Section */}
          <div className="bg-white border border-[#E2E8D5] rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#143827] flex items-center gap-2">
                <Bell size={16} className="text-[#143827]" />
                <span>Important Messages</span>
              </h3>
              <Link href="/notifications" className="text-xs font-bold text-[#5E806E] hover:text-[#143827]">
                View All →
              </Link>
            </div>

            <div className="space-y-2.5">
              {importantMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-3.5 rounded-2xl border transition-all ${
                    msg.priority === 'high' 
                      ? 'bg-amber-50/70 border-amber-200' 
                      : 'bg-[#F6F8F0] border-[#E2E8D5]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E806E]">
                      {msg.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#143827] bg-white px-2 py-0.5 rounded border border-[#E2E8D5]">
                      {msg.time24}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-[#143827]">{msg.title}</h4>
                  <p className="text-[11px] text-[#5E806E] mt-0.5 line-clamp-2">{msg.snippet}</p>

                  <div className="mt-2.5 flex items-center justify-between text-[11px]">
                    <span className="text-[10px] font-semibold text-slate-500">From: {msg.sender}</span>
                    {msg.actionUrl && (
                      <Link 
                        href={msg.actionUrl}
                        className="font-bold text-[#143827] hover:underline flex items-center gap-1 text-[11px]"
                      >
                        <span>{msg.actionLabel}</span>
                        <ArrowRight size={10} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Medicine 24-Hour Reminders & Tracker (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Adherence Progress Banner */}
          <div className="bg-gradient-to-tr from-[#143827] to-[#1E4835] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#C6F052] uppercase tracking-wider">
                  24-Hour Medication Adherence
                </span>
                <h2 className="text-2xl font-black text-white">
                  {takenCount} of {totalCount} Doses Completed
                </h2>
                <p className="text-xs text-white/70">
                  Earn +10 MedCoins for each medicine taken on time. Keep up your daily streak!
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center shrink-0 border border-white/15">
                <div className="text-2xl font-black text-[#C6F052]">{progressPercent}%</div>
                <div className="text-[10px] text-white/70 font-semibold uppercase">Daily Score</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 h-2.5 rounded-full mt-4 overflow-hidden">
              <div 
                className="bg-[#C6F052] h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Medicine List with Clean 24-Hour Badges */}
          <div className="bg-white border border-[#E2E8D5] rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8D5] pb-3">
              <div className="flex items-center gap-2">
                <Pill size={18} className="text-[#143827]" />
                <h3 className="font-bold text-base text-[#143827]">Today's Medicine Schedule (24-Hour Time)</h3>
              </div>
              <Link 
                href="/pharmacy"
                className="text-xs font-bold text-[#143827] bg-[#EBF0E4] hover:bg-[#E2E8D5] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
              >
                <ShoppingBag size={12} />
                <span>Refill in Pharmacy</span>
              </Link>
            </div>

            <div className="space-y-3">
              {medications.map((med) => (
                <div 
                  key={med.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    med.taken 
                      ? 'bg-[#F4F6EC] border-[#E2E8D5] opacity-90' 
                      : 'bg-white border-[#E2E8D5] hover:border-[#143827] shadow-xs'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    
                    {/* Clean 24-Hour Time Badge (No Morning/Evening words) */}
                    <div className={`w-14 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 text-center font-black shadow-xs ${
                      med.taken 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-[#143827] text-[#C6F052]'
                    }`}>
                      <span className="text-sm font-mono tracking-tight leading-none">{med.time24}</span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold opacity-70 mt-0.5">HRS</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-[#143827]">{med.name}</h4>
                        <span className="text-[10px] font-bold text-[#5E806E] bg-[#EBF0E4] px-2 py-0.5 rounded-md">
                          {med.foodRelation}
                        </span>
                      </div>
                      <p className="text-xs text-[#5E806E] mt-0.5">{med.dosage} • Prescribed by {med.prescribedBy}</p>
                      
                      {med.taken && (
                        <p className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                          <Check size={12} /> Taken at {med.takenTime24} (+10 MedCoins)
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Mark as Taken Button */}
                  <button
                    onClick={() => handleToggleTaken(med.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 ${
                      med.taken 
                        ? 'bg-emerald-700 text-white shadow-xs' 
                        : 'bg-[#143827] text-white hover:bg-[#0E2419] shadow-md hover:scale-105 active:scale-95'
                    }`}
                  >
                    {med.taken ? (
                      <>
                        <CheckCircle2 size={14} className="text-[#C6F052]" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Clock size={14} />
                        <span>Take Medicine (+10 🪙)</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Action Shortcuts */}
            <div className="pt-4 border-t border-[#E2E8D5] grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-center font-bold">
              <Link 
                href="/ai"
                className="p-3 rounded-2xl bg-[#EBF0E4] hover:bg-[#E2E8D5] text-[#143827] flex flex-col items-center gap-1.5 transition-colors"
              >
                <Sparkles size={16} />
                <span>AI Symptom Triage</span>
              </Link>
              <Link 
                href="/emergency"
                className="p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 flex flex-col items-center gap-1.5 transition-colors"
              >
                <ShieldAlert size={16} />
                <span>1-Tap SOS (108)</span>
              </Link>
              <Link 
                href="/records"
                className="p-3 rounded-2xl bg-[#EBF0E4] hover:bg-[#E2E8D5] text-[#143827] flex flex-col items-center gap-1.5 transition-colors"
              >
                <FileText size={16} />
                <span>View Prescriptions</span>
              </Link>
              <Link 
                href="/pharmacy"
                className="p-3 rounded-2xl bg-[#EBF0E4] hover:bg-[#E2E8D5] text-[#143827] flex flex-col items-center gap-1.5 transition-colors"
              >
                <ShoppingBag size={16} />
                <span>Order Medicine</span>
              </Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
