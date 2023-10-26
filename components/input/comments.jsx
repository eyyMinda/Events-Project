import css from "./styles/comments.module.css";

import { useContext, useEffect, useState } from "react";
import NotificationContext from "@/store/notification-context";
import CommentList from "./comment-list";
import NewComment from "./new-comment";

export default function Comments({ eventId }) {
  const notifCtx = useContext(NotificationContext);
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [addCommentState, setAddCommentState] = useState(false);

  //================== GET =====================
  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then(res => res.json())
        .then(data => setComments(data.comments));
    }
  }, [showComments, eventId, addCommentState]);

  //================== POST =====================
  function handlePostComment(commentData) {
    notifCtx.toggleNotification({
      title: "Posting...",
      message: "Posting a comment...",
      status: "pending",
    });

    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
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
                message: msg || "Successfully commented!",
                status: "success",
              }
        );
        setAddCommentState(!err);
      });
  }

  return (
    <section className={css.comments}>
      <button type="button" onClick={() => setShowComments(prev => !prev)}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <>
          <NewComment onAddComment={handlePostComment} />
          <CommentList comments={comments} />
        </>
      )}
    </section>
  );
}
