export class ChatMessageDTO {
  id?: string;
  senderId?: string;
  receiverId: string;
  friendName?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;

  constructor(
    id: string,
    senderId: string,
    receiverId: string,
    friendName: string,
    content: string,
    timestamp: Date,
    isRead: boolean,
  ) {
    this.id = id;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.friendName = friendName;
    this.content = content;
    this.timestamp = timestamp || new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
    this.isRead = isRead || false;
  }
}
