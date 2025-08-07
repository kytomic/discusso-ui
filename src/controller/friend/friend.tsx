import axios from "axios";
import axiosInstance from "../../common/config/axiosInstance";
import { FriendInvitationDTO } from "../../model/dto/FriendInvitation.dto";
import { FriendRelationDTO } from "../../model/dto/FriendRelation.dto";

export async function createFriendInvitation(
  invitedUserDisplayName: string
): Promise<void> {
  try {
    const response = await axiosInstance.post(
      "/friend/invite",
      { invitedUserDisplayName },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.status === 200)
      console.log("Friend invitation sent successfully: ", response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "Friend invitation sent error: " +
          (error.response?.data?.message || error.message)
      );
    } else {
      throw new Error("Friend invitation sent error: " + error);
    }
  }
}

export async function fetchFriendInvitationList(
  page: number,
  pageSize: number
): Promise<{ totalCount: number; data: FriendInvitationDTO[] }> {
  try {
    const response = await axiosInstance.get("/friend/pendingInvitations", {
      params: { page, pageSize },
    });

    if (response.status === 200)
      console.log(
        "Fetching friend invitation list successfully: ",
        response.data
      );

    const totalCount: number = response.data?.totalCount;
    const result: FriendInvitationDTO[] =
      response.data?.pendingInvitations?.map(
        (item: any) =>
          new FriendInvitationDTO(
            item.id,
            item.requestUserId,
            item.invitedUserId,
            item.invitedUserDisplayName,
            new Date(item.timestamp),
            item.isAccepted,
            item.isPending
          )
      );

    return { totalCount, data: result || [] };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "Fetching friend invitation list error: " +
          (error.response?.data?.message || error.message)
      );
    } else {
      throw new Error("Fetching friend invitation error: " + error);
    }
  }
}

export async function acceptFriendInvitation(
  invitationId: string,
  isAccepted: boolean
): Promise<void> {
  try {
    const response = await axiosInstance.put(
      `/friend/acceptInvitation/${invitationId}`,
      { isAccepted },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.status === 200)
      console.log("Friend invitation sent successfully: ", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "Accept friend invitation error: " +
          (error.response?.data?.message || error.message)
      );
    } else {
      throw new Error("Accept friend invitation error: " + error);
    }
  }
}

export async function fetchFriendRelationWithNoMessages(
  page: number,
  pageSize: number,
  search: string
): Promise<FriendRelationDTO[]> {
  try {
    const response = await axiosInstance.get("/friend/noMessages", {
      params: { page, pageSize, search },
    });

    if (response.status === 200)
      console.log(
        "Fetching friend relation list with no messages successfully: ",
        response.data
      );

    const result: FriendRelationDTO[] = response.data?.data?.map(
      (item: any) =>
        new FriendRelationDTO(
          item.id,
          item.userId1,
          item.userId2,
          item.friendName,
          item.invitationId
        )
    );

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "Fetching friend relation list with no messages error: " +
          (error.response?.data?.message || error.message)
      );
    } else {
      throw new Error(
        "Fetching friend relation list with no messages error: " + error
      );
    }
  }
}
