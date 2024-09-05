

export interface UserRoom{
  roomId: string;
  lastMessage: string;
  timeStamp: string;
  friendUid: string;
}
//collection users
export interface UserDb {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  friends: string[];
  rooms: UserRoom[];
}

export interface Message{
  message: string;
  timeStamp: string;
  userUid: string;
}
//collection rooms
export interface RoomDb {
  message: Message[];
  users: string[];
}

//simulacion de base de datos

