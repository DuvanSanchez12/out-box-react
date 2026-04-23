<<<<<<< HEAD
const { findTaskById } = require('../models/database');
=======
const TasksModel = require('../models/tasks.model');
const EvidenceModel = require('../models/evidence.model');
>>>>>>> 4bad21e (Cambios de verdad, no tonterias como las que subian)

const uploadEvidence = async (req, res) => {
  try {
    const task = await TasksModel.findById(req.params.id);
    if (!task) return res.badRequest('Tarea no encontrada');

    const payload = {
      descripcion: req.body.descripcion || 'Evidencia subida',
      coordenadas: req.body.coordenadas || '0,0',
      firma: req.body.firma || ''
    };

    const evidenceId = await EvidenceModel.addEvidence(req.params.id, payload);
    return res.ok({ id: evidenceId, ...payload }, 'Evidencia cargada');
  } catch (error) {
    return res.serverError(error);
  }
};

const validateTask = async (req, res) => {
  try {
    const task = await TasksModel.findById(req.params.id);
    if (!task) return res.badRequest('Tarea no encontrada');

    await EvidenceModel.validateTask(req.params.id);
    const updatedTask = await TasksModel.findById(req.params.id);
    return res.ok(updatedTask, 'Tarea validada exitosamente');
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports = { uploadEvidence, validateTask };