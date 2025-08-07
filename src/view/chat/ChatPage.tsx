import { Box } from '@mui/material';
import Sidebar from '../component/SideBar';
import LatestChatList from '../component/LatestChatList';
import ChatRoom from '../component/ChatRoom';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const friendId = useSelector((state: any) => state.chatRoom.friendId);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Sidebar />
        <LatestChatList />
        {friendId ? <ChatRoom /> : <></>}
      </Box>
    </>
  );
};

export default ChatPage;
