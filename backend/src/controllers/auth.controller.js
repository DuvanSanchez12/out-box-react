<<<<<<< HEAD
const { workers } = require('../models/database');
=======
const AuthModel = require('../models/auth.model');
>>>>>>> 4bad21e (Cambios de verdad, no tonterias como las que subian)

const register = async (req, res) => {
  try {
    const { email, password, nombre, ubicacion, tarifa_hora, habilidades } = req.body;

    if (!email || !password || !nombre) {
      return res.badRequest('email, password y nombre son obligatorios');
    }

    const existe = await AuthModel.findByEmail(email);
    if (existe) return res.badRequest('El email ya existe');

    const nuevoId = await AuthModel.createWorker({
      email,
      password,
      nombre,
      ubicacion,
      tarifa_hora,
      habilidades
    });

    return res.ok({ id: nuevoId, nombre, email }, 'Usuario registrado');
  } catch (error) {
    return res.serverError(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.badRequest('email y password son obligatorios');
    }

    const trabajador = await AuthModel.findByEmail(email);
    if (!trabajador || trabajador.password !== password) {
      return res.badRequest('Credenciales invalidas');
    }

    return res.ok({
      token: `jwt_${trabajador.id}`,
      user: { id: trabajador.id, nombre: trabajador.nombre }
    });
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports = { register, login };