import { UserRole } from '@/lib/user'

export default function getUserRoles(
  roles: string | string[] | undefined | null,
): UserRole[] {
  if (!roles) return []
  return (typeof roles === 'string' ? [roles] : roles) as UserRole[]
}
