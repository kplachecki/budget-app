import React from "react";
import { Button, Drawer, Popconfirm } from "antd";

const drawerRight = props => (
  <Drawer
    title="Budget App"
    placement="right"
    closable={false}
    onClose={props.onDrawerClose}
    visible={props.drawerVisible}
    bodyStyle={{
      display: "flex",
      justifyContent: "space-evenly",
      flexDirection: "column",
      minHeight: "30vh"
    }}
    width="30%"
  >
    <Button type="primary" onClick={props.onLogout}>
      Logout
    </Button>
    <Popconfirm
      title="All data will be lost. Are you sure?"
      onConfirm={props.resetHandler}
      placement="bottomLeft"
      arrowPointAtCenter
    >
      <Button type="danger">Reset App</Button>
    </Popconfirm>
  </Drawer>
);
export default drawerRight;
