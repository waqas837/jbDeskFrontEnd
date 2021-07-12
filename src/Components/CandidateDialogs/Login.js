import React, { useState, useEffect } from "react";
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
import Register from "../CandidateDialogs/Register";
import toast, { Toaster } from "react-hot-toast";
import { url } from "../../Api/Url";
import { Close, Email, Lock } from "@material-ui/icons";
import { useStyles } from "../../Styles/LoginDialog/LoginDialog.styles";
import axios from "axios";
const Login = ({ openlogin, setopenlogin }) => {
  const candidate = localStorage.getItem("candidate");
  const classes = useStyles();
  const [openRegister, setopenRegister] = useState(false);
  const [state, setstate] = useState(false);
  const [loading, setloading] = useState(false);
  //   check candiate

  const history = useHistory();
  const checkCandidate = () => {
    if (!candidate) {
      setopenlogin(true);
      history.push("/");
    } else if (candidate) {
      setopenlogin(false);
    }
  };
 
  const login = async () => {
    setloading(true);
    try {
      const { data } = await axios.post(`${url}/candidateLogin`, state);
      console.log(data);
      if (data.err) {
        toast.error("Invalid email/password");
        setloading(false);
      }
      if (data.status === "ok") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("candidate", data.userData.email);
        localStorage.setItem("candidateid", data.userData._id);
        setloading(false);
        toast.success("Login successfully");
        setopenlogin(false);
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };
  //open Register dialog and close the sign in
  const registerUserDialog = () => {
    setopenlogin(false);
    setopenRegister(true);
  };
  return (
    // drawer for login
    <div>
      <Register openRegister={openRegister} setopenRegister={setopenRegister} />
      <Toaster />
      {/* Click to open above register drawer */}
      <Dialog
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
        open={openlogin}
        onClose={checkCandidate}
      >
        <DialogTitle>
          <Box textAlign="center">
            <Typography variant="h5" color="secondary">
              Login!
            </Typography>
          </Box>
          <Box className={classes.closeButton}>
            <IconButton onClick={checkCandidate}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Login to our site and find more services
          </DialogContentText>
          <Box mx={5} my={1}>
            <Box textAlign="center">
              <OutlinedInput
                onChange={(e) => setstate({ ...state, email: e.target.value })}
                placeholder="Enter Email"
                className={classes.inputHeight}
                endAdornment={<Email color="secondary" fontSize="small" />}
              />
            </Box>
            <Box textAlign="center">
              <OutlinedInput
                onChange={(e) =>
                  setstate({ ...state, password: e.target.value })
                }
                type="password"
                placeholder="Enter Password"
                endAdornment={<Lock color="secondary" fontSize="small" />}
                className={classes.inputHeight}
              />
            </Box>
          </Box>
          <Box textAlign="center">
            {loading ? (
              <Button
                style={{ color: "white", background: "#f06292" }}
                variant="contained"
                className={classes.buttonRadius}
              >
                . . .{" "}
              </Button>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                className={classes.buttonRadius}
                onClick={login}
              >
                Log In
              </Button>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Typography varianat="subtitle1">
            Not already have an account?
          </Typography>
          <Button
            color="secondary"
            variant="outlined"
            className={classes.buttonRadius}
            onClick={registerUserDialog}
          >
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
