import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from '@tabler/icons-react';
import { Button } from "@mantine/core";

export const GoBack:React.FC = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    return(
        
            <Button onClick={ handleGoBack } variant="light" color="gray"><IconArrowLeft/>Back</Button>
        
        
    );
}

