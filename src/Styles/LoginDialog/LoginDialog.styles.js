import {makeStyles} from "@material-ui/core";
const useStyles = makeStyles((theme)=>({
    inputHeight:{
    height:"40px",
    marginBottom:"10px"
},
buttonRadius:{
    borderRadius:"0px",
},
closeButton:{
    marginLeft:"280px",
    marginTop:"-40px"
},
backDrop: {
    backdropFilter: "blur(7px)",
    backgroundColor:'rgba(0,0,30,0.4)'
  },
}))
export {useStyles}