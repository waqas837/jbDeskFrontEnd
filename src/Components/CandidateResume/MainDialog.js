import React from "react";
import {
  Box,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
const MainDialog = ({
  setopen,
  open,
  getData,
  setopentwo,
  opentwo,
  deleteTask,
  editTask,
}) => {
  const workData = JSON.parse(localStorage.getItem("addwork"));
  const Education = JSON.parse(localStorage.getItem("addEducation"));
  const skills = JSON.parse(localStorage.getItem("addskills"));

  return (
    <div>
      {workData ? (
        <Dialog open={opentwo} onClose={() => setopentwo(false)}>
          <DialogTitle>Details</DialogTitle>
          <Divider />
          <DialogContent>
            {workData.map((val, index) => (
              <div key={index}>
                {/* we will let design it in a moment */}
                <li>{val.position}</li>
                <li>{val.company}</li>
                <li>{val.location}</li>
                <li>{val.startdate}</li>
                <li>{val.enddate}</li>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => deleteTask(val.id)}
                  color="default"
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => editTask(val.id)}
                  color="default"
                >
                  Edit
                </Button>
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

export default MainDialog;
