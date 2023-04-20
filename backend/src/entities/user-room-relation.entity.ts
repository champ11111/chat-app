import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Room } from './room.entity';

@Entity()
export class UserRoomRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userRoomRelations)
  user: User;

  @ManyToOne(() => Room, (room) => room.userRoomRelations)
  room: Room;
}
