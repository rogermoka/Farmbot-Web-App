jest.mock("react-redux", () => ({
  connect: jest.fn()
}));

let mockPath = "";
jest.mock("../../../history", () => ({
  history: { push: jest.fn() },
  getPathArray: jest.fn(() => { return mockPath.split("/"); })
}));

import * as React from "react";
import { mount } from "enzyme";
import { AddPlant, AddPlantProps } from "../add_plant";
import { history } from "../../../history";

describe("<AddPlant />", () => {
  const fakeProps = (): AddPlantProps => ({
    cropSearchResults: [{
      image: "a",
      crop: {
        name: "Mint",
        slug: "mint",
        binomial_name: "",
        common_names: [""],
        description: "",
        sun_requirements: "",
        sowing_method: "",
        processing_pictures: 1,
        svg_icon: "fake_mint_svg"
      }
    }]
  });

  it("renders", () => {
    mockPath = "/app/designer/plants/crop_search/mint/add";
    const wrapper = mount(<AddPlant {...fakeProps()} />);
    expect(wrapper.text()).toContain("Mint");
    expect(wrapper.text()).toContain("Done");
    expect(wrapper.find("img").props().src)
      .toEqual("data:image/svg+xml;utf8,fake_mint_svg");
  });

  it("goes back", () => {
    const wrapper = mount(<AddPlant {...fakeProps()} />);
    const doneBtn = wrapper.find("a").at(1);
    expect(doneBtn.text()).toEqual("Done");
    doneBtn.simulate("click");
    expect(history.push).toHaveBeenCalledWith(
      "/app/designer/plants/crop_search/mint");
  });
});
