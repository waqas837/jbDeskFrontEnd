import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { imgurl, url } from "../../Api/Url";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader, ClipLoader } from "react-spinners";
import {Close} from "@material-ui/icons"
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
} from "@material-ui/core";

const AddJobDialog = ({openthree,setOpenthree}) => {
    const token = localStorage.getItem("token");
  const user = localStorage.getItem("email");
  const name = localStorage.getItem("username");
  const [loadingS, setloadingS] = useState(false);
  const [loadingtable, setloadingtable] = useState(false);
  const [update, setupdate] = useState([]);
  const [updatejob, setupdatejob] = useState([]);
  const [editload, seteditload] = useState(false);
  const [id, setid] = useState();
  const [state, setstate] = useState([]);
  const [opentwo, setOpentwo] = useState(false);
  
  const [openlogin, setopenlogin] = useState(true);
 
  const [stateS, setstateS] = useState([]);
 
  const [file, setfile] = useState({});
  const [logo, setlogo] = useState(null);
 
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
      const { data } = await axios.post(`${url}/addnewjob`, fdata);
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
  const history = useHistory()
    return (
        <div>
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
        </div>
    )
}

export default AddJobDialog
