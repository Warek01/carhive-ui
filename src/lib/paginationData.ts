export const DEFAULT_PAGINATION_DATA = {
  size: 10,
  count: 1,
  page: 0,
  items: 10,
}
export interface PaginationData {
  // current page (starts from 0)
  page: number
  // total amount of pages
  count: number
  // how many items to return
  size: number
  // how many items there are
  items: number
}

export interface PaginatedResponse<T> {
  items: T[]
  totalItems: number
}
