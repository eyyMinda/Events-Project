import { connectToMongo } from "@/lib/mongodb";
import { postToMongo, responseReturn } from "@/helpers/db-utility";
import { isValid } from "@/helpers/authValidation";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    let client;

    const [emailErr, emailMsg] = isValid.email(email);
    if (emailErr) return responseReturn(res, 422, emailMsg);

    try {
      client = await connectToMongo();
    } catch {
      return responseReturn(res, 500, "Failed to connect to the database");
    }

    try {
      await postToMongo(client, "newsletter_emails", { email });
    } catch {
      return responseReturn(res, 500, "Failed to sign you up due to wrong communication with database");
    }

    return responseReturn(res, 201, "You've succesfully signed-up to receive our newsletter!");
  }
}