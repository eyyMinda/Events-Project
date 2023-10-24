import { isValid } from "@/helpers/authValidation";
import { MongoClient, ServerApiVersion } from "mongodb";

const mongoUri = process.env.NEXT_PUBLIC_MONGO_URL;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const [emailErr, emailMsg] = isValid.email(email);

    if (emailErr) {
      res.status(422).json({ err: emailErr, msg: emailMsg });
      return;
    }

    const client = new MongoClient(mongoUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
    async function run() {
      try {
        await client.connect();
        const db = client.db("events_nextjs");
        await db.collection("newsletter_emails").insertOne({ email });
      } finally { await client.close(); }
    }
    run().catch(console.dir);


    res.status(201).json({ err: emailErr, msg: "You've succesfully signed-up to receive our newsletter!" });
  }
}