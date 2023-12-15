import React from "react";
function Alert(color, message) {
  if (!message) return true;
  var type;
  switch (color) {
    case 1:
      type = "primary";
      break;
    case 200:
      type = "success";
      break;
    case 400:
      type = "danger";
      break;
    case 4:
      type = "warning";
      break;
    case 5:
      type = "info";
      break;
    default:
      break;
  }
  return {
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
}

export default Alert;
// TODO CHECK THIS FUNCTION

// import React, { useEffect, useState } from "react";

// const Notification = ({ color, message, notificationAlertRef }) => {
//   useEffect(() => {
//     if (!message || !notificationAlertRef?.current) return;

//     let type;
//     switch (color) {
//       case "primary":
//         type = "primary";
//         break;
//       case "success":
//         type = "success";
//         break;
//       case "danger":
//         type = "danger";
//         break;
//       case "warning":
//         type = "warning";
//         break;
//       case "info":
//         type = "info";
//         break;
//       default:
//         type = "info";
//         break;
//     }

//     const options = {
//       place: "tr",
//       message: (
//         <div>
//           <div>{message}</div>
//         </div>
//       ),
//       type: type,
//       icon: "tim-icons icon-bell-55",
//       autoDismiss: 7,
//     };

//     notificationAlertRef.current.notificationAlert(options);
//   }, [message, color, notificationAlertRef]);

//   return null;
// };

// export default Notification;
