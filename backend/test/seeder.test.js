const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');

const app = require('../src/app');
const DoctorModel = require('../src/models/doctorModel');
const HospitalModel = require('../src/models/hospitalModel');
const { seedKhulnaMedicalData } = require('../src/database/seed');
const { VERIFIED_HOSPITALS, VERIFIED_DOCTORS } = require('../src/data/khulnaMedicalData');

describe('MedNex Backend Day 6 – Khulna Medical Data Seeder', () => {
  beforeEach(() => {
    DoctorModel.clearMemoryStore();
    HospitalModel.clearMemoryStore();
  });

  test('verified datasets should contain comprehensive real-world Khulna data', () => {
    assert.ok(Array.isArray(VERIFIED_HOSPITALS));
    assert.strictEqual(VERIFIED_HOSPITALS.length, 8);

    assert.ok(Array.isArray(VERIFIED_DOCTORS));
    assert.strictEqual(VERIFIED_DOCTORS.length, 13);

    // Verify key hospitals exist
    const hospitalNames = VERIFIED_HOSPITALS.map((h) => h.name);
    assert.ok(hospitalNames.some((n) => n.includes('Khulna Medical College Hospital')));
    assert.ok(hospitalNames.some((n) => n.includes('Shaheed Sheikh Abu Naser')));
    assert.ok(hospitalNames.some((n) => n.includes('Gazi Medical College')));
    assert.ok(hospitalNames.some((n) => n.includes('Khulna City Medical College')));

    // Verify all doctors have valid BMDC numbers
    VERIFIED_DOCTORS.forEach((doc) => {
      assert.ok(doc.bmdc_reg_no, `Doctor ${doc.name} must have BMDC registration number`);
      assert.ok(doc.bmdc_reg_no.startsWith('A-'));
      assert.ok(doc.specialty);
      assert.ok(doc.chamber_address);
      assert.ok(doc.phone);
    });
  });

  test('seedKhulnaMedicalData should populate all hospitals and doctors into repository', async () => {
    const summary = await seedKhulnaMedicalData({ silent: true });

    assert.strictEqual(summary.hospitals, 8);
    assert.strictEqual(summary.doctors, 13);
    assert.ok(summary.specialties.length >= 10);
    assert.ok(summary.areas.length >= 3);

    // Verify KMCH exists and has ICU
    const kmch = await HospitalModel.findHospitalById('hosp-kmch');
    assert.ok(kmch);
    assert.strictEqual(kmch.has_icu, true);
    assert.strictEqual(kmch.has_emergency_ward, true);
    assert.strictEqual(kmch.total_beds, 500);

    // Verify Dr. M. A. Hasan exists with BMDC A-48291
    const cardiologist = await DoctorModel.findDoctorByBmdc('A-48291');
    assert.ok(cardiologist);
    assert.strictEqual(cardiologist.name, 'Prof. Dr. M. A. Hasan');
    assert.strictEqual(cardiologist.specialty, 'Cardiology');
    assert.strictEqual(cardiologist.area, 'Sonadanga');
  });

  test('seedKhulnaMedicalData should be idempotent (safe to run multiple times without duplicating)', async () => {
    // First seed
    const firstRun = await seedKhulnaMedicalData({ silent: true });
    assert.strictEqual(firstRun.hospitals, 8);
    assert.strictEqual(firstRun.doctors, 13);

    // Second seed (idempotent)
    const secondRun = await seedKhulnaMedicalData({ silent: true });
    assert.strictEqual(secondRun.hospitals, 8);
    assert.strictEqual(secondRun.doctors, 13);

    // Verify count did not double
    const totalDoctors = await DoctorModel.countDoctors();
    const totalHospitals = await HospitalModel.countHospitals();
    assert.strictEqual(totalDoctors, 13);
    assert.strictEqual(totalHospitals, 8);
  });

  test('GET /api/health/seed-status should report medical registry coverage and disclaimer', async () => {
    await seedKhulnaMedicalData({ silent: true });

    const res = await request(app).get('/api/health/seed-status');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.registry.totalHospitals, 8);
    assert.strictEqual(res.body.registry.totalDoctors, 13);
    assert.ok(Array.isArray(res.body.registry.specialties));
    assert.ok(res.headers['x-medical-disclaimer']);
  });
});
