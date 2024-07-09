export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  roles: UserRole[] | null;
  createdAt: string | null;
}

export interface UpdateUserDto {
  username: string;
  email: string;
  roles: UserRole[];
}

/** Creation of user by admin */
export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
  roles: UserRole[];
}

export const enum UserRole {
  Admin = 'Admin',
  ListingCreator = 'ListingCreator',
}
