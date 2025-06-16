import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <nav>
       <Link to="/"><img src={ logo } alt="Logo" className= "logo"/></Link>  <Link to="/">Home</Link> <Link to="/about">About</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;