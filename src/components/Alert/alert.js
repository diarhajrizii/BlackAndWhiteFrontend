import React, { useEffect } from "react";
import NotificationAlert from "react-notification-alert";

function Alert() {
  const notificationAlertRef = React.useRef(null);

  useEffect(() => {
    // Simulating a message received from backend
    const messageFromBackend = {
      type: "success",
      place: "tc",
      content: "This is a message from the backend!",
    };

    // Trigger the alert/notification
    alertFromBackend(
      messageFromBackend.type,
      messageFromBackend.place,
      messageFromBackend.content
    );
  }, []);

  const alertFromBackend = (type, place, content) => {
    const options = {
      place: place,
      message: (
        <div>
          <div>{content}</div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };

    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <>
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        {/* Other components and layout */}
      </div>
    </>
  );
}

export default Alert;
