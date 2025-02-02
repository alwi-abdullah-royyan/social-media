import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Notification from "@/pages/notification"; // Adjust the path as needed

jest.mock("axios");
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Notification Page", () => {
  const mockPosts = [
    { id: 1, title: "Post 1", body: "Post content 1" },
    { id: 2, title: "Post 2", body: "Post content 2" },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    axios.get.mockResolvedValue({ data: mockPosts });
    useSelector.mockReturnValue({ isMobileScreen: false }); // Non-mobile screen for this test
    useRouter.mockReturnValue({ back: jest.fn() });
  });

  it("calls router.back() when the back button is clicked", () => {
    const back = jest.fn();
    useRouter.mockReturnValue({ back });

    render(<Notification />);

    // Simulate clicking the "Back" button
    fireEvent.click(screen.getByText("Back"));

    // Check if router.back was called
    expect(back).toHaveBeenCalledTimes(1);
  });

  it("makes an API call to fetch posts", async () => {
    render(<Notification />);

    // Wait for the axios call to complete and the posts to be rendered
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts", {
      params: { _limit: 10 },
    });
  });
});
