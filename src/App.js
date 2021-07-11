import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import CandidateRouter from "./Routers/CandidateRouter";
import { ThemeProvider } from "@material-ui/core";
import theme from "./Styles/Theme";
import CompanyRouter from "./Routers/CompanyRouter";
import NavBarLayout from "./Components/Layouts/NavbarLayout";
import JobsRouter from "./Routers/JobsRouter";
import Admin from "./Components/Admin/Admin";
import Users from "./Components/Admin/Users";
import DashboardLayout from "./Components/Layouts/Dashboard.layout";
import CandidateDashboard from "./Components/Dashboard/CandidateDashboard";
import CompanyDashboard from "./Components/Dashboard/CompanyDashboard";
import JobSingle from "./Components/Jobs/JobSingle";
import AllJobs from "./Components/Jobs/AllJobs";
import Navbar from "./Components/Reuseables/Navbar";
import Footer from "./Components/Reuseables/Footer";
import Jobs from "./Components/Admin/Jobs";
import Logoupdate from "./Components/Admin/Logoupdate";
import Managejobs from "./Components/Dashboard/Managejobs";
import Resume from "./Components/CandidateResume/Resume";
import Resume2 from "./Components/CandidateResume/Resume2";
import Resume3 from "./Components/CandidateResume/Resume3";
import Resume4 from "./Components/CandidateResume/Resume4";
import Resume5 from "./Components/CandidateResume/Resume5";

 const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <Route exact path='/candidate' component={CandidateRouter} /> */}
        {/* <Route exact path='/company' component={CompanyRouter} /> */}
        {/* <Route exact path='/jobs' component={JobsRouter} /> */}
        {/* <Admin exact path='/admin' component={Admin} /> */}
        {/* <NavBarLayout exact path='/' component={Home} /> */}
        <Route exact path="/">
          <NavBarLayout />
        </Route>
        <Route exact path="/candidates">
          <Navbar />
          <CandidateDashboard />
          <Footer />
        </Route>

        <Route exact path="/company/dashboard">
          <Navbar />
          <CompanyDashboard />
          <Footer />
        </Route>

        <Route exact path="/jobs/single/:jobId">
          <Navbar />
          <JobSingle />
          <Footer />
        </Route>

        <Route exact path="/jobs/all">
          <Navbar />
          <AllJobs />
          <Footer />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/admin/users">
          <Users />
        </Route>
        <Route exact path="/admin/jobs">
          <Jobs />
        </Route>
        {/* so we can do ,same component for multiple paths */}
        <Route
          exact
          path={["/admin/logoupdate/:id", "/company/dashboard/managejobs/:id"]}
        >
          <Logoupdate />
        </Route>
        <Route exact path="/company/dashboard/managejobs">
          <Navbar />
          <Managejobs />
        </Route>
         {/* resume1 */}
        <Route exact path="/candidate/resume">
          <Navbar />
          <Resume/>
        </Route>
         {/* resume2 */}
         <Route exact path="/candidate/resume2">
          <Navbar />
          <Resume2/>
        </Route>
         {/* resume3 */}
         <Route exact path="/candidate/resume3">
          <Navbar />
          <Resume3/>
        </Route>
        {/* resume4 */}
        <Route exact path="/candidate/resume4">
          <Navbar />
          <Resume4/>
        </Route>
        {/* resume5 */}
        <Route exact path="/candidate/resume5">
          <Navbar />
          <Resume5/>
        </Route>
      </Router>
    </ThemeProvider>
  );
};

export default App;
