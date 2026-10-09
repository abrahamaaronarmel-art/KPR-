"use client"

import { useState, useEffect } from "react"
import { 
  X, Printer, Download, Share2, ShieldCheck, CheckCircle2, 
  FileText, Activity, AlertCircle, Calendar, User, Stethoscope, 
  Building2, QrCode, Sparkles, HeartPulse, Pill, Check, Copy
} from "lucide-react"
import { Button } from "@/components/ui/button"

export interface MedicalDocument {
  id: string
  name: string
  date: string
  doctor: string
  doctorTitle?: string
  doctorRegNo?: string
  department: string
  facility: string
  type: "Lab Result" | "Clinical Report" | "Prescription"
  status: "Final / Verified" | "Signed" | "Normal"
  patientName?: string
  patientId?: string
  patientAge?: string
  patientGender?: string
  abhaId?: string
  labResults?: {
    category: string
    tests: {
      name: string
      result: string
      unit: string
      reference: string
      status: "normal" | "high" | "low" | "optimal"
    }[]
  }[]
  radiologyReport?: {
    modality: string
    indication: string
    findings: string[]
    impression: string
    recommendations: string
  }
  prescription?: {
    diagnosis: string
    vitals: { name: string; value: string }[]
    medications: {
      name: string
      dosage: string
      frequency: string
      duration: string
      instructions: string
    }[]
    advice: string[]
    followUp: string
  }
}

export const DEMO_MEDICAL_REPORTS: MedicalDocument[] = [
  {
    id: "rep-blood-001",
    name: "Annual Blood Work.pdf",
    date: "Oct 12, 2025",
    doctor: "Dr. Sarah Jenkins, MD (Pathology)",
    doctorTitle: "Senior Consultant Clinical Pathologist",
    doctorRegNo: "MCI-48921-TN",
    department: "Department of Clinical Biochemistry & Hematology",
    facility: "Indira Gandhi Govt General Hospital & Central Diagnostic Lab",
    type: "Lab Result",
    status: "Final / Verified",
    patientAge: "34 Y",
    patientGender: "Male",
    labResults: [
      {
        category: "Complete Blood Count (CBC) - Hematology",
        tests: [
          { name: "Hemoglobin (Hb)", result: "14.8", unit: "g/dL", reference: "13.0 - 17.0", status: "normal" },
          { name: "Total Leukocyte Count (WBC)", result: "6,800", unit: "cells/mcL", reference: "4,000 - 11,000", status: "normal" },
          { name: "Platelet Count", result: "245,000", unit: "mcL", reference: "150,000 - 450,000", status: "normal" },
          { name: "Packed Cell Volume (PCV)", result: "43.5", unit: "%", reference: "40.0 - 50.0", status: "normal" },
          { name: "Erythrocyte Sedimentation Rate (ESR)", result: "9", unit: "mm/hr", reference: "0 - 15", status: "normal" }
        ]
      },
      {
        category: "Metabolic & Lipid Profile - Biochemistry",
        tests: [
          { name: "Fasting Blood Glucose", result: "92", unit: "mg/dL", reference: "70 - 99", status: "optimal" },
          { name: "Glycated Hemoglobin (HbA1c)", result: "5.4", unit: "%", reference: "< 5.7 (Normal)", status: "optimal" },
          { name: "Total Cholesterol", result: "182", unit: "mg/dL", reference: "< 200", status: "normal" },
          { name: "HDL Cholesterol (Good)", result: "54", unit: "mg/dL", reference: "> 40", status: "normal" },
          { name: "LDL Cholesterol (Bad)", result: "108", unit: "mg/dL", reference: "< 100", status: "high" },
          { name: "Triglycerides", result: "128", unit: "mg/dL", reference: "< 150", status: "normal" }
        ]
      },
      {
        category: "Renal & Hepatic Panel",
        tests: [
          { name: "Serum Creatinine", result: "0.95", unit: "mg/dL", reference: "0.7 - 1.3", status: "normal" },
          { name: "Blood Urea Nitrogen (BUN)", result: "14", unit: "mg/dL", reference: "7 - 20", status: "normal" },
          { name: "SGPT / ALT (Liver Enzyme)", result: "28", unit: "U/L", reference: "< 45", status: "normal" },
          { name: "Vitamin D3 (25-OH)", result: "32.4", unit: "ng/mL", reference: "30.0 - 100.0", status: "optimal" }
        ]
      }
    ]
  },
  {
    id: "rep-xray-002",
    name: "Chest X-Ray Summary.pdf",
    date: "Sep 28, 2025",
    doctor: "Dr. Michael Chen, MD (Radiodiagnosis)",
    doctorTitle: "Chief Radiologist & Imaging Consultant",
    doctorRegNo: "MCI-31094-PY",
    department: "Department of Radiodiagnosis & Imaging",
    facility: "JIPMER Super-Specialty Medical Institute",
    type: "Clinical Report",
    status: "Final / Verified",
    patientAge: "34 Y",
    patientGender: "Male",
    radiologyReport: {
      modality: "Digital Radiography (DR) - Chest PA View",
      indication: "Routine medical evaluation and respiratory baseline clearance.",
      findings: [
        "Both lung parenchyma appear clear and well aerated with no active focal consolidation, infiltrates, or mass lesions.",
        "Costophrenic and cardiophrenic angles are well-defined, acute, and free of pleural effusion.",
        "The cardiac silhouette is within normal size limits; cardiothoracic ratio is < 50%.",
        "Aortic arch and mediastinal contours are normal in position and morphology.",
        "Trachea is midline and patent.",
        "Visualized ribs, clavicles, scapulae, and soft tissues show no traumatic fracture or lytic lesion."
      ],
      impression: "NORMAL CHEST RADIOGRAPH (PA VIEW). No acute pulmonary consolidation, effusion, or cardiomegaly identified.",
      recommendations: "No immediate radiologic intervention needed. Maintain routine follow-up as clinically indicated."
    }
  },
  {
    id: "rep-rx-003",
    name: "Amoxicillin Prescription.pdf",
    date: "Sep 15, 2025",
    doctor: "Dr. Emily Rodriguez, MBBS, MD (Internal Med)",
    doctorTitle: "Primary Care & Infectious Disease Specialist",
    doctorRegNo: "MCI-77341-PY",
    department: "Outpatient General Medicine (OPD-3)",
    facility: "Villianur Primary Health Centre (PHC), Puducherry",
    type: "Prescription",
    status: "Signed",
    patientAge: "34 Y",
    patientGender: "Male",
    prescription: {
      diagnosis: "Acute Bacterial Upper Respiratory Tract Infection (Streptococcal Pharyngitis)",
      vitals: [
        { name: "Blood Pressure", value: "118 / 78 mmHg" },
        { name: "Pulse Rate", value: "76 bpm (Regular)" },
        { name: "Body Temp", value: "98.6 °F (Afebrile)" },
        { name: "SpO2 (Room Air)", value: "99%" },
        { name: "Body Weight", value: "68.5 kg" }
      ],
      medications: [
        {
          name: "Tab. Amoxicillin & Potassium Clavulanate (Augmentin)",
          dosage: "625 mg",
          frequency: "1 tablet - Twice Daily (After Meals)",
          duration: "5 Days",
          instructions: "Complete full 5-day course even if throat discomfort resolves earlier."
        },
        {
          name: "Tab. Paracetamol (Dolo)",
          dosage: "650 mg",
          frequency: "1 tablet - SOS / As needed (Max 3/day)",
          duration: "3 Days",
          instructions: "Take only if throat ache or fever exceeds 99°F."
        },
        {
          name: "Cap. Pantoprazole (Pan-40)",
          dosage: "40 mg",
          frequency: "1 capsule - Morning (Empty Stomach)",
          duration: "5 Days",
          instructions: "Take 30 minutes before breakfast with a glass of water."
        },
        {
          name: "Tab. Levocetirizine",
          dosage: "5 mg",
          frequency: "1 tablet - At Bedtime",
          duration: "5 Days",
          instructions: "Helps relieve rhinorrhea, sneezing, and post-nasal drip."
        }
      ],
      advice: [
        "Warm salt water gargle 3-4 times daily for soothing pharyngeal mucosa.",
        "Maintain high oral hydration: Drink 2.5 - 3 Litres of lukewarm water daily.",
        "Avoid cold beverages, refrigerated foods, and smoking / dust exposure."
      ],
      followUp: "Review after 5 days if throat pain persists or if high-grade fever develops."
    }
  }
]

interface MedicalReportModalProps {
  isOpen: boolean
  onClose: () => void
  initialDocId?: string
}

export function MedicalReportModal({ isOpen, onClose, initialDocId }: MedicalReportModalProps) {
  const [selectedDocId, setSelectedDocId] = useState<string>(initialDocId || DEMO_MEDICAL_REPORTS[0].id)
  const [copied, setCopied] = useState(false)
  const [userName, setUserName] = useState("Rajesh Kumar")
  const [patientCode, setPatientCode] = useState("PT-8891")
  const [abhaId, setAbhaId] = useState("rajesh.kumar@abdm")

  useEffect(() => {
    if (initialDocId) {
      setSelectedDocId(initialDocId)
    }
  }, [initialDocId])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("medrelay.user_name")
      if (storedName) setUserName(storedName)

      const storedCode = localStorage.getItem("medrelay.user_unique_code")
      if (storedCode) setPatientCode(storedCode)

      const storedAbha = localStorage.getItem("medrelay.abha")
      if (storedAbha) setAbhaId(storedAbha)
    }
  }, [isOpen])

  if (!isOpen) return null

  const currentDoc = DEMO_MEDICAL_REPORTS.find(d => d.id === selectedDocId) || DEMO_MEDICAL_REPORTS[0]

  const handlePrint = () => {
    window.print()
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://abdm.gov.in/records/verify/${patientCode}/${currentDoc.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const reportData = JSON.stringify({
      facility: currentDoc.facility,
      documentName: currentDoc.name,
      patient: { name: userName, id: patientCode, abha: abhaId },
      date: currentDoc.date,
      doctor: currentDoc.doctor,
      data: currentDoc
    }, null, 2)

    const blob = new Blob([reportData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${currentDoc.name.replace('.pdf', '')}-${patientCode}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
        
        {/* Top Action Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <FileText size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base tracking-tight text-white">Digital Health Record Viewer</h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-400/30">
                  <ShieldCheck size={12} /> ABDM FHIR R4 Compliant
                </span>
              </div>
              <p className="text-xs text-slate-400">National Health Authority • Ayushman Bharat Digital Mission</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 h-8 px-2.5 sm:px-3 text-xs"
            >
              <Printer size={14} className="sm:mr-1.5" />
              <span className="hidden sm:inline">Print Report</span>
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleDownload}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 h-8 px-2.5 sm:px-3 text-xs"
            >
              <Download size={14} className="sm:mr-1.5" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Document Selection Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap mr-1">
            Documents:
          </span>
          {DEMO_MEDICAL_REPORTS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDocId(doc.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedDocId === doc.id
                  ? "bg-white text-slate-900 shadow-sm border border-slate-300 font-semibold"
                  : "text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {doc.type === "Lab Result" && <Activity size={13} className="text-blue-500" />}
              {doc.type === "Clinical Report" && <HeartPulse size={13} className="text-emerald-500" />}
              {doc.type === "Prescription" && <Pill size={13} className="text-purple-500" />}
              <span>{doc.name}</span>
            </button>
          ))}
        </div>

        {/* Report Content Body (Printable Paper Style) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
          <div className="bg-white border border-slate-300 rounded-xl shadow-sm p-6 sm:p-8 max-w-3xl mx-auto print:border-none print:shadow-none print:p-0">
            
            {/* Official Hospital / Clinic Header */}
            <div className="border-b-2 border-slate-900 pb-5 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shrink-0">
                    <Building2 size={26} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
                      {currentDoc.facility}
                    </h2>
                    <p className="text-xs font-semibold text-teal-700 mt-0.5">
                      {currentDoc.department}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Govt. of Puducherry • Ayushman Bharat Health Facility Registry (HFR ID: PY-49021)
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right bg-slate-50 p-2.5 rounded-lg border border-slate-200 shrink-0">
                  <div className="flex items-center sm:justify-end gap-1.5 text-xs font-bold text-slate-800">
                    <QrCode size={14} className="text-slate-600" />
                    <span>VERIFIED RECORD</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">AUTH: NHA-ABDM-PY-2025</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase mt-0.5 flex items-center sm:justify-end gap-1">
                    <CheckCircle2 size={11} /> {currentDoc.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Patient & Order Demographics Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs text-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Patient Name</span>
                <span className="font-bold text-slate-900 text-sm">{userName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Patient ID / UHID</span>
                <span className="font-mono font-bold text-slate-900">{patientCode}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Age / Gender</span>
                <span className="font-semibold text-slate-900">{currentDoc.patientAge} / {currentDoc.patientGender}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Date & Time</span>
                <span className="font-semibold text-slate-900">{currentDoc.date}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">ABHA Number / Address</span>
                <span className="font-mono text-teal-700 font-semibold">{abhaId}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Document Type</span>
                <span className="font-semibold text-slate-900">{currentDoc.type}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Consultant / Referring Doctor</span>
                <span className="font-bold text-slate-900">{currentDoc.doctor}</span>
                <span className="text-[11px] text-slate-500 block">{currentDoc.doctorTitle} (Reg: {currentDoc.doctorRegNo})</span>
              </div>
            </div>

            {/* DOCUMENT BODY VARIANT 1: LAB RESULTS (CBC, LIPID, RENAL) */}
            {currentDoc.labResults && (
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded-r-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity size={18} className="text-blue-700" />
                    <span className="font-bold text-sm text-blue-950">Diagnostic Laboratory Findings & Quantitative Values</span>
                  </div>
                  <span className="text-xs font-semibold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                    NABL ISO-15189 Accredited
                  </span>
                </div>

                {currentDoc.labResults.map((category, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                    <div className="bg-slate-100/90 px-4 py-2.5 border-b border-slate-200 font-bold text-xs text-slate-800 uppercase tracking-wide">
                      {category.category}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                            <th className="px-4 py-2.5">Test Parameter</th>
                            <th className="px-4 py-2.5">Observed Value</th>
                            <th className="px-4 py-2.5">Unit</th>
                            <th className="px-4 py-2.5">Biological Reference Interval</th>
                            <th className="px-4 py-2.5 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {category.tests.map((test, tIdx) => (
                            <tr key={tIdx} className="hover:bg-slate-50/70 transition-colors">
                              <td className="px-4 py-2.5 font-medium text-slate-900">{test.name}</td>
                              <td className={`px-4 py-2.5 font-bold ${
                                test.status === "high" ? "text-amber-700" : test.status === "low" ? "text-red-600" : "text-slate-900"
                              }`}>
                                {test.result}
                              </td>
                              <td className="px-4 py-2.5 text-slate-500">{test.unit}</td>
                              <td className="px-4 py-2.5 text-slate-600 font-mono text-[11px]">{test.reference}</td>
                              <td className="px-4 py-2.5 text-right">
                                {test.status === "normal" && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                    <Check size={10} /> Normal
                                  </span>
                                )}
                                {test.status === "optimal" && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                                    <Sparkles size={10} /> Optimal
                                  </span>
                                )}
                                {test.status === "high" && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                    <AlertCircle size={10} /> Borderline High
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                {/* Pathologist Clinical Remarks */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <Stethoscope size={14} className="text-teal-600" />
                    Clinical Pathologist Impression & Advisory:
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Hematology panel shows normal red blood cell and platelet indices. Blood glucose and renal markers are optimal. Lipid profile indicates mild borderline LDL elevation; recommended to maintain balanced dietary intake, low saturated fats, and routine physical activity.
                  </p>
                </div>
              </div>
            )}

            {/* DOCUMENT BODY VARIANT 2: RADIOLOGY (CHEST X-RAY) */}
            {currentDoc.radiologyReport && (
              <div className="space-y-6">
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded-r-lg">
                  <h3 className="font-bold text-sm text-emerald-950">Diagnostic Imaging & Radiologic Findings</h3>
                  <p className="text-xs text-emerald-800 mt-0.5">Modality: {currentDoc.radiologyReport.modality}</p>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clinical Indication</h4>
                    <p className="text-xs text-slate-800 font-medium mt-1">{currentDoc.radiologyReport.indication}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Observations & Anatomical Findings</h4>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {currentDoc.radiologyReport.findings.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="text-teal-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border border-emerald-200 rounded-lg p-3.5 mt-3 shadow-xs">
                    <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Radiological Impression</h4>
                    <p className="text-xs font-bold text-emerald-950 mt-1 leading-relaxed">
                      {currentDoc.radiologyReport.impression}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recommendations</h4>
                    <p className="text-xs text-slate-700 mt-1">{currentDoc.radiologyReport.recommendations}</p>
                  </div>
                </div>
              </div>
            )}

            {/* DOCUMENT BODY VARIANT 3: E-PRESCRIPTION */}
            {currentDoc.prescription && (
              <div className="space-y-6">
                <div className="bg-purple-50 border-l-4 border-purple-600 p-3 rounded-r-lg flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-purple-950">Ayushman Digital E-Prescription (Rx)</h3>
                    <p className="text-xs text-purple-800 mt-0.5">Diagnosis: {currentDoc.prescription.diagnosis}</p>
                  </div>
                  <span className="text-xs font-bold text-purple-800 bg-white px-2.5 py-1 rounded border border-purple-200">
                    OPD Consultation
                  </span>
                </div>

                {/* Vitals Bar */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap gap-4 text-xs">
                  {currentDoc.prescription.vitals.map((v, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-500">{v.name}:</span>
                      <span className="font-semibold text-slate-900">{v.value}</span>
                    </div>
                  ))}
                </div>

                {/* Medications Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-xs text-slate-800 uppercase tracking-wide flex items-center gap-2">
                    <Pill size={14} className="text-purple-600" />
                    Prescribed Medications & Dosage Schedule
                  </div>
                  <div className="divide-y divide-slate-100">
                    {currentDoc.prescription.medications.map((med, idx) => (
                      <div key={idx} className="p-4 hover:bg-slate-50 transition-colors text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-slate-900">{idx + 1}. {med.name}</span>
                          <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">{med.dosage}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-slate-600 font-medium">
                          <span><strong>Frequency:</strong> {med.frequency}</span>
                          <span><strong>Duration:</strong> {med.duration}</span>
                        </div>
                        <p className="text-[11px] text-teal-700 font-semibold mt-1">
                          💡 Instruction: {med.instructions}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lifestyle Advice & Follow Up */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                    <h4 className="font-bold text-slate-800 mb-1.5">Dietary & Self-Care Advice:</h4>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      {currentDoc.prescription.advice.map((adv, idx) => (
                        <li key={idx}>{adv}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-3.5">
                    <h4 className="font-bold text-purple-900 mb-1">Follow-up Schedule:</h4>
                    <p className="text-slate-700">{currentDoc.prescription.followUp}</p>
                    <p className="text-[10px] text-slate-500 mt-2 font-mono">Emergency Escalation: Dial 108 or report to nearest PHC.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Doctor Signature & Authenticity Stamp */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-teal-700">
                  <ShieldCheck size={16} />
                  <span>Authenticated Digital Health Record</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Secured with SHA-256 cryptographic checksum under ABDM Health Information Provider (HIP) standard.
                </p>
              </div>

              <div className="text-center sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0">
                <p className="font-serif italic text-base font-bold text-slate-900">{currentDoc.doctor}</p>
                <p className="text-[11px] font-bold text-slate-700">{currentDoc.doctorTitle}</p>
                <p className="text-[10px] text-slate-400">Reg. No: {currentDoc.doctorRegNo}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-white border-t border-slate-200 px-5 py-3 flex items-center justify-between shrink-0">
          <button
            onClick={handleCopyLink}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? "ABDM Link Copied!" : "Copy ABHA Record Link"}</span>
          </button>

          <Button onClick={onClose} className="bg-slate-900 hover:bg-slate-800 text-white text-xs h-8 px-4">
            Close Viewer
          </Button>
        </div>

      </div>
    </div>
  )
}

