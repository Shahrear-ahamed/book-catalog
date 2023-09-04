// Define your interfaces here
export type IBooksFilterRequest = {
  searchTerm?: string;
  maxPrice?: number;
  minPrice?: number;
  categoryId?: string;
};
