import { UserRole } from '../enums/user-role.enum';

export interface AuthPayload {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}
