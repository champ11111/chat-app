// import { Connection } from 'typeorm';
// import { Room } from './entities/room.entity';
// import { User } from './entities/user.entity';
// import { UserRoomRelation } from './entities/user-room-relation.entity';
// import { Message, MessageTypes } from './entities/message.entity';
// import { ReaderMessageRelation } from './entities/reader-message-relation.entity';

// export default async function seedDatabase(
//   connection: Connection,
// ): Promise<void> {
//   // Create some users
//   const users = await connection.getRepository(User).save([
//     { username: 'John', email: 'john@example.com', password: 'password' },
//     { username: 'Jane', email: 'jane@example.com', password: 'password' },
//   ]);

//   // Create some rooms
//   const rooms = await connection.getRepository(Room).save([
//     {
//       name: 'Room 1',
//       isGroupChat: false,
//       lastMessage: 'Hello',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       name: 'Room 2',
//       isGroupChat: false,
//       lastMessage: 'Hi',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       name: 'Group 1',
//       isGroupChat: true,
//       lastMessage: 'Welcome!',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   ]);

//   // Create user-room relations
//   await connection.getRepository(UserRoomRelation).save([
//     { user: users[0], room: rooms[0] },
//     { user: users[1], room: rooms[0] },
//     { user: users[0], room: rooms[1] },
//     { user: users[1], room: rooms[2] },
//   ]);

//   // Create some messages
//   const messages = await connection.getRepository(Message).save([
//     {
//       content: 'Hello John',
//       type: MessageTypes.TEXT,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       sender: users[1],
//       room: rooms[0],
//     },
//     {
//       content: 'Hi Jane',
//       type: MessageTypes.TEXT,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       sender: users[0],
//       room: rooms[0],
//     },
//     {
//       content: 'Welcome everyone!',
//       type: MessageTypes.TEXT,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       sender: users[0],
//       room: rooms[2],
//     },
//   ]);

//   // Create reader-message relations
//   await connection.getRepository(ReaderMessageRelation).save([
//     { reader: users[0], message: messages[0] },
//     { reader: users[1], message: messages[1] },
//     { reader: users[0], message: messages[2] },
//     { reader: users[1], message: messages[2] },
//   ]);
// }
