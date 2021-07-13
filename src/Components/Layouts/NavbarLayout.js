import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../Reuseables/Navbar';
import Footer from '../Reuseables/Footer';
import Home from '../HomePage/Home';
 
const NavbarLayout = ({
   component: Component,
   path: Path,
   ...rest
}) => {
   console.log('Path', Path);
   return (
      <div>
         <Navbar />
           <Home/>
          <Footer />
      </div>
   );
};

export default NavbarLayout;
