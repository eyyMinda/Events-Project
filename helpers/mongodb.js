import { MongoClient, ServerApiVersion } from "mongodb";

//=================== INIT ====================
const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
};
let clientPromise = null;

export const connectToMongo = async () => {
  if (clientPromise) return clientPromise;
  const client = await MongoClient.connect(uri, options);
  clientPromise = client;
  return clientPromise;
};

//=================== HELPERS ====================

export const responseReturn = (res, status, body) => {
  if (typeof body === 'string' || typeof body === 'array') body = { err: true, msg: body };
  if (status === 201 || status === 200) body.err = false;
  res.status(status).json(body);
};

export const postToMongo = async (client, collection, body) => {
  const db = client.db("events_nextjs");
  await db.collection(collection).insertOne(body);
}

/**
 * @param {client} Client object
 * @param {string} Collection string
 * @param {Object} Query object | (Optional)
 * @param {Object} Sort object | (Optional)
 * @returns {Array<Object>} Documents | array of objects 
 */
export const getFromMongo = async (client, collection, query = null, sort = null) => {
  const db = client.db("events_nextjs");
  const coll = await db.collection(collection);
  const comments = await coll.find(query).sort(sort).limit(10).toArray();
  return comments;
}