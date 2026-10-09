"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { OfflineBanner } from "@/components/layout/offline-banner"
import { ConsentBanner } from "@/components/layout/consent-banner"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { 
  Bell, User, Globe, KeyRound, Copy, Check, ShieldAlert, Menu, X, 
  Sparkles, LayoutDashboard, Stethoscope, AlertTriangle, FileText, 
  CalendarClock, ShoppingBag, LogOut, Settings, HeartPulse, Search, Zap, Coins
} from "lucide-react"
import { useLanguage, LANGUAGES } from "@/lib/i18n"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { lang, setLang, t } = useLanguage()
  const pathname = usePathname()
  const [patientCode, setPatientCode] = useState("PT-8891")
  const [userName, setUserName] = useState("Rajesh Kumar")
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [medCoins, setMedCoins] = useState(250)

  useEffect(() => {
    const code = localStorage.getItem("medrelay.user_unique_code") || "PT-8891"
    setPatientCode(code)
    const storedName = localStorage.getItem("medrelay.user_name") || "Rajesh Kumar"
    setUserName(storedName)
    const storedCoins = localStorage.getItem("medrelay.coins")
    if (storedCoins) setMedCoins(parseInt(storedCoins))
  }, [])

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(patientCode).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Exact requested mobile navigation items
  const navItems = [
    { name: "MedRelay AI", href: "/ai", icon: Sparkles },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Quick Access", href: "/quick-access", icon: Zap },
    { name: "Notification", href: "/notifications", icon: Bell },
    { name: "Consult Doctor", href: "/consultation", icon: Stethoscope },
    { name: "Appointment", href: "/appointments", icon: CalendarClock },
    { name: "Medical Records", href: "/records", icon: FileText },
    { name: "Pharmacy", href: "/pharmacy", icon: ShoppingBag },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  // If on the landing page, render the standalone landing page experience
  if (pathname === "/") {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F8F0] text-[#143827]">
      <Sidebar />

      {/* Mobile Slide-Over Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-[#143827]/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex-1 max-w-xs w-full bg-[#F6F8F0] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200 border-r border-[#E2E8D5]">
            <div className="h-16 flex items-center justify-between px-5 border-b border-[#E2E8D5]">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-8 h-8 rounded-xl bg-[#143827] text-[#C6F052] flex items-center justify-center">
                  <HeartPulse size={18} />
                </div>
                <span className="text-lg font-black tracking-tight text-[#143827] uppercase">
                  Med<span className="text-[#5E806E]">Relay</span>
                </span>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-[#5E806E] hover:bg-[#EBF0E4]"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto py-5 px-4 space-y-1.5">
              {navItems.map((item, j) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link 
                    key={j} 
                    href={item.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-full transition-all ${
                      isActive 
                        ? "bg-[#143827] text-white font-bold shadow-xs" 
                        : "text-[#5E806E] hover:bg-[#EBF0E4] font-medium"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-[#C6F052]" : "text-[#5E806E]"} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                )
              })}

              <div className="pt-4 border-t border-[#E2E8D5] mt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-full text-rose-700 hover:bg-rose-50 font-bold"
                >
                  <LogOut size={18} className="text-rose-600" />
                  <span className="text-sm">Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <OfflineBanner />
        
        {/* Topbar */}
        <header className="h-16 sm:h-20 bg-[#F6F8F0]/90 backdrop-blur-md border-b border-[#E2E8D5] flex items-center justify-between px-3 sm:px-8 sticky top-0 z-10 gap-2">
          
          {/* Mobile Hamburger & Logo */}
          <div className="flex items-center gap-2 md:hidden shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-[#143827] hover:bg-[#EBF0E4] border border-[#E2E8D5] cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu size={20} />
            </button>
            <Link href="/" className="flex items-center gap-1.5">
              <span className="text-base font-black text-[#143827] uppercase tracking-tight">Med<span className="text-[#5E806E]">Relay</span></span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-4 text-[#5E806E] w-4 h-4" />
              <input 
                type="text" 
                placeholder={t("header.search")} 
                className="w-full bg-[#EBF0E4] border border-[#E2E8D5] rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#143827] transition-all font-medium placeholder:text-[#5E806E] text-[#143827]" 
              />
              <div className="absolute right-4 text-[10px] font-bold text-[#5E806E] bg-white px-2 py-0.5 rounded-full border border-[#E2E8D5]">⌘F</div>
            </div>
          </div>

          {/* Header Controls (Coins, Patient Code, Notifications, Language, Profile) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* MedCoins Header Pill */}
            <Link
              href="/pharmacy"
              title="Your MedCoin Balance (1 Coin = ₹1 Discount)"
              className="flex items-center gap-1 bg-[#143827] text-white rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 transition-all text-xs font-bold shadow-2xs shrink-0 cursor-pointer"
            >
              <Coins size={13} className="text-[#C6F052]" />
              <span className="text-[10px] sm:text-[11px] text-[#C6F052] font-mono">{medCoins} 🪙</span>
            </Link>

            {/* Patient Unique Code Badge */}
            <button 
              type="button"
              onClick={handleCopyCode}
              title="Click to copy your unique code for PHC/Hospital visits"
              className="hidden lg:flex items-center gap-1 bg-[#EBF0E4] hover:bg-[#E2E8D5] border border-[#E2E8D5] text-[#143827] rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 transition-all text-xs font-bold shadow-2xs shrink-0 cursor-pointer group"
            >
              <KeyRound size={12} className="text-[#143827] group-hover:rotate-12 transition-transform shrink-0" />
              <span className="text-[10px] sm:text-[11px] text-[#5E806E] uppercase font-bold tracking-wider hidden xl:inline">Code:</span>
              <span className="font-mono font-bold text-[11px] sm:text-xs text-[#143827]">{patientCode}</span>
              {copied ? (
                <Check size={12} className="text-emerald-700 shrink-0" />
              ) : (
                <Copy size={12} className="text-[#5E806E] opacity-60 group-hover:opacity-100 shrink-0" />
              )}
            </button>

            {/* Quick Report Grievance Link */}
            <Link 
               href="/report" 
               title="Report unaccepted SOS or unresponsive PHC to Govt Command"
               className="hidden xl:flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs px-3 py-1.5 rounded-full transition-all shrink-0 cursor-pointer shadow-xs"
            >
               <ShieldAlert size={14} className="text-amber-700" />
               <span>Report PHC / SOS</span>
            </Link>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-[#EBF0E4] hover:bg-[#E2E8D5] border border-[#E2E8D5] rounded-full px-2 py-1 sm:px-3 sm:py-1.5 transition-colors">
              <Globe size={14} className="text-[#5E806E] shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as typeof lang)}
                className="bg-transparent text-[11px] sm:text-xs font-bold text-[#143827] focus:outline-none cursor-pointer pr-0.5"
                aria-label="Select Language"
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.nativeLabel}
                  </option>
                ))}
              </select>
            </div>

            {/* Notifications Bell Icon */}
            <Link 
              href="/notifications"
              className="text-[#5E806E] hover:text-[#143827] transition-colors relative p-2 rounded-full hover:bg-[#EBF0E4] shrink-0"
              title="Open Notifications & Reminders (Gmail Style)"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border-2 border-[#F6F8F0] rounded-full"></span>
            </Link>
            
            {/* User Profile Avatar */}
            <Link 
              href="/profile" 
              className="flex items-center gap-2 pl-1 sm:pl-2 pr-2 sm:pr-3 py-1 bg-[#EBF0E4] hover:bg-[#E2E8D5] rounded-full border border-[#E2E8D5] transition-all group shrink-0"
              title={`Logged in as ${userName}`}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#143827] text-[#C6F052] font-black text-xs flex justify-center items-center shadow-xs">
                {userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RK'}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#143827] leading-tight group-hover:text-[#5E806E] transition-colors">{userName}</span>
                <span className="text-[10px] text-[#5E806E] font-medium leading-none">Citizen / Patient</span>
              </div>
            </Link>

          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-3 sm:p-8 overflow-auto flex flex-col items-center">
          <div className="w-full max-w-5xl">
             <ConsentBanner />
          </div>
          <div className="w-full">
            {children}
          </div>
        </div>

        {/* Floating Bottom-Right Emergency SOS Circle Button */}
        <Link 
          href="/emergency" 
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-black shadow-2xl shadow-rose-600/50 flex flex-col items-center justify-center ring-4 ring-rose-600/20 hover:scale-110 active:scale-95 transition-all group cursor-pointer"
          title="1-Tap Emergency SOS Gateway"
        >
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-rose-600"></span>
          </span>
          <span className="text-lg sm:text-xl leading-none mb-0.5 group-hover:scale-110 transition-transform">🚨</span>
          <span className="text-[9px] sm:text-[10px] font-black tracking-wider uppercase leading-none text-rose-50">SOS</span>
        </Link>
      </main>
    </div>
  )
}
