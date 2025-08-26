import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useState";
import { Loader } from '@mantine/core';


interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => { 

const { isAuthenticated, loading } = useAuth();

if (loading)
{
    return <Loader color="blue" type="dots" />;
}

if (!isAuthenticated){

   return <Navigate to ="login" replace />
}

return children;
}

export default ProtectedRoute; 