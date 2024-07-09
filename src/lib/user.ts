export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  roles: UserRole[] | null;
  createdAt: string | null;
}

export interface UpdateUser {
  username: string;
  email: string;
  roles: UserRole[];
}

/** Creation of user by admin */
export interface CreateUser {
  username: string;
  password: string;
  email: string;
  roles: UserRole[];
}

export enum UserRole {
  Admin,
  ListingCreator,
}
