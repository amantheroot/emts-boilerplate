import { Document } from "mongoose";

export interface PaginateResult<Result = Document> {
  results: Result[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
