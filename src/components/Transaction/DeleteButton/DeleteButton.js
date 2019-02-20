import React, { Component } from "react";
import classes from "./DeleteButton.module.css";

class DeleteButton extends Component {
  render() {
    let deleteButton = null;
    if (this.props.index !== 0) {
      deleteButton = (
        <button
          onClick={this.props.deleteTransaction}
          className={classes.Delete}
        >
          delete
        </button>
      );
    }
    return <React.Fragment>{deleteButton}</React.Fragment>;
  }
}

export default DeleteButton;
