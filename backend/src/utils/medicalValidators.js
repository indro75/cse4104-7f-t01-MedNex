/**
 * Khulna Division Geographic Areas
 */
const KHULNA_AREAS = [
  'Sadar',
  'Sonadanga',
  'Boyra',
  'Khalishpur',
  'Daulatpur',
  'Gollamari',
  'Rupsha',
  'Khan Jahan Ali'
];

/**
 * Standard Medical Specialties for Triage & Directory
 */
const MEDICAL_SPECIALTIES = [
  'Cardiology',
  'Neurology',
  'Gastroenterology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Gynecology & Obstetrics',
  'ENT (Otolaryngology)',
  'Psychiatry',
  'Pulmonology',
  'General Medicine',
  'Nephrology',
  'Oncology',
  'Ophthalmology',
  'Urology'
];

/**
 * Hospital Classification Types
 */
const HOSPITAL_TYPES = [
  'Government Hospital',
  'Private Medical College & Hospital',
  'Specialized Institute',
  'Private Hospital & Clinic'
];

/**
 * Validate geographical GPS coordinates
 */
function validateCoordinates(latitude, longitude) {
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (Number.isNaN(lat) || lat < -90 || lat > 90) {
    return { valid: false, error: 'Latitude must be a valid float between -90 and 90.' };
  }
  if (Number.isNaN(lng) || lng < -180 || lng > 180) {
    return { valid: false, error: 'Longitude must be a valid float between -180 and 180.' };
  }
  return { valid: true };
}

/**
 * Validate Doctor schema payload
 */
function validateDoctorInput(data = {}) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 3) {
    errors.push('Doctor name is required and must be at least 3 characters.');
  }

  if (!data.degrees || typeof data.degrees !== 'string') {
    errors.push('Doctor degrees/qualifications (e.g., MBBS, FCPS) are required.');
  }

  if (!data.specialty || typeof data.specialty !== 'string') {
    errors.push('Medical specialty is required.');
  }

  if (!data.bmdc_reg_no || typeof data.bmdc_reg_no !== 'string' || data.bmdc_reg_no.trim().length < 3) {
    errors.push('Valid BMDC registration number is required (e.g., A-48291).');
  }

  if (!data.chamber_address || typeof data.chamber_address !== 'string') {
    errors.push('Chamber address is required.');
  }

  if (!data.area || typeof data.area !== 'string') {
    errors.push('Khulna area is required (e.g., Sonadanga, Boyra).');
  }

  if (data.consultation_fee !== undefined) {
    const fee = Number(data.consultation_fee);
    if (!Number.isInteger(fee) || fee < 0) {
      errors.push('Consultation fee must be a positive integer.');
    }
  }

  if (data.latitude !== undefined && data.longitude !== undefined) {
    const coordCheck = validateCoordinates(data.latitude, data.longitude);
    if (!coordCheck.valid) {
      errors.push(coordCheck.error);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate Hospital schema payload
 */
function validateHospitalInput(data = {}) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 3) {
    errors.push('Hospital name is required and must be at least 3 characters.');
  }

  if (!data.type || typeof data.type !== 'string') {
    errors.push('Hospital type is required.');
  }

  if (!data.address || typeof data.address !== 'string') {
    errors.push('Hospital physical address is required.');
  }

  if (!data.area || typeof data.area !== 'string') {
    errors.push('Khulna area is required.');
  }

  if (!data.emergency_number || typeof data.emergency_number !== 'string') {
    errors.push('Emergency hotline telephone number is required.');
  }

  if (data.latitude !== undefined && data.longitude !== undefined) {
    const coordCheck = validateCoordinates(data.latitude, data.longitude);
    if (!coordCheck.valid) {
      errors.push(coordCheck.error);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  KHULNA_AREAS,
  MEDICAL_SPECIALTIES,
  HOSPITAL_TYPES,
  validateCoordinates,
  validateDoctorInput,
  validateHospitalInput
};
