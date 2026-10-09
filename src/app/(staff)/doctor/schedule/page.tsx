"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, Clock, Video, Phone, CheckCircle2, ChevronLeft, ChevronRight, Settings, Sparkles, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DoctorSchedule() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState(9)
  const [isAvailable, setIsAvailable] = useState(true)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const schedule = [
    { time24: "09:00", type: "Video Teleconsult", patient: "Rajesh Kumar (PT-8891)", duration: "30 min", status: "Completed", isCurrent: false },
    { time24: "10:30", type: "Audio Triage Call", patient: "Priya Sundaram (PT-4421)", duration: "15 min", status: "Upcoming", isCurrent: true },
    { time24: "11:00", type: "Video Teleconsult", patient: "Murugan Swamy (PT-9102)", duration: "45 min", status: "Upcoming", isCurrent: false },
    { time24: "13:00", type: "Post-Op Follow-up", patient: "Kavitha Ranganathan (PT-2091)", duration: "20 min", status: "Upcoming", isCurrent: false },
    { time24: "15:30", type: "Video Teleconsult", patient: "Anand Govindarajan (PT-5512)", duration: "30 min", status: "Upcoming", isCurrent: false },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 text-[#143827]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#143827] text-[#C6F052] px-5 py-3 rounded-2xl shadow-xl border border-[#C6F052]/30 text-xs font-bold animate-in fade-in flex items-center gap-2">
          <Sparkles size={16} className="text-[#C6F052]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#143827]">My Clinical Schedule</h1>
          <p className="text-xs text-[#5E806E] font-medium mt-1">
            24-hour duty roster, teleconsult queue, and OPD slots at Indira Gandhi Govt General Hospital
          </p>
        </div>
        <Button 
          onClick={() => showToast("Duty shift configured: 08:00 to 16:00 HRS Active")}
          className="bg-[#143827] hover:bg-[#0E2419] text-[#C6F052] rounded-full text-xs font-bold px-4 py-2 flex items-center gap-1.5 shadow-md shadow-[#143827]/15"
        >
          <Settings className="w-4 h-4" />
          <span>Configure 24h Duty Shift</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Calendar UI */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-[#E2E8D5] rounded-[32px] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8D5] pb-3">
              <h3 className="font-black text-[#143827] flex items-center gap-2 text-sm">
                <CalendarIcon size={16} className="text-emerald-700"/>
                <span>October 2026</span>
              </h3>
              <div className="flex items-center gap-1 text-[#143827]">
                <button 
                  onClick={() => showToast("Navigating to previous month")}
                  className="p-1 rounded-full hover:bg-[#F6F8F0]"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => showToast("Navigating to next month")}
                  className="p-1 rounded-full hover:bg-[#F6F8F0]"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Mini Calendar */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#5E806E]">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(d => (
                <button 
                  key={d} 
                  onClick={() => {
                    setSelectedDay(d)
                    showToast(`Selected date: Oct ${d}, 2026`)
                  }}
                  className={`p-2 rounded-xl font-bold transition-all ${selectedDay === d ? "bg-[#143827] text-[#C6F052]" : "text-[#5E806E] hover:bg-[#F6F8F0]"}`}
                >
                  {d}
                </button>
              ))}
              
              <button 
                onClick={() => {
                  setSelectedDay(9)
                  showToast("Selected date: Oct 9, 2026 (Today)")
                }}
                className="p-2 bg-[#143827] text-[#C6F052] font-black rounded-xl shadow-xs"
              >
                9
              </button>
              
              {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(d => (
                <button 
                  key={d} 
                  onClick={() => {
                    setSelectedDay(d)
                    showToast(`Selected date: Oct ${d}, 2026`)
                  }}
                  className={`p-2 rounded-xl font-bold transition-all ${selectedDay === d ? "bg-[#143827] text-[#C6F052]" : "text-slate-600 hover:bg-[#F6F8F0]"}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#143827] text-white rounded-[32px] p-6 shadow-md border border-[#C6F052]/30 space-y-3">
            <h3 className="font-black text-lg text-white">Consultation Status</h3>
            <p className="text-white/80 text-xs">
              You are currently active on the Puducherry HIS Teleconsultation &amp; OPD network.
            </p>
            <div className="flex gap-2.5 pt-2">
              <Button 
                onClick={() => {
                  setIsAvailable(true)
                  showToast("✅ Doctor status set to Available & Accepting Patients")
                }}
                className={`flex-1 rounded-full text-xs font-bold ${isAvailable ? "bg-[#C6F052] text-[#143827] hover:bg-[#b0dc3d]" : "bg-white/20 text-white"}`}
              >
                Available (24h)
              </Button>
              <Button 
                onClick={() => {
                  setIsAvailable(false)
                  showToast("Doctor status set to In-Surgery / Busy")
                }}
                className={`flex-1 rounded-full text-xs font-bold ${!isAvailable ? "bg-rose-500 text-white" : "bg-white/20 text-white"}`}
              >
                In-Surgery / Busy
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#E2E8D5] rounded-[32px] p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#E2E8D5] pb-4">
              <div>
                <h2 className="text-lg font-black text-[#143827]">Today's 24-Hour Appointments</h2>
                <p className="text-xs text-[#5E806E]">5 Scheduled consultations for Oct 9, 2026</p>
              </div>
              <span className="text-xs font-bold bg-[#F4F6EC] text-[#143827] px-3 py-1 rounded-full border border-[#E2E8D5]">
                5 Total
              </span>
            </div>

            <div className="space-y-4">
              {schedule.map((slot, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-2xl border transition-all ${
                    slot.isCurrent 
                      ? "bg-[#F4F6EC] border-[#143827] shadow-xs ring-1 ring-[#143827]" 
                      : "bg-white border-[#E2E8D5] hover:bg-[#F6F8F0]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-[#143827] flex items-center gap-1.5">
                        <Clock size={14} className="text-emerald-700" />
                        <span>{slot.time24} HRS</span>
                      </span>
                      <span className="text-[11px] font-bold text-[#5E806E] bg-white px-2.5 py-0.5 rounded-full border border-[#E2E8D5]">
                        {slot.duration}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block ${
                      slot.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {slot.status}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-black text-base text-[#143827]">{slot.patient}</div>
                      <div className="flex items-center gap-2 text-xs text-[#5E806E] font-medium mt-0.5">
                        {slot.type.includes('Video') ? <Video size={13} className="text-blue-600"/> : <Phone size={13} className="text-emerald-700"/>}
                        <span>{slot.type}</span>
                      </div>
                    </div>

                    {slot.isCurrent && (
                      <Button 
                        onClick={() => showToast(`Connecting live to consultation with ${slot.patient}...`)}
                        className="bg-[#143827] hover:bg-[#0E2419] text-[#C6F052] rounded-full text-xs font-bold px-5 h-9 shadow-sm"
                      >
                        <Video size={13} className="mr-1.5" />
                        <span>Join Live Call</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}
