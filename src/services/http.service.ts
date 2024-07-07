import axios, { AxiosInstance } from 'axios'
import qs from 'qs'

import type {
  CreateUserDto,
  JwtResponse,
  LoginDto,
  RegisterDto,
} from '@faf-cars/lib/auth'
import type {
  CreateListing,
  FavoriteListingAction,
  Listing,
} from '@faf-cars/lib/listings'
import type { PaginatedResponse } from '@faf-cars/lib/paginationData'
import type { UpdateUser, User } from '@faf-cars/lib/user'

export default class HttpService {
  private readonly _axiosInstance: AxiosInstance

  constructor(token: string | null) {
    const headers: HeadersInit = {}

    if (token !== null) headers.Authorization = `Bearer ${token}`

    this._axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASENAME,
      timeout: 15_000,
      paramsSerializer: (params) =>
        qs.stringify(params, {
          charset: 'utf-8',
          strictNullHandling: true,
          skipNulls: false,
        }),
      headers,
    })
  }

  public async getListings(
    params?: object,
  ): Promise<PaginatedResponse<Listing>> {
    const { data } = await this._axiosInstance.get<PaginatedResponse<Listing>>(
      'listing',
      {
        params,
      },
    )

    return data
  }

  public async getListingDetails(
    listingId: string,
    params?: object,
  ): Promise<Listing> {
    const { data } = await this._axiosInstance.get<Listing>(
      `listing/${listingId}`,
      {
        params,
      },
    )

    return data
  }

  public async mutateFavoriteListings(
    action: FavoriteListingAction,
    params?: object,
  ): Promise<void> {
    const { data } = await this._axiosInstance.post<void>(
      'listing/favorites',
      action,
      {
        params,
      },
    )

    return data
  }

  public async createListing(
    createDto: CreateListing,
    params?: object,
  ): Promise<void> {
    await this._axiosInstance.post<void>('listing', createDto, {
      params,
    })
  }

  public async login(
    loginDto: LoginDto,
    params?: object,
  ): Promise<JwtResponse> {
    const res = await this._axiosInstance.post<JwtResponse>(
      'auth/login',
      loginDto,
      { params },
    )
    return res.data
  }

  public async register(
    registerDto: RegisterDto,
    params?: object,
  ): Promise<JwtResponse> {
    const res = await this._axiosInstance.post<JwtResponse>(
      'auth/register',
      registerDto,
      { params },
    )
    return res.data
  }

  public async refresh(
    jwtRes: JwtResponse,
    params?: object,
  ): Promise<JwtResponse> {
    const res = await this._axiosInstance.post<JwtResponse>(
      'auth/refresh',
      jwtRes,
      { params },
    )
    return res.data
  }

  public async getUser(userId: string, params?: object): Promise<User> {
    const res = await this._axiosInstance.get<User>('user/' + userId, {
      params,
    })
    return res.data
  }

  public async getUsers(params?: object): Promise<PaginatedResponse<User>> {
    const res = await this._axiosInstance.get<PaginatedResponse<User>>('user', {
      params,
    })
    return res.data
  }

  public async updateUser(
    userId: string,
    updateDto: UpdateUser,
    params?: object,
  ): Promise<PaginatedResponse<User>> {
    const res = await this._axiosInstance.patch<PaginatedResponse<User>>(
      `user/${userId}`,
      updateDto,
      { params },
    )
    return res.data
  }

  public async deleteUser(userId: string, params?: object): Promise<void> {
    const res = await this._axiosInstance.delete<void>(`user/${userId}`, {
      params,
    })
    return res.data
  }

  public async createUser(
    createDto: CreateUserDto,
    params?: object,
  ): Promise<void> {
    const res = await this._axiosInstance.post<void>('user', createDto, {
      params,
    })
    return res.data
  }
}
