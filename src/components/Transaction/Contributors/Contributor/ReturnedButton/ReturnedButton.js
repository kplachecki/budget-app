import React, { Component } from "react";
import classes from "./ReturnedButton.module.css";
import { Switch, Icon } from "antd";

class ReturnedButton extends Component {
  render() {
    const returnedCol = this.props.isReturned ? "#52c41a" : "red";
    const returnedStr = this.props.isReturned ? "Returned" : "Not Returned";

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
    return <React.Fragment>{returnedButton}</React.Fragment>;
  }
}

export default ReturnedButton;
