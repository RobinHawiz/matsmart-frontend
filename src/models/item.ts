/**
 * Represents a item entry stored in a database.
 */
export type ItemEntity = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  amount: number;
};

/**
 * A payload representing a single item, intended for storage in a database.
 */
export type ItemPayload = Omit<ItemEntity, "id">;
