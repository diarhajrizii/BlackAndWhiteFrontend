import React from "react";
function Alert(place, color, message) {
  var type;
  switch (color) {
    case 404:
      type = "primary";
      break;
    case 200:
      type = "success";
      break;
    case 3:
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
    place: place,
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
