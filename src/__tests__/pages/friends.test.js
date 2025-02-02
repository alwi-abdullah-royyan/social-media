import { render } from "@testing-library/react";
import Friends from "@/pages/friends";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";
import { getUsers } from "@/services/user";

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock Redux store
const mockStore = configureStore();
const store = mockStore({
  screen: { isMobileScreen: false }, // Control mobile/desktop rendering
});

// Mock `getUsers` service
jest.mock("@/services/user", () => ({
  getUsers: jest.fn(),
}));

describe("Friends Page", () => {
  beforeEach(() => {
    // Mock useRouter behavior
    useRouter.mockReturnValue({
      back: jest.fn(),
    });

    // Mock getUsers to return fake user data
    getUsers.mockResolvedValue([
      { id: 1, name: "John Doe", username: "johndoe", email: "john@example.com", avatar: "/avatar1.png" },
      { id: 2, name: "Jane Smith", username: "janesmith", email: "jane@example.com", avatar: "/avatar2.png" },
    ]);
  });

  it("renders and matches snapshot", async () => {
    const { container } = render(
      <Provider store={store}>
        <Friends
          users={[
            { id: 1, name: "John Doe", username: "johndoe", email: "john@example.com", avatar: "/avatar1.png" },
            { id: 2, name: "Jane Smith", username: "janesmith", email: "jane@example.com", avatar: "/avatar2.png" },
          ]}
        />
      </Provider>
    );

    // Snapshot test
    expect(container).toMatchSnapshot();
  });
});
