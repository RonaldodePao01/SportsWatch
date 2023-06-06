import App from "./App";
import React from "react";
import renderer from "react-test-renderer";

it("snapshot test of app component", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
