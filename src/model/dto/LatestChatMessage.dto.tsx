export class LatestChatMessageDTO {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  content: string;
  timestamp?: Date | undefined;
  isRead: boolean;

  constructor(
    id: string,
    senderId: string,
    receiverId: string,
    senderName: string,
    content: string,
    timestamp?: Date | undefined,
    isRead: boolean = false
  ) {
    this.id = id;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.senderName = senderName;
    this.content = content;
    this.timestamp = timestamp;
    this.isRead = isRead;
  }
}
