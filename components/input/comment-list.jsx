import css from "./styles/comment-list.module.css";

export default function CommentList({ comments }) {
  return (
    <ul className={css.comments}>
      {comments.map(comment => (
        <li key={comment.id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}
