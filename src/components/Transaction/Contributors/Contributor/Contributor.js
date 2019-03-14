import React, { Component } from "react";
import classes from "./Contributor.module.css";
import EditButton from "./EditButton/EditButton";
import ReturnedButton from "./ReturnedButton/ReturnedButton";
import DeleteButton from "./DeleteButton/DeleteButton";
import { Button, Input } from "antd";

class Contributor extends Component {
  render() {
    let addButton = null;

    if (this.props.contributorIndex === 0) {
      addButton = (
        <Button
          size="small"
          type="primary"
          shape="round"
          onClick={() => this.props.onAddContributor(this.props.index)}
        >
          Add
        </Button>
      );
    }
    let extension = null;

    if (
      this.props.toggle &&
      this.props.isEditable &&
      this.props.contributorIndex === 0
    ) {
      extension = (
        <div className={classes.ContributorInput}>
          <Input.Group>
            <Input
              name="contributorValue"
              type="number"
              value={this.props.value}
              placeholder={this.props.defaultValue}
              style={{ width: "30%" }}
              onChange={event =>
                this.props.onInputContributor(
                  event,
                  this.props.index,
                  this.props.contributorIndex
                )
              }
            />
            <Input
              name="contributorName"
              placeholder="Contributor name"
              value={this.props.name}
              onChange={event =>
                this.props.onInputContributor(
                  event,
                  this.props.index,
                  this.props.contributorIndex
                )
              }
              style={{ width: "70%" }}
            />
          </Input.Group>
          {addButton}
        </div>
      );
    }

    if (this.props.contributorIsEditable && this.props.contributorIndex !== 0) {
      extension = (
        <div className={classes.ContributorInput}>
          <span>{this.props.defaultValue}</span>
          <input
            name="contributorName"
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
    if (this.props.isReturned) {
      extension = (
        <p>
          {this.props.name} returned {this.props.defaultValue}
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
