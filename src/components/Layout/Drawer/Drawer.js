import React from "react";
import { Button, Drawer } from "antd";

const drawerRight = props => (
  <Drawer
    title="Budget App"
    placement="right"
    closable={false}
    onClose={props.onDrawerClose}
    visible={props.drawerVisible}
    bodyStyle={{ display: "flex", justifyContent: "space-evenly" }}
    width="50%"
  >
    <Button type="danger" onClick={props.resetHandler}>
      Reset App
    </Button>
  </Drawer>
);
export default drawerRight;
