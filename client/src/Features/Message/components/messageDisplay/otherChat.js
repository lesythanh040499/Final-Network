import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
  },
  content: {
    padding: '9px 14px',
    marginBottom: '5px',
    marginLeft: '10px',
    background: '#e4e6eb',
    color: 'black',
    border: '1px solid #e4e6eb',
    borderRadius: '14px 14px 14px 0',
  },
  time: {
    fontSize: '13px',
    color: 'grey',
  },
}));

function MessageDisplayOther({ user, msg }) {
  const classes = useStyles();
  const imageShow = (src) => {
    return <img width="100%" height="100%" style={{ borderRadius: '10px' }} src={src} alt="images" />;
  };
  const videoShow = (src) => {
    return <video width="100%" height="100%" controls src={src} alt="images" />;
  };
  return (
    <>
      <Box className={classes.title}>
        <Avatar src={user.avatar} />
        {/* <Typography style={{ paddingTop: '5%' }}>{user.username}</Typography> */}
      </Box>
      {msg.text && (
        <Box className={classes.content}>
          <Typography>{msg.text}</Typography>
        </Box>
      )}
      {msg.media.map((item, index) => (
        <Box className={classes.box} key={index}>
          {item.url.match(/video/i) ? videoShow(item.url) : imageShow(item.url)}
        </Box>
      ))}
      <Box className={classes.time}>{new Date(msg.createdAt).toLocaleString()}</Box>
    </>
  );
}

export default MessageDisplayOther;
