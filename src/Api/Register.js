import React,{useEffect} from "react";
import { url } from "./Url";
import axios from "axios";
const Register = () => {
  const [state, setstate] = React.useState();
  const [dataReg, setdataReg] = React.useState();
  useEffect(() => {
    registerUser()
  }, [dataReg])
  const registerUser = async () => {
    try {
      const { data } = await axios.post(`${url}/singup`, state);
      console.log(data);
      setdataReg(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    dataReg,
  };
};

export default Register;
