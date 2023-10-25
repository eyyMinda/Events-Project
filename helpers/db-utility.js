//=================== MONGO-DB HELPERS ====================

export const responseReturn = (res, status, body) => {
  if (typeof body === 'string' || Array.isArray(body)) body = { err: true, msg: body };
  if (status === 201 || status === 200) body.err = false;
  res.status(status).json(body);
};

export const postToMongo = async (client, collection, body) => {
  const db = await client.db("events_nextjs");
  await db.collection(collection).insertOne(body);
}

/**
 * @param {client} Client object
 * @param {string} Collection string
 * @param {Object} Query object | (Optional)
 * @param {Object} Sort object | (Optional)
 * @returns {Array<Object>} Documents | array of objects 
 */
export const getFromMongo = async (client, collection, query = {}, sort = {}) => {
  const db = client.db("events_nextjs");
  const coll = await db.collection(collection);
  const comments = await coll.find(query).sort(sort).limit(10).toArray();
  return comments;
}