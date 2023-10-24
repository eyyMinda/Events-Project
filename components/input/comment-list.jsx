import css from "./styles/comment-list.module.css";

export default function CommentList({ comments }) {
  return (
    <ul className={css.comments}>
      {comments.length > 0 &&
        comments.map(comment => (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <div>
              <span className={css.date}>{comment.dateAdded.slice(0, -3)}</span>
              <span>
                By <address>{comment.name}</address>
              </span>
            </div>
          </li>
        ))}
    </ul>
  );
}
