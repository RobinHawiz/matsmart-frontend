import type { ItemEntity, ItemPayload } from "@/models/item";
import {
  useDeleteData,
  useGetData,
  usePatchData,
  usePutData,
} from "@/composables/useFetch";
const apiUrl =
  import.meta.env.VITE_API_BASE_URL ??
  "https://matsmart-backend.azurewebsites.net/api";

export class ItemApi {
  constructor(private readonly API_BASE_URL = apiUrl) {}

  async getAllItems(): Promise<Array<ItemEntity>> {
    return await useGetData<Array<ItemEntity>>(`${this.API_BASE_URL}/items`);
  }

  async getOneItem(id: number): Promise<ItemEntity> {
    return await useGetData<ItemEntity>(`${this.API_BASE_URL}/items/${id}`);
  }

  async updateItemAmount(id: number, amount: number) {
    await usePatchData(`${this.API_BASE_URL}/items/${id}`, { amount });
  }

  async updateItem(id: number, item: ItemPayload) {
    await usePutData(`${this.API_BASE_URL}/items/${id}`, item);
  }

  async deleteItem(id: number) {
    await useDeleteData(`${this.API_BASE_URL}/items/${id}`);
  }
}
