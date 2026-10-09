"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Sparkles, LayoutDashboard, Zap, Bell, Stethoscope, 
  CalendarClock, FileText, ShoppingBag, User, Settings, 
  LogOut, HeartPulse 
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  // Exact requested sidebar items in ordered list
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

  return (
    <aside className="w-64 bg-[#F6F8F0] border-r border-[#E2E8D5] hidden md:flex flex-col">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-[#E2E8D5]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#143827] text-[#C6F052] flex items-center justify-center shadow-xs">
            <HeartPulse size={20} />
          </div>
          <span className="text-xl font-black tracking-tight text-[#143827] uppercase">
            Med<span className="text-[#5E806E]">Relay</span>
          </span>
        </Link>
      </div>
      
      {/* Main Nav Items List */}
      <div className="flex-1 overflow-auto py-6 px-4 flex flex-col justify-between">
        <nav className="space-y-1.5">
          {navItems.map((item, j) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link 
                key={j} 
                href={item.href} 
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
  )
}
