"use client"

import { useState } from "react"
import { 
  FileText, Search, User, Filter, ChevronRight, Activity, 
  FlaskConical, Download, Eye, Sparkles, Pill, CheckCircle2, 
  Clock, AlertTriangle, ShieldAlert, HeartPulse, ChevronLeft, Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MedicalReportModal } from "@/components/MedicalReportModal"

interface PatientProfile {
  id: string
  name: string
  age: string
  gender: string
  bloodGroup: string
  patientCode: string
  abhaId: string
  residence: string
  primaryCondition: string
  risk: "CRITICAL" | "HIGH RISK" | "MODERATE" | "ROUTINE"
  docId: string
  allergies: string
  vitals: { bp: string; pulse: string; temp: string; spo2: string }
  medicineActivity: {
    medName: string
    dosage: string
    timing24: string
    status: "Taken" | "Upcoming" | "Missed"
    lastTaken: string
  }[]
  diagnosticSummary: string
  lastVisit24: string
}

export default function DoctorPatientRecords() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile | null>(null)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [selectedDocId, setSelectedDocId] = useState("rep-xray-002")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const patientsList: PatientProfile[] = [
    {
      id: "pt-1",
      name: "Rajesh Kumar",
      age: "34 Y",
      gender: "Male",
      bloodGroup: "O+",
      patientCode: "PT-8891",
      abhaId: "91-4902-8819-2041",
      residence: "Villianur, Puducherry",
      primaryCondition: "Right Distal Radius Bone Fracture",
      risk: "HIGH RISK",
      docId: "rep-xray-002",
      allergies: "Sulfa Antibiotics",
      vitals: { bp: "118/78", pulse: "76 bpm", temp: "98.6°F", spo2: "99%" },
      diagnosticSummary: "Digital Radiograph PA/Lateral shows non-displaced extra-articular distal radius fracture.",
      lastVisit24: "09-10-2026 09:30 HRS",
      medicineActivity: [
        { medName: "Cefuroxime Axetil 500mg", dosage: "1-0-1", timing24: "08:30 & 20:30 HRS", status: "Taken", lastTaken: "08:30 HRS Today" },
        { medName: "Aceclofenac 100mg + Paracetamol 325mg", dosage: "1-0-1", timing24: "08:30 & 20:30 HRS", status: "Taken", lastTaken: "08:30 HRS Today" },
        { medName: "Calcium Carbonate + Vit D3", dosage: "0-1-0", timing24: "13:30 HRS", status: "Upcoming", lastTaken: "Yesterday 13:30 HRS" }
      ]
    },
    {
      id: "pt-2",
      name: "Priya Sundaram",
      age: "28 Y",
      gender: "Female",
      bloodGroup: "B+",
      patientCode: "PT-4421",
      abhaId: "91-3820-1129-4402",
      residence: "Lawspet, Puducherry",
      primaryCondition: "Hypertensive Headache & Migraine Aura",
      risk: "MODERATE",
      docId: "rep-blood-001",
      allergies: "No Known Drug Allergies (NKDA)",
      vitals: { bp: "135/88", pulse: "82 bpm", temp: "98.4°F", spo2: "98%" },
      diagnosticSummary: "Metabolic panel normal. Sodium 138 mEq/L, Potassium 4.2 mEq/L. Blood pressure elevated.",
      lastVisit24: "09-10-2026 11:00 HRS",
      medicineActivity: [
        { medName: "Telmisartan 40mg", dosage: "1-0-0", timing24: "08:00 HRS", status: "Taken", lastTaken: "08:00 HRS Today" },
        { medName: "Naproxen Sodium 500mg", dosage: "SOS (As Needed)", timing24: "On Migraine Episode", status: "Taken", lastTaken: "Yesterday 21:00 HRS" }
      ]
    },
    {
      id: "pt-3",
      name: "Murugan Swamy",
      age: "58 Y",
      gender: "Male",
      bloodGroup: "A+",
      patientCode: "PT-9102",
      abhaId: "91-8841-9920-3301",
      residence: "Ozhukarai, Puducherry",
      primaryCondition: "Acute STEMI / Anterior Wall MI",
      risk: "CRITICAL",
      docId: "rep-blood-001",
      allergies: "Penicillin",
      vitals: { bp: "155/98", pulse: "108 bpm", temp: "99.1°F", spo2: "94%" },
      diagnosticSummary: "12-Lead ECG: Marked ST Elevation in leads V1-V4. Troponin-I > 15 ng/mL.",
      lastVisit24: "09-10-2026 14:15 HRS",
      medicineActivity: [
        { medName: "Aspirin 300mg (Loading Dose)", dosage: "Stat", timing24: "14:15 HRS", status: "Taken", lastTaken: "14:15 HRS Today" },
        { medName: "Clopidogrel 300mg", dosage: "Stat", timing24: "14:15 HRS", status: "Taken", lastTaken: "14:15 HRS Today" },
        { medName: "Atorvastatin 80mg", dosage: "0-0-1", timing24: "21:00 HRS", status: "Upcoming", lastTaken: "Scheduled Tonight" }
      ]
    },
    {
      id: "pt-4",
      name: "Kavitha Ranganathan",
      age: "42 Y",
      gender: "Female",
      bloodGroup: "AB+",
      patientCode: "PT-2091",
      abhaId: "91-5501-8841-2099",
      residence: "Muthialpet, Puducherry",
      primaryCondition: "Post-Operative Ankle Cast Removal",
      risk: "ROUTINE",
      docId: "rep-xray-002",
      allergies: "Aspirin (Mild Gastritis)",
      vitals: { bp: "120/80", pulse: "72 bpm", temp: "98.6°F", spo2: "99%" },
      diagnosticSummary: "Bony union confirmed on distal fibula radiograph. Full weight-bearing cleared.",
      lastVisit24: "09-10-2026 16:30 HRS",
      medicineActivity: [
        { medName: "Calcium + Vit D3", dosage: "1-0-0", timing24: "08:30 HRS", status: "Taken", lastTaken: "08:30 HRS Today" },
        { medName: "Diclofenac Gel (Topical)", dosage: "TDS (3x Daily)", timing24: "08:00, 14:00, 20:00 HRS", status: "Taken", lastTaken: "14:00 HRS Today" }
      ]
    }
  ]

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleOpenReport = (docId: string) => {
    setSelectedDocId(docId)
    setIsReportModalOpen(true)
  }

  const filteredPatients = patientsList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.patientCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.primaryCondition.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

      {/* Patient Detailed Inspector Modal (Report in View & Medicine Activity) */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-[#E2E8D5] space-y-6 max-h-[92vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E2E8D5] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#143827] text-[#C6F052] font-black text-lg flex items-center justify-center shadow-xs">
                  {selectedPatient.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-black text-xl text-[#143827]">{selectedPatient.name}</h3>
                  <p className="text-xs text-[#5E806E]">
                    {selectedPatient.age} • {selectedPatient.gender} • Blood Group: <strong className="text-rose-700">{selectedPatient.bloodGroup}</strong> • UHID: <strong>{selectedPatient.patientCode}</strong>
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedPatient(null)}
                className="p-2 rounded-full hover:bg-[#F6F8F0] text-slate-500"
              >
                ✕
              </button>
            </div>

            {/* Vitals Summary */}
            <div className="bg-[#F4F6EC] border border-[#E2E8D5] rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#5E806E] block">Blood Pressure</span>
                <span className="font-black text-[#143827] text-sm">{selectedPatient.vitals.bp} mmHg</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#5E806E] block">Pulse Rate</span>
                <span className="font-black text-[#143827] text-sm">{selectedPatient.vitals.pulse}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#5E806E] block">Body Temp</span>
                <span className="font-black text-[#143827] text-sm">{selectedPatient.vitals.temp}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#5E806E] block">SpO2 Oxygen</span>
                <span className="font-black text-emerald-800 text-sm">{selectedPatient.vitals.spo2}</span>
              </div>
            </div>

            {/* DIAGNOSTIC REPORT SECTION */}
            <div className="bg-white border border-[#E2E8D5] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#143827] flex items-center gap-1.5">
                  <FileText size={15} className="text-emerald-700" />
                  <span>Diagnostic Report Summary</span>
                </span>
                <Button
                  size="sm"
                  onClick={() => handleOpenReport(selectedPatient.docId)}
                  className="bg-[#143827] hover:bg-[#0E2419] text-[#C6F052] rounded-full text-xs font-bold h-8 px-4"
                >
                  <Eye size={13} className="mr-1.5" />
                  <span>View Full Diagnostic Report</span>
                </Button>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed bg-[#F6F8F0] p-3 rounded-xl">
                {selectedPatient.diagnosticSummary}
              </p>
            </div>

            {/* MEDICINE ACTIVITY & COMPLIANCE TIMELINE */}
            <div className="bg-white border border-[#E2E8D5] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#143827] flex items-center gap-1.5">
                  <Pill size={15} className="text-emerald-700" />
                  <span>Medicine Activity &amp; Dosage Schedule (24-Hour)</span>
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Live Compliance Tracked
                </span>
              </div>

              <div className="space-y-2.5 pt-1">
                {selectedPatient.medicineActivity.map((med, idx) => (
                  <div key={idx} className="p-3 bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <Pill size={14} />
                      </div>
                      <div>
                        <div className="font-black text-[#143827]">{med.medName}</div>
                        <div className="text-[11px] text-[#5E806E]">Dosage: {med.dosage} • 24h Timing: <strong>{med.timing24}</strong></div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block ${
                        med.status === "Taken" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {med.status}
                      </span>
                      <div className="text-[10px] text-[#5E806E] mt-0.5">{med.lastTaken}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                onClick={() => setSelectedPatient(null)}
                className="bg-[#143827] text-white hover:bg-[#0E2419] rounded-full text-xs font-bold px-6"
              >
                Close Record
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#143827]">Patient Records</h1>
          <p className="text-xs text-[#5E806E] font-medium mt-1">
            Slide through patient profile cards to view comprehensive diagnostic reports &amp; medicine adherence activity
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, UHID, or disease..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#E2E8D5] rounded-full text-xs font-bold text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827]"
          />
        </div>
      </div>

      {/* HORIZONTAL SLIDE CARDS / CAROUSEL BAR FOR PATIENT PROFILES */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-[#5E806E] flex items-center gap-1.5">
            <User size={14} />
            <span>Select Patient Profile Slide Card</span>
          </span>
          <span className="text-xs text-[#5E806E] font-medium">Click any slide card to inspect report &amp; medicines</span>
        </div>

        {/* Horizontal Slide Scroll Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className="min-w-[280px] sm:min-w-[320px] bg-white border border-[#E2E8D5] hover:border-[#143827] hover:shadow-lg rounded-[28px] p-5 cursor-pointer transition-all duration-200 snap-start flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                
                {/* Avatar & Risk */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#143827] text-[#C6F052] font-black text-base flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                    {patient.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                    patient.risk === "CRITICAL" ? "bg-rose-600 text-white animate-pulse" :
                    patient.risk === "HIGH RISK" ? "bg-amber-500 text-white" :
                    "bg-emerald-100 text-emerald-800"
                  }`}>
                    {patient.risk}
                  </span>
                </div>

                {/* Patient Details */}
                <div>
                  <h3 className="font-black text-base text-[#143827] group-hover:text-emerald-800 transition-colors">
                    {patient.name}
                  </h3>
                  <p className="text-xs text-[#5E806E] mt-0.5">
                    {patient.age} • {patient.gender} • UHID: <strong className="font-mono text-[#143827]">{patient.patientCode}</strong>
                  </p>
                </div>

                {/* Primary Condition */}
                <div className="bg-[#F6F8F0] p-2.5 rounded-xl border border-[#E2E8D5] text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#5E806E] block">Condition</span>
                  <span className="font-bold text-[#143827] line-clamp-1">{patient.primaryCondition}</span>
                </div>

              </div>

              {/* Bottom Card Action */}
              <div className="pt-3 border-t border-[#E2E8D5] flex items-center justify-between text-xs font-bold text-[#143827]">
                <span className="text-[11px] text-[#5E806E] font-mono">24h: {patient.lastVisit24.split(" ")[1]} HRS</span>
                <span className="text-[#143827] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* DETAILED PATIENT SUMMARY TABLE */}
      <div className="bg-white border border-[#E2E8D5] rounded-[32px] p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-black text-[#143827]">All Patient Clinical Logs</h2>
        
        <div className="overflow-x-auto rounded-2xl border border-[#E2E8D5]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F6F8F0] border-b border-[#E2E8D5] text-[#5E806E] font-bold">
                <th className="px-5 py-3.5">Patient Profile</th>
                <th className="px-5 py-3.5">Primary Diagnosis</th>
                <th className="px-5 py-3.5">Current Medicine Activity</th>
                <th className="px-5 py-3.5">24h Vitals</th>
                <th className="px-5 py-3.5 text-right">Inspect Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8D5]">
              {filteredPatients.map((p) => (
                <tr key={p.id} className="hover:bg-[#F6F8F0]/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-black text-sm text-[#143827]">{p.name}</div>
                    <div className="text-[11px] text-[#5E806E]">{p.age} • {p.gender} • <span className="font-mono">{p.patientCode}</span></div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-800 max-w-xs">
                    <div>{p.primaryCondition}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-[#143827] flex items-center gap-1">
                      <Pill size={12} className="text-emerald-700" />
                      <span>{p.medicineActivity[0]?.medName}</span>
                    </div>
                    <div className="text-[11px] text-[#5E806E]">{p.medicineActivity.length} active prescriptions</div>
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-700">
                    <div>BP: <strong>{p.vitals.bp}</strong></div>
                    <div className="text-[11px] text-[#5E806E]">SpO2: {p.vitals.spo2}</div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button
                      size="sm"
                      onClick={() => setSelectedPatient(p)}
                      className="bg-[#143827] hover:bg-[#0E2419] text-[#C6F052] rounded-full text-xs font-bold h-8 px-3.5"
                    >
                      <Eye size={12} className="mr-1.5" />
                      <span>View Profile &amp; Rx</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
