import React, { Component } from "react";

import { Switch } from "antd";

class ReturnedButton extends Component {
  render() {
    const returnedCol = this.props.isReturned ? "#52c41a" : "red";
    const returnedStr = this.props.isReturned ? "Returned" : "Pending";

    let returnedButton = null;
    if (
      this.props.contributorIndex !== 0 &&
      this.props.toggle &&
      this.props.index !== 0
    ) {
      returnedButton = (
        <Switch
          onClick={() =>
            this.props.onReturnedContributor(
              this.props.index,
              this.props.contributorIndex
            )
          }
          checkedChildren={returnedStr}
          unCheckedChildren={returnedStr}
          disabled={this.props.isReturned}
          style={{ backgroundColor: returnedCol }}
        />
      );
    }
    return returnedButton;
  }
}

export default ReturnedButton;
