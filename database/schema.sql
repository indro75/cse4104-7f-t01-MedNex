-- ==============================================================================
-- MedNex Healthcare Platform – PostgreSQL / Supabase Relational Schema
-- Course: CSE 4104 – Software Development III | Team: CSE4104-7F-T01
-- Backend Architecture & Engineering: Indrojit Sana (11230321391)
-- Database Architecture: Jannatun Nayim Shorno (11230321382)
-- Localized Hub: Khulna Division, Bangladesh
-- ==============================================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    age INT,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    city VARCHAR(100) DEFAULT 'Khulna',
    emergency_contact VARCHAR(20),
    allergies JSONB DEFAULT '[]'::jsonb,
    chronic_conditions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Doctors Table (Verified Khulna Specialists & BMDC Registry)
CREATE TABLE IF NOT EXISTS doctors (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    degrees VARCHAR(200) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    designation VARCHAR(200) NOT NULL,
    hospital VARCHAR(200) NOT NULL,
    bmdc_reg_no VARCHAR(50) UNIQUE NOT NULL,
    experience_years INT NOT NULL DEFAULT 0,
    chamber_address TEXT NOT NULL,
    area VARCHAR(100) NOT NULL,
    consultation_fee INT NOT NULL DEFAULT 500,
    visiting_hours VARCHAR(100) NOT NULL,
    visiting_days VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    serial_phone VARCHAR(30) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    rating DOUBLE PRECISION DEFAULT 4.8,
    verified BOOLEAN DEFAULT TRUE
);

-- 3. Hospitals Table (Khulna Division Hubs & Emergency Departments)
CREATE TABLE IF NOT EXISTS hospitals (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    area VARCHAR(100) NOT NULL,
    emergency_number VARCHAR(30) NOT NULL,
    reception_number VARCHAR(30) NOT NULL,
    has_icu BOOLEAN DEFAULT TRUE,
    has_emergency_ward BOOLEAN DEFAULT TRUE,
    ambulance_available BOOLEAN DEFAULT TRUE,
    total_beds INT DEFAULT 0,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL
);

-- 4. Ambulances Table (24/7 Fleet & Life-Support Equipment Specs)
CREATE TABLE IF NOT EXISTS ambulances (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL,
    base_location VARCHAR(150) NOT NULL,
    coverage_area VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    alternate_phone VARCHAR(30),
    available_24_7 BOOLEAN DEFAULT TRUE,
    has_oxygen BOOLEAN DEFAULT TRUE,
    has_ventilator BOOLEAN DEFAULT FALSE,
    estimated_response_time VARCHAR(50) NOT NULL DEFAULT '15-25 mins'
);

-- 5. Appointments Table (Chamber Serial Bookings)
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    doctor_id VARCHAR(50) NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    doctor_name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    hospital_or_chamber VARCHAR(200) NOT NULL,
    appointment_date VARCHAR(30) NOT NULL,
    serial_number INT NOT NULL,
    estimated_time VARCHAR(50) NOT NULL,
    patient_name VARCHAR(100) NOT NULL,
    patient_phone VARCHAR(30) NOT NULL,
    patient_age INT NOT NULL,
    symptom_summary TEXT,
    status VARCHAR(30) DEFAULT 'Confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Medicines Table (Bangladeshi Commercial Pharmaceuticals)
CREATE TABLE IF NOT EXISTS medicines (
    id VARCHAR(50) PRIMARY KEY,
    brand_name VARCHAR(100) NOT NULL,
    generic_name VARCHAR(100) NOT NULL,
    therapeutic_class VARCHAR(150) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    dosage_form VARCHAR(50) NOT NULL,
    strength VARCHAR(50) NOT NULL,
    price_bdt DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    indications JSONB DEFAULT '[]'::jsonb,
    side_effects JSONB DEFAULT '[]'::jsonb,
    precautions JSONB DEFAULT '[]'::jsonb,
    pregnancy_category VARCHAR(10),
    food_relation VARCHAR(100)
);

-- 7. Drug Interactions Table (Reciprocal Contraindication Matrix)
CREATE TABLE IF NOT EXISTS drug_interactions (
    id SERIAL PRIMARY KEY,
    drug1 VARCHAR(100) NOT NULL,
    drug2 VARCHAR(100) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    effect TEXT NOT NULL,
    recommendation TEXT NOT NULL
);

-- 8. BMI Logs Table (Longitudinal Weight & Vitals History)
CREATE TABLE IF NOT EXISTS bmi_logs (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date VARCHAR(30) NOT NULL,
    weight_kg DOUBLE PRECISION NOT NULL,
    height_cm DOUBLE PRECISION NOT NULL,
    bmi DOUBLE PRECISION NOT NULL,
    category VARCHAR(50) NOT NULL,
    notes VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Health Activities Table (Patient Clinical History Timeline)
CREATE TABLE IF NOT EXISTS health_activities (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    summary TEXT NOT NULL,
    tag VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'Normal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- Indexes for High-Performance Queries
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);
CREATE INDEX IF NOT EXISTS idx_doctors_area ON doctors(area);
CREATE INDEX IF NOT EXISTS idx_hospitals_area ON hospitals(area);
CREATE INDEX IF NOT EXISTS idx_medicines_brand ON medicines(brand_name);
CREATE INDEX IF NOT EXISTS idx_medicines_generic ON medicines(generic_name);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_date ON appointments(doctor_id, appointment_date);
CREATE INDEX IF NOT EXISTS idx_bmi_logs_user ON bmi_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_health_activities_user ON health_activities(user_id);
