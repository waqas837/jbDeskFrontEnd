import React, { useState, useEffect } from "react";
import Styles from "../../Styles/Company Styles/dashboard.styles";
import image from "../../Assets/Images/companyImg.png";
import AddJobDialog from "./AddJobDialog";
import { useHistory } from "react-router-dom";
import { useTheme, Grid } from "@material-ui/core";
import toast, { Toaster } from "react-hot-toast";
import {
  Palette as PaletteIcon,
  InsertDriveFile as ResumeIcon,
  Favorite as FavoriteIcon,
  Check as CheckBoxIcon,
  Email as EmailIcon,
  LocalOffer as Priceicon,
  PowerSettingsNew as PowerIcon,
  CalendarToday as CalenderIcon,
  LocationOn as LocationIcon,
  Info as InfoIco,
  Public as PublicIcon,
  ChevronLeft as LeftIcon,
  Delete,
  Edit,
  Close,
} from "@material-ui/icons/";
import { Facebook, Trash2, Twitter, Linkedin, Briefcase } from "react-feather";
import axios from "axios";
import { imgurl, url } from "../../Api/Url";
import { grey } from "@material-ui/core/colors";
const Sidebar = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("email");
  const name = localStorage.getItem("username");
  const [openthree, setOpenthree] = useState(false);
  const history = useHistory();
  const theme = useTheme();
  const styleProps = {
    theme,
  };
  const classes = Styles(styleProps);
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("useremail");
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div>
      <AddJobDialog openthree={openthree} setOpenthree={setOpenthree} />

      <div
        style={{
          textAlign: "center",
          border: "1px solid #e2e2e2",
        }}
      >
        <div className={classes.ProfileSection}>
          <img
            style={{
              marginBottom: 30,
              margin: "auto",
            }}
            src={image}
            alt="Profile Picture"
          />
          <div>
            <p>{name}</p>
            <p className={classes.Txt2}>{user}</p>
          </div>
          <div className={classes.ProfileDetails}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p>Profile</p>
              <p>70%</p>
            </div>
            <div className={classes.ProgressBar}>
              <span className={classes.Progress}></span>
            </div>
          </div>
        </div>
        <ul className={classes.NavLinks}>
          <li
            className={`${classes.NavItem}`}
            onClick={() => history.push("/company/dashboard")}
          >
            <div className={classes.ListItemContent}>
              <div className={classes.ListIcon}>
                <PaletteIcon />
              </div>
              <div>Dashboard</div>
            </div>
          </li>
          <li
            className={classes.NavItem}
            onClick={() => history.push("/company/dashboard/managejobs")}
          >
            <div className={classes.ListItemContent}>
              <div className={classes.ListIcon}>
                <Edit />
              </div>
              <div>Manage Jobs</div>
            </div>
          </li>
          <li className={classes.NavItem}>
            <div className={classes.ListItemContent}>
              <div className={classes.ListIcon}>
                <ResumeIcon />
              </div>
              <div>Applications</div>
            </div>
          </li>
          <li className={classes.NavItem} onClick={() => setOpenthree(true)}>
            <div className={classes.ListItemContent}>
              <div className={classes.ListIcon}>
                <FavoriteIcon />
              </div>
              <div>Post New Job</div>
            </div>
          </li>
          <li className={classes.NavItem}>
            <div className={classes.ListItemContent}>
              <div className={classes.ListIcon}>
                <EmailIcon />
              </div>
              <div>Message</div>
            </div>
          </li>

          <li className={classes.NavItem}>
            <div className={classes.ListItemContent}>
              <div className={classes.ListIcon}>
                <Priceicon />
              </div>
              <div>Pricing Plans</div>
            </div>
          </li>
        </ul>
        <ul className={classes.LogoutSection}>
          <li className={classes.NavItem}>
            <div className={classes.ListItemContent} onClick={logout}>
              <div className={classes.ListIcon}>
                <PowerIcon />
              </div>
              <div>Logout</div>
            </div>
          </li>
          <li className={classes.NavItem}>
            <div className={classes.ListItemContent}>
              <div className={classes.ListIcon}>
                <Trash2 />
              </div>
              <div>Delete Profile</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
