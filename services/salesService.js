const Joi = require('@hapi/joi');
const { getAll, getById, insert, updateById, removeById } = require('../models/salesModel');
const { updateQtd } = require('../models/productModel');
const { errorHandler } = require('../utils/errorhandler');

const erro404 = 404;
const erro422 = 422;

const saleIdValidate = Joi.string().length(24).required();

const saleObjValidate = Joi.object({
  productId: Joi.string().length(24).required(),
  quantity: Joi.number().min(1).required(),
});

const saleArrayValidate = Joi.array().items(saleObjValidate);

const errorName = {
  notFound: 'Sale not found',
  id: 'Wrong product ID or invalid quantity',
  idformat: 'Wrong sale ID format',
};

const update = (sales) => {
  sales.forEach(async ({ productId, quantity }) => {
    await updateQtd(productId, quantity);
 });
};

const find = async () => {
  const sales = await getAll();
  return { sales };
};

const findId = async (id) => {
  const { error } = saleIdValidate.validate(id);
  if (error) throw errorHandler(erro404, 'not_found', errorName.notFound);
  const sale = await getById(id);
  if (!sale) throw errorHandler(erro404, 'not_found', errorName.notFound);
  return sale;  
}; 

const insertSale = async (sale) => {
  const { error } = saleArrayValidate.validate(sale);
  if (error) throw errorHandler(erro422, 'invalid_data', errorName.id);
  const sales = await insert(sale);
  update(sale);
  return sales;
};

const updateId = async (id, sale) => {
  const { error } = saleArrayValidate.validate(sale);
  if (error) throw errorHandler(erro422, 'invalid_data', errorName.id);
  await updateById(id, sale);
  const updated = await getById(id);

  return updated;
};

const removeId = async (id) => {
  const { error } = saleIdValidate.validate(id);
  if (error) throw errorHandler(erro422, 'invalid_data', errorName.idformat);
  const deleted = await getById(id);
  console.log(deleted);
  const { itensSold } = deleted;
  const { productId, quantity } = itensSold[0];
  await updateQtd(productId, -quantity);
  await removeById(id);

  return deleted;
};

module.exports = {
  find,
  findId,
  insertSale,
  updateId,
  removeId,
};