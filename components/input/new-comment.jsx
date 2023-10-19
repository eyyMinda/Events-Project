import css from "./styles/new-comment.module.css";
import { useRef, useState } from "react";

export default function NewComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  function sendCommentHandler(e) {
    e.preventDefault();
    const input = {
      email: emailInputRef.current.value,
      name: nameInputRef.current.value,
      text: commentInputRef.current.value,
    };

    const isInvalidInput = value => !value || value.trim() === "";
    if (
      Object.values(input).some(isInvalidInput) ||
      !input.email.includes("@")
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment(input);
  }

  return (
    <form className={css.form} onSubmit={sendCommentHandler}>
      <div className={css.row}>
        <div className={css.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={css.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={css.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows="5" ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button>Submit</button>
    </form>
  );
}
