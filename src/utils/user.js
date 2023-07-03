import axios from "axios";

export const showUserFullName = (user) => {
  return user ? `${user.name} ${user.surname}` : "";
};

export const checkUserCredentials = (users, checkingUser) => {
  return users.find(
    (user) =>
      user.email === checkingUser.email &&
      user.password === checkingUser.password
  );
};

// Add a new user
export const addUser = async (userData) => {
  try {
    const response = await axios.post("http://localhost:3000/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`/db.json/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Update a user by ID
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`/db.json/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
