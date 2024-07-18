import { BaseHttpService } from '@faf-cars/services/http/base-http-service';

export class BrandHttpService extends BaseHttpService {
  async listModels(brandName: string, params?: object): Promise<string[]> {
    const res = await this.client.get<string[]>('model', {
      params: {
        brandName,
        ...params,
      },
    });
    return res.data;
  }

  async list(params?: object): Promise<string[]> {
    const res = await this.client.get<string[]>('brand', {
      params,
    });
    return res.data;
  }
}
