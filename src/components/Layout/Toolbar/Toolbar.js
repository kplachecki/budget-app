import React from "react";
import classes from "./Toolbar.module.css";
import { InputNumber, Statistic, Icon } from "antd";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <InputNumber
      placeholder="Your budget"
      className={classes.Input}
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

    <Icon
      type="more"
      className={classes.Icon}
      style={{
        fontSize: "24px",
        height: "100%",
        alignItems: "center",
        display: "flex"
      }}
      onClick={props.onDrawerOpen}
    />
  </header>
);

export default toolbar;
