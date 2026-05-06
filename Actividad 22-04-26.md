# Configuracion Backend y Base de Datos

## Repositorio

- Link del proyecto: [https://github.com/DuvanSanchez12/out-box-react](https://github.com/DuvanSanchez12/out-box-react)

## Crear archivo .env

Crear el archivo `backend/.env` con este contenido:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=out_box_db
DB_CONNECTION_LIMIT=10
```

## Script SQL para MySQL

Ejecuta este script en MySQL Workbench o por consola:

```sql
CREATE DATABASE IF NOT EXISTS out_box_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE out_box_db;

CREATE TABLE IF NOT EXISTS workers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  ubicacion VARCHAR(120) DEFAULT NULL,
  tarifa_hora DECIMAL(10,2) DEFAULT 0.00,
  habilidades JSON NULL,
  reputacion DECIMAL(3,2) DEFAULT 5.00,
  saldo_escrow DECIMAL(12,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(180) NOT NULL,
  descripcion TEXT NOT NULL,
  presupuesto DECIMAL(12,2) NOT NULL,
  estado ENUM('pendiente','activo','completado','cancelado') NOT NULL DEFAULT 'pendiente',
  agente_ia_id VARCHAR(100) NOT NULL,
  trabajador_id INT NULL,
  validado TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tasks_worker
    FOREIGN KEY (trabajador_id) REFERENCES workers(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS evidences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_id INT NOT NULL,
  descripcion TEXT NULL,
  coordenadas VARCHAR(120) NULL,
  firma LONGTEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_evidences_task
    FOREIGN KEY (task_id) REFERENCES tasks(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_id INT NOT NULL,
  worker_id INT NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  estado ENUM('liberado','pendiente','fallido') NOT NULL DEFAULT 'liberado',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_payments_task
    FOREIGN KEY (task_id) REFERENCES tasks(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_payments_worker
    FOREIGN KEY (worker_id) REFERENCES workers(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_id INT NOT NULL,
  trabajador_id INT NOT NULL,
  agente_ia_id VARCHAR(100) NOT NULL,
  calificacion INT NOT NULL,
  comentario TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_reviews_calificacion
    CHECK (calificacion BETWEEN 1 AND 5),
  CONSTRAINT fk_reviews_task
    FOREIGN KEY (task_id) REFERENCES tasks(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_reviews_worker
    FOREIGN KEY (trabajador_id) REFERENCES workers(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;
```

## Comandos para ejecutar

Desde la carpeta `backend`:

```bash
npm install
npm run dev
```
