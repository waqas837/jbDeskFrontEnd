import './App.css';
import {BrowserRouter as  Router,Route} from 'react-router-dom';
 import Home from './Components/HomePage/Home';
import CandidateRouter from './Routers/CandidateRouter';
import { ThemeProvider } from '@material-ui/core';
import theme from './Styles/Theme';
import CompanyRouter from './Routers/CompanyRouter';
import NavBarLayout from './Components/Layouts/NavbarLayout';
import JobsRouter from './Routers/JobsRouter';
import Admin from './Components/Admin/Admin';
import Users from './Components/Admin/Users';
import DashboardLayout from './Components/Layouts/Dashboard.layout';
import CandidateDashboard from './Components/Dashboard/CandidateDashboard';
import CompanyDashboard from './Components/Dashboard/CompanyDashboard';
import JobSingle from './Components/Jobs/JobSingle';
import AllJobs from './Components/Jobs/AllJobs';
import Navbar from './Components/Reuseables/Navbar';
import Footer from './Components/Reuseables/Footer';
import Jobs from "./Components/Admin/Jobs"
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
               <NavBarLayout/>
             </Route>
             <Route exact path="/candidates">
             <Navbar/>
               <CandidateDashboard/>
               <Footer/>
             </Route>

             <Route exact path="/company/dashboard">
             <Navbar/>
               <CompanyDashboard/>
               <Footer/>
             </Route>

             <Route exact path="/jobs/single">
             <Navbar/>
               <JobSingle/>
               <Footer/>
             </Route>

             <Route exact path="/jobs/all">
             <Navbar/>
               <AllJobs/>
               <Footer/>
             </Route>
             <Route exact path="/admin">
               <Admin/>
             </Route>
             <Route exact path="/admin/users">
               <Users/>
             </Route>
             <Route exact path="/admin/jobs">
               <Jobs/>
             </Route>
          </Router>
       </ThemeProvider>
   );
};

export default App;
