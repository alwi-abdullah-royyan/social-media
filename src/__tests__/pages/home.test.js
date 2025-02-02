import { render, screen, waitFor } from "@testing-library/react";
import SocialFeed from "@/pages/home/index"; // Adjust the path to match your file location
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // Mock store
import "@testing-library/jest-dom";
import axios from "axios";

// Mocking the Next.js useRouter hook
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Create a mock store
const mockStore = configureStore();
const store = mockStore({
  posts: { renderedPage: 0, page: 1 },
  screen: { isMobileScreen: false },
});

jest.mock("axios"); // Mocking axios for post data fetch
jest.mock("@/hooks/posts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mocking IntersectionObserver to avoid issues in Jest environment
global.IntersectionObserver = class {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {
    // Simulate observing behavior or directly trigger the callback
  }

  disconnect() {
    // No-op for disconnecting in the mock
  }
};

describe("SocialFeed", () => {
  beforeEach(() => {
    // Mock axios to simulate fetching posts
    axios.get.mockResolvedValue({
      posts: [
        { id: 1, title: "Post 1", body: "This is post 1", userId: 1 },
        { id: 2, title: "Post 2", body: "This is post 2", userId: 2 },
      ],
    });

    // Mocking the useRouter to avoid "NextRouter was not mounted" error
    const mockPush = jest.fn();
    require("next/router").useRouter.mockReturnValue({
      push: mockPush,
      back: mockPush,
      pathname: "/",
      query: {},
    });

    // Mock the custom hook to return mocked posts
    require("@/hooks/posts").default.mockReturnValue({
      posts: [
        { id: 1, title: "Post 1", body: "This is post 1", userId: 1 },
        { id: 2, title: "Post 2", body: "This is post 2", userId: 2 },
      ],
      loading: false,
      error: null,
    });
  });

  it("renders and matches snapshot", async () => {
    const { container } = render(
      <Provider store={store}>
        <SocialFeed />
      </Provider>
    );

    // Wait for posts to be rendered by checking for post titles
    await waitFor(() => screen.getByText("Post 1"));
    await waitFor(() => screen.getByText("Post 2"));

    // Snapshot the entire rendered output
    expect(container).toMatchSnapshot();
  });
});
