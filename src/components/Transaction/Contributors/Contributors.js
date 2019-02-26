import React from "react";
import Contributor from "./Contributor/Contributor";

const Contributors = props => {
  const currentContributors = [...props.transactionContributors];
  console.log(currentContributors);
  const contributors = currentContributors.map(
    (contributor, contributorIndex) => {
      return (
        <Contributor
          name={contributor.name}
          value={contributor.value}
          defaultValue={contributor.defaultValue}
          key={"contributor " + contributorIndex}
          contributorIndex={contributorIndex}
          index={props.index}
          shareWith={props.shareWith}
          inputChanged={props.inputChanged}
          isEditable={props.isEditable}
          toggle={props.toggle}
          onInputContributor={props.onInputContributor}
          onAddContributor={props.onAddContributor}
          contributorIsEditable={contributor.contributorIsEditable}
          onEditContributor={props.onEditContributor}
          onReturnedContributor={props.onReturnedContributor}
          isReturned={contributor.isReturned}
          onDeleteContributor={props.onDeleteContributor}
        />
      );
    }
  );
  return contributors;
};

export default Contributors;
