import { render } from "@testing-library/react";
import SearchPage from "@/pages/search";
import "@testing-library/jest-dom";
import { getTrendingItems } from "@/services/trendingItems";
import { useRouter } from "next/router";

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock `getTrendingItems` service
jest.mock("@/services/trendingItems", () => ({
  getTrendingItems: jest.fn(),
}));

describe("Search Page", () => {
  beforeEach(() => {
    // Mock router to prevent "NextRouter was not mounted" error
    useRouter.mockReturnValue({
      pathname: "/search",
      query: {},
      push: jest.fn(),
    });

    // Mock API response (array of strings)
    getTrendingItems.mockResolvedValue([
      "React 18 Released",
      "JavaScript Tips",
      "Next.js vs Gatsby",
      "Web3 Development",
      "CSS Grid Layout",
      "AI in Web Development",
      "Frontend Frameworks",
      "Node.js Performance",
    ]);
  });

  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <SearchPage
        data={[
          "React 18 Released",
          "JavaScript Tips",
          "Next.js vs Gatsby",
          "Web3 Development",
          "CSS Grid Layout",
          "AI in Web Development",
          "Frontend Frameworks",
          "Node.js Performance",
        ]}
      />
    );

    // Snapshot test
    expect(container).toMatchSnapshot();
  });
});
