const AuthModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');

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

    const token = jwt.sign(
      { id: nuevoId, email, nombre },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.ok({ token, user: { id: nuevoId, nombre, email } }, 'Usuario registrado');
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
    if (!trabajador) {
      return res.badRequest('Credenciales invalidas');
    }

    const validPassword = await AuthModel.comparePassword(password, trabajador.password);
    if (!validPassword) {
      return res.badRequest('Credenciales invalidas');
    }

    const token = jwt.sign(
      { id: trabajador.id, email: trabajador.email, nombre: trabajador.nombre },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.ok({
      token,
      user: { id: trabajador.id, nombre: trabajador.nombre, email: trabajador.email }
    });
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports = { register, login };