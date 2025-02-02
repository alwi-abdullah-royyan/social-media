import axios from "axios";

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);

    // Return user data with the avatar
    return {
      [userId]: {
        ...response.data, // Add fetched user data
        avatar: `https://picsum.photos/id/${userId}/100`, // Add avatar
      },
    };
  } catch (error) {
    // Log error and return an empty object or handle the error as needed
    console.error("Error fetching user:", error);
    return {}; // Return an empty object to avoid crashing the app
  }
};
export const getUsers = async () => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/`);

    // Iterate through the response data and add avatar for each user
    const usersWithAvatars = response.data.map((user) => ({
      ...user, // Spread existing user data
      avatar: `https://picsum.photos/id/${user.id}/100`, // Add avatar based on user id
    }));

    // Return the users with avatar data, using their id as the key
    const usersById = usersWithAvatars.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    return usersById;
  } catch (error) {
    // Log error and return an empty object or handle the error as needed
    console.error("Error fetching users:", error);
    return {}; // Return an empty object to avoid crashing the app
  }
};
