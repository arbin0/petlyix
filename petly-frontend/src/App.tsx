import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Pets from './pages/Pets';
import Layout from './layouts/Layout';
import DashboardLayout from './layouts/DashboardLayout';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PetDetailPage from './pages/PetDetailPage';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Outer layout wrapping all */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            {/* Nested dashboard layout for pets routes */}
            

          </Route>
          <Route element={<DashboardLayout />}>
              <Route path="pets" element={<Pets />} />
              <Route path="pets/:petId" element={<PetDetailPage />} />
            </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

