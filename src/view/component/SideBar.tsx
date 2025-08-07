import { Box, IconButton, List, ListItem } from '@mui/material';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { Color } from '../../common/enum/color.enum';
import { useState } from 'react';
import FriendInvitationListModal from './FriendInvitationModal';

const Sidebar = () => {
  let [openFriendInvitationListModal, setOpenFriendInvitationListModal] = useState<boolean>(false);

  return (
    <Box
      sx={{
        width: { lg: '5vw', md: '10vw', sm: '10vw', xs: '15vw' },
        height: '100vh',
        backgroundColor: Color.GREYBLUE,
        color: 'white',
        borderRadius: '0 0.25rem 0.25rem 0',
      }}
    >
      <FriendInvitationListModal
        openFriendInvitationListModal={openFriendInvitationListModal}
        setOpenFriendInvitationListModal={setOpenFriendInvitationListModal}
      />
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          padding: '1.25rem 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ListItem
            alignItems="center"
            sx={{
              marginBottom: '1rem',
              justifyContent: 'center',
            }}
          >
            <IconButton>
              <ViewHeadlineIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
          </ListItem>
          <ListItem
            alignItems="center"
            sx={{
              marginBottom: '1rem',
              justifyContent: 'center',
            }}
          >
            <IconButton>
              <ChatIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
          </ListItem>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            my: '1.25rem',
          }}
        >
          <ListItem
            alignItems="center"
            sx={{
              marginBottom: '1rem',
              justifyContent: 'center',
            }}
          >
            <IconButton onClick={() => setOpenFriendInvitationListModal(true)}>
              <PeopleAltIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
          </ListItem>
          <ListItem
            alignItems="center"
            sx={{
              marginBottom: '1rem',
              justifyContent: 'center',
            }}
          >
            <IconButton>
              <SettingsIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
          </ListItem>
        </Box>
      </List>
    </Box>
  );
};

export default Sidebar;
