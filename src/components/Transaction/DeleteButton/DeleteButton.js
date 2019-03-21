import React, { Component } from "react";
import classes from "./DeleteButton.module.css";
import { Icon, Popconfirm } from "antd";

class DeleteButton extends Component {
  render() {
    let deleteButton = null;
    if (this.props.index !== 0) {
      deleteButton = (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={this.props.deleteTransaction}
          placement="topRight"
          arrowPointAtCenter
        >
          <Icon
            type="close-circle"
            theme="twoTone"
            twoToneColor="red"
            className={classes.DeleteButton}
          />
        </Popconfirm>
      );
    }
    return <React.Fragment>{deleteButton}</React.Fragment>;
  }
}

export default DeleteButton;
