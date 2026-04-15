const { reviews, findTaskById, findWorkerById, updateWorkerReputation } = require('../models/database');
//crear una revision de tareas
const createReview = (req, res) => {
  const task = findTaskById(req.params.task_id);
  
  if(!task) {
    return res.status(404).json({ ok: false, msg: 'Tarea no encontrada' });
  }
  
  const { calificacion, comentario, agente_ia_id } = req.body;
  
  // Validar calificación (1-5)
  if(calificacion < 1 || calificacion > 5) {
    return res.status(400).json({ ok: false, msg: 'La calificación debe ser entre 1 y 5' });
  }
  
  const nuevaReview = {
    id: Date.now(),
    task_id: task.id,
    trabajador_id: task.trabajador_id,
    agente_ia_id,
    calificacion,
    comentario: comentario || '',
    createdAt: new Date()
  };
  
  reviews.push(nuevaReview);
  
  // Recalcular reputación del trabajador
  updateWorkerReputation(task.trabajador_id);
  
  const trabajador = findWorkerById(task.trabajador_id);
  
  res.status(201).json({ 
    ok: true, 
    data: { 
      review: nuevaReview,
      nueva_reputacion: trabajador.reputacion 
    } 
  });
};

module.exports = { createReview };