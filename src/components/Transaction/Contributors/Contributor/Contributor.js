import React, { Component } from "react";
import classes from "./Contributor.module.css";
import ReturnedButton from "./ReturnedButton/ReturnedButton";
import DeleteButton from "./DeleteButton/DeleteButton";
import { Button, Input, Table } from "antd";

class Contributor extends Component {
  dataColumns = [
    {
      title: "Amount",
      dataIndex: "value",
      render: (text, record) => <span>{record.value + "$"}</span>
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
      title: null,
      dataIndex: "action",
      render: (text, record) => {
        if (record.isReturned) {
          return;
        } else {
          return (
            <DeleteButton
              contributorIndex={record.key}
              toggle={this.props.toggle}
              onDeleteContributor={this.props.onDeleteContributor}
              index={this.props.index}
              isReturned={record.isReturned}
            />
          );
        }
      }
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
      name,
      splitOption
    } = this.props;

    let inputValid = false;
    if (value !== 0 && String(value).length !== 0 && name.length !== 0) {
      inputValid = true;
    }

    let addButton = null;
    if (contributorIndex === 0) {
      addButton = (
        <Button
          size="small"
          type="primary"
          shape="round"
          onClick={() => this.props.onAddContributor(index)}
          disabled={!inputValid}
        >
          Add
        </Button>
      );
    }
    let disableInput = false;

    if (splitOption === "equal") {
      disableInput = true;
    }
    let extension = null;
    if (toggle && isEditable && contributorIndex === 0) {
      extension = (
        <div className={classes.ContributorInput}>
          <Input.Group compact>
            <Input
              name="contributorValue"
              type="number"
              value={value}
              placeholder={"Amount"}
              style={{ width: "30%" }}
              onChange={event =>
                this.props.onInputContributor(event, index, contributorIndex)
              }
              disabled={disableInput}
            />
            <Input
              name="contributorName"
              placeholder="Contributor name"
              value={name}
              onChange={event =>
                this.props.onInputContributor(event, index, contributorIndex)
              }
              style={{ width: "70%" }}
              maxLength={10}
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

    return <React.Fragment>{extension}</React.Fragment>;
  }
}

export default Contributor;
