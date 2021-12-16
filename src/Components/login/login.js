import React, { useState, useEffect } from "react";
import "../login/login.css";
import t_logo from '../login/t_logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Login() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return(
    <Container className="d-flex vh-100">
        <Row className="m-auto align-self-center">
          <Col>
             <Card className="LoginCard">
                <Card.Img variant="top" src={t_logo} style={{width:"10rem", justifyContent:"center", alignSelf:"center"}} className="my-3 p-3" />
                <Card.Body>
    
                    <div className="Login">
                            <Form onSubmit={handleSubmit}>
                                    <Form.Group size="lg" controlId="email">
                                        <Form.Label>Email</Form.Label>
                                            <Form.Control 
                                            autoFocus
                                            type="email"
                                            name='email'
                                            value={formValues.email}
                                            onChange={handleChange}
                                            />
                                            <p>{formErrors.email}</p>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                            <Form.Control 
                                            type="password"
                                            name="password"
                                            value={formValues.password}
                                            onChange={handleChange}
                                            required
                                            />
                                            <p>{formErrors.password}</p>
                                    </Form.Group>
                                <Button block size="lg" className="btn_login" type="submit" >Login</Button>
                                <div>
                                    <a href="" className='btn_forgot_password' >Forgot Password?</a>
                                </div>
                                
                            </Form>
                        </div>
    
                </Card.Body>
             </Card>
            </Col>
        </Row>
    </Container>
       
    );

}



export default Login;