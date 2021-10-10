import { Box, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useParams } from 'react-router';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';

function UseCard({ user }) {
  const { id } = useParams();

  const isSelected = (user) => {
    if (id === user._id) return true;
    return false;
  };
  return (
    <ListItem button selected={isSelected(user)}>
      <ListItemAvatar>
        <Avatar src={user.avatar}></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={user.username}
        secondary={
          user.text || user.media ? (
            <>
              <Box>{user.text.slice(0, 20)}...</Box>
              {user.media.length > 0 && (
                <Box style={{ display: 'flex' }}>
                  {user.media.length} <PhotoLibraryRoundedIcon style={{ marginLeft: '4px', fontSize: '17px' }} />{' '}
                </Box>
              )}
            </>
          ) : (
            user.fullname
          )
        }
      />

      <ListItemText
        primary={
          <Box style={{ textAlign: 'right', color: ' grey', fontSize: '13px' }}>
            {/* {moment(message.createdAt).fromNow()} */}
          </Box>
        }
        secondary={
          <Box style={{ textAlign: 'right' }}>
            <FiberManualRecordIcon style={{ fontSize: '14px' }} />
          </Box>
        }
      />
    </ListItem>
  );
}

export default UseCard;