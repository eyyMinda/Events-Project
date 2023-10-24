import { isValid } from "@/helpers/authValidation";
import { connectToMongo } from "@/helpers/mongodb";
import { tryCatch } from "@/helpers/utility";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    let response = { err: false, msg: "You've succesfully signed-up to receive our newsletter!" };
    let client;

    const [emailErr, emailMsg] = isValid.email(email);
    if (emailErr) {
      response = { err: emailErr, msg: emailMsg };
      return res.status(422).json(response);
    }

    response = await tryCatch(async () => {
      client = await connectToMongo();
    }, "Failed to connect to the database", response);
    if (response.err) return res.status(500).json(response);

    response = await tryCatch(async () => {
      const db = client.db("events_nextjs");
      await db.collection("newsletter_emails").insertOne({ email });
    }, "Failed to sign you up due to wrong communication with database", response);
    if (response.err) return res.status(500).json(response);

    res.status(201).json(response);
  }
}