import axios, { AxiosInstance } from 'axios'

import type { PaginatedResponse, Pagination } from '@/lib/definitions.ts'
import type { CreateListingDto, Listing } from '@/lib/listings.ts'
import type { JwtResponse, LoginDto, RegisterDto } from '@/lib/auth.ts'
import LocalStorageKey from '@/lib/LocalStorageKey.ts'

export default class HttpService {
  private readonly _axiosInstance: AxiosInstance

  constructor() {
    const headers: HeadersInit = {}

    const authToken = localStorage.getItem(LocalStorageKey.AUTH_TOKEN)
    if (authToken?.length) headers.Authorization = `Bearer ${authToken}`

    this._axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 15_000,
      headers,
    })
  }

  public async getListings({
    page = 0,
    take = 10,
  }: Partial<Pagination> = {}): Promise<PaginatedResponse<Listing>> {
    const { data } = await this._axiosInstance.get<PaginatedResponse<Listing>>(
      'listing',
      {
        method: 'GET',
        params: { page, take },
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
}
