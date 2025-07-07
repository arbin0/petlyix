import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideNavBar } from '../components/SideNavBar'
import { HeaderMenu } from '../components/HeaderMenu';
import { FooterMenu } from '../components/FooterMenu';
import { Container } from '@mantine/core';

const DashboardLayout: React.FC = () => {
  return (
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
  );
};

export default DashboardLayout;
