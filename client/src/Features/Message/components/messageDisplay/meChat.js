import { Avatar, Box, ListItemText, makeStyles, Typography } from '@material-ui/core';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import PhoneDisabledRoundedIcon from '@material-ui/icons/PhoneDisabledRounded';
import VideocamOffRoundedIcon from '@material-ui/icons/VideocamOffRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import axios from 'axios';
import fileDownload from 'js-file-download';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessages } from 'Redux/Action/messageAction';
import Times from '../Times';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  avatar: {
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
  content: {
    padding: '9px 14px',
    marginBottom: '5px',
    marginRight: '10px',
    background: '#ec7d14',
    color: 'white',
    border: '1px solid #ec7d14',
    borderRadius: '14px 14px 0 14px',
  },
  contentText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  time: {
    fontSize: '13px',
    color: 'grey',
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
    },
  },
  box: {
    width: '100%',
    height: '90%',
    marginTop: '5px',
    marginRight: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  },
  contentBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    flexDirection: 'column',
  },
  deleteIcon: {
    cursor: 'pointer',
    opacity: 0,
    position: 'absolute',
    top: '27%',
    right: '102%'
  },
  iconVideo: {
    display: 'flex',
    backgroundColor: '#eee',
    padding: '0 10px',
    borderRadius: '5px',
  },
  boxContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  boxFlex: {
    '&:hover $deleteIcon': {
      opacity: 1,
    },
    alignItems: 'end',
  },
  file: {
    display: 'flex',
    padding: '9px 0 9px 9px',
    marginBottom: '5px',
    background: '#e4e6eb',
    color: 'black',
    border: '1px solid #e4e6eb',
    borderRadius: '14px 14px 14px 14px',
  },
}));

function MessageDisplay({ user, msg, data }) {
  const classes = useStyles();
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = () => {
    if (!data) return;

    if (window.confirm('Bạn chắc chắn xoá!')) {
      dispatch(deleteMessages({ msg, data, auth }));
    }
  };

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const imageShow = (src) => {
    return (
      <div>
        <img
          width="100%"
          height="100%"
          style={{
            borderRadius: '10px',
            filter: theme ? 'invert(1)' : 'invert(0)',
          }}
          src={src}
          alt="images"
        />
      </div>
    );
  };
  const videoShow = (src) => {
    return (
      <video
        width="100%"
        height="100%"
        controls
        src={src}
        alt="images"
        style={{
          borderRadius: '10px',
          filter: theme ? 'invert(1)' : 'invert(0)',
        }}
      />
    );
  };
  let newName = '';
  const fileShow = (src, tail, name) => {
    newName = name + tail.slice(26);
    return (
      <Box className={classes.file}>
        <DescriptionRoundedIcon />
        <Typography
          onClick={() => {
            handleDownload(src, newName);
          }}
          style={{ cursor: 'pointer', paddingLeft: '2px' }}
          className={classes.contentText}
        >
          {newName}
        </Typography>
      </Box>
    );
  };
  return (
    <>
      <Box className={classes.boxContent}>
        <Box style={{ display: 'flex' }} className={!msg._id ? classes.newBox : classes.boxFlex}>
          <DeleteIcon className={classes.deleteIcon} onClick={handleDeleteMessages} />
          <Box className={classes.contentBox}>
            {msg.text && (
              <Box
                className={classes.content}
                style={{ filter: theme ? 'invert(1)' : 'invert(0)', color: theme ? 'white' : '' }}
              >
                <Typography className={classes.contentText}>{msg.text}</Typography>
              </Box>
            )}
            {msg.media.map((item, index) => (
              <Box className={classes.box} key={index}>
                {item.url.match(/video/i)
                  ? videoShow(item.url)
                  : item.url.includes('png') ||
                    item.url.includes('jpg') ||
                    item.url.includes('.gif') ||
                    item.url.includes('webp')
                  ? imageShow(item.url)
                  : fileShow(item.url, item.public_id, item.fileName)}
              </Box>
            ))}

            {msg.call && (
              <Box
                style={{ fontSize: '2.5rem', color: msg.call.times === 0 ? 'red' : 'green' }}
                className={classes.iconVideo}
              >
                <Box style={{ marginRight: '4px' }}>
                  {msg.call.times === 0 ? (
                    msg.call.video ? (
                      <VideocamOffRoundedIcon style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                    ) : (
                      <PhoneDisabledRoundedIcon style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                    )
                  ) : msg.call.video ? (
                    <VideocamRoundedIcon style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                  ) : (
                    <CallRoundedIcon style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                  )}
                </Box>
                <Box>
                  <ListItemText
                    primary={msg.call.video ? 'Video Call' : 'Audio Call'}
                    secondary={
                      msg.call.times > 0 ? (
                        <Times total={msg.call.times} />
                      ) : (
                        new Date(msg.createdAt).toLocaleTimeString()
                      )
                    }
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <Box className={classes.title}>
          <Avatar className={classes.avatar} src={user.avatar} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
        </Box>
      </Box>

      <Box className={classes.time}>{new Date(msg.createdAt).toLocaleString()}</Box>
    </>
  );
}

export default MessageDisplay;
