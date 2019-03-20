import React, { Component } from "react";
import classes from "./Contributor.module.css";
import EditButton from "./EditButton/EditButton";
import ReturnedButton from "./ReturnedButton/ReturnedButton";
import DeleteButton from "./DeleteButton/DeleteButton";
import { Button, Input, Table } from "antd";

class Contributor extends Component {
  dataColumns = [
    {
      title: "Amount",
      dataIndex: "defaultValue",
      render: (text, record) => <span>{record.defaultValue + "$"}</span>
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <ReturnedButton
          contributorIndex={record.key}
          index={this.props.index}
          toggle={this.props.toggle}
          onReturnedContributor={this.props.onReturnedContributor}
          isReturned={record.isReturned}
        />
      )
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <DeleteButton
          contributorIndex={record.key}
          toggle={this.props.toggle}
          onDeleteContributor={this.props.onDeleteContributor}
          index={this.props.index}
        />
      )
    }
  ];

  render() {
    const {
      index,
      contributorIndex,
      contributors,
      toggle,
      isEditable,
      value,
      defaultValue,
      name
    } = this.props;

    let addButton = null;
    if (contributorIndex === 0) {
      addButton = (
        <Button
          size="small"
          type="primary"
          shape="round"
          onClick={() => this.props.onAddContributor(index)}
        >
          Add
        </Button>
      );
    }
    let extension = null;

    if (toggle && isEditable && contributorIndex === 0) {
      extension = (
        <div className={classes.ContributorInput}>
          <Input.Group>
            <Input
              name="contributorValue"
              type="number"
              value={value}
              placeholder={defaultValue}
              style={{ width: "30%" }}
              onChange={event =>
                this.props.onInputContributor(event, index, contributorIndex)
              }
            />
            <Input
              name="contributorName"
              placeholder="Contributor name"
              value={name}
              onChange={event =>
                this.props.onInputContributor(event, index, contributorIndex)
              }
              style={{ width: "70%" }}
            />
          </Input.Group>
          {addButton}
        </div>
      );
    }

    const columns = this.dataColumns.map(col => {
      return {
        ...col,
        onCell: record => ({
          record
        })
      };
    });

    if (contributorIndex === 1 && toggle) {
      extension = (
        <Table
          dataSource={contributors.slice(1)}
          columns={columns}
          size="small"
          pagination={false}
        />
      );
    }

    return (
      <React.Fragment>
        {extension}
        {/* <EditButton
          contributorIsEditable={this.props.contributorIsEditable}
          contributorIndex={contributorIndex}
          onEditContributor={this.props.onEditContributor}
          index={index}
          isEditable={isEditable}
          toggle={toggle}
          isReturned={isReturned}
        /> */}
      </React.Fragment>
    );
  }
}

export default Contributor;
