import React, { Component } from "react";
import Contributor from "./Contributor/Contributor";

class Contributors extends Component {
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.toggle || this.props.toggle) {
  //     return true;
  //   } else if (this.props.isEditable) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // componentWillUpdate() {
  //   console.log("update", this.props.index);
  // }
  render() {
    const currentContributors = [...this.props.transactionContributors];
    const contributors = currentContributors.map(
      (contributor, contributorIndex) => {
        contributor.key = contributorIndex;
        return (
          <Contributor
            contributors={currentContributors}
            name={contributor.name}
            value={contributor.value}
            defaultValue={contributor.defaultValue}
            key={"contributor " + contributorIndex}
            contributorIndex={contributorIndex}
            index={this.props.index}
            shareWith={this.props.shareWith}
            inputChanged={this.props.inputChanged}
            isEditable={this.props.isEditable}
            toggle={this.props.toggle}
            isReturned={contributor.isReturned}
            splitOption={this.props.splitOption}
            onInputContributor={this.props.onInputContributor}
            onAddContributor={this.props.onAddContributor}
            contributorIsEditable={contributor.contributorIsEditable}
            onEditContributor={this.props.onEditContributor}
            onReturnedContributor={this.props.onReturnedContributor}
            onDeleteContributor={this.props.onDeleteContributor}
          />
        );
      }
    );
    return contributors;
  }
}

export default Contributors;
