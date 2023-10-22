import css from "./styles/comments.module.css";

import { useEffect, useState } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";

export default function Comments({ eventId }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [inputResponse, setInputResonse] = useState([]);

  //================== GET =====================
  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then(res => res.json())
        .then(data => setComments(data.comments));
    }
  }, [showComments, eventId]);

  //================== POST =====================
  function handlePostComment(commentData) {
    const options = {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    };
    // send data to API
    fetch(`/api/comments/${eventId}`, options)
      .then(res => res.json())
      .then(data => {
        const { err, msg } = data;
        if (msg !== inputResponse[1]) setInputResonse([err, msg]);
      });
  }

  return (
    <section className={css.comments}>
      <button onClick={() => setShowComments(prev => !prev)}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <>
          <NewComment
            onAddComment={handlePostComment}
            inputRes={inputResponse}
          />
          <CommentList comments={comments} />
        </>
      )}
    </section>
  );
}
