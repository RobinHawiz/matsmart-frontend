import type { ItemEntity } from "@/models/item";
import { useGetData, usePatchData } from "@/composables/useFetch";
const apiUrl =
  import.meta.env.VITE_API_BASE_URL ??
  "https://matsmart-backend.azurewebsites.net/api";

export class ItemApi {
  constructor(private readonly API_BASE_URL = apiUrl) {}

  async getAllItems(): Promise<Array<ItemEntity>> {
    return await useGetData<Array<ItemEntity>>(`${this.API_BASE_URL}/items`);
  }

  async updateItemAmount(id: number, amount: number) {
    await usePatchData(`${this.API_BASE_URL}/items/${id}`, { amount });
  }
}
