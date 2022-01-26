const { 
  insertOne, 
  find,
  findByName, 
  findByID, 
  updateById, 
  removeByID } = require('../models/productModel');
const { errorHandler } = require('../utils/errorhandler');

const erro422 = 422;

const error = {
  nameLength: '"name" length must be at least 5 characters long', 
  exists: 'Product already exists',
  min: '"quantity" must be larger than or equal to 1',
  number: '"quantity" must be a number',
  id: 'Wrong id format',
};

const validate = (name, quantity) => {
  if (name.length < 5) throw errorHandler(erro422, 'invalid_data', error.nameLength);
  if (quantity <= 0) throw errorHandler(erro422, 'invalid_data', error.min);
  if (typeof (quantity) === 'string') throw errorHandler(erro422, 'invalid_data', error.number);
  return {};
};

const create = async ({ name, quantity }) => {
  const validations = validate(name, quantity);
  if (validations.status) return validations;
  const productExist = await findByName(name);
  if (productExist) throw errorHandler(erro422, 'invalid_data', error.exists);
  const newProduct = await insertOne({ name, quantity });
  return {
    _id: newProduct,
    name,
    quantity,
  };    
};  

const findAll = async () => {
  const productlist = await find();
  const products = {
    products: productlist,
  };
  return products;
};

const findID = async (id) => {
  const productFind = await findByID(id);
  if (!productFind) throw errorHandler(erro422, 'invalid_data', error.id);
  return productFind;
};

const updateId = async (product) => {
  const { name, quantity } = product; 
  const validations = validate(name, quantity);
  if (validations.status) return validations;
  
  const productUpdate = await updateById(product);
  return productUpdate;
};

const removeId = async (id) => {
  const productFind = await findByID(id);
  if (!productFind) throw errorHandler(erro422, 'invalid_data', error.id);
  await removeByID(id);
  return productFind;
};

module.exports = {
    create,
    findAll,
    findID,
    updateId,
    removeId,
};