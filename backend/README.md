# MedNex – Backend Service
> **"Understand Your Symptoms. Find the Right Care."**  
> **Course:** CSE 4104 – Software Development III  
> **Team Name:** `CSE4104-7F-T01` (Section 7F)  
> **Backend Architecture & Development Lead:** Indrojit Sana (`11230321391`)  
> **Initial Localization:** Khulna Division, Bangladesh  

---

## ⚠️ Core Medical Safety Tenet (NFR-15)
> **"MedNex provides intelligent triage and health literacy support, not clinical diagnosis or medical prescriptions."**

- Acute life-threatening red-flag symptoms immediately trigger the National 999 Emergency Dispatch modal (< 50ms).
- Zero-hallucination registry: BMDC registration numbers, chamber addresses, and emergency phone numbers represent verified real-world medical facilities in Khulna (KMCH, Gazi Medical, Sheikh Abu Naser Specialized, City Medical).

---

## 📅 20-Day / 20-Commit Backend Engineering Roadmap

| Day / Commit | Milestone Focus | Deliverables & Mapped SRS Requirements |
| :---: | :--- | :--- |
| **Day 01** *(Current)* | **Backend Architecture Foundation** | FastAPI initialization, Pydantic BaseSettings, CORS whitelist, clinical safety headers middleware (`X-Medical-Disclaimer`), `/` root and `/api/health` endpoints, Uvicorn runner (`run.py`), `.gitignore`. *(NFR-10, NFR-12, NFR-15, NFR-17)* |
| **Day 02** | **Database Persistence Engine** | SQLAlchemy 2.0 ORM engine, sessionmaker, SQLite/PostgreSQL connection pool, base declarative model (`app/database.py`). *(NFR-18, Tier 4)* |
| **Day 03** | **User Entity & Auth Security** | `User` SQLAlchemy ORM model, Pydantic v2 schemas, bcrypt password hashing, JWT token utilities. *(FR-01, FR-02, FR-06, NFR-09, UC-01)* |
| **Day 04** | **Authentication & Profile API** | `/api/auth` router: user registration, JWT login, profile view, and 1-Click Demo Patient authentication. *(FR-01 to FR-06, UC-01, UC-02)* |
| **Day 05** | **Doctor & Hospital Schemas** | Relational ORM models for Khulna verified doctors (BMDC reg, fees, chambers, GPS) and regional hospitals (ICU, emergency wards). *(FR-13 to FR-15, FR-28, Section 6.2)* |
| **Day 06** | **Khulna Medical Data Seeder** | Seeder with verified datasets for KMCH, Gazi Medical, Sheikh Abu Naser, City Medical, and specialist chambers. *(NFR-14, UC-14)* |
| **Day 07** | **Doctor Directory & Search API** | `/api/doctors` with multi-criteria filtering by medical specialty, Khulna area (Sadar, Sonadanga, Boyra, etc.), and fee limit. *(FR-13, FR-14, UC-05)* |
| **Day 08** | **Hospital & Emergency API** | `/api/hospitals` with 24/7 ER hotline, ICU bed availability, and ambulance status. *(FR-27, FR-28, UC-07)* |
| **Day 09** | **Ambulance Fleet Dispatch API** | `Ambulance` ORM model, Khulna 24/7 fleet seed data, and `/api/ambulances` router with equipment specs (oxygen, ventilator). *(FR-24 to FR-27, UC-07)* |
| **Day 10** | **Chamber Serial Reservation API** | `Appointment` ORM model, sequential serial counter, and `/api/appointments` booking endpoints with queue time estimation. *(FR-16 to FR-18, UC-05, UC-06)* |
| **Day 11** | **Red-Flag Emergency Interceptor** | Sub-50ms regex and keyword clinical rule engine intercepting acute life threats (MI, stroke, respiratory arrest) with 999 hotline override. *(FR-11, NFR-03, UC-04)* |
| **Day 12** | **NLP Symptom Specialty Classifier** | Scikit-learn TF-IDF vectorizer + Multinomial Naive Bayes classifier trained on clinical symptom corpus (>92% accuracy). *(FR-10, Tier 3)* |
| **Day 13** | **AI Symptom Triage Router** | `/api/symptoms/triage` endpoint integrating duration, pain severity scale (1-10), body map regions, red-flag suppression, and doctor linking. *(FR-07 to FR-12, UC-03)* |
| **Day 14** | **Biomarker Rule Engine** | Regex document parser and adult biological reference intervals evaluator (CBC, Lipid, HbA1c, LFT) with status tagging. *(FR-20, FR-21, UC-06)* |
| **Day 15** | **Medical Report Analyzer API** | `/api/reports/analyze` endpoint supporting report uploads, pre-configured sample presets, plain-language clinical synthesis, and doctor checklists. *(FR-19 to FR-23, UC-06)* |
| **Day 16** | **Pharmaceutical Data & Catalog** | `Medicine` ORM model, schemas, and seed database of top Bangladeshi pharmaceuticals (Square, Beximco, Incepta) with prices and indications. *(FR-32, FR-33)* |
| **Day 17** | **Drug Interaction Engine** | Fuzzy string distance matcher (`difflib` / token ratio) and reciprocal drug-drug contraindication matrix. *(FR-34 to FR-36, UC-09, Tier 3)* |
| **Day 18** | **Medicine Search & Interaction API** | `/api/medicines/search` and `/api/medicines/interact` endpoints returning clinical interaction severity, rationale, and timing advice. *(FR-32 to FR-36, UC-09)* |
| **Day 19** | **Fitness, BMI & Vitals API** | `BMILog` and `HealthActivity` ORM models, BMI & BMR calculator endpoints, and longitudinal timeline export `/api/fitness`. *(FR-37 to FR-41, UC-10, UC-11)* |
| **Day 20** | **Master Seeder & Final Polish** | Unified master database seed runner (`python -m app.seed`), automated test suite, OpenAPI documentation review, and Render deployment config. *(NFR-02, NFR-10, NFR-17)* |

---

## 🚀 Day 1 Setup & Execution

### 1. Requirements
- Python 3.12+ / 3.14
- Virtual Environment (`venv`)

### 2. Installation
```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional)
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate # Linux/macOS

# Install dependencies
pip install -r requirements.txt
```

### 3. Launching the Backend Server
```bash
python run.py
```
*Server launches on `http://localhost:8000` with hot-reload enabled.*

### 4. Interactive Documentation & Endpoints
- **Interactive Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Documentation:** [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Health Check Endpoint:** [http://localhost:8000/api/health](http://localhost:8000/api/health)

### 5. Running Automated Unit Tests
```bash
python -m unittest discover tests
```
