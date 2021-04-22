import React from 'react';
import {Container, Button, Form} from 'react-bootstrap';

const LoginForm = (props) => {

    const formik = props.formik;
    const usernameForm = {
        id: 'username',
        name: 'username',
        type: 'input',
        placeholder: 'Username',
        autoComplete: "username",
        value: formik.values.lastName,
        onChange: formik.handleChange
    }
    const passwordForm = {
        id: 'password',
        name: 'password',
        type: 'password',
        placeholder: 'password',
        autoComplete: "current-password",
        value: formik.values.password,
        onChange: formik.handleChange
    }

    return (
        <Container>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control {...usernameForm}/>
                        <Form.Text className="text-muted">
                            Please enter Username
                        </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...passwordForm} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    )
}

export default LoginForm;