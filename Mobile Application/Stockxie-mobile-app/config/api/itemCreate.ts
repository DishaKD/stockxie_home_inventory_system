import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../index";

// Function to create an item
export const createItem = async (data: {
  name: string;
  quantity: number;
  expiryDate: string;
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINTS.post.items}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};
