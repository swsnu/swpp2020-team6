import React from "react";
import { mount } from "enzyme";
import Youtube from "./Youtube";

describe("<Youtube/>", () => {
  it("should render without errors", () => {
    const component = mount(<Youtube />);
    const wrapper = component.find(".Youtube");
    expect(wrapper.length).toBe(1);

    const videoWrapper = component.find(".close-video");
    expect(videoWrapper.length).toBe(1);

    const buttonWrapper = component.find(".side-button");
    expect(buttonWrapper.length).toBe(1);
  });

  it("should change state on clicking the button", () => {
    const component = mount(<Youtube />);
    const buttonWrapper = component.find(".side-button");
    buttonWrapper.at(0).simulate("click");
    const instance = component.find(Youtube).instance();
    expect(instance.state.open).toBe(true);

    const videoWrapper = component.find(".open-video");
    expect(videoWrapper.length).toBe(1);
  });
});
