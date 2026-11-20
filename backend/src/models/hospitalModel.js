const crypto = require('crypto');
const { pool, query } = require('../config/db');

// In-memory hospital store fallback for offline/testing development
const memoryHospitals = new Map();

/**
 * Hospital Model & Repository
 * Handles Khulna regional hospitals, 24/7 emergency wards, and ICU facilities
 */
class HospitalModel {
  /**
   * Create a new hospital in the repository
   */
  static async createHospital({
    id,
    name,
    type,
    address,
    area,
    emergency_number,
    reception_number,
    has_icu = true,
    has_emergency_ward = true,
    ambulance_available = true,
    total_beds = 100,
    latitude = 22.82,
    longitude = 89.55
  }) {
    const hospId =
      id ||
      `hosp-${name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 30)}`;

    const record = {
      id: hospId,
      name: name.trim(),
      type: type.trim(),
      address: address.trim(),
      area: area.trim(),
      emergency_number: emergency_number.trim(),
      reception_number: reception_number ? reception_number.trim() : emergency_number.trim(),
      has_icu: Boolean(has_icu),
      has_emergency_ward: Boolean(has_emergency_ward),
      ambulance_available: Boolean(ambulance_available),
      total_beds: Number(total_beds) || 0,
      latitude: Number(latitude),
      longitude: Number(longitude)
    };

    if (pool) {
      try {
        const sql = `
          INSERT INTO hospitals (
            id, name, type, address, area, emergency_number, reception_number,
            has_icu, has_emergency_ward, ambulance_available, total_beds, latitude, longitude
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
          RETURNING *;
        `;
        const values = [
          record.id,
          record.name,
          record.type,
          record.address,
          record.area,
          record.emergency_number,
          record.reception_number,
          record.has_icu,
          record.has_emergency_ward,
          record.ambulance_available,
          record.total_beds,
          record.latitude,
          record.longitude
        ];

        const res = await query(sql, values);
        return res.rows[0];
      } catch (err) {
        if (err.code === '23505') {
          const duplicateError = new Error(`Hospital with ID '${record.id}' already exists.`);
          duplicateError.statusCode = 409;
          throw duplicateError;
        }
        console.warn(`[HospitalModel] DB write failed (${err.message}). Using memory store fallback.`);
      }
    }

    // In-memory fallback
    memoryHospitals.set(record.id, record);
    return record;
  }

  /**
   * Find hospital by ID
   */
  static async findHospitalById(id) {
    if (!id) return null;

    if (pool) {
      try {
        const sql = `SELECT * FROM hospitals WHERE id = $1 LIMIT 1;`;
        const res = await query(sql, [id]);
        if (res.rows.length > 0) return res.rows[0];
      } catch (err) {
        console.warn(`[HospitalModel] DB query failed (${err.message}). Searching memory fallback.`);
      }
    }

    return memoryHospitals.get(id) || null;
  }

  /**
   * Search and filter hospitals
   */
  static async getHospitals({ area, hasIcu, hasEmergencyWard, type, search } = {}) {
    if (pool) {
      try {
        const conditions = [];
        const values = [];
        let index = 1;

        if (area) {
          conditions.push(`LOWER(area) = $${index}`);
          values.push(area.toLowerCase().trim());
          index++;
        }

        if (hasIcu !== undefined) {
          conditions.push(`has_icu = $${index}`);
          values.push(Boolean(hasIcu));
          index++;
        }

        if (hasEmergencyWard !== undefined) {
          conditions.push(`has_emergency_ward = $${index}`);
          values.push(Boolean(hasEmergencyWard));
          index++;
        }

        if (type) {
          conditions.push(`LOWER(type) = $${index}`);
          values.push(type.toLowerCase().trim());
          index++;
        }

        if (search) {
          conditions.push(`(
            LOWER(name) LIKE $${index} OR 
            LOWER(address) LIKE $${index} OR 
            LOWER(area) LIKE $${index}
          )`);
          values.push(`%${search.toLowerCase().trim()}%`);
          index++;
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
        const sql = `SELECT * FROM hospitals ${whereClause} ORDER BY total_beds DESC;`;

        const res = await query(sql, values);
        return res.rows;
      } catch (err) {
        console.warn(`[HospitalModel] DB search failed (${err.message}). Querying memory fallback.`);
      }
    }

    // In-memory fallback
    let results = Array.from(memoryHospitals.values());

    if (area) {
      const a = area.toLowerCase().trim();
      results = results.filter((h) => h.area.toLowerCase() === a);
    }

    if (hasIcu !== undefined) {
      const icuBool = Boolean(hasIcu);
      results = results.filter((h) => h.has_icu === icuBool);
    }

    if (hasEmergencyWard !== undefined) {
      const ewBool = Boolean(hasEmergencyWard);
      results = results.filter((h) => h.has_emergency_ward === ewBool);
    }

    if (type) {
      const t = type.toLowerCase().trim();
      results = results.filter((h) => h.type.toLowerCase() === t);
    }

    if (search) {
      const queryStr = search.toLowerCase().trim();
      results = results.filter(
        (h) =>
          h.name.toLowerCase().includes(queryStr) ||
          h.address.toLowerCase().includes(queryStr) ||
          h.area.toLowerCase().includes(queryStr)
      );
    }

    return results.sort((a, b) => b.total_beds - a.total_beds);
  }

  /**
   * Get 24/7 Emergency Care Facilities with ICU and Emergency Ward
   */
  static async getEmergencyFacilities() {
    return this.getHospitals({
      hasIcu: true,
      hasEmergencyWard: true
    });
  }

  /**
   * Count total hospitals registered
   */
  static async countHospitals() {
    if (pool) {
      try {
        const sql = `SELECT COUNT(*)::int as total FROM hospitals;`;
        const res = await query(sql);
        return res.rows[0].total;
      } catch (err) {
        console.warn(`[HospitalModel] DB count failed (${err.message}). Counting memory fallback.`);
      }
    }
    return memoryHospitals.size;
  }

  /**
   * Reset in-memory cache (for testing isolation)
   */
  static clearMemoryStore() {
    memoryHospitals.clear();
  }
}

module.exports = HospitalModel;
