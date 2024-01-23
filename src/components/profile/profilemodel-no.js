import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, TextField, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  field: {
    margin: theme.spacing(1),
  },
}));

const ProfilePage = ({ user }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Avatar alt="Profile Picture" src={user.profilePic} className={classes.avatar} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="body1">Date of Birth: {user.dob}</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Typography variant="body1">Gender: {user.gender}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Change Password</Typography>
          <TextField
            className={classes.field}
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className={classes.field}
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={() => {/* handle password change */}}>
            Change Password
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;