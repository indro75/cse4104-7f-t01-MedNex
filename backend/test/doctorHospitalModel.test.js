const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert');

const DoctorModel = require('../src/models/doctorModel');
const HospitalModel = require('../src/models/hospitalModel');
const {
  validateCoordinates,
  validateDoctorInput,
  validateHospitalInput,
  KHULNA_AREAS,
  MEDICAL_SPECIALTIES
} = require('../src/utils/medicalValidators');

describe('MedNex Backend Day 5 – Doctor & Hospital Data Schemas', () => {
  beforeEach(() => {
    DoctorModel.clearMemoryStore();
    HospitalModel.clearMemoryStore();
  });

  describe('Medical Validation Utilities', () => {
    test('validateCoordinates should validate latitude and longitude within bounds', () => {
      assert.strictEqual(validateCoordinates(22.82, 89.55).valid, true);
      assert.strictEqual(validateCoordinates(95.0, 89.55).valid, false);
      assert.strictEqual(validateCoordinates(22.82, 200.0).valid, false);
      assert.strictEqual(validateCoordinates('invalid', 89.55).valid, false);
    });

    test('validateDoctorInput should enforce required BMDC number, specialty and name', () => {
      const valid = validateDoctorInput({
        name: 'Dr. M. A. Hasan',
        degrees: 'MBBS, FCPS',
        specialty: 'Cardiology',
        bmdc_reg_no: 'A-48291',
        chamber_address: 'Sonadanga, Khulna',
        area: 'Sonadanga',
        consultation_fee: 1000,
        latitude: 22.82,
        longitude: 89.55
      });
      assert.strictEqual(valid.isValid, true);

      const invalid = validateDoctorInput({
        name: 'Dr',
        degrees: '',
        bmdc_reg_no: ''
      });
      assert.strictEqual(invalid.isValid, false);
      assert.ok(invalid.errors.length >= 3);
    });

    test('validateHospitalInput should enforce hospital name, emergency contact, and coordinates', () => {
      const valid = validateHospitalInput({
        name: 'Khulna Medical College Hospital',
        type: 'Government Hospital',
        address: 'Boyra, Khulna',
        area: 'Boyra',
        emergency_number: '041761535',
        latitude: 22.845,
        longitude: 89.54
      });
      assert.strictEqual(valid.isValid, true);

      const invalid = validateHospitalInput({});
      assert.strictEqual(invalid.isValid, false);
      assert.ok(invalid.errors.length >= 4);
    });
  });

  describe('DoctorModel Repository & Filters', () => {
    const sampleDoc1 = {
      name: 'Prof. Dr. M. A. Hasan',
      degrees: 'MBBS, FCPS (Cardiology), MD (Cardiology)',
      specialty: 'Cardiology',
      designation: 'Professor & Head',
      hospital: 'Khulna Medical College Hospital',
      bmdc_reg_no: 'A-48291',
      experience_years: 18,
      chamber_address: 'Popular Diagnostic Center, Sonadanga, Khulna',
      area: 'Sonadanga',
      consultation_fee: 1000,
      visiting_hours: '5:00 PM - 9:00 PM',
      visiting_days: 'Sat - Thu',
      phone: '+8801711223344',
      serial_phone: '+8801711223355',
      latitude: 22.82,
      longitude: 89.55,
      rating: 4.9,
      verified: true
    };

    const sampleDoc2 = {
      name: 'Dr. Nusrat Jahan',
      degrees: 'MBBS, DCH, FCPS (Pediatrics)',
      specialty: 'Pediatrics',
      designation: 'Associate Professor',
      hospital: 'Gazi Medical College Hospital',
      bmdc_reg_no: 'A-59102',
      experience_years: 12,
      chamber_address: 'City Diagnostic, Boyra, Khulna',
      area: 'Boyra',
      consultation_fee: 800,
      visiting_hours: '4:00 PM - 8:00 PM',
      visiting_days: 'Sun - Thu',
      phone: '+8801722334455',
      serial_phone: '+8801722334466',
      latitude: 22.845,
      longitude: 89.54,
      rating: 4.8,
      verified: true
    };

    test('createDoctor should persist doctor and generate consistent ID', async () => {
      const doc = await DoctorModel.createDoctor(sampleDoc1);
      assert.ok(doc.id);
      assert.strictEqual(doc.id, 'doc-a-48291');
      assert.strictEqual(doc.name, sampleDoc1.name);
      assert.strictEqual(doc.bmdc_reg_no, 'A-48291');
    });

    test('findDoctorByBmdc should retrieve doctor with case-insensitive search', async () => {
      await DoctorModel.createDoctor(sampleDoc1);
      const found = await DoctorModel.findDoctorByBmdc('a-48291');
      assert.ok(found);
      assert.strictEqual(found.bmdc_reg_no, 'A-48291');
      assert.strictEqual(found.specialty, 'Cardiology');
    });

    test('createDoctor should reject duplicate BMDC registration numbers', async () => {
      await DoctorModel.createDoctor(sampleDoc1);
      await assert.rejects(async () => {
        await DoctorModel.createDoctor({
          ...sampleDoc2,
          bmdc_reg_no: 'A-48291' // Duplicate!
        });
      }, /already exists/);
    });

    test('getDoctors should filter by specialty, area, maxFee and search keyword', async () => {
      await DoctorModel.createDoctor(sampleDoc1);
      await DoctorModel.createDoctor(sampleDoc2);

      // Filter by specialty
      const cardiologists = await DoctorModel.getDoctors({ specialty: 'Cardiology' });
      assert.strictEqual(cardiologists.length, 1);
      assert.strictEqual(cardiologists[0].bmdc_reg_no, 'A-48291');

      // Filter by area
      const boyraDoctors = await DoctorModel.getDoctors({ area: 'Boyra' });
      assert.strictEqual(boyraDoctors.length, 1);
      assert.strictEqual(boyraDoctors[0].bmdc_reg_no, 'A-59102');

      // Filter by fee
      const affordable = await DoctorModel.getDoctors({ maxFee: 850 });
      assert.strictEqual(affordable.length, 1);
      assert.strictEqual(affordable[0].consultation_fee, 800);

      // Free text search
      const searched = await DoctorModel.getDoctors({ search: 'Hasan' });
      assert.strictEqual(searched.length, 1);
      assert.strictEqual(searched[0].name, sampleDoc1.name);
    });

    test('getAllSpecialties and getAllAreas should aggregate unique metadata', async () => {
      await DoctorModel.createDoctor(sampleDoc1);
      await DoctorModel.createDoctor(sampleDoc2);

      const specialties = await DoctorModel.getAllSpecialties();
      assert.deepStrictEqual(specialties, ['Cardiology', 'Pediatrics']);

      const areas = await DoctorModel.getAllAreas();
      assert.deepStrictEqual(areas, ['Boyra', 'Sonadanga']);
    });
  });

  describe('HospitalModel Repository & Emergency Queries', () => {
    const sampleHosp1 = {
      name: 'Khulna Medical College Hospital (KMCH)',
      type: 'Government Hospital',
      address: 'Boyra, Khulna-9000',
      area: 'Boyra',
      emergency_number: '041-761535',
      reception_number: '041-760350',
      has_icu: true,
      has_emergency_ward: true,
      ambulance_available: true,
      total_beds: 500,
      latitude: 22.845,
      longitude: 89.54
    };

    const sampleHosp2 = {
      name: 'Gazi Medical College Hospital',
      type: 'Private Medical College & Hospital',
      address: 'Sonadanga, Khulna-9100',
      area: 'Sonadanga',
      emergency_number: '041-731210',
      reception_number: '041-731211',
      has_icu: true,
      has_emergency_ward: true,
      ambulance_available: true,
      total_beds: 350,
      latitude: 22.82,
      longitude: 89.55
    };

    const sampleHosp3 = {
      name: 'Khulna Shishu Hospital',
      type: 'Specialized Institute',
      address: 'Gollamari, Khulna',
      area: 'Gollamari',
      emergency_number: '041-720100',
      has_icu: false,
      has_emergency_ward: false,
      ambulance_available: false,
      total_beds: 100,
      latitude: 22.805,
      longitude: 89.535
    };

    test('createHospital should persist hospital and generate ID', async () => {
      const hosp = await HospitalModel.createHospital(sampleHosp1);
      assert.ok(hosp.id);
      assert.strictEqual(hosp.name, sampleHosp1.name);
      assert.strictEqual(hosp.has_icu, true);
    });

    test('getHospitals should filter by area and facility capabilities', async () => {
      await HospitalModel.createHospital(sampleHosp1);
      await HospitalModel.createHospital(sampleHosp2);
      await HospitalModel.createHospital(sampleHosp3);

      const sonadangaHospitals = await HospitalModel.getHospitals({ area: 'Sonadanga' });
      assert.strictEqual(sonadangaHospitals.length, 1);
      assert.strictEqual(sonadangaHospitals[0].name, sampleHosp2.name);

      const icuHospitals = await HospitalModel.getHospitals({ hasIcu: true });
      assert.strictEqual(icuHospitals.length, 2);
    });

    test('getEmergencyFacilities should only return hospitals with both ICU and 24/7 Emergency Ward', async () => {
      await HospitalModel.createHospital(sampleHosp1);
      await HospitalModel.createHospital(sampleHosp2);
      await HospitalModel.createHospital(sampleHosp3);

      const emergencyHubs = await HospitalModel.getEmergencyFacilities();
      assert.strictEqual(emergencyHubs.length, 2);
      assert.ok(emergencyHubs.every((h) => h.has_icu && h.has_emergency_ward));
    });
  });
});
