import React from "react";
import { Radio } from "antd";

const OptionsSwitch = props => {
  let optionsSwitchOwnState = false;
  if (
    props.transactionContributors.length > 1 &&
    props.splitOption === "equal"
  ) {
    optionsSwitchOwnState = true;
  }

  let optionsSwitchEqualState = false;
  if (props.transactionContributors.length > 1 && props.splitOption === "own") {
    optionsSwitchEqualState = true;
  }

  return (
    <Radio.Group
      name="inputSwitch"
      size="small"
      defaultValue="equal"
      onChange={event => props.onOptionsSwitchChange(event, props.index)}
    >
      <Radio.Button value="equal" disabled={optionsSwitchEqualState}>
        Equal
      </Radio.Button>
      <Radio.Button value="own" disabled={optionsSwitchOwnState}>
        Own Input
      </Radio.Button>
    </Radio.Group>
  );
};
export default OptionsSwitch;
