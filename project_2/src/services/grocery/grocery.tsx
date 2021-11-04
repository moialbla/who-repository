import { Http } from '../../core';
import { GrocerySearchResult } from '../../common/Models/GrocerySearchResult';
import { CartItemType } from '../../common/Models/CartItemType';

/**
 * Gets the product list pageable.
 * @param page Page number.
 * @param limit The limit list.
 * @returns Product list.
 */
export async function getGrocery(page: number = 1, limit: number = 30): Promise<GrocerySearchResult> {
  const result: any = await Http.get(`/grocery?_page=${page}&_limit=${limit}`);
  return { result: result?.data, totalcount: parseInt(result?.headers['x-total-count']) };
}

/**
 * Gets the product list filter by favourite.
 * @returns Product list filter by favourite.
 */
export async function getFavouriteGrocery() : Promise<GrocerySearchResult> {
  const result: any = await Http.get('/grocery', { params: { favorite: 1 } });
  return { result: result?.data, totalcount: result?.headers['x-total-count'] };
}

/**
 * Product partial update.
 * @param product The product.
 * @returns if was updated.
 */
export async function patchProduct(product:CartItemType) {
  const result: any = await Http.patch(`/grocery/${product.id}`, product);
  return result?.data;
}

