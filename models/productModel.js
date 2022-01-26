const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const find = async () => connection().then((db) => db.collection('products').find().toArray())
    .then((products) =>
        products.map(({ _id, name, quantity }) =>
          ({
             _id,
             name,
             quantity,            
           })));    

const findByName = async (name) => {
  const conn = await connection();
  const query = await conn.collection('products').findOne({ name });   
  return query;
};

const findByID = async (id) => {
  if (ObjectId.isValid(id)) {
    const conn = await connection();
    const query = await conn.collection('products').findOne(ObjectId(id));  
    return query;
  }
  return null;
};

const removeByID = async (id) => {
  const conn = await connection();
  const query = await conn.collection('products').deleteOne({ _id: ObjectId(id) });  
  return query;  
};

const updateById = async (product) => {
  const { id, ...productWithoutId } = product;
  const conn = await connection();
  const query = await conn.collection('products').updateOne({ _id: id }, 
    { $set: productWithoutId });  
  return query;
};

const updateQtd = async (id, value) => {
  const conn = await connection();
  const query = await conn.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $inc: { quantity: -value } },
  );
  return query;
};

const insertOne = async (product) => {
  const conn = await connection();
  const { insertedId } = await conn.collection('products').insertOne(product);   
  return insertedId;     
};
module.exports = { insertOne, findByName, find, findByID, updateById, removeByID, updateQtd };