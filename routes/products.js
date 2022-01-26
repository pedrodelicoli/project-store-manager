const express = require('express');
const {
  insert, 
  getAll, 
  findById, 
  updateById, 
  removeById } = require('../controllers/productController');

  const productRouter = express.Router();

productRouter.post('/', insert);
productRouter.get('/:id', findById);
productRouter.put('/:id', updateById);
productRouter.delete('/:id', removeById);
productRouter.get('/', getAll);

module.exports = productRouter;