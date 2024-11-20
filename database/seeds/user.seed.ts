import { Profile, User } from '@entities';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as userData from './jsons/user.json';
import { PhoneCode, UserRole, UserStatus } from '@enums';
import { hashPassword } from '@utils';

export default class UserSeed implements Seeder {
  private async createUser(appDataSource: DataSource): Promise<any> {
    const adminData = userData.admin;
    const UserData = userData.student;
    const tutorData = userData.tutor;

    const createUserEntity = async (data: any, role: UserRole) => {
      const user = new User();
      const profile = new Profile();

      // Set profile data
      profile.avatar = data.avatar;
      profile.firstName = data.firstName;
      profile.lastName = data.lastName;
      profile.phoneCode = data.phoneCode as PhoneCode;
      profile.phoneNumber = data.phoneNumber;

      // Set user data
      user.username = data.username;
      user.email = data.email;
      user.password = await hashPassword(data.password);
      user.role = role;
      user.status = UserStatus.ACTIVE;
      user.profile = profile;

      return user;
    };

    const adminInput = await Promise.all(
      adminData.map((admin) => createUserEntity(admin, UserRole.ADMIN)),
    );

    const userInput = await Promise.all(
      UserData.map((user) => createUserEntity(user, UserRole.STUDENT)),
    );

    const tutorInput = await Promise.all(
      tutorData.map((tutor) => createUserEntity(tutor, UserRole.TUTOR)),
    );

    try {
      return await appDataSource
        .getRepository(User)
        .save([...adminInput, ...userInput, ...tutorInput]);
    } catch (error: any) {
      throw new Error(`Failed to seed users: ${error.message}`);
    }
  }

  public async run(appDataSource: DataSource): Promise<any> {
    try {
      return await this.createUser(appDataSource);
    } catch (error: any) {
      throw new Error(`Seeding failed: ${error.message}`);
    }
  }
}
