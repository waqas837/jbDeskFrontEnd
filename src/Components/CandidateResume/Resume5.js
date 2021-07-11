import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Stepper } from "react-form-stepper";
import * as action from "../Redux/AddSkills/actions";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { imgurl, url } from "../../Api/Url";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import MainDialog from "./MainDialog";
import { Add, LowPriority, Close } from "@material-ui/icons";
import {
  Box,
  Grid,
  Paper,
  Container,
  IconButton,
  Button,
  OutlinedInput,
  Typography,
  Slide,
  LinearProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import { useStyles } from "../../Styles/LoginDialog/LoginDialog.styles";
// This can recice some props
const Resume3 = () => {
  const classes = useStyles();
  const [state, setstate] = useState([]);
  const [open, setopen] = useState(false);
  const [opentwo, setopentwo] = useState(false);
  const [loading, setloading] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const dispatch = useDispatch();
  const selectorData = useSelector((state) => state.addSkillsReducer);
  const candidate = localStorage.getItem("candidate");

  const handleChange = () => {
    setChecked((prev) => !prev);
    setloading(true);
    axios
      .post(`${url}/uploadcv/${candidate}`, state)
      .then()
      .catch((err) => toast.error(`${err}`));
    setTimeout(() => {
      setloading(false);
      alert("Finished! Thanks for uploading cv");
    }, 1000);
  };
  const history = useHistory();
  const workData = JSON.parse(localStorage.getItem("addskills"));
  const addwork = () => {
    if (state.length === 0) {
      toast.error("Fill all fields");
    } else {
      dispatch(action.addSkills(state));
      setopen(false);
    }
  };
  //edit task
  const editTask = (id) => {
    console.log(selectorData.find((val) => val.id === id));
  };
  const deleteTask = (id) => {
    dispatch(action.removeSinle(id));
    toast.success("Skills removed");
    setopentwo(false);
  };
  const handlecancel = () => {
    setopen(false);
    setopentwo(false);
  };

  return (
    <div>
      <Toaster />
      {/* main dialog */}
      {/* <MainDialog
        editTask={editTask}
        deleteTask={deleteTask}
        setopen={setopen}
        setopentwo={setopentwo}
        open={open}
        opentwo={opentwo}
      /> */}
      <Stepper
        steps={[
          { label: "Step 1" },
          { label: "Step 2" },
          { label: "Step 3" },
          { label: "Step 4" },
          { label: "Step 5" },
        ]}
        activeStep={4}
      />
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
          {/* First step */}
          <Container maxWidth="xs">
            <Paper elevation={10} component={Box} p={4} mb={3}>
              <Box textAlign="center" mb={3} mt={-3}>
                <Typography variant="h5" color="secondary">
                  Add Skills
                </Typography>
              </Box>
              <Divider />
              <Box textAlign="center" my={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<Add />}
                  size="small"
                  onClick={() => setopen(true)}
                >
                  Add Skills
                </Button>
              </Box>
              {/* showing added work */}

              <Box textAlign="center" my={2}>
                {workData ? (
                  <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<LowPriority />}
                    size="small"
                    onClick={() => setopentwo(true)}
                  >
                    See Details
                  </Button>
                ) : null}
              </Box>

              {/* end buttons for showing works */}
              <Box textAlign="center">
                <Button
                  onClick={handleChange}
                  size="small"
                  className={classes.buttonRadius}
                  variant="contained"
                  color="secondary"
                >
                  Next
                </Button>
              </Box>
            </Paper>
          </Container>
        </Slide>
      )}
      {/* dialog for add work experience */}
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle>
          <Typography variant="h6" color="secondary">
            Skills
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* first 6 clolumns */}
            <Grid item xs={6} sm={6} md={6} lg={6} x={6}>
              <OutlinedInput
                onChange={(e) =>
                  setstate({ ...state, id: uuidv4(), skills: e.target.value })
                }
                placeholder="Skill"
                className={classes.inputHeight}
              />
            </Grid>
            {/* first 6 clolumns */}
            <Grid item xs={6} sm={6} md={6} lg={6} x={6}>
              <OutlinedInput
                onChange={(e) => setstate({ ...state, level: e.target.value })}
                placeholder="Level"
                className={classes.inputHeight}
              />
            </Grid>
            {/* 2nd line */}
            {/* first 6 clolumns */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.buttonRadius}
            size="small"
            variant="contained"
            color="secondary"
            onClick={addwork}
          >
            Add
          </Button>
          <Button
            className={classes.buttonRadius}
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handlecancel}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* show all data dialog */}
      {workData ? (
        <Dialog open={opentwo} onClose={() => setopentwo(false)}>
          <DialogTitle>Details</DialogTitle>
          <Divider />
          <DialogContent>
            {workData.map((val, index) => (
              <div key={index}>
                {/* we will let design it in a moment */}
                <li>{val.skills}</li>
                <li>{val.level}</li>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => deleteTask(val.id)}
                  color="default"
                >
                  Delete
                </Button>
                {/* <Button
                  size="small"
                  variant="outlined"
                  onClick={() => editTask(val.id)}
                  color="default"
                >
                  Edit
                </Button> */}
                <Divider />
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              variant="contained"
              onClick={() => setopentwo(false)}
              color="secondary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={opentwo} onClose={() => setopentwo(false)}>
          <DialogTitle>
            No Task was added
            <IconButton component={Box} ml={3}>
              <Close onClick={() => setopentwo(false)} />
            </IconButton>
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => setopen(true)}
              size="small"
              variant="contained"
              color="primary"
            >
              Add a new Task
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Resume3;
