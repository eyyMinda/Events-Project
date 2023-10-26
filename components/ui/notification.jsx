import css from "./notification.module.css";

import { useContext } from "react";
import NotificationContext from "@/store/notification-context";

function Notification(props) {
  const notifCtx = useContext(NotificationContext);
  const { title, message, status } = props;

  return (
    <div
      className={`${css.notification} ${css[status]}`}
      onClick={() => notifCtx.toggleNotification(null)}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
