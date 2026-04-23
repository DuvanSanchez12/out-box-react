const responseMiddleware = (req, res, next) => {
  res.ok = (data = null, message = 'OK') => {
    return res.status(200).json({ ok: true, message, data });
  };

  res.badRequest = (message = 'Solicitud invalida', data = null) => {
    return res.status(400).json({ ok: false, message, data });
  };

  res.serverError = (error, message = 'Error interno del servidor') => {
    return res.status(500).json({
      ok: false,
      message,
      error: error?.message || String(error)
    });
  };

  next();
};

module.exports = responseMiddleware;
