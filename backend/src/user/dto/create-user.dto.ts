import { User } from 'src/entities';

export class CreateUserDto implements Partial<Omit<User, 'id'>> {
  profilePictureUrl: string;
  username: string;
  email: string;
  password: string;
}
