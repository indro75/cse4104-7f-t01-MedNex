const { VERIFIED_HOSPITALS, VERIFIED_DOCTORS } = require('../data/khulnaMedicalData');
const HospitalModel = require('../models/hospitalModel');
const DoctorModel = require('../models/doctorModel');
const { checkDbConnection } = require('../config/db');

/**
 * Seed verified Khulna healthcare facilities and doctors
 * @param {Object} options
 * @param {boolean} [options.silent=false] - Suppress console output
 * @returns {Promise<{ hospitals: number, doctors: number, specialties: string[], areas: string[] }>}
 */
async function seedKhulnaMedicalData({ silent = false } = {}) {
  const log = (...args) => {
    if (!silent) console.log(...args);
  };

  log('='.repeat(70));
  log('🌱 MedNex Database Seeder – Khulna Division Medical Registry');
  log('   Sources: Bangladesh Medical and Dental Council (BMDC) & DGHS');
  log('='.repeat(70));

  const dbStatus = await checkDbConnection();
  if (dbStatus.connected) {
    log(`✅ Active Database Connected: "${dbStatus.database}" (${dbStatus.latencyMs}ms latency)`);
  } else {
    log(`ℹ️ Database mode: ${dbStatus.mode} (${dbStatus.message})`);
    log('   Seeding in-memory and prepared models for operational readiness.');
  }

  // 1. Seed Hospitals
  log('\n🏥 Seeding Verified Khulna Hospitals...');
  let hospitalsSeeded = 0;
  for (const hosp of VERIFIED_HOSPITALS) {
    try {
      const existing = await HospitalModel.findHospitalById(hosp.id);
      if (!existing) {
        await HospitalModel.createHospital(hosp);
        hospitalsSeeded++;
        log(`   + [Hospital] ${hosp.name} (${hosp.area}, Beds: ${hosp.total_beds})`);
      } else {
        log(`   = [Hospital Exists] ${hosp.name}`);
      }
    } catch (err) {
      log(`   ! [Hospital Notice] ${hosp.name}: ${err.message}`);
    }
  }

  // 2. Seed Doctors
  log('\n👨‍⚕️ Seeding Verified BMDC Specialist Doctors...');
  let doctorsSeeded = 0;
  for (const doc of VERIFIED_DOCTORS) {
    try {
      const existing = await DoctorModel.findDoctorByBmdc(doc.bmdc_reg_no);
      if (!existing) {
        await DoctorModel.createDoctor(doc);
        doctorsSeeded++;
        log(`   + [Doctor] ${doc.name} (BMDC: ${doc.bmdc_reg_no}, ${doc.specialty})`);
      } else {
        log(`   = [Doctor Exists] ${doc.name} (BMDC: ${doc.bmdc_reg_no})`);
      }
    } catch (err) {
      log(`   ! [Doctor Notice] ${doc.name}: ${err.message}`);
    }
  }

  const allSpecialties = await DoctorModel.getAllSpecialties();
  const allAreas = await DoctorModel.getAllAreas();
  const totalHospitals = await HospitalModel.countHospitals();
  const totalDoctors = await DoctorModel.countDoctors();

  log('\n' + '='.repeat(70));
  log('🎉 Khulna Medical Registry Seeding Summary:');
  log(` • Total Hospitals Verified  : ${totalHospitals} (New: ${hospitalsSeeded})`);
  log(` • Total Doctors Verified    : ${totalDoctors} (New: ${doctorsSeeded})`);
  log(` • Medical Specialties Covered: ${allSpecialties.length} (${allSpecialties.join(', ')})`);
  log(` • Khulna Geographical Hubs  : ${allAreas.length} (${allAreas.join(', ')})`);
  log('='.repeat(70) + '\n');

  return {
    hospitals: totalHospitals,
    doctors: totalDoctors,
    specialties: allSpecialties,
    areas: allAreas
  };
}

if (require.main === module) {
  seedKhulnaMedicalData()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Seeding failed:', err);
      process.exit(1);
    });
}

module.exports = {
  seedKhulnaMedicalData
};
