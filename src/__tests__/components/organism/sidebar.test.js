import Sidebar from "@/components/organism/Sidebar";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("render button", () => {
    const { sidebar } = render(<Sidebar />);

    expect(sidebar).toMatchSnapshot();
  });
});
