import { Country } from '@faf-cars/lib/country';
import { PaginatedResponse } from '@faf-cars/lib/pagination';
import { BaseHttpService } from '@faf-cars/services/http/base-http-service';

export class CountryHttpService extends BaseHttpService {
  async list(params?: object): Promise<PaginatedResponse<Country>> {
    const res = await this.client.get<PaginatedResponse<Country>>('country', {
      params,
    });
    return res.data;
  }

  async count(): Promise<number> {
    const res = await this.client.get<number>('country/count');
    return res.data;
  }
}
