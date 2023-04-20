import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Room } from './room.entity';
import { ReaderMessageRelation } from './reader-message-relation.entity';

export enum MessageTypes {
  TEXT = 'text',
  IMAGE = 'image',
}

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column('enum', { enum: MessageTypes, default: MessageTypes.TEXT })
  type: MessageTypes;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => ReaderMessageRelation,
    (readerMessageRelation) => readerMessageRelation.message,
  )
  readerMessageRelations: ReaderMessageRelation[];

  @ManyToOne(() => User, (user) => user.messages)
  sender: User;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;
}
