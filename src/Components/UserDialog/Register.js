import React,{useState} from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, OutlinedInput, Typography } from '@material-ui/core'
import {useStyles} from "../../Styles/RegisterDialog/RegisterDialog.styles";
import {Close, Email, Lock, PersonAdd} from "@material-ui/icons"
const Register = ({openRegister,setopenRegister}) => {
    const classes = useStyles();
    const [state, setstate] = useState()
    return (
        <div>
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
    onChange={(e)=>setstate({...state,username:e.target.value})}
     placeholder="Enter Username"
     className={classes.inputHeight}
     endAdornment={<PersonAdd color="secondary" fontSize="small"/>}
     /></Box>
    <Box textAlign="center"><OutlinedInput
    onChange={(e)=>setstate({...state,email:e.target.value})}
     placeholder="Enter Email"
     endAdornment={<Email color="secondary" fontSize="small"/>}
     className={classes.inputHeight}/></Box>
    <Box textAlign="center"><OutlinedInput
    onChange={(e)=>setstate({...state,password:e.target.value})}
    placeholder="Enter Password"
    className={classes.inputHeight}
    endAdornment={<Lock color="secondary" fontSize="small"/>}

     /></Box>
</DialogContent>
<DialogActions>
    <Button style={{borderRadius:"0px"}}
     color="secondary"
     variant="contained">Sign Up</Button>
</DialogActions>
               </DialogTitle>
            </Dialog>
        </div>
    )
}

export default Register;
