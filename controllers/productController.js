const { findAll, create, findID, updateId, removeId } = require('../services/productsService');

const created = 201;
const success = 200;

const getAll = async (_req, res, next) => {
  try {
    const products = await findAll();
    return res.status(success).send(products);
  } catch (err) {
    next(err);
  }  
};

const insert = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const product = { name, quantity };
    const newProduct = await create(product);
    return res.status(created).send(newProduct);    
  } catch (err) {
    next(err);
  }    
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findProduct = await findID(id);
    return res.status(success).send(findProduct);    
  } catch (err) {
    next(err);
  }    
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = { id, name, quantity };
    await updateId(product);
    return res.status(success).send(product);    
  } catch (err) {
    next(err);
  }    
};

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removeProduct = await removeId(id);
    return res.status(success).send(removeProduct);    
  } catch (err) {
    next(err);
  }    
};

module.exports = { insert, getAll, findById, updateById, removeById };