import css from "./styles/new-comment.module.css";
import { useRef, useState } from "react";

export default function NewComment({ onAddComment, inputRes }) {
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  function handleSendComment(e) {
    e.preventDefault();
    const input = {
      email: emailInputRef.current.value,
      name: nameInputRef.current.value,
      text: commentInputRef.current.value,
    };

    onAddComment(input);
  }

  return (
    <form className={css.form} onSubmit={handleSendComment}>
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
      <button>Submit</button>

      {inputRes && (
        <ol className={css[inputRes[0] ? "error" : "success"]}>
          {inputRes[1]}
          {inputRes[1]?.map((msg, i) => {
            <li key={i}>{msg}</li>;
          })}
        </ol>
      )}
    </form>
  );
}
