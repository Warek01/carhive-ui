import { BaseHttpService } from '@faf-cars/services/http/base-http-service';

export class CityHttpService extends BaseHttpService {
  async count(): Promise<number> {
    const res = await this.client.get<number>('city/count');
    return res.data;
  }
}
