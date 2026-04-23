const TasksModel = require('../models/tasks.model');

const create = async (req, res) => {
  try {
    const { titulo, descripcion, presupuesto, agente_ia_id } = req.body;
    if (!titulo || !descripcion || !presupuesto || !agente_ia_id) {
      return res.badRequest('titulo, descripcion, presupuesto y agente_ia_id son obligatorios');
    }

    if (Number(presupuesto) <= 0) {
      return res.badRequest('El presupuesto debe ser mayor a 0');
    }

    const taskId = await TasksModel.create({ titulo, descripcion, presupuesto, agente_ia_id });
    const task = await TasksModel.findById(taskId);
    return res.ok(task, 'Tarea creada');
  } catch (error) {
    return res.serverError(error);
  }
};

const getAll = async (req, res) => {
  try {
    const tasks = await TasksModel.getAll(req.query);
    return res.ok(tasks);
  } catch (error) {
    return res.serverError(error);
  }
};

const getById = async (req, res) => {
  try {
    const task = await TasksModel.findById(req.params.id);
    if (!task) return res.badRequest('Tarea no encontrada');
    return res.ok(task);
  } catch (error) {
    return res.serverError(error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { estado, trabajador_id } = req.body;
    if (!estado) return res.badRequest('estado es obligatorio');

    const exists = await TasksModel.findById(req.params.id);
    if (!exists) return res.badRequest('Tarea no encontrada');

    const updated = await TasksModel.updateStatus(req.params.id, estado, trabajador_id);
    if (!updated) return res.badRequest('No se pudo actualizar la tarea');

    const task = await TasksModel.findById(req.params.id);
    return res.ok(task, 'Estado actualizado');
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports = { create, getAll, getById, updateStatus };