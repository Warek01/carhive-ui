export interface User {
  id: string
  username: string
  email: string
  roles: UserRole[]
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
  USER,
  ADMIN,
  SELF_DELETE,
  CREATE_LISTING,
  REMOVE_LISTING,
}

export const USER_ROLE_STRING_MAP: Record<string, UserRole> = {
  User: UserRole.USER,
  Admin: UserRole.ADMIN,
  SelfDelete: UserRole.SELF_DELETE,
  CreateListing: UserRole.CREATE_LISTING,
  RemoveListing: UserRole.REMOVE_LISTING,
}
