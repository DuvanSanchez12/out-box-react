const db = require('../config/db');

class ReviewsModel {
  static async create(data) {
    const { task_id, trabajador_id, agente_ia_id, calificacion, comentario } = data;
    const [result] = await db.query(
      'INSERT INTO reviews (task_id, trabajador_id, agente_ia_id, calificacion, comentario) VALUES (?, ?, ?, ?, ?)',
      [task_id, trabajador_id, agente_ia_id, calificacion, comentario]
    );
    return result.insertId;
  }

  static async recalculateWorkerRating(workerId) {
    const [rows] = await db.query(
      'SELECT AVG(calificacion) AS promedio FROM reviews WHERE trabajador_id = ?',
      [workerId]
    );
    const promedio = rows[0]?.promedio || 0;
    await db.query('UPDATE workers SET reputacion = ? WHERE id = ?', [promedio, workerId]);
    return promedio;
  }
}

module.exports = ReviewsModel;
