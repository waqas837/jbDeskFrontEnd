import React,{useState,useEffect} from 'react'
import { Box,Snackbar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, OutlinedInput, Typography } from '@material-ui/core'
import {useStyles} from "../../Styles/RegisterDialog/RegisterDialog.styles";
import axios from "axios"
import {url} from "../../Api/Url";
import toast, { Toaster } from 'react-hot-toast';
import {Close, Email, Lock, PersonAdd} from "@material-ui/icons"

const Register = ({openRegister,setopenRegister}) => {
    const classes = useStyles();
    const [state, setstate] = useState()
    const [loading, setloading] = useState(false)
    const signup = async () =>{
        try { 
            setloading(true)
         const {data} =await axios.post(`${url}/signup`,state)
         console.log(data);
         if(data.name=== "MongoError"){
             setloading(false)
             toast.error("User already exists!")
         }
         if(data.errors){
            setloading(false)
            toast.error("Don't left any field empty") 
         }
         if(!data.name){
             console.log(data);
             
             localStorage.setItem("user",data.userData.username)
             localStorage.setItem("token",data.token)
             setloading(false)
             toast.success("Your account created successfully")
             setopenRegister(false)
             window.location.reload();
         }

        } catch (error) {
            console.log(`error during signup ${error}`)
           
        }
    }
    return (
        <div>
        <Toaster/>
             <Dialog open={openRegister} onClose={()=>setopenRegister(false)}>
               <DialogTitle>
<Box textAlign="center"><Typography variant="h5" color="secondary">Sign Up!</Typography></Box>
<Box className={classes.closeButton}><IconButton
            onClick={()=>setopenRegister(false)}
            ><Close fontSize="small"/></IconButton></Box>
<DialogContent>
    <DialogContentText>
        Please Register here and find more services..
    </DialogContentText>
    <Box textAlign="center"><OutlinedInput
     type="text"
     onChange={(e)=>setstate({...state,username:e.target.value})}
     placeholder="Enter Username"
     className={classes.inputHeight}
     endAdornment={<PersonAdd color="secondary" fontSize="small"/>}
     /></Box>
    <Box textAlign="center"><OutlinedInput
     type="email"
     onChange={(e)=>setstate({...state,email:e.target.value})}
     placeholder="Enter Email"
     endAdornment={<Email color="secondary" fontSize="small"/>}
     className={classes.inputHeight}/></Box>
    <Box textAlign="center"><OutlinedInput
    onChange={(e)=>setstate({...state,password:e.target.value})}
    type="password"
    placeholder="Enter Password"
    className={classes.inputHeight}
    endAdornment={<Lock color="secondary" fontSize="small"/>}

     /></Box>
</DialogContent>
<DialogActions>
    {
     loading?<Button style={{borderRadius:"0px",background:"#f06292",color:"white"}}
     variant="contained">. . .</Button>:<Button style={{borderRadius:"0px"}}
     onClick={signup}
     color="secondary"
     variant="contained">Sign Up</Button>
    }
</DialogActions>
               </DialogTitle>
            </Dialog>
        </div>
    )
}

export default Register;
