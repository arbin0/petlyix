
import { Outlet } from 'react-router-dom';
import { SideNavBar } from '../components/SideNavBar'
import { HeaderMenu } from '../components/HeaderMenu';

import { Container } from '@mantine/core';
import SideNavContext from '../context/SideNavBarContext';
const DashboardLayout = () => {
  return (
    <SideNavContext.Provider value ={true}>
        
    
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <SideNavBar />

      {/* Right side content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HeaderMenu />

        <main style={{ flex: 1 }}>
          <Container size="xl" pt="md">
            <Outlet />
          </Container>
        </main>

      </div>
    </div>
    </SideNavContext.Provider>
  );
};

export default DashboardLayout;
