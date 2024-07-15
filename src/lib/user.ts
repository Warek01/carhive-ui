export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  createdAt: string | null;
}

// How a user sees other users
export interface RegularUser extends User {}

// How admin sees other users
export interface UserAdminView extends User {
  roles: UserRole[];
}

// The authenticated user
export interface AuthenticatedUser extends User {
  roles: UserRoleAsString[];
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

export const enum UserRoleAsString {
  Admin = 'Admin',
  ListingCreator = 'ListingCreator',
}

export const enum UserRole {
  Admin,
  ListingCreator,
}
