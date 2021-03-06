const error = (err, _req, res, _next) => {
  if (err.erro) {
    const { erro } = err;
    return res.status(erro.status).json({
      err: {
        code: erro.code,
        message: erro.message,
      },
    });
  }
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = { error }; 