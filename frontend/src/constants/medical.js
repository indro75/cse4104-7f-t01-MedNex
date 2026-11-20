/**
 * MedNex Platform Constants & Medical Clinical Tenets
 * Course: CSE 4104 - Software Development III
 * Primary Deployment Hub: Khulna Division, Bangladesh
 */

export const MEDICAL_SAFETY_DISCLAIMER =
  "MedNex serves as an initial assistance and informational tool. It does not replace professional medical consultation, provide clinical diagnoses, or prescribe medication. In life-threatening emergencies, dial 999 or proceed immediately to the nearest hospital emergency room.";

export const BANGLADESH_HOTLINES = {
  NATIONAL_EMERGENCY: "999",
  HEALTH_CALL_CENTER: "16263",
  AMBULANCE_DIRECT: "999",
  DISASTER_ALERTS: "1090",
};

export const KHULNA_PRIMARY_HOSPITALS = [
  {
    id: "hosp-kmch",
    name: "Khulna Medical College Hospital (KMCH)",
    area: "Boyra, Khulna",
    emergencyPhone: "01711-234567",
    hasIcu: true,
    hasEmergencyWard: true,
    totalBeds: 500,
    type: "Public Tertiary Teaching Hospital",
  },
  {
    id: "hosp-sannsh",
    name: "Shahid Sheikh Abu Naser Specialized Hospital",
    area: "Mujgunni, Khulna",
    emergencyPhone: "01712-345678",
    hasIcu: true,
    hasEmergencyWard: true,
    totalBeds: 250,
    type: "Specialized Super-Care Center",
  },
  {
    id: "hosp-gazi",
    name: "Gazi Medical College & Hospital",
    area: "Sonadanga, Khulna",
    emergencyPhone: "01713-456789",
    hasIcu: true,
    hasEmergencyWard: true,
    totalBeds: 350,
    type: "Private Medical College Hospital",
  },
  {
    id: "hosp-city",
    name: "Khulna City Medical College Hospital",
    area: "Sadar, Khulna",
    emergencyPhone: "01714-567890",
    hasIcu: true,
    hasEmergencyWard: true,
    totalBeds: 250,
    type: "Private Healthcare Center",
  },
];

export const CORE_PLATFORM_FEATURES = [
  {
    id: "symptom-checker",
    title: "AI Symptom Checker & Triage",
    badge: "NLP + Naive Bayes",
    description:
      "Describe symptoms in plain text or interact with our SVG body map. System flags emergency red flags and guides you to the right medical specialty.",
    icon: "Activity",
    path: "/symptom-checker",
    color: "from-sky-500 to-blue-600",
    status: "Upcoming (Day 11-14)",
  },
  {
    id: "doctor-directory",
    title: "Verified Khulna Doctors",
    badge: "BMDC Verified",
    description:
      "Search verified physicians in Khulna by specialty, consultation fee, and area. Reserve your chamber serial number online with live queue tracking.",
    icon: "Stethoscope",
    path: "/doctors",
    color: "from-blue-600 to-indigo-600",
    status: "Upcoming (Day 08-10)",
  },
  {
    id: "emergency-ambulance",
    title: "Ambulance & 999 Hotline",
    badge: "24/7 Verified Fleet",
    description:
      "Single-tap emergency dialer for national 999 hotline and direct telephonic routing to ICU, BLS, and Oxygen ambulance providers in Khulna.",
    icon: "Ambulance",
    path: "/emergency",
    color: "from-red-500 to-rose-600",
    status: "Upcoming (Day 05)",
  },
  {
    id: "first-aid",
    title: "Clinical First Aid & CPR",
    badge: "Acoustic CPR 100-120 BPM",
    description:
      "Step-by-step first-aid protocols with DOs and DON'Ts for burns, bleeding, choking, and snakebites, backed by an interactive audio CPR metronome.",
    icon: "HeartPulse",
    path: "/first-aid",
    color: "from-rose-500 to-pink-600",
    status: "Upcoming (Day 15)",
  },
  {
    id: "report-analyzer",
    title: "Diagnostic Report Analyzer",
    badge: "Biomarker Parser",
    description:
      "Upload lab reports (CBC, Lipid, LFT) or test presets. Translates numerical values into understandable plain-language guides and doctor questions.",
    icon: "FileText",
    path: "/report-analyzer",
    color: "from-emerald-500 to-teal-600",
    status: "Upcoming (Day 16-17)",
  },
  {
    id: "medicine-safety",
    title: "Medicine & Interaction Guide",
    badge: "Bangladeshi Catalog",
    description:
      "Comprehensive database of Bangladeshi medicines (Square, Beximco, Incepta), unit BDT pricing, and dual-drug interaction safety checking.",
    icon: "Pill",
    path: "/medicines",
    color: "from-teal-500 to-cyan-600",
    status: "Upcoming (Day 18-19)",
  },
  {
    id: "fitness-vitals",
    title: "BMI & Longitudinal Vitals",
    badge: "WHO Standards",
    description:
      "Calculate your Body Mass Index (BMI), BMR, and hydration targets. Track longitudinal health metrics with exportable clinical history.",
    icon: "Scale",
    path: "/fitness",
    color: "from-violet-500 to-purple-600",
    status: "Upcoming (Day 20)",
  },
];

export const PAIN_SEVERITY_BANDS = [
  { min: 1, max: 3, label: 'Mild Pain', color: 'bg-emerald-500 text-emerald-800 bg-emerald-100 border-emerald-300' },
  { min: 4, max: 6, label: 'Moderate Pain', color: 'bg-amber-500 text-amber-900 bg-amber-100 border-amber-300' },
  { min: 7, max: 8, label: 'Severe Pain', color: 'bg-orange-500 text-orange-900 bg-orange-100 border-orange-300' },
  { min: 9, max: 10, label: 'Critical / Excruciating', color: 'bg-red-600 text-red-900 bg-red-100 border-red-300' },
];

export function getPainSeverityInfo(score) {
  const num = Number(score);
  return (
    PAIN_SEVERITY_BANDS.find((b) => num >= b.min && num <= b.max) || {
      label: 'Unspecified',
      color: 'bg-slate-500 text-slate-800 bg-slate-100 border-slate-300',
    }
  );
}
