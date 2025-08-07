import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Color } from '../../common/enum/color.enum';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import { ChatMessageDTO } from '../../model/dto/ChatMessage.dto';
import ChatMessageBox from './ChatMessageBox';
import { Client } from '@stomp/stompjs';
import { fetchChatMessageList } from '../../controller/chatMessage/chatMessage';
import { useDispatch, useSelector } from 'react-redux';

const ChatRoom: React.FC = () => {
  let [chatMessages, setChatMessages] = useState<ChatMessageDTO[]>([]);
  const stompClientRef = useRef<any>(null);
  const chatRoom = useSelector((state: any) => state.chatRoom);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  let [friendId, setFriendId] = useState<string>('');
  let [friendName, setFriendName] = useState<string>('');
  let [isConnected, setIsConnected] = useState<boolean>(false);
  let [content, setContent] = useState<string>('');

  const fetchChatMessages = async (page: number, pageSize: number, friendId: string) => {
    const chatMessages: ChatMessageDTO[] = await fetchChatMessageList(page, pageSize, friendId);
    setChatMessages([]);
    setChatMessages((prevMessages) => [...prevMessages, ...chatMessages]);
  };

  useEffect(() => {
    if (chatRoom) {
      fetchChatMessages(0, 9999, chatRoom.friendId);
    }
  }, [chatRoom, dispatch]);

  useEffect(() => {
    setFriendId(chatRoom.friendId);
    setFriendName(chatRoom.friendName);
    fetchChatMessages(0, 9999, chatRoom.friendId);

    if (!isConnected) {
      const accessToken = localStorage.getItem('accessToken');
      const stompClient = new Client({
        brokerURL: import.meta.env.VITE_WS_ENDPOINT,
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
      });

      stompClient.onConnect = async () => {
        stompClient.subscribe('/user/queue/messages', async (message) => {
          console.log('Received message: ' + message.body);
          const newChatMessage: ChatMessageDTO = JSON.parse(message.body);
          if (newChatMessage) setChatMessages((prevMessages) => [newChatMessage, ...prevMessages]);
        });
      };

      stompClient.onStompError = function (frame: any) {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      };

      stompClientRef.current = stompClient;
      stompClient.activate();
      setIsConnected(true);
    }
  }, []);

  const sendMessage = () => {
    if (stompClientRef.current) {
      const newChatMessage = {
        receiverId: friendId,
        content: content,
        timestamp: new Date(),
        isRead: false,
      } as ChatMessageDTO;

      stompClientRef.current.publish({
        destination: '/app/chat',
        body: JSON.stringify(newChatMessage),
      });
      setChatMessages((prevMessages) => [newChatMessage, ...prevMessages]);
      setContent('');
    } else {
      console.log('Stomp client is not connected');
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100vh',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '5rem',
            padding: '1rem 2rem',
            borderBottom: `1px solid ${Color.DARKGREY}`,
          }}
        >
          <Typography variant="h5" color="black" mx={'2rem'}>
            {friendName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column-reverse',
            height: '75vh',
            overflow: 'auto',
            width: '100%',
          }}
          py={'3rem'}
        >
          {chatMessages.map((chatMessage) => (
            <ChatMessageBox key={Math.random()} chatMessage={chatMessage} />
          ))}
        </Box>
        <Box
          sx={{
            width: '90%',
            padding: '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Chat..."
            sx={{
              width: '90%',
              padding: '0.25rem 1rem',
              backgroundColor: Color.LIGHTGREY,
              borderRadius: '2rem',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
            }}
            size="small"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={async (e) => {
              if (content !== '' && e.key === 'Enter') {
                sendMessage();
                e.preventDefault(); // Prevent default form submission
              }
            }}
          />
          <IconButton
            sx={{ mx: '1rem' }}
            onClick={() => {
              if (content !== '') sendMessage();
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default ChatRoom;
