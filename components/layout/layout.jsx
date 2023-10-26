import { Fragment, useContext } from "react";
import MainHeader from "./mainHeader";
import Notification from "../ui/notification";
import NotificationContext from "@/store/notification-context";

export default function Layout(props) {
  const notifCtx = useContext(NotificationContext);
  const activeNotif = notifCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>

      {activeNotif && (
        <Notification
          title={activeNotif.title}
          message={activeNotif.message}
          status={activeNotif.status}
        />
      )}
    </Fragment>
  );
}
