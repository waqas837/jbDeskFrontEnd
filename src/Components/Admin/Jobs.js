import React, { useEffect, useState } from "react";
import { grey } from "@material-ui/core/colors";
import { imgurl } from "../../Api/Url";
import { AddOutlined, Menu } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { BeatLoader, ClipLoader } from "react-spinners";
import axios from "axios";
import { url } from "../../Api/Url";
import {
  IconButton,
  Box,
  TextareaAutosize,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Container,
  Typography,
  Divider,
  Dialog,
  Button,
  Input,
  DialogContentText,
  DialogTitle,
  makeStyles,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { Edit, Delete, Close } from "@material-ui/icons";
import toast, { Toaster } from "react-hot-toast";
import DrawerData from "../Admin/DrawerData";
// import AddHotelManager from "../AddHotelManger/AddHotelManager";
const useStyles = makeStyles((theme) => ({
  root: {},
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  title: {
    marginRight: "auto",
    fontWeight: "bold",
  },
  titleTwo: {
    color: "white",
    fontStyle: "bold",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "90%",
    },
  },
  alignLeft: {
    textAlign: "left",
  },
  appBar: {
    marginBottom: "5px",
  },

  resposive: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  hover: {
    "&:hover": {
      background: grey[200],
    },
  },
  respTable: {
    display: "block",
    width: "200px",
    height: "50px",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
}));

const Jobs = () => {
  const classes = useStyles();
  const history = useHistory();
  const [update, setupdate] = useState([]);
  const [updatejob, setupdatejob] = useState([]);
  useEffect(() => {
    getJobSingle();
  }, []);
  const [state, setstate] = useState([]);
  const [stateS, setstateS] = useState([]);
  const [loadingS, setloadingS] = useState(false);
  const [opentwo, setOpentwo] = useState(false);
  const [openthree, setOpenthree] = useState(false);
  // this is for add hotel manager

  const [id, setid] = useState();
  const [opendrawer, setopendrawer] = useState(false);
  const [file, setfile] = useState({});
  const [editload, seteditload] = useState(false);
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  //update logo
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
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to upload");
      console.log(error);
    }
  };
  //now we pass the headers every request for autheticate the user
  const headers = {
    authorization: `Bearer ${token}`,
  };
  console.log(updatejob);
  //we set file name in a state
  const onChangeFile = async (e) => {
    e.preventDefault();
    setfile(e.target.files[0]);
  };
  // add a new user/onsubmit form
  async function AddNewJob(e) {
    //here we first add all the job data
    var fdata = new FormData();
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
        toast.success("New user Added");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setloadingS(false);
      toast.error(`${error}`);
    }
  }
  console.log(update);
  // add a new user/onsubmit form
  async function updatesinglejob(e, myid) {
    e.preventDefault();
    try {
      setloadingS(true);
      // if (stateS.email === undefined) {
      //   toast.error("Don't left any field empty");
      // }
      const { data } = await axios.patch(
        `${url}/updateSingleJob/${myid}`,
        updatejob,
        { headers }
      );
      console.log(data);
      setloadingS(false);
      //here is the error to check whether response data is coming
      //handle this one
      //  setdupUser(data.driver)
      if (!data.errors && !data.passerr && !data.code) {
        localStorage.setItem("user", data);
        setloadingS(false);
        toast.success("Data updated");
        history.push(`/admin/logoupdate/${update._id}`);
      }
    } catch (error) {
      console.log(error);
      setloadingS(false);
      toast.error(`${error}`);
    }
  }
  // getall data
  const [loadingtable, setloadingtable] = useState(null);
  //notice that data which is coming from the backend is always inside an object
  //show full list data get
  const getJobSingle = async () => {
    try {
      setloadingtable(true);
      const { data } = await axios.get(`${url}/getsinglejob`, { headers });
      console.log(data.results);
      setstate(data.results);
      setloadingtable(false);
    } catch (error) {
      console.log(error);
      //  setopen(true)
      setloadingtable(false);
    }
  };

  //   array of an object
  function handleCloseTwo() {
    setOpentwo(false);
  }
  async function edit(findID) {
    setOpentwo(true);
    seteditload(true);
    setid(id);
    const { data } = await axios.get(`${url}/findSingleJob/${findID}`, {
      headers,
    });
    // console.log(data.data);

    console.log(data);
    setupdate(data.data);
    seteditload(false);
  }

  //DELETE single job
  async function delet(id) {
    const { data } = await axios.delete(`${url}/deleteAsingleJob/${id}`, {
      headers,
    });
    // console.log(data);
    if (data.success) {
      toast.success("User deleted");
      window.location.reload();
    }
  }
  return (
    <div>
      <Toaster />
      <DrawerData opendrawer={opendrawer} setopendrawer={setopendrawer} />
      {/* add the hotel manager */}
      {/* <AddHotelManager openfour={openfour} setopenfour={setopenfour}/> */}
      {/* navbar */}
      <AppBar position="static" color="inherit">
        <Toolbar>
          {/* menu icon button */}
          <IconButton onClick={() => setopendrawer(true)}>
            <Menu color="secondary" />
          </IconButton>
          {/* logo */}
          <Button
            style={{ width: "10%" }}
            size="small"
            onClick={() => history.push("/")}
            className={classes.title}
          >
            <Typography
              variant="h6"
              color="secondary"
              style={{ color: "hotpink" }}
              className={classes.titleTwo}
            >
              {/* <img width="80px" src={logo} alt="" /> */}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
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
                New job
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

      {/* update a user dialouge */}
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
                <>
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
                </>
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

              <br />

              {loadingS ? (
                <Button
                  fullWidth
                  style={{
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

      <Container>
        <Grid container component={Box} ml={1} mt={3} textAlign="center">
          {/* colomn1 */}
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography variant="h4" color="secondary" component={Box}>
              Admin Panel
            </Typography>
          </Grid>
          {/* colomn2 */}
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Button
              color="secondary"
              style={{
                height: "37px",
                fontSize: "10px",
                marginLeft: "60px",
              }}
              onClick={() => setOpenthree(true)}
              size="small"
              variant="contained"
            >
              <AddOutlined
                fontSize="small"
                onClose={() => setOpenthree(true)}
              />
              Add new job
            </Button>
          </Grid>

          <Divider />
        </Grid>
      </Container>
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
                  Salary
                </TableCell>
                <TableCell
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
                </TableCell>
                <TableCell
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
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", color: "whitesmoke" }}
                  align="center"
                >
                  Total hours/week
                </TableCell>
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
                    <TableCell align="center">{row.salary}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.experience}</TableCell>
                    <TableCell align="center">
                      <span className={classes.respTable}>
                        {row.jobdescription}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span className={classes.respTable}>{row.jobresp}</span>
                    </TableCell>
                    <TableCell align="center">
                      {row.minimumqulification}
                    </TableCell>
                    <TableCell align="center">{row.howtoapply}</TableCell>
                    <TableCell align="center">{row.totalhrs}</TableCell>
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
    </div>
  );
};

export default Jobs;
