const TasksModel = require('../models/tasks.model');
const ReviewsModel = require('../models/reviews.model');

const createReview = async (req, res) => {
  try {
    const task = await TasksModel.findById(req.params.task_id);
    if (!task) return res.badRequest('Tarea no encontrada');
    if (!task.trabajador_id) return res.badRequest('La tarea no tiene trabajador asignado');

    const { calificacion, comentario, agente_ia_id } = req.body;
    if (!calificacion || calificacion < 1 || calificacion > 5) {
      return res.badRequest('La calificacion debe ser entre 1 y 5');
    }

    const reviewId = await ReviewsModel.create({
      task_id: task.id,
      trabajador_id: task.trabajador_id,
      agente_ia_id,
      calificacion,
      comentario: comentario || ''
    });
    const nuevaReputacion = await ReviewsModel.recalculateWorkerRating(task.trabajador_id);

    return res.ok(
      { review_id: reviewId, task_id: task.id, trabajador_id: task.trabajador_id, nueva_reputacion: nuevaReputacion },
      'Review creada'
    );
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports = { createReview };