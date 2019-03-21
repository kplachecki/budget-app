import React, { Component } from "react";
import { Icon, Popconfirm } from "antd";

class DeleteButton extends Component {
  render() {
    let deleteButton = null;
    if (this.props.contributorIndex !== 0 && this.props.toggle) {
      deleteButton = (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() =>
            this.props.onDeleteContributor(
              this.props.index,
              this.props.contributorIndex
            )
          }
          placement="topRight"
          arrowPointAtCenter
        >
          <Icon type="delete" theme="twoTone" twoToneColor="red" />
        </Popconfirm>
      );
    }
    return <React.Fragment>{deleteButton}</React.Fragment>;
  }
}

export default DeleteButton;
