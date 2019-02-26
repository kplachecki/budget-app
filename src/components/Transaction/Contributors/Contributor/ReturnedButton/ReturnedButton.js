import React, { Component } from "react";
import classes from "./ReturnedButton.module.css";

class ReturnedButton extends Component {
  render() {
    const returnedArr = this.props.isReturned ? [classes.Returned] : [];
    const returnedStr = this.props.isReturned ? "Returned" : "Not Returned";

    let returnedButton = null;
    if (this.props.contributorIndex !== 0 && this.props.toggle) {
      returnedButton = (
        <button
          onClick={() =>
            this.props.onReturnedContributor(
              this.props.index,
              this.props.contributorIndex
            )
          }
          className={returnedArr.join(" ")}
        >
          {returnedStr}
        </button>
      );
    }
    return <React.Fragment>{returnedButton}</React.Fragment>;
  }
}

export default ReturnedButton;