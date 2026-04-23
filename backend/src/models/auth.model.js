const db = require('../config/db');

class AuthModel {
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM workers WHERE email = ?', [email]);
    return rows[0] || null;
  }

  static async createWorker(data) {
    const { email, password, nombre, ubicacion, tarifa_hora, habilidades = [] } = data;
    const [result] = await db.query(
      'INSERT INTO workers (email, password, nombre, ubicacion, tarifa_hora, habilidades, reputacion, saldo_escrow) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [email, password, nombre, ubicacion, tarifa_hora, JSON.stringify(habilidades), 5.0, 0]
    );
    return result.insertId;
  }
}

module.exports = AuthModel;
