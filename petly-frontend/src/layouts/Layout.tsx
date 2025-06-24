import React from 'react';

import { Outlet } from 'react-router-dom';
import { HeaderMenu } from '../components/HeaderMenu';
import { FooterMenu } from '../components/FooterMenu'
import { Container } from '@mantine/core';



const Layout: React.FC = () => {
  return (
    <div>
      <HeaderMenu />
      
      <main>
        <Container size="xl">
          <Outlet />
        
        </Container>
        </main>
      <FooterMenu />
      

    </div>
  );
};

export default Layout;