// src/utils/auth.js

import axios from "axios";

const API_URL = "https://api.blog.redberryinternship.ge/api/token";

export const getToken = async () => {
  try {
    // Make a request to the token API
    const response = await axios.get(API_URL);
    const token = response.data.token; // Adjust based on the actual response structure

    // Store the token in localStorage or another appropriate place
    localStorage.setItem("token", token);

    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};
