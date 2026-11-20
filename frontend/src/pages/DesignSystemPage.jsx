import React, { useState } from 'react';
import {
  HeartPulse,
  Activity,
  AlertOctagon,
  Flame,
  CheckCircle2,
  Stethoscope,
  PhoneCall,
  Search,
  Sparkles,
  ShieldCheck,
  Calendar,
  Building2,
  ArrowRight,
} from 'lucide-react';
import {
  Badge,
  Button,
  Alert,
  Modal,
  Card,
  Input,
  Select,
  Textarea,
  RangeSlider,
  SkeletonCard,
  SkeletonDoctor,
  Spinner,
} from '../components/common';

export default function DesignSystemPage() {
  const [standardModalOpen, setStandardModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [painLevel, setPainLevel] = useState(6);
  const [inputText, setInputText] = useState('Dr. M. A. Hasan');
  const [hasError, setHasError] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CSE 4104 Frontend Day 02 Deliverable</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          MedNex Clinical Design System & UI Library
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          Standardized medical UI primitives engineered for high-accessibility (WCAG 2.1 AA), clinical urgency communication, and rapid frontend development.
        </p>
      </div>

      {/* 1. STATUS BADGES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>1. Clinical Status Badges</span>
          </h2>
          <span className="text-xs text-slate-400">Component: &lt;Badge /&gt;</span>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="emergency" dot pulse>
              Emergency 999
            </Badge>
            <Badge variant="critical" dot>
              Critical (Hb &lt; 7.0)
            </Badge>
            <Badge variant="warning" dot>
              Elevated Warning
            </Badge>
            <Badge variant="success" dot>
              Normal Range
            </Badge>
            <Badge variant="verified" icon={<ShieldCheck className="w-3 h-3 text-emerald-600" />}>
              BMDC Verified
            </Badge>
            <Badge variant="primary">NLP Triage</Badge>
            <Badge variant="neutral">Khulna Sadar</Badge>
          </div>

          <div className="pt-2 text-xs text-slate-500 flex items-center gap-4">
            <span className="font-semibold text-slate-700">Available Sizes:</span>
            <Badge size="xs" variant="primary">Extra Small</Badge>
            <Badge size="sm" variant="primary">Small (Default)</Badge>
            <Badge size="md" variant="primary">Medium</Badge>
            <Badge size="lg" variant="primary">Large</Badge>
          </div>
        </div>
      </section>

      {/* 2. BUTTONS & ACTIONS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>2. Action Buttons & Triggers</span>
          </h2>
          <span className="text-xs text-slate-400">Component: &lt;Button /&gt;</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" icon={<Activity className="w-4 h-4" />}>
              Primary Triage
            </Button>
            <Button variant="emergency" icon={<Flame className="w-4 h-4" />}>
              Emergency 999
            </Button>
            <Button variant="teal" icon={<Stethoscope className="w-4 h-4" />}>
              Book Serial
            </Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="danger">Cancel Serial</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs">
            <Button
              variant="primary"
              loading={btnLoading}
              onClick={() => {
                setBtnLoading(true);
                setTimeout(() => setBtnLoading(false), 2000);
              }}
            >
              Click For Loading State (2s)
            </Button>
            <Button variant="primary" disabled>
              Disabled State
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Search className="w-3.5 h-3.5" />}
            >
              Small Size
            </Button>
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Large Size
            </Button>
          </div>
        </div>
      </section>

      {/* 3. CLINICAL ALERTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-lg font-bold text-slate-900">3. Medical Alerts & Warnings</h2>
          <span className="text-xs text-slate-400">Component: &lt;Alert /&gt;</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert
            variant="emergency"
            title="Red-Flag Cardiac Symptom Intercepted"
            dismissible
            onDismiss={() => {}}
            action={
              <a
                href="tel:999"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call 999 Immediately</span>
              </a>
            }
          >
            Patient described acute crushing chest pain radiating to left jaw. Conversational triage suppressed for patient safety.
          </Alert>

          <Alert
            variant="critical"
            title="Critical Biomarker Value: Platelets 45,000 /µL"
            dismissible
            onDismiss={() => {}}
          >
            Platelet count is critically lower than standard biological reference ranges (150,000–450,000 /µL). Immediate clinical evaluation recommended.
          </Alert>

          <Alert
            variant="warning"
            title="Drug-Drug Moderate Interaction Detected"
            dismissible
            onDismiss={() => {}}
          >
            Ciprofloxacin binds with Aluminium Hydroxide antacids, reducing absorption by up to 85%. Administer 2 hours apart.
          </Alert>

          <Alert
            variant="success"
            title="Appointment Serial #14 Confirmed"
            dismissible
            onDismiss={() => {}}
          >
            Your chamber serial for Dr. M. A. Hasan at Gazi Medical College Hospital has been registered for Nov 22, 2026.
          </Alert>
        </div>
      </section>

      {/* 4. FORM INPUTS & PAIN RANGE SLIDER */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-lg font-bold text-slate-900">4. Clinical Form Controls & Pain Scale</h2>
          <span className="text-xs text-slate-400">FR-09 Pain Slider & Inputs</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Patient Full Name"
              placeholder="e.g. Indrojit Sana"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              required
              helperText="As printed on government National ID or hospital registration."
              error={hasError ? 'Name is required to confirm serial booking.' : undefined}
            />

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setHasError(!hasError)}
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 underline"
              >
                Toggle Field Error State
              </button>
            </div>

            <Select
              label="Khulna Regional Area"
              options={[
                { value: 'sonadanga', label: 'Sonadanga' },
                { value: 'boyra', label: 'Boyra (KMCH Zone)' },
                { value: 'sadar', label: 'Khulna Sadar' },
                { value: 'khalishpur', label: 'Khalishpur' },
                { value: 'daulatpur', label: 'Daulatpur' },
              ]}
              defaultValue="boyra"
              helperText="Filter doctors and emergency chambers by locality."
            />

            <Textarea
              label="Clinical Symptom Description"
              placeholder="Describe what you are feeling, where it is located, and when it started..."
              rows={3}
              helperText="Our NLP model will analyze this to recommend the matching medical specialty."
            />
          </div>

          <div className="space-y-6 flex flex-col justify-between">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="font-bold text-sm text-slate-800">
                Interactive Pain Severity Slider (FR-09)
              </h3>
              <p className="text-xs text-slate-500">
                Visual gradient slider capturing subjective patient discomfort from Level 1 (minimal) to Level 10 (excruciating).
              </p>
              <RangeSlider
                value={painLevel}
                onChange={(e) => setPainLevel(Number(e.target.value))}
              />
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 space-y-2">
              <span className="text-[10px] uppercase font-bold text-sky-700 tracking-wider">
                WCAG 2.1 AA Compliance Note
              </span>
              <p className="text-xs text-sky-900 leading-relaxed">
                All inputs use 14px minimum body fonts, high-contrast borders, explicit labels linked via IDs, and red error badges for screen-reader accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEDICAL CARDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-lg font-bold text-slate-900">5. Medical Information Cards</h2>
          <span className="text-xs text-slate-400">Component: &lt;Card /&gt;</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card
            title="Dr. M. A. Hasan"
            subtitle="Cardiology Specialist"
            statusAccent="emergency"
            badge={<Badge variant="verified">BMDC Verified</Badge>}
            hover
            footer={
              <>
                <span className="font-semibold text-slate-700">Fee: ৳ 1,000</span>
                <span className="text-sky-600 font-bold">Serial #14 Available</span>
              </>
            }
          >
            <div className="text-xs text-slate-600 space-y-1.5">
              <p><strong>Hospital:</strong> Gazi Medical College Hospital</p>
              <p><strong>Visiting:</strong> Saturday – Thursday (5:00 PM – 9:00 PM)</p>
              <p><strong>Area:</strong> Sonadanga, Khulna</p>
            </div>
          </Card>

          <Card
            title="Khulna Medical College Hospital"
            subtitle="Public Tertiary Teaching Hospital"
            statusAccent="success"
            badge={<Badge variant="success">24/7 ICU</Badge>}
            hover
            footer={
              <>
                <span className="font-semibold text-slate-700">500 Total Beds</span>
                <a href="tel:01711234567" className="text-red-600 font-bold flex items-center gap-1">
                  <PhoneCall className="w-3 h-3" />
                  <span>Call ER</span>
                </a>
              </>
            }
          >
            <div className="text-xs text-slate-600 space-y-1.5">
              <p><strong>Location:</strong> Boyra Main Road, Khulna</p>
              <p><strong>Emergency Ward:</strong> Active 24 Hours</p>
              <p><strong>Ambulance:</strong> 4 Units On-Standby</p>
            </div>
          </Card>

          <Card
            title="Complete Blood Count (CBC)"
            subtitle="Diagnostic Laboratory Report"
            statusAccent="warning"
            badge={<Badge variant="warning">1 Out of Range</Badge>}
            hover
            footer={
              <>
                <span className="text-slate-500">Analyzed via OCR</span>
                <span className="text-sky-600 font-bold">View Questions</span>
              </>
            }
          >
            <div className="text-xs text-slate-600 space-y-1.5">
              <p><strong>Hemoglobin:</strong> 9.2 g/dL (Low in Amber)</p>
              <p><strong>WBC:</strong> 7,800 /µL (Normal)</p>
              <p><strong>Platelets:</strong> 240,000 /µL (Normal)</p>
            </div>
          </Card>
        </div>
      </section>

      {/* 6. MODALS & DIALOGS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-lg font-bold text-slate-900">6. Accessible Dialog Modals</h2>
          <span className="text-xs text-slate-400">Component: &lt;Modal /&gt;</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-wrap items-center gap-4">
          <Button
            variant="outline"
            icon={<Calendar className="w-4 h-4 text-sky-600" />}
            onClick={() => setStandardModalOpen(true)}
          >
            Launch Chamber Booking Modal
          </Button>

          <Button
            variant="emergency"
            icon={<AlertOctagon className="w-4 h-4" />}
            onClick={() => setEmergencyModalOpen(true)}
          >
            Launch Red-Flag Emergency Takeover Modal
          </Button>
        </div>

        {/* Standard Modal Preview */}
        <Modal
          isOpen={standardModalOpen}
          onClose={() => setStandardModalOpen(false)}
          title="Chamber Serial Booking"
          subtitle="Dr. M. A. Hasan (BMDC #A-48291)"
          icon={<Stethoscope className="w-5 h-5 text-sky-600" />}
          footer={
            <>
              <Button variant="outline" onClick={() => setStandardModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  alert('Serial reservation confirmed!');
                  setStandardModalOpen(false);
                }}
              >
                Confirm Serial #14
              </Button>
            </>
          }
        >
          <div className="space-y-3 text-xs">
            <p className="text-slate-600">
              Please verify your patient information before reserving your serial number.
            </p>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div><strong>Doctor:</strong> Dr. M. A. Hasan (Cardiologist)</div>
              <div><strong>Chamber:</strong> Room 304, Gazi Medical College Hospital</div>
              <div><strong>Estimated Reporting Time:</strong> 6:30 PM</div>
              <div><strong>Consultation Fee:</strong> ৳ 1,000 (Payable at Chamber)</div>
            </div>
          </div>
        </Modal>

        {/* High-Priority Red-Flag Emergency Modal Preview (FR-11, UC-04) */}
        <Modal
          isOpen={emergencyModalOpen}
          onClose={() => setEmergencyModalOpen(false)}
          title="CRITICAL RED-FLAG EMERGENCY INTERCEPTION"
          subtitle="Suspected Acute Myocardial Infarction / Life-Threatening Crisis"
          isEmergency
          size="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-red-700 font-bold">
                Standard conversational triage has been suppressed.
              </span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEmergencyModalOpen(false)}>
                  Dismiss Override
                </Button>
                <a
                  href="tel:999"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call 999 Now</span>
                </a>
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-red-100/70 border border-red-300 text-red-950 text-xs sm:text-sm font-medium leading-relaxed">
              ⚠️ The symptoms entered indicate an acute life-threatening emergency. MedNex advises you not to wait for doctor chamber appointments or online triage.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Nearest Khulna ER:</span>
                <p className="font-semibold text-slate-900">Khulna Medical College Hospital (KMCH)</p>
                <p className="text-slate-500">Boyra Main Road, Khulna</p>
                <a href="tel:01711234567" className="text-red-600 font-bold mt-1 inline-block">
                  ER Desk: 01711-234567
                </a>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">24/7 ICU Ambulance:</span>
                <p className="font-semibold text-slate-900">Khulna Central Ambulance Service</p>
                <p className="text-slate-500">Equipped with Oxygen & Cardiac Monitor</p>
                <a href="tel:01712345678" className="text-red-600 font-bold mt-1 inline-block">
                  Dispatcher: 01712-345678
                </a>
              </div>
            </div>
          </div>
        </Modal>
      </section>

      {/* 7. LOADING SKELETONS & SPINNERS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-lg font-bold text-slate-900">7. Loading Skeletons & Spinners (NFR-01)</h2>
          <span className="text-xs text-slate-400">Perceived Performance & Transitions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center space-y-3">
            <Spinner size="lg" />
            <span className="text-xs text-slate-500 font-medium">Spinner (&lt;Spinner /&gt;)</span>
          </div>

          <SkeletonCard />
          <SkeletonDoctor />
        </div>
      </section>
    </div>
  );
}
