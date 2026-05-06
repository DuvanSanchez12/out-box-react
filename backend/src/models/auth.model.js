const db = require('../config/db');
const bcrypt = require('bcryptjs');

class AuthModel {
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM workers WHERE email = ?', [email]);
    return rows[0] || null;
  }

  static async createWorker(data) {
    const { email, password, nombre, ubicacion, tarifa_hora, habilidades = [] } = data;
    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO workers (email, password, nombre, ubicacion, tarifa_hora, habilidades, reputacion, saldo_escrow) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [email, hash, nombre, ubicacion, tarifa_hora, JSON.stringify(habilidades), 5.0, 0]
    );
    return result.insertId;
  }

  static async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = AuthModel;
