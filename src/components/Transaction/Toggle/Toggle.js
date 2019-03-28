import React, { Component } from "react";
import { Switch } from "antd";
class Toggle extends Component {
  render() {
    let shareBill = null;
    if (this.props.index === 0 || this.props.isEditable) {
      shareBill = (
        <Switch
          onClick={this.props.toggleSwitch}
          checked={this.props.toggle}
          checkedChildren={"Sharing bill"}
          unCheckedChildren={"Share bill"}
          disabled={!this.props.inputValid}
        />
      );
    }

    return <React.Fragment>{shareBill}</React.Fragment>;
  }
}

export default Toggle;
