import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PlaceholderPage from './pages/PlaceholderPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          
          <Route
            path="symptom-checker"
            element={
              <PlaceholderPage
                title="AI Symptom Evaluation & Clinical Triage"
                roadmapDay="Days 11 – 14"
                srsRef="FR-07 to FR-12 (UC-03 & UC-04)"
                description="Interactive SVG anatomical body map, free-text clinical description, TF-IDF + Naive Bayes specialty recommendation, and < 50ms emergency red-flag interception."
              />
            }
          />

          <Route
            path="doctors"
            element={
              <PlaceholderPage
                title="Verified Khulna Doctors & Chamber Booking"
                roadmapDay="Days 08 – 10"
                srsRef="FR-13 to FR-18 (UC-05)"
                description="BMDC-registered physician directory across Khulna (Sadar, Sonadanga, Boyra, Khalishpur, Daulatpur, Gollamari) with instant chamber serial reservation."
              />
            }
          />

          <Route
            path="emergency"
            element={
              <PlaceholderPage
                title="Emergency Ambulance & Hospital Locator"
                roadmapDay="Days 05 – 07"
                srsRef="FR-24 to FR-28 (UC-07)"
                description="Direct 999 hotline dialer, verified 24/7 ambulance fleets (ICU, BLS, Oxygen), and hospital ER directory (KMCH, Gazi Medical, Sheikh Abu Naser)."
              />
            }
          />

          <Route
            path="first-aid"
            element={
              <PlaceholderPage
                title="Clinical First Aid & Interactive CPR Metronome"
                roadmapDay="Day 15"
                srsRef="FR-29 to FR-31 (UC-08)"
                description="Reviewed emergency protocols with clear DOs and DON'Ts, accompanied by an interactive Web Audio CPR metronome pulsing at 100-120 BPM."
              />
            }
          />

          <Route
            path="report-analyzer"
            element={
              <PlaceholderPage
                title="Diagnostic Laboratory Report Analyzer"
                roadmapDay="Days 16 – 17"
                srsRef="FR-19 to FR-23 (UC-06)"
                description="OCR ingestion of CBC, Lipid, and LFT reports with reference interval comparisons, abnormal value indicators, and doctor consultation checklists."
              />
            }
          />

          <Route
            path="medicines"
            element={
              <PlaceholderPage
                title="Bangladeshi Medicine Directory & Interaction Checker"
                roadmapDay="Days 18 – 19"
                srsRef="FR-32 to FR-36 (UC-09)"
                description="Pharmaceutical database covering Square, Beximco, and Incepta medications with dual-drug interaction severity evaluation."
              />
            }
          />

          <Route
            path="fitness"
            element={
              <PlaceholderPage
                title="BMI Calculation & Longitudinal Vitals Tracking"
                roadmapDay="Day 20"
                srsRef="FR-37 to FR-41 (UC-10)"
                description="WHO adult BMI classifications, Basal Metabolic Rate (BMR), longitudinal weight chart visualization with Recharts, and JSON health record export."
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
