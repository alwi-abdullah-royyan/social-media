import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/router";
import Index from "@/pages/index"; // Adjust path if necessary

// Mock the useRouter hook
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Index Page", () => {
  it("redirects to /home on mount", async () => {
    const push = jest.fn(); // Mock the push method

    // Mock useRouter hook to return the mock push function
    useRouter.mockImplementation(() => ({
      push,
    }));

    // Render the component
    render(<Index />);

    // Use `act` to ensure useEffect runs
    await act(async () => {});

    // Check if router.push was called with '/home'
    expect(push).toHaveBeenCalledWith("/home");
  });
});
