const express = require('express');
const app = express();
const responseMiddleware = require('./middleware/response.middleware');

// Middleware para parsear JSON
app.use(express.json());
app.use(responseMiddleware);

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const profilesRoutes = require('./routes/profiles.routes');
const workersRoutes = require('./routes/workers.routes');
const tasksRoutes = require('./routes/tasks.routes');
const evidenceRoutes = require('./routes/evidence.routes');
const paymentsRoutes = require('./routes/payments.routes');
const reviewsRoutes = require('./routes/reviews.routes');

// Usar rutas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profiles', profilesRoutes);
app.use('/api/v1/workers', workersRoutes);
app.use('/api/v1/tasks', tasksRoutes);
app.use('/api/v1/evidence', evidenceRoutes);
app.use('/api/v1/payments', paymentsRoutes);
app.use('/api/v1/reviews', reviewsRoutes);

module.exports = app;