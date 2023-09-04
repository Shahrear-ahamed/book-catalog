// Define your interfaces here
export type IBooksFilterRequest = {
  search?: string;
  maxPrice?: number;
  minPrice?: number;
  categoryId?: string;
};
