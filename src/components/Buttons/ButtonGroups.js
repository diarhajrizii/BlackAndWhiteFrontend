// ButtonGroupComponent.js
import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import classNames from "classnames";

function ButtonGroupComponent({ activeButton, onButtonClick, buttons }) {
  return (
    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
      {buttons.map((button) => (
        <Button
          key={button}
          tag="label"
          color="info"
          size="sm"
          className={classNames("btn-simple", {
            active: activeButton === button,
          })}
          onClick={() => onButtonClick(button)}
        >
          {button.charAt(0).toUpperCase() + button.slice(1)}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default ButtonGroupComponent;
