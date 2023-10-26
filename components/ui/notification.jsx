import css from "./notification.module.css";

import NotificationContext from "@/store/notification-context";
import { useContext } from "react";

function Notification(props) {
  const notificationCtx = useContext(NotificationContext);
  const { title, message, status } = props;

  return (
    <div
      className={`${css.notification} ${css[status]}`}
      onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
