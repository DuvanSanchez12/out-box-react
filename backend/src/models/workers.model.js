const db = require('../config/db');

class WorkersModel {
  static async getAll(filters = {}) {
    let sql = 'SELECT id, nombre, ubicacion, tarifa_hora, habilidades, reputacion FROM workers WHERE 1=1';
    const params = [];

    if (filters.location) {
      sql += ' AND ubicacion LIKE ?';
      params.push(`%${filters.location}%`);
    }

    if (filters.min_rating) {
      sql += ' AND reputacion >= ?';
      params.push(Number(filters.min_rating));
    }

    const [rows] = await db.query(sql, params);
    return rows;
  }
}

module.exports = WorkersModel;
