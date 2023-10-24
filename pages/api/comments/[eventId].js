import { DUMMY_COMMENTS } from "@/dummy-data";
import { isValid } from "@/helpers/authValidation";

export default function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    // Input Validation
    const inputs = [
      { value: name, validator: isValid.name },
      { value: email, validator: isValid.email },
      { value: text, validator: isValid.text },
    ];

    const errors = inputs.reduce((accumulatedErrors, input) => {
      const [err, msg] = input.validator(input.value);
      if (err) accumulatedErrors.push(msg);
      return accumulatedErrors;
    }, []);
    const invalid = errors.length > 0;

    // Push to DB
    if (!invalid) {
      const newComment = {
        id: new Date().toISOString(),
        email, name, text
      };
    }

    // Response
    const response = {
      err: invalid,
      msg: invalid ? errors : ['Your Comment has been submitted!']
    };

    res.status(invalid ? 422 : 201).json(response);
    return;
  }

  if (req.method === 'GET') {
    res.status(201).json({ comments: DUMMY_COMMENTS });
    return;
  }

  res.status(200).json({ err: false, msg: "success on 'comments'" });
}