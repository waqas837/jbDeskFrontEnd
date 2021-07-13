import React, { useState, useEffect } from "react";
import Styles from "../../Styles/Company Styles/dashboard.styles";
import image from "../../Assets/Images/companyImg.png";
import { NavLink, withRouter } from "react-router-dom";
import AddJobDialog from "./AddJobDialog";
import { useHistory } from "react-router-dom";
import { BeatLoader, ClipLoader } from "react-spinners";
import {
  useTheme,
  Grid,
  Button,
  TableContainer,
  Container,
  Table,
  TableHead,
  TableRow,
  Box,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Dialog,
  Typography,
  Input,
  DialogContentText,
  TextareaAutosize,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import toast, { Toaster } from "react-hot-toast";
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
  Delete,
  Edit,
  Close,
} from "@material-ui/icons/";
import { Facebook, Trash2, Twitter, Linkedin, Briefcase } from "react-feather";
import axios from "axios";
import Sidebar from "./Sidebar";
import { imgurl, url } from "../../Api/Url";
import { grey } from "@material-ui/core/colors";
const Managejobs = (props) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("email");
  const name = localStorage.getItem("username");
  const [openthree, setOpenthree] = useState(false);
  const [loadingS, setloadingS] = useState(false);
  const [loadingtable, setloadingtable] = useState(false);
  const [update, setupdate] = useState([]);
  const [updatejob, setupdatejob] = useState([]);
  const [editload, seteditload] = useState(false);
  const [id, setid] = useState();
  const [state, setstate] = useState([]);
  const [opentwo, setOpentwo] = useState(false);
  const [logo, setlogo] = useState(null);
  const [file, setfile] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getCompanyData();
  }, []);
  //file onchange
  const fileChange = (e) => {
    setfile(e.target.files[0]);
  };
  //upload image
  const uploadImg = async (e) => {
    e.preventDefault();
    var fData = new FormData();
    fData.append("image", file);
    console.log(file);
    if (file.length === 0) {
      toast.error("Please select an image");
    }
    try {
      const { data } = await axios.put(
        `${url}/logoupdate/${update._id}`,
        fData
      );
      console.log(data);
      if (data.success) {
        toast.success("Image Upload successfully");
        // window.location.reload();
        setOpentwo(false);
      }
    } catch (error) {
      toast.error("Failed to upload");
      console.log(error);
      setOpentwo(false);
    }
  };
  // update a single job
  async function updatesinglejob(e, myid) {
    e.preventDefault();
    try {
      setloadingS(true);
      // if (stateS.email === undefined) {
      //   toast.error("Don't left any field empty");
      // }
      const { data } = await axios.patch(
        `${url}/updateSingleJob/${myid}`,
        updatejob
      );
      console.log(data);
      setloadingS(false);
      //here is the error to check whether response data is coming
      //handle this one
      //  setdupUser(data.driver)
      if (!data.errors && !data.passerr && !data.code) {
        setloadingS(false);
        toast.success("Data updated");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setloadingS(false);
      toast.error(`${error}`);
    }
  }
  // ge
  //show the single job
  const showSingleJob = (jobId) => {
    history.push(`/jobs/single/${jobId}`);
  };
  //   array of an object
  function handleCloseTwo() {
    setOpentwo(false);
  }
  async function edit(findID) {
    setOpentwo(true);
    seteditload(true);
    setid(id);
    const { data } = await axios.get(`${url}/findSingleJob/${findID}`);
    // console.log(data.data);

    console.log(data);
    setupdate(data.data);
    seteditload(false);
  }

  //DELETE single job
  async function delet(id) {
    const { data } = await axios.delete(`${url}/deleteAsingleJob/${id}`);
    // console.log(data);
    if (data.success) {
      toast.success("User deleted");
      window.location.reload();
    }
  }
  //get all data where company exists only
  const getCompanyData = async () => {
    setloadingtable(true);
    try {
      const { data } = await axios.get(`${url}/getCompanyData`);
      setstate(data.results);
      // console.log(data.results);
      setloadingtable(false);
    } catch (error) {
      setloadingtable(false);
      console.log(error);
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("useremail");
    localStorage.removeItem("token");
    window.location.reload();
  };
  const theme = useTheme();
  const styleProps = {
    theme,
  };
  const classes = Styles(styleProps);
  const history = useHistory();
  return (
    <div>
      <Toaster />
      {/* dialog add a new job */}

      {/* dialog for the edit/update the job  */}
      <Dialog
        onClose={handleCloseTwo}
        aria-labelledby="simple-dialog-title"
        open={opentwo}
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
                Update Job
              </Typography>
              <Box style={{ marginLeft: "300px", marginTop: "-35px" }}>
                <IconButton
                  style={{ padding: "0px" }}
                  onClick={() => setOpentwo(false)}
                >
                  <Close />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContentText>
          <Divider />
          <Container>
            <Box mt={1} textAlign="center">
              <br />
              {update === undefined ? (
                <ClipLoader />
              ) : (
                <div>
                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <Input
                      onChange={(e) =>
                        setupdatejob({ ...updatejob, jobtitle: e.target.value })
                      }
                      placeholder="Update jobtitle"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.jobtitle}
                      required="true"
                    />
                  )}
                  <br />
                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <Input
                      onChange={(e) =>
                        setupdatejob({ ...updatejob, category: e.target.value })
                      }
                      placeholder="Update category"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.category}
                      required="true"
                    />
                  )}
                  <br />
                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <Input
                      onChange={(e) =>
                        setupdatejob({
                          ...updatejob,
                          companyname: e.target.value,
                        })
                      }
                      placeholder="Update companyname"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.companyname}
                      required="true"
                    />
                  )}
                  <br />
                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <Input
                      onChange={(e) =>
                        setupdatejob({
                          ...updatejob,
                          experience: e.target.value,
                        })
                      }
                      placeholder="Update experience"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.experience}
                      required="true"
                    />
                  )}

                  <br />
                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <Input
                      onChange={(e) =>
                        setupdatejob({ ...updatejob, salary: e.target.value })
                      }
                      placeholder="Update salary"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.salary}
                      required="true"
                    />
                  )}
                  <br />
                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <Input
                      onChange={(e) =>
                        setupdatejob({ ...updatejob, time: e.target.value })
                      }
                      placeholder="Update time"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.time}
                      required="true"
                    />
                  )}
                  <br />
                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <Input
                      onChange={(e) =>
                        setupdatejob({ ...updatejob, totalhrs: e.target.value })
                      }
                      placeholder="Update totalhrs"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.totalhrs}
                      required="true"
                    />
                  )}
                  <br />
                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <Input
                      onChange={(e) =>
                        setupdatejob({
                          ...updatejob,
                          workinghours: e.target.value,
                        })
                      }
                      placeholder="Update workinghours"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.workinghours}
                      required="true"
                    />
                  )}
                  <br />

                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <Input
                      onChange={(e) =>
                        setupdatejob({
                          ...updatejob,
                          minimumqulification: e.target.value,
                        })
                      }
                      placeholder="Update minimum qulification"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.minimumqulification}
                      required="true"
                    />
                  )}
                  <br />

                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <Input
                      onChange={(e) =>
                        setupdatejob({ ...updatejob, location: e.target.value })
                      }
                      placeholder="Update location"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.location}
                      required="true"
                    />
                  )}
                  <br />
                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <Input
                      type="date"
                      onChange={(e) =>
                        setupdatejob({ ...updatejob, date: e.target.value })
                      }
                      placeholder="Update date"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.date}
                      required="true"
                    />
                  )}
                  <br />

                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <TextareaAutosize
                      onChange={(e) =>
                        setupdatejob({
                          ...updatejob,
                          jobdescription: e.target.value,
                        })
                      }
                      placeholder="Update job description"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.jobdescription}
                      required="true"
                    />
                  )}
                  <br />

                  {editload ? (
                    <span>wait...</span>
                  ) : (
                    <Input
                      onChange={(e) =>
                        setupdatejob({ ...update, howtoapply: e.target.value })
                      }
                      placeholder="Update how to apply"
                      style={{ marginBottom: "10px" }}
                      defaultValue={update.howtoapply}
                      required="true"
                    />
                  )}
                  <br />
                </div>
              )}
              <img
                src={`${imgurl}/${update.logo}`}
                style={{
                  marginLeft: "150px",
                  width: "35px",
                  height: "35px",
                  borderRadius: "100px",
                }}
                alt=""
              />
              <br />
              <Box textAlign="left">Update logo:</Box>
              <form onSubmit={uploadImg} encType="multipart/form-data">
                <input type="file" name="image" onChange={fileChange} />
                <br />
                <Button
                  onClick={uploadImg}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Upload
                </Button>
              </form>
              <br />
              {loadingS ? (
                <Button
                  fullWidth
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    backgroundColor: "rgb(254,181,2)",
                    color: "black",
                  }}
                  color="primary"
                  startIcon={<ClipLoader size="10" color="black" />}
                >
                  Processing...
                </Button>
              ) : (
                <Button
                  fullWidth
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  color="secondary"
                  variant="contained"
                  onClick={(e) => updatesinglejob(e, update._id)}
                >
                  Update Job
                </Button>
              )}
            </Box>
          </Container>
        </DialogContentText>
      </Dialog>
      {/* end dilog for edit job */}
      {/* import the sidebar here */}
      <Grid container spacing={4} className={classes.GridContainer}>
        {/* this grid contains 3 coloumns */}
        <Grid item xs={12} md={3} sm={12}>
          <Sidebar />
        </Grid>
        {/* this grid contains 9 coloumns*/}
        <Grid item xs={12} sm={12} md={9}>
          <Container maxWidth="md">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead style={{ background: grey[900] }}>
                  <TableRow>
                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                    >
                      Job title
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      CompanyName
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Logo
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      {/* changes are remiaining */}
                      WorkingTime
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Location
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Hours
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Show Details
                    </TableCell>
                    {/* <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Salary
                    </TableCell> */}
                    {/* <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Category
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Date Posted
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Experience
                    </TableCell> */}
                    {/* <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Job Description
                    </TableCell>

                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Responsibilities
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Minimal Qualifications
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      How to Apply
                    </TableCell> */}
                    {/* <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Total hours/week
                    </TableCell> */}
                    <TableCell
                      style={{ fontWeight: "bolder", color: "whitesmoke" }}
                      align="center"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingtable ? (
                    <Box ml={40}>
                      <BeatLoader size="15" color="rgb(254,170,2)" />
                    </Box>
                  ) : (
                    state.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.jobtitle}</TableCell>
                        <TableCell align="center">{row.companyname}</TableCell>
                        <TableCell align="center">
                          <img
                            src={`${imgurl}/${row.logo}`}
                            alt=""
                            style={{
                              width: "50px",
                              height: "50px",
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">{row.workinghours}</TableCell>
                        <TableCell align="center">{row.location}</TableCell>
                        <TableCell align="center">{row.time}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => showSingleJob(row._id)}
                            style={{ fontSize: "10px" }}
                            variant="contained"
                            color="primary"
                            fontSize="small"
                          >
                            Show
                          </Button>
                        </TableCell>
                        {/* <TableCell align="center">{row.salary}</TableCell> */}
                        {/* <TableCell align="center">{row.category}</TableCell>
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">{row.experience}</TableCell> */}
                        {/* <TableCell align="center">
                          <span className={classes.respTable}>
                            {row.jobdescription}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span className={classes.respTable}>
                            {row.jobresp}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          {row.minimumqulification}
                        </TableCell>
                        <TableCell align="center">{row.howtoapply}</TableCell> */}
                        {/* <TableCell align="center">{row.totalhrs}</TableCell> */}
                        <TableCell align="center">
                          <IconButton onClick={() => edit(row._id)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => delet(row._id)}>
                            <Delete color="secondary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(Managejobs);
