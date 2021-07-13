import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from "../CandidateDialogs/Login";
import Register from "../CandidateDialogs/Register";
import { useStyles } from "../../Styles/LoginDialog/LoginDialog.styles";
import {
  Button,
  Grid,
  DialogContentText,
  List,
  ListItem,
  ListItemAvatar,
  useTheme,
  ListItemText,
  Drawer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Divider,
  Container,Badge
} from "@material-ui/core";

import Styles from "../../Styles/Candidate Styles/dashboard.styles";
import image from "../../Assets/Images/profileImg.jpg";

import {
  Palette as PaletteIcon,
  InsertDriveFile as ResumeIcon,
  Favorite as FavoriteIcon,
  Check as CheckBoxIcon,
  Email as EmailIcon,
  LocalOffer as Priceicon,
  PowerSettingsNew as PowerIcon,
  CalendarToday as CalenderIcon,
  LocationOn as LocationIcon,
  Info as InfoIco,
  Public as PublicIcon,
  ChevronLeft as LeftIcon,
  Notifications
} from "@material-ui/icons/";
import {
  Edit,
  Facebook,
  Trash2,
  Twitter,
  Linkedin,
  Briefcase
} from "react-feather";
import axios from "axios";
import { imgurl, url } from "../../Api/Url";

const CandidateDashboard = () => {
  const theme = useTheme();
  const styleProps = {
    theme,
  };
  const history = useHistory();
  const candidate = localStorage.getItem("candidate");
  const [openlogin, setopenlogin] = useState(false);
  const [cvopen, setcvopen] = useState(false);
  const [state, setstate] = useState("");
  const [openRegister, setopenRegister] = useState(false);
  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(false);
  const [test, settest] = useState([]);
  const [category, setcategory] = useState("");
  const [jobtitile, setjobtitile] = useState("");
  const [company, setcompany] = useState("");
  const logout = () => {
    localStorage.removeItem("candidate");
    window.location.reload();
  };
  const candidateid = localStorage.getItem("candidateid");
  //candidate notification
  const candidateNotification = async () => {
    try {
      setopen(true);
      const { data } = await axios.get(
        `${url}/notificationsForApprovedJobs/${candidateid}`
      );
      const catogory = data.results.map((val) =>
        val.approved.map((val) => val.jobid.category)
      );
      const jobtitle = data.results.map((val) =>
        val.approved.map((val) => val.jobid.jobtitle)
      );
      const companyname = data.results.map((val) =>
        val.approved.map((val) => val.jobid.companyname)
      );
      setcategory(catogory);
      setjobtitile(jobtitle);
      setcompany(companyname);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(category);
  // get the cv data
  const getcvdata = async () => {
    setcvopen(true);
    setloading(true);
    try {
      const { data } = await axios.get(`${url}/getcvdata/${candidate}`);
      console.log(data.data.cv);
      settest(data.data.cv);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!candidate) {
      setopenlogin(true);
    } else {
      getcandidate();
    }
  }, []);
  const getcandidate = async () => {
    try {
      const { data } = await axios.get(
        `${url}/getcandidatesingle/${candidate}`
      );
      // console.log(data);
      setstate(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const classes = Styles(styleProps);

  return (
    <div>
      {/* dialogs for login and register */}
      <Login openlogin={openlogin} setopenlogin={setopenlogin} />
      <Register openRegister={openRegister} setopenRegister={setopenRegister} />
      <Grid container spacing={4} className={classes.GridContainer}>
        <Grid item xs={12} md={3} sm={12}>
          <div
            style={{
              textAlign: "center",
              border: "1px solid #e2e2e2",
            }}
          >
            <div className={classes.ProfileSection}>
              <img
                style={{
                  width: "100%",
                  marginBottom: 30,
                }}
                src={`${imgurl}/${state.profile}`}
                alt=""
              />
              <div>
                <p>Luco Wallace</p>
                <p className={classes.Txt2}>{state.email}</p>
              </div>
              <div className={classes.ProfileDetails}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p>Profile</p>
                  <p>70%</p>
                </div>
                <div className={classes.ProgressBar}>
                  <span className={classes.Progress}></span>
                </div>
              </div>
            </div>
            <ul className={classes.NavLinks}>
              <li className={`${classes.NavItem} ${classes.NavItemActive}`}>
                <div className={classes.ListItemContent}>
                  <div className={classes.ListIcon}>
                    <PaletteIcon />
                  </div>
                  <div>Dashboard</div>
                </div>
              </li>
              <li className={classes.NavItem}>
                <div className={classes.ListItemContent}>
                  <div className={classes.ListIcon}>
                    <Edit />
                  </div>
                  <div>Edit Profile</div>
                </div>
              </li>
              <li className={classes.NavItem}>
                <div
                  className={classes.ListItemContent}
                  onClick={() => history.push("/candidate/resume")}
                >
                  <div className={classes.ListIcon}>
                    <ResumeIcon />
                  </div>
                  <div>Resume</div>
                </div>
              </li>
              <li className={classes.NavItem}>
                <div className={classes.ListItemContent}>
                  <div className={classes.ListIcon}>
                    <FavoriteIcon />
                  </div>
                  <div>Favourite</div>
                </div>
              </li>
              <li className={classes.NavItem}>
                <div className={classes.ListItemContent}>
                  <div className={classes.ListIcon}>
                    <CheckBoxIcon />
                  </div>
                  <div>Applied Job</div>
                </div>
              </li>
              <li className={classes.NavItem} onClick={getcvdata}>
                <div className={classes.ListItemContent}>
                  <div className={classes.ListIcon}>
                    <EmailIcon />
                  </div>
                  <div>Perview CV</div>
                </div>
              </li>
              <li className={classes.NavItem}>
                <div className={classes.ListItemContent}>
                  <div className={classes.ListIcon}>
                    <Priceicon />
                  </div>
                  <div>Pricing Plans</div>
                </div>
              </li>
            </ul>
            <ul className={classes.LogoutSection}>
              <li className={classes.NavItem} onClick={logout}>
                <div className={classes.ListItemContent}>
                  <div className={classes.ListIcon}>
                    <PowerIcon />
                  </div>
                  <div>Logout</div>
                </div>
              </li>
              <li className={classes.NavItem}>
                <div className={classes.ListItemContent}>
                  <div className={classes.ListIcon}>
                    <Trash2 />
                  </div>
                  <div>Delete Profile</div>
                </div>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} md={9} sm={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <div className={classes.Section1}>
                <div
                  style={{
                    width: "100px",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                    }}
                    src={`${imgurl}/${state.profile}`}
                    alt=""
                  />
                </div>
                <div className={classes.Section1Details}>
                  <h3>{state.email}</h3>
                  <ul style={{ display: "inline-flex" }}>
                    <li
                      style={{
                        marginRight: 25,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Briefcase
                        className={classes.ListIcon}
                        style={{
                          marginRight: 10,
                        }}
                      />
                      <span>Software Firm</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <LocationIcon
                        className={classes.ListIcon}
                        style={{
                          marginRight: 10,
                        }}
                      />
                      <span>{state.location}</span>
                    </li>
                  </ul>
                </div>
                <Button variant="contained" className={classes.ProfileBtn}>
                  View Profile
                </Button>
                <Badge fontSize="large" badgeContent={"new"} color="secondary" style={{cursor:"pointer"}} onClick={candidateNotification}>
                <Notifications color="primary"/>
                </Badge>
              </div>
            </Grid>
            <Grid item md={6} xs={12} className={classes.Section2}>
              <div className={classes.Section2A}>
                <h3 className={classes.Section2Header}>Basic Information</h3>
                <List>
                  <ListItem className={classes.ListItem}>
                    <ListItemAvatar>
                      <CalenderIcon />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Job Description :"
                      secondary={state.jobdescription}
                    />
                  </ListItem>
                  <ListItem className={classes.ListItem}>
                    <ListItemAvatar>
                      <LocationIcon />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Location :"
                      secondary="Los Angeles , California"
                    />
                  </ListItem>
                  <ListItem className={classes.ListItem}>
                    <ListItemAvatar>
                      <InfoIco />
                    </ListItemAvatar>
                    <ListItemText primary="Phone :" secondary="0312312312" />
                  </ListItem>
                  <ListItem className={classes.ListItem}>
                    <ListItemAvatar>
                      <EmailIcon />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email :"
                      secondary="luca@lucee.com"
                    />
                  </ListItem>
                  <ListItem className={classes.ListItem}>
                    <ListItemAvatar>
                      <PublicIcon />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Website :"
                      secondary="www.example.com"
                    />
                  </ListItem>
                </List>
              </div>
              <div className={classes.Section2B}>
                <h3 className={classes.Section2Header}>Social Profile</h3>
                <div
                  style={{
                    display: "flex",
                    padding: "0px 20px",
                    flexWrap: "wrap",
                  }}
                >
                  <ListItemAvatar className={classes.ListAvatar}>
                    <Facebook className={classes.ListIcon2} />
                  </ListItemAvatar>
                  <ListItemAvatar className={classes.ListAvatar}>
                    <Twitter className={classes.ListIcon2} />
                  </ListItemAvatar>
                  {/* <ListItem className={classes.ListItem}>
                               <ListItemAvatar>
                                  <Google />
                               </ListItemAvatar>
                            </ListItem> */}
                  <ListItemAvatar className={classes.ListAvatar}>
                    <Linkedin className={classes.ListIcon2} />
                  </ListItemAvatar>
                </div>
              </div>
            </Grid>
            <Grid item md={6} xs={12} className={classes.Section3}>
              <div className={classes.Section3A}>
                <h3 className={classes.Section2Header}>Our Location</h3>
              </div>
              <List className={classes.Section3B}>
                <ListItem>
                  <Grid
                    container
                    style={{
                      border: "1px solid #e2e2e2e2",
                    }}
                    alignItems="center"
                  >
                    <Grid
                      item
                      xs={4}
                      className={classes.Icon}
                      style={{
                        backgroundColor: "#FF9500",
                      }}
                    >
                      <i className="fas fa-book"></i>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      style={{
                        paddingLeft: 30,
                      }}
                    >
                      <ListItemText primary="260" secondary="Applied Jobs" />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid
                    container
                    style={{
                      border: "1px solid #e2e2e2e2",
                    }}
                    alignItems="center"
                  >
                    <Grid
                      item
                      xs={4}
                      className={classes.Icon}
                      style={{
                        backgroundColor: "#1FBBA6",
                      }}
                    >
                      <i className="fas fa-book"></i>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      style={{
                        paddingLeft: 30,
                      }}
                    >
                      <ListItemText primary="1608" secondary="Favourite Jobs" />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid
                    container
                    style={{
                      border: "1px solid #e2e2e2e2",
                    }}
                    alignItems="center"
                  >
                    <Grid
                      item
                      xs={4}
                      className={classes.Icon}
                      style={{
                        backgroundColor: "#76C80E",
                      }}
                    >
                      <i className="fas fa-book"></i>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      style={{
                        paddingLeft: 30,
                      }}
                    >
                      <ListItemText
                        primary="11200"
                        secondary="Companies Viewed"
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} className={classes.Section4}>
              <h3 className={classes.Section2Header}>Recent Activity</h3>
              <List>
                <ListItem className={classes.ListItem}>
                  <ListItemAvatar>
                    <LeftIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Our Resume Updated!Dobrick Published An Article :"
                    secondary="5 hours ago"
                  />
                </ListItem>
                <ListItem className={classes.ListItem}>
                  <ListItemAvatar>
                    <LeftIcon />
                  </ListItemAvatar>
                  <ListItemText
                    secondary="5 hours ago"
                    primary="Dobrick Published An Article :"
                  />
                </ListItem>
                <ListItem className={classes.ListItem}>
                  <ListItemAvatar>
                    <LeftIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Someone Bookmarked You :"
                    secondary="5 hours ago"
                  />
                </ListItem>
                <ListItem className={classes.ListItem}>
                  <ListItemAvatar>
                    <LeftIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Your Resume Updated! :"
                    secondary="5 hours ago"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            style={{
              alignItems: "center",
            }}
          >
            <Grid item xs={12} sm={8}>
              <h1>Looking For A Job</h1>
              <p>
                Your next level Product developemnt company assetsYour next
                level Product
              </p>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                display: "flex",
              }}
            >
              <Button
                variant="contained"
                className={classes.ProfileBtn}
                style={{
                  padding: "5px 55px",
                  borderRadius: 0,
                  fontSize: "1.3em",
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* CV Perviewer ,Ok let design it*/}

      <Dialog fullScreen open={cvopen}>
        <DialogTitle>
          <Container>
            <Box style={{ border: "2px dotted green" }}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  {loading ? (
                    <p>loading..</p>
                  ) : (
                    <Box textAlign="center" p={3}>
                      <Typography variant="h4" color="secondary">
                        Your CV
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
              {/* 2 grid */}
              <Grid container>
                {/* first row,first item */}
                <Grid item xs={3} sm={3} md={3}>
                  <Typography variant="h5" color="primary">
                    {test.map((val) => val.institute)}
                  </Typography>
                </Grid>
                {/* first row,second item */}
                <Grid item xs={5} sm={5} md={5}>
                  <Box textAlign="right">
                    {" "}
                    <Typography variant="subtitle2">
                      Name:{test.map((val) => val.fullname)} <br />
                      Email:{test.map((val) => val.email)}
                      <br />
                      Address:{test.map((val) => val.address)}
                      <br />
                      Phone:{test.map((val) => val.phone)}
                      <br />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Divider />
              {/* 2rd line */}

              <Grid container>
                {/* first row,first item */}
                <Grid item xs={3} sm={3} md={3}>
                  <Typography variant="h5" color="primary">
                    Objective
                  </Typography>
                </Grid>
                {/* first row,second item */}
                <Grid item xs={5} sm={5} md={5}>
                  <Box textAlign="right">
                    {" "}
                    <Typography variant="subtitle2">
                      Objective:
                      <br />
                      {test.map((val) => val.object)}
                    </Typography>
                  </Box>
                </Grid>
                <Divider />
              </Grid>
              <Divider />
              {/* 3rd line */}
              <Grid container>
                {/* first row,first item */}
                <Grid item xs={3} sm={3} md={3}>
                  <Typography variant="h5" color="primary">
                    Work Experience
                  </Typography>
                  {test.map((val) => val.company)} &nbsp;
                  {test.map((val) => val.location)} <br />
                  {test.map((val) => val.startdate)} &nbsp;
                  {test.map((val) => val.enddate)}
                </Grid>
                {/* first row,second item */}
                <Grid item xs={5} sm={5} md={5}>
                  <Box textAlign="right">
                    {" "}
                    <Typography variant="subtitle2">
                      Position:
                      <br />
                    </Typography>
                  </Box>
                </Grid>
                <Divider />
              </Grid>
              {/* 4th line */}

              <Divider />
              <Grid container>
                {/* first row,first item */}
                <Grid item xs={3} sm={3} md={3}>
                  <Typography variant="h5" color="primary">
                    Education
                  </Typography>
                  {test.map((val) => val.degree)} &nbsp;
                  {test.map((val) => val.institute)} <br />
                  &nbsp;
                  {test.map((val) => val.degreedated)}
                </Grid>

                {/* first row,second item */}
                <Grid item xs={5} sm={5} md={5}>
                  <Box textAlign="right">
                    {" "}
                    <Typography variant="subtitle2">
                      Position:
                      <br />
                      {test.map((val) => val.position)}
                    </Typography>
                  </Box>
                </Grid>
                <Divider />
              </Grid>
              {/* last line */}

              <Divider />
              <Grid container>
                {/* first row,first item */}
                <Grid item xs={3} sm={3} md={3}>
                  <Typography variant="h5" color="primary">
                    Skills
                  </Typography>
                  {test.map((val) => val.degree)} &nbsp;
                  {test.map((val) => val.institute)} <br />
                  &nbsp;
                  {test.map((val) => val.degreedated)}
                </Grid>

                {/* first row,second item */}
                <Grid item xs={5} sm={5} md={5}>
                  <Box textAlign="right">
                    {" "}
                    <Typography variant="subtitle2">
                      Position:
                      <br />
                      {test.map((val) => val.object)}
                    </Typography>
                  </Box>
                </Grid>
                <Divider />
              </Grid>
            </Box>
          </Container>
        </DialogTitle>
        <DialogActions>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => setcvopen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* notifications */}
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          You have applied as {jobtitile} develpor in field of {category} in{" "}
          {company}.Your job was approved{" "}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setopen(false)}
            variant="outlined"
            size="small"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CandidateDashboard;
