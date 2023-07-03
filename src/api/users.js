import axios from "axios";

export const getUser = async () => {
  const response = await axios.get("http://localhost:3000/Users");
  return response.data;
};

export const createUser = async (newUser) => {
  const response = await axios.post("http://localhost:3000/Users", newUser);
  return response.data;
};

export const updateUser = async (updatingUser, id) => {
  const response = await axios.put(
    `http://localhost:3000/Users/${id}`,
    updatingUser
  );
  return response.data;
};
