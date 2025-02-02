import { render, screen, fireEvent } from "@testing-library/react";
import NotFound from "@/pages/404";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("404 Page", () => {
  let mockBack, mockPush;

  beforeEach(() => {
    // Mock router functions
    mockBack = jest.fn();
    mockPush = jest.fn();
    useRouter.mockReturnValue({
      back: mockBack,
      push: mockPush,
    });
  });

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<NotFound />);

    // Check if the 404 text appears
    expect(screen.getByText("4 0 4")).toBeInTheDocument();
    expect(screen.getByText("Sorry, we couldn't find what you are looking for!")).toBeInTheDocument();

    // Snapshot test
    expect(container).toMatchSnapshot();
  });

  it("calls router.back() when 'Go Back' button is clicked", () => {
    render(<NotFound />);

    const goBackButton = screen.getByText("Go Back");
    fireEvent.click(goBackButton);

    expect(mockBack).toHaveBeenCalled();
  });

  it("calls router.push('/') when 'Home' button is clicked", () => {
    render(<NotFound />);

    const homeButton = screen.getByText(/Home/i);
    fireEvent.click(homeButton);

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
