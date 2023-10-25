import css from "./styles/new-comment.module.css";
import { useRef, useState } from "react";

export default function NewComment({ onAddComment, inputRes }) {
  const [commentState, setCommentState] = useState(false);
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  function handleCommentFocus(e) {
    e.target.placeholder = "";
    !commentState && setCommentState(true);
  }
  function handleCancelFocus() {
    commentInputRef.current.placeholder = "Add a comment...";
    commentState && setCommentState(false);
  }

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
      {commentState && (
        <div className={css.row}>
          <div className={css.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div className={css.control}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={nameInputRef} required />
          </div>
        </div>
      )}
      <div className={css.control}>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          rows="1"
          onFocus={handleCommentFocus}
          ref={commentInputRef}
          placeholder="Add a comment..."
          required></textarea>
      </div>
      {commentState && (
        <>
          <button
            type="button"
            className={css.cancel_btn}
            onClick={handleCancelFocus}>
            Cancel
          </button>{" "}
          <button type="submit">Submit</button>
        </>
      )}

      {commentState && inputRes && (
        <ul className={css[inputRes[0] ? "error" : "success"]}>
          {inputRes[1]?.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
