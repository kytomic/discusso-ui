import {
  Modal,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import { Color } from '../../common/enum/color.enum';
import { useRef, useState } from 'react';
import { createFriendInvitation } from '../../controller/friend/friend';

const InviteFriendModal = ({
  openInviteModal,
  setOpenInviteModal,
}: {
  openInviteModal: boolean;
  setOpenInviteModal: (open: boolean) => void;
}) => {
  const [invitedUserDisplayName, setInviteUserDisplayName] = useState<string>('');
  const successfulAlertRef = useRef<HTMLDivElement>(null);

  const handleInvite = async () => {
    try {
      await createFriendInvitation(invitedUserDisplayName);
      if (successfulAlertRef.current) {
        successfulAlertRef.current.style.display = 'flex';
        setTimeout(() => {
          successfulAlertRef.current!.style.display = 'none';
          setOpenInviteModal(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };

  return (
    <>
      <Modal
        open={openInviteModal}
        onClose={() => setOpenInviteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Alert
            icon={<CheckIcon />}
            severity="success"
            ref={successfulAlertRef}
            sx={{
              position: 'absolute',
              width: '200px',
              top: '10%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'none',
            }}
          >
            Invited Successfully
          </Alert>
          <Box
            sx={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              bgcolor: 'background.paper',
              boxShadow: 24,
              gap: 2,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Invite to Chat
            </Typography>
            <TextField
              variant="outlined"
              sx={{
                width: '100%',
                mt: 2,
                backgroundColor: Color.LIGHTGREY,
                borderRadius: '0.5rem',
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
              slotProps={{
                input: {
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton sx={{ padding: '0rem' }} onClick={handleInvite}>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              onChange={(e) => {
                setInviteUserDisplayName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleInvite();
              }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default InviteFriendModal;
