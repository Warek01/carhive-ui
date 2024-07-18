import { Country } from '@faf-cars/lib/country';
import { BaseHttpService } from '@faf-cars/services/http/base-http-service';

export class CountryHttpService extends BaseHttpService {
  async list(params?: object): Promise<Country[]> {
    const res = await this.client.get<Country[]>('country', {
      params,
    });
    return res.data;
  }

  async count(): Promise<number> {
    const res = await this.client.get<number>('country/count');
    return res.data;
  }
}
