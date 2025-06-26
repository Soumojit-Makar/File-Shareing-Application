import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Avatar, List, ListItem, ListItemText, Divider } from "@mui/material";
import { getUserData, getUserInfo } from "../../helper/auth";

const Profile = () => {
  const [userData,setUserData] = useState({});
  useEffect(() => {
  //  const user=getUserInfo();
   setUserData(getUserInfo())
    // console.log(user);
  },[]);

  return (
    <Container maxWidth="sm" className="flex items-center justify-center min-h-screen ">
      <Card className="w-full text-center p-6 shadow-lg border-[10px] animate-wiggle animate-border">
        <CardContent>
          <Avatar
            src="/path/to/example.jpg"
            alt={userData.name}
            className="w-24 h-24 mx-auto mb-4"
          />
          <Typography variant="h5" className="font-semibold mb-2">
            {userData.name}
          </Typography>
          <Typography variant="body2" className="text-gray-500 mb-4">
            {userData.about}
          </Typography>
          <List className="text-left">
            <ListItem>
              <ListItemText primary="Email" secondary={userData.email} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Phone" secondary={userData.phone} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Address" secondary={userData.address} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Gender" secondary={userData.gender} />
            </ListItem>
            <Divider />
            {/* <ListItem>
              <ListItemText primary="Role" secondary={userData.roles[0].roleName} />
            </ListItem> */}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
