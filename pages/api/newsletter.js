import { isValid } from "@/helpers/authValidation";
import { connectToMongo } from "@/helpers/mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const [emailErr, emailMsg] = isValid.email(email);

    if (emailErr) {
      res.status(422).json({ err: emailErr, msg: emailMsg });
      return;
    }

    try {
      const client = await connectToMongo();
      const db = client.db("events_nextjs");
      await db.collection("newsletter_emails").insertOne({ email });
    } catch (e) {
      console.error(e);
    }

    res.status(201).json({ err: emailErr, msg: "You've succesfully signed-up to receive our newsletter!" });
  }
}