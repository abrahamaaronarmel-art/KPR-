"use client"

import { useState, useEffect } from "react"
import { 
  User, Stethoscope, Mail, Phone, Building2, 
  Clock, ShieldCheck, Edit3, Check, Sparkles, 
  ArrowUpRight, Award, Calendar, FileText, BedDouble, Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DoctorProfileData {
  name: string
  mciId: string
  specialization: string
  department: string
  hospital: string
  email: string
  phone: string
  dutyShift24: string
  qualifications: string
  bio: string
}

export default function DoctorProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const defaultDoctorProfile: DoctorProfileData = {
    name: "Dr. Marcus Chen, MS (Ortho)",
    mciId: "MCI-PY-2018-9410",
    specialization: "Orthopedic & Trauma Surgery",
    department: "Department of Orthopedics & Emergency Medicine",
    hospital: "Indira Gandhi Govt General Hospital & PG Institute (IGGGH), Puducherry",
    email: "doctor@medrelay.com",
    phone: "+91 98402 19283",
    dutyShift24: "08:00 - 16:00 HRS",
    qualifications: "MS (Orthopedics) • MBBS (JIPMER Puducherry) • Fellowship in Arthroscopy",
    bio: "Chief Medical Officer and Senior Orthopedic Surgeon with 12+ years of clinical and trauma resuscitation experience. Leading digital ABHA synchronization and 108 Emergency care protocols."
  }

  const [profile, setProfile] = useState<DoctorProfileData>(defaultDoctorProfile)

  useEffect(() => {
    const stored = localStorage.getItem("medrelay.doctor_profile")
    if (stored) {
      try {
        setProfile(JSON.parse(stored))
      } catch (e) {
        // use default
      }
    }
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleSave = () => {
    localStorage.setItem("medrelay.doctor_profile", JSON.stringify(profile))
    localStorage.setItem("medrelay.doctor_name", profile.name)
    setIsEditing(false)
    showToast("✅ Doctor profile updated and saved successfully!")
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 text-[#143827]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#143827] text-[#C6F052] px-5 py-3 rounded-2xl shadow-xl border border-[#C6F052]/30 text-xs font-bold animate-in fade-in flex items-center gap-2">
          <Sparkles size={16} className="text-[#C6F052]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#143827]">Doctor Profile</h1>
          <p className="text-xs text-[#5E806E] font-medium mt-1">
            Verified institutional clinical credentials, duty schedule, and medical practice identity
          </p>
        </div>

        <Button
          onClick={() => {
            if (isEditing) {
              handleSave()
            } else {
              setIsEditing(true)
            }
          }}
          className={`rounded-full text-xs font-bold px-5 py-2.5 flex items-center gap-2 shadow-sm transition-all ${
            isEditing 
              ? "bg-emerald-700 text-white hover:bg-emerald-800" 
              : "bg-[#143827] text-[#C6F052] hover:bg-[#0E2419]"
          }`}
        >
          {isEditing ? (
            <>
              <Check size={14} />
              <span>Save Profile</span>
            </>
          ) : (
            <>
              <Edit3 size={14} />
              <span>Edit Doctor Profile</span>
            </>
          )}
        </Button>
      </div>

      {/* MAIN PROFILE CARD */}
      <div className="bg-white border border-[#E2E8D5] rounded-[32px] p-6 sm:p-8 shadow-xs space-y-8">
        
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E2E8D5]">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-3xl bg-[#143827] text-[#C6F052] font-black text-2xl flex items-center justify-center shadow-md shrink-0">
              MC
            </div>

            <div className="space-y-1">
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="font-black text-xl text-[#143827] bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-3 py-1 w-full"
                />
              ) : (
                <h2 className="font-black text-2xl text-[#143827]">{profile.name}</h2>
              )}

              <p className="text-xs text-[#5E806E] font-medium">
                {profile.specialization} • {profile.department}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[10px] font-mono font-bold bg-[#F4F6EC] text-[#143827] px-2.5 py-0.5 rounded-full border border-[#E2E8D5]">
                  MCI REG: {profile.mciId}
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck size={12} />
                  <span>Institutional CMO Active</span>
                </span>
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right font-mono text-xs">
            <span className="text-[10px] text-[#5E806E] font-sans font-bold uppercase block">24h Shift Duty</span>
            <span className="font-black text-sm text-[#143827]">{profile.dutyShift24}</span>
          </div>
        </div>

        {/* 4 Quick Clinical Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/doctor/schedule"
            className="bg-[#F6F8F0] border border-[#E2E8D5] hover:border-[#143827] rounded-2xl p-4 transition-all group"
          >
            <div className="flex justify-between items-center text-[#5E806E] mb-2">
              <Calendar size={18} className="text-[#143827]" />
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <div className="font-black text-sm text-[#143827]">My Schedule</div>
            <div className="text-[11px] text-[#5E806E] mt-0.5">5 Consultations (24h)</div>
          </Link>

          <Link
            href="/doctor/records"
            className="bg-[#F6F8F0] border border-[#E2E8D5] hover:border-[#143827] rounded-2xl p-4 transition-all group"
          >
            <div className="flex justify-between items-center text-[#5E806E] mb-2">
              <FileText size={18} className="text-[#143827]" />
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <div className="font-black text-sm text-[#143827]">Patient Records</div>
            <div className="text-[11px] text-[#5E806E] mt-0.5">Diagnostic Repository</div>
          </Link>

          <Link
            href="/doctor/beds"
            className="bg-[#F6F8F0] border border-[#E2E8D5] hover:border-[#143827] rounded-2xl p-4 transition-all group"
          >
            <div className="flex justify-between items-center text-[#5E806E] mb-2">
              <BedDouble size={18} className="text-[#143827]" />
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <div className="font-black text-sm text-[#143827]">Hospital Beds</div>
            <div className="text-[11px] text-[#5E806E] mt-0.5">Floor Blueprint &amp; ICU</div>
          </Link>

          <Link
            href="/doctor/notifications"
            className="bg-[#F6F8F0] border border-[#E2E8D5] hover:border-[#143827] rounded-2xl p-4 transition-all group"
          >
            <div className="flex justify-between items-center text-[#5E806E] mb-2">
              <Bell size={18} className="text-[#143827]" />
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <div className="font-black text-sm text-[#143827]">Notifications</div>
            <div className="text-[11px] text-[#5E806E] mt-0.5">Gmail-Style Inbox</div>
          </Link>
        </div>

        {/* ESSENTIAL DOCTOR DETAILS FORM */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#5E806E] border-b border-[#E2E8D5] pb-2">
            Essential Clinical &amp; Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-bold">
            
            {/* Specialization */}
            <div>
              <label className="text-[#5E806E] uppercase block mb-1.5 flex items-center gap-1.5">
                <Stethoscope size={13} />
                <span>Primary Specialization</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.specialization}
                  onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2 text-[#143827]"
                />
              ) : (
                <div className="bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-[#143827]">
                  {profile.specialization}
                </div>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="text-[#5E806E] uppercase block mb-1.5 flex items-center gap-1.5">
                <Building2 size={13} />
                <span>Department</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2 text-[#143827]"
                />
              ) : (
                <div className="bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-[#143827]">
                  {profile.department}
                </div>
              )}
            </div>

            {/* Hospital Node */}
            <div className="sm:col-span-2">
              <label className="text-[#5E806E] uppercase block mb-1.5 flex items-center gap-1.5">
                <Building2 size={13} />
                <span>Hospital / Institutional Facility</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.hospital}
                  onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2 text-[#143827]"
                />
              ) : (
                <div className="bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-[#143827]">
                  {profile.hospital}
                </div>
              )}
            </div>

            {/* Official Email */}
            <div>
              <label className="text-[#5E806E] uppercase block mb-1.5 flex items-center gap-1.5">
                <Mail size={13} />
                <span>Official Hospital Email</span>
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2 text-[#143827]"
                />
              ) : (
                <div className="bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-[#143827] font-mono">
                  {profile.email}
                </div>
              )}
            </div>

            {/* Contact Phone */}
            <div>
              <label className="text-[#5E806E] uppercase block mb-1.5 flex items-center gap-1.5">
                <Phone size={13} />
                <span>Duty Phone Number</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2 text-[#143827]"
                />
              ) : (
                <div className="bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-[#143827] font-mono">
                  {profile.phone}
                </div>
              )}
            </div>

            {/* Qualifications */}
            <div className="sm:col-span-2">
              <label className="text-[#5E806E] uppercase block mb-1.5 flex items-center gap-1.5">
                <Award size={13} />
                <span>Medical Qualifications &amp; Fellowships</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.qualifications}
                  onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })}
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2 text-[#143827]"
                />
              ) : (
                <div className="bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-[#143827]">
                  {profile.qualifications}
                </div>
              )}
            </div>

            {/* Clinical Bio */}
            <div className="sm:col-span-2">
              <label className="text-[#5E806E] uppercase block mb-1.5">Doctor Bio &amp; Practice Overview</label>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-[#143827] font-medium"
                />
              ) : (
                <div className="bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-3 text-slate-800 font-medium leading-relaxed">
                  {profile.bio}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

