import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { FontColor, Color } from "../../common/enum/color.enum";
import { ChatMessageDTO } from "../../model/dto/ChatMessage.dto";
import { convertTimestamp } from "../../common/util/transform.util";

interface ChatMessageBoxProps {
  chatMessage: ChatMessageDTO;
}

const ChatMessageBox: React.FC<ChatMessageBoxProps> = ({ chatMessage }) => {
  const user = useSelector((state: any) => state.user);
  const isUserMessage: boolean = chatMessage.receiverId !== user?.userId;
  const fontColor: string = isUserMessage
    ? FontColor.DARKGREY
    : FontColor.WHITE;
  const backgroundColor: string = isUserMessage
    ? Color.LIGHTGREY
    : Color.DARKBLUE;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        backgroundColor,
        borderRadius: "10px",
        alignSelf: isUserMessage ? "flex-end" : "flex-start",
        flexWrap: "revert",
      }}
      px={3}
      mx={"5rem"}
      my={"1rem"}
    >
      <Typography
        color={fontColor}
        fontSize="1.05rem"
        py={2}
        sx={{ marginRight: "2rem" }}
      >
        {chatMessage.content}
      </Typography>
      <Typography color={fontColor} py={1} fontSize={"0.75rem"}>
        {convertTimestamp(chatMessage.timestamp)}
      </Typography>
    </Box>
  );
};

export default ChatMessageBox;
