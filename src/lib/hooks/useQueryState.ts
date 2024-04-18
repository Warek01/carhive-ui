import { useLocation, useSearchParams } from 'react-router-dom'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useQueryState = <T>(
  name: string,
  initialValue: T,
): [get: T, set: Dispatch<SetStateAction<T>>] => {
  const location = useLocation()

  const [get, set] = useState<T>(() => {
    const searchParams = new URLSearchParams(location.search)
    const value = searchParams.get(name)
    return value === null ? initialValue : JSON.parse(value)
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set(name, JSON.stringify(get))
    const newSearch = searchParams.toString()
    const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`
    window.history.replaceState({ path: newUrl }, '', newUrl)
  }, [get, name, location.pathname])

  return [get, set]
}
