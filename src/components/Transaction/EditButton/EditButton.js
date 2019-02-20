import React, { Component } from "react";
import classes from "./EditButton.module.css";

class EditButton extends Component {
  render() {
    const editArr = this.props.isEditable ? [classes.Accept] : [];
    const editStr = this.props.isEditable ? "accept" : "edit";
    // let editStr = "edit";
    // if (this.props.isEditable) {
    //   editArr.push(classes.Accept);
    //   editStr = "accept";
    // }

    let editButton = null;
    if (this.props.index !== 0) {
      editButton = (
        <button onClick={this.props.onEdit} className={editArr.join(" ")}>
          {editStr}
        </button>
      );
    }
    return <React.Fragment>{editButton}</React.Fragment>;
  }
}

export default EditButton;
