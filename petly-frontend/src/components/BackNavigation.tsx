import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@mantine/core";

export const GoBack:React.FC = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    return(
        
            <Button onClick={ handleGoBack } variant="light" color="gray"><ArrowLeft strokeWidth={0.5}/>Back</Button>
        
        
    );
}

