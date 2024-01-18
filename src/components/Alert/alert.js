// NotificationComponent.js
import React from "react";
import NotificationAlert from "react-notification-alert";

class NotificationComponent extends React.Component {
  notificationAlert = React.createRef();

  showNotification = (message, type) => {
    const options = {
      place: "tr",
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    this.notificationAlert.current.notificationAlert(options);
  };

  render() {
    return (
      <div className="react-notification-alert-container">
        <NotificationAlert ref={this.notificationAlert} />
      </div>
    );
  }
}

export default NotificationComponent;
