<<<<<<< HEAD
const { findTaskById, workers, findWorkerById } = require('../models/database');
=======
const TasksModel = require('../models/tasks.model');
const PaymentsModel = require('../models/payments.model');
const db = require('../config/db');
>>>>>>> 4bad21e (Cambios de verdad, no tonterias como las que subian)

const releasePayment = async (req, res) => {
  try {
    const task = await TasksModel.findById(req.params.task_id);
    if (!task || task.estado !== 'completado') {
      return res.badRequest('Tarea no valida para pago');
    }

    if (!task.trabajador_id) {
      return res.badRequest('La tarea no tiene trabajador asignado');
    }

    const pagoTrabajador = Number(task.presupuesto) * 0.9;
    await db.query('UPDATE workers SET saldo_escrow = saldo_escrow + ? WHERE id = ?', [
      pagoTrabajador,
      task.trabajador_id
    ]);
    const paymentId = await PaymentsModel.create(task.id, task.trabajador_id, pagoTrabajador);

    return res.ok({ payment_id: paymentId, task_id: task.id, monto: pagoTrabajador }, 'Pago liberado');
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports = { releasePayment };