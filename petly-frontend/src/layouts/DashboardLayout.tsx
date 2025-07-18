
import { Outlet } from 'react-router-dom';
import { SideNavBar } from '../components/SideNavBar'
import { PetDetails } from '../components/PetDetails';
import { Container, Flex,Text } from '@mantine/core';
import SideNavContext from '../context/SideNavBarContext';
import { useParams,Link } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
const DashboardLayout = () => {
  const { petId } = useParams();
  return (
    <SideNavContext.Provider value ={true}>
        
    
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <SideNavBar />

      {/* Right side content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
       {!petId ? (
        <h2>My Pets</h2>
      ) : (
        <Flex justify="space-between" align="center">
          <Link to="/pets" style={{ textDecoration: 'none'}}> <Text c="blue" style={{ display: 'flex', alignItems: 'center' }}> <IconArrowLeft/>Back to Pets</Text></Link>
          <PetDetails />
        </Flex>
      )}
        
        <main style={{ flex: 1 }}>
          <Container size="xl">
            <Outlet />
          </Container>
        </main>

      </div>
    </div>
    </SideNavContext.Provider>
  );
};

export default DashboardLayout;
