import React, { Component } from "react";
import classes from "./DeleteButton.module.css";
import { Icon } from "antd";

class DeleteButton extends Component {
  render() {
    let deleteButton = null;
    if (this.props.index !== 0) {
      deleteButton = (
        <Icon
          type="close-circle"
          theme="twoTone"
          twoToneColor="red"
          onClick={this.props.deleteTransaction}
          className={classes.DeleteButton}
        />
      );
    }
    return <React.Fragment>{deleteButton}</React.Fragment>;
  }
}

export default DeleteButton;
