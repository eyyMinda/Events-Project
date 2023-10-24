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