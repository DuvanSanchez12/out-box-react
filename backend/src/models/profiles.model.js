const db = require('../config/db');

class ProfilesModel {
  static async findById(id) {
    const [rows] = await db.query(
      'SELECT id, nombre, ubicacion, tarifa_hora, habilidades, reputacion FROM workers WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  static async update(id, data) {
    const allowed = ['nombre', 'ubicacion', 'tarifa_hora', 'habilidades'];
    const entries = Object.entries(data).filter(([key]) => allowed.includes(key));

    if (entries.length === 0) return false;

    const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([key, value]) =>
      key === 'habilidades' ? JSON.stringify(value) : value
    );

    const [result] = await db.query(`UPDATE workers SET ${setClause} WHERE id = ?`, [...values, id]);
    return result.affectedRows > 0;
  }
}

module.exports = ProfilesModel;
