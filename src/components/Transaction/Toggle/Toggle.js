import React, { Component } from "react";
import classes from "./Toggle.module.css";
import Aux from "../../../hoc/_Aux";
class Toggle extends Component {
  render() {
    let extension = null;

    if (this.props.toggle) {
      extension = (
        <div className={classes.Input}>
          <input
            name="shareWithInput"
            placeholder="Shared with"
            value={this.props.shareWith}
            onChange={this.props.inputChanged}
          />
        </div>
      );
    }
    return (
      <Aux>
        <div className={classes.SharedBill}>
          <span>Shared bill</span>
          <button onClick={this.props.toggleSwitch}>Toggle Button</button>
        </div>
        {extension}
      </Aux>
    );
  }
}

export default Toggle;
