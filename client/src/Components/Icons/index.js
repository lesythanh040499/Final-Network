import { Box, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  menu: {
    width: '100%',
    top: '269px',
    left: '749px',
  },
  popoverPaper: {
    width: '30%',
    // height: '100%',
    maxHeight: 'unset',
    maxWidth: 'unset',
  },
}));

function Icons({ setShowIcon, setContent, content }) {
  const classes = useStyles();
  const reactions = [
    '🙂',
    '😀',
    '😄',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😌',
    '😉',
    '😏',
    '😍',
    '😘',
    '😗',
    '😙',
    '😚',
    '🤗',
    '😳',
    '🙃',
    '😇',
    '😈',
    '😛',
    '😝',
    '😜',
    '😋',
    '🤤',
    '🤓',
    '😎',
    '🤑',
    '😒',
    '🙁',
    '😞',
    '😔',
    '😖',
    '😓',
    '😢',
    '😢',
    '😭',
    '😟',
    '😣',
    '😩',
    '😫',
    '😕',
    '🤔',
    '🙄',
    '😤',
    '😠',
    '😡',
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setShowIcon(false);
  };
  return (
    <div style={{ width: '500px' }}>
      <Menu
        anchorOrigin={{
          vertical: 'left',
          horizontal: 'right',
        }}
        PopoverClasses={{ paper: classes.popoverPaper }}
        id="simple-menu"
        keepMounted
        open={setShowIcon}
        onClose={handleClose}
      >
        <Box>
          {reactions.map((icon) => (
            <span key={icon} onClick={() => setContent(content + icon)}>
              {icon}
            </span>
          ))}
        </Box>
      </Menu>
    </div>
  );
}

export default Icons;