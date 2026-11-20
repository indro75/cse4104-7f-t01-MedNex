# MedNex – Backend Service (Node.js & Express.js)

> **"Understand Your Symptoms. Find the Right Care."**  
> An AI-Powered Healthcare Assistance and Doctor Recommendation System developed for **CSE 4104: Software Development III**.

---

## 👥 Project & Team Information

- **Course:** CSE 4104 – Software Development III
- **Team Name:** `CSE4104-7F-T01` (Section 7F)
- **Backend Architecture & Development Lead:** **Indrojit Sana** (`11230321391`)
- **Assigned Repository:** [https://github.com/indro75/cse4104-7f-t01-MedNex.git](https://github.com/indro75/cse4104-7f-t01-MedNex.git)
- **Primary Regional Hub:** Khulna Division, Bangladesh

---

## ⚠️ Core Medical Safety Tenet

> **"MedNex serves as an initial assistance and informational tool. It does not replace professional medical consultation, provide clinical diagnoses, or prescribe medication."**

- Acute red-flag emergency symptoms suppress conversational flows and prompt the user to call Bangladesh National Emergency **999**.
- Doctor profiles and chamber details reflect verified medical practitioners and regional hospitals in Khulna (KMCH, Gazi Medical, Sheikh Abu Naser Specialized, City Medical).

---

## 📅 20-Day / 20-Commit Backend Development Roadmap

| Day / Commit | Focus Area | Deliverables & Scope |
| :---: | :--- | :--- |
| **Day 01** *(Done)* | **Node.js/Express Foundation** | Express server setup, environment config (`dotenv`), CORS, security headers (`helmet`), persistent safety disclaimer headers (`X-Medical-Disclaimer`), `/` root and `/api/health` diagnostics endpoints, and unit test suite. |
| **Day 02** *(Done)* | **Database Connection (PostgreSQL / Supabase)** | Database client configuration (`pg.Pool` & Supabase), connection pooling, DDL schema for all 9 relational tables (`src/database/schema.sql`), database initialization runner (`npm run db:init`), `/api/health/db` endpoint, and automated test suite. |
| **Day 03** *(Done)* | **User Data Model & Auth Security** | `UserModel` repository with PostgreSQL/fallback support, password hashing with `bcryptjs`, JWT token signing & verification (`jsonwebtoken`), strict & optional authentication middlewares (`authenticate`, `optionalAuth`), input sanitization/validators, and comprehensive test suite. |
| **Day 04** *(Done)* | **Authentication REST API** | Complete `/api/auth` controller and router: registration (`/register`), login (`/login`), 1-Click Demo Patient authentication (`/demo-login`), user profile (`GET /profile`), profile updates (`PUT /profile`), logout (`/logout`), and 32 passing automated tests. |
| **Day 05** *(Current)* | **Doctor & Hospital Data Schemas** | Relational models and repositories for verified doctors (`DoctorModel` with BMDC registration, chamber info, specialty/area filters) and regional hospitals (`HospitalModel` with ICU status, 24/7 ER numbers, bed counts), coordinates validator, and 43 passing automated tests. |
| **Day 06** | **Khulna Medical Data Seeder** | Seeder populating verified Khulna healthcare facilities (KMCH, Gazi Medical, Sheikh Abu Naser, City Medical) and specialist doctors. |
| **Day 07** | **Doctor Directory & Filtering API** | `GET /api/doctors` with multi-criteria filtering by medical specialty, Khulna area (Sadar, Sonadanga, Boyra, etc.), and maximum fee. |
| **Day 08** | **Hospital & Emergency Services API** | `GET /api/hospitals` with emergency hotline, ICU status, emergency ward capabilities, and map coordinates for Leaflet.js. |
| **Day 09** | **Ambulance Service Directory API** | `GET /api/ambulances` with 24/7 fleet contacts, equipment (Oxygen, ICU, BLS), coverage areas, and 999 hotline integration. |
| **Day 10** | **Chamber Serial Booking API** | `POST /api/appointments` and `GET /api/appointments/my` for patient chamber serial booking with queue position and estimated reporting time. |
| **Day 11** | **Google Gemini AI Client & Safety Rules** | Gemini API client setup (`@google/genai`), clinical prompt engineering templates, and emergency keyword interception rules (< 50ms). |
| **Day 12** | **AI Symptom Analysis & Specialty Triage** | `POST /api/symptoms/analyze` utilizing Gemini AI to evaluate patient symptoms, determine urgency level, and recommend the appropriate medical specialty. |
| **Day 13** | **Clinical First-Aid Guidance API** | `GET /api/first-aid` providing reviewed medical protocols for common emergencies (Burns, Choking, Bleeding, Bites) with DOs and DON'Ts. |
| **Day 14** | **Multipart File Upload Infrastructure** | Secure file upload handling using `multer` with MIME-type filtering for diagnostic report PDFs/images and medicine photos. |
| **Day 15** | **AI Medical Report Analyzer API** | `POST /api/reports/analyze` extracting diagnostic biomarkers (CBC, Lipid, Blood Sugar, LFT) via Gemini Multimodal AI and generating plain-language summaries. |
| **Day 16** | **Bangladeshi Pharmaceutical Catalog & Seeder** | Medicine database schema and seed data covering major Bangladeshi brands (Square, Beximco, Incepta) with generic names, indications, and prices. |
| **Day 17** | **Medicine Search & Information API** | `GET /api/medicines/search` endpoint searching by brand name or generic name with dosage, precautions, and side effects. |
| **Day 18** | **AI Medicine Packaging Image Identifier** | `POST /api/medicines/identify-image` identifying medicines from uploaded box or blister strip photos via Gemini Vision API. |
| **Day 19** | **Fitness Assessment (BMI Calculator) API** | `POST /api/fitness/bmi` calculating Body Mass Index, WHO category, health suggestions, and recording longitudinal vitals logs. |
| **Day 20** | **End-to-End API Integration & Deployment** | Automated test suite with Postman collection export, production environment hardening, and Render backend deployment setup. |

---

## 🚀 Day 1 Setup & Execution

### 1. Requirements
- Node.js (v18+ or v20+)
- npm (v9+)

### 2. Installation
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 3. Running the Server
```bash
# Production mode
npm start

# Development mode with hot-reload
npm run dev
```
*Server launches on `http://localhost:5000`.*

### 4. Running Automated Tests
```bash
npm test
```
*Runs native Node.js tests verifying root and health check endpoints.*

### 5. Verified Endpoints
- **Root API Info:** `GET http://localhost:5000/`
- **System Health Diagnostics:** `GET http://localhost:5000/api/health`
