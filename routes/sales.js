const express = require('express');

const { 
    findAll, 
    findByID,
    insert, 
    updateById, 
    removeById } = require('../controllers/salesController');

const saleRouter = express.Router();

saleRouter.get('/', findAll);
saleRouter.get('/:id', findByID);
saleRouter.post('/', insert);
saleRouter.put('/:id', updateById);
saleRouter.delete('/:id', removeById);

module.exports = saleRouter;