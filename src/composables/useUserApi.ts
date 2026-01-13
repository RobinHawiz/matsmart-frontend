import type { UserPayload } from "@/models/user";
import { useFetch } from "@/composables/useFetch";
const apiUrl =
  import.meta.env.VITE_API_BASE_URL ??
  "https://matsmart-backend.azurewebsites.net/api";

export class UserApi {
  constructor(private readonly API_BASE_URL = apiUrl) {}

  async loginUser(payload: UserPayload): Promise<string> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const res = await useFetch(`${this.API_BASE_URL}/users/login`, options);
    return await res.text();
  }

  async validateToken(): Promise<void> {
    await useFetch(`${this.API_BASE_URL}/auth`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
}
