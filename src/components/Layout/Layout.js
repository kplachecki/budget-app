import React, { Component } from "react";
import classes from "./Layout.module.css";
import { Button, Affix } from "antd";
import Toolbar from "./Toolbar/Toolbar";
import DrawerRight from "./Drawer/Drawer";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <DrawerRight
          onDrawerClose={this.props.onDrawerClose}
          drawerVisible={this.props.drawerVisible}
          resetHandler={this.props.resetHandler}
        />
        <Toolbar
          budgetChange={this.props.budgetChange}
          budget={this.props.budget}
          notReturned={this.props.notReturned}
          onDrawerOpen={this.props.onDrawerOpen}
        />
        <div className={classes.Content}>{this.props.children}</div>{" "}
        <Affix style={{ position: "fixed", bottom: "35px", right: "20px" }}>
          <Button
            shape="circle"
            type="primary"
            icon="plus"
            onClick={this.props.addTransaction}
            size="large"
            style={{
              width: "55px",
              height: "55px",
              fontSize: "30px"
            }}
            disabled={this.props.addButtonState}
          />
        </Affix>
      </React.Fragment>
    );
  }
}

export default Layout;
