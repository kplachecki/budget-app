import React from "react";
import classes from "./Layout.module.css";
import { Button, Affix } from "antd";
import Menu from "./Menu/Menu";

const layout = props => (
  <React.Fragment>
    <Menu
      budgetChange={props.budgetChange}
      budget={props.budget}
      notReturned={props.notReturned}
    />
    <div className={classes.Content}>{props.children}</div>{" "}
    <Affix style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <Button
        shape="circle"
        type="primary"
        icon="plus"
        onClick={props.addTransaction}
        size="large"
      />
    </Affix>
  </React.Fragment>
);

export default layout;
