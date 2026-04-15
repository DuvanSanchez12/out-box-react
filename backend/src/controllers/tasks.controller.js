const { tasks, workers, findWorkerById, findTaskById } = require('../data/database');

let nextTaskId = 2;
// generar una nueva tarea
const create = (req, res) => {
  const { titulo, descripcion, presupuesto, agente_ia_id } = req.body;
  
  // Validación: el agente IA debe tener saldo suficiente (simulado)
  if(presupuesto > 1000) {
    return res.status(400).json({ ok: false, msg: 'Presupuesto excede el saldo disponible en escrow' });
  }
  
  const nuevaTarea = {
    id: nextTaskId++,
    titulo,
    descripcion,
    presupuesto,
    estado: 'pendiente',
    agente_ia_id,
    trabajador_id: null,
    evidencia: [],
    validado: false,
    createdAt: new Date()
  };
  
  tasks.push(nuevaTarea);
  res.status(201).json({ ok: true, data: nuevaTarea });
};
// traer todas las tareas
const getAll = (req, res) => {
  let resultado = [...tasks];
  
  if(req.query.estado) {
    resultado = resultado.filter(t => t.estado === req.query.estado);
  }
  
  if(req.query.trabajador_id) {
    resultado = resultado.filter(t => t.trabajador_id == req.query.trabajador_id);
  }
  
  res.json({ ok: true, data: resultado });
};
// tarea especifica
const getById = (req, res) => {
  const task = findTaskById(req.params.id);
  
  if(!task) {
    return res.status(404).json({ ok: false, msg: 'Tarea no encontrada' });
  }
  
  res.json({ ok: true, data: task });
};
//actualizar estatus de tarea
const updateStatus = (req, res) => {
  const task = findTaskById(req.params.id);
  
  if(!task) {
    return res.status(404).json({ ok: false, msg: 'Tarea no encontrada' });
  }
  
  const { estado, trabajador_id } = req.body;
  
  if(estado) {
    // Si la tarea se asigna a un trabajador
    if(estado === 'activo' && trabajador_id) {
      task.trabajador_id = trabajador_id;
    }
    task.estado = estado;
  }
  
  res.json({ ok: true, data: task });
};

module.exports = { create, getAll, getById, updateStatus };