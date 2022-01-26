const { find, findId, insertSale, updateId, removeId } = require('../services/salesService');

const success = 200;

const findAll = async (_req, res, next) => {
    try {
      const sales = await find();
      return res.status(success).json(sales);
    } catch (err) {
      next(err);
    }  
  }; 
  
const findByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await findId(id);
    return res.status(success).json(sale);
  } catch (err) {
    next(err);
  }  
}; 

const insert = async (req, res, next) => {
  try {
    const sale = await insertSale(req.body);
    return res.status(success).json(sale);
  } catch (err) {    
    return next(err);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await updateId(id, req.body);
    return res.status(success).json(updated);
  } catch (error) {
    return next(error);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await removeId(id);
    return res.status(success).json(removed);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  findAll,
  findByID,
  insert,
  updateById,
  removeById,
};
