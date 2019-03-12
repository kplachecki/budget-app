import React from "react";
import classes from "./Layout.module.css";
import Budget from "../Budget/Budget";
import { Button } from "antd";

const layout = props => (
  <React.Fragment>
    <main className={classes.Content}>
      <Budget
        budgetChange={event => props.budgetChange(event)}
        budget={props.budget}
        notReturned={props.notReturned}
      />
      {props.children}
      <Button
        size="default"
        shape="circle"
        type="primary"
        icon="plus"
        onClick={props.addTransaction}
        className={classes.AddButton}
      />
    </main>
  </React.Fragment>
);

export default layout;
