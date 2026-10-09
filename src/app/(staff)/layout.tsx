"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Zap, CalendarClock, Bell, FileText, 
  BedDouble, User, Settings, LogOut, HeartPulse, 
  Menu, X
} from "lucide-react"
import { OfflineBanner } from "@/components/layout/offline-banner"

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [doctorName, setDoctorName] = useState("Dr. Marcus Chen, MS (Ortho)")

  useEffect(() => {
    setMobileMenuOpen(false)
    const stored = localStorage.getItem("medrelay.doctor_profile")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed.name) setDoctorName(parsed.name)
      } catch (e) {
        // fallback
      }
    } else {
      const storedName = localStorage.getItem("medrelay.doctor_name")
      if (storedName) setDoctorName(storedName)
    }
  }, [pathname])

  // Exact requested order:
  // 1. Quick Access
  // 2. My Schedule
  // 3. Notification
  // 4. Patient Records
  // 5. Hospital Beds & ICU
  // 6. Doctor Profile
  // 7. Settings
  // 8. Logout
  const navItems = [
    { name: "Quick Access", href: "/doctor", icon: Zap },
    { name: "My Schedule", href: "/doctor/schedule", icon: CalendarClock },
    { name: "Notification", href: "/doctor/notifications", icon: Bell },
    { name: "Patient Records", href: "/doctor/records", icon: FileText },
    { name: "Hospital Beds & ICU", href: "/doctor/beds", icon: BedDouble },
    { name: "Doctor Profile", href: "/doctor/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const renderNavLinks = () => (
    <nav className="space-y-1.5 px-3">
      {navItems.map((item, idx) => {
        const isActive = pathname === item.href || (item.href === "/doctor" && pathname === "/doctor")
        const Icon = item.icon
        return (
          <Link
            key={idx}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-200 ${
              isActive
                ? "bg-[#143827] text-white font-bold shadow-md shadow-[#143827]/15"
                : "text-[#5E806E] hover:bg-[#EBF0E4] hover:text-[#143827] font-semibold"
            }`}
          >
            <Icon
              size={18}
              className={isActive ? "text-[#C6F052]" : "text-[#5E806E]"}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className="text-sm">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F8F0]">
      {/* Staff Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex-1 max-w-xs w-full bg-[#F6F8F0] text-[#143827] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200 border-r border-[#E2E8D5]">
            <div className="h-20 flex items-center justify-between px-6 border-b border-[#E2E8D5]">
              <Link href="/doctor" className="flex items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-9 h-9 rounded-2xl bg-[#143827] text-[#C6F052] flex items-center justify-center shadow-xs">
                  <HeartPulse size={20} />
                </div>
                <span className="text-xl font-black tracking-tight text-[#143827] uppercase">
                  Med<span className="text-[#5E806E]">Relay</span>
                </span>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-[#E2E8D5] text-[#143827]"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto py-6">
              {renderNavLinks()}
            </div>
            <div className="p-4 border-t border-[#E2E8D5]">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-full text-rose-700 hover:bg-rose-50 font-bold transition-all duration-200">
                <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
                  <LogOut size={13} />
                </div>
                <span className="text-sm">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Staff Desktop VIORA Sidebar */}
      <aside className="w-64 bg-[#F6F8F0] border-r border-[#E2E8D5] hidden md:flex flex-col">
        {/* Top brand: ONLY MedRelay */}
        <div className="h-20 flex items-center px-6 border-b border-[#E2E8D5]">
          <Link href="/doctor" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#143827] text-[#C6F052] flex items-center justify-center shadow-xs">
              <HeartPulse size={20} />
            </div>
            <span className="text-xl font-black tracking-tight text-[#143827] uppercase">
              Med<span className="text-[#5E806E]">Relay</span>
            </span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto py-6 px-4 flex flex-col justify-between">
          <div>
            <div className="px-4 text-[11px] font-bold text-[#5E806E] uppercase tracking-wider mb-3">Doctor Workspace</div>
            {renderNavLinks()}
          </div>

          {/* Logout Button */}
          <div className="pt-6 border-t border-[#E2E8D5] mt-6">
            <Link
              href="/login"
              className="flex items-center gap-3 px-4 py-2.5 rounded-full text-rose-700 hover:bg-rose-50 font-bold transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
                <LogOut size={13} />
              </div>
              <span className="text-sm">Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden bg-[#F6F8F0]">
        <OfflineBanner />
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-[#E2E8D5] flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10 shadow-xs">
          {/* Left Facility & Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-[#143827] hover:bg-[#F6F8F0] border border-[#E2E8D5] md:hidden cursor-pointer"
              aria-label="Open staff menu"
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100 hidden sm:block animate-pulse" />
              <div>
                <div className="text-sm font-black text-[#143827] tracking-tight flex items-center gap-2">
                  <span>Indira Gandhi Govt General Hospital</span>
                  <span className="hidden lg:inline-block bg-[#143827] text-[#C6F052] text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold">
                    NODE PY-IGGGH • 24H LIVE
                  </span>
                </div>
                <div className="text-[11px] text-[#5E806E] font-medium hidden sm:block">
                  Doctor Clinical Decision &amp; Emergency Command System
                </div>
              </div>
            </div>
          </div>

          {/* Right User & Shift Status */}
          <div className="flex items-center gap-3.5">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-black text-[#143827]">
                {doctorName}
              </div>
              <div className="text-[10px] text-[#5E806E] font-mono font-bold flex items-center justify-end gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                <span>Duty Shift: 08:00 - 16:00 HRS</span>
              </div>
            </div>
            <Link 
              href="/doctor/profile" 
              className="w-10 h-10 rounded-2xl bg-[#143827] text-[#C6F052] flex justify-center items-center font-bold text-sm shadow-xs hover:scale-105 transition-transform"
              title="View Doctor Profile"
            >
              <User size={18} />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
