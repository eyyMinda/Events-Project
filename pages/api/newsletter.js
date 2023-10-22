import { isValid } from "@/helpers/authValidation";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const [emailErr, emailMsg] = isValid.email(email);

    if (emailErr) {
      res.status(422).json({ err: emailErr, msg: emailMsg });
      return;
    }

    res.status(200).json({ err: emailErr, msg: "You've succesfully signed-up to receive our newsletter!" });
  }
}