import { USER_ROLE_STRING_MAP, UserRole } from '@/lib/user'

export default function getUserRoles(
  role: string | string[] | undefined | null,
): UserRole[] {
  let arr: string[] = []

  if (typeof role === 'string' && role.length) arr = [role]
  else if (typeof role === 'object' && Array.isArray(role)) arr = role

  return arr.map((r) => USER_ROLE_STRING_MAP[r])
}
