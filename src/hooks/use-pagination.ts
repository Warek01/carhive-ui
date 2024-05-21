import { useCallback, useId } from 'react'
import { useSessionStorage } from 'usehooks-ts'

import type { PaginationData } from '@/lib/definitions'

const INITIAL: PaginationData = {
  page: 0,
  size: 10,
  count: 0,
  items: 0,
}

export default function usePagination(key?: string) {
  const id = useId()
  const [paginationData, setPaginationData] = useSessionStorage<PaginationData>(
    key ?? id,
    INITIAL,
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
    setPaginationData(INITIAL)
  }, [])

  return {
    ...paginationData,
    setPage,
    setSize,
    setItems,
    reset,
  }
}
