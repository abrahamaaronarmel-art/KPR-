"use client"

import { useState } from "react"
import { 
  BedDouble, Building2, CheckCircle2, User, Plus, X, 
  ShieldAlert, Activity, Sparkles, ArrowUpRight, Search, Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface BedRoom {
  roomCode: string
  ward: "Ward A" | "Ward B" | "ICU" | "CCU"
  bedNumber: string
  isOccupied: boolean
  patientName?: string
  patientCode?: string
  diagnosis?: string
  admittedTime24?: string
}

export default function DoctorHospitalBedsPage() {
  const [selectedFloor, setSelectedFloor] = useState<number>(3)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [selectedBed, setSelectedBed] = useState<BedRoom | null>(null)
  const [admitPatientName, setAdmitPatientName] = useState("")
  const [admitDiagnosis, setAdmitDiagnosis] = useState("")

  // Ward A & B Bed Matrices for 3rd Floor Inpatient Ward
  const [wardABeds, setWardABeds] = useState<BedRoom[]>([
    { roomCode: "A1", ward: "Ward A", bedNumber: "Bed A1", isOccupied: true, patientName: "Rajesh Kumar", patientCode: "PT-8891", diagnosis: "Distal Radius Fracture", admittedTime24: "09:30" },
    { roomCode: "A2", ward: "Ward A", bedNumber: "Bed A2", isOccupied: true, patientName: "S. Venkatesh", patientCode: "PT-7712", diagnosis: "Post-Appendectomy", admittedTime24: "08:00" },
    { roomCode: "A3", ward: "Ward A", bedNumber: "Bed A3", isOccupied: false },
    { roomCode: "A4", ward: "Ward A", bedNumber: "Bed A4", isOccupied: true, patientName: "G. Krishnan", patientCode: "PT-6640", diagnosis: "Diabetic Foot Ulcer", admittedTime24: "Yesterday" },
    { roomCode: "A5", ward: "Ward A", bedNumber: "Bed A5", isOccupied: true, patientName: "R. Balaji", patientCode: "PT-5521", diagnosis: "Chronic Bronchitis", admittedTime24: "11:45" },
    { roomCode: "A6", ward: "Ward A", bedNumber: "Bed A6", isOccupied: false },
    { roomCode: "A7", ward: "Ward A", bedNumber: "Bed A7", isOccupied: true, patientName: "M. Selvam", patientCode: "PT-4419", diagnosis: "Hernia Repair", admittedTime24: "10:15" },
    { roomCode: "A8", ward: "Ward A", bedNumber: "Bed A8", isOccupied: true, patientName: "D. Jayaraman", patientCode: "PT-3301", diagnosis: "Cellulitis Lower Limb", admittedTime24: "07:30" },
  ])

  const [wardBBeds, setWardBBeds] = useState<BedRoom[]>([
    { roomCode: "B1", ward: "Ward B", bedNumber: "Bed B1", isOccupied: true, patientName: "Kavitha Ranganathan", patientCode: "PT-2091", diagnosis: "Post-Op Cast Care", admittedTime24: "16:30" },
    { roomCode: "B2", ward: "Ward B", bedNumber: "Bed B2", isOccupied: true, patientName: "Meenakshi Sundaram", patientCode: "PT-1190", diagnosis: "Pneumonia Recovery", admittedTime24: "Yesterday" },
    { roomCode: "B3", ward: "Ward B", bedNumber: "Bed B3", isOccupied: true, patientName: "Lakshmi Priya", patientCode: "PT-8832", diagnosis: "Acute Gastroenteritis", admittedTime24: "12:00" },
    { roomCode: "B4", ward: "Ward B", bedNumber: "Bed B4", isOccupied: false },
    { roomCode: "B5", ward: "Ward B", bedNumber: "Bed B5", isOccupied: true, patientName: "Anitha Ramesh", patientCode: "PT-7704", diagnosis: "Cholecystectomy", admittedTime24: "09:00" },
    { roomCode: "B6", ward: "Ward B", bedNumber: "Bed B6", isOccupied: true, patientName: "Revathi Kumar", patientCode: "PT-6611", diagnosis: "Severe Anemia", admittedTime24: "Yesterday" },
    { roomCode: "B7", ward: "Ward B", bedNumber: "Bed B7", isOccupied: true, patientName: "Shanti Devi", patientCode: "PT-5590", diagnosis: "Knee Arthroscopy", admittedTime24: "13:30" },
    { roomCode: "B8", ward: "Ward B", bedNumber: "Bed B8", isOccupied: true, patientName: "Vimala Nathan", patientCode: "PT-4482", diagnosis: "Renal Colic", admittedTime24: "08:15" },
  ])

  // Summary by Floor
  const floorSummaries = [
    { floorNumber: 1, floorName: "1st Floor: Emergency Triage & ICU", occupied: 18, total: 20, type: "ICU & Resuscitation" },
    { floorNumber: 2, floorName: "2nd Floor: Cardiology & CCU", occupied: 8, total: 10, type: "Cardiac Care" },
    { floorNumber: 3, floorName: "3rd Floor: Inpatient Ward (Ward A & B)", occupied: 13, total: 16, type: "General Inpatient" },
    { floorNumber: 4, floorName: "4th Floor: Surgical & Trauma Center", occupied: 12, total: 15, type: "Post-Surgical" },
  ]

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleToggleBed = (bed: BedRoom) => {
    if (bed.isOccupied) {
      // Discharge patient
      if (bed.ward === "Ward A") {
        setWardABeds(prev => prev.map(b => b.roomCode === bed.roomCode ? { ...b, isOccupied: false, patientName: undefined, patientCode: undefined, diagnosis: undefined } : b))
      } else {
        setWardBBeds(prev => prev.map(b => b.roomCode === bed.roomCode ? { ...b, isOccupied: false, patientName: undefined, patientCode: undefined, diagnosis: undefined } : b))
      }
      showToast(`Bed ${bed.bedNumber} discharged successfully. Room is now available.`)
      setSelectedBed(null)
    } else {
      // Open admit modal
      setSelectedBed(bed)
    }
  }

  const handleConfirmAdmission = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBed || !admitPatientName) return

    const newBedData: BedRoom = {
      ...selectedBed,
      isOccupied: true,
      patientName: admitPatientName,
      patientCode: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
      diagnosis: admitDiagnosis || "Admitted under Observation",
      admittedTime24: "Just Now (24h Live)"
    }

    if (selectedBed.ward === "Ward A") {
      setWardABeds(prev => prev.map(b => b.roomCode === selectedBed.roomCode ? newBedData : b))
    } else {
      setWardBBeds(prev => prev.map(b => b.roomCode === selectedBed.roomCode ? newBedData : b))
    }

    showToast(`✅ Patient ${admitPatientName} admitted to ${selectedBed.bedNumber}!`)
    setSelectedBed(null)
    setAdmitPatientName("")
    setAdmitDiagnosis("")
  }

  const wardAOccupied = wardABeds.filter(b => b.isOccupied).length
  const wardBOccupied = wardBBeds.filter(b => b.isOccupied).length

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 text-[#143827]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#143827] text-[#C6F052] px-5 py-3 rounded-2xl shadow-xl border border-[#C6F052]/30 text-xs font-bold animate-in fade-in flex items-center gap-2">
          <Sparkles size={16} className="text-[#C6F052]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Bed Admission Modal */}
      {selectedBed && !selectedBed.isOccupied && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E2E8D5] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8D5] pb-3">
              <h3 className="font-black text-lg text-[#143827] flex items-center gap-2">
                <BedDouble size={20} className="text-emerald-700" />
                <span>Admit Patient to {selectedBed.bedNumber}</span>
              </h3>
              <button 
                onClick={() => setSelectedBed(null)}
                className="p-1 rounded-full hover:bg-[#F6F8F0] text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConfirmAdmission} className="space-y-4 text-xs font-bold">
              <div>
                <label className="text-[#5E806E] uppercase block mb-1">Patient Full Name</label>
                <input
                  type="text"
                  value={admitPatientName}
                  onChange={(e) => setAdmitPatientName(e.target.value)}
                  placeholder="e.g. S. Ramanathan"
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827]"
                  required
                />
              </div>

              <div>
                <label className="text-[#5E806E] uppercase block mb-1">Admission Diagnosis &amp; Ward Notes</label>
                <input
                  type="text"
                  value={admitDiagnosis}
                  onChange={(e) => setAdmitDiagnosis(e.target.value)}
                  placeholder="e.g. Post-Op Wound Management / Observation"
                  className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl px-4 py-2.5 text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedBed(null)}
                  className="rounded-full border-[#E2E8D5] text-[#143827]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#143827] hover:bg-[#0E2419] text-[#C6F052] rounded-full px-5 font-bold"
                >
                  Confirm Admission
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl font-black tracking-tight text-[#143827]">Hospital Beds &amp; ICU Allocation</h1>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              Live HIS Node PY-IGGGH
            </span>
          </div>
          <p className="text-xs text-[#5E806E] font-medium mt-1">
            Real-time floor-wise bed availability, filled capacity metrics, and architectural floor diagram
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold bg-white border border-[#E2E8D5] px-3.5 py-2 rounded-full text-[#143827]">
            Overall Capacity: 51 / 61 Beds (83.6%)
          </span>
        </div>
      </div>

      {/* FLOOR-WISE CAPACITY SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {floorSummaries.map((floor) => {
          const isSelected = selectedFloor === floor.floorNumber
          const available = floor.total - floor.occupied
          return (
            <button
              key={floor.floorNumber}
              onClick={() => {
                setSelectedFloor(floor.floorNumber)
                showToast(`Switched view to ${floor.floorName}`)
              }}
              className={`rounded-3xl p-5 border text-left transition-all ${
                isSelected 
                  ? "bg-[#143827] text-white shadow-md border-[#143827]" 
                  : "bg-white text-[#143827] border-[#E2E8D5] hover:border-[#143827]"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className={isSelected ? "text-[#C6F052]" : "text-[#5E806E]"}>
                  Floor 0{floor.floorNumber}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? "bg-white/20 text-[#C6F052]" : "bg-emerald-100 text-emerald-800"
                }`}>
                  {available} Available
                </span>
              </div>

              <div className="text-2xl font-black">{floor.occupied} / {floor.total} Beds</div>
              <p className={`text-[11px] font-semibold mt-1 ${isSelected ? "text-white/80" : "text-[#5E806E]"}`}>
                {floor.type}
              </p>

              <div className="w-full bg-slate-200/50 rounded-full h-1.5 mt-3 overflow-hidden">
                <div 
                  className={`h-1.5 rounded-full ${isSelected ? "bg-[#C6F052]" : "bg-emerald-700"}`} 
                  style={{ width: `${(floor.occupied / floor.total) * 100}%` }}
                />
              </div>
            </button>
          )
        })}
      </div>

      {/* ARCHITECTURAL FLOOR BLUEPRINT DIAGRAM */}
      <div className="bg-white border border-[#E2E8D5] rounded-[32px] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8D5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#143827] text-[#C6F052] flex items-center justify-center font-bold">
              <Building2 size={18} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#143827]">
                3rd Floor: Inpatient Ward Architectural Floor Plan
              </h2>
              <p className="text-xs text-[#5E806E]">
                Ward A (A1-A8: 8 Beds) • Ward B (B1-B8: 8 Beds) • Nurses' Station, Treatment &amp; Waiting Lounge
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-[#F4F6EC] text-[#143827] px-3 py-1 rounded-full border border-[#E2E8D5]">
              Ward A: {wardAOccupied}/8 Filled • Ward B: {wardBOccupied}/8 Filled
            </span>
          </div>
        </div>

        {/* Blueprint Visual Image */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E2E8D5] bg-[#F6F8F0] shadow-inner flex justify-center">
          <img 
            src="/hospital-floor-plan.jpg" 
            alt="3rd Floor Inpatient Ward Architectural Floor Plan" 
            className="w-full max-h-[480px] object-contain rounded-2xl p-2"
          />
        </div>
      </div>

      {/* INTERACTIVE ROOM-BY-ROOM BED AVAILABILITY GRID (WARD A & WARD B) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* WARD A: ROOMS A1 - A8 (8 BEDS) */}
        <div className="bg-white border border-[#E2E8D5] rounded-[32px] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#E2E8D5] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-700"></span>
              <h3 className="font-black text-lg text-[#143827]">Ward A: Rooms A1–A8 (8 Beds)</h3>
            </div>
            <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              {8 - wardAOccupied} Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {wardABeds.map((bed) => (
              <div 
                key={bed.roomCode}
                className={`p-4 rounded-2xl border transition-all ${
                  bed.isOccupied 
                    ? "bg-[#F4F6EC] border-[#E2E8D5]" 
                    : "bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-300/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-xs text-[#143827] flex items-center gap-1.5">
                    <BedDouble size={14} className={bed.isOccupied ? "text-slate-600" : "text-emerald-700"} />
                    <span>Room {bed.bedNumber}</span>
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    bed.isOccupied ? "bg-slate-200 text-slate-800" : "bg-emerald-600 text-white font-black"
                  }`}>
                    {bed.isOccupied ? "Occupied" : "Available"}
                  </span>
                </div>

                {bed.isOccupied ? (
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-[#143827] truncate">{bed.patientName}</div>
                    <div className="text-[11px] text-[#5E806E] truncate">{bed.diagnosis}</div>
                    <div className="pt-2 flex justify-between items-center text-[10px] text-[#5E806E]">
                      <span>UHID: {bed.patientCode}</span>
                      <button 
                        onClick={() => handleToggleBed(bed)}
                        className="text-rose-700 font-bold hover:underline"
                      >
                        Discharge
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-2 text-center space-y-2">
                    <span className="text-[11px] text-emerald-800 font-bold block">Ready for Patient Intake</span>
                    <Button 
                      size="sm"
                      onClick={() => handleToggleBed(bed)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-bold h-7 px-3 w-full"
                    >
                      + Admit Patient
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* WARD B: ROOMS B1 - B8 (8 BEDS) */}
        <div className="bg-white border border-[#E2E8D5] rounded-[32px] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#E2E8D5] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-700"></span>
              <h3 className="font-black text-lg text-[#143827]">Ward B: Rooms B1–B8 (8 Beds)</h3>
            </div>
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
              {8 - wardBOccupied} Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {wardBBeds.map((bed) => (
              <div 
                key={bed.roomCode}
                className={`p-4 rounded-2xl border transition-all ${
                  bed.isOccupied 
                    ? "bg-[#F4F6EC] border-[#E2E8D5]" 
                    : "bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-300/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-xs text-[#143827] flex items-center gap-1.5">
                    <BedDouble size={14} className={bed.isOccupied ? "text-slate-600" : "text-emerald-700"} />
                    <span>Room {bed.bedNumber}</span>
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    bed.isOccupied ? "bg-slate-200 text-slate-800" : "bg-emerald-600 text-white font-black"
                  }`}>
                    {bed.isOccupied ? "Occupied" : "Available"}
                  </span>
                </div>

                {bed.isOccupied ? (
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-[#143827] truncate">{bed.patientName}</div>
                    <div className="text-[11px] text-[#5E806E] truncate">{bed.diagnosis}</div>
                    <div className="pt-2 flex justify-between items-center text-[10px] text-[#5E806E]">
                      <span>UHID: {bed.patientCode}</span>
                      <button 
                        onClick={() => handleToggleBed(bed)}
                        className="text-rose-700 font-bold hover:underline"
                      >
                        Discharge
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-2 text-center space-y-2">
                    <span className="text-[11px] text-emerald-800 font-bold block">Ready for Patient Intake</span>
                    <Button 
                      size="sm"
                      onClick={() => handleToggleBed(bed)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-bold h-7 px-3 w-full"
                    >
                      + Admit Patient
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}

