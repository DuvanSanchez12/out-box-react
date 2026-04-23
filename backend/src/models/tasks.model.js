const db = require('../config/db');

class TasksModel {
  static async create(data) {
    const { titulo, descripcion, presupuesto, agente_ia_id } = data;
    const [result] = await db.query(
      'INSERT INTO tasks (titulo, descripcion, presupuesto, estado, agente_ia_id, trabajador_id, validado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [titulo, descripcion, presupuesto, 'pendiente', agente_ia_id, null, 0]
    );
    return result.insertId;
  }

  static async getAll(filters = {}) {
    let sql = 'SELECT * FROM tasks WHERE 1=1';
    const params = [];

    if (filters.estado) {
      sql += ' AND estado = ?';
      params.push(filters.estado);
    }

    if (filters.trabajador_id) {
      sql += ' AND trabajador_id = ?';
      params.push(Number(filters.trabajador_id));
    }

    const [rows] = await db.query(sql, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async updateStatus(id, estado, trabajador_id = null) {
    if (trabajador_id) {
      const [result] = await db.query(
        'UPDATE tasks SET estado = ?, trabajador_id = ? WHERE id = ?',
        [estado, trabajador_id, id]
      );
      return result.affectedRows > 0;
    }

    const [result] = await db.query('UPDATE tasks SET estado = ? WHERE id = ?', [estado, id]);
    return result.affectedRows > 0;
  }
}

module.exports = TasksModel;
