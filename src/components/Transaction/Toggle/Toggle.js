import React, { Component } from "react";
import classes from "./Toggle.module.css";
class Toggle extends Component {
  render() {
    let extension = null;

    if (this.props.index === 0 && this.props.toggle) {
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
    if (this.props.isEditable && this.props.toggle) {
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

    if (
      this.props.index !== 0 &&
      this.props.toggle &&
      this.props.isEditable === false
    ) {
      extension = (
        <div className={classes.Input}>
          <p>Bill shared with {this.props.shareWith}</p>
        </div>
      );
    }

    let shareBill = null;

    if (this.props.index === 0 || this.props.isEditable) {
      shareBill = (
        <div className={classes.SharedBill}>
          <span>Share bill</span>
          <button onClick={this.props.toggleSwitch}>Toggle Button</button>
        </div>
      );
    }

    return (
      <React.Fragment>
        {shareBill}
        {extension}
      </React.Fragment>
    );
  }
}

export default Toggle;
