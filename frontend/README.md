# MedNex – Frontend Client (React & Vite)

> **"Understand Your Symptoms. Find the Right Care."**  
> An AI-Powered Healthcare Assistance and Doctor Recommendation System developed for **CSE 4104: Software Development III**.

---

## 👥 Project & Team Information

- **Course:** CSE 4104 – Software Development III
- **Team Name:** `CSE4104-7F-T01` (Section 7F)
- **Frontend Architecture & UI/UX Lead:** **Sristy Shaha** (`11230321397`)
- **Backend Architecture & Development Lead:** Indrojit Sana (`11230321391`)
- **AI & Machine Learning Lead:** Towfiq Ahmed (`11230321388`)
- **Database Design & Management Lead:** Jannatun Nayim Shorno (`11230321382`)
- **Assigned Repository:** [https://github.com/indro75/cse4104-7f-t01-MedNex.git](https://github.com/indro75/cse4104-7f-t01-MedNex.git)
- **Primary Regional Deployment:** Khulna Division, Bangladesh

---

## ⚠️ Core Medical Safety Tenet

> **"MedNex serves as an initial assistance and informational tool. It does not replace professional medical consultation, provide clinical diagnoses, or prescribe medication."**

- **Persistent Safety Disclaimer (NFR-15, FR-02):** A persistent banner and legal reminder inform users that MedNex provides triage navigation, not clinical prescriptions.
- **Immediate Red-Flag Interception (< 50ms) (FR-11, FR-24):** Acute conditions (crushing chest pain, sudden unilateral weakness, acute respiratory distress) trigger prominent red-flag warnings directing the user to dial the Bangladesh National Emergency Helpline **999**.
- **Khulna Regional Focus (FR-13, FR-28):** Verified directory linking patients to Khulna Medical College Hospital (KMCH), Shahid Sheikh Abu Naser Specialized Hospital, Gazi Medical, and regional chambers.

---

## 📅 20-Day / 20-Commit Frontend Development Roadmap

| Day / Commit | Focus Area | Deliverables & Scope | SRS Mapping |
| :---: | :--- | :--- | :---: |
| **Day 01** *(Completed)* | **Vite + React Foundation & UI Shell** | Vite SPA foundation, Tailwind CSS setup, responsive header with MedNex branding, sticky mobile bottom navigation, slide-over drawer, persistent medical disclaimer banner, 999 hotline dialer anchor, REST API diagnostics monitor, and home landing view. | NFR-05, NFR-06, NFR-07, NFR-08, NFR-15, FR-02, FR-24 |
| **Day 02** *(Completed)* | **Design System & Component Library** | Standardized medical UI primitives: Status Badges (Emergency, Critical, Warning, Success), Modal dialogs, loading skeletons, clinical input fields (Input, Select, Textarea, RangeSlider for pain severity scale 1-10), WCAG AA contrast buttons, and interactive Design System Showcase page (`/design-system`). | NFR-07, NFR-08, FR-09 |
| **Day 03** *(Completed)* | **Global State & API Service Architecture** | `AuthContext` (JWT session management, 1-click Demo Patient login, clinical profile metadata), `HealthContext` (longitudinal patient health activity timeline, JSON export per FR-41, live system diagnostics monitor), centralized API client with JWT bearer interceptors, `SafeStorage` with memory fallback (NFR-16), and interactive state architecture monitor (`/state-architecture`). | NFR-16, NFR-19, FR-01, FR-03, FR-06, FR-41 |
| **Day 04** | **User Authentication & Profile UI** | Registration form (`/signup`) with mandatory Medical Safety Disclaimer agreement checkbox, login screen (`/login`), user clinical profile management (`/profile`), and protected route guards. | FR-01, FR-02, FR-03, FR-04, FR-06 |
| **Day 05** | **Emergency & 24/7 Ambulance Hub** | Dedicated emergency page (`/emergency`), prominent 999 one-tap dialer, verified 24/7 ambulance cards categorized by type (ICU, Standard BLS, NICU), equipment badges (oxygen, ventilator), and direct driver calling. | FR-24, FR-25, FR-26, FR-27 |
| **Day 06** | **Khulna Hospital & ER Directory** | Regional hospital directory (`/hospitals`) featuring KMCH, Gazi Medical, Sheikh Abu Naser, and City Medical with 24/7 ICU status, emergency ward capabilities, and direct call actions. | FR-28, NFR-14 |
| **Day 07** | **Interactive Map Integration (Leaflet.js)** | Geospatial visualization using OpenStreetMap & Leaflet.js to plot Khulna hospitals, emergency clinics, and ambulance dispatch bases with interactive map markers. | FR-15, FR-28 |
| **Day 08** | **Verified Doctor Directory & Search UI** | Doctor search interface (`/doctors`) with BMDC registration badges, specialty filters, Khulna area selectors (Sadar, Sonadanga, Boyra, Khalishpur, etc.), fee sliders, and chamber details. | FR-13, FR-14, NFR-14 |
| **Day 09** | **Chamber Serial Reservation System** | Interactive serial reservation modal (`/book-appointment`), real-time serial queue estimator, patient intake form, and instant digital serial ticket generation. | FR-16, FR-17 |
| **Day 10** | **Patient Dashboard & Appointment Tracking** | Patient home dashboard (`/dashboard`) displaying active serial ticket pills, consultation time countdowns, cancellation workflow, and quick health utility shortcuts. | FR-18 |
| **Day 11** | **Interactive Anatomical Body Map (SVG)** | Interactive visual SVG anatomical body map component (Head, Chest, Abdomen, Back, Limbs, Pelvis, Skin) for intuitive multi-region symptom intake. | FR-08 |
| **Day 12** | **AI Symptom Intake & Assessment Form** | Symptom triage intake page (`/symptom-checker`) combining conversational natural language queries, body map region tagging, duration dropdown, and 1-10 pain severity slider. | FR-07, FR-09, FR-10 |
| **Day 13** | **Red-Flag Emergency Interception Modal** | High-priority client-side emergency warning takeover modal (`bg-red-600`) triggered within 50ms upon detecting acute symptoms, offering immediate 999 dialing and nearest Khulna ER routing. | FR-11, NFR-03, NFR-13 |
| **Day 14** | **Clinical Triage Results & Recommendation UI** | Visual triage outcome display presenting predicted medical specialties, urgency level badges, rationale cards, and 1-click filter links to verified Khulna specialists. | FR-12 |
| **Day 15** | **Clinical First-Aid Protocols & CPR Metronome** | First-aid guide (`/first-aid`) for burns, bleeding, choking, bites with color-coded DOs/DON'Ts, and interactive Web Audio CPR Metronome (100–120 BPM) with visual pulse animation. | FR-29, FR-30, FR-31 |
| **Day 16** | **Diagnostic Report Upload & Preset Selector** | Lab report analyzer UI (`/report-analyzer`) supporting drag-and-drop PDF/image upload, file validation, and pre-configured clinical sample presets (CBC, Lipid, LFT). | FR-19, FR-20 |
| **Day 17** | **Biomarker Results & Doctor Question Checklist UI** | Biomarker visualization table with Low/Normal/Elevated/Critical status gauges, plain-language patient explanations, and exportable doctor consultation checklist. | FR-21, FR-22, FR-23 |
| **Day 18** | **Bangladeshi Medicine Directory & Search UI** | Commercial drug search interface (`/medicines`) covering Bangladeshi brands (Napa, Seclo, Monas, etc.), dosage forms, BDT pricing, indications, side effects, and food interactions. | FR-32, FR-33, FR-34 |
| **Day 19** | **Multi-Drug Interaction Safety Checker** | Dual-drug interaction evaluator UI (`/medicine-interactions`) displaying color-coded severity banners (Contraindicated/Caution/Monitor), mechanism explanations, and clinical advice. | FR-35, FR-36 |
| **Day 20** | **BMI Calculator, Longitudinal Vitals Chart & Export** | Vitals tracker (`/fitness`) calculating BMI & WHO category, longitudinal weight curves (Recharts), chronological health timeline, and JSON medical history export. | FR-37, FR-38, FR-39, FR-40, FR-41 |

---

## 🚀 Day 1 Setup & Execution

### 1. Requirements
- Node.js (v18+ or v20+)
- npm (v9+)

### 2. Installation
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 3. Running the Development Server
```bash
npm run dev
```
*Application launches on `http://localhost:5173` with proxy routing to the backend API on port 5000.*

### 4. Running Production Build
```bash
npm run build
```
*Bundles optimized, minified production assets into the `dist/` directory.*

### 5. Running Automated Tests
```bash
npm test
```
*Runs native Node.js tests verifying medical disclaimer requirements, emergency hotlines, Khulna hospital seeds, core platform features, and build assets.*

---

## 🏗️ Folder Structure (Day 03)

```
frontend/
├── dist/                          # Production build output
├── public/
│   └── mednex-logo.svg            # MedNex clinical SVG logo & favicon
├── src/
│   ├── assets/                    # Static image & vector assets
│   ├── components/
│   │   ├── common/                # Standardized Medical Design System Primitives
│   │   │   ├── Alert.jsx          # Medical alerts with Emergency, Critical, Warning, Success
│   │   │   ├── Badge.jsx          # Urgency status badges with pulse dots & icons
│   │   │   ├── Button.jsx         # Action buttons with loading spinner & emergency styles
│   │   │   ├── Card.jsx           # Information cards with left accent urgency borders
│   │   │   ├── Input.jsx          # Clinical text input with error validation
│   │   │   ├── Modal.jsx          # Accessible dialog with Red-Flag emergency takeover
│   │   │   ├── RangeSlider.jsx    # FR-09 Pain severity scale (1-10) with color gradient
│   │   │   ├── Select.jsx         # Accessible dropdown selector with chevron
│   │   │   ├── Skeleton.jsx       # Loading placeholders (Card, Doctor, Hospital, Spinner)
│   │   │   ├── Textarea.jsx       # Clinical symptom description textarea
│   │   │   └── index.js           # Common component barrel export
│   │   └── layout/                # Shell layout components
│   │       ├── Footer.jsx         # Regional hub & team attribution footer
│   │       ├── Header.jsx         # Top navigation bar with MedNex branding & session pill
│   │       ├── Layout.jsx         # Primary layout container with Outlet
│   │       ├── MobileBottomNav.jsx # Sticky mobile bottom navigation (NFR-06)
│   │       ├── MobileDrawer.jsx   # Slide-over service drawer with user profile card
│   │       └── SafetyDisclaimerBanner.jsx # Persistent medical disclaimer (NFR-15)
│   ├── constants/
│   │   └── medical.js             # Disclaimers, hotlines, Khulna hospitals, pain scale bands
│   ├── context/
│   │   ├── AuthContext.jsx        # JWT session, 1-click Demo Patient, clinical metadata
│   │   ├── HealthContext.jsx      # System diagnostics, activity timeline & JSON export (FR-41)
│   │   └── index.js               # Context barrel export (useAuth, useHealth)
│   ├── pages/
│   │   ├── DesignSystemPage.jsx   # Day 02 interactive component showcase (/design-system)
│   │   ├── HomePage.jsx           # Landing page with 7-feature showcase & API monitor
│   │   ├── NotFoundPage.jsx       # 404 error page
│   │   ├── PlaceholderPage.jsx    # Roadmap navigation placeholders with SRS references
│   │   └── StateArchitecturePage.jsx # Day 03 live state & activity timeline monitor
│   ├── services/
│   │   ├── api.js                 # Centralized API client with automatic JWT injection
│   │   ├── authService.js         # Authentication REST API endpoints & profile management
│   │   ├── healthService.js       # System health & database diagnostics service
│   │   └── storage.js             # SafeStorage with localStorage & in-memory fallback (NFR-16)
│   ├── styles/
│   │   └── index.css              # Tailwind CSS directives and custom animations
│   ├── App.jsx                    # React Router DOM with AuthProvider & HealthProvider
│   └── main.jsx                   # React entry point
├── test/
│   └── frontend.test.js           # Day 1, Day 2 & Day 3 unit & verification test suite
├── .env.example                   # Environment variable template
├── index.html                     # HTML5 entry point with Inter & Plus Jakarta fonts
├── package.json                   # Dependencies, scripts & author metadata
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Healthcare color palette & styling theme
├── vite.config.js                 # Vite bundler & backend proxy config
└── README.md                      # Frontend roadmap & architectural documentation
```
