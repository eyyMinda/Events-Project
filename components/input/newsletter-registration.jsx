import NotificationContext from "@/store/notification-context";
import css from "./styles/newsletter-registration.module.css";
import { useContext, useRef } from "react";

export default function NewsletterRegistration() {
  const emailRef = useRef();
  const notifCtx = useContext(NotificationContext);

  function handleRegister(e) {
    e.preventDefault();
    const email = emailRef.current.value;

    notifCtx.toggleNotification({
      title: "Signing up...",
      message: "Registering for newsletter...",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        const { err, msg } = data;
        notifCtx.toggleNotification(
          err
            ? {
                title: "Failed!",
                message: msg || "Something went wrong!",
                status: "error",
              }
            : {
                title: "Success!",
                message: msg || "Successfully registered for our newsletter!",
                status: "success",
              }
        );
      });
  }

  return (
    <section className={css.newsletter}>
      <h2>Sign up to stay updated!</h2>

      <form onSubmit={handleRegister}>
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
