import React from "react";
import classes from "./Budget.module.css";

const budget = props => (
  <div className={classes.Budget}>
    <span>
      Provide your Budget: <input onChange={props.budgetChange} />
    </span>
    <p>Money Left: {props.budget} </p>
  </div>
);

export default budget;
