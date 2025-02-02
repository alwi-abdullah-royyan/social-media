import { render, screen, fireEvent } from "@testing-library/react";
import Search from "@/components/organism/Search"; // Adjust the path to your file
import { useRouter } from "next/router";

// Mocking useRouter from Next.js
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Search Component", () => {
  const mockBack = jest.fn();
  beforeEach(() => {
    useRouter.mockReturnValue({ back: mockBack }); // Mock the back function
  });

  it("renders the component with trending items", () => {
    const trendingItems = [
      "React 18 Released",
      "JavaScript Tips",
      "Next.js vs Gatsby",
      "Web3 Development",
      "CSS Grid Layout",
      "AI in Web Development",
      "Frontend Frameworks",
      "Node.js Performance",
    ];

    // Render the Search component with the trending items
    const search = render(<Search trendingItems={trendingItems} />);
    // Ensure the "Trending" section is present
    expect(search).toMatchSnapshot();
  });

  it("filters trending items based on search input", () => {
    const trendingItems = ["React 18 Released", "JavaScript Tips", "Next.js vs Gatsby", "Web3 Development"];

    const search = render(<Search trendingItems={trendingItems} />);

    // Find the search input and simulate typing "React"
    const searchInput = search.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "React" } });

    // Check if only "React 18 Released" is displayed in the filtered list
    expect(search).toMatchSnapshot();
  });

  it("calls router.back when back button is clicked", () => {
    const trendingItems = ["React 18 Released", "JavaScript Tips", "Next.js vs Gatsby", "Web3 Development"];

    render(<Search trendingItems={trendingItems} />);

    // Find the back button and simulate a click
    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);

    // Ensure that the mock back function was called
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
