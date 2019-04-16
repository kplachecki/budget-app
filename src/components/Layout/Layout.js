import React, { Component } from "react";
import classes from "./Layout.module.css";
import { Button, Affix } from "antd";
import Toolbar from "./Toolbar/Toolbar";
import DrawerRight from "./Drawer/Drawer";
import Login from "./Auth/Login";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Login
          loginModalVisible={this.props.loginModalVisible}
          onLoginModalClose={this.props.onLoginModalClose}
          onPasswordHandler={this.props.onPasswordHandler}
          onEmailHandler={this.props.onEmailHandler}
          onSubmitHandler={this.props.onSubmitHandler}
          onSignInHandler={this.props.onSignInHandler}
          authLogin={this.props.authLogin}
        />
        <DrawerRight
          onLoginModalOpen={this.props.onLoginModalOpen}
          onDrawerClose={this.props.onDrawerClose}
          drawerVisible={this.props.drawerVisible}
          resetHandler={this.props.resetHandler}
          onLogout={this.props.onLogout}
        />
        <Toolbar
          budgetChange={this.props.budgetChange}
          budget={this.props.budget}
          notReturned={this.props.notReturned}
          onDrawerOpen={this.props.onDrawerOpen}
        />
        <div className={classes.Content}>{this.props.children}</div>
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
