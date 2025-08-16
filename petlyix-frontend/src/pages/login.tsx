import { LoginForm } from "../components/Forms/LogInForm"
import { Container } from "@mantine/core";

const Login = () =>{
    return(
         <Container size = "xs">
            <h1>Log In</h1>
            <LoginForm />
        </Container>
    )
}

export default Login;

