import { LoginResponse } from "../definitions";
import { API_BASE_URL } from "./base-url";

export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const loginApi = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      switch (response.status) {
        case 401:
          throw new ApiError("Invalid username or password", 401);
        case 404:
          throw new ApiError("Service not available", 404);
        case 500:
          throw new ApiError("Server error, please try again later", 500);
        default:
          throw new ApiError(errorData.message || "An error occurred while logging in", response.status);
      }
    }

    const data = await response.json();
    return data as LoginResponse;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if ((error as Error).name === "AbortError") {
      throw new ApiError("Request timed out, please check your connection");
    }
    if ((error as Error).name === "TypeError") {
      throw new ApiError("Unable to connect to the server. Please check your internet connection");
    }
    throw new ApiError("An unexpected error occurred. Please try again");
  }
};
