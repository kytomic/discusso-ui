import axios from 'axios';
import axiosInstance from '../../common/config/axiosInstance';
import { LatestChatMessageDTO } from '../../model/dto/LatestChatMessage.dto';
import { ChatMessageDTO } from '../../model/dto/ChatMessage.dto';

export async function fetchLatestChatMessageList(
  page: number,
  pageSize: number,
  search: string,
): Promise<LatestChatMessageDTO[]> {
  try {
    const response = await axiosInstance.get(`/chat/latest`, {
      params: { page, pageSize, search },
    });

    if (response.status === 200)
      console.log('Get latest chat message successfully: ', response.data);

    const result: LatestChatMessageDTO[] = response.data?.data.map(
      (item: any) =>
        new LatestChatMessageDTO(
          item.id,
          item.senderId,
          item.receiverId,
          item.senderName,
          item.content,
          new Date(item.timestamp),
          item.isRead,
        ),
    );
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        'Get latest chat message error: ' + (error.response?.data?.message || error.message),
      );
    } else {
      throw new Error('Get latest chat message error: ' + error);
    }
  }
}

export async function fetchChatMessageList(
  page: number,
  pageSize: number,
  friendId: string,
): Promise<ChatMessageDTO[]> {
  try {
    const response = await axiosInstance.get(`/chat`, {
      params: { page, pageSize, friendId },
    });

    if (response.status === 200) console.log('Get chat message successfully: ', response.data);

    const result: ChatMessageDTO[] = response.data?.data.map(
      (item: any) =>
        new ChatMessageDTO(
          item.id,
          item.senderId,
          item.receiverId,
          item.friendName,
          item.content,
          new Date(item.timestamp),
          item.isRead,
        ),
    );
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        'Get chat message error: ' + (error.response?.data?.message || error.message),
      );
    } else {
      throw new Error('Get chat message error: ' + error);
    }
  }
}
