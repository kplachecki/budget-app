import React, { Component } from "react";
import classes from "./Toggle.module.css";
import { Switch } from "antd";
class Toggle extends Component {
  render() {
    let shareBill = null;

    if (this.props.index === 0 || this.props.isEditable) {
      shareBill = (
        <div className={classes.SharedBill}>
          <span>Share bill</span>
          <Switch
            onClick={this.props.toggleSwitch}
            checked={this.props.toggle}
            disabled={!this.props.inputValid}
          />
        </div>
      );
    }

    return <React.Fragment>{shareBill}</React.Fragment>;
  }
}

export default Toggle;
