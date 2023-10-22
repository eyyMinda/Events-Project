import css from "./styles/newsletter-registration.module.css";
import { isValid } from "@/helpers/authValidation";
import { useRef, useState } from "react";

export default function NewsletterRegistration() {
  const [inputResponse, setInputResponse] = useState([]);
  const emailRef = useRef();

  function registrationHandler(e) {
    e.preventDefault();
    const email = emailRef.current.value;

    const options = {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/newsletter", options)
      .then(res => res.json())
      .then(data => {
        const { err, msg } = data;
        if (msg !== inputResponse[1]) setInputResponse([err, msg]); // Validation res from the server
      });
  }

  return (
    <section className={css.newsletter}>
      <h2>Sign up to stay updated!</h2>
      {inputResponse && (
        <h3 className={css[inputResponse[0] ? "error" : "success"]}>
          {inputResponse[1]}
        </h3>
      )}
      <form onSubmit={registrationHandler}>
        <div className={css.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
