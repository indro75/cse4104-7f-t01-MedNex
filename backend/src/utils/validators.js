const VALID_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const VALID_GENDERS = ['Male', 'Female', 'Other'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate registration input data
 * @param {Object} data - Registration request body
 * @returns {{ isValid: boolean, errors: string[] }}
 */
function validateRegisterInput(data = {}) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Full name is required and must be at least 2 characters.');
  }

  if (!data.email || typeof data.email !== 'string' || !EMAIL_REGEX.test(data.email.trim())) {
    errors.push('A valid email address is required.');
  }

  if (!data.password || typeof data.password !== 'string' || data.password.length < 6) {
    errors.push('Password is required and must be at least 6 characters long.');
  }

  if (data.blood_group && !VALID_BLOOD_GROUPS.includes(data.blood_group.toUpperCase())) {
    errors.push(`Blood group must be one of: ${VALID_BLOOD_GROUPS.join(', ')}.`);
  }

  if (data.gender && !VALID_GENDERS.includes(data.gender)) {
    errors.push(`Gender must be one of: ${VALID_GENDERS.join(', ')}.`);
  }

  if (data.age !== undefined && data.age !== null) {
    const ageNum = Number(data.age);
    if (!Number.isInteger(ageNum) || ageNum < 0 || ageNum > 125) {
      errors.push('Age must be an integer between 0 and 125.');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate login input data
 * @param {Object} data - Login request body
 * @returns {{ isValid: boolean, errors: string[] }}
 */
function validateLoginInput(data = {}) {
  const errors = [];

  if (!data.email || typeof data.email !== 'string' || !EMAIL_REGEX.test(data.email.trim())) {
    errors.push('A valid email address is required.');
  }

  if (!data.password || typeof data.password !== 'string') {
    errors.push('Password is required.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate profile update payload
 * @param {Object} data - Profile updates
 * @returns {{ isValid: boolean, errors: string[] }}
 */
function validateProfileUpdate(data = {}) {
  const errors = [];

  if (data.name !== undefined && (typeof data.name !== 'string' || data.name.trim().length < 2)) {
    errors.push('Full name must be at least 2 characters.');
  }

  if (data.blood_group && !VALID_BLOOD_GROUPS.includes(data.blood_group.toUpperCase())) {
    errors.push(`Blood group must be one of: ${VALID_BLOOD_GROUPS.join(', ')}.`);
  }

  if (data.gender && !VALID_GENDERS.includes(data.gender)) {
    errors.push(`Gender must be one of: ${VALID_GENDERS.join(', ')}.`);
  }

  if (data.age !== undefined && data.age !== null) {
    const ageNum = Number(data.age);
    if (!Number.isInteger(ageNum) || ageNum < 0 || ageNum > 125) {
      errors.push('Age must be an integer between 0 and 125.');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  VALID_BLOOD_GROUPS,
  VALID_GENDERS,
  validateRegisterInput,
  validateLoginInput,
  validateProfileUpdate
};
