import React from "react";
import classes from "./Menu.module.css";
import { InputNumber, Statistic } from "antd";

const menu = props => (
  <React.Fragment>
    <header className={classes.BudgetContent}>
      <InputNumber
        placeholder="Your budget"
        className={classes.input}
        onBlur={props.budgetChange}
        max={99999}
      />

      <Statistic
        title="Money left"
        prefix="$"
        value={props.budget}
        style={{
          color: "white",
          textAlign: "center"
        }}
      />
      <Statistic
        title="Pending for return"
        prefix="$"
        value={props.notReturned}
        style={{
          color: "white",
          textAlign: "center"
        }}
      />
    </header>
  </React.Fragment>
);

export default menu;
