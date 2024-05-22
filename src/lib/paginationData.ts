export const DEFAULT_PAGINATION_DATA = {
  size: 10,
  count: 0,
  page: 0,
  items: 0,
}
export interface PaginationData {
  page: number
  count: number
  size: number
  items: number
}

export interface PaginatedResponse<T> {
  items: T[]
  totalItems: number
}
