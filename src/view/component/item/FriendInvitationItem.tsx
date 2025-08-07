import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import type { FriendInvitationDTO } from '../../../model/dto/FriendInvitation.dto';
import { acceptFriendInvitation } from '../../../controller/friend/friend';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const FriendInvitationItem = ({
  dto,
  setIsAlertTrigger,
}: {
  dto: FriendInvitationDTO;
  setIsAlertTrigger: (open: boolean) => void;
}) => {
  const handleInvitation = async (isAccepted: boolean) => {
    try {
      await acceptFriendInvitation(dto.id, isAccepted);
      setIsAlertTrigger(true);
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h6" color="primary" sx={{ padding: '1rem' }}>
          {dto.invitedUserDisplayName}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            color="primary"
            onClick={() => handleInvitation(true)}
            sx={{ margin: '1rem', justifySelf: 'flex-end' }}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={() => handleInvitation(false)}
            sx={{ margin: '1rem', justifySelf: 'flex-end', color: 'red' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default FriendInvitationItem;
