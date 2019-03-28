import React from "react";
import Contributor from "./Contributor/Contributor";

const Contributors = props => {
  const currentContributors = [...props.transactionContributors];
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
          index={props.index}
          shareWith={props.shareWith}
          inputChanged={props.inputChanged}
          isEditable={props.isEditable}
          toggle={props.toggle}
          isReturned={contributor.isReturned}
          splitOption={props.splitOption}
          onInputContributor={props.onInputContributor}
          onAddContributor={props.onAddContributor}
          contributorIsEditable={contributor.contributorIsEditable}
          onEditContributor={props.onEditContributor}
          onReturnedContributor={props.onReturnedContributor}
          onDeleteContributor={props.onDeleteContributor}
        />
      );
    }
  );
  return contributors;
};

export default Contributors;
