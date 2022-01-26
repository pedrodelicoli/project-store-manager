const errorHandler = (status, code, message) => ({
    erro: {
      status,
      code,
      message,
    },
  });

module.exports = { errorHandler };