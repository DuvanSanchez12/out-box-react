// Base de datos en memoria para el proyecto
let workers = [
  { 
    id: 1, 
    email: 'juan@email.com',
    password: '$2a$10$encrypted_password_here', // En producción usar bcrypt
    nombre: 'Juan Pérez',
    ubicacion: 'Bogotá',
    tarifa_hora: 15,
    habilidades: ['reparación', 'electricidad'],
    reputacion: 4.5,
    saldo_escrow: 1000,
    createdAt: new Date()
  },
  {
    id: 2,
    email: 'maria@email.com', 
    password: '$2a$10$encrypted_password_here',
    nombre: 'María García',
    ubicacion: 'Medellín',
    tarifa_hora: 20,
    habilidades: ['limpieza', 'cocina'],
    reputacion: 4.8,
    saldo_escrow: 1500,
    createdAt: new Date()
  }
];

let tasks = [
  {
    id: 1,
    titulo: 'Reparar laptop',
    descripcion: 'Laptop no enciende',
    presupuesto: 100,
    estado: 'pendiente', // pendiente, activo, completado, cancelado
    agente_ia_id: 'IA_001',
    trabajador_id: null,
    evidencia: [],
    validado: false,
    createdAt: new Date()
  }
];

let reviews = [];

// Funciones auxiliares
const findWorkerById = (id) => workers.find(w => w.id == id);
const findTaskById = (id) => tasks.find(t => t.id == id);
const updateWorkerReputation = (workerId) => {
  const workerReviews = reviews.filter(r => r.trabajador_id == workerId);
  if(workerReviews.length > 0) {
    const avg = workerReviews.reduce((sum, r) => sum + r.calificacion, 0) / workerReviews.length;
    const worker = findWorkerById(workerId);
    if(worker) worker.reputacion = avg;
  }
};

module.exports = {
  workers,
  tasks,
  reviews,
  findWorkerById,
  findTaskById,
  updateWorkerReputation
};