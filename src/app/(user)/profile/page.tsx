"use client"

import { useEffect, useState } from "react"
import { 
  User, HeartPulse, Activity, PhoneCall, ShieldAlert, Save, 
  IdCard, CheckCircle2, Loader2, Edit3, ArrowUpRight, Mail, 
  Phone, MapPin, Calendar, Droplets, Stethoscope, Sparkles, 
  Check, X, FileText, ShoppingBag, Settings as SettingsIcon, Coins
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Profile Form State
  const [name, setName] = useState("Rajesh Kumar")
  const [age, setAge] = useState("34")
  const [email, setEmail] = useState("user@medrelay.com")
  const [phone, setPhone] = useState("+91 98401 23456")
  const [residence, setResidence] = useState("Puducherry, India")
  const [patientId, setPatientId] = useState("PT-8891")
  const [abhaNumber, setAbhaNumber] = useState("91-4902-8819-2041")
  const [dob, setDob] = useState("1992-05-14")
  const [gender, setGender] = useState("Male")
  const [bloodType, setBloodType] = useState("O+")
  const [doctor, setDoctor] = useState("Dr. Emily Rodriguez (PHC Villianur)")
  const [allergies, setAllergies] = useState("Penicillin, Dust Mites")
  const [conditions, setConditions] = useState("Mild Hypertension (Controlled)")
  const [medications, setMedications] = useState("Amoxicillin 625mg, Pan-40, Dolo 650 SOS")
  const [emergencyName, setEmergencyName] = useState("Anitha Kumar")
  const [emergencyRelation, setEmergencyRelation] = useState("Spouse")
  const [emergencyPhone, setEmergencyPhone] = useState("+91 98401 98765")
  const [medCoins, setMedCoins] = useState(250)

  // ABHA Linking State
  const [abhaStatus, setAbhaStatus] = useState<"linked" | "unlinked" | "otp" | "verifying">("linked")
  const [abhaInput, setAbhaInput] = useState("")
  const [otpInput, setOtpInput] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("medrelay.user_name")
      if (storedName) setName(storedName)

      const storedEmail = localStorage.getItem("medrelay.user_email")
      if (storedEmail) setEmail(storedEmail)

      const storedCode = localStorage.getItem("medrelay.user_unique_code")
      if (storedCode) setPatientId(storedCode)

      const storedAbha = localStorage.getItem("medrelay.abha")
      if (storedAbha) setAbhaNumber(storedAbha)

      const storedCoins = localStorage.getItem("medrelay.coins")
      if (storedCoins) setMedCoins(parseInt(storedCoins))
    }
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setLoading(true)

    // Persist changes to localStorage so topbar, greeting, and system update instantly
    localStorage.setItem("medrelay.user_name", name.trim() || "Rajesh Kumar")
    localStorage.setItem("medrelay.user_email", email.trim() || "user@medrelay.com")
    localStorage.setItem("medrelay.user_unique_code", patientId.trim() || "PT-8891")
    localStorage.setItem("medrelay.abha", abhaNumber.trim() || "91-4902-8819-2041")

    setTimeout(() => {
      setLoading(false)
      setIsEditing(false)
      setSaved(true)
      showToast("Profile changes saved successfully!")
      setTimeout(() => setSaved(false), 3000)
    }, 600)
  }

  const handleVerifyAbha = () => {
    if (otpInput.length < 6) return
    setAbhaStatus("verifying")
    setTimeout(() => {
      setAbhaNumber(abhaInput || "91-4902-8819-2041")
      localStorage.setItem("medrelay.abha", abhaInput || "91-4902-8819-2041")
      setAbhaStatus("linked")
      showToast("ABHA ID linked successfully!")
    }, 900)
  }

  return (
    <div className="max-w-5xl mx-auto pb-16 space-y-6 text-[#143827]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#143827] text-[#C6F052] px-4 py-2.5 rounded-2xl shadow-xl border border-[#C6F052]/30 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#143827]">Patient Profile</h1>
          <p className="text-sm text-[#5E806E] mt-0.5">Manage your personal demographics and verified ABDM medical records.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (isEditing) {
              handleSave()
            } else {
              setIsEditing(true)
            }
          }}
          className={`px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-sm transition-all ${
            isEditing 
              ? "bg-[#143827] text-[#C6F052] hover:bg-[#0E2419]" 
              : "bg-[#EBF0E4] hover:bg-[#E2E8D5] text-[#143827] border border-[#E2E8D5]"
          }`}
        >
          {isEditing ? (
            <>
              <Save size={14} />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit3 size={14} />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      {/* 1. HERO PROFILE CARD (Styled exactly like the uploaded reference image) */}
      <div className="bg-white border border-[#E2E8D5] rounded-[36px] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        
        {/* Top Right Edit Action */}
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#F6F8F0] hover:bg-[#EBF0E4] border border-[#E2E8D5] text-[#143827] flex items-center justify-center transition-colors shadow-2xs cursor-pointer z-10"
          title={isEditing ? "Cancel editing" : "Edit profile details"}
        >
          {isEditing ? <Check size={18} className="text-emerald-700" /> : <Edit3 size={18} />}
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
          
          {/* Large Circular Avatar Photo / Initials Badge */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#143827] via-[#1E4835] to-[#2E6B4F] text-[#C6F052] font-black text-3xl sm:text-4xl flex items-center justify-center shadow-xl ring-4 ring-[#EBF0E4]">
              {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RK'}
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full ring-2 ring-white flex items-center justify-center text-white text-[10px] font-bold">
              ✓
            </div>
          </div>

          {/* User Demographics Glass Container */}
          <div className="flex-1 w-full space-y-4 text-center md:text-left">
            
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-2xl font-black text-[#143827]">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-3 py-1 text-xl font-black text-[#143827] focus:ring-2 focus:ring-[#143827] w-full max-w-sm" 
                    />
                  ) : (
                    `${name}'s Health Profile`
                  )}
                </h2>
                <span className="text-xs font-mono font-bold bg-[#EBF0E4] text-[#143827] border border-[#E2E8D5] px-2.5 py-0.5 rounded-full self-center md:self-auto">
                  Pat_{patientId}
                </span>
              </div>
              <p className="text-xs text-[#5E806E] font-medium mt-0.5">
                Primary Ayushman Bharat Citizen Account • Identity Verified
              </p>
            </div>

            {/* Quick Contact & Age Card */}
            <div className="bg-[#F4F6EC] border border-[#E2E8D5] rounded-2xl p-4 text-xs space-y-2 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5E806E] block">Age:</span>
                  {isEditing ? (
                    <input 
                      type="number" 
                      value={age} 
                      onChange={(e) => setAge(e.target.value)} 
                      className="bg-white border border-[#E2E8D5] rounded-lg px-2 py-0.5 font-bold text-[#143827] w-20 text-xs" 
                    />
                  ) : (
                    <span className="font-bold text-[#143827]">{age} years</span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5E806E] block">Email:</span>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="bg-white border border-[#E2E8D5] rounded-lg px-2 py-0.5 font-bold text-[#143827] w-full text-xs" 
                    />
                  ) : (
                    <span className="font-bold text-[#143827] truncate block">{email}</span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5E806E] block">Phone:</span>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="bg-white border border-[#E2E8D5] rounded-lg px-2 py-0.5 font-bold text-[#143827] w-full text-xs" 
                    />
                  ) : (
                    <span className="font-bold text-[#143827]">{phone}</span>
                  )}
                </div>
              </div>

              {/* Bottom 3 Pill Badges (ID, Policy/ABHA, Residence) */}
              <div className="pt-3 border-t border-[#E2E8D5] grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2 rounded-xl border border-[#E2E8D5]">
                  <span className="text-[10px] text-[#5E806E] font-bold block uppercase">UHID / ID</span>
                  <span className="font-mono font-bold text-[#143827]">{patientId}</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-[#E2E8D5]">
                  <span className="text-[10px] text-[#5E806E] font-bold block uppercase">Policy / ABHA</span>
                  <span className="font-mono font-bold text-[#143827] truncate block">{abhaNumber.slice(0, 12)}...</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-[#E2E8D5]">
                  <span className="text-[10px] text-[#5E806E] font-bold block uppercase">Residence</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={residence} 
                      onChange={(e) => setResidence(e.target.value)} 
                      className="bg-[#F6F8F0] border border-[#E2E8D5] rounded px-1 text-center font-bold text-[#143827] w-full text-xs" 
                    />
                  ) : (
                    <span className="font-bold text-[#143827] truncate block">{residence}</span>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 2. FOUR QUICK METRIC TILES (Styled exactly like reference image 2x2 grid with ArrowUpRight) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Card 1: Diary / Health Logs */}
        <Link 
          href="/quick-access"
          className="bg-white border border-[#E2E8D5] rounded-3xl p-5 shadow-xs hover:border-[#143827] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-xs text-[#5E806E] group-hover:text-[#143827] transition-colors">Diary &amp; Logs</span>
            <div className="w-8 h-8 rounded-full bg-[#F6F8F0] group-hover:bg-[#143827] group-hover:text-[#C6F052] flex items-center justify-center text-[#143827] transition-colors">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#143827]">15</div>
            <p className="text-[11px] text-[#5E806E] font-semibold mt-0.5">Total Doses &amp; Events</p>
          </div>
        </Link>

        {/* Card 2: Settings & Actions */}
        <Link 
          href="/settings"
          className="bg-white border border-[#E2E8D5] rounded-3xl p-5 shadow-xs hover:border-[#143827] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-xs text-[#5E806E] group-hover:text-[#143827] transition-colors">Settings</span>
            <div className="w-8 h-8 rounded-full bg-[#F6F8F0] group-hover:bg-[#143827] group-hover:text-[#C6F052] flex items-center justify-center text-[#143827] transition-colors">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#143827]">12</div>
            <p className="text-[11px] text-[#5E806E] font-semibold mt-0.5">Action Preferences</p>
          </div>
        </Link>

        {/* Card 3: Prescriptions & Med Orders */}
        <Link 
          href="/pharmacy"
          className="bg-white border border-[#E2E8D5] rounded-3xl p-5 shadow-xs hover:border-[#143827] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-xs text-[#5E806E] group-hover:text-[#143827] transition-colors">Prescriptions</span>
            <div className="w-8 h-8 rounded-full bg-[#F6F8F0] group-hover:bg-[#143827] group-hover:text-[#C6F052] flex items-center justify-center text-[#143827] transition-colors">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#143827]">8 Active</div>
            <p className="text-[11px] text-[#5E806E] font-semibold mt-0.5">Jan Aushadhi Sync</p>
          </div>
        </Link>

        {/* Card 4: Health Base / Verified Records */}
        <Link 
          href="/records"
          className="bg-white border border-[#E2E8D5] rounded-3xl p-5 shadow-xs hover:border-[#143827] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-xs text-[#5E806E] group-hover:text-[#143827] transition-colors">Health Base</span>
            <div className="w-8 h-8 rounded-full bg-[#F6F8F0] group-hover:bg-[#143827] group-hover:text-[#C6F052] flex items-center justify-center text-[#143827] transition-colors">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#143827]">9 Verified</div>
            <p className="text-[11px] text-[#5E806E] font-semibold mt-0.5">ABDM FHIR Bundles</p>
          </div>
        </Link>

      </div>

      {/* 3. EDITABLE MEDICAL PROFILE & EMERGENCY CONTACT DETAILS */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* ABHA Link Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8D5] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#143827] flex items-center gap-2">
              <IdCard className="text-[#143827]" size={20} />
              <span>Ayushman Bharat Health Account (ABHA)</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-3 py-1 rounded-full">
              ABDM Certified
            </span>
          </div>

          <p className="text-xs text-[#5E806E]">
            Linking your 14-digit ABHA ID synchronizes medical diagnostic records, prescriptions, and referral slips across all participating hospitals in India.
          </p>

          {abhaStatus === "linked" ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#F4F6EC] border border-[#E2E8D5] rounded-2xl gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={24} className="text-emerald-700 shrink-0" />
                <div>
                  <p className="font-bold text-xs text-[#143827]">ABHA ID Linked &amp; Verified</p>
                  <p className="font-mono text-xs text-[#5E806E] font-bold">{abhaNumber}</p>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAbhaStatus("unlinked")}
                className="border-slate-300 text-xs font-bold text-[#143827] hover:bg-[#EBF0E4] rounded-full"
              >
                Change ABHA ID
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#143827] mb-1">Enter 14-Digit ABHA ID</label>
                <input
                  type="text"
                  placeholder="91-XXXX-XXXX-XXXX"
                  value={abhaInput}
                  onChange={(e) => setAbhaInput(e.target.value)}
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-[#143827] focus:ring-2 focus:ring-[#143827]"
                />
              </div>

              {abhaStatus === "unlinked" && (
                <button
                  type="button"
                  onClick={() => setAbhaStatus("otp")}
                  className="px-5 py-2.5 bg-[#143827] text-white rounded-full text-xs font-bold hover:bg-[#0E2419]"
                >
                  Request OTP via Aadhaar / Mobile
                </button>
              )}

              {abhaStatus === "otp" && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="6-Digit OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    maxLength={6}
                    className="w-36 bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyAbha}
                    className="px-5 py-2 bg-[#143827] text-white rounded-full text-xs font-bold"
                  >
                    Verify &amp; Link
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Clinical Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8D5] shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#143827] flex items-center gap-2">
            <HeartPulse className="text-rose-600" size={20} />
            <span>Clinical &amp; Medical Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#143827] mb-1">Blood Group</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-3 py-2.5 font-bold text-rose-700"
              >
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#143827] mb-1">Primary Care Physician</label>
              <input
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-3 py-2.5 font-bold text-[#143827]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-[#143827] mb-1">Known Allergies</label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-3 py-2.5 font-medium text-[#143827]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-[#143827] mb-1">Pre-existing Chronic Conditions</label>
              <input
                type="text"
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-3 py-2.5 font-medium text-[#143827]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-[#143827] mb-1">Active Prescribed Medications</label>
              <input
                type="text"
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
                className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-3 py-2.5 font-medium text-[#143827]"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contacts Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#143827] flex items-center gap-2">
            <ShieldAlert className="text-rose-600" size={20} />
            <span>Emergency Contacts (Dialed on SOS Trigger)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#143827] mb-1">Contact Name</label>
              <input
                type="text"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-3 py-2.5 font-bold text-[#143827]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#143827] mb-1">Relationship</label>
              <input
                type="text"
                value={emergencyRelation}
                onChange={(e) => setEmergencyRelation(e.target.value)}
                className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-3 py-2.5 font-bold text-[#143827]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#143827] mb-1">Emergency Phone</label>
              <input
                type="tel"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-3 py-2.5 font-bold text-[#143827]"
              />
            </div>
          </div>
        </div>

        {/* Form Save Button */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 bg-[#143827] hover:bg-[#0E2419] text-white font-bold rounded-full text-xs shadow-md transition-all flex items-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Save Profile Changes</span>
          </Button>
        </div>

      </form>

    </div>
  )
}
