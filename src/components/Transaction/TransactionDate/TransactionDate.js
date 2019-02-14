import React from "react";
import classes from "./TransactionDate.module.css";

const transactionDate = props => (
  <div className={classes.Date}>
    <p>{props.date}</p>
  </div>
);

export default transactionDate;
