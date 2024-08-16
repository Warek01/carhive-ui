import { CreateListingDto, ListingDto } from '@carhive/lib/listing';
import { PaginatedResponse } from '@carhive/lib/pagination';
import {
  MarketStatistics,
  MarketStatisticsQuery,
} from '@carhive/lib/statistics';
import { objectToFormData } from '@carhive/lib/utils';
import { BaseHttpService } from '@carhive/services/http/base-http-service';

export class ListingHttpService extends BaseHttpService {
  async list(params?: object): Promise<PaginatedResponse<ListingDto>> {
    const { data } = await this.client.get<PaginatedResponse<ListingDto>>(
      'listing',
      {
        params,
      },
    );

    return data;
  }

  async find(id: string, params?: object): Promise<ListingDto> {
    const { data } = await this.client.get<ListingDto>(`listing/${id}`, {
      params,
    });

    return data;
  }

  async create(data: CreateListingDto, params?: object): Promise<void> {
    await this.client.postForm<void>('listing', objectToFormData(data), {
      params,
    });
  }

  async addToFavorites(id: string): Promise<void> {
    await this.client.post(`listing/${id}/add-to-favorites`);
  }

  async removeFromFavorites(id: string): Promise<void> {
    await this.client.post(`listing/${id}/remove-from-favorites`);
  }

  async incrementViews(id: string): Promise<void> {
    await this.client.post(`listing/${id}/increment-views`);
  }

  async setStatusSold(id: string): Promise<void> {
    await this.client.post(`listing/${id}/set-status-sold`);
  }

  async setStatusDeleted(id: string): Promise<void> {
    await this.client.post(`listing/${id}/set-status-deleted`);
  }

  async setStatusBlocked(id: string): Promise<void> {
    await this.client.post(`listing/${id}/set-status-blocked`);
  }

  async setStatusAvailable(id: string): Promise<void> {
    await this.client.post(`listing/${id}/set-status-available`);
  }

  async getStats(
    params: MarketStatisticsQuery,
    additionalParams?: object,
  ): Promise<MarketStatistics> {
    const res = await this.client.get<MarketStatistics>('statistics/market', {
      params: {
        ...params,
        ...additionalParams,
      },
    });
    return res.data;
  }

  async count(): Promise<number> {
    const res = await this.client.get<number>('listing/count');
    return res.data;
  }
}
