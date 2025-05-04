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

export const getHealthProfileByUserId = async (userId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${ENDPOINTS.healthProfile.getByUserId}/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching health profile:", error);
    throw error;
  }
};

export const updateHealthProfile = async (
  userId: number,
  data: {
    dietaryPreferences: string;
    allergies: string;
    healthGoals: string;
    medicalConditions?: string;
    preferredMealTypes?: string;
    gender?: string;
    activityLevel?: string;
    age?: number;
    weight?: number;
    height?: number;
    sleepHours?: number;
    waterIntake?: number;
  }
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}${ENDPOINTS.healthProfile.update}/${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating health profile:", error);
    throw error;
  }
};
