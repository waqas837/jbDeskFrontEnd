import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { url } from "../../Api/Url";
import { ArrowBack, CloudUpload } from "@material-ui/icons";
const Logoupdate = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [logo, setlogo] = useState(null);
  const [file, setfile] = useState([]);
  const token = localStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const fileChange = (e) => {
    setfile(e.target.files[0]);
  };
  useEffect(() => {
    setlogo(true);
  }, []);
  const uploadImg = async (e) => {
    e.preventDefault();
    var fData = new FormData();
    fData.append("image", file);
    console.log(file);
    if (file.length === 0) {
      toast.error("Please select an image");
    }
    try {
      const { data } = await axios.put(`${url}/logoupdate/${id}`, fData, {
        headers,
      });
      console.log(data);
      if (data.success) {
        toast.success("Image Upload successfully");
        history.push("/admin/jobs");
      }
    } catch (error) {
      toast.error("Failed to upload");
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster />
      <Dialog open={logo} onClose={() => setlogo(false)}>
        <DialogTitle>Upload an image</DialogTitle>
        <form onSubmit={uploadImg} encType="multipart/form-data">
          <input type="file" name="image" onChange={fileChange} />
          <DialogActions>
            <Button
              onClick={props.history.goBack}
              variant="outlined"
              size="small"
              color="primary"
              style={{ fontSize: "10px", color: "red" }}
            >
              I Don't want upload image
            </Button>
            <Button
              onClick={uploadImg}
              variant="contained"
              size="small"
              color="primary"
            >
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Button
        startIcon={<CloudUpload fontSize="small" />}
        onClick={() => setlogo(true)}
      >
        Again upload image
      </Button>
      <Button
        startIcon={<ArrowBack fontSize="small" />}
        onClick={props.history.goBack}
      >
        Back
      </Button>
    </div>
  );
};

export default withRouter(Logoupdate);
