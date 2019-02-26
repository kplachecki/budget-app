import React, { Component } from "react";
import classes from "./DeleteButton.module.css";

class DeleteButton extends Component {
  render() {
    let deleteButton = null;
    if (this.props.contributorIndex !== 0) {
      deleteButton = (
        <button
          onClick={() =>
            this.props.onDeleteContributor(
              this.props.index,
              this.props.contributorIndex
            )
          }
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
