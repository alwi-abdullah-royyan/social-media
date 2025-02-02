import Icons from "@/components/atoms/Icons"; // Adjust the import path if needed

describe("Icons module", () => {
  it("exports all icons correctly", () => {
    // List of all expected icons
    const expectedIcons = [
      "Back",
      "Emoji404",
      "Explore",
      "Feeds",
      "Friends",
      "Messages",
      "Notification",
      "Search",
      "Settings",
    ];

    // Check if each icon is available in the Icons object
    expectedIcons.forEach((icon) => {
      expect(Icons[icon]).toBeDefined();
    });
  });
});
