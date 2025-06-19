import React from 'react';
import logo from '../assets/logo.svg';
import { Link, Outlet } from 'react-router-dom';



const Layout: React.FC = () => {
  return (
    <div>
      <nav>
       <Link to="/"><img src={ logo } alt="Logo" className= "logo"/> </Link>  
       <Link to="/">Home</Link> 
       <Link to="/about">About</Link>
       <Link to="/pets">My Pets</Link>

      </nav>
      <main><Outlet /></main>
    </div>
  );
};

export default Layout;