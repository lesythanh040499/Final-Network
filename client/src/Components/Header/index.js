import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Menu, MenuItem } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Logo from '../../social-network.svg';
import { logout } from 'Redux/Action/authAction';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import Search from 'Components/Search';
import Avatar from 'Components/Avatar/Avatar';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 0.5,
    display: 'flex',
    alignItems: 'center',
  },
  navbarlink: {
    color: '#fff',
    margin: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  user: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  img: {
    width: '121%',
    height: '43px',
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  // const isLoggedIn = !!loggedInUser.id;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const { auth, theme } = useSelector((state) => state);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const isActive = {
    color: 'pink',
    // backgroundColor: 'pink',
    borderBottom: '2px solid pink',
  };

  // const handleLogoutClick = () => {
  //   const action = logout();
  //   dispatch(action);
  // };
  // const handleCartClick = () => {
  //   const action = hideMiniCart();
  //   dispatch(action);
  //   history.push('/cart');
  // };

  const navLinkItem = [
    {
      text: 'Home',
      icon: <HomeRoundedIcon style={{ fontSize: 39 }} />,
      path: '/',
    },
    {
      text: 'Discover',
      icon: <ExploreRoundedIcon fontSize="large" />,
      path: '/discover',
    },
    {
      text: 'Message',
      icon: <ForumRoundedIcon fontSize="large" />,
      path: '/message',
    },
    {
      text: 'Notify',
      icon: <FavoriteRoundedIcon fontSize="large" />,
      path: '/notify',
    },
  ];
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box className={classes.title}>
            <Link to="/">
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                {/* <MenuIcon /> */}
                <img className={classes.img} src={Logo} alt="Logo" />
              </IconButton>
            </Link>
            <Search />
          </Box>
          <Box flexGrow="1">
            {navLinkItem.map((link, index) => (
              <NavLink exact activeStyle={isActive} key={index} to={link.path} className={classes.navbarlink}>
                {link.icon}
              </NavLink>
            ))}
          </Box>
          {/* <NavLink to="/todos" className={classes.link}>
            <Button color="inherit"> Todos</Button>
          </NavLink>
          <NavLink to="/album" className={classes.link}>
            <Button color="inherit"> Album</Button>
          </NavLink> */}
          {/* {!isLoggedIn && <Button color="inherit">Login</Button>} */}
          {/* 
          <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <MiniCart /> */}

          {/* {isLoggedIn && ( */}

          {/* )} */}
          <IconButton className={classes.user} color="inherit" onClick={handleClick}>
            {/* <AccountCircle fontSize="large" /> */}
            {/* <img src={auth.user.avatar} alt="avatar" className={classes.user} /> */}
            <Avatar src={auth.user.avatar} size={classes.user} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to={`/profile/${auth.user._id}`}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <label
            htmlFor="theme"
            className={classes.link}
            to="/"
            onClick={() =>
              dispatch({
                type: GLOBALTYPES.THEME,
                payload: !theme,
              })
            }
          >
            {theme ? 'Light mode' : 'Dark mode'}
          </label>
        </MenuItem>
        <MenuItem onClick={() => dispatch(logout())}>
          <Link className={classes.link} to="/">
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
