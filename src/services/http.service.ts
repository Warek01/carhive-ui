import axios, { AxiosInstance } from 'axios'
import qs from 'qs'

import type { JwtResponse, LoginDto, RegisterDto } from '@/lib/auth'
import type { CreateListingDto, Listing } from '@/lib/listings'
import type { PaginatedResponse } from '@/lib/paginationData'
import type { UpdateUserDto, User } from '@/lib/user'
import { getUserRoles } from '@/lib/utils'

export default class HttpService {
  private readonly _axiosInstance: AxiosInstance

  constructor(token: string | null) {
    const headers: HeadersInit = {}

    if (token !== null) headers.Authorization = `Bearer ${token}`

    this._axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASENAME,
      timeout: 15_000,
      paramsSerializer: (params) => qs.stringify(params),
      headers,
    })
  }

  public async getListings(
    params: Object,
  ): Promise<PaginatedResponse<Listing>> {
    const { data } = await this._axiosInstance.get<PaginatedResponse<Listing>>(
      'listing',
      {
        method: 'GET',
        params,
      },
    )

    return data
  }

  public async createListing(createDto: CreateListingDto): Promise<void> {
    await this._axiosInstance.post('listing', createDto)
  }

  public async login(loginDto: LoginDto): Promise<JwtResponse> {
    const res = await this._axiosInstance.post('auth/login', loginDto)
    return res.data
  }

  public async register(registerDto: RegisterDto): Promise<JwtResponse> {
    const res = await this._axiosInstance.post('auth/register', registerDto)
    return res.data
  }

  public async refresh(jwtRes: JwtResponse): Promise<JwtResponse> {
    const res = await this._axiosInstance.post<JwtResponse>(
      'auth/refresh',
      jwtRes,
    )
    return res.data
  }

  public async getUsers(params?: Object): Promise<PaginatedResponse<User>> {
    const res = await this._axiosInstance.get('user', { params })
    res.data.items.forEach((u: any) => (u.role = getUserRoles(u.role as any)))
    return res.data
  }

  public async updateUser(
    userId: string,
    updateDto: UpdateUserDto,
  ): Promise<PaginatedResponse<User>> {
    const res = await this._axiosInstance.patch(`user/${userId}`, updateDto)
    return res.data
  }

  public async deleteUser(userId: string): Promise<void> {
    const res = await this._axiosInstance.delete(`user/${userId}`)
    return res.data
  }
}
