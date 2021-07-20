export interface PaginateResult<res = any> {
  results: res[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
