const { workers, findWorkerById } = require('../data/database');

const getById = (req, res) => {
  const worker = findWorkerById(req.params.id);
  
  if(!worker) {
    return res.status(404).json({ ok: false, msg: 'Perfil no encontrado' });
  }
  
  // Devolver solo datos públicos
  const publicProfile = {
    id: worker.id,
    nombre: worker.nombre,
    ubicacion: worker.ubicacion,
    tarifa_hora: worker.tarifa_hora,
    habilidades: worker.habilidades,
    reputacion: worker.reputacion
  };
  
  res.json({ ok: true, data: publicProfile });
};

const update = (req, res) => {
  const worker = findWorkerById(req.params.id);
  
  if(!worker) {
    return res.status(404).json({ ok: false, msg: 'Perfil no encontrado' });
  }
  
  // Actualizar campos permitidos
  if(req.body.ubicacion) worker.ubicacion = req.body.ubicacion;
  if(req.body.tarifa_hora) worker.tarifa_hora = req.body.tarifa_hora;
  if(req.body.habilidades) worker.habilidades = req.body.habilidades;
  if(req.body.nombre) worker.nombre = req.body.nombre;
  
  res.json({ ok: true, data: worker });
};

module.exports = { getById, update };