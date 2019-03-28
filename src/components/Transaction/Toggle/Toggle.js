import React, { Component } from "react";
import { Switch } from "antd";
class Toggle extends Component {
  render() {
    let shareBill = null;
    const switchStyle = !this.props.inputValid ? "#0a0a0ac5" : "#1890ff";

    if (this.props.index === 0 || this.props.isEditable) {
      shareBill = (
        <Switch
          onClick={this.props.toggleSwitch}
          checked={this.props.toggle}
          checkedChildren={"Sharing bill"}
          style={{ backgroundColor: switchStyle }}
          unCheckedChildren={"Share bill"}
          disabled={!this.props.inputValid}
        />
      );
    }

    return <React.Fragment>{shareBill}</React.Fragment>;
  }
}

export default Toggle;
