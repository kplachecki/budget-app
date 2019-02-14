import React from "react";
import classes from "./Layout.module.css";

const layout = props => (
  <React.Fragment>
    <div>Toolbar, SideDrawe, Backdrop</div>
    <main className={classes.Content}>
      {props.children}
      <button onClick={props.addTransaction}>Add</button>
    </main>
  </React.Fragment>
);

export default layout;
