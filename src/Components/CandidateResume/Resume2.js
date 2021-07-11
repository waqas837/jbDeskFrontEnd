import React, { useState } from "react";
import { Stepper } from "react-form-stepper";
import { useHistory } from "react-router-dom";
import {imgurl,url} from "../../Api/Url"
import axios from "axios"
import {
  Box,
  TextareaAutosize,
  Paper,
  Container,
  Button,
  Typography,
  Slide,
  LinearProgress,
} from "@material-ui/core";
import { useStyles } from "../../Styles/LoginDialog/LoginDialog.styles";
import toast from "react-hot-toast";
const Resume2 = () => {
  const classes = useStyles();
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const candidate = localStorage.getItem("candidate")
  const handleChange = async () => {
    setChecked((prev) => !prev);
    setloading(true);
    axios.post(`${url}/uploadcv/${candidate}`,state).then().catch((err)=>toast.error(`${err}`))
    setTimeout(() => {
      setloading(false);
      history.push("/candidate/resume3");
    }, 1000);
  };

  const history = useHistory();
  return (
    <div>
      <Stepper
        steps={[
          { label: "Step 1" },
          { label: "Step 2" },
          { label: "Step 3" },
          { label: "Step 4" },
          { label: "Step 5" },
        ]}
        activeStep={1}
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
                  Objective Of CV
                </Typography>
              </Box>
              <Box textAlign="center">
                {/* enter fullname */}
                <TextareaAutosize
                  onChange={(e) =>
                    setstate({ ...state, object: e.target.value })
                  }
                  placeholder="Show my objective on my resume"
                  className={classes.inputHeight}
                />
              </Box>
              
              <Box textAlign="center">
                <Button
                  onClick={handleChange}
                  size="small"
                  style={{ borderRadius: "0px" }}
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
    </div>
  );
};

export default Resume2;
