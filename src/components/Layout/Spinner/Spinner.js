import React from "react";
import { Spin, Icon } from "antd";
import classes from "./Spinner.module.css";

const spinner = props => (
  <Spin
    className={classes.Spinner}
    indicator={<Icon type="loading" style={{ fontSize: 48 }} spin />}
  />
);
export default spinner;
