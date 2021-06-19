import React from "react";
import {useHistory,NavLink} from "react-router-dom"
// import logo from "../../images/logo.png";
import {
  Home,
  CloseOutlined,
  LocalMall,
  MarkunreadMailbox,
  PhoneInTalk,
  Group,
  LocalConvenienceStore,
 } from "@material-ui/icons";
import {
  Box,
  Divider,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
const DrawerData = ({ opendrawer, setopendrawer}) => {
  const history = useHistory()
 
  return (
    <div>
      <SwipeableDrawer
        open={opendrawer}
        onClose={() => setopendrawer(false)}
        anchor="left"
      >
        <List  style={{width:"270px"}} >
          {/* logo */}
          <ListItem button>
            {/* <img src={logo} width="100px" height="60px" alt="" /> */}
            <IconButton
              style={{ marginLeft: "auto" }}
              onClick={() => setopendrawer(false)}
            >
              <CloseOutlined />
            </IconButton>
          </ListItem>
          <Divider />
          {/* Home */}
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {/* Add new user*/}
          <ListItem button component={NavLink} to="/admin/users">
            <ListItemIcon>
            <Group fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
           {/* Add a job */}
           <ListItem button onClick={()=>history.push("/admin/jobs")}> 
            <ListItemIcon>
              <MarkunreadMailbox />
            </ListItemIcon>
            <ListItemText primary="Jobs" />
          </ListItem>
          {/* Contact */}
          <ListItem button>
            <ListItemIcon>
              <PhoneInTalk />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default DrawerData;
