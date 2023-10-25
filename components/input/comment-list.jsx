import { Fragment } from "react";
import css from "./styles/comment-list.module.css";

export default function CommentList({ comments }) {
  return (
    <Fragment>
      {comments &&
        (comments?.length > 0 ? (
          <h2 className={css.notice}>{comments.length} Comments</h2>
        ) : (
          <h2 className={css.notice}>No Comments</h2>
        ))}

      <ul className={css.comments}>
        {!comments
          ? [1, 2, 3, 4, 5].map(comment => (
              <li key={comment}>
                <p className={`${css.skeleton} ${css.skeleton_text}`}></p>
                <p className={`${css.skeleton} ${css.skeleton_text}`}></p>
                <p className={`${css.skeleton} ${css.skeleton_text}`}></p>
                <div>
                  <span
                    className={`${css.date} ${css.skeleton} ${css.skeleton_text_short}`}></span>
                  <span
                    className={`${css.skeleton} ${css.skeleton_text_short}`}>
                    {" "}
                  </span>
                </div>
              </li>
            ))
          : comments.length > 0 &&
            comments.map(comment => (
              <li key={comment._id}>
                <p>{comment.text}</p>
                <div>
                  <span className={css.date}>
                    {comment.dateAdded.slice(0, -3)}
                  </span>
                  <span>
                    By <address>{comment.name}</address>
                  </span>
                </div>
              </li>
            ))}
      </ul>
    </Fragment>
  );
}
