import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Settings from "@/pages/settings";

// Mock the `useRouter`
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock the `useSelector`
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Settings Page", () => {
  it("calls router.back() when the back button is clicked", () => {
    // Mocking the Redux state
    useSelector.mockReturnValue({
      isMobileScreen: false,
    });

    // Mocking the Next.js router push method
    const back = jest.fn();
    useRouter.mockReturnValue({
      back,
    });

    // Render the Settings component
    render(<Settings />);

    // Find and click the "Back" button
    fireEvent.click(screen.getByText("Back"));

    // Check if the `router.back` method was called
    expect(back).toHaveBeenCalledTimes(1);
  });
});
