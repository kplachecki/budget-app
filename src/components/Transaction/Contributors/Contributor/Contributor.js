import React, { Component } from "react";
import classes from "./Contributor.module.css";
import EditButton from "./EditButton/EditButton";
import ReturnedButton from "./ReturnedButton/ReturnedButton";
import DeleteButton from "./DeleteButton/DeleteButton";

class Contributor extends Component {
  render() {
    let addButton = null;

    if (this.props.contributorIndex === 0) {
      addButton = (
        <button onClick={() => this.props.onAddContributor(this.props.index)}>
          Add
        </button>
      );
    }
    let extension = null;

    if (
      this.props.toggle &&
      this.props.isEditable &&
      (this.props.contributorIndex === 0 || this.props.contributorIsEditable)
    ) {
      extension = (
        <div className={classes.ContributorInput}>
          <input
            name="shareWithInput"
            placeholder="Shared with"
            value={this.props.name}
            onChange={event =>
              this.props.onInputContributor(
                event,
                this.props.index,
                this.props.contributorIndex
              )
            }
            className={classes.Input}
          />
          {addButton}
        </div>
      );
    }

    if (
      this.props.contributorIndex !== 0 &&
      this.props.toggle &&
      this.props.contributorIsEditable === false
    ) {
      extension = <p>Bill shared with {this.props.name} </p>;
    }

    return (
      <React.Fragment>
        {extension}
        <EditButton
          contributorIsEditable={this.props.contributorIsEditable}
          contributorIndex={this.props.contributorIndex}
          onEditContributor={this.props.onEditContributor}
          index={this.props.index}
          isEditable={this.props.isEditable}
          toggle={this.props.toggle}
        />
        <ReturnedButton
          contributorIndex={this.props.contributorIndex}
          index={this.props.index}
          toggle={this.props.toggle}
          onReturnedContributor={this.props.onReturnedContributor}
          isReturned={this.props.isReturned}
        />
        <DeleteButton
          contributorIndex={this.props.contributorIndex}
          index={this.props.index}
          toggle={this.props.toggle}
          onDeleteContributor={this.props.onDeleteContributor}
        />
      </React.Fragment>
    );
  }
}

export default Contributor;
