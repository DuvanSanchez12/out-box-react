const { findTaskById } = require('../models/database');

const uploadEvidence = (req, res) => {
  const task = findTaskById(req.params.id);
  
  if(!task) {
    return res.status(404).json({ ok: false, msg: 'Tarea no encontrada' });
  }
  
  // Simular carga de evidencia (en producción sería upload de archivos)
  const { descripcion, coordenadas, firma } = req.body;
  
  const nuevaEvidencia = {
    id: Date.now(),
    descripcion: descripcion || 'Evidencia subida',
    coordenadas: coordenadas || '4.6097,-74.0817',
    firma: firma || 'firma_base64_simulada',
    fecha: new Date()
  };
  
  task.evidencia.push(nuevaEvidencia);
  
  res.status(201).json({ ok: true, data: nuevaEvidencia });
};

const validateTask = (req, res) => {
  const task = findTaskById(req.params.id);
  
  if(!task) {
    return res.status(404).json({ ok: false, msg: 'Tarea no encontrada' });
  }
  
  task.validado = true;
  task.estado = 'completado';
  
  res.json({ ok: true, data: { msg: 'Tarea validada exitosamente', task } });
};

module.exports = { uploadEvidence, validateTask };