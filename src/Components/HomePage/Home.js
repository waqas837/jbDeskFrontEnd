import React, { useState, useEffect } from "react";
import { PersonPinCircle } from "@material-ui/icons";
import { imgurl, url } from "../../Api/Url";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Button,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  DialogActions,
  LinearProgress,
} from "@material-ui/core";
import cities from "../../cities.json";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import makeStyles from "../../Styles/HomeStyles";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import Select from "react-select";

import girlImg from "../../Assets/Images/girl.jpg";

import { SkillsOptions } from "./SelectGroupOptions";
import { Search } from "@material-ui/icons";
import cImg1 from "../../Assets/Images/jb1.png";
import cImg2 from "../../Assets/Images/jb2.png";
import cImg3 from "../../Assets/Images/jb3.png";
import cImg4 from "../../Assets/Images/jb4.png";
import cImg5 from "../../Assets/Images/jb5.png";
import cImg6 from "../../Assets/Images/jb6.png";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};
const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

// main()
const Home = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setloading] = React.useState(false);
  const [loadings, setloadings] = React.useState(false);
  const [open, setopen] = React.useState(false);
  const [city, setcity] = React.useState([]);
  const [search, setsearch] = React.useState([]);
  const [searchResults, setsearchResults] = React.useState([]);
  const candidateid = localStorage.getItem("candidateid");
  //  -1.apply
  const apply = async (jobid) => {
    setloadings(true);
    try {
      const { data } = await axios.post(`${url}/apply/${jobid}/${candidateid}`);
      setloadings(false);
      console.log(data);
      if (data.success) {
        toast.success("Successfully applied for this job.Thanks!");
        onDialogclose();
      }
      if (data.error) {
        toast.error(`${data.error}`);
      }
    } catch (error) {
      console.log(error);
      setloadings(false);
    }
  };
  //  0.search results
  const SearchResults = async () => {
    setopen(true);
    setloading(true);
    try {
      const { data } = await axios.post(`${url}/searchResults`, search);
      console.log(data.searchResults);
      setsearchResults(data.searchResults);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  const onDialogclose = () => {
    setopen(false);
    setloading(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //1.pick a city change
  const pickUpCity = (name) => {
    // setcity for button
    setcity(name);
    setsearch({ ...search, location: name });
    handleClose();
  };
  //2.search input change
  const searchOnchange = (e) => {
    setsearch({ ...search, category: e.target.value });
  };

  // 3.skills on chanage
  const skillsonchage = (val) => {
    setsearch({ ...search, jobtitle: val.value });
  };

  const theme = useTheme();
  const styleProps = {
    ...props,
    theme,
  };

  const [state, setState] = useState({
    svg1: false,
    svg2: false,
    svg3: false,
    svg4: false,
    svg5: false,
    svg6: false,
    svg7: false,
  });

  const classes = makeStyles(styleProps);

  return (
    <div>
      <Toaster />
      <Grid container>
        <Grid item xs={12} className={classes.Section1Grid}>
          <Box className={classes.Section1}>
            <Box className={classes.Section1A}>
              <h1 className={classes.Section1Heading}>
                The Easy Way To Get Your New Job
              </h1>

              <p className={classes.Section1SubHeading}>
                This is Photoshop's version of Lorem Ipsum. Proin gravida nibh
                vel velit auctor . sollicitudin, lorem quis bibendum auctor, sem
                nibh id elit.
              </p>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={8}>
                {loading ? (
                  <Box my={1}>
                    <LinearProgress color="secondary" />
                  </Box>
                ) : null}
                <input
                  onChange={searchOnchange}
                  type="text"
                  name="name"
                  placeholder="Keyword e.g. (Job Title, Description, Tags)"
                  className={classes.Input1}
                ></input>
              </Grid>
              <Grid item xs={12} sm={4} className={classes.LocationInput}>
                <Button
                  size="large"
                  startIcon={<PersonPinCircle color="secondary" />}
                  variant="outlined"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  {city.length !== 0 ? city : <span>Select a city</span>}
                </Button>
                <Box textAlign="right">
                  <Menu keepMounted open={anchorEl} onClose={handleClose}>
                    {cities.map((val) => (
                      <MenuItem onClick={() => pickUpCity(val.name)}>
                        {val.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                {/* <LocationSearchingIcon
                        className={classes.FlaticonMap}
                     ></LocationSearchingIcon>
                     <Select
                        defaultValue={locationOptions[0]}
                        options={locationOptions}
                        label={cities}
                        formatGroupLabel={formatGroupLabel}
                        className={classes.SelectLocation}
                     /> */}
              </Grid>

              {/* skills */}

              <Grid item xs={12} sm={8} className={classes.LocationInput}>
                <LocationSearchingIcon
                  className={classes.FlaticonMap}
                ></LocationSearchingIcon>
                <Select
                  defaultValue={SkillsOptions[0]}
                  options={SkillsOptions}
                  formatGroupLabel={formatGroupLabel}
                  className={classes.SelectLocation}
                  onChange={skillsonchage}
                />
              </Grid>
              {/* end skills */}
              <Grid item xs={12}>
                {loading ? (
                  <IconButton variant="contained" className={classes.Btn1}>
                    Searching...
                  </IconButton>
                ) : (
                  <IconButton
                    variant="contained"
                    onClick={SearchResults}
                    className={classes.Btn1}
                  >
                    <Search /> Search
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={12}>
                <p className={classes.Section1SubHeading}>
                  <i
                    class="fas fa-tags"
                    style={{
                      marginRight: 15,
                      color: "#F2396E",
                    }}
                  ></i>
                  Trending Keywords :ui designer,developer,seniorit
                  company,design,call center
                </p>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.Section2Grid}>
          <Grid container spacing={4} className={classes.Section2}>
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              className={classes.Section2CardItem}
            >
              <div className={classes.Section2Card}>
                <h3> Laravel </h3>
                <img src={cImg1} alt="" />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              className={classes.Section2CardItem}
            >
              <div className={classes.Section2Card}>
                <h3> WordPress </h3>
                <img src={cImg2} alt="" />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              className={classes.Section2CardItem}
            >
              <div className={classes.Section2Card}>
                <h3> angular js </h3>
                <img src={cImg3} alt="" />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              className={classes.Section2CardItem}
            >
              <div className={classes.Section2Card}>
                <h3> node js </h3>
                <img src={cImg4} alt="card image" />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              className={classes.Section2CardItem}
            >
              <div className={classes.Section2Card}>
                <h3> ionic </h3>
                <img src={cImg5} alt="card image" />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              className={classes.Section2CardItem}
            >
              <div className={classes.Section2Card}>
                <h3> node js </h3>
                <img src={cImg6} alt="" />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
          }}
        >
          <h1 className={classes.Section2Heading}>Browse Jobs By Category</h1>
          <p className={classes.Section2SubHeading}>
            Your next level Product developemnt company assets
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            paddingBottom: 40,
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item md={3} sm={6} xs={12} className={classes.IconDiv}>
                  <div
                    className={classes.IconDivChild}
                    onMouseEnter={() =>
                      setState({
                        ...state,
                        svg1: true,
                      })
                    }
                    onMouseLeave={() =>
                      setState({
                        ...state,
                        svg1: false,
                      })
                    }
                  >
                    <div
                      className={
                        state.svg1 === true
                          ? classes.CodeIconHover
                          : classes.CodeIconInActive
                      }
                    ></div>
                    <h4>Developer</h4>
                    <p>(1450 Jobs)</p>
                  </div>
                </Grid>
                <Grid item md={3} sm={6} xs={12} className={classes.IconDiv}>
                  <div
                    className={classes.IconDivChild}
                    onMouseEnter={() =>
                      setState({
                        ...state,
                        svg2: true,
                      })
                    }
                    onMouseLeave={() =>
                      setState({
                        ...state,
                        svg2: false,
                      })
                    }
                  >
                    <div
                      className={
                        state.svg2 === true
                          ? classes.TechIconHover
                          : classes.TechIcon
                      }
                    ></div>
                    <h4>Technology</h4>
                    <p>(140 Jobs)</p>
                  </div>
                </Grid>
                <Grid item md={3} sm={6} xs={12} className={classes.IconDiv}>
                  <div
                    className={classes.IconDivChild}
                    onMouseEnter={() =>
                      setState({
                        ...state,
                        svg3: true,
                      })
                    }
                    onMouseLeave={() =>
                      setState({
                        ...state,
                        svg3: false,
                      })
                    }
                  >
                    <div
                      className={
                        state.svg3 === true
                          ? classes.AccountIconHover
                          : classes.AccountIcon
                      }
                    ></div>
                    <h4>Accounting</h4>
                    <p>(0 Jobs)</p>
                  </div>
                </Grid>
                <Grid item md={3} sm={6} xs={12} className={classes.IconDiv}>
                  <div
                    className={classes.IconDivChild}
                    onMouseEnter={() =>
                      setState({
                        ...state,
                        svg4: true,
                      })
                    }
                    onMouseLeave={() =>
                      setState({
                        ...state,
                        svg4: false,
                      })
                    }
                  >
                    <div
                      className={
                        state.svg4 === true
                          ? classes.MedicalIconHover
                          : classes.MedicalIcon
                      }
                    ></div>
                    <h4>Medical</h4>
                    <p>(50 Jobs)</p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                style={{
                  justifyContent: "center",
                }}
              >
                <Grid item md={3} sm={6} xs={12} className={classes.IconDiv}>
                  <div
                    className={classes.IconDivChild}
                    onMouseEnter={() =>
                      setState({
                        ...state,
                        svg5: true,
                      })
                    }
                    onMouseLeave={() =>
                      setState({
                        ...state,
                        svg5: false,
                      })
                    }
                  >
                    <div
                      className={
                        state.svg5 === true
                          ? classes.BuildingIconHover
                          : classes.BuildingIcon
                      }
                    ></div>
                    <h4>Government</h4>
                    <p>(145021 Jobs)</p>
                  </div>
                </Grid>
                <Grid item md={3} sm={6} xs={12} className={classes.IconDiv}>
                  <div
                    className={classes.IconDivChild}
                    onMouseEnter={() =>
                      setState({
                        ...state,
                        svg6: true,
                      })
                    }
                    onMouseLeave={() =>
                      setState({
                        ...state,
                        svg6: false,
                      })
                    }
                  >
                    <div
                      className={
                        state.svg6 === true
                          ? classes.NewsIconHover
                          : classes.NewsIcon
                      }
                    ></div>
                    <h4>Media and News</h4>
                    <p>(1450 Jobs)</p>
                  </div>
                </Grid>
                <Grid item md={3} sm={6} xs={12} className={classes.IconDiv}>
                  <div
                    className={classes.IconDivChild}
                    onMouseEnter={() =>
                      setState({
                        ...state,
                        svg7: true,
                      })
                    }
                    onMouseLeave={() =>
                      setState({
                        ...state,
                        svg7: false,
                      })
                    }
                  >
                    <div
                      className={
                        state.svg7 === true
                          ? classes.RestaurantIconHover
                          : classes.RestaurantIcon
                      }
                    ></div>
                    <h4>Restaurants</h4>
                    <p>(1450 Jobs)</p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton variant="contained" className={classes.Btn1}>
              Load More
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.PictureGrid}>
          <Grid
            container
            style={{
              textAlign: "left",
            }}
          >
            <Grid
              item
              sm={12}
              style={{
                padding: 20,
              }}
              md={6}
            >
              <h1 className={classes.Section2Heading}>
                Grow Next Level Business
              </h1>

              <p
                style={{
                  paddingBottom: 20,
                  color: "rgb(242, 57, 110)",
                  fontSize: "1.2em",
                }}
              >
                #1 MOST trusted digital marketplace company
              </p>
              <p>
                What do all consultants need? In short, trust. This is achieved
                with professional presentation and the ability to communicate
                clearly with and potential clients. Whether you are an
                accountant.
              </p>
              <br />
              <p style={{ paddingBottom: 30 }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusd tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <IconButton variant="contained" className={classes.Btn1}>
                Discover More
              </IconButton>
            </Grid>
            <Grid
              item
              sm={12}
              style={{
                padding: 20,
              }}
              md={6}
            >
              <img src={girlImg} alt="Girl Image" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.PricingGrid}>
          <Grid
            container
            spacing={6}
            style={{
              width: "unset",
              margin: "unset",
            }}
          >
            <Grid item sm={12} md={4} className={classes.PriceCard}>
              <Card className={classes.root}>
                <CardHeader
                  title="Basic Plan"
                  style={{
                    textAlign: "center",
                    color: "#F2396E",
                  }}
                ></CardHeader>
                <Divider />
                <CardActionArea>
                  <CardContent>
                    <div
                      style={{
                        background: `linear-gradient(
45deg
, rgba(209,72,127,1) 20%, rgba(248,54,106,1) 100%)`,
                        padding: "50px 40px",
                        minHeight: 150,
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "2.2em",
                          position: "absolute",
                          color: "rgb(255, 255, 255)",
                          top: "30%",
                          left: "30%",
                        }}
                      >
                        $
                      </span>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        style={{
                          fontSize: "3em",
                          position: "absolute",
                          color: "rgb(255, 255, 255)",
                          top: "20%",
                          left: "40%",
                        }}
                      >
                        29
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{
                          color: "rgb(255, 255, 255)",
                          fontSize: "1.5em",
                          position: "absolute",
                          right: "5%",
                          top: "60%",
                        }}
                      >
                        / Per Month
                      </Typography>
                    </div>
                    <List className={classes.PriceUl}>
                      <ListItem>
                        <ListItemText primary="5 Job Posting" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="2 Featured Jobs" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="1 Renew Job" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="10 Days Duration" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Email Alert" />
                      </ListItem>
                    </List>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="contained"
                    style={{
                      color: "#fff",
                      backgroundColor: "#F2396E",
                    }}
                  >
                    Select Plan
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item sm={12} md={4} className={classes.PriceCard}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item sm={12} md={4} className={classes.PriceCardGrid}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={onDialogclose}>
        <DialogTitle style={{ paddingLeft: "150px", paddingRight: "150px" }}>
          <Typography color="secondary" variant="h5">
            Job Search Results
          </Typography>
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box textAlign="center">Loading... </Box>
          ) : (
            searchResults.map((val) => (
              <Box>
                <Typography color="primary" variant="body1">
                  Title:
                </Typography>
                <List>{val.jobtitle}</List>
                <Typography color="primary" variant="body1">
                  Company Name:
                </Typography>{" "}
                <List>{val.companyname}</List>
                <Typography color="primary" variant="body1">
                  Experience Required:
                </Typography>
                <List>{val.experience}</List>
                <Typography color="primary" variant="body1">
                  Salary Expected:
                </Typography>
                <List>{val.salary}</List>
                <Typography color="primary" variant="body1">
                  Location:
                </Typography>{" "}
                <List>{val.location}</List>
                {loadings ? (
                  <Button size="small" variant="contained" color="primary">
                    Applying...
                  </Button>
                ) : (
                  <Button
                    onClick={() => apply(val._id)}
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Apply
                  </Button>
                )}
                <Box mb={2}>
                  <Divider />
                </Box>
              </Box>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogclose} size="small" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
