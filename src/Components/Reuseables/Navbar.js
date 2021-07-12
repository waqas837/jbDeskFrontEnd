import React, { useState, useEffect } from "react";
// import SearchBar from "material-ui-search-bar";
import axios from "axios";
import { imgurl, url } from "../../Api/Url";
import { NavLink, useHistory } from "react-router-dom";
import { Menu, MenuItem, Paper, Popper } from "@material-ui/core";
import jwt from "jsonwebtoken";
import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  Drawer,
  Box,
  IconButton,
  Divider,
  Button,Input
} from "@material-ui/core";
import { Close, Search as SearchIcon } from "@material-ui/icons";
import { v4 as uuid } from "uuid";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

import { withRouter } from "react-router-dom";

import Styles from "../../Styles/reuseables/Navbar.styles";
import Login from "../UserDialog/Login";

//  color: #F2396E;
//  border-bottom: 1px solid #F2396E;

const Navbar = (props) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("email");
  const decode = jwt.decode(token);
  const theme = useTheme();
  const { location } = props;

  const styleProps = {
    ...props,
    theme,
  };
  
//   async function onchangeSearch(e) {
//     try {
//       const { data } = await axios.post(`${url}/getAllSingleJobData`,e.target.value);
//       console.log(data.results);
//     } catch (error) {
//       console.log(error);
//     }
//   }
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openlogin, setopenlogin] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {}, [setDrawerOpen, setopenlogin]);
  const history = useHistory();
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  // set things for the popper
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMouseOver = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("candidate");
    window.location.reload();
  };
  const classes = Styles(styleProps);

  const isActive = (slug) => {
    return location.pathname.toLowerCase().includes(slug.toLowerCase());
  };

  return (
    <>
      <Login openlogin={openlogin} setopenlogin={setopenlogin} />

      <AppBar position="static" color="transparent" className={classes.AppBar}>
        <Toolbar>
          <div className={classes.title}>
            <Typography variant="h4">JBDesks</Typography>
          </div>
          <div className={classes.NavLinks}>
            <Typography
              variant="h6"
              className={classes.LinkItem}
              component={NavLink}
              to="/"
              style={{
                color: location.pathname === "/" ? theme.palette.pink : "#222",
                borderBottom:
                  location.pathname === "/"
                    ? `1px solid ${theme.palette.pink}`
                    : "",
              }}
            >
              Home
            </Typography>
            <Typography
              onMouseOver={handleMouseOver}
              variant="h6"
              activeClassName={classes.LinkItem}
              component={NavLink}
              exact
              to="/jobs"
              style={{
                color: isActive("jobs") ? theme.palette.pink : "#222",
                borderBottom: isActive("jobs")
                  ? `1px solid ${theme.palette.pink}`
                  : "",
              }}
            >
              Jobs
            </Typography>
            {/* content for job */}
            <Menu
              className={classes.dropdown}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => history.push("/jobs/single")}>
                Single Job
              </MenuItem>
              <MenuItem onClick={() => history.push("/jobs/all")}>
                All Jobs
              </MenuItem>
            </Menu>
            <Typography
              component={NavLink}
              to="/candidates"
              variant="h6"
              className={classes.LinkItem}
              style={{
                color: isActive("candidates") ? theme.palette.pink : "#222",
                borderBottom: isActive("candidates")
                  ? `1px solid ${theme.palette.pink}`
                  : "",
              }}
            >
              {/* content for jobs popper */}
              Candiates
            </Typography>
            <Typography
              component={NavLink}
              to="/pages"
              variant="h6"
              className={classes.LinkItem}
              style={{
                color: isActive("pages") ? theme.palette.pink : "#222",
                borderBottom: isActive("pages")
                  ? `1px solid ${theme.palette.pink}`
                  : "",
              }}
            >
              Pages
            </Typography>
            <Typography
              variant="h6"
              component={NavLink}
              exact
              to="/company/dashboard"
              className={classes.LinkItem}
              style={{
                color: isActive("dashboard") ? theme.palette.pink : "#222",
                borderBottom: isActive("dashboard")
                  ? `1px solid ${theme.palette.pink}`
                  : "",
              }}
            >
              Dashboard
            </Typography>
            <Typography
              component={NavLink}
              to="/blog"
              variant="h6"
              className={classes.LinkItem}
              style={{
                color: isActive("blog") ? theme.palette.pink : "#222",
                borderBottom: isActive("blog")
                  ? `1px solid ${theme.palette.pink}`
                  : "",
              }}
            >
              Blog
            </Typography>
            <Typography
              variant="h6"
              component={NavLink}
              to="/contact"
              className={classes.LinkItem}
              style={{
                color: isActive("contact") ? theme.palette.pink : "#222",
                borderBottom: isActive("contact")
                  ? `1px solid ${theme.palette.pink}`
                  : "",
              }}
            >
              Contact
            </Typography>
           {/* <Input placeholder="Search jobs..." style={{width:"20%"}} onChange={onchangeSearch}/> */}
           <SearchIcon className={`${classes.SearchIcon}`}></SearchIcon>
          </div>
          <div className={classes.ProfileBox}>
            <div>
              {user ? (
                <Button
                  style={{ borderRadius: "0px" }}
                  onClick={logout}
                  color="secondary"
                  variant="contained"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  style={{ borderRadius: "0px" }}
                  onClick={() => setopenlogin(true)}
                  color="secondary"
                  variant="contained"
                >
                  Login
                </Button>
              )}
            </div>
            <div className={classes.toggleBtn} onClick={toggleDrawer}></div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer}
        className={classes.Drawer}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.DrawerHeader}
        >
          <div>
            <h3 style={{ fontSize: "1.8em", color: "#2D3A4b" }}>JobDesks</h3>
          </div>
          <div>
            <IconButton className={classes.CloseIcon} onClick={toggleDrawer}>
              <Close />
            </IconButton>
          </div>
        </Box>
        <Divider />
        {/* <SearchBar
          className={classes.DrawerSearchbar}
          value={searchValue}
          onChange={(newValue) => setSearchValue(newValue)}
        /> */}
        <Divider />
        <div className={classes.DrawerNav}>
          <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            onSelect={({}) => {
              // maybe push to the route
            }}
            items={[
              {
                title: "Home",
                itemId: uuid(),
                elemBefore: () => <div name="users" />,
                subNav: [
                  {
                    title: "Home |",
                    itemId: uuid(),
                  },
                  {
                    title: "Home ||",
                    itemId: uuid(),
                  },
                  {
                    title: "Home ||",
                    itemId: uuid(),
                  },
                ],
              },
              {
                title: "Jobs",
                itemId: uuid(),
                subNav: [
                  {
                    title: "Services",
                    itemId: uuid(),
                  },
                  {
                    title: "Services ||",
                    itemId: uuid(),
                  },
                ],
              },
              {
                title: "Candidates",
                itemId: uuid(),
                subNav: [
                  {
                    title: "Pricing Plans",
                    itemId: uuid(),
                  },
                  {
                    title: "Login / Register",
                    itemId: uuid(),
                  },
                  {
                    title: "Error 404",
                    itemId: uuid(),
                  },
                  {
                    title: "Error 404 ||",
                    itemId: uuid(),
                  },
                  {
                    title: "Coming Soon",
                    itemId: uuid(),
                  },
                  {
                    title: "Coming Soon",
                    itemId: uuid(),
                  },
                  {
                    title: "About Us",
                    itemId: uuid(),
                  },
                  {
                    title: "Services",
                    itemId: uuid(),
                  },
                  {
                    title: "Error 404 ||",
                    itemId: uuid(),
                  },
                  {
                    title: "Error 404 ||",
                    itemId: uuid(),
                  },
                  {
                    title: "Error 404 ||",
                    itemId: uuid(),
                  },
                ],
              },
              {
                title: "Employees",
                itemId: uuid(),
                subNav: [
                  {
                    title: "About Us",
                    itemId: uuid(),
                  },
                  {
                    title: "About Us ||",
                    itemId: uuid(),
                  },
                ],
              },
              {
                title: "Blog",
                itemId: uuid(),
                subNav: [
                  {
                    title: "Blog width Sidebar",
                    itemId: uuid(),
                  },
                  {
                    title: "Blog Full WIdth",
                    itemId: uuid(),
                  },
                  {
                    title: "Blog ||| Column ",
                    itemId: uuid(),
                  },
                  {
                    title: "Blog || Column ",
                    itemId: uuid(),
                  },
                  {
                    title: "Blog Single",
                    itemId: uuid(),
                  },
                ],
              },
              {
                title: "Contact Us",
                itemId: uuid(),
                subNav: [
                  {
                    title: "Contact Us",
                    itemId: uuid(),
                  },
                  {
                    title: "Contact Us ||",
                    itemId: uuid(),
                  },
                ],
              },
            ]}
          />
        </div>
      </Drawer>
    </>
  );
};

export default withRouter(Navbar);
