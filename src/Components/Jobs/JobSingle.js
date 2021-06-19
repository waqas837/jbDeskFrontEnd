import React,{useEffect, useState} from 'react';
import PageHeader from '../Reuseables/PageHeader';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Styles from '../../Styles/Jobs Styles/SigleJobStyles';
import axios from "axios"
import {url} from "../../Api/Url"
import {imgurl} from "../../Api/Url"
 import {
   Box,
   Button,
   Divider,
   Grid,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   useTheme,LinearProgress,Snackbar 
} from '@material-ui/core';
import {Alert} from "@material-ui/lab"
// import logo from "../../Assets/Images/logo.jpg"
import it3 from '../../Assets/Images/lt3.png';
import it4 from '../../Assets/Images/lt4.png';
import it5 from '../../Assets/Images/lt5.png';
import { Link } from 'react-router-dom';

const SingleJob = () => {
   const theme = useTheme();
   const styleProps = {
      ...PageHeader,
      theme,
   };
   const token = localStorage.getItem("token")
   const [state, setstate] = useState("")
   const [loading, setloading] = useState(null)
   const [open, setopen] = useState(false);
   const headers={
      authorization :`Bearer ${token}`
   }
useEffect(() => {
   getJobSingle()
}, [])

//get data for a single job
const getJobSingle= async () =>{
   try {
   setloading(true)
    const {data} = await axios.get(`${url}/getsinglejob`,{headers})
    console.log(data.results[0])
    setstate(data.results[0])
    setloading(false)
   } catch (error) {
    console.log(error)
    setopen(true)
    setloading(false)
   }
}
 

   const classes = Styles(styleProps);

   return (
      <>
      <Snackbar open={open} autoHideDuration={6000} onClose={()=>setopen(false)}>
        <Alert onClose={()=>setopen(false)} severity="error">
          Server Error
        </Alert>
      </Snackbar>
         <PageHeader
            title={'Job Listing'}
            pathName={'Job Sigle'}
            path={'/jobs/listing'}
         />
        {loading?<LinearProgress color="secondary"/>:
        <Grid
            container
            className={classes.GridContainer}
            spacing={4}
         >
            <Grid item sm={12} md={4}>
               <div
                  style={{
                     textAlign: 'center',
                     border: '1px solid #e2e2e2',
                  }}
               >
                  <div className={classes.ProfileSection}>
                     <h3 className={classes.Section1Header}>
                        Jobs Overview
                     </h3>
                  </div>
                  <Box
                     display='flex'
                     justifyContent='space-between'
                     alignItems='center'
                     flexDirection='column'
                     padding='30px'
                  >
                     <Box>
                         <img
                           src={`${imgurl}/${state.logo}`} 
                           style={{
                              margin: 'auto',
                           }}
                           alt=''
                        />
               
                        <h5
                           style={{
                              fontFamily: 'Poppins',
                           }}
                        >
                           {state.category} 
                        </h5>
                        <p
                           style={{
                              fontFamily: `'Lato ', sans-serif`,
                           }}
                           className={classes.P}
                        >
                           {state.companyname}.
                        </p>
                        <Box
                           style={{
                              margin: '25px auto',
                           }}
                           display='flex'
                           justifyContent='space-between'
                           alignItems='center'
                           maxWidth={'160px'}
                        >
                           <div
                              style={{
                                 border: '0.5px solid #ccc',
                                 padding: '5px 10px',
                              }}
                           >
                              <i className='far fa-heart'></i>
                           </div>
                           <div>
                              <Button
                                 variant='contained'
                                 className={classes.ProfileBtn}
                              >
                                 {state.time}
                              </Button>
                           </div>
                        </Box>
                     </Box>
                     <List>
                        <ListItem className={classes.ListItem}>
                           <ListItemAvatar>
                              <i className='far fa-calendar'></i>
                           </ListItemAvatar>
                           <ListItemText
                              primary='Date Posted :'
                              secondary={state.date}
                           />
                        </ListItem>
                        <ListItem className={classes.ListItem}>
                           <ListItemAvatar>
                              <i className='fas fa-map-marker-alt'></i>
                           </ListItemAvatar>
                           <ListItemText
                              primary='Location'
                              secondary={state.location}
                           />
                        </ListItem>
                        <ListItem className={classes.ListItem}>
                           <ListItemAvatar>
                              <i className='fa fa-info-circle'></i>
                           </ListItemAvatar>
                           <ListItemText
                              primary='Job Title:'
                              secondary={state.jobtitle}
                           />
                        </ListItem>
                        <ListItem className={classes.ListItem}>
                           <ListItemAvatar>
                              <i className='far fa-clock'></i>
                           </ListItemAvatar>
                           <ListItemText
                              primary='Hours :'
                              secondary={state.totalhrs}
                           />
                        </ListItem>
                        <ListItem className={classes.ListItem}>
                           <ListItemAvatar>
                              <i className='far fa-money-bill-alt'></i>
                           </ListItemAvatar>
                           <ListItemText
                              primary='Salary :'
                              secondary={state.salary}
                           />
                        </ListItem>
                        <ListItem className={classes.ListItem}>
                           <ListItemAvatar>
                              <i className='fa fa-th-large'></i>
                           </ListItemAvatar>
                           <ListItemText
                              primary='Category :'
                              secondary= {state.category} 
                           />
                        </ListItem>
                        <ListItem className={classes.ListItem}>
                           <ListItemAvatar>
                              <i className='fa fa-star'></i>
                           </ListItemAvatar>
                           <ListItemText
                              primary='Experience :'
                              secondary={state.experience}
                           />
                        </ListItem>
                     </List>
                     <Button
                        variant='contained'
                        className={classes.ProfileBtn}
                        style={{
                           padding: '10px 30px',
                           fontSize: '1.2em',
                           borderRadius: '0',
                        }}
                     >
                        Apply Now
                     </Button>
                  </Box>
                  <Divider />
                  <Box
                     display='flex'
                     justifyContent='space-between'
                     alignItems='center'
                     flexDirection='column'
                     padding='30px'
                  >
                     <List>
                        <ListItem className={classes.ListItem}>
                           <i
                              className='fa fa-tags'
                              style={{
                                 marginRight: 15,
                              }}
                           ></i>
                           <ListItemText
                              primary='Trending Keywords :'
                              secondary='ui designed , mern developer'
                           />
                        </ListItem>
                     </List>
                  </Box>
               </div>
            </Grid>
            <Grid item sm={12} md={8}>
               <Grid item xs={12}>
                  <div
                     style={{
                        border: '1px solid #ccc',
                        padding: '20px 0px',
                     }}
                  >
                     <Box
                        style={{
                           padding: '20px 25px',
                        }}
                     >
                        <h3 className={classes.ParagraphHeader}>
                           Job Description
                        </h3>
                        <p>
                           {state.jobdescription}
                        </p>

                        <Box
                           display='flex'
                           justifyContent='space-between'
                           maxWidth='350px'
                           alignItems='center'
                           flexWrap='wrap'
                           paddingTop='20px'
                           className={classes.PtaNhiKiya}
                        >
                           <div>
                              <i className='fas fa-globe-asia'></i>
                              <a>www.example.com</a>
                           </div>
                           <div>
                              <i className='fas fa-file-download'></i>
                              <a>Download Info</a>
                           </div>
                        </Box>
                     </Box>
                     <Divider />
                     <Box
                        style={{
                           padding: '20px 25px',
                        }}
                     >
                        <h3 className={classes.ParagraphHeader}>
                           Responsibilities
                        </h3>
                        <p>
                           {state.jobresp}
                        </p>

                        <Box
                           display='flex'
                           justifyContent='space-between'
                           alignItems='center'
                           flexWrap='wrap'
                           paddingTop='20px'
                           className={classes.PtaNhiKiya}
                        >
                           <List className={classes.List1}>
                              <ListItem>
                                 <i className='fa fa-caret-right'></i>
                                 <ListItemText secondary=' Build next-generation web applications with a focus on the client side.' />
                              </ListItem>
                              <ListItem>
                                 <i className='fa fa-caret-right'></i>
                                 <ListItemText secondary=' Build next-generation web applications with a focus on the client side.' />
                              </ListItem>
                              <ListItem>
                                 <i className='fa fa-caret-right'></i>
                                 <ListItemText secondary=' Build next-generation web applications with a focus on the client side.' />
                              </ListItem>
                              <ListItem>
                                 <i className='fa fa-caret-right'></i>
                                 <ListItemText secondary=' Build next-generation web applications with a focus on the client side.' />
                              </ListItem>
                           </List>
                        </Box>
                     </Box>
                     <Divider />
                     <Box
                        style={{
                           padding: '20px 25px',
                        }}
                     >
                        <h3 className={classes.ParagraphHeader}>
                           Minimal Qualifications
                        </h3>
                        <p>
                           {state.minimumqulification}
                        </p>

                        <Box
                           display='flex'
                           justifyContent='space-between'
                           alignItems='center'
                           flexWrap='wrap'
                           paddingTop='20px'
                           className={classes.PtaNhiKiya}
                        >
                           <List className={classes.List1}>
                              <ListItem>
                                 <i className='fa fa-caret-right'></i>
                                 <ListItemText secondary=' Build next-generation web applications with a focus on the client side.' />
                              </ListItem>
                              <ListItem>
                                 <i className='fa fa-caret-right'></i>
                                 <ListItemText secondary=' Build next-generation web applications with a focus on the client side.' />
                              </ListItem>
                              <ListItem>
                                 <i className='fa fa-caret-right'></i>
                                 <ListItemText secondary=' Build next-generation web applications with a focus on the client side.' />
                              </ListItem>
                              <ListItem>
                                 <i className='fa fa-caret-right'></i>
                                 <ListItemText secondary=' Build next-generation web applications with a focus on the client side.' />
                              </ListItem>
                           </List>
                        </Box>
                     </Box>
                     <Divider />
                     <Box
                        style={{
                           padding: '20px 25px',
                        }}
                     >
                        <h3 className={classes.ParagraphHeader}>
                           How to Apply
                        </h3>
                        <p>
                           {state.howtoapply}
                        </p>
                     </Box>

                     <Divider />
                     <Box
                        style={{
                           padding: '20px 25px',
                        }}
                     >
                        <h3 className={classes.ParagraphHeader}>
                           Location
                        </h3>
                        {state.location}
                     </Box>
                     <Divider />
                     <Box
                        style={{
                           padding: '20px 25px',
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           flexWrap: 'wrap',
                           maxWidth: 380,
                           margin: 'auto',
                        }}
                     >
                     
                        Share :
                        <List
                           style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              minWidth: 250,
                              alignItems: 'center',
                              flexWrap: 'wrap',
                           }}
                        >
                           <ListItem className={classes.FooterLinks}>
                              <Link to='#'>
                                 <i className='fab fa-facebook-f'></i>
                              </Link>
                           </ListItem>
                           <ListItem className={classes.FooterLinks}>
                              <a to='#'>
                                 <i className='fab fa-twitter'></i>
                              </a>
                           </ListItem>
                           <ListItem className={classes.FooterLinks}>
                              <a to='#'>
                                 <i className='fab fa-linkedin-in'></i>
                              </a>
                           </ListItem>
                           <ListItem className={classes.FooterLinks}>
                              <a to='#'>
                                 <i className='fab fa-google-plus-g'></i>
                              </a>
                           </ListItem>
                        </List>
                     </Box>
                  </div>
               </Grid>
               <Grid
                  item
                  xs={12}
                  style={{
                     padding: '30px 10px',
                  }}
               >
                  <Box
                     display='flex'
                     justifyContent='space-between'
                     marginTop={'30px'}
                  >
                     <div
                        style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                        }}
                     >
                        <h3>Related Jobs</h3>
                     </div>
                     <div
                        style={{
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}
                     >
                        <div
                           style={{
                              border: '1px solid #ccc',
                              padding: 5,
                              marginRight: 15,
                           }}
                        >
                           <KeyboardBackspaceIcon />
                        </div>
                        <div
                           style={{
                              border: '1px solid #ccc',
                              padding: 5,
                              marginRight: 15,
                           }}
                        >
                           <ArrowRightAltIcon />
                        </div>
                     </div>
                  </Box>
                  <Grid
                     container
                     style={{
                        padding: '30px',
                        marginTop: '30px',
                        border: '1px solid #ccc',
                     }}
                  >
                     <Grid
                        item
                        sn={12}
                        md={9}
                        style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                        }}
                     >
                        <div>
                           <img src={it3} alt='' />
                           Google
                        </div>
                        <div
                           style={{
                              paddingTop: 15,
                           }}
                        >
                           <div className={classes.PtaNhiKiya}>
                              <a href='#'>
                                 Trainee Web Designer, (Fresher)
                              </a>
                           </div>
                           <div>
                              <div className={classes.PtaNhiKiya}>
                                 <i className='fas fa-money-bill'></i>
                                 &nbsp; $12K - 15k P.A.
                              </div>
                              <div className={classes.PtaNhiKiya}>
                                 <i className='fas fa-map-marker-alt'></i>
                                 &nbsp; Los Angeles, Califonia PO,
                                 455001
                              </div>
                           </div>
                        </div>
                     </Grid>
                     <Grid
                        item
                        sn={12}
                        md={3}
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'flex-end',
                           flexWrap: 'wrap',
                        }}
                     >
                        <div
                           style={{
                              width: 'fit-content',
                              padding: '5px 10px',
                              border: '1px solid #ccc',
                           }}
                        >
                           <i
                              className={`far fa-heart ${classes.iPink}`}
                              style={{
                                 fontSize: '1.2em',
                              }}
                           ></i>
                        </div>
                        <Button
                           style={{
                              width: 'fit-content',
                              padding: '5px 10px',
                              border: '1px solid #ccc',
                           }}
                        >
                           Part Time
                        </Button>
                        <Button
                           variant='contained'
                           className={classes.ProfileBtn}
                           style={{
                              borderRadius: '0',
                           }}
                        >
                           Apply
                        </Button>
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </Grid>}
      </>
   );
};

export default SingleJob;
