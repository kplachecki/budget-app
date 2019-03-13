import React from "react";
import classes from "./Budget.module.css";
import { Input } from "antd";

const budget = props => (
  <div className={classes.Budget}>
    <span>
      <Input
        className={classes.Input}
        onChange={props.budgetChange}
        placeholder="Provide your Budget here"
        type="number"
      />
    </span>
    <p>Money Left: {props.budget} </p>
    <p>Pending for return: {props.notReturned}</p>
  </div>
);

export default budget;
