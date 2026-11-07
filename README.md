# MedNex

> **"Understand Your Symptoms. Find the Right Care."**  
> An AI-Powered Healthcare Assistance and Doctor Recommendation System developed for **CSE 4104: Software Development III**.

---

## 📌 Project Overview

**MedNex** is a web-based healthcare platform designed to streamline how individuals access basic medical information and connect with appropriate healthcare services. 

Navigating the healthcare system can often be daunting—patients frequently struggle to identify which specialist to consult based on their symptoms, locate trusted nearby doctors, decipher complex lab reports, or verify medications. Furthermore, critical details such as ambulance contacts or baseline health metrics (e.g., BMI) are scattered across fragmented services.

MedNex bridges this gap by unifying essential healthcare utilities into an intuitive, single-access platform. Powered by AI, the application analyzes natural language symptom descriptions, simplifies diagnostic reports, provides verified first-aid guidance, and facilitates discovery of nearby medical facilities and emergency services.

> **Disclaimer:** MedNex serves as an initial assistance and informational tool. It does not replace professional medical consultation, provide clinical diagnoses, or prescribe medication.

---

## 👥 Team Information

- **Team Name:** `CSE4104-7F-T01`
- **Section:** `7F`
- **Course:** CSE 4104 – Software Development III
- **GitHub Repository:** [cse4104-7f-t01-MedNex](https://github.com/indro75/cse4104-7f-t01-MedNex.git)

### Members & Roles

| Member Name | Student ID | Assigned Role |
| :--- | :---: | :--- |
| **Indrojit Sana** *(Team Leader)* | `11230321391` | Backend Development & Architecture |
| **Sristy Shaha** | `11230321397` | Frontend Development & UI/UX |
| **Towfiq Ahmed** | `11230321388` | AI & Machine Learning Integration |
| **Jannatun Nayim Shorno** | `11230321382` | Database Design & Management |

---

## 🚀 Proposed Features

### 1. 🤖 AI-Based Symptom Analysis & Doctor Recommendation
- Accepts natural language symptom descriptions entered by the user.
- Evaluates urgency and flags potential emergency warning signs.
- Recommends the appropriate medical specialty (e.g., advising a cardiologist for persistent chest discomfort) with clear rationales.

### 2. 📍 Nearby Doctor & Hospital Finder
- Locates nearby clinics, hospitals, and specialists based on GPS coordinates or user-selected regions.
- Interactive map interface powered by OpenStreetMap and Leaflet.js.
- Displays comprehensive provider profiles, contact numbers, and turn-by-turn navigation.

### 3. 🩹 First-Aid Assistance
- Quick-reference repository for immediate action during common emergencies and health incidents.
- Step-by-step guidance, critical precautions, and emergency indicators based on reviewed medical standards rather than unrestricted AI output.

### 4. 📄 AI-Powered Medical Report Analysis
- Secure file upload for lab reports in PDF and image formats.
- Leverages OCR and AI processing to extract clinical terms and translate complex jargon into patient-friendly explanations.
- Highlights values falling outside standard reference ranges without issuing direct diagnoses.

### 5. 🚑 Emergency Ambulance Service Finder
- Rapid lookup for local ambulance services and emergency dispatch numbers.
- Map-based visualization of nearby dispatch stations with one-tap calling support.

### 6. ⚖️ Fitness Check (BMI Calculator)
- Computes Body Mass Index (BMI) from user-provided height and weight.
- Categorizes results and offers preliminary, health-conscious lifestyle guidance.

### 7. 💊 AI-Based Medicine Information Checker
- Identifies medications via text search or medicine packaging photo uploads.
- Outlines indications, mechanism of action, therapeutic class, standard precautions, and common side effects.

---

## 🛠️ Technology Stack

### Frontend
- **Framework & Tooling:** [React.js](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** React Router DOM
- **Mapping & Geospatial:** [Leaflet.js](https://leafletjs.com/), OpenStreetMap, Browser Geolocation API

### Backend & API
- **Runtime & Framework:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Architecture:** RESTful APIs
- **API Testing:** Postman

### Database & Authentication
- **Database:** [PostgreSQL](https://www.postgresql.org/) managed via [Supabase](https://supabase.com/)
- **Authentication:** Supabase Auth (JWT-based role security)
- **Storage:** Supabase Storage (encrypted bucket storage for user-uploaded reports)

### Artificial Intelligence & Processing
- **LLM Engine:** Google Gemini API (symptom parsing, report summarization, medicine lookup)
- **Document Processing:** OCR engines for medical report parsing and packaging text extraction
- **Guardrails:** Backend validation layers and strict prompt-safety filters

### DevOps & Deployment
- **Frontend Hosting:** [Vercel](https://vercel.com/)
- **Backend Hosting:** [Render](https://render.com/)
- **Version Control:** Git & GitHub

---

## 🎯 Scope and Limitations

- **Coverage:** Primary data collection for healthcare providers and ambulance units will focus on selected regional hubs during initial phases.
- **Safety Boundaries:** The application does not provide binding medical diagnoses, dispense medication, or guarantee real-time ambulance dispatch. Emergency cases are immediately routed toward formal emergency hotlines.
