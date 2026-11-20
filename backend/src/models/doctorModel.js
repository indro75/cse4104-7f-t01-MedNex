const crypto = require('crypto');
const { pool, query } = require('../config/db');

// In-memory doctor store fallback for offline/testing development
const memoryDoctors = new Map();

/**
 * Doctor Model & Repository
 * Handles verified BMDC doctor profiles, chamber information, and search queries
 */
class DoctorModel {
  /**
   * Create a new doctor in the repository
   */
  static async createDoctor({
    id,
    name,
    degrees,
    specialty,
    designation,
    hospital,
    bmdc_reg_no,
    experience_years = 0,
    chamber_address,
    area,
    consultation_fee = 500,
    visiting_hours,
    visiting_days,
    phone,
    serial_phone,
    latitude = 22.82,
    longitude = 89.55,
    rating = 4.8,
    verified = true
  }) {
    const normalizedBmdc = bmdc_reg_no.trim().toUpperCase();
    const docId = id || `doc-${normalizedBmdc.replace(/[^A-Z0-9]/g, '-').toLowerCase()}`;

    const record = {
      id: docId,
      name: name.trim(),
      degrees: degrees.trim(),
      specialty: specialty.trim(),
      designation: designation ? designation.trim() : 'Consultant',
      hospital: hospital.trim(),
      bmdc_reg_no: normalizedBmdc,
      experience_years: Number(experience_years) || 0,
      chamber_address: chamber_address.trim(),
      area: area.trim(),
      consultation_fee: Number(consultation_fee) || 500,
      visiting_hours: visiting_hours ? visiting_hours.trim() : '5:00 PM - 9:00 PM',
      visiting_days: visiting_days ? visiting_days.trim() : 'Sat - Thu',
      phone: phone.trim(),
      serial_phone: serial_phone ? serial_phone.trim() : phone.trim(),
      latitude: Number(latitude),
      longitude: Number(longitude),
      rating: Number(rating) || 4.8,
      verified: Boolean(verified)
    };

    if (pool) {
      try {
        const sql = `
          INSERT INTO doctors (
            id, name, degrees, specialty, designation, hospital, bmdc_reg_no,
            experience_years, chamber_address, area, consultation_fee, visiting_hours,
            visiting_days, phone, serial_phone, latitude, longitude, rating, verified
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
          RETURNING *;
        `;
        const values = [
          record.id,
          record.name,
          record.degrees,
          record.specialty,
          record.designation,
          record.hospital,
          record.bmdc_reg_no,
          record.experience_years,
          record.chamber_address,
          record.area,
          record.consultation_fee,
          record.visiting_hours,
          record.visiting_days,
          record.phone,
          record.serial_phone,
          record.latitude,
          record.longitude,
          record.rating,
          record.verified
        ];

        const res = await query(sql, values);
        return res.rows[0];
      } catch (err) {
        if (err.code === '23505') {
          const duplicateError = new Error(`Doctor with BMDC Reg No '${record.bmdc_reg_no}' already exists.`);
          duplicateError.statusCode = 409;
          throw duplicateError;
        }
        console.warn(`[DoctorModel] DB write failed (${err.message}). Using memory store fallback.`);
      }
    }

    // In-memory fallback
    if (memoryDoctors.has(normalizedBmdc)) {
      const duplicateError = new Error(`Doctor with BMDC Reg No '${record.bmdc_reg_no}' already exists.`);
      duplicateError.statusCode = 409;
      throw duplicateError;
    }
    memoryDoctors.set(normalizedBmdc, record);
    return record;
  }

  /**
   * Find doctor by ID
   */
  static async findDoctorById(id) {
    if (!id) return null;

    if (pool) {
      try {
        const sql = `SELECT * FROM doctors WHERE id = $1 LIMIT 1;`;
        const res = await query(sql, [id]);
        if (res.rows.length > 0) return res.rows[0];
      } catch (err) {
        console.warn(`[DoctorModel] DB query failed (${err.message}). Searching memory fallback.`);
      }
    }

    for (const doc of memoryDoctors.values()) {
      if (doc.id === id) return doc;
    }
    return null;
  }

  /**
   * Find doctor by BMDC registration number
   */
  static async findDoctorByBmdc(bmdc_reg_no) {
    if (!bmdc_reg_no) return null;
    const normalizedBmdc = bmdc_reg_no.trim().toUpperCase();

    if (pool) {
      try {
        const sql = `SELECT * FROM doctors WHERE UPPER(bmdc_reg_no) = $1 LIMIT 1;`;
        const res = await query(sql, [normalizedBmdc]);
        if (res.rows.length > 0) return res.rows[0];
      } catch (err) {
        console.warn(`[DoctorModel] DB query failed (${err.message}). Searching memory fallback.`);
      }
    }

    return memoryDoctors.get(normalizedBmdc) || null;
  }

  /**
   * Search and filter doctors directory
   */
  static async getDoctors({ specialty, area, maxFee, search, verifiedOnly = false } = {}) {
    if (pool) {
      try {
        const conditions = [];
        const values = [];
        let index = 1;

        if (specialty) {
          conditions.push(`LOWER(specialty) = $${index}`);
          values.push(specialty.toLowerCase().trim());
          index++;
        }

        if (area) {
          conditions.push(`LOWER(area) = $${index}`);
          values.push(area.toLowerCase().trim());
          index++;
        }

        if (maxFee) {
          conditions.push(`consultation_fee <= $${index}`);
          values.push(Number(maxFee));
          index++;
        }

        if (verifiedOnly) {
          conditions.push(`verified = true`);
        }

        if (search) {
          conditions.push(`(
            LOWER(name) LIKE $${index} OR 
            LOWER(hospital) LIKE $${index} OR 
            LOWER(degrees) LIKE $${index} OR
            LOWER(bmdc_reg_no) LIKE $${index}
          )`);
          values.push(`%${search.toLowerCase().trim()}%`);
          index++;
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
        const sql = `SELECT * FROM doctors ${whereClause} ORDER BY rating DESC, consultation_fee ASC;`;

        const res = await query(sql, values);
        return res.rows;
      } catch (err) {
        console.warn(`[DoctorModel] DB search failed (${err.message}). Querying memory fallback.`);
      }
    }

    // Memory store filtering
    let results = Array.from(memoryDoctors.values());

    if (specialty) {
      const s = specialty.toLowerCase().trim();
      results = results.filter((d) => d.specialty.toLowerCase() === s);
    }

    if (area) {
      const a = area.toLowerCase().trim();
      results = results.filter((d) => d.area.toLowerCase() === a);
    }

    if (maxFee) {
      const feeNum = Number(maxFee);
      results = results.filter((d) => d.consultation_fee <= feeNum);
    }

    if (verifiedOnly) {
      results = results.filter((d) => d.verified === true);
    }

    if (search) {
      const queryStr = search.toLowerCase().trim();
      results = results.filter(
        (d) =>
          d.name.toLowerCase().includes(queryStr) ||
          d.hospital.toLowerCase().includes(queryStr) ||
          d.degrees.toLowerCase().includes(queryStr) ||
          d.bmdc_reg_no.toLowerCase().includes(queryStr)
      );
    }

    return results.sort((a, b) => b.rating - a.rating || a.consultation_fee - b.consultation_fee);
  }

  /**
   * Get distinct specialties list
   */
  static async getAllSpecialties() {
    if (pool) {
      try {
        const sql = `SELECT DISTINCT specialty FROM doctors ORDER BY specialty ASC;`;
        const res = await query(sql);
        return res.rows.map((r) => r.specialty);
      } catch (err) {
        console.warn(`[DoctorModel] DB specialties failed (${err.message}). Using memory fallback.`);
      }
    }

    const set = new Set();
    for (const doc of memoryDoctors.values()) {
      set.add(doc.specialty);
    }
    return Array.from(set).sort();
  }

  /**
   * Get distinct Khulna areas list
   */
  static async getAllAreas() {
    if (pool) {
      try {
        const sql = `SELECT DISTINCT area FROM doctors ORDER BY area ASC;`;
        const res = await query(sql);
        return res.rows.map((r) => r.area);
      } catch (err) {
        console.warn(`[DoctorModel] DB areas failed (${err.message}). Using memory fallback.`);
      }
    }

    const set = new Set();
    for (const doc of memoryDoctors.values()) {
      set.add(doc.area);
    }
    return Array.from(set).sort();
  }

  /**
   * Count total doctors registered
   */
  static async countDoctors() {
    if (pool) {
      try {
        const sql = `SELECT COUNT(*)::int as total FROM doctors;`;
        const res = await query(sql);
        return res.rows[0].total;
      } catch (err) {
        console.warn(`[DoctorModel] DB count failed (${err.message}). Counting memory fallback.`);
      }
    }
    return memoryDoctors.size;
  }

  /**
   * Reset in-memory cache (for testing isolation)
   */
  static clearMemoryStore() {
    memoryDoctors.clear();
  }
}

module.exports = DoctorModel;
