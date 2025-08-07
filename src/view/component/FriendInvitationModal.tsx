import {
  Modal,
  Box,
  Typography,
  Alert,
  Button,
  CircularProgress,
  List,
  ListItem,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useRef, useState } from 'react';
import { fetchFriendInvitationList } from '../../controller/friend/friend';
import type { FriendInvitationDTO } from '../../model/dto/FriendInvitation.dto';
import FriendInvitationItem from './item/FriendInvitationItem';

const FriendInvitationListModal = ({
  openFriendInvitationListModal,
  setOpenFriendInvitationListModal,
}: {
  openFriendInvitationListModal: boolean;
  setOpenFriendInvitationListModal: (open: boolean) => void;
}) => {
  const [friendInvitation, setFriendInvitation] = useState<FriendInvitationDTO[]>([]);
  const successfulAlertRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState<number>(0);
  const pageSize: number = 10;
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isAlertTrigger, setIsAlertTrigger] = useState<boolean>(false);

  useEffect(() => {
    fetchFriendInvitations(page, pageSize);
  }, [page]);

  useEffect(() => {
    handleAcceptInvitationAlert();
  }, [isAlertTrigger]);

  const fetchFriendInvitations = async (page: number, pageSize: number) => {
    try {
      setLoading(true);
      const { totalCount, data } = await fetchFriendInvitationList(page, pageSize);
      setFriendInvitation((prev) => [...prev, ...data]);
      if (friendInvitation.length >= totalCount) setHasMore(false);
      setLoading(false);
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };

  const handleAcceptInvitationAlert = async () => {
    try {
      if (successfulAlertRef.current) {
        successfulAlertRef.current.style.display = 'flex';
        setTimeout(() => {
          successfulAlertRef.current!.style.display = 'none';
          setOpenFriendInvitationListModal(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };

  return (
    <>
      <Modal
        open={openFriendInvitationListModal}
        onClose={() => setOpenFriendInvitationListModal(false)}
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
            Accepted Successfully
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
              Friend Invitation
            </Typography>
            <List>
              {friendInvitation?.length > 0 ? (
                friendInvitation.map((dto, index) => (
                  <ListItem key={index}>
                    <FriendInvitationItem dto={dto} setIsAlertTrigger={setIsAlertTrigger} />
                  </ListItem>
                ))
              ) : (
                <Box sx={{ gap: 5 }}>
                  <Typography component="h6" align="center">
                    No Friend Invitation
                  </Typography>
                </Box>
              )}
            </List>
            {loading && <CircularProgress />}
            {!loading && hasMore && (
              <Box textAlign="center" mt={2}>
                <Button variant="outlined" onClick={() => setPage((p) => p + 1)}>
                  Load More
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default FriendInvitationListModal;
