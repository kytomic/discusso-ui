import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Color } from "../../common/enum/color.enum";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import InviteFriendModal from "./InviteFriendModal";
import { fetchLatestChatMessageList } from "../../controller/chatMessage/chatMessage";
import { LatestChatMessageDTO } from "../../model/dto/LatestChatMessage.dto";
import LatestChatMessageItem from "./item/LatestChatRecordItem";
import { fetchFriendRelationWithNoMessages } from "../../controller/friend/friend";
import { set } from "react-hook-form";
import { useSelector } from "react-redux";

const LatestChatList = () => {
  const user = useSelector((state: any) => state.user);
  let [search, setSearch] = useState<string>("");
  let [clickedId, setClickedId] = useState<string>("");
  let [openInviteModal, setOpenInviteModal] = useState<boolean>(false);
  let [latestChatMessages, setLatestChatMessages] = useState<
    LatestChatMessageDTO[]
  >([]);

  useEffect(() => {
    fetchLatestChatMessages();
  }, []);

  const fetchLatestChatMessages = async () => {
    const data = await fetchLatestChatMessageList(0, 9999, search);
    setLatestChatMessages(data);
    const newChatFriendList = await fetchFriendRelationWithNoMessages(
      0,
      9999,
      search
    );
    const mockedChatMessages: LatestChatMessageDTO[] = newChatFriendList.map(
      (item) => ({
        id: item.id + Math.random().toString(36).substring(2, 15),
        senderId: item.userId1,
        receiverId: item.userId2,
        senderName: item.friendName,
        content: "New Chat",
        timestamp: undefined,
        isRead: false,
      })
    );
    if (mockedChatMessages.length > 0)
      setLatestChatMessages((prevMessages) => [
        ...prevMessages,
        ...mockedChatMessages,
      ]);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          width: {
            lg: "30vw",
            md: "40vw",
            sm: "45vw",
            xs: "45vw",
          },
          backgroundColor: Color.LIGHTBLUE,
          padding: "1.5rem 1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            mb: "1.25rem",
          }}
        >
          <Typography variant="h5" color="black">
            Chat
          </Typography>
          <IconButton onClick={() => setOpenInviteModal(true)}>
            <AddIcon />
          </IconButton>
          <InviteFriendModal
            openInviteModal={openInviteModal}
            setOpenInviteModal={setOpenInviteModal}
          />
        </Box>
        <TextField
          variant="outlined"
          sx={{
            width: "90%",
            backgroundColor: Color.GREYBLUE,
            borderRadius: "0.5rem",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
          }}
          size="small"
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    sx={{ padding: "0rem" }}
                    onClick={() => fetchLatestChatMessages()}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          onChange={(e) => {
            setSearch(e.target.value);
            fetchLatestChatMessages();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchLatestChatMessages();
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "75vh",
            overflow: "auto",
            width: "95%",
          }}
          py={"1rem"}
        >
          {latestChatMessages?.length > 0 ? (
            latestChatMessages.map((chatMessage) => (
              <LatestChatMessageItem
                key={chatMessage.senderId}
                latestChatMessage={chatMessage}
                isClicked={clickedId === chatMessage.id}
                onClickedMessageId={(id: string) => {
                  setClickedId(id);
                }}
              />
            ))
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
};

export default LatestChatList;
