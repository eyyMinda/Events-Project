import { connectToMongo } from "@/lib/mongodb";
import { getFromMongo, postToMongo, responseReturn } from "@/helpers/db-utility";
import { getCurrentDate, validateMultipleInputs } from "@/helpers/utility";

export default async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  if (req.method === 'POST' || req.method === 'GET') {
    try {
      client = await connectToMongo();
    } catch {
      return responseReturn(res, 500, ["Failed to connect to the database"]);
    }
  }

  // ============================ POST ================================
  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    // Input Validation   
    const errors = validateMultipleInputs([name, email, text], ["name", "email", "text"]);
    if (errors.length > 0) return responseReturn(res, 422, errors);

    // Push to DB
    const newComment = { email, name, text, eventId, dateAdded: getCurrentDate() };
    try {
      await postToMongo(client, "comments", newComment);
    } catch {
      return responseReturn(res, 500, ["Failed to add a comment due to wrong communication with database"]);
    }

    return responseReturn(res, 201, ['Your Comment has been submitted!']);
  }

  // ============================ GET ================================
  if (req.method === 'GET') {
    try {
      const comments = await getFromMongo(client, "comments", { eventId: eventId }, { dateAdded: -1 });
      return responseReturn(res, 201, { comments });
    } catch {
      return responseReturn(res, 500, ["Failed to fetch comments due to wrong communication with database"]);
    }
  }

  return responseReturn(res, 200, ["'comments' api route"]);
}