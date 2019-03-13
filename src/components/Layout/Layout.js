import React from "react";
import classes from "./Layout.module.css";
import { Button } from "antd";
import Menu from "./Menu/Menu";

const layout = props => (
  <React.Fragment>
    <Menu
      budgetChange={props.budgetChange}
      budget={props.budget}
      notReturned={props.notReturned}
    />

    <div className={classes.Content}>
      {props.children}
      <Button
        size="default"
        shape="circle"
        type="primary"
        icon="plus"
        onClick={props.addTransaction}
        className={classes.AddButton}
      />
    </div>
  </React.Fragment>
);

export default layout;
