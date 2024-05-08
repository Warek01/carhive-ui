import axios, { AxiosInstance } from 'axios'

import type { PaginatedResponse, Pagination } from '@/lib/definitions.ts'
import { CreateListingDto, Listing } from '@/lib/listings.ts'

export default class HttpService {
  private static _instance: HttpService
  private readonly _axiosInstance: AxiosInstance

  constructor() {
    this._axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 15_000,
      headers: {},
    })
  }

  public static getSingleton(): HttpService {
    if (!this._instance) this._instance = new HttpService()

    return this._instance
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
}
