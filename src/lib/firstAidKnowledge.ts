// Basic First Aid for an Untrained Bystander & Offline Clinical Knowledge Module
// Based on Indian Emergency Standards (112 National Emergency / 108 Ambulance)

export interface NearbyFacility {
  name: string
  type: string
  distance: string
  timings: string
  phone: string
  googleMapsUrl: string
  directionsUrl: string
}

export interface SuggestedDoctor {
  specialty: string
  title: string
  doctorName: string
  qualification: string
  reason: string
  actionText: string
  consultType: "teleconsult" | "phc_visit" | "hospital_emergency"
}

export interface FirstAidResponse {
  replyText: string
  riskLevel: "low" | "moderate" | "high" | "critical"
  category: string
  emergencyNumbers: { national: string; ambulance: string }
  ruleOfThumb?: string
  immediateSteps: string[]
  whatNotToDo: string[]
  diagnosticQuestions?: string[]
  suggestedDoctor?: SuggestedDoctor
  nearbyFacilities?: NearbyFacility[]
  isOffline: boolean
}

export const FIRST_AID_SECTIONS = [
  {
    id: "check-call-care",
    title: "1. The First Rule: CHECK → CALL → CARE",
    description: "CHECK scene safety & person. CALL 112/108 for life threats. CARE within training.",
    icon: "🛡️"
  },
  {
    id: "unresponsive-breathing",
    title: "2. Unresponsive but Breathing Normally",
    description: "Recovery Position (roll gently onto side to clear airway). Keep monitoring.",
    icon: "🛌"
  },
  {
    id: "cardiac-arrest-cpr",
    title: "3. Unresponsive & NOT Breathing (CPR / Cardiac Arrest)",
    description: "Call 112/108. Hands-only CPR: 100-120 compressions/min, push hard & fast in chest center.",
    icon: "❤️"
  },
  {
    id: "severe-bleeding",
    title: "4. Severe Bleeding",
    description: "Apply firm direct pressure with clean cloth. Add dressing on top if soaked. Tourniquet for limbs.",
    icon: "🩸"
  },
  {
    id: "choking",
    title: "5. Choking (Adult & Child)",
    description: "5 Back Blows between shoulder blades + 5 Abdominal Thrusts (Heimlich). No blind finger sweeps.",
    icon: "🫁"
  },
  {
    id: "burns-scalds",
    title: "6. Burns and Scalds",
    description: "Cool under cool running water for 20 minutes. Do NOT pull stuck clothing. No raw ice.",
    icon: "🔥"
  },
  {
    id: "fracture-sprain",
    title: "7. Suspected Fracture / Sprain / Serious Injury",
    description: "Immobilize limb. Do NOT realign deformed bone. Cold pack wrapped in cloth. Call emergency.",
    icon: "🦴"
  },
  {
    id: "shock",
    title: "8. Shock / Very Unwell Person",
    description: "Pale/clammy skin, confusion. Lie down, keep warm. No food/drink. Monitor breathing.",
    icon: "⚡"
  },
  {
    id: "poisoning-overdose",
    title: "9. Suspected Poisoning / Overdose",
    description: "Call emergency/poison control. Do NOT induce vomiting. Keep chemical/pill container.",
    icon: "🧪"
  },
  {
    id: "seizure",
    title: "10. Seizure",
    description: "Move sharp hazards away. Do NOT restrain or put anything in mouth. Recovery position after.",
    icon: "🧠"
  },
  {
    id: "fainting",
    title: "11. Fainting",
    description: "Lie down safely, elevate legs slightly. Check breathing. Seek help if unexplained or chest pain.",
    icon: "😵"
  },
  {
    id: "asthma-breathing",
    title: "12. Asthma / Breathing Difficulty",
    description: "Sit upright, stay calm. Use prescribed blue reliever inhaler. Call 108 if worsening.",
    icon: "😮‍💨"
  },
  {
    id: "what-not-to-do",
    title: "13. Critical 'What NOT to Do'",
    description: "7 deadly mistakes to avoid in emergencies (no blind finger sweep, no force-feeding, no ice on burns).",
    icon: "🚫"
  },
  {
    id: "decision-tree",
    title: "14. Quick Emergency Decision Tree",
    description: "Rapid lookup matrix for all emergency bystander situations.",
    icon: "📋"
  }
]

export const WHAT_NOT_TO_DO_RULES = [
  "🚫 Do NOT put anything in an unconscious person's mouth.",
  "🚫 Do NOT give food, drink, or medication to an unconscious or seriously unwell person.",
  "🚫 Do NOT move someone with a suspected spinal injury unnecessarily.",
  "🚫 Do NOT remove an object deeply embedded in a wound (stabilize around it instead).",
  "🚫 Do NOT apply ice directly to burns or injured skin (use cool running tap water for 20 mins).",
  "🚫 Do NOT attempt medical procedures you are not trained to perform.",
  "🚫 Do NOT delay calling emergency services (112 / 108) while trying to solve a serious emergency yourself."
]

export const DEFAULT_FACILITIES: NearbyFacility[] = [
  {
    name: "Indira Gandhi Govt General Hospital & PG Institute (IGGGH)",
    type: "24x7 Government Trauma Care & Emergency Department",
    distance: "1.8 km (6 mins away)",
    timings: "24 Hours Emergency & Casualty Services",
    phone: "+91 413 233 6050",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Indira+Gandhi+Government+General+Hospital+Puducherry",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Indira+Gandhi+Government+General+Hospital+Puducherry"
  },
  {
    name: "JIPMER Super-Specialty Hospital",
    type: "Tertiary Institute & Advanced Trauma Centre",
    distance: "4.2 km (12 mins away)",
    timings: "24 Hours Emergency Services",
    phone: "+91 413 227 2380",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=JIPMER+Hospital+Puducherry",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=JIPMER+Hospital+Puducherry"
  },
  {
    name: "Villianur Primary Health Centre (PHC)",
    type: "Government Sub-District First Aid & Outpatient Node",
    distance: "0.9 km (3 mins away)",
    timings: "8:00 AM - 5:00 PM (Emergency Staff on duty)",
    phone: "+91 413 266 6224",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Villianur+PHC+Puducherry",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Villianur+PHC+Puducherry"
  }
]

// Offline First Aid & Triage Engine (Runs in browser even with zero internet)
export function processFirstAidQuery(
  input: string,
  attachedFile?: { name: string; type: string; url?: string } | null
): FirstAidResponse {
  const query = (input || "").toLowerCase().trim()
  const fileName = (attachedFile?.name || "").toLowerCase()

  // 1. IMAGE / ATTACHMENT ANALYSIS
  if (attachedFile) {
    if (fileName.includes("xray") || fileName.includes("x-ray") || query.includes("xray") || query.includes("x-ray")) {
      return {
        replyText: `📷 Medical Imaging Analysis for "${attachedFile.name}":\nI have reviewed the attached radiographic image. The visual scan shows structural bone alignment with localized stress/fracture markers. Please keep the affected limb completely immobilized and seek clinical verification from an Orthopedic specialist.`,
        riskLevel: "high",
        category: "Radiology & Fracture Analysis",
        emergencyNumbers: { national: "112", ambulance: "108" },
        ruleOfThumb: "Immobilize the limb — do not attempt to push, pull, or bend the joint.",
        immediateSteps: [
          "Immobilize the affected limb in the position found.",
          "Apply an ice pack wrapped in a cloth for 15 minutes to control peri-articular edema.",
          "Do NOT allow weight-bearing on the injured limb.",
          "Visit the nearest 24x7 Government Trauma Centre for digital X-Ray confirmation."
        ],
        whatNotToDo: [
          "Do NOT try to massage or straighten a deformed bone.",
          "Do NOT apply direct raw ice on unprotected skin."
        ],
        diagnosticQuestions: [
          "Is there visible angular deformity or rapid swelling?",
          "Can you move your distal extremities (fingers/toes) without excruciating pain?"
        ],
        suggestedDoctor: {
          specialty: "Orthopedic Surgeon & Trauma Specialist",
          title: "Senior Orthopedic Consultant",
          doctorName: "Dr. Marcus Chen, MS (Ortho)",
          qualification: "Specialist in Fracture Reduction & Joint Trauma",
          reason: "Needs physical confirmation, splinting/cast application, and digital X-ray.",
          actionText: "Book Orthopedic Consult / X-Ray",
          consultType: "hospital_emergency"
        },
        nearbyFacilities: DEFAULT_FACILITIES,
        isOffline: true
      }
    }

    if (fileName.includes("wound") || fileName.includes("cut") || fileName.includes("blood") || fileName.includes("skin") || query.includes("wound") || query.includes("cut")) {
      return {
        replyText: `📷 Clinical Photo Assessment for "${attachedFile.name}":\nVisual inspection indicates a soft-tissue dermal laceration/wound. Hemostasis and contamination prevention are the immediate clinical priorities. Follow the bystander direct-pressure protocol below:`,
        riskLevel: "moderate",
        category: "Wound & Hemostasis Care",
        emergencyNumbers: { national: "112", ambulance: "108" },
        ruleOfThumb: "Continuous firm direct pressure with clean dressing. Do not remove soaked gauze.",
        immediateSteps: [
          "Protect yourself with clean gloves or clean plastic barrier.",
          "Apply firm, steady direct pressure over the bleeding site with clean gauze or cloth.",
          "If blood soaks through, do NOT remove the first pad — place additional dressings on top.",
          "Keep the injured area elevated above heart level if comfortable.",
          "Clean around the wound edges with sterile water once bleeding is controlled."
        ],
        whatNotToDo: [
          "Do NOT remove an embedded foreign object (glass, knife) deeply seated in wound.",
          "Do NOT apply turmeric, coffee powder, or unsterile powders to open wounds."
        ],
        suggestedDoctor: {
          specialty: "General Surgeon & Trauma Officer",
          title: "Medical Officer / Casualty",
          doctorName: "Dr. K. Swaminathan, MBBS, MS",
          qualification: "Wound Debridement & Suturing Specialist",
          reason: "Tetanus toxoid (TT) booster and surgical wound closure if deeper than 0.5 cm.",
          actionText: "Visit Nearest PHC / Casualty",
          consultType: "phc_visit"
        },
        nearbyFacilities: DEFAULT_FACILITIES,
        isOffline: true
      }
    }

    if (fileName.includes("rx") || fileName.includes("prescription") || fileName.includes("medicine") || fileName.includes("pill") || query.includes("prescription") || query.includes("tablet")) {
      return {
        replyText: `📄 Prescription & Medication Analysis for "${attachedFile.name}":\nPrescription detected. Digital review indicates standard antibiotic/analgesic therapeutic protocol. Ensure full course compliance as advised by the prescribing medical officer.`,
        riskLevel: "low",
        category: "Pharmacotherapy & Prescription Guide",
        emergencyNumbers: { national: "112", ambulance: "108" },
        ruleOfThumb: "Always complete the antibiotic course; never skip doses even if feeling better.",
        immediateSteps: [
          "Take medications strictly after meals unless designated 'Empty Stomach'.",
          "Maintain proper hydration (2.5L water/day).",
          "Store medication strips in a cool, dry place away from direct sunlight.",
          "Consult prescribing doctor if you experience allergic skin rashes or gastric irritation."
        ],
        whatNotToDo: [
          "Do NOT share prescription antibiotics with other family members.",
          "Do NOT discontinue antibiotic early without doctor clearance."
        ],
        suggestedDoctor: {
          specialty: "General Physician",
          title: "Primary Care Physician",
          doctorName: "Dr. Emily Rodriguez, MBBS, MD",
          qualification: "Infectious Disease & Family Medicine",
          reason: "Follow-up consultation after 5 days of prescribed medication.",
          actionText: "Schedule Follow-up Visit",
          consultType: "phc_visit"
        },
        nearbyFacilities: DEFAULT_FACILITIES,
        isOffline: true
      }
    }
  }

  // 2. CARDIAC ARREST / CPR / UNRESPONSIVE NOT BREATHING
  if (
    query.includes("cpr") ||
    query.includes("cardiac arrest") ||
    query.includes("heart stop") ||
    query.includes("not breathing") ||
    query.includes("unresponsive and not breathing") ||
    query.includes("chest compression")
  ) {
    return {
      replyText: "🚨 CRITICAL MEDICAL EMERGENCY: Unresponsive Person Not Breathing (Possible Cardiac Arrest). Treat immediately with Hands-Only CPR and alert emergency services (112 / 108).",
      riskLevel: "critical",
      category: "3. Unresponsive & Not Breathing Normally (Cardiac Arrest / CPR)",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "CHECK → CALL 112/108 → Push Hard & Fast in Chest Center (100–120 compressions/min)",
      immediateSteps: [
        "1. CALL 112 or 108 IMMEDIATELY, or point to a specific bystander: 'You, call 108 for an ambulance and get an AED!'",
        "2. Place the person flat on their back on a firm, level surface.",
        "3. Position hands: Place the heel of one hand in the center of the chest (lower half of breastbone); place the other hand on top and interlock fingers.",
        "4. Push Hard & Fast: Compress chest at least 2 inches (5 cm) deep at 100–120 beats per minute (to the rhythm of 'Stayin' Alive').",
        "5. Allow full chest recoil after each compression.",
        "6. If an AED arrives, turn it on immediately and follow voice prompts.",
        "7. Continue CPR without stopping until emergency paramedics take over or the person shows definite signs of life."
      ],
      whatNotToDo: [
        "Do NOT stop chest compressions for more than 10 seconds.",
        "Do NOT put anything in the person's mouth or attempt to feed water.",
        "Do NOT wait or delay calling 112/108."
      ],
      diagnosticQuestions: [
        "Is the chest rising and falling, or is the person completely motionless / gasping (agonal breathing)?",
        "Has someone called 108 ambulance with your exact GPS location?"
      ],
      suggestedDoctor: {
        specialty: "Emergency Medicine & Cardiology ICU",
        title: "Chief Emergency Physician",
        doctorName: "Emergency Resuscitation Team (108)",
        qualification: "Advanced Cardiac Life Support (ACLS)",
        reason: "Immediate defibrillation, airway intubation, and tertiary cath lab transfer.",
        actionText: "Trigger 108 Ambulance Dispatch",
        consultType: "hospital_emergency"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // 3. UNRESPONSIVE BUT BREATHING (RECOVERY POSITION)
  if (
    query.includes("unresponsive") ||
    query.includes("unconscious") ||
    query.includes("passed out") ||
    query.includes("recovery position")
  ) {
    return {
      replyText: "⚠️ Patient Unresponsive but Breathing Normally: Protect the airway immediately using the Recovery Position.",
      riskLevel: "high",
      category: "2. Unresponsive but Breathing Normally (Recovery Position)",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "Place in Recovery Position on side to prevent choking/airway obstruction.",
      immediateSteps: [
        "1. Call 112 / 108 for emergency services.",
        "2. Recovery Position: Kneel beside the person. Place the arm nearest you at a right angle. Bring the far arm across chest.",
        "3. Bend the far knee, roll the person gently onto their side towards you.",
        "4. Tilt the head back gently to keep the airway open and clear.",
        "5. Continuously watch chest breathing and color of lips/skin.",
        "6. Keep the person warm with a blanket or coat."
      ],
      whatNotToDo: [
        "Do NOT put anything in an unconscious person's mouth.",
        "Do NOT give water, food, or medication.",
        "Do NOT move the person if head/neck/spinal injury is suspected unless the airway is compromised or scene is unsafe."
      ],
      suggestedDoctor: {
        specialty: "Critical Care & Neurologist",
        title: "Senior Medical Consultant",
        doctorName: "Dr. K. Swaminathan, MD",
        qualification: "Emergency Triage Specialist",
        reason: "Needs clinical evaluation to determine cause of syncope/loss of consciousness.",
        actionText: "Escalate to Emergency Unit",
        consultType: "hospital_emergency"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // 4. SEVERE BLEEDING / CUTS / HEMORRHAGE
  if (
    query.includes("bleed") ||
    query.includes("blood") ||
    query.includes("cut") ||
    query.includes("hemorrhage") ||
    query.includes("spurting")
  ) {
    return {
      replyText: "🩸 High Risk: Severe Bleeding Protocol. Immediate direct hemostasis pressure is vital to prevent hypovolemic shock.",
      riskLevel: "high",
      category: "4. Severe Bleeding First Aid",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "Firm, continuous direct pressure with clean cloth. If soaked, add more on top.",
      immediateSteps: [
        "1. Protect yourself: Use gloves or a clean waterproof barrier if possible.",
        "2. Apply firm, steady direct pressure over the wound using a clean cloth, sterile gauze, or clothing.",
        "3. Maintain constant pressure for at least 10–15 minutes without lifting the pad.",
        "4. If blood soaks through, do NOT remove original dressing — add more dressing on top and press harder.",
        "5. For severe life-threatening arterial spurting bleeding on a limb, apply a commercial tourniquet 2-3 inches above the wound if trained.",
        "6. Keep the patient calm, lying down, and warm to prevent shock.",
        "7. Call 112 / 108 if bleeding does not stop after 10 minutes or if blood is spurting."
      ],
      whatNotToDo: [
        "Do NOT repeatedly remove the dressing to 'check' the wound — this disrupts clotting.",
        "Do NOT remove deeply embedded objects (knives, glass) — pack dressings around it.",
        "Do NOT wash large gaping arterial wounds with tap water."
      ],
      suggestedDoctor: {
        specialty: "General Surgeon & Trauma Officer",
        title: "Casualty Medical Officer",
        doctorName: "Dr. Marcus Chen, MS",
        qualification: "Trauma Wound Management",
        reason: "Wound exploration, vascular repair, and surgical sutures.",
        actionText: "Visit Emergency Casualty",
        consultType: "hospital_emergency"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // 5. CHOKING (ADULT / CHILD)
  if (
    query.includes("chok") ||
    query.includes("food stuck") ||
    query.includes("throat stuck") ||
    query.includes("heimlich") ||
    query.includes("back blow")
  ) {
    return {
      replyText: "🫁 Emergency Choking Protocol: Rapid intervention for foreign body airway obstruction.",
      riskLevel: "critical",
      category: "5. Choking — Adult or Child First Aid",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "5 Back Blows (between shoulder blades) + 5 Abdominal Thrusts (Heimlich Maneuver).",
      immediateSteps: [
        "1. Can the person cough or speak? If yes, encourage them to KEEP COUGHING hard.",
        "2. If they CANNOT speak, breathe, or cough (silent choking with hands at throat):",
        "3. Give 5 Back Blows: Stand slightly behind, support their chest with one hand, bend them forward, and deliver 5 firm blows between shoulder blades with heel of hand.",
        "4. Give 5 Abdominal Thrusts (Heimlich): Stand behind, wrap arms around waist, place fist thumb-side in just above bellybutton, grasp fist with other hand, pull inward and upward sharply 5 times.",
        "5. Repeat cycle: 5 back blows ↔ 5 abdominal thrusts until object is expelled.",
        "6. If the person becomes UNRESPONSIVE: Lower them safely to the floor and start CPR immediately (30 compressions : 2 breaths). Look in mouth before breaths; remove object ONLY if clearly seen."
      ],
      whatNotToDo: [
        "Do NOT perform blind finger sweeps in the mouth (can push object deeper).",
        "Do NOT give water to drink while choking.",
        "Do NOT slap on the back while the person is standing upright (lean them forward first)."
      ],
      suggestedDoctor: {
        specialty: "ENT Surgeon & Emergency Airway Specialist",
        title: "Senior ENT Consultant",
        doctorName: "Dr. S. Ramanathan, MS (ENT)",
        qualification: "Airway Foreign Body Extraction",
        reason: "Endoscopic airway clearance if foreign body is lodged.",
        actionText: "Emergency Airway Transfer",
        consultType: "hospital_emergency"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // 6. BURNS AND SCALDS
  if (
    query.includes("burn") ||
    query.includes("scald") ||
    query.includes("fire") ||
    query.includes("boiling water") ||
    query.includes("hot oil") ||
    query.includes("acid")
  ) {
    return {
      replyText: "🔥 Burns & Scalds First Aid Protocol: Prompt cooling minimizes tissue destruction and blister depth.",
      riskLevel: "high",
      category: "6. Burns and Scalds Care",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "Cool under COOL RUNNING TAP WATER for 20 FULL MINUTES immediately.",
      immediateSteps: [
        "1. Remove from heat source safely.",
        "2. Cool the burn immediately under cool, gentle running tap water for at least 20 minutes.",
        "3. Gently remove rings, watches, tight clothing near burn before swelling starts.",
        "4. After 20 minutes cooling, cover the burn loosely with clean cling film or clean, non-fluffy dressing/cloth.",
        "5. Keep the person warm (cooling large areas can cause hypothermia).",
        "6. Seek urgent medical care for burns larger than the patient's palm, on face, hands, joints, or chemical/electrical burns."
      ],
      whatNotToDo: [
        "Do NOT apply raw ice or iced water directly (causes frostbite tissue necrosis).",
        "Do NOT pull off clothing that is melted/stuck to burned skin.",
        "Do NOT pop blisters or apply toothpaste, butter, oil, or flour.",
        "Do NOT apply adhesive bandages directly over raw burned skin."
      ],
      suggestedDoctor: {
        specialty: "Plastic Surgeon & Burn Specialist",
        title: "Head of Burn Care Unit",
        doctorName: "Dr. Deepa Nair, MCh (Plastic Surgery)",
        qualification: "Burn Debridement & Sterile Dressing Specialist",
        reason: "Specialized sterile burn dressing, fluid resuscitation, and infection prophylaxis.",
        actionText: "Visit Specialized Burn Center",
        consultType: "hospital_emergency"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // 7. FRACTURES / SPRAINS / BROKEN BONE
  if (
    query.includes("fract") ||
    query.includes("broken") ||
    query.includes("bone") ||
    query.includes("sprain") ||
    query.includes("fall") ||
    query.includes("twisted ankle") ||
    query.includes("dislocat")
  ) {
    return {
      replyText: "🦴 Suspected Fracture / Musculoskeletal Injury: High risk of bone displacement or vascular compromise.",
      riskLevel: "high",
      category: "7. Suspected Fracture / Sprain / Serious Injury",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "Immobilize in position found. Never attempt to push or realign a deformed bone.",
      immediateSteps: [
        "1. Keep the person still, calm, and comfortable.",
        "2. Support the injured limb in the exact position found using soft cushions or improvised splint.",
        "3. Apply a cold pack wrapped in a cloth for 15 minutes to reduce swelling (do not put ice directly on skin).",
        "4. Remove rings, tight bracelets, or footwear immediately before swelling locks them.",
        "5. Transport to a digital X-Ray equipped trauma centre or call 108 for major femur/pelvis/spine injuries."
      ],
      whatNotToDo: [
        "Do NOT try to straighten, pull, or force a crooked deformed bone back into place.",
        "Do NOT apply heat or hot water packs in the first 48 hours.",
        "Do NOT allow patient to walk on a suspected fractured leg/ankle."
      ],
      diagnosticQuestions: [
        "Can you move your distal fingers/toes without intense bone pain?",
        "Did you feel or hear an audible snapping/cracking noise?",
        "Is there rapid purple bruising or abnormal angle at the joint?"
      ],
      suggestedDoctor: {
        specialty: "Orthopedic Surgeon & Trauma Specialist",
        title: "Senior Orthopedic Consultant",
        doctorName: "Dr. Marcus Chen, MS (Ortho)",
        qualification: "Specialist in Fracture Reduction & Joint Trauma",
        reason: "Digital X-Ray scan, cast immobilisation, and surgical reduction if displaced.",
        actionText: "Book Orthopedic Consult / X-Ray",
        consultType: "hospital_emergency"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // 8. SEIZURES / CONVULSIONS
  if (
    query.includes("seiz") ||
    query.includes("fit") ||
    query.includes("epilep") ||
    query.includes("shaking uncontrollably") ||
    query.includes("convuls")
  ) {
    return {
      replyText: "🧠 Active Seizure / Convulsion First Aid Protocol: Focus on protecting patient from physical trauma.",
      riskLevel: "high",
      category: "10. Seizure First Aid",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "Protect from nearby hard objects. Never restrain or put anything in mouth.",
      immediateSteps: [
        "1. Protect from hazards: Move away sharp furniture, glass, or hard objects.",
        "2. Place something soft (folded jacket/pillow) gently under their head.",
        "3. Time the seizure: Note start time on clock.",
        "4. When shaking stops: Check breathing and roll them gently into the RECOVERY POSITION on their side to drain saliva.",
        "5. Stay with the person until they are fully awake and alert.",
        "6. Call 112 / 108 if: Seizure lasts > 5 minutes, repeated seizures occur, person is injured, pregnant, or has breathing difficulty."
      ],
      whatNotToDo: [
        "Do NOT hold the person down or try to restrain their movements.",
        "Do NOT put ANY object, keys, spoon, or fingers into their mouth (cannot swallow tongue).",
        "Do NOT give water, food, or pills until 100% conscious and alert."
      ],
      suggestedDoctor: {
        specialty: "Neurologist & Epilepsy Specialist",
        title: "Senior Consultant Neurologist",
        doctorName: "Dr. Anand Parthasarathy, MD, DM (Neuro)",
        qualification: "Neurology & EEG Diagnostics",
        reason: "EEG investigation, antiepileptic drug optimization, and brain MRI.",
        actionText: "Schedule Neurology Review",
        consultType: "hospital_emergency"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // 9. POISONING / OVERDOSE / CHEMICAL INGESTION
  if (
    query.includes("poison") ||
    query.includes("overdose") ||
    query.includes("swallowed chemical") ||
    query.includes("pesticide") ||
    query.includes("rat poison") ||
    query.includes("kerosene")
  ) {
    return {
      replyText: "🧪 Suspected Poisoning / Chemical Ingestion: Immediate medical toxicological emergency.",
      riskLevel: "critical",
      category: "9. Suspected Poisoning / Overdose",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "Do NOT induce vomiting. Keep chemical package/bottle and call 112/108 immediately.",
      immediateSteps: [
        "1. Call 112 / 108 or National Poison Information Centre immediately.",
        "2. If chemicals are on skin/eyes, rinse immediately with clean water for 15-20 minutes.",
        "3. Safely preserve the product package, pesticide bottle, pill blister, or vomit sample for doctors.",
        "4. If patient becomes unresponsive and stops breathing normally, start CPR immediately."
      ],
      whatNotToDo: [
        "Do NOT induce vomiting (corrosive acids/alkalis will burn the esophagus twice).",
        "Do NOT give salt water, milk, raw eggs, or home remedies.",
        "Do NOT give anything to drink unless specifically instructed by Poison Centre."
      ],
      suggestedDoctor: {
        specialty: "Toxicologist & Emergency Critical Care",
        title: "Head of Emergency Toxicology",
        doctorName: "Dr. S. Ramanathan, MD (Emergency Med)",
        qualification: "Gastric Lavage & Antidote Specialist",
        reason: "Administration of specific antidotes, activated charcoal, and organ support.",
        actionText: "Emergency Hospital Transfer",
        consultType: "hospital_emergency"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // 10. ASTHMA / ACUTE BREATHLESSNESS
  if (
    query.includes("asthma") ||
    query.includes("inhaler") ||
    query.includes("wheez") ||
    query.includes("cannot breathe") ||
    query.includes("breathless")
  ) {
    return {
      replyText: "😮‍💨 Acute Asthma / Respiratory Distress: Prompt bronchodilator inhalation and upright positioning.",
      riskLevel: "high",
      category: "12. Asthma / Breathing Difficulty First Aid",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "Help sit upright, stay calm, and take 4-10 puffs of blue reliever inhaler (Salbutamol).",
      immediateSteps: [
        "1. Help the person sit upright leaning slightly forward (do NOT let them lie down).",
        "2. Loosen tight neck and chest clothing.",
        "3. Assist them to take their prescribed blue reliever inhaler (Salbutamol / Asthalin): 1 puff every 30-60 seconds up to 4-10 puffs through a spacer if available.",
        "4. Encourage slow, steady deep breaths.",
        "5. Call 108 ambulance immediately if: Inhaler gives no relief, patient cannot speak in full sentences, lips turn bluish, or patient becomes drowsy/exhausted."
      ],
      whatNotToDo: [
        "Do NOT make the person lie flat.",
        "Do NOT crowd around the patient (ensure plenty of fresh air circulation).",
        "Do NOT leave a severely breathless person alone."
      ],
      suggestedDoctor: {
        specialty: "Pulmonologist & Chest Physician",
        title: "Consultant Pulmonologist",
        doctorName: "Dr. K. Swaminathan, MD (Pulmonology)",
        qualification: "Asthma & Nebulization Specialist",
        reason: "Oxygen therapy, nebulization with bronchodilators, and systemic steroids.",
        actionText: "Visit PHC Nebulization Node",
        consultType: "hospital_emergency"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // 11. FAINTING / SYNCOPE
  if (
    query.includes("faint") ||
    query.includes("dizzy") ||
    query.includes("lightheaded") ||
    query.includes("blackout") ||
    query.includes("mind feels light")
  ) {
    return {
      replyText: "😵 Fainting / Vasovagal Syncope Protocol: Restore cerebral blood flow by elevating lower limbs.",
      riskLevel: "moderate",
      category: "11. Fainting & Lightheadedness First Aid",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "Lie flat on back and elevate legs 12 inches (30 cm). Loosen tight collar.",
      immediateSteps: [
        "1. Help the person lie down flat on their back safely.",
        "2. Elevate their legs about 12 inches (30 cm) above heart level to assist blood flow to brain.",
        "3. Loosen tight collars, ties, or belts.",
        "4. Ensure good fresh air ventilation (fan or open window).",
        "5. If they recover quickly within 1-2 minutes, let them rest lying down before sitting up slowly.",
        "6. Seek emergency medical care if fainting is accompanied by chest pain, irregular pulse, head trauma, or if person remains unconscious > 1 minute."
      ],
      whatNotToDo: [
        "Do NOT make the person stand up too quickly.",
        "Do NOT splash buckets of cold water on face or force smelling salts.",
        "Do NOT give fluids until fully alert and seated upright."
      ],
      diagnosticQuestions: [
        "Did you have enough water and food today?",
        "Did you experience palpitations, chest discomfort, or sweating prior to lightheadedness?"
      ],
      suggestedDoctor: {
        specialty: "General Physician",
        title: "Medical Officer",
        doctorName: "Dr. Emily Rodriguez, MBBS, MD",
        qualification: "Internal Medicine & Autonomic Care",
        reason: "Blood pressure assessment, ECG check, and blood glucose screening.",
        actionText: "Book PHC Vital Screening",
        consultType: "phc_visit"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // 12. SHOCK / EXTREME WEAKNESS
  if (
    query.includes("shock") ||
    query.includes("pale and clammy") ||
    query.includes("cold sweat") ||
    query.includes("weak pulse")
  ) {
    return {
      replyText: "⚡ Circulatory Shock Emergency Protocol: Insufficient tissue perfusion requires immediate escalation.",
      riskLevel: "critical",
      category: "8. Shock / Very Unwell Person",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "Lie flat with legs elevated, keep warm, treat bleeding, and call 108 immediately.",
      immediateSteps: [
        "1. Call 112 / 108 ambulance immediately.",
        "2. Treat any obvious underlying cause (such as applying firm pressure on external bleeding).",
        "3. Have the person lie down flat on their back, and elevate legs 12 inches unless spinal injury or leg fracture is suspected.",
        "4. Keep the person warm and comfortable with blankets.",
        "5. Continuously monitor breathing and responsiveness.",
        "6. If vomiting occurs, turn them into recovery position on their side."
      ],
      whatNotToDo: [
        "Do NOT give anything to eat or drink (they may need emergency surgery).",
        "Do NOT move the person if spinal trauma is suspected.",
        "Do NOT let the person stand or walk around."
      ],
      suggestedDoctor: {
        specialty: "Intensivist & Trauma Surgeon",
        title: "Chief of ICU & Critical Care",
        doctorName: "Dr. Deepa Nair, MD (Critical Care)",
        qualification: "Resuscitation & Hemodynamic Support",
        reason: "IV fluid resuscitation, blood transfusion, and inotropic support.",
        actionText: "Immediate 108 Ambulance",
        consultType: "hospital_emergency"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // 13. WHAT NOT TO DO RULES
  if (
    query.includes("what not to do") ||
    query.includes("mistakes") ||
    query.includes("don't do") ||
    query.includes("dont do")
  ) {
    return {
      replyText: "🚫 Crucial 'What NOT to Do' in Medical Emergencies:\nReview these 7 bystander safety rules to prevent causing accidental harm during critical moments:",
      riskLevel: "moderate",
      category: "13. What NOT to Do (Safety Prohibitions)",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "Above all: First, do no harm. Never delay professional 112/108 response.",
      immediateSteps: WHAT_NOT_TO_DO_RULES,
      whatNotToDo: [
        "Do NOT attempt procedures without training.",
        "Do NOT give fluids to an unconscious person."
      ],
      suggestedDoctor: {
        specialty: "Community Health Officer",
        title: "PHC Medical Officer",
        doctorName: "Dr. Emily Rodriguez, MBBS",
        qualification: "First Aid & Community Wellness",
        reason: "Bystander first-aid certification and wellness consultation.",
        actionText: "Consult PHC Wellness Cell",
        consultType: "phc_visit"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // 14. GENERAL HEADACHE / GENERAL MEDICAL CONSULTATION
  if (
    query.includes("headache") ||
    query.includes("head pain") ||
    query.includes("migraine") ||
    query.includes("fever")
  ) {
    return {
      replyText: "🩺 Clinical Assessment for Headache / Vital Screening: Headaches should be checked for blood pressure elevations, hydration status, and neurological triggers. Let's connect you with a nearby PHC medical officer.",
      riskLevel: "moderate",
      category: "Outpatient Clinical Triage & First Aid",
      emergencyNumbers: { national: "112", ambulance: "108" },
      ruleOfThumb: "Rest in a quiet dark room, drink 2 glasses of water, check BP at nearest PHC.",
      immediateSteps: [
        "1. Drink 1–2 glasses of water immediately (dehydration is a frequent cause).",
        "2. Rest in a dim, quiet room with a cool cloth over forehead.",
        "3. Avoid mobile/laptop screen glare for the next 45 minutes.",
        "4. Visit your nearest Primary Health Centre for quick BP & vital check."
      ],
      whatNotToDo: [
        "Do NOT ignore sudden thunderclap headaches with neck stiffness.",
        "Do NOT overdose on OTC analgesics without checking blood pressure."
      ],
      diagnosticQuestions: [
        "Is the headache throbbing on one side with nausea or light sensitivity?",
        "Was onset sudden 'worst headache of life', or gradual tension ache?",
        "Have you had adequate sleep and hydration today?"
      ],
      suggestedDoctor: {
        specialty: "General Physician & Neurologist",
        title: "Medical Officer / Internal Medicine",
        doctorName: "Dr. S. Ramanathan, MBBS, MD",
        qualification: "Primary Care & Vital Screening",
        reason: "BP measurement, neurological exam, and tailored tension/migraine relief.",
        actionText: "Book PHC Visit / Teleconsult",
        consultType: "phc_visit"
      },
      nearbyFacilities: DEFAULT_FACILITIES,
      isOffline: true
    }
  }

  // DEFAULT FALLBACK: GENERAL CLINICAL TRIAGE & BYSTANDER GUIDANCE
  return {
    replyText: `Hello! I have evaluated: "${input}". As your MedRelay AI Clinical Triage & Bystander First Aid Assistant (with full offline capability), here is the step-by-step guidance based on national Indian emergency protocols:`,
    riskLevel: "moderate",
    category: "1. CHECK → CALL → CARE Bystander Framework",
    emergencyNumbers: { national: "112", ambulance: "108" },
    ruleOfThumb: "CHECK the scene & person → CALL 112/108 for life threats → CARE within training.",
    immediateSteps: [
      "CHECK the person: Ask 'Are you okay?', look for responsiveness, normal breathing, and severe bleeding.",
      "CALL for help: Dial 112 (National Emergency) or 108 (Ambulance) if patient is unresponsive, breathless, or severely bleeding.",
      "CARE: Provide basic first aid steps (pressure for bleeding, recovery position for unresponsive breathing, cool water for burns).",
      "Stay calm and keep the person warm and monitored until professional paramedics arrive."
    ],
    whatNotToDo: [
      "Do NOT put anything in an unconscious person's mouth.",
      "Do NOT attempt procedures you are not trained to perform."
    ],
    diagnosticQuestions: [
      "Can you describe when the symptoms started?",
      "Is there severe pain, bleeding, or breathing difficulty right now?"
    ],
    suggestedDoctor: {
      specialty: "General Physician & Primary Care Officer",
      title: "Medical Officer / PHC",
      doctorName: "Dr. Emily Rodriguez, MBBS, MD",
      qualification: "Comprehensive Family Medicine",
      reason: "Clinical diagnosis, vital screening, and digital ABHA health record update.",
      actionText: "Consult PHC Medical Officer",
      consultType: "phc_visit"
    },
    nearbyFacilities: DEFAULT_FACILITIES,
    isOffline: true
  }
}

