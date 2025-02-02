import SidebarTrend from "@/components/organism/SidebarTrend";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("render button", () => {
    const { sidebarTrend } = render(<SidebarTrend />);

    expect(sidebarTrend).toMatchSnapshot();
  });
});
