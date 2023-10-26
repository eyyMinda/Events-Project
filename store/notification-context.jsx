import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  toggleNotification: function (data) {},
});

export function NotificationContextProvider(props) {
  const [activeNotif, setActiveNotif] = useState();
  const handleToggleNotif = data => setActiveNotif(data || null);

  // Set timer for notification to dissapear after
  useEffect(() => {
    if (
      activeNotif &&
      (activeNotif.status === "success" || activeNotif.status === "error")
    ) {
      const timer = setTimeout(() => setActiveNotif(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [activeNotif]);

  const context = {
    notification: activeNotif,
    toggleNotification: handleToggleNotif,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
