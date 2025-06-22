import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

export const GoBack:React.FC = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    return(
        <button onClick={ handleGoBack }><ArrowLeft strokeWidth={0.5}/></button>
    );
}

