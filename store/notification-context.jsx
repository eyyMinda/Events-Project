import { createContext, useState } from "react";

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  toggleNotification: function (data) {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();
  const handleToggleNotification = data => setActiveNotification(data || null);

  const context = {
    notification: activeNotification,
    toggleNotification: handleToggleNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
