import { connectToMongo } from "@/helpers/mongodb";
import { isValid } from "@/helpers/authValidation";
import { getCurrentDate, validateMultipleInputs } from "@/helpers/utility";

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  // ============================ POST ================================
  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    // Input Validation   
    const errors = validateMultipleInputs([name, email, text], [isValid.name, isValid.email, isValid.text]);
    const invalid = errors.length > 0;

    // Push to DB
    let newComment;
    if (!invalid) {
      newComment = { email, name, text, eventId, dateAdded: getCurrentDate() };
      try {
        const client = await connectToMongo();
        const db = client.db("events_nextjs");
        await db.collection("comments").insertOne(newComment);
      } catch (e) {
        console.error(e);
      }
    }

    // Response
    const response = {
      err: invalid,
      msg: invalid ? errors : ['Your Comment has been submitted!']
    };

    res.status(invalid ? 422 : 201).json(response);
    return;
  }
  // ============================ GET ================================
  if (req.method === 'GET') {
    let comments;
    try {
      const client = await connectToMongo();
      const db = client.db("events_nextjs");
      const collection = await db.collection("comments");
      comments = collection.find({ eventId: eventId }).sort({ dateAdded: -1 }).limit(10).toArray();
    } catch (e) {
      console.error(e);
    }

    console.log('/api/: ', comments);
    res.status(201).json({ comments });
    return;
  }

  res.status(200).json({ err: false, msg: "'comments' api route" });
}