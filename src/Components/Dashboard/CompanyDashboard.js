import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { imgurl, url } from "../../Api/Url";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader, ClipLoader } from "react-spinners";
import axios from "axios";
import {
  Button,
  IconButton,
  Divider,
  Container,
  TextareaAutosize,
  Grid,
  DialogTitle,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  useTheme,
  ListItemText,
  Dialog,
  DialogContentText,
  Input,
  Box,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import Close from "@material-ui/icons/Close";
import Styles from "../../Styles/Company Styles/dashboard.styles";
import image from "../../Assets/Images/companyImg.png";
import AddJobDialog from "./AddJobDialog";
import rc1Img from "../../Assets/Images/rc1.png";
import rc2Img from "../../Assets/Images/rc2.png";
import rc3Img from "../../Assets/Images/rc3.png";
import rc4Img from "../../Assets/Images/rc4.png";
import Chart from "./Chart/Chart";

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
} from "@material-ui/icons/";
import {
  Edit,
  Facebook,
  Trash2,
  Twitter,
  Linkedin,
  Briefcase,
} from "react-feather";
import CompanyLogin from "./CompanyLogin";

const CompanyDashboard = () => {
  const theme = useTheme();
  const styleProps = {
    theme,
  };
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("email");
  const name = localStorage.getItem("username");
  const candidateid = localStorage.getItem("candidateid");
  const decode = jwt.decode(token);
  const [openlogin, setopenlogin] = useState(true);
  const [openthree, setOpenthree] = useState(false);
  const [open, setopen] = useState(false);
  const [loadings, setloadings] = useState(false);
  const [stateS, setstateS] = useState([]);
  const [searchResults, setsearchResults] = useState([]);
  const [loadingS, setloadingS] = useState(false);
  const [loading, setloading] = useState(false);
  const [file, setfile] = useState({});
  // -3>applicantDetails
  const applicantDetails = async (jobid) => {
    try {
      const { data } = await axios.get(`${url}/seeApplicantsDetails/${jobid}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  //  -2.see applicants
  const seeApplicants = async () => {
    setopen(true);
    setloading(true);
    try {
      const { data } = await axios.get(`${url}/seeApplicants/${candidateid}`);
      setsearchResults(data.results);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  // approve an application

  //  -1.apply
  const approve = async (jobid) => {
    setloadings(true);
    try {
      const { data } = await axios.post(`${url}/apply/${jobid}/${candidateid}`);
      setloadings(false);
      console.log(data);
      if (data.success) {
        toast.success("Successfully applied for this job.Thanks!");
      }
      if (data.error) {
        toast.error(`${data.error}`);
      }
    } catch (error) {
      console.log(error);
      setloadings(false);
    }
  };
  const classes = Styles(styleProps);
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("useremail");
    localStorage.removeItem("token");
    window.location.reload();
  };
  // add a new job
  const headers = {
    authorization: `Bearer ${token}`,
  };

  //we set file name in a state
  const onChangeFile = async (e) => {
    e.preventDefault();
    setfile(e.target.files[0]);
  };
  // add a new user/onsubmit form
  async function AddNewJob(e) {
    //here we first add all the job data
    var fdata = new FormData();
    var company = "company";
    fdata.append("role", company);
    fdata.append("jobtitle", stateS.jobtitle);
    fdata.append("category", stateS.category);
    fdata.append("companyname", stateS.companyname);
    fdata.append("date", stateS.date);
    fdata.append("experience", stateS.experience);
    fdata.append("howtoapply", stateS.howtoapply);
    fdata.append("jobdescription", stateS.jobdescription);
    fdata.append("jobresp", stateS.jobresp);
    fdata.append("location", stateS.location);
    fdata.append("minimumqulification", stateS.minimumqulification);
    fdata.append("salary", stateS.salary);
    fdata.append("time", stateS.time);
    fdata.append("totalhrs", stateS.totalhrs);
    fdata.append("workinghours", stateS.workinghours);
    fdata.append("image", file);

    e.preventDefault();
    try {
      setloadingS(true);
      // if (stateS.email === undefined) {
      //   toast.error("Don't left any field empty");
      // }
      const { data } = await axios.post(`${url}/addnewjob`, fdata, { headers });
      console.log(data);
      setloadingS(false);
      //here is the error to check whether response data is coming
      //handle this one
      //  setdupUser(data.driver)
      if (!data.errors && !data.passerr && !data.code) {
        localStorage.setItem("user", data);
        setloadingS(false);
        toast.success("New Job Added successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setloadingS(false);
      toast.error(`${error}`);
    }
  }
  const history = useHistory();
  return (
    <div>
      {user ? null : (
        <CompanyLogin openlogin={openlogin} setopenlogin={setopenlogin} />
      )}

      {/* start Post Job dialog*/}
      <AddJobDialog openthree={openthree} setOpenthree={setOpenthree} />
      {/* Add new user by admin dialgue */}
      <Dialog
        onClose={() => setOpenthree(false)}
        aria-labelledby="simple-dialog-title"
        open={openthree}
      >
        <Toaster />
        <DialogTitle>
          <Grid container>
            <Grid item>
              <Typography
                variant="h4"
                color="secondary"
                style={{ textAlign: "left" }}
              >
                Post New job
              </Typography>
              <Box style={{ marginLeft: "500px", marginTop: "-35px" }}>
                <IconButton
                  style={{ padding: "0px" }}
                  onClick={() => setOpenthree(false)}
                >
                  <Close />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContentText>
          <Divider />
          <form onSubmit={AddNewJob} encType="multipart/form-data">
            <Container>
              <Box mt={1} textAlign="center">
                {/* main grid starts here */}
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Input
                      fullWidth
                      onChange={(e) =>
                        setstateS({ ...stateS, jobtitle: e.target.value })
                      }
                      type="text"
                      placeholder="Job title"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                  {/* 2nd 6 */}
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Input
                      fullWidth
                      onChange={(e) =>
                        setstateS({ ...stateS, companyname: e.target.value })
                      }
                      type="text"
                      placeholder="Company name"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    Job Posted Date:
                    <Input
                      fullWidth
                      onChange={(e) =>
                        setstateS({ ...stateS, date: e.target.value })
                      }
                      type="date"
                      placeholder="Date posted"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    Company Logo:
                    <Input
                      type="file"
                      name="image"
                      fullWidth
                      onChange={onChangeFile}
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Input
                      fullWidth
                      onChange={(e) =>
                        setstateS({ ...stateS, time: e.target.value })
                      }
                      type="text"
                      placeholder="Part time/Full time"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Input
                      fullWidth
                      onChange={(e) =>
                        setstateS({ ...stateS, location: e.target.value })
                      }
                      type="text"
                      placeholder="Location"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                  {/* 2nd 6 */}
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Input
                      fullWidth
                      onChange={(e) =>
                        setstateS({ ...stateS, workinghours: e.target.value })
                      }
                      type="text"
                      placeholder="Working Hours"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>{" "}
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Input
                      fullWidth
                      onChange={(e) =>
                        setstateS({ ...stateS, salary: e.target.value })
                      }
                      type="text"
                      placeholder="Salary"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                  {/* 2nd 6 */}
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Input
                      fullWidth
                      onChange={(e) =>
                        setstateS({ ...stateS, category: e.target.value })
                      }
                      type="text"
                      placeholder="Category"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>{" "}
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Input
                      fullWidth
                      onChange={(e) =>
                        setstateS({ ...stateS, experience: e.target.value })
                      }
                      type="text"
                      placeholder="Experience Required"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Input
                      fullWidth
                      onChange={(e) =>
                        setstateS({ ...stateS, totalhrs: e.target.value })
                      }
                      type="text"
                      placeholder="Hours/week"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                  {/* 2nd 6 */}
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextareaAutosize
                      onChange={(e) =>
                        setstateS({ ...stateS, jobdescription: e.target.value })
                      }
                      type="text"
                      placeholder="Job Description"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextareaAutosize
                      onChange={(e) =>
                        setstateS({ ...stateS, jobresp: e.target.value })
                      }
                      type="text"
                      placeholder="Responsibilites"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextareaAutosize
                      onChange={(e) =>
                        setstateS({
                          ...stateS,
                          minimumqulification: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Minimal Qualifications"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextareaAutosize
                      onChange={(e) =>
                        setstateS({ ...stateS, howtoapply: e.target.value })
                      }
                      type="text"
                      placeholder="How to Apply?"
                      style={{ marginBottom: "10px" }}
                      required="true"
                    />
                  </Grid>
                </Grid>
                <br />

                <br />
                <br />
                {loadingS ? (
                  <Button
                    fullWidth
                    style={{
                      marginBottom: "10px",
                      backgroundColor: "rgb(254,181,2)",
                    }}
                    color="primary"
                    startIcon={<ClipLoader size="10" color="black" />}
                  >
                    Adding...
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    style={{
                      marginBottom: "10px",
                    }}
                    color="secondary"
                    onClick={AddNewJob}
                    variant="contained"
                  >
                    Add Job
                  </Button>
                )}
              </Box>
            </Container>
          </form>
        </DialogContentText>
      </Dialog>

      {/* end post job dialog */}
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
                  marginBottom: 30,
                  margin: "auto",
                }}
                src={image}
                alt="Profile Picture"
              />
              <div>
                <p>{name}</p>
                <p className={classes.Txt2}>{user}</p>
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
              <li
                className={classes.NavItem}
                onClick={() => history.push("/company/dashboard/managejobs")}
              >
                <div className={classes.ListItemContent}>
                  <div className={classes.ListIcon}>
                    <Edit />
                  </div>
                  <div>Manage Jobs</div>
                </div>
              </li>
              <li className={classes.NavItem} onClick={seeApplicants}>
                <div className={classes.ListItemContent}>
                  <div className={classes.ListIcon}>
                    <ResumeIcon />
                  </div>
                  <div>Applications</div>
                </div>
              </li>
              <li
                className={classes.NavItem}
                onClick={() => setOpenthree(true)}
              >
                <div className={classes.ListItemContent}>
                  <div className={classes.ListIcon}>
                    <FavoriteIcon />
                  </div>
                  <div>Post New Job</div>
                </div>
              </li>
              <li className={classes.NavItem}>
                <div className={classes.ListItemContent}>
                  <div className={classes.ListIcon}>
                    <EmailIcon />
                  </div>
                  <div>Message</div>
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
              <li className={classes.NavItem}>
                <div className={classes.ListItemContent} onClick={logout}>
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
                    src={image}
                    alt="hahaaha"
                  />
                </div>
                <div className={classes.Section1Details}>
                  <h3>Webstrot Technology</h3>
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
                      <span>Los Angeles</span>
                    </li>
                  </ul>
                </div>
                <Button variant="contained" className={classes.ProfileBtn}>
                  View Profile
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <List className={classes.Section3B}>
                <ListItem className={classes.Section3BListItem}>
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
                      sm={2}
                      md={4}
                      lg={2}
                      className={classes.Icon}
                      style={{
                        backgroundColor: "#FF9500",
                      }}
                    >
                      <i class="fas fa-book"></i>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      style={{
                        paddingLeft: 30,
                      }}
                    >
                      <ListItemText primary="360" secondary="Jobs Posted" />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem className={classes.Section3BListItem}>
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
                      sm={2}
                      md={4}
                      lg={2}
                      className={classes.Icon}
                      style={{
                        backgroundColor: "#FF5E3A",
                      }}
                    >
                      <i class="fas fa-user"></i>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      style={{
                        paddingLeft: 30,
                      }}
                    >
                      <ListItemText
                        primary="1608"
                        secondary="Shortlisted Resume"
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem className={classes.Section3BListItem}>
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
                      sm={2}
                      md={4}
                      lg={2}
                      className={classes.Icon}
                      style={{
                        backgroundColor: "#1FBBA6",
                      }}
                    >
                      <i className="fas fa-eye"></i>
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
                        secondary="Total Page View"
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem className={classes.Section3BListItem}>
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
                      sm={2}
                      md={4}
                      lg={2}
                      className={classes.Icon}
                      style={{
                        backgroundColor: "#76C80E",
                      }}
                    >
                      <i class="fas fa-envelope-open-text"></i>
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
                        secondary="Total Applications"
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} className={classes.ChartGrid}>
              <Chart />
            </Grid>
            <Grid item md={6} xs={12} className={classes.Section2}>
              <div className={classes.Section2A}>
                <h3 className={classes.Section2Header}>Company Overview</h3>
                <List>
                  <ListItem className={classes.ListItem}>
                    <ListItemAvatar>
                      <CalenderIcon
                        style={{
                          color: "#ff5353",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Categories :"
                      secondary="Desgin and Creative"
                    />
                  </ListItem>
                  <ListItem className={classes.ListItem}>
                    <ListItemAvatar>
                      <LocationIcon
                        style={{
                          color: "#ff5353",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Location :"
                      secondary="Los Angeles , California"
                    />
                  </ListItem>
                  <ListItem className={classes.ListItem}>
                    <ListItemAvatar>
                      <InfoIco
                        style={{
                          color: "#ff5353",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary="Hotline :" secondary="1021234112" />
                  </ListItem>
                  <ListItem className={classes.ListItem}>
                    <ListItemAvatar>
                      <EmailIcon
                        style={{
                          color: "#ff5353",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email :"
                      secondary="luca@lucee.com"
                    />
                  </ListItem>
                  <ListItem className={classes.ListItem}>
                    <ListItemAvatar>
                      <PersonIcon
                        style={{
                          color: "#ff5353",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary="Company Size :" secondary="20-50" />
                  </ListItem>
                  <ListItem className={classes.ListItem}>
                    <ListItemAvatar>
                      <PublicIcon
                        style={{
                          color: "#ff5353",
                        }}
                      />
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
                    padding: "20px 20px",
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
            {/* <Grid
                     item
                     md={6}
                     xs={12}
                     className={classes.Section3}
                  >
                     <div className={classes.Section3A}>
                        <h3 className={classes.Section2Header}>
                           Our Location
                        </h3>
                     </div>
                     
                  </Grid> */}
            <Grid item xs={12} className={classes.Section5GridMain}>
              <Grid container className={classes.Section5GridContainer}>
                <Grid item md={7} sm={12} className={classes.Section5A}>
                  <h3 className={classes.Section2Header}>Recent Applicants</h3>
                  <List className={classes.ListBorder}>
                    <ListItem
                      className={`${classes.ListItem} ${classes.ListItemDivider}`}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div>
                            <img src={rc1Img} alt="" />
                          </div>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            justifyContent="center"
                          >
                            <h5>Aradya S.</h5>
                            <p
                              style={{
                                color: "#777777",
                              }}
                            >
                              App Designer
                            </p>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            variant="contained"
                            className={classes.ProfileBtn}
                            style={{
                              borderRadius: 0,
                              marginLeft: "unset",
                            }}
                          >
                            Send
                          </Button>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem
                      className={`${classes.ListItem} ${classes.ListItemDivider}`}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div>
                            <img src={rc2Img} alt="" />
                          </div>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            justifyContent="center"
                          >
                            <h5>Aradya S.</h5>
                            <p
                              style={{
                                color: "#777777",
                              }}
                            >
                              App Designer
                            </p>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            variant="contained"
                            className={classes.ProfileBtn}
                            style={{
                              borderRadius: 0,
                              marginLeft: "unset",
                            }}
                          >
                            Send
                          </Button>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem
                      className={`${classes.ListItem} ${classes.ListItemDivider}`}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div>
                            <img src={rc3Img} alt="" />
                          </div>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            justifyContent="center"
                          >
                            <h5>Aradya S.</h5>
                            <p
                              style={{
                                color: "#777777",
                              }}
                            >
                              App Designer
                            </p>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            variant="contained"
                            className={classes.ProfileBtn}
                            style={{
                              borderRadius: 0,
                              marginLeft: "unset",
                            }}
                          >
                            Send
                          </Button>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem className={`${classes.ListItem}`}>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div>
                            <img src={rc4Img} alt="" />
                          </div>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            justifyContent="center"
                          >
                            <h5>Aradya S.</h5>
                            <p
                              style={{
                                color: "#777777",
                              }}
                            >
                              App Designer
                            </p>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            variant="contained"
                            className={classes.ProfileBtn}
                            style={{
                              borderRadius: 0,
                              marginLeft: "unset",
                            }}
                          >
                            Send
                          </Button>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item md={5} sm={12} className={classes.Section5B}>
                  <h3 className={classes.Section2Header}>Recent Applicants</h3>
                  <List className={classes.ListBorder}>
                    <ListItem
                      className={`${classes.ListItem} ${classes.ListItemDivider}`}
                    >
                      <ListItemAvatar>
                        <LeftIcon />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Dobrick Published An Article :"
                        secondary="5 hours ago"
                      />
                    </ListItem>
                    <ListItem
                      className={`${classes.ListItem} ${classes.ListItemDivider}`}
                    >
                      <ListItemAvatar>
                        <LeftIcon />
                      </ListItemAvatar>
                      <ListItemText
                        secondary="5 hours ago"
                        primary="Dobrick Published An Article :"
                      />
                    </ListItem>
                    <ListItem
                      className={`${classes.ListItem} ${classes.ListItemDivider}`}
                    >
                      <ListItemAvatar>
                        <LeftIcon />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Someone Bookmarked You :"
                        secondary="5 hours ago"
                      />
                    </ListItem>
                    <ListItem className={`${classes.ListItem}`}>
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
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle style={{ paddingLeft: "150px", paddingRight: "150px" }}>
          <Typography color="secondary" variant="h5">
            Applicants
          </Typography>
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box textAlign="center">Loading... </Box>
          ) : (
            searchResults.map((val) => (
              <Box>
                <Typography color="primary" variant="body1">
                  Title:
                </Typography>
                <List>{val.jobtitle}</List>
                <Typography color="primary" variant="body1">
                  Company Name:
                </Typography>{" "}
                <List>{val.companyname}</List>
                <Typography color="primary" variant="body1">
                  Experience Required:
                </Typography>
                <List>{val.experience}</List>
                <Typography color="primary" variant="body1">
                  Salary Expected:
                </Typography>
                <List>{val.salary}</List>
                <Typography color="primary" variant="body1">
                  Location:
                </Typography>{" "}
                <List>{val.location}</List>
                {loadings ? (
                  <Button size="small" variant="contained" color="primary">
                    Approving...
                  </Button>
                ) : (
                  <Button
                    onClick={() => approve(val._id)}
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Approve
                  </Button>
                )}
                <Button
                  onClick={()=>applicantDetails(val._id)}
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  See Applicants
                </Button>
                <Box mb={2}>
                  <Divider />
                </Box>
              </Box>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setopen(false)}
            size="small"
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CompanyDashboard;
