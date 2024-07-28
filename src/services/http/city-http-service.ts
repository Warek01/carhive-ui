import { CityQuery } from '@faf-cars/lib/city';
import { BaseHttpService } from '@faf-cars/services/http/base-http-service';

export class CityHttpService extends BaseHttpService {
  async count(): Promise<number> {
    const res = await this.client.get<number>('city/count');
    return res.data;
  }

  async list(params: CityQuery): Promise<string[]> {
    const res = await this.client.get<string[]>('city', {
      params,
    });
    return res.data;
  }
}
