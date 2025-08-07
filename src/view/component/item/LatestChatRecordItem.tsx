import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Color, FontColor } from "../../../common/enum/color.enum";
import type { LatestChatMessageDTO } from "../../../model/dto/LatestChatMessage.dto";
import { convertTimestamp } from "../../../common/util/transform.util";
import { setChatRoomInfo } from "../../../slice/chatRoom.slice";

interface LatestChatMessageItemProps {
  latestChatMessage: LatestChatMessageDTO;
  isClicked: boolean;
  onClickedMessageId: (messageId: string) => void;
}

const LatestChatMessageItem: React.FC<LatestChatMessageItemProps> = ({
  latestChatMessage,
  isClicked,
  onClickedMessageId,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const backgroundColor = isClicked ? Color.GREYBLUE : Color.LIGHTBLUE;

  const displayChatroom = () => {
    console.log("clicked chatroom");
    const senderId: string = latestChatMessage.senderId;
    const receiverId: string = latestChatMessage.receiverId;
    const friendId: string = user.userId === senderId ? receiverId : senderId;
    onClickedMessageId(latestChatMessage.id);

    dispatch(
      setChatRoomInfo({
        friendId: friendId,
        friendName: latestChatMessage.senderName,
        clickedMessageId: latestChatMessage.id,
      })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor,
        padding: "1rem 2rem",
        borderRadius: "1rem",
      }}
      py={"1rem"}
      my={"0.75rem"}
      onClick={displayChatroom}
    >
      <Typography
        fontSize={"1.25rem"}
        color={FontColor.DARKGREY}
        fontWeight={600}
      >
        {latestChatMessage.senderName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0rem 0.25rem",
        }}
      >
        <Typography fontSize={"1rem"} color={FontColor.DARKGREY}>
          {latestChatMessage.content}
        </Typography>
        <Typography fontSize={"0.8rem"} color={FontColor.DARKGREY}>
          {latestChatMessage.timestamp
            ? convertTimestamp(latestChatMessage.timestamp)
            : ""}
        </Typography>
      </Box>
    </Box>
  );
};

export default LatestChatMessageItem;
