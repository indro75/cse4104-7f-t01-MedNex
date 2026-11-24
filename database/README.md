# MedNex Relational Database Design & Persistence Layer

> **Course:** CSE 4104 – Software Development III  
> **Team Identifier:** `CSE4104-7F-T01` (Section 7F)  
> **Database Architect:** **Jannatun Nayim Shorno** (`11230321382`)  
> **Backend Engineering Lead:** **Indrojit Sana** (`11230321391`)  
> **Target Deployment Hub:** Khulna Division, Bangladesh  

---

## 📌 Database Overview

MedNex utilizes an enterprise-grade **PostgreSQL / Supabase** relational database with connection pooling (`pg.Pool`). The database schema is fully normalized into **9 distinct entities** supporting all clinical and functional requirements specified in the project proposal and SRS.

### Core Schema Highlights:
- **Zero-Hallucination Medical Registry:** Verified doctor credentials, BMDC registration numbers, regional hospitals, and emergency ambulance services in Khulna Division.
- **Relational Integrity:** Strict Foreign Key constraints (`ON DELETE CASCADE`) enforcing parent-child relationships between users, appointments, vitals logs, and clinical activity history.
- **Performance Optimization:** B-Tree indexes created on high-frequency search fields (`specialty`, `area`, `brand_name`, `generic_name`, `appointment_date`, `user_id`).
- **Flexible Clinical Fields:** Semi-structured `JSONB` data types utilized for allergies, chronic conditions, and pharmaceutical side-effect profiles to allow seamless domain extension without schema migrations.

---

## 🗄️ Database Tables & Data Dictionary

| # | Table Name | Primary Key | Foreign Keys | Description |
|---|---|---|---|---|
| 1 | `users` | `id` (VARCHAR(36)) | None | Registered patient credentials, encrypted password hash, demographic vitals, emergency contacts, JSONB allergies. |
| 2 | `doctors` | `id` (VARCHAR(50)) | None | BMDC-verified specialist doctors in Khulna with qualifications, visiting schedules, chamber addresses, fees, and GPS coordinates. |
| 3 | `hospitals` | `id` (VARCHAR(50)) | None | Major hospitals and emergency wards in Khulna (KMCH, Gazi Medical, Sheikh Abu Naser, City Medical) with ICU bed status and hotlines. |
| 4 | `ambulances` | `id` (VARCHAR(50)) | None | 24/7 verified emergency medical transport fleets categorized by capability (ICU, Standard BLS, Oxygen, Ventilator). |
| 5 | `appointments` | `id` (VARCHAR(50)) | `user_id` → `users.id`<br>`doctor_id` → `doctors.id` | Chamber appointment serial reservations with sequential serial numbers and estimated consultation times. |
| 6 | `medicines` | `id` (VARCHAR(50)) | None | Comprehensive commercial pharmaceutical catalog tailored to Bangladesh (Square, Beximco, Incepta, etc.). |
| 7 | `drug_interactions` | `id` (SERIAL) | None | Pharmacological contraindication lookup matrix with clinical severity classification and administration precautions. |
| 8 | `bmi_logs` | `id` (SERIAL) | `user_id` → `users.id` | Longitudinal anthropometric logs for patient BMI, weight tracking, and Recharts graphical visualization. |
| 9 | `health_activities` | `id` (VARCHAR(50)) | `user_id` → `users.id` | Unified chronological medical activity stream (symptom checks, report analyses, appointment bookings). |

---

## 🔗 Relational Cardinalities (1:N Mappings)

1. `users.id (1)` ── `(N) appointments.user_id`: One patient can book multiple chamber serial appointments over time.
2. `doctors.id (1)` ── `(N) appointments.doctor_id`: One specialist doctor can receive multiple chamber appointment bookings.
3. `users.id (1)` ── `(N) bmi_logs.user_id`: One patient maintains an ongoing longitudinal series of BMI measurements.
4. `users.id (1)` ── `(N) health_activities.user_id`: One user generates an audit trail of clinical activities across the system.

---

## 🛠️ Files in this Directory

- [`schema.sql`](./schema.sql): Full PostgreSQL DDL creation script including tables, constraints, foreign keys, and indexes.

---

## 🚀 Running Migrations & Seeding in Local Development

From the repository root:
```bash
# Initialize database tables
npm --prefix backend run db:init

# Seed Khulna healthcare dataset & pharmaceutical catalog
npm --prefix backend run db:seed
```
