const { findTaskById, workers, findWorkerById } = require('../data/database');

const releasePayment = (req, res) => {
  const task = findTaskById(req.params.task_id);
  
  if(!task) {
    return res.status(404).json({ ok: false, msg: 'Tarea no encontrada' });
  }
  
  if(task.estado !== 'completado') {
    return res.status(400).json({ ok: false, msg: 'La tarea debe estar completada para liberar el pago' });
  }
  
  const trabajador = findWorkerById(task.trabajador_id);
  
  if(!trabajador) {
    return res.status(404).json({ ok: false, msg: 'Trabajador no encontrado' });
  }
  
  // Calcular pago (90% al trabajador, 10% comisión plataforma)
  const pagoTrabajador = task.presupuesto * 0.9;
  const comisionPlataforma = task.presupuesto * 0.1;
  
  trabajador.saldo_escrow += pagoTrabajador;
  
  res.json({ 
    ok: true, 
    data: { 
      msg: 'Pago liberado exitosamente',
      pago_trabajador: pagoTrabajador,
      comision_plataforma: comisionPlataforma,
      nuevo_saldo: trabajador.saldo_escrow
    } 
  });
};

module.exports = { releasePayment };