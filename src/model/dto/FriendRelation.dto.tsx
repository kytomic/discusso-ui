export class FriendRelationDTO {
  id: string;
  userId1: string;
  userId2: string;
  friendName: string;
  invitationId: string;

  constructor(
    id: string,
    userId1: string,
    userId2: string,
    friendName: string,
    invitationId: string,
  ) {
    this.id = id;
    this.userId1 = userId1;
    this.userId2 = userId2;
    this.friendName = friendName;
    this.invitationId = invitationId;
  }
}
