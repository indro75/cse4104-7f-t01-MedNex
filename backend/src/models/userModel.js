const crypto = require('crypto');
const { pool, query } = require('../config/db');

// In-memory user store fallback for offline/testing development
const memoryUsers = new Map();

/**
 * User Data Model & Repository
 * Handles database operations against PostgreSQL / Supabase, with automatic fallback
 */
class UserModel {
  /**
   * Create a new user in the database
   */
  static async createUser({
    id = crypto.randomUUID(),
    name,
    email,
    password_hash,
    phone = null,
    age = null,
    gender = null,
    blood_group = null,
    city = 'Khulna',
    emergency_contact = null,
    allergies = [],
    chronic_conditions = []
  }) {
    const normalizedEmail = email.toLowerCase().trim();
    const now = new Date();

    const userRecord = {
      id,
      name: name.trim(),
      email: normalizedEmail,
      password_hash,
      phone,
      age: age !== null ? Number(age) : null,
      gender,
      blood_group: blood_group ? blood_group.toUpperCase() : null,
      city,
      emergency_contact,
      allergies: Array.isArray(allergies) ? allergies : [],
      chronic_conditions: Array.isArray(chronic_conditions) ? chronic_conditions : [],
      created_at: now
    };

    if (pool) {
      try {
        const sql = `
          INSERT INTO users (
            id, name, email, password_hash, phone, age, gender, 
            blood_group, city, emergency_contact, allergies, chronic_conditions, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
          RETURNING *;
        `;
        const values = [
          userRecord.id,
          userRecord.name,
          userRecord.email,
          userRecord.password_hash,
          userRecord.phone,
          userRecord.age,
          userRecord.gender,
          userRecord.blood_group,
          userRecord.city,
          userRecord.emergency_contact,
          JSON.stringify(userRecord.allergies),
          JSON.stringify(userRecord.chronic_conditions),
          userRecord.created_at
        ];

        const res = await query(sql, values);
        return res.rows[0];
      } catch (err) {
        // If unique constraint violation or error, rethrow or fall through if offline
        if (err.code === '23505') {
          const duplicateError = new Error('An account with this email address already exists.');
          duplicateError.statusCode = 409;
          throw duplicateError;
        }
        console.warn(`[UserModel] DB write failed (${err.message}). Using memory store fallback.`);
      }
    }

    // Fallback store
    if (memoryUsers.has(normalizedEmail)) {
      const duplicateError = new Error('An account with this email address already exists.');
      duplicateError.statusCode = 409;
      throw duplicateError;
    }
    memoryUsers.set(normalizedEmail, userRecord);
    return userRecord;
  }

  /**
   * Find user by email
   */
  static async findUserByEmail(email) {
    if (!email) return null;
    const normalizedEmail = email.toLowerCase().trim();

    if (pool) {
      try {
        const sql = `SELECT * FROM users WHERE LOWER(email) = $1 LIMIT 1;`;
        const res = await query(sql, [normalizedEmail]);
        if (res.rows.length > 0) {
          return res.rows[0];
        }
      } catch (err) {
        console.warn(`[UserModel] DB query failed (${err.message}). Searching memory fallback.`);
      }
    }

    return memoryUsers.get(normalizedEmail) || null;
  }

  /**
   * Find user by ID
   */
  static async findUserById(id) {
    if (!id) return null;

    if (pool) {
      try {
        const sql = `SELECT * FROM users WHERE id = $1 LIMIT 1;`;
        const res = await query(sql, [id]);
        if (res.rows.length > 0) {
          return res.rows[0];
        }
      } catch (err) {
        console.warn(`[UserModel] DB query failed (${err.message}). Searching memory fallback.`);
      }
    }

    for (const user of memoryUsers.values()) {
      if (user.id === id) return user;
    }
    return null;
  }

  /**
   * Update user profile metadata
   */
  static async updateUserProfile(id, updates = {}) {
    const allowedFields = [
      'name',
      'phone',
      'age',
      'gender',
      'blood_group',
      'city',
      'emergency_contact',
      'allergies',
      'chronic_conditions'
    ];

    const fieldsToUpdate = {};
    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        fieldsToUpdate[key] = updates[key];
      }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return this.findUserById(id);
    }

    if (pool) {
      try {
        const setClauses = [];
        const values = [];
        let index = 1;

        for (const [key, value] of Object.entries(fieldsToUpdate)) {
          if (key === 'allergies' || key === 'chronic_conditions') {
            setClauses.push(`${key} = $${index}`);
            values.push(JSON.stringify(value));
          } else {
            setClauses.push(`${key} = $${index}`);
            values.push(value);
          }
          index++;
        }

        values.push(id);
        const sql = `
          UPDATE users 
          SET ${setClauses.join(', ')} 
          WHERE id = $${index} 
          RETURNING *;
        `;

        const res = await query(sql, values);
        if (res.rows.length > 0) {
          return res.rows[0];
        }
      } catch (err) {
        console.warn(`[UserModel] DB update failed (${err.message}). Updating memory store fallback.`);
      }
    }

    // Memory fallback update
    for (const [email, user] of memoryUsers.entries()) {
      if (user.id === id) {
        const updatedUser = { ...user, ...fieldsToUpdate };
        memoryUsers.set(email, updatedUser);
        return updatedUser;
      }
    }
    return null;
  }

  /**
   * Reset / clear in-memory cache (primarily for test isolation)
   */
  static clearMemoryStore() {
    memoryUsers.clear();
  }
}

module.exports = UserModel;
