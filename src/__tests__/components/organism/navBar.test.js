import Navbar from "@/components/organism/NavBar";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("render button", () => {
    const { navbar } = render(<Navbar />);

    expect(navbar).toMatchSnapshot();
  });
});
