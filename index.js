const express = require('express');
const { error } = require('./middlewares/error');
const router = require('./routes');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(router);
app.use(error);
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT);
