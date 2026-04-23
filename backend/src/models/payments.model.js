const db = require('../config/db');

class PaymentsModel {
  static async create(taskId, workerId, monto) {
    const [result] = await db.query(
      'INSERT INTO payments (task_id, worker_id, monto, estado) VALUES (?, ?, ?, ?)',
      [taskId, workerId, monto, 'liberado']
    );
    return result.insertId;
  }
}

module.exports = PaymentsModel;
