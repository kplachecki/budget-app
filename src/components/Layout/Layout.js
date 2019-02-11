import React from "react";
import Aux from "../../hoc/_Aux";
import classes from "./Layout.module.css";

const layout = props => (
  <Aux>
    <div>Toolbar, SideDrawe, Backdrop</div>
    <main className={classes.Content}>
      {props.children}
      <button onClick={props.addTransaction}>Add</button>
    </main>
  </Aux>
);

export default layout;
