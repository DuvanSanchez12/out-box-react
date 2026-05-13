const express = require('express');
const app = express();
const responseMiddleware = require('./middleware/response.middleware');

// Middleware para parsear JSON
app.use(express.json());
app.use(responseMiddleware);

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173'
}));    

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const profilesRoutes = require('./routes/profiles.routes');
const workersRoutes = require('./routes/workers.routes');
const tasksRoutes = require('./routes/tasks.routes');
const evidenceRoutes = require('./routes/evidence.routes');
const paymentsRoutes = require('./routes/payments.routes');
const reviewsRoutes = require('./routes/reviews.routes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/workers', workersRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/reviews', reviewsRoutes);

module.exports = app;