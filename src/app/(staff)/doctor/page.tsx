"use client"

import { useState, useEffect } from "react"
import { 
  Zap, FileText, Download, Eye, Send, Pill, Clock, 
  ShieldAlert, Activity, Users, Video, CheckCircle2, 
  Sparkles, Search, ChevronRight, AlertTriangle, Building2, User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MedicalReportModal } from "@/components/MedicalReportModal"
import Link from "next/link"

interface HighRiskReport {
  id: string
  patientName: string
  patientCode: string
  abhaId: string
  age: string
  riskLevel: "CRITICAL" | "HIGH RISK" | "MODERATE"
  chiefComplaint: string
  diagnosis: string
  vitals: { bp: string; pulse: string; temp: string; spo2: string }
  reportTitle: string
  docId: string
  time24: string
}

export default function DoctorQuickAccessPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [selectedDocId, setSelectedDocId] = useState("rep-xray-002")
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  
  // Quick Prescription Form State
  const [rxPatient, setRxPatient] = useState("Murugan Swamy (PT-9102)")
  const [rxMedicine, setRxMedicine] = useState("Atorvastatin 40mg + Aspirin 75mg")
  const [rxDosage, setRxDosage] = useState("1-0-1 (After Meals, 14 Days)")
  const [rxInstructions, setRxInstructions] = useState("Immediate stat dose given. Bedside telemetry monitoring.")

  // High Risk Patients list
  const highRiskReports: HighRiskReport[] = [
    {
      id: "hr-1",
      patientName: "Murugan Swamy",
      patientCode: "PT-9102",
      abhaId: "91-8841-9920-3301",
      age: "58 Y, Male",
      riskLevel: "CRITICAL",
      chiefComplaint: "Acute STEMI / Severe Chest Pressure radiating to Left Arm",
      diagnosis: "Acute Coronary Syndrome - Anterior Wall Myocardial Infarction",
      vitals: { bp: "155/98", pulse: "108 bpm", temp: "99.1°F", spo2: "94%" },
      reportTitle: "12-Lead ECG & Cardiac Troponin-I Diagnostic Panel",
      docId: "rep-blood-001",
      time24: "14:15"
    },
    {
      id: "hr-2",
      patientName: "Rajesh Kumar",
      patientCode: "PT-8891",
      abhaId: "91-4902-8819-2041",
      age: "34 Y, Male",
      riskLevel: "HIGH RISK",
      chiefComplaint: "Compound Right Distal Radius Fracture post road accident",
      diagnosis: "Displaced Distal Radius Fracture with Deformity",
      vitals: { bp: "118/78", pulse: "76 bpm", temp: "98.6°F", spo2: "99%" },
      reportTitle: "Digital Radiograph (X-Ray) Right Forearm & Wrist",
      docId: "rep-xray-002",
      time24: "09:30"
    },
    {
      id: "hr-3",
      patientName: "Priya Sundaram",
      patientCode: "PT-4421",
      abhaId: "91-3820-1129-4402",
      age: "28 Y, Female",
      riskLevel: "MODERATE",
      chiefComplaint: "Severe Hypertensive Headache with Blurred Vision",
      diagnosis: "Essential Hypertension Stage II with Migraine Trigger",
      vitals: { bp: "135/88", pulse: "82 bpm", temp: "98.4°F", spo2: "98%" },
      reportTitle: "Complete Blood Count & Metabolic Profile Report",
      docId: "rep-blood-001",
      time24: "11:00"
    }
  ]

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleOpenReport = (docId: string) => {
    setSelectedDocId(docId)
    setIsReportModalOpen(true)
  }

  const handleDownloadReport = (patientName: string, title: string) => {
    showToast(`⬇️ Downloading FHIR diagnostic report: ${patientName} - ${title}.pdf`)
  }

  const handleSendPrescription = (e: React.FormEvent) => {
    e.preventDefault()
    showToast(`✅ Medical Prescription sent successfully to ${rxPatient} & In-House Pharmacy!`)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 text-[#143827]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#143827] text-[#C6F052] px-5 py-3 rounded-2xl shadow-xl border border-[#C6F052]/30 text-xs font-bold animate-in fade-in flex items-center gap-2">
          <Sparkles size={16} className="text-[#C6F052]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Diagnostic Report Modal */}
      <MedicalReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        initialDocId={selectedDocId}
      />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl font-black tracking-tight text-[#143827]">Doctor Quick Access</h1>
            <span className="text-xs font-bold bg-[#143827] text-[#C6F052] px-3 py-1 rounded-full flex items-center gap-1.5">
              <Zap size={13} />
              <span>High Risk Command Active</span>
            </span>
          </div>
          <p className="text-xs text-[#5E806E] font-medium mt-1">
            Rapid high-risk patient diagnostic reviews, report downloads, and instant e-prescription dispatch
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/doctor/beds"
            className="bg-white hover:bg-[#F6F8F0] text-[#143827] border border-[#E2E8D5] rounded-full text-xs font-bold px-4 py-2.5 flex items-center gap-2 shadow-xs"
          >
            <Building2 size={15} className="text-emerald-700" />
            <span>Floor Bed Availability</span>
          </Link>
          <Link
            href="/doctor/schedule"
            className="bg-[#143827] hover:bg-[#0E2419] text-[#C6F052] rounded-full text-xs font-bold px-4 py-2.5 flex items-center gap-1.5 shadow-md shadow-[#143827]/15"
          >
            <Clock size={15} />
            <span>My Schedule (24h)</span>
          </Link>
        </div>
      </div>

      {/* SECTION 1: HIGH RISK PATIENT REPORTS (VIEW & DOWNLOAD) */}
      <div className="bg-white border border-[#E2E8D5] rounded-[32px] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8D5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold shadow-xs">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#143827]">High Risk Patient Reports</h2>
              <p className="text-xs text-[#5E806E]">Immediate clinical triage alerts requiring priority doctor intervention</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-rose-100 text-rose-800 px-3 py-1 rounded-full border border-rose-200">
            {highRiskReports.length} Critical / High Priority Cases
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {highRiskReports.map((report) => (
            <div 
              key={report.id}
              className={`rounded-3xl p-5 border flex flex-col justify-between transition-all hover:shadow-md ${
                report.riskLevel === "CRITICAL" 
                  ? "bg-rose-50/50 border-rose-200 ring-1 ring-rose-300" 
                  : report.riskLevel === "HIGH RISK" 
                    ? "bg-amber-50/50 border-amber-200" 
                    : "bg-[#F6F8F0] border-[#E2E8D5]"
              }`}
            >
              <div className="space-y-3">
                {/* Top Badge & Time */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                    report.riskLevel === "CRITICAL" 
                      ? "bg-rose-600 text-white animate-pulse" 
                      : report.riskLevel === "HIGH RISK" 
                        ? "bg-amber-500 text-white" 
                        : "bg-blue-600 text-white"
                  }`}>
                    {report.riskLevel}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#5E806E] flex items-center gap-1">
                    <Clock size={12} />
                    <span>{report.time24} HRS</span>
                  </span>
                </div>

                {/* Patient Information */}
                <div>
                  <h3 className="font-black text-base text-[#143827]">{report.patientName}</h3>
                  <p className="text-xs text-[#5E806E]">
                    {report.age} • UHID: <strong className="font-mono text-[#143827]">{report.patientCode}</strong>
                  </p>
                </div>

                {/* Chief Complaint & Diagnosis */}
                <div className="bg-white/80 rounded-2xl p-3 border border-slate-200/60 text-xs space-y-1">
                  <div className="font-bold text-[#143827]">{report.chiefComplaint}</div>
                  <div className="text-[11px] text-slate-600">{report.diagnosis}</div>
                </div>

                {/* Vitals Summary */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-white p-2.5 rounded-xl border border-slate-200/60 text-slate-700">
                  <div>BP: <strong>{report.vitals.bp}</strong></div>
                  <div>SpO2: <strong className="text-emerald-700">{report.vitals.spo2}</strong></div>
                  <div>Pulse: <strong>{report.vitals.pulse}</strong></div>
                  <div>Temp: <strong>{report.vitals.temp}</strong></div>
                </div>
              </div>

              {/* Action Buttons: View & Download */}
              <div className="pt-4 flex gap-2 border-t border-slate-200/60 mt-4">
                <Button
                  onClick={() => handleOpenReport(report.docId)}
                  className="flex-1 bg-[#143827] hover:bg-[#0E2419] text-[#C6F052] rounded-full text-xs font-bold h-9 shadow-xs"
                >
                  <Eye size={13} className="mr-1.5" />
                  <span>View Report</span>
                </Button>

                <Button
                  onClick={() => handleDownloadReport(report.patientName, report.reportTitle)}
                  variant="outline"
                  className="bg-white hover:bg-[#F6F8F0] text-[#143827] border-[#E2E8D5] rounded-full text-xs font-bold h-9 px-3"
                  title="Download FHIR Diagnostic PDF"
                >
                  <Download size={14} />
                </Button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: SEND MEDICAL PRESCRIPTION (RX) TO PATIENT */}
      <div className="bg-white border border-[#E2E8D5] rounded-[32px] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8D5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#143827] text-[#C6F052] flex items-center justify-center font-bold shadow-xs">
              <Pill size={18} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#143827]">Send Medical Prescription to Patient</h2>
              <p className="text-xs text-[#5E806E]">Generate and dispatch verified digital e-Prescriptions directly to the patient's MedRelay portal &amp; Pharmacy</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
            e-Rx Digital Gateway Synchronized
          </span>
        </div>

        <form onSubmit={handleSendPrescription} className="bg-[#F6F8F0] border border-[#E2E8D5] rounded-3xl p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div>
              <label className="text-xs font-bold text-[#5E806E] uppercase block mb-1.5">Select Patient</label>
              <select
                value={rxPatient}
                onChange={(e) => setRxPatient(e.target.value)}
                className="w-full bg-white border border-[#E2E8D5] rounded-2xl px-4 py-2.5 text-xs font-bold text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827]"
              >
                <option value="Murugan Swamy (PT-9102)">Murugan Swamy (PT-9102) • Critical</option>
                <option value="Rajesh Kumar (PT-8891)">Rajesh Kumar (PT-8891) • Ortho</option>
                <option value="Priya Sundaram (PT-4421)">Priya Sundaram (PT-4421) • Teleconsult</option>
                <option value="Kavitha Ranganathan (PT-2091)">Kavitha Ranganathan (PT-2091) • Post-Op</option>
                <option value="Anand Govindarajan (PT-5512)">Anand Govindarajan (PT-5512) • OPD</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#5E806E] uppercase block mb-1.5">Prescribed Medication &amp; Strength</label>
              <input
                type="text"
                value={rxMedicine}
                onChange={(e) => setRxMedicine(e.target.value)}
                placeholder="e.g. Atorvastatin 40mg + Aspirin 75mg"
                className="w-full bg-white border border-[#E2E8D5] rounded-2xl px-4 py-2.5 text-xs font-bold text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#5E806E] uppercase block mb-1.5">Dosage Frequency &amp; Duration (24h)</label>
              <input
                type="text"
                value={rxDosage}
                onChange={(e) => setRxDosage(e.target.value)}
                placeholder="e.g. 1-0-1 (After Meals, 14 Days)"
                className="w-full bg-white border border-[#E2E8D5] rounded-2xl px-4 py-2.5 text-xs font-bold text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827]"
                required
              />
            </div>

          </div>

          <div>
            <label className="text-xs font-bold text-[#5E806E] uppercase block mb-1.5">Clinical Instructions &amp; Dietary Advice</label>
            <textarea
              rows={2}
              value={rxInstructions}
              onChange={(e) => setRxInstructions(e.target.value)}
              placeholder="Special instructions for patient (e.g. take with water, avoid salt, review in 7 days)..."
              className="w-full bg-white border border-[#E2E8D5] rounded-2xl px-4 py-2.5 text-xs font-medium text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827]"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="text-xs text-[#5E806E] flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-700" />
              <span>Prescription will be digitally signed by <strong>Dr. Marcus Chen</strong> and dispatched instantly.</span>
            </div>

            <Button
              type="submit"
              className="bg-[#143827] hover:bg-[#0E2419] text-[#C6F052] rounded-full text-xs font-bold px-6 py-2.5 flex items-center gap-2 shadow-md shadow-[#143827]/15"
            >
              <Send size={14} />
              <span>Send Prescription to Patient</span>
            </Button>
          </div>
        </form>
      </div>

    </div>
  )
}
