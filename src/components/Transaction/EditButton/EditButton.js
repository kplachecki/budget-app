import React, { Component } from "react";
import classes from "./EditButton.module.css";
import { Icon } from "antd";

class EditButton extends Component {
  render() {
    // const editArr = this.props.isEditable ? [classes.Accept] : [];
    // const editStr = this.props.isEditable ? "accept" : "edit";

    let editButton = null;
    if (this.props.index !== 0) {
      editButton = (
        <Icon
          type="edit"
          theme="twoTone"
          onClick={this.props.onEdit}
          className={classes.EditButton}
        />
      );
    }
    if (this.props.isEditable && this.props.index !== 0) {
      editButton = (
        <Icon
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
          onClick={this.props.onEdit}
          className={classes.EditButton}
        />
      );
    }

    return <React.Fragment>{editButton}</React.Fragment>;
  }
}

export default EditButton;
