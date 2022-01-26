const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const getAll = async () => { 
  const conn = await connection();
  const query = await conn.collection('sales').find().toArray();
  return query;
};  

const getById = async (id) => { 
  const conn = await connection();
  const query = await conn.collection('sales').findOne({ _id: ObjectId(id) });
  return query;
};   

const insert = async (sales) => {
  const conn = await connection();
  const { insertedId } = await conn.collection('sales').insertOne({ itensSold: sales });
  const query = {
    _id: insertedId,
    itensSold: sales,
  };   
  return query;
};

const updateById = async (id, sale) => { 
  const conn = await connection();
  const query = await conn.collection('sales').updateOne({ _id: ObjectId(id) },
  { $set: { itensSold: sale } });
  return query;
}; 

const removeById = async (id) => { 
  const conn = await connection();
  const query = await conn.collection('sales').deleteOne({ _id: ObjectId(id) });
  return query;
}; 

module.exports = {
  getAll,
  getById, 
  insert,
  updateById,
  removeById,
};