export interface PaginateResult<Result = any> {
  results: Result[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
