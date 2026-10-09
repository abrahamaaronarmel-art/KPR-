"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ShieldAlert, Mail, Lock, User, ArrowRight, Sparkles, 
  HeartPulse, Check, Stethoscope, Building2, ShieldCheck, 
  Activity, Users
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<"patient" | "doctor">("patient")
  const [userName, setUserName] = useState("Rajesh Kumar")
  const [email, setEmail] = useState("user@medrelay.com")
  const [password, setPassword] = useState("password123")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (role === "patient") {
      const stored = localStorage.getItem("medrelay.user_name")
      setUserName(stored || "Rajesh Kumar")
      setEmail("user@medrelay.com")
      setPassword("password123")
    } else {
      setUserName("Dr. Marcus Chen, MS (Ortho)")
      setEmail("doctor@medrelay.com")
      setPassword("doctor123")
    }
  }, [role])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (role === "patient") {
      const finalName = userName.trim() || "Rajesh Kumar"
      localStorage.setItem("medrelay.user_name", finalName)
      localStorage.setItem("medrelay.user_email", email)
      localStorage.setItem("medrelay.role", "patient")

      setTimeout(() => {
        router.push("/dashboard")
      }, 600)
    } else {
      const finalName = userName.trim() || "Dr. Marcus Chen, MS (Ortho)"
      localStorage.setItem("medrelay.doctor_name", finalName)
      localStorage.setItem("medrelay.doctor_email", email)
      localStorage.setItem("medrelay.role", "doctor")

      setTimeout(() => {
        router.push("/doctor")
      }, 600)
    }
  }

  const fillPatientDemo = () => {
    setRole("patient")
    setUserName("Rajesh Kumar")
    setEmail("user@medrelay.com")
    setPassword("password123")
  }

  const fillDoctorDemo = () => {
    setRole("doctor")
    setUserName("Dr. Marcus Chen, MS (Ortho)")
    setEmail("doctor@medrelay.com")
    setPassword("doctor123")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F8F0] p-4 sm:p-6 relative selection:bg-[#C6F052] selection:text-[#143827]">
      
      {loading && (
        <div className="fixed inset-0 z-50 bg-[#F6F8F0]/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 animate-in fade-in duration-200">
          <div className="w-12 h-12 border-4 border-[#143827] border-t-transparent rounded-full animate-spin" />
          <div className="text-center">
            <p className="text-[#143827] font-black text-xl">
              Welcome, {userName || (role === "doctor" ? "Doctor / Administrator" : "User")}!
            </p>
            <p className="text-[#5E806E] text-sm mt-1">
              {role === "doctor" ? "Opening Hospital & Patient Care Portal..." : "Opening your personalized health dashboard…"}
            </p>
          </div>
        </div>
      )}

      {/* Top Left Home Link */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-[#143827] hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 rounded-xl bg-[#143827] text-[#C6F052] flex items-center justify-center shadow-sm">
            <HeartPulse size={20} />
          </div>
          <span className="text-lg font-black tracking-tight uppercase">Med<span className="text-[#5E806E]">Relay</span></span>
        </Link>
      </div>

      {/* Top Right Back to Landing Link */}
      <div className="absolute top-6 right-6">
        <Link 
          href="/" 
          className="text-xs font-bold text-[#5E806E] hover:text-[#143827] bg-[#EBF0E4] hover:bg-[#E2E8D5] border border-[#E2E8D5] px-4 py-2 rounded-full transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <span>← Back to Website</span>
        </Link>
      </div>
      
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 lg:gap-12 items-center pt-12 sm:pt-8">
        
        {/* Left Informational Column */}
        <div className="space-y-6 hidden md:block">
          <div className="inline-flex items-center gap-2 bg-[#EBF0E4] text-[#143827] border border-[#E2E8D5] px-4 py-1.5 rounded-full text-xs font-bold shadow-2xs">
            <Sparkles size={14} className="text-[#143827]" />
            <span>ABDM Integrated Health Gateway</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#143827] leading-[1.1]">
              Feel Better. <br />
              <span className="text-[#5E806E]">Live Healthier.</span>
            </h1>
          </div>

          <p className="text-sm lg:text-base text-[#5E806E] leading-relaxed">
            {role === "doctor" ? (
              "Sign in as Chief Medical Officer / Hospital Administrator to manage OPD queues, view patient history & X-rays, assign beds, and handle emergency referrals."
            ) : (
              "Sign in as a Citizen / Patient to access personalized medical records, start multilingual voice AI triage, view nearby hospitals on Google Maps, and manage in-time medicines."
            )}
          </p>
          
          {/* Demo Account Switcher Cards */}
          <div className="pt-4 border-t border-[#E2E8D5] space-y-3">
            <h3 className="text-xs font-bold text-[#5E806E] uppercase tracking-wider">Quick Demo Access Accounts</h3>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              
              {/* Citizen Demo Option */}
              <button
                type="button"
                onClick={fillPatientDemo}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  role === "patient"
                    ? "bg-white border-[#143827] shadow-sm ring-1 ring-[#143827]"
                    : "bg-[#F4F6EC] border-[#E2E8D5] hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-[#143827] mb-1">
                  <span>👤</span>
                  <span>Citizen / Patient</span>
                </div>
                <p className="text-[10px] text-[#5E806E] font-mono">user@medrelay.com</p>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                  Patient Portal
                </span>
              </button>

              {/* Doctor / Hospital Admin Option */}
              <button
                type="button"
                onClick={fillDoctorDemo}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  role === "doctor"
                    ? "bg-white border-[#143827] shadow-sm ring-1 ring-[#143827]"
                    : "bg-[#F4F6EC] border-[#E2E8D5] hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-[#143827] mb-1">
                  <span>👨‍⚕️</span>
                  <span>Doctor &amp; Admin</span>
                </div>
                <p className="text-[10px] text-[#5E806E] font-mono">doctor@medrelay.com</p>
                <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                  Hospital Admin
                </span>
              </button>

            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="w-full">
          <Card className="w-full shadow-xl border-[#E2E8D5] rounded-[32px] overflow-hidden bg-white">
            
            {/* Role Switcher Tabs */}
            <div className="p-3 bg-[#F6F8F0] border-b border-[#E2E8D5] flex gap-2">
              <button
                type="button"
                onClick={() => setRole("patient")}
                className={`flex-1 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  role === "patient"
                    ? "bg-[#143827] text-white shadow-xs"
                    : "bg-white text-[#5E806E] hover:text-[#143827] border border-[#E2E8D5]"
                }`}
              >
                <User size={14} />
                <span>Citizen Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("doctor")}
                className={`flex-1 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  role === "doctor"
                    ? "bg-[#143827] text-white shadow-xs"
                    : "bg-white text-[#5E806E] hover:text-[#143827] border border-[#E2E8D5]"
                }`}
              >
                <Stethoscope size={14} />
                <span>Doctor / Hospital Admin</span>
              </button>
            </div>

            <CardHeader className="space-y-1 bg-[#F4F6EC]/60 border-b border-[#E2E8D5] p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-black text-[#143827]">
                    {role === "doctor" ? "Doctor & Administrator Portal" : "Citizen Sign In"}
                  </CardTitle>
                  <p className="text-[#5E806E] text-xs mt-0.5">
                    {role === "doctor" 
                      ? "Indira Gandhi Govt General Hospital (IGGGH)"
                      : "Enter details to access your personal health records"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={role === "doctor" ? fillDoctorDemo : fillPatientDemo}
                  className="text-xs font-bold text-[#143827] bg-[#EBF0E4] hover:bg-[#E2E8D5] border border-[#E2E8D5] px-3 py-1 rounded-full transition-colors shrink-0"
                >
                  ⚡ Auto-Fill
                </button>
              </div>
            </CardHeader>
            
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 p-6 sm:p-7">
                
                {/* 1. Full Name Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="userName" className="text-xs font-bold text-[#143827] flex items-center gap-1.5">
                    {role === "doctor" ? <Stethoscope size={14} className="text-[#143827]" /> : <User size={14} className="text-[#143827]" />}
                    <span>{role === "doctor" ? "Doctor / Administrator Name" : "Your Full Name"}</span>
                  </Label>
                  <Input 
                    id="userName" 
                    type="text" 
                    placeholder={role === "doctor" ? "Dr. Marcus Chen, MS (Ortho)" : "Rajesh Kumar"} 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="h-11 rounded-2xl bg-[#F6F8F0] border-[#E2E8D5] focus:ring-2 focus:ring-[#143827] text-sm text-[#143827] font-semibold"
                  />
                </div>

                {/* 2. Email Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-bold text-[#143827] flex items-center gap-1.5">
                    <Mail size={14} className="text-[#143827]" />
                    <span>Email Address</span>
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder={role === "doctor" ? "doctor@medrelay.com" : "user@medrelay.com"} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="h-11 rounded-2xl bg-[#F6F8F0] border-[#E2E8D5] focus:ring-2 focus:ring-[#143827] text-sm text-[#143827]"
                  />
                </div>

                {/* 3. Password Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-bold text-[#143827] flex items-center gap-1.5">
                    <Lock size={14} className="text-[#143827]" />
                    <span>Password</span>
                  </Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="h-11 rounded-2xl bg-[#F6F8F0] border-[#E2E8D5] focus:ring-2 focus:ring-[#143827] text-sm text-[#143827]"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[#5E806E] font-medium">
                    <input type="checkbox" defaultChecked className="rounded border-[#E2E8D5] text-[#143827] focus:ring-[#143827]" />
                    <span>Remember this session</span>
                  </label>
                  <span className="font-semibold text-[#143827] text-[11px] bg-[#EBF0E4] px-2 py-0.5 rounded">
                    {role === "doctor" ? "Hospital Admin Access" : "ABHA Citizen Access"}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 p-6 sm:p-7 pt-0">
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-[#143827] hover:bg-[#0E2419] text-white font-bold rounded-full text-base shadow-lg shadow-[#143827]/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{role === "doctor" ? "Sign in to Hospital Admin Portal" : "Sign in to Dashboard"}</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight size={14} />
                  </span>
                </Button>

                <p className="text-center text-xs text-[#5E806E]">
                  {role === "doctor" 
                    ? "Chief Medical Officer Access • Indira Gandhi Govt General Hospital" 
                    : "Demo access for citizen / patient • No OTP required"}
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>

      </div>

    </div>
  )
}
