import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiClient<T>(
  endpoint: string,
  { body, method = "GET", ...customConfig }: any = {},
): Promise<T> {
  try {
    const response = await api({
      url: endpoint,
      method,
      data: body,
      ...customConfig,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}
