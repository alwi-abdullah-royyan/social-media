import { getTrendingItems } from "@/services/trendingItems"; // Adjust path if needed

describe("getTrendingItems", () => {
  it("returns the correct trending items list", async () => {
    const expectedTrendingItems = [
      "React 18 Released",
      "JavaScript Tips",
      "Next.js vs Gatsby",
      "Web3 Development",
      "CSS Grid Layout",
      "AI in Web Development",
      "Frontend Frameworks",
      "Node.js Performance",
    ];

    // Call the function
    const trendingItems = await getTrendingItems();

    // Assertions
    expect(trendingItems).toEqual(expectedTrendingItems);
  });
});
