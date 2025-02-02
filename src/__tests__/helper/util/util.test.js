import { checkUser } from "@/helpers/util"; // adjust path as needed

describe("checkUser", () => {
  it("should return true if the user exists", () => {
    const users = {
      1: { name: "John Doe", email: "john@example.com" },
      2: { name: "Jane Doe", email: "jane@example.com" },
    };
    const result = checkUser(users, 1);
    expect(result).toBe(true);
  });

  it("should return false if the user does not exist", () => {
    const users = {
      1: { name: "John Doe", email: "john@example.com" },
      2: { name: "Jane Doe", email: "jane@example.com" },
    };
    const result = checkUser(users, 3); // User with ID 3 doesn't exist
    expect(result).toBe(false);
  });

  it("should return false if the users object is empty", () => {
    const users = {};
    const result = checkUser(users, 1);
    expect(result).toBe(false);
  });
});
