const db = require('../config/db');

class EvidenceModel {
  static async addEvidence(taskId, data) {
    const { descripcion, coordenadas, firma } = data;
    const [result] = await db.query(
      'INSERT INTO evidences (task_id, descripcion, coordenadas, firma) VALUES (?, ?, ?, ?)',
      [taskId, descripcion, coordenadas, firma]
    );
    return result.insertId;
  }

  static async validateTask(taskId) {
    const [result] = await db.query(
      "UPDATE tasks SET validado = 1, estado = 'completado' WHERE id = ?",
      [taskId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = EvidenceModel;
