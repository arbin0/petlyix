import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Pets from './pages/Pets';
import Register from './pages/register';
import Login from './pages/login';
import Layout from './layouts/Layout';
import DashboardLayout from './layouts/DashboardLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PetFeeding from './pages/PetFeeding';
import PetHealth from './pages/PetHealth';
import PetOverview from './pages/PetOverview';
import ProtectedRoute from './components/services/protectedRoute';
import { AuthContextProvider } from './context/AuthContextProvider';


const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
      <Router>
        <Routes>
          {/* Outer layout wrapping all */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path ="signup" element = {<Register />} />
            <Route path ="login" element = {<Login />} />
            
            {/* Nested dashboard layout for pets routes */}
            

          </Route>
          
          <Route element={
            <ProtectedRoute>
            <DashboardLayout />
            </ProtectedRoute>
            }>
              <Route path="pets" element={<Pets />} />
              <Route path="pets/:petId" element={<PetOverview />}/>
                <Route path="pets/:petId/feeding" element={<PetFeeding />} />
                <Route path="pets/:petId/health" element={<PetHealth />} />
             
            </Route>
          
        </Routes>
      </Router>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;

