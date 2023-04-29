export class CreateRoomDto {
  name: string;
  isGroupChat: boolean;
  groupPictureUrl: string;
  userIds: number[];
}
