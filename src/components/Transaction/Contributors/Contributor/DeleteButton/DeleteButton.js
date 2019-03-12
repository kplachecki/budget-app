import React, { Component } from "react";
import classes from "./DeleteButton.module.css";
import { Icon } from "antd";

class DeleteButton extends Component {
  render() {
    let deleteButton = null;
    if (this.props.contributorIndex !== 0 && this.props.toggle) {
      deleteButton = (
        <Icon
          type="delete"
          theme="twoTone"
          twoToneColor="red"
          onClick={() =>
            this.props.onDeleteContributor(
              this.props.index,
              this.props.contributorIndex
            )
          }
          // className={classes.Delete}
        />
      );
    }
    return <React.Fragment>{deleteButton}</React.Fragment>;
  }
}

export default DeleteButton;
