import React from 'react';
import {Container, Button, Form} from 'react-bootstrap';

const SignupForm = (props) => {
     
    const formik = props.formik;
 
    return (
        <Container>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="firstName">firstName</Form.Label>
                    <Form.Control id="firstName" type="input" name="firstName" placeholder="Username" value={formik.values.firstName} onChange={formik.handleChange}/>
                    <Form.Text className="text-muted">
                        Please enter firstName
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="lastName">lastName</Form.Label>
                    <Form.Control id="lastName" type="input" name="lastName" placeholder="lastName" value={formik.values.lastName} onChange={formik.handleChange}/>
                    <Form.Text className="text-muted">
                        Please enter lastName
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="email">email</Form.Label>
                    <Form.Control id="email" type="email" name="email" placeholder="email" value={formik.values.email} onChange={formik.handleChange}/>
                    <Form.Text className="text-muted">
                        Please enter email
                    </Form.Text>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default SignupForm;