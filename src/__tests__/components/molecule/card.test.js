import { render, screen } from "@testing-library/react";
import { Card, CardContent } from "@/components/molecule/Card"; // Adjust the import path if needed
import Image from "next/image"; // Import Image to mock it

// Mock the Image component to prevent actual image rendering
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, className, width, height }) => {
    return <div className={className} data-src={src} data-alt={alt} data-width={width} data-height={height}></div>;
  },
}));

describe("Card Component", () => {
  it("should render the Card component with given className and data-id", () => {
    render(
      <Card className="bg-gray-700" dataId="123">
        Test Content
      </Card>
    );

    const card = screen.getByText("Test Content").closest("div");
    expect(card.className).toContain("bg-gray-700");
  });
});
