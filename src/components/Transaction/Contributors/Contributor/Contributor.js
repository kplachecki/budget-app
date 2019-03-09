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
            type="number"
            value={this.props.value}
            placeholder={this.props.defaultValue}
            className={classes.valueInput}
            // onChange={this.props.onInputHandler}
          />
          <input
            name="shareWithInput"
            placeholder="Name"
            value={this.props.name}
            onChange={event =>
              this.props.onInputContributor(
                event,
                this.props.index,
                this.props.contributorIndex
              )
            }
            className={classes.nameInput}
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
      extension = (
        <p>
          {this.props.name} owns you {this.props.defaultValue}
        </p>
      );
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
          isReturned={this.props.isReturned}
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
          isReturned={this.props.isReturned}
        />
      </React.Fragment>
    );
  }
}

export default Contributor;
