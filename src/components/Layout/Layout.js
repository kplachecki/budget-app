import React from "react";
import classes from "./Layout.module.css";
import Budget from "../Budget/Budget";

const layout = props => (
  <React.Fragment>
    <div>Toolbar, SideDrawe, Backdrop</div>
    <main className={classes.Content}>
      <Budget
        budgetChange={event => props.budgetChange(event)}
        budget={props.budget}
        notReturned={props.notReturned}
      />
      {props.children}
      <button onClick={props.addTransaction}>Add</button>
    </main>
  </React.Fragment>
);

export default layout;
