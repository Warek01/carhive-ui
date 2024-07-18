import { PaginatedResponse } from '@faf-cars/lib/pagination';
import { CreateUserDto, UpdateUserDto, User } from '@faf-cars/lib/user';
import { BaseHttpService } from '@faf-cars/services/http/base-http-service';

export class UserHttpService extends BaseHttpService {
  async find(userId: string, params?: object): Promise<User> {
    const res = await this.client.get<User>('user/' + userId, {
      params,
    });
    return res.data;
  }

  async list(params?: object): Promise<PaginatedResponse<User>> {
    const res = await this.client.get<PaginatedResponse<User>>('user', {
      params,
    });
    return res.data;
  }

  async update(
    userId: string,
    updateDto: UpdateUserDto,
    params?: object,
  ): Promise<PaginatedResponse<User>> {
    const res = await this.client.patch<PaginatedResponse<User>>(
      `user/${userId}`,
      updateDto,
      { params },
    );
    return res.data;
  }

  async delete(userId: string, params?: object): Promise<void> {
    const res = await this.client.delete<void>(`user/${userId}`, {
      params,
    });
    return res.data;
  }

  async create(createDto: CreateUserDto, params?: object): Promise<void> {
    const res = await this.client.post<void>('user', createDto, {
      params,
    });
    return res.data;
  }
}
