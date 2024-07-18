import { CreateListingDto, ListingDto } from '@faf-cars/lib/listings';
import { PaginatedResponse } from '@faf-cars/lib/pagination';
import {
  MarketStatistics,
  MarketStatisticsQuery,
} from '@faf-cars/lib/statistics';
import { objectToFormData } from '@faf-cars/lib/utils';
import { BaseHttpService } from '@faf-cars/services/http/base-http-service';

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

  async find(listingId: string, params?: object): Promise<ListingDto> {
    const { data } = await this.client.get<ListingDto>(`listing/${listingId}`, {
      params,
    });

    return data;
  }

  async create(data: CreateListingDto, params?: object): Promise<void> {
    await this.client.postForm<void>('listing', objectToFormData(data), {
      params,
    });
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
