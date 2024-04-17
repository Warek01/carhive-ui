import { useSearchParams } from 'react-router-dom'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useQueryState = <T>(
  name: string,
  initialValue: T,
): [get: T, set: Dispatch<SetStateAction<T>>] => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [get, set] = useState<T>(() => {
    const value = searchParams.get(name)
    return value === null ? initialValue : JSON.parse(value)
  })

  useEffect(() => {
    setSearchParams((p) => ({ ...p, [name]: JSON.stringify(get) }))
  }, [get])

  return [get, set]
}
