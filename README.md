# MedNex – AI-Powered Healthcare Assistance & Doctor Recommendation System

> **"Understand Your Symptoms. Find the Right Care."**  
> An AI-Powered Healthcare Assistance and Doctor Recommendation System developed for **CSE 4104: Software Development III**.

---

## 📑 Project & Submission Overview

**MedNex** is a full-stack, ethical healthcare companion platform engineered to bridge critical clinical navigation, health literacy, and doctor triage gaps across Bangladesh, with a localized deployment focused on the **Khulna Metropolitan & Divisional area**.

This repository contains the complete codebase, system architecture blueprints, database schemas, UML modeling diagrams, and academic deliverables required for **Phase 2: System Design & Software Architecture**.

### 🌟 Core Clinical Tenets
1. **Zero-Hallucination Verified Registry:** Doctor profiles, BMDC registration numbers, regional hospitals, and emergency ambulance contacts are sourced exclusively from authenticated registries (Khulna Medical College Hospital, Sheikh Abu Naser Specialized Hospital, Gazi Medical, City Medical).
2. **Deterministic Emergency Interception (< 50ms):** Acute red-flag medical emergencies (myocardial infarction, acute stroke, massive hemorrhage, severe respiratory failure) suppress conversational AI flows and immediately initiate 1-tap dialing to the **Bangladesh National Emergency 999 Helpline** and local ICU trauma centers.
3. **Ethical Non-Diagnostic Boundary:** MedNex assists with clinical triage navigation and health literacy; it does not issue prescription medication or replace certified in-person physician examinations.

---

## 👥 Team Information (Section 7F, Team 01)

- **Course:** CSE 4104 – Software Development III
- **Team Name / Identifier:** `CSE4104-7F-T01`
- **Section:** `7F`
- **Assigned Repository:** [https://github.com/indro75/cse4104-7f-t01-MedNex.git](https://github.com/indro75/cse4104-7f-t01-MedNex.git)
- **Primary Regional Hub:** Khulna Division, Bangladesh

### Members & Responsibilities

| Member Name | Student ID | Assigned Project Role | Focus Area |
| :--- | :---: | :--- | :--- |
| **Indrojit Sana** *(Team Leader)* | `11230321391` | Backend Architecture & Engineering | Node.js Express REST API, Security, Auth & System Integration |
| **Sristy Shaha** | `11230321397` | Frontend Development & UI/UX | React 18 SPA, Tailwind CSS, Lucide, Interactive Anatomical Map |
| **Towfiq Ahmed** | `11230321388` | AI & Machine Learning Integration | Google Gemini API, Red-Flag Interceptor & Report OCR |
| **Jannatun Nayim Shorno** | `11230321382` | Database Design & Management | PostgreSQL Schema, ERD, Indexing & Khulna Healthcare Seed DB |

---

## 📁 Repository Structure

The repository is structured strictly according to course guidelines:

```text
cse4104-7f-t01-MedNex/
├── frontend/                   # React 18 Single Page Application (Vite, Tailwind CSS, Lucide)
│   ├── src/                    # Components, pages, layouts, services, context
│   ├── public/                 # Static assets, SVG icons, and redirects
│   └── package.json            # Frontend dependency manifest
├── backend/                    # Node.js & Express.js REST API service
│   ├── src/                    # Controllers, routes, models, middlewares, database
│   ├── test/                   # Automated API test suites (Supertest & node:test)
│   └── server.js               # Application HTTP server entry point
├── database/                   # PostgreSQL relational database persistence
│   ├── schema.sql              # Complete DDL relational schema for all 9 tables
│   └── README.md               # Persistence layer overview & data dictionary
├── documentation/              # Formal academic specifications & submission PDFs
│   └── CSE4104-7F-T01_SystemDesign.pdf # Master Combined System Design Document (A4)
├── diagrams/                   # High-resolution standalone diagram exports (PDF)
│   ├── CSE4104-7F-T01_ArchitectureDiagram.pdf # 4-Tier Enterprise Architecture Diagram
│   ├── CSE4104-7F-T01_ERDiagram.pdf           # Entity Relationship Diagram (9 tables)
│   ├── CSE4104-7F-T01_UseCaseDiagram.pdf      # UML Use Case Diagram (4 actors, 14 UCs)
│   ├── CSE4104-7F-T01_ActivityDiagram.pdf     # UML Activity Diagram (Triage & Booking)
│   └── CSE4104-7F-T01_AIWorkflowDiagram.pdf   # AI Integration & Inference Pipeline
└── README.md                   # Repository guide and roadmap
```

---

## 📄 Submission Deliverables & Direct Links

All deliverables follow the official course naming convention (`CSE4104-7F-T01_*`):

| Deliverable | File Path | Format | Description |
| :--- | :--- | :---: | :--- |
| **Master System Design Document** | [`documentation/CSE4104-7F-T01_SystemDesign.pdf`](./documentation/CSE4104-7F-T01_SystemDesign.pdf) | PDF (A4) | **Comprehensive Master PDF** combining Cover Page, Team Info, Project Info, Architecture, ERD, Use Case, Activity Diagram, API Design, AI Workflow, and References. |
| **System Architecture Diagram** | [`diagrams/CSE4104-7F-T01_ArchitectureDiagram.pdf`](./diagrams/CSE4104-7F-T01_ArchitectureDiagram.pdf) | PDF | 4-Tier Enterprise Architecture: React SPA, Express API, Gemini AI Engine & PostgreSQL Persistence. |
| **Entity Relationship Diagram (ERD)** | [`diagrams/CSE4104-7F-T01_ERDiagram.pdf`](./diagrams/CSE4104-7F-T01_ERDiagram.pdf) | PDF | Complete 9-table normalized schema with Primary Keys, Foreign Keys, Unique Keys, and 1:N cardinalities. |
| **Updated UML Use Case Diagram** | [`diagrams/CSE4104-7F-T01_UseCaseDiagram.pdf`](./diagrams/CSE4104-7F-T01_UseCaseDiagram.pdf) | PDF | All 4 actors (Patient, Doctor, Emergency 999, Admin) across 14 use cases with `<<extend>>` and `<<include>>` links. |
| **UML Activity Diagram** | [`diagrams/CSE4104-7F-T01_ActivityDiagram.pdf`](./diagrams/CSE4104-7F-T01_ActivityDiagram.pdf) | PDF | Multi-lane swimlane workflows for AI Clinical Triage & Chamber Appointment Serial Booking. |
| **AI Integration Workflow Diagram** | [`diagrams/CSE4104-7F-T01_AIWorkflowDiagram.pdf`](./diagrams/CSE4104-7F-T01_AIWorkflowDiagram.pdf) | PDF | Dual-phase pipeline: Local Regex Emergency Interception (< 50ms) + Google Gemini Multimodal Inference. |
| **Database Schema DDL** | [`database/schema.sql`](./database/schema.sql) | SQL | PostgreSQL DDL script with tables, indexes, constraints, and cascade relationships. |

---

## 🏛️ System Architecture Summary

The MedNex system architecture follows a decoupled 4-tier topology:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TIER 1: PRESENTATION LAYER (SPA)                     │
│  React 18 + Vite | Tailwind CSS | Visual SVG Body Map | Leaflet OSM     │
│  Web Audio 100-120 BPM CPR Metronome | Recharts Longitudinal Curves    │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ REST API / HTTPS / JSON / CORS
┌──────────────────────────────────▼─────────────────────────────────────┐
│                 TIER 2: APPLICATION API LAYER (NODE.JS)                │
│  Express.js REST Gateway | Helmet Security | JWT Authentication        │
│  Input Sanitization | Persistent X-Medical-Disclaimer Header Injection │
└───────────────────┬─────────────────────────────────┬──────────────────┘
                    │ Inference                       │ SQL Queries
┌───────────────────▼──────────────────────┐  ┌───────▼──────────────────┐
│      TIER 3: AI & CLINICAL RULES         │  │ TIER 4: PERSISTENCE      │
│ • Deterministic Red-Flag (< 50ms regex)  │  │ • PostgreSQL / Supabase  │
│ • Google Gemini 1.5/2.0 Flash LLM        │  │ • 9 Normalized Tables    │
│ • Multimodal Biomarker Report OCR        │  │ • Khulna Seed Dataset    │
│ • Drug Contraindication Safety Matrix    │  │ • B-Tree Query Indexes   │
└──────────────────────────────────────────┘  └──────────────────────────┘
```

---

## 🗄️ Relational Database Summary (9 Normalized Tables)

1. `users`: Patient accounts, bcrypt password hash, demographic vitals, emergency contacts, JSONB allergies.
2. `doctors`: Verified BMDC specialists in Khulna with qualifications, visiting schedules, chambers, fees, and GPS coordinates.
3. `hospitals`: Khulna healthcare facilities (KMCH, Gazi Medical, Sheikh Abu Naser, City Medical) with ICU bed status and emergency hotlines.
4. `ambulances`: 24/7 emergency medical transport fleets categorized by life-support capability (ICU, BLS, Oxygen, Ventilator).
5. `appointments`: Sequential chamber serial reservations with calculated estimated arrival times.
6. `medicines`: Commercial pharmaceuticals marketed in Bangladesh (Square, Beximco, Incepta) with generic names and pricing.
7. `drug_interactions`: Pharmacological pairwise contraindication matrix with severity indicators.
8. `bmi_logs`: Longitudinal anthropometric records for patient vitals tracking.
9. `health_activities`: Unified chronological patient medical activity timeline.

---

## 🤖 AI Integration & Safety Architecture

- **Why AI is Needed:** Bridges health literacy gaps, prevents incorrect specialist appointments, translates dense laboratory reports, and prepares actionable doctor consultation checklists.
- **Model Choice:** Google Gemini 1.5/2.0 Flash (`@google/genai`) for structured JSON classification and multimodal parsing.
- **Dual-Phase Safety Architecture:**
  - **Phase 1 (< 50ms):** Local deterministic regex filter checks for cardiac arrest, stroke, severe respiratory failure, or massive bleeding. If detected, LLM calls are suppressed and users are routed to 999.
  - **Phase 2 (1.0s):** Sanitized patient input is processed by Gemini Flash to determine urgency level, recommend a medical discipline, explain reasoning in plain language, and synthesize 3 targeted questions for the doctor visit.
  - **Zero-Hallucination Verification:** The predicted specialty is matched strictly against real BMDC doctors stored in the PostgreSQL database.

---

## 📅 Development Roadmap Progress (Days 1–6 Completed)

| Phase / Day | Status | Scope & Deliverables |
| :---: | :---: | :--- |
| **Day 01–02** | **Done** | Express REST API foundation, security headers (`helmet`), `/api/health` diagnostics, PostgreSQL / Supabase connection pooling, 9 relational schema tables, and DB init runners. |
| **Day 03–04** | **Done** | `UserModel` repository, bcryptjs password hashing, JWT token signing, strict/optional auth middlewares, and full `/api/auth` router with 32 passing automated tests. |
| **Day 05–06** | **Current** | `DoctorModel` and `HospitalModel` repositories, coordinates validator, idempotent Khulna healthcare seeder populating real BMDC specialists across 11 clinical disciplines, and `/api/health/seed-status`. |
| **Day 07–10** | **Upcoming** | Doctor directory & filtering API, hospital/ambulance locator, and sequential chamber serial booking engine. |
| **Day 11–13** | **Upcoming** | Google Gemini AI integration, clinical prompt templates, deterministic red-flag regex rules, and CPR metronome. |
| **Day 14–16** | **Upcoming** | Multipart file upload with `multer`, multimodal lab report OCR analyzer, and Bangladeshi pharmaceutical catalog. |
| **Day 17–20** | **Upcoming** | Drug interaction matrix, medicine package image identifier, BMI vitals tracker, automated integration tests, and Render cloud deployment. |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)
- PostgreSQL / Supabase instance (optional; in-memory fallback enabled for offline testing)

### Setup & Execution
```bash
# 1. Clone repository
git clone https://github.com/indro75/cse4104-7f-t01-MedNex.git
cd cse4104-7f-t01-MedNex

# 2. Setup and run backend
cd backend
npm install
npm run db:init     # Initialize database tables
npm run db:seed     # Seed Khulna healthcare facilities & BMDC specialists
npm run dev         # Starts server on http://localhost:5000

# 3. Run automated tests
npm test

# 4. Setup and run frontend
cd ../frontend
npm install
npm run dev         # Starts Vite client on http://localhost:5173
```
