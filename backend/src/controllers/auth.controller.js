const { workers } = require('../models/database');

let nextId = 3; // Para generar IDs automáticos

const register = (req, res) => {
  const { email, password, nombre, ubicacion, tarifa_hora, habilidades } = req.body;
  
  // Verificar si ya existe
  const existe = workers.find(w => w.email === email);
  if(existe) {
    return res.status(400).json({ ok: false, msg: 'El email ya está registrado' });
  }
  
  const nuevoTrabajador = {
    id: nextId++,
    email,
    password, // En producción deberías encriptar con bcrypt
    nombre,
    ubicacion,
    tarifa_hora,
    habilidades: habilidades || [],
    reputacion: 5.0,
    saldo_escrow: 0,
    createdAt: new Date()
  };
  
  workers.push(nuevoTrabajador);
  
  res.status(201).json({ 
    ok: true, 
    data: { id: nuevoTrabajador.id, nombre: nuevoTrabajador.nombre, email: nuevoTrabajador.email } 
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  
  const trabajador = workers.find(w => w.email === email && w.password === password);
  
  if(!trabajador) {
    return res.status(401).json({ ok: false, msg: 'Credenciales inválidas' });
  }
  
  // Token simplificado para la clase (en producción usar JWT real)
  const token = `fake_jwt_token_${trabajador.id}_${Date.now()}`;
  
  res.json({ 
    ok: true, 
    data: { 
      token, 
      user: { id: trabajador.id, nombre: trabajador.nombre, email: trabajador.email } 
    } 
  });
};

module.exports = { register, login };