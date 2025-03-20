import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../index";

export const createHealthProfile = async (data: {
  userId: number;
  dietaryPreferences: string;
  allergies: string;
  healthGoals: string;
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINTS.healthProfile.create}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating health profile:", error);
    throw error;
  }
};
