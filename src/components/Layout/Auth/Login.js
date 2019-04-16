import React, { Component } from "react";
import { Form, Input, Icon, Button, Modal } from "antd";
import classes from "./Login.module.css";

class LoginForm extends Component {
  loginState = {
    loginButton: true
  };

  passwordValidator = (rule, value, callback) => {
    if (value.length < 6 && value.length > 0) {
      this.props.form.setFields({
        password: {
          value: value,
          errors: [new Error("Password too short!")]
        }
      });
      this.loginButtonValidator();
    } else {
      if (value.length === 0) {
        callback();
        this.loginButtonValidator();
      } else {
        callback();
        this.loginButtonValidator();
      }
    }
  };

  emailValidator = (rule, value, callback) => {
    callback();
    this.loginButtonValidator();
  };

  loginButtonValidator = () => {
    const passError = this.props.form.getFieldError(`password`);
    const emailError = this.props.form.getFieldError(`Email`);
    const passValue = this.props.form.getFieldValue("password");
    if (!passError && !emailError && passValue) {
      this.loginState.loginButton = false;
    } else {
      this.loginState.loginButton = true;
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        visible={this.props.loginModalVisible}
        title="Budget App"
        onCancel={this.props.onLoginModalClose}
        closable={false}
        footer={[
          <Button
            disabled={this.loginState.loginButton}
            key="sign-in"
            type="default"
            onClick={this.props.onSignInHandler}
          >
            Sign-in
          </Button>,
          <span key="Or" style={{ marginLeft: "10px", marginRight: "10px" }}>
            Or
          </span>,
          <Button
            disabled={this.loginState.loginButton}
            key="submit"
            type="primary"
            onClick={this.props.onSubmitHandler}
          >
            Sign-up
          </Button>
        ]}
      >
        <Form
          onSubmit={this.props.onSubmitHandler}
          className={classes.loginForm}
        >
          <Form.Item>
            {getFieldDecorator("Email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                { required: true, message: "Please input your email!" },
                { validator: this.emailValidator }
              ]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email Address"
                type="email"
                onBlur={this.props.onEmailHandler}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
                { validator: this.passwordValidator }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                onBlur={this.props.onPasswordHandler}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const Login = Form.create({ name: "register" })(LoginForm);

export default Login;
