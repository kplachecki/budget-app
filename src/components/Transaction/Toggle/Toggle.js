import React, { Component } from "react";
import classes from "./Toggle.module.css";
class Toggle extends Component {
  render() {
    let shareBill = null;

    if (this.props.index === 0 || this.props.isEditable) {
      shareBill = (
        <div className={classes.SharedBill}>
          <span>Share bill</span>
          <button onClick={this.props.toggleSwitch}>Toggle Button</button>
        </div>
      );
    }

    return <React.Fragment>{shareBill}</React.Fragment>;
  }
}

export default Toggle;
