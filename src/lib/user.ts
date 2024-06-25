export interface User {
  id: string
  username: string
  email: string
  roles: UserRole[]
  phone?: string
}

export interface UpdateUserDto {
  username: string
  email: string
  roles: UserRole[]
}

export interface CreateUserDto {
  username: string
  password: string
  email: string
  roles: UserRole[]
}

export enum UserRole {
  ADMIN,
  LISTING_CREATOR,
}

export const USER_ROLE_STRING_MAP: Record<string, UserRole> = {
  Admin: UserRole.ADMIN,
  ListingCreator: UserRole.LISTING_CREATOR,
}
