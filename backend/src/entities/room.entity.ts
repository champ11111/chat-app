import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoomRelation } from './user-room-relation.entity';
import { Message } from './message.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isGroupChat: boolean;

  @Column()
  lastMessage: string;

  @Column({ nullable: true })
  groupPictureUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => UserRoomRelation,
    (userRoomRelation) => userRoomRelation.room,
  )
  userRoomRelations: UserRoomRelation[];

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
