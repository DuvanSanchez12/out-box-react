const { workers } = require('../data/database');

const getAll = (req, res) => {
  let resultado = [...workers];
  
  // Filtrar por ubicación
  if(req.query.location) {
    resultado = resultado.filter(w => 
      w.ubicacion.toLowerCase().includes(req.query.location.toLowerCase())
    );
  }
  
  // Filtrar por habilidades
  if(req.query.skills) {
    const skillsBuscadas = req.query.skills.split(',');
    resultado = resultado.filter(w => 
      skillsBuscadas.some(skill => w.habilidades.includes(skill))
    );
  }
  
  // Filtrar por reputación mínima
  if(req.query.min_rating) {
    resultado = resultado.filter(w => w.reputacion >= parseFloat(req.query.min_rating));
  }
  
  // Devolver solo datos públicos
  const publicData = resultado.map(w => ({
    id: w.id,
    nombre: w.nombre,
    ubicacion: w.ubicacion,
    tarifa_hora: w.tarifa_hora,
    habilidades: w.habilidades,
    reputacion: w.reputacion
  }));
  
  res.json({ ok: true, data: publicData });
};

module.exports = { getAll };