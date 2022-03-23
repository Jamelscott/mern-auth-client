import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Register({ currentUser, setCurrentUser }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const [msg, setMessage] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.passwordCheck) {
      setMessage('Passwords did not match');
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`,
          form
        );
        const { token } = response.data;
        const decoded = jwt_decode(token);
        localStorage.setItem('jwt', token);
        setCurrentUser(decoded);
      } catch (err) {
        if (err.response.status === 504) {
          console.log(err.response.data);
          setMessage(err.response.data.msg);
        }
        console.log(err);
      }
    }
  };

  if (currentUser) return <Navigate to="/profile" />;

  return (
    <>
      <Container>
        <Row>
          <Col col={6}>
            <h1>Registeration</h1>
            <h3>{msg ? `the server has a message for you: ${msg}` : ''}</h3>
            <Form className="col-md-6" onSubmit={handleOnSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPasswordCheck">
                <Form.Label>Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="confirm your password"
                  value={form.passwordCheck}
                  onChange={(e) =>
                    setForm({ ...form, passwordCheck: e.target.value })
                  }
                />
                <Form.Text className="text-muted">
                  We'll never share your information with anyone else.
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
