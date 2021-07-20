import { Document } from "@/interfaces/extensions/document.interface";

export interface PaginateResult<Result = Document> {
  results: Result[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
