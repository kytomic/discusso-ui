export class FriendInvitationDTO {
  id: string;
  requestUserId: string;
  invitedUserId: string;
  invitedUserDisplayName: string;
  timestamp: Date;
  isAccepted: boolean;
  isPending: boolean;

  constructor(
    id: string,
    requestUserId: string,
    invitedUserId: string,
    invitedUserDisplayName: string,
    timestamp: Date,
    isAccepted: boolean,
    isPending: boolean,
  ) {
    this.id = id;
    this.requestUserId = requestUserId;
    this.invitedUserId = invitedUserId;
    this.invitedUserDisplayName = invitedUserDisplayName;
    this.timestamp = timestamp;
    this.isAccepted = isAccepted;
    this.isPending = isPending;
  }
}
