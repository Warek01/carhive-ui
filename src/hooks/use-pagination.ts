import { useCallback, useId } from 'react'
import { useSessionStorage } from 'usehooks-ts'

import { DEFAULT_PAGINATION_DATA, PaginationData } from '@/lib/paginationData'

export default function usePagination(key?: string) {
  const id = useId()
  const [paginationData, setPaginationData] = useSessionStorage<PaginationData>(
    key ?? id,
    DEFAULT_PAGINATION_DATA,
  )

  const setPage = useCallback((page: number) => {
    setPaginationData((p) => ({ ...p, page }))
  }, [])

  const setSize = useCallback((size: number | string) => {
    setPaginationData((p) => ({
      ...p,
      size: typeof size === 'string' ? parseInt(size) : size,
    }))
  }, [])

  const setItems = useCallback((items: number) => {
    setPaginationData((p) => ({
      ...p,
      items,
      count: Math.ceil(items / p.size),
    }))
  }, [])

  const reset = useCallback(() => {
    setPaginationData(DEFAULT_PAGINATION_DATA)
  }, [])

  return {
    ...paginationData,
    setPage,
    setSize,
    setItems,
    reset,
  }
}
