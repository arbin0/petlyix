import { SignUpForm } from "../components/Forms/SignUpForm"
import { Container } from "@mantine/core";

const Register = () =>{
    return(
        <Container size = "xs">
            <h1>Sign Up</h1>
        <SignUpForm />
        </Container>
    )
}

export default Register;

