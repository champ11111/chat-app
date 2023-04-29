import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity()
export class ReaderMessageRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => User, (user) => user.readerMessageRelations,
    {onDelete: 'CASCADE'})
  reader: User;

  @ManyToOne(
    () => Message, (message) => message.readerMessageRelations,
    {onDelete: 'CASCADE'})
  message: Message;
}
