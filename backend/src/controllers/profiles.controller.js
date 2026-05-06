const ProfilesModel = require('../models/profiles.model');

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

    if (req.usuario && req.usuario.id !== parseInt(req.params.id)) {
      return res.badRequest('No tienes permiso para actualizar este perfil');
    }

    const updated = await ProfilesModel.update(req.params.id, req.body);
    if (!updated) return res.badRequest('No hay campos validos para actualizar');

    const profile = await ProfilesModel.findById(req.params.id);
    return res.ok(profile, 'Perfil actualizado');
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports = { getById, update };