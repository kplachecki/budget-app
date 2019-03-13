import React, { Component } from "react";
import classes from "./EditButton.module.css";
import { Icon } from "antd";

class EditButton extends Component {
  render() {
    const editStr = this.props.contributorIsEditable ? "accept" : "edit";
    // let editStr = "edit";
    // const editArr = [];
    // if (this.props.contributorIsEditable) {
    //   editArr.push(classes.Accept);
    //   editStr = "accept";
    // }

    let editButton = null;
    if (
      this.props.contributorIndex !== 0 &&
      this.props.isEditable &&
      this.props.toggle &&
      this.props.isReturned === false
    ) {
      editButton = (
        <Icon
          type="edit"
          theme="twoTone"
          onClick={() =>
            this.props.onEditContributor(
              this.props.index,
              this.props.contributorIndex
            )
          }
          // className={editArr.join(" ")}
        />
      );
    }
    if (this.props.contributorIsEditable && this.props.contributorIndex !== 0) {
      editButton = (
        <Icon
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
          onClick={() =>
            this.props.onEditContributor(
              this.props.index,
              this.props.contributorIndex
            )
          }
          // className={editArr.join(" ")}
        />
      );
    }
    return <React.Fragment>{editButton}</React.Fragment>;
  }
}

export default EditButton;
