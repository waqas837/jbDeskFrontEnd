import React,{useState} from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, OutlinedInput, Typography } from '@material-ui/core'
import Register from "../UserDialog/Register"
import { Close, Email, Lock, PersonAdd } from '@material-ui/icons';
import {useStyles} from "../../Styles/LoginDialog/LoginDialog.styles"
const Login = ({openlogin,setopenlogin}) => {
    const classes = useStyles();
    const [openRegister, setopenRegister] = useState(false);
    const [state, setstate] = useState(false);
    //open Register dialog and close the sign in
    const registerUserDialog = () =>{
        setopenlogin(false)
        setopenRegister(true)
    }
    return (
        // drawer for login
        <div>
        <Register openRegister={openRegister}  setopenRegister={setopenRegister}/>

        {/* Click to open above register drawer */}
            <Dialog
             open={openlogin} onClose={()=>setopenlogin(false)}>
            <DialogTitle><Box textAlign="center">
            <Typography variant="h5" color="secondary">
                Login!
            </Typography></Box>
            <Box className={classes.closeButton}><IconButton
            onClick={()=>setopenlogin(false)}
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
     onChange={(e)=>setstate({...state,passoword:e.target.value})}
     placeholder="Enter Password"
     endAdornment={<Lock color="secondary" fontSize="small"/>}
     className={classes.inputHeight}/></Box>
                </Box>
     <Box textAlign="center"><Button
            color="secondary"
            variant="contained"
            className={classes.buttonRadius}
             // onClick={registerUserDialog}
                >Log In</Button>
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
                onClick={registerUserDialog}
                >Sign up</Button>
            </DialogActions>
                
            </Dialog>
        </div>
    )
}

export default Login;
