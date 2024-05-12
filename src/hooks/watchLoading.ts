import { useEffect } from 'react'

import { useLoading } from './index'

const watchLoading = (...values: boolean[]) => {
  const { unsetLoading, setLoading } = useLoading()

  useEffect(() => {
    let loading = false

    for (const v of values) {
      if (v) {
        loading = true
        break
      }
    }

    loading ? setLoading() : unsetLoading()
  }, values)
}

export default watchLoading
