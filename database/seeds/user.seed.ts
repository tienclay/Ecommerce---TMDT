import { User } from '@entities';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as userData from './jsons/user.json';
import { PhoneCode, UserRole, UserStatus } from '@enums';
import { hashPassword } from '@utils';

export default class UserSeed implements Seeder {
  private async createUser(appDataSource: DataSource): Promise<any> {
    const adminData = userData.admin;

    const UserData = userData.client;

    const adminInput = await Promise.all(
      adminData.map(async (admin) => {
        return {
          ...admin,
          password: await hashPassword(admin.password),
          role: UserRole.ADMIN,
          phoneCode: PhoneCode[`${admin.phoneCode}`],
          status: UserStatus.ACTIVE,
        };
      }),
    );

    const userInput = await Promise.all(
      UserData.map(async (user) => {
        return {
          ...user,
          password: await hashPassword(user.password),
          role: UserRole.CLIENT,
          phoneCode: PhoneCode[`${user.phoneCode}`],
          status: UserStatus.ACTIVE,
        };
      }),
    );

    try {
      await appDataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([...adminInput, ...userInput])
        .execute();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async run(appDataSource: DataSource): Promise<any> {
    try {
      await this.createUser(appDataSource);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
