import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { useDispatch, useSelector } from "react-redux";
import useFetchPosts from "@/hooks/posts";
import axios from "axios";

// Mock Redux store for testing
const mockStore = createStore((state) => state, {
  posts: {
    posts: [],
    page: 1,
    loading: false,
    error: null,
    hasMore: true,
    renderedPage: 0,
  },
});

jest.mock("axios");

const MockComponent = () => {
  const { posts, loading, error, hasMore } = useFetchPosts(5);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      {!hasMore && <div>No more posts</div>}
    </div>
  );
};

describe("useFetchPosts Hook", () => {
  it("should match snapshot after fetching posts", async () => {
    const fakePosts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];
    axios.get.mockResolvedValueOnce({ data: fakePosts });

    const { asFragment } = render(
      <Provider store={mockStore}>
        <MockComponent />
      </Provider>
    );

    // Wait for posts to be rendered after the mock fetch
    await act(async () => {});

    // Take a snapshot of the current component render
    expect(asFragment()).toMatchSnapshot();
  });

  it("should match snapshot after error fetching posts", async () => {
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch posts"));

    const { asFragment } = render(
      <Provider store={mockStore}>
        <MockComponent />
      </Provider>
    );

    // Wait for error message to appear
    await act(async () => {});

    // Take a snapshot of the component with an error state
    expect(asFragment()).toMatchSnapshot();
  });
});
