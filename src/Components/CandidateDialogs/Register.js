import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../../Styles/RegisterDialog/RegisterDialog.styles";
import axios from "axios";
import { url } from "../../Api/Url";
import toast, { Toaster } from "react-hot-toast";
import { Close, Email, Lock, PersonAdd } from "@material-ui/icons";

const Register = ({ openRegister, setopenRegister }) => {
  const classes = useStyles();
  const history = useHistory()
  const [state, setstate] = useState();
  const [stateS, setstateS] = useState();
  const [file, setfile] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingS, setloadingS] = useState(false);
  const user = localStorage.getItem("candidate");
   const checkUserFirst = () => {
    if (!user) {
      history.push("/");
    } else if (user) {
      setopenRegister(false);
    }
  };
  // file change
  const changefile = (e) =>{
  setfile(e.target.files[0])
  }
   // add a new user/onsubmit form
   async function AddNewCandidate(e) {
    //here we first add all the job data
    var fdata = new FormData();
    fdata.append("username", state.username);
    fdata.append("email", state.email);
    fdata.append("password", state.password);
    fdata.append("jobdescription", state.jobdescription);
    fdata.append("location", state.location);
    fdata.append("website", state.website);
    fdata.append("facebook", state.facebook);
    fdata.append("twitter", state.twitter);
    fdata.append("linkdin", state.linkdin);
    fdata.append("profile", file);

    e.preventDefault();
    try {
      setloadingS(true);
      // if (stateS.email === undefined) {
      //   toast.error("Don't left any field empty");
      // }
      const { data } = await axios.post(`${url}/addnewcandidate`, fdata);
      console.log(data);
      setloadingS(false);
      //here is the error to check whether response data is coming
      //handle this one
      //  setdupUser(data.driver)
      if (!data.errors && !data.passerr && !data.code) {
        localStorage.setItem("candidate", data.results.email);
        setloadingS(false);
        toast.success("You are successfully registered");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setloadingS(false);
      toast.error(`${error}`);
    }
  }

  return (
    <div>
     
      <Toaster />
      <Dialog
       open={openRegister}
       BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
        onClose={checkUserFirst}>
        <DialogTitle>
          <Box textAlign="center">
            <Typography variant="h5" color="secondary">
              Sign Up!
            </Typography>
          </Box>
          <Box className={classes.closeButton}>
            <IconButton onClick={checkUserFirst}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
          <DialogContent>
            <DialogContentText>
              Please Register and Make your cv after Register
            </DialogContentText>
            <Box textAlign="center">
              <OutlinedInput
                type="text"
                onChange={(e) =>
                  setstate({ ...state, username: e.target.value })
                }
                placeholder="Enter Username"
                className={classes.inputHeight}
                endAdornment={<PersonAdd color="secondary" fontSize="small" />}
              />
            </Box>
            <Box textAlign="center">
              <OutlinedInput
                type="email"
                onChange={(e) => setstate({ ...state, email: e.target.value })}
                placeholder="Enter Email"
                endAdornment={<Email color="secondary" fontSize="small" />}
                className={classes.inputHeight}
              />
            </Box>
            <Box textAlign="center">
              <OutlinedInput
                onChange={(e) =>
                  setstate({ ...state, password: e.target.value })
                }
                
                placeholder="Enter Password"
                className={classes.inputHeight}
                endAdornment={<Lock color="secondary" fontSize="small" />}
              />
            </Box>

            
            <Box textAlign="center">
              <OutlinedInput
                onChange={(e) =>
                  setstate({ ...state, jobdescription: e.target.value })
                }
                
                placeholder="Enter job description"
                className={classes.inputHeight}
                endAdornment={<Lock color="secondary" fontSize="small" />}
              />
            </Box>
            <Box textAlign="center">
              <OutlinedInput
                onChange={(e) =>
                  setstate({ ...state, location: e.target.value })
                }
                
                placeholder="Enter location"
                className={classes.inputHeight}
                endAdornment={<Lock color="secondary" fontSize="small" />}
              />
            </Box>
            {/* <Box textAlign="center">
              <OutlinedInput
                onChange={(e) =>
                  setstate({ ...state, phone: e.target.value })
                }
               
                placeholder="Enter phone"
                className={classes.inputHeight}
                endAdornment={<Lock color="secondary" fontSize="small" />}
              />
               <OutlinedInput
                onChange={(e) =>
                  setstate({ ...state, website: e.target.value })
                }
               
                placeholder="Enter website"
                className={classes.inputHeight}
                endAdornment={<Lock color="secondary" fontSize="small" />}
              />
               <OutlinedInput
                onChange={(e) =>
                  setstate({ ...state, facebook: e.target.value })
                }
               
                placeholder="Enter facebook"
                className={classes.inputHeight}
                endAdornment={<Lock color="secondary" fontSize="small" />}
              />
               <OutlinedInput
                onChange={(e) =>
                  setstate({ ...state, twitter: e.target.value })
                }
               
                placeholder="Enter twitter"
                className={classes.inputHeight}
                endAdornment={<Lock color="secondary" fontSize="small" />}
              />
              <OutlinedInput
                onChange={(e) =>
                  setstate({ ...state, linkdin: e.target.value })
                }
               
                placeholder="Enter linkdin"
                className={classes.inputHeight}
                endAdornment={<Lock color="secondary" fontSize="small" />}
              />*/}
              <span>upload Profile:</span>
              <input onChange={changefile} type="file" name="profile"/>
            {/* </Box>  */}
          </DialogContent>
          <DialogActions>
            {loading ? (
              <Button
                style={{
                  borderRadius: "0px",
                  background: "#f06292",
                  color: "white",
                }}
                variant="contained"
              >
                . . .
              </Button>
            ) : (
              <Button
                style={{ borderRadius: "0px" }}
                onClick={AddNewCandidate}
                color="secondary"
                variant="contained"
              >
                Sign Up
              </Button>
            )}
          </DialogActions>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default Register;
