import { connectToMongo } from "@/helpers/mongodb";
import { isValid } from "@/helpers/authValidation";
import { getCurrentDate, tryCatch, validateMultipleInputs } from "@/helpers/utility";

export default async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;

  // ============================ POST ================================
  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    let response = { err: false, msg: ['Your Comment has been submitted!'] };

    // Input Validation   
    const errors = validateMultipleInputs([name, email, text], [isValid.name, isValid.email, isValid.text]);
    if (errors.length > 0) {
      response = { err: errors.length > 0, msg: errors };
      if (response.err) res.status(422).json(response);
    }

    // Push to DB
    let newComment;
    newComment = { email, name, text, eventId, dateAdded: getCurrentDate() };

    response = await tryCatch(async () => {
      client = await connectToMongo();
    }, ["Failed to connect to the database"], response);
    if (response.err) return res.status(500).json(response);

    response = await tryCatch(async () => {
      const db = client.db("events_nextjs");
      await db.collection("comments").insertOne(newComment);
    }, ["Failed to sign you up due to wrong communication with database"], response);
    if (response.err) return res.status(500).json(response);


    return res.status(201).json(response);
  }
  // ============================ GET ================================
  if (req.method === 'GET') {
    let comments;

    let response = await tryCatch(async () => {
      client = await connectToMongo();
    }, ["Failed to connect to the database"]);
    if (response) return res.status(500).json(response);

    response = await tryCatch(async () => {
      const db = client.db("events_nextjs");
      const collection = await db.collection("comments");
      comments = await collection.find({ eventId: eventId }).sort({ dateAdded: -1 }).limit(10).toArray();
    }, ["Failed to sign you up due to wrong communication with database"]);
    if (response) return res.status(500).json(response);

    return res.status(201).json({ comments });
  }

  res.status(200).json({ err: false, msg: "'comments' api route" });
}