import React, { Component } from "react";
import classes from "./EditButton.module.css";

class EditButton extends Component {
  render() {
    const editArr = this.props.contributorIsEditable ? [classes.Accept] : [];
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
        <button
          onClick={() =>
            this.props.onEditContributor(
              this.props.index,
              this.props.contributorIndex
            )
          }
          className={editArr.join(" ")}
        >
          {editStr}
        </button>
      );
    }
    return <React.Fragment>{editButton}</React.Fragment>;
  }
}

export default EditButton;
