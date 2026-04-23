<<<<<<< HEAD
const { workers, findWorkerById } = require('../models/database');
=======
const ProfilesModel = require('../models/profiles.model');
>>>>>>> 4bad21e (Cambios de verdad, no tonterias como las que subian)

const getById = async (req, res) => {
  try {
    const worker = await ProfilesModel.findById(req.params.id);
    if (!worker) return res.badRequest('Perfil no encontrado');

    const profile = {
      ...worker,
      habilidades: typeof worker.habilidades === 'string'
        ? JSON.parse(worker.habilidades || '[]')
        : worker.habilidades
    };

    return res.ok(profile);
  } catch (error) {
    return res.serverError(error);
  }
};

const update = async (req, res) => {
  try {
    const exists = await ProfilesModel.findById(req.params.id);
    if (!exists) return res.badRequest('Perfil no encontrado');

    const updated = await ProfilesModel.update(req.params.id, req.body);
    if (!updated) return res.badRequest('No hay campos validos para actualizar');

    const profile = await ProfilesModel.findById(req.params.id);
    return res.ok(profile, 'Perfil actualizado');
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports = { getById, update };