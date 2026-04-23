const WorkersModel = require('../models/workers.model');

const getAll = async (req, res) => {
  try {
    const workers = await WorkersModel.getAll(req.query);

    const parsed = workers.map((w) => ({
      ...w,
      habilidades: typeof w.habilidades === 'string' ? JSON.parse(w.habilidades || '[]') : w.habilidades
    }));

    let result = parsed;
    if (req.query.skills) {
      const skills = req.query.skills.split(',').map((s) => s.trim().toLowerCase());
      result = parsed.filter((w) =>
        skills.some((skill) =>
          (w.habilidades || []).map((h) => String(h).toLowerCase()).includes(skill)
        )
      );
    }

    return res.ok(result);
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports = { getAll };