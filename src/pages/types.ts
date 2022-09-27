export interface IData {
  currentUser: IUser;
  comments: IComment[];
}

export interface IUser {
  username: string;
  image: { png: string; webp: string };
}

export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: IUser;
  replies?: IComment[];
  replyingTo?: string;
  isOnReply?: boolean;
  isOnEdit?: boolean;
}
