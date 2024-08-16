import { OauthIdentityProvider } from '@carhive/lib/auth';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  provider: OauthIdentityProvider | null;
  roles: UserRole[] | null;
  phoneNumber: string | null;
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

export enum UserRole {
  User,
  Admin,
  SuperAdmin,
}
