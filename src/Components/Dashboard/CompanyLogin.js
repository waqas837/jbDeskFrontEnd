import React,{useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, OutlinedInput, Typography } from '@material-ui/core'
import Register from "../UserDialog/Register"
import toast, { Toaster } from 'react-hot-toast';
import {url} from "../../Api/Url"
import { Close, Email, Lock } from '@material-ui/icons';
import {useStyles} from "../../Styles/LoginDialog/LoginDialog.styles"
import jwt from "jsonwebtoken"
import axios from 'axios';
const CompanyLogin = ({openlogin,setopenlogin}) => {
     const token = localStorage.getItem("token");
     const user = localStorage.getItem("email");
     const decode = jwt.decode(token)
    const history = useHistory()
    const classes = useStyles()
    const [state,setstate] = useState()
    const [loading,setloading] = useState(false)
    // go and logic company account
    const login = async () =>{
        setloading(true)
try {
   const {data} = await axios.post(`${url}/logincompany`,state)
    
   if(data.err){
  toast.error("Invalid email/password")
  setloading(false)
   }
   if(data.status==="ok"){
       localStorage.setItem("token",data.token)
       localStorage.setItem("username",data.userData.username)
       localStorage.setItem("email",data.userData.email)
       setloading(false)
       toast.success("Login successfully")
       setopenlogin(false)
       window.location.reload();
   }
} catch (error) {
    console.log(error);
}
    }
    //open Register dialog and close the sign in
    const registerUserDialog = () =>{
        // setopenlogin(false)
        // setopenRegister(true)
    }
const checkClose = () =>{
    if(user!==null && decode.email!==null && user===decode.email){
        setopenlogin(false)
    }
    else{
        history.push("/")
    }
}
    return (
        <div>
          <Dialog
             open={openlogin} onClose={checkClose}
             BackdropProps={{
            classes: {
            root: classes.backDrop,
        },
      }}
             >
            <DialogTitle><Box textAlign="center">
            <Typography variant="h5" color="secondary">
                Login!
            </Typography></Box>
            <Box className={classes.closeButton}><IconButton
            onClick={checkClose}
            ><Close fontSize="small"/></IconButton></Box></DialogTitle>
            <DialogContent>
                <DialogContentText>Login to our site and find more services</DialogContentText>
                <Box mx={5} my={1}>
                <Box textAlign="center">
                 <OutlinedInput
                 onChange={(e)=>setstate({...state,email:e.target.value})}
     placeholder="Enter Email"
     className={classes.inputHeight}
     endAdornment={<Email color="secondary" fontSize="small"/>}
     /></Box>
    <Box textAlign="center">
    <OutlinedInput
     onChange={(e)=>setstate({...state,password:e.target.value})}
     type="password"
     placeholder="Enter Password"
     endAdornment={<Lock color="secondary" fontSize="small"/>}
     className={classes.inputHeight}/></Box>
                </Box>
     <Box textAlign="center">
     {loading?<Button
            style={{color:"white",background:"#f06292"}}
            variant="contained"
            className={classes.buttonRadius}
                 >. . . </Button>:<Button
            color="secondary"
            variant="contained"
            className={classes.buttonRadius}
                onClick={login}
                >Log In</Button>}
                </Box>
            </DialogContent>
            <DialogActions>
            <Typography
            varianat="subtitle1"
            >Not already have an account?</Typography>
                <Button
                color="secondary"
                variant="outlined"
                className={classes.buttonRadius}
                // onClick={registerUserDialog}
                >Sign up</Button>
            </DialogActions>
                
            </Dialog>
        </div>
    )
}

export default CompanyLogin
