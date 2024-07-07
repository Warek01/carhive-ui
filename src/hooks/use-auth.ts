import { useContext } from 'react'

import AuthContext from '@faf-cars/context/auth.context'

export default function useAuth() {
  return useContext(AuthContext)
}
