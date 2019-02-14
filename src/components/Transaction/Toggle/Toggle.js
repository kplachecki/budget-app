import React, { Component } from "react";
import classes from "./Toggle.module.css";
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
      <React.Fragment>
        <div className={classes.SharedBill}>
          <span>Shared bill</span>
          <button onClick={this.props.toggleSwitch}>Toggle Button</button>
        </div>
        {extension}
      </React.Fragment>
    );
  }
}

export default Toggle;
