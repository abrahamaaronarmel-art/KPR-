"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FileText, Download, FilePlus, Eye, FolderHeart, 
  FlaskConical, Pill, ShieldCheck, Clock, CheckCircle2, 
  ExternalLink, Sparkles
} from "lucide-react"
import { MedicalReportModal, DEMO_MEDICAL_REPORTS } from "@/components/MedicalReportModal"
import { AbhaModal } from "@/components/AbhaModal"

const CONSENT_LOG = [
  { requester: "Indira Gandhi Govt General Hospital, Pondicherry (HIU)", purpose: "Cardiology referral review", status: "Granted", date: "Oct 3, 2025" },
  { requester: "Villianur PHC, Pondicherry (HIU)", purpose: "Referral continuity check", status: "Granted", date: "Oct 3, 2025" },
  { requester: "Third-party insurance partner", purpose: "Claim verification", status: "Denied", date: "Sep 18, 2025" },
]

function downloadFhirBundle() {
  const storedName = typeof window !== "undefined" ? localStorage.getItem("medrelay.user_name") || "Rajesh Kumar" : "Rajesh Kumar"
  const storedAbha = typeof window !== "undefined" ? localStorage.getItem("medrelay.abha") || "91-4902-8819-2041" : "91-4902-8819-2041"
  const storedCode = typeof window !== "undefined" ? localStorage.getItem("medrelay.user_unique_code") || "PT-8891" : "PT-8891"

  const bundle = {
    resourceType: "Bundle",
    type: "collection",
    id: `bundle-${storedCode.toLowerCase()}`,
    meta: { 
      profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DischargeSummaryRecord"],
      lastUpdated: new Date().toISOString()
    },
    entry: [
      {
        resource: {
          resourceType: "Patient",
          id: storedCode,
          identifier: [{ system: "https://healthid.ndhm.gov.in", value: storedAbha }],
          name: [{ text: storedName }],
          gender: "male",
          birthDate: "1992-05-14"
        },
      },
      {
        resource: {
          resourceType: "DiagnosticReport",
          id: "diag-rep-001",
          status: "final",
          code: { text: "Annual Blood Work (CBC & Lipid Profile)" },
          issued: "2025-10-12",
          performer: [{ display: "Dr. Sarah Jenkins, MD (Pathology)" }],
        },
      },
      {
        resource: {
          resourceType: "DiagnosticReport",
          id: "diag-rep-002",
          status: "final",
          code: { text: "Chest X-Ray Digital PA View" },
          issued: "2025-09-28",
          performer: [{ display: "Dr. Michael Chen, MD (Radiology)" }],
        },
      },
      {
        resource: {
          resourceType: "MedicationRequest",
          id: "med-req-003",
          status: "active",
          intent: "order",
          medicationCodeableConcept: { text: "Amoxicillin & Clavulanate 625mg + Paracetamol" },
          authoredOn: "2025-09-15",
          requester: { display: "Dr. Emily Rodriguez, MBBS, MD" }
        }
      }
    ],
  }
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `medrelay-abdm-fhir-${storedCode}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export default function MedicalRecordsPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [selectedDocId, setSelectedDocId] = useState<string>("rep-blood-001")
  const [isAbhaModalOpen, setIsAbhaModalOpen] = useState(false)
  const [abhaLinked, setAbhaLinked] = useState(false)
  const [userName, setUserName] = useState("Rajesh Kumar")
  const [patientCode, setPatientCode] = useState("PT-8891")
  const [uploadMessage, setUploadMessage] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("medrelay.user_name")
      if (storedName) setUserName(storedName)

      const storedCode = localStorage.getItem("medrelay.user_unique_code")
      if (storedCode) setPatientCode(storedCode)

      const storedAbha = localStorage.getItem("medrelay.abha")
      if (storedAbha) setAbhaLinked(true)
    }
  }, [])

  const categories = [
    { name: "Clinical Reports", icon: FolderHeart, count: 12, docId: "rep-xray-002", badge: "Radiology & ECG" },
    { name: "Lab Results", icon: FlaskConical, count: 5, docId: "rep-blood-001", badge: "Hematology & Lipid" },
    { name: "Prescriptions", icon: Pill, count: 8, docId: "rep-rx-003", badge: "OPD & Follow-ups" },
  ]

  const recentFiles = [
    { 
      id: "rep-blood-001",
      name: "Annual Blood Work.pdf", 
      date: "Oct 12, 2025", 
      doctor: "Dr. Sarah Jenkins", 
      type: "Lab Result",
      category: "Biochemistry & CBC",
      facility: "Indira Gandhi Govt General Hospital"
    },
    { 
      id: "rep-xray-002",
      name: "Chest X-Ray Summary.pdf", 
      date: "Sep 28, 2025", 
      doctor: "Dr. Michael Chen", 
      type: "Clinical Report",
      category: "Digital Radiography PA",
      facility: "JIPMER Medical Institute"
    },
    { 
      id: "rep-rx-003",
      name: "Amoxicillin Prescription.pdf", 
      date: "Sep 15, 2025", 
      doctor: "Dr. Emily Rodriguez", 
      type: "Prescription",
      category: "Infectious Disease OPD",
      facility: "Villianur PHC, Puducherry"
    },
  ]

  const handleOpenReport = (docId: string) => {
    setSelectedDocId(docId)
    setIsReportModalOpen(true)
  }

  const handleDownloadSingleReport = (docId: string, docName: string) => {
    const doc = DEMO_MEDICAL_REPORTS.find(d => d.id === docId) || DEMO_MEDICAL_REPORTS[0]
    const reportData = JSON.stringify({
      facility: doc.facility,
      documentName: doc.name,
      patient: { name: userName, id: patientCode },
      date: doc.date,
      doctor: doc.doctor,
      data: doc
    }, null, 2)

    const blob = new Blob([reportData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${docName.replace('.pdf', '')}-${patientCode}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSimulateUpload = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".pdf,.jpg,.jpeg,.png,.dcm"
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0]
      if (file) {
        setUploadMessage(`Successfully uploaded "${file.name}" to ABDM encrypted vault!`)
        setTimeout(() => setUploadMessage(null), 4000)
      }
    }
    input.click()
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Medical Report Viewer Modal */}
      <MedicalReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        initialDocId={selectedDocId}
      />

      {/* ABHA Link Modal */}
      <AbhaModal 
        isOpen={isAbhaModalOpen} 
        onClose={() => setIsAbhaModalOpen(false)} 
        onSuccess={() => setAbhaLinked(true)} 
      />

      {/* Upload Notification Toast */}
      {uploadMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-between shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>{uploadMessage}</span>
          </div>
          <button onClick={() => setUploadMessage(null)} className="text-xs font-bold text-emerald-700 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Medical Records</h1>
            <span className="text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-0.5 rounded-full">
              ABHA Connected
            </span>
          </div>
          <p className="text-slate-500 mt-1">
            Securely view, download, and manage your health records authenticated under ABDM.
          </p>
        </div>
        <div className="flex flex-wrap justify-start sm:justify-end gap-2.5">
          <Button 
            variant="outline" 
            onClick={() => setIsAbhaModalOpen(true)}
            className={`shadow-xs ${
              abhaLinked 
                ? "border-emerald-300 bg-emerald-50/70 text-emerald-700 hover:bg-emerald-100" 
                : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <ShieldCheck className="w-4 h-4 mr-2" /> 
            {abhaLinked ? "ABHA ID Linked" : "Link ABHA ID"}
          </Button>

          <Button 
            variant="outline" 
            onClick={downloadFhirBundle} 
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 shadow-xs"
          >
            <Download className="w-4 h-4 mr-2" /> Export ABDM FHIR Bundle
          </Button>

          <Button 
            onClick={handleSimulateUpload}
            className="bg-slate-900 hover:bg-slate-800 shadow-sm"
          >
            <FilePlus className="w-4 h-4 mr-2" /> Upload Record
          </Button>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((cat, i) => {
          const Icon = cat.icon
          return (
            <Card 
              key={i} 
              onClick={() => handleOpenReport(cat.docId)}
              className="shadow-xs border-slate-200 hover:border-teal-500/50 hover:shadow-md transition-all cursor-pointer group bg-white"
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{cat.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{cat.count} files • {cat.badge}</p>
                  </div>
                </div>
                <div className="text-xs font-semibold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <span>View</span>
                  <Eye size={14} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Documents Section */}
      <Card className="shadow-xs border-slate-200 overflow-hidden">
        <CardHeader className="bg-slate-50/70 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Documents</CardTitle>
              <CardDescription>Your latest verified diagnostic and clinical files across all health facilities.</CardDescription>
            </div>
            <span className="text-xs font-semibold text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              3 Demo Reports Ready
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3">
            {recentFiles.map((file) => (
              <div 
                key={file.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200/90 rounded-xl hover:bg-teal-50/20 hover:border-teal-200 transition-all group gap-4 bg-white"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <FileText size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900 text-sm sm:text-base leading-tight group-hover:text-teal-800 transition-colors">
                        {file.name}
                      </p>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {file.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span>{file.doctor}</span>
                      <span>•</span>
                      <span>{file.facility}</span>
                      <span>•</span>
                      <span className="text-slate-400">Added {file.date}</span>
                    </p>
                  </div>
                </div>

                {/* View & Download Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleOpenReport(file.id)}
                    className="h-9 px-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold border-slate-900 shadow-xs flex items-center gap-1.5 transition-all text-xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-teal-300" />
                    <span>View Report</span>
                  </Button>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownloadSingleReport(file.id, file.name)}
                    className="h-9 px-3 text-slate-600 border-slate-200 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 shadow-xs text-xs"
                    title="Download Report JSON / FHIR"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Consent Log Card */}
      <Card className="shadow-xs border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
            <ShieldCheck size={18} className="text-indigo-600" /> Consent Log
          </CardTitle>
          <CardDescription>
            Every facility that has requested access to your linked ABHA record, and whether you granted it — following the ABDM Consent Manager standard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {CONSENT_LOG.map((c, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 border border-slate-200/80 rounded-xl bg-slate-50/50">
              <div>
                <p className="font-semibold text-xs sm:text-sm text-slate-900">{c.requester}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{c.purpose}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  c.status === "Granted" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"
                }`}>
                  {c.status}
                </span>
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 justify-end">
                  <Clock size={10}/> {c.date}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
