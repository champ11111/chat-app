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
import { ReaderMessageRelation } from './reader-message-relation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    default: 'https://chapabc.s3.us-west-1.amazonaws.com/defaultProfile.jpeg',
  })
  profilePictureUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => UserRoomRelation,
    (userRoomRelation) => userRoomRelation.user,
    {onDelete: 'CASCADE'}
  )
  userRoomRelations: UserRoomRelation[];

  @OneToMany(
    () => Message, (message) => message.sender,
    {onDelete: 'CASCADE'})
  messages: Message[];

  @OneToMany(
    () => ReaderMessageRelation,
    (readerMessageRelation) => readerMessageRelation.reader,
    {onDelete: 'CASCADE'}
  )
  readerMessageRelations: ReaderMessageRelation[];
}
