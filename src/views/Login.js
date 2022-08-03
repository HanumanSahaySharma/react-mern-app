import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import NoteContext from "../context/notes/NoteContext";

/* Bootstrap Components */
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

/* FontAwesome Icon */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

export default function Login() {
   const { alert, setAlert, alertMsg, setAlertMsg } = useContext(NoteContext);
   let [authUser, setAuthUser] = useState({ email: "", password: "" });

   const navigate = useNavigate();
   const handleLogin = async (e) => {
      e.preventDefault();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify({ email: authUser.email, password: authUser.password }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success === true) {
         localStorage.setItem("authToken", json.authToken);
         setAuthUser({ email: "", password: "" });
         setAlert(true);
         setAlertMsg("LoggedIn successfully!");
         setTimeout(() => {
            setAlert(false);
         }, 2000);
         navigate("/");
      }
   };
   const onChange = (e) => {
      setAuthUser({ ...authUser, [e.target.name]: e.target.value });
   };
   return (
      <>
         <Alert show={alert} variant="warning" className="d-flex align-items-center rounded-0">
            <FontAwesomeIcon icon={faCircleCheck} className="me-2" />
            {alertMsg}
         </Alert>
         <Container className="my-5">
            <Row>
               <Col lg={{ span: 6, offset: 3 }}>
                  <h1>Login</h1>
                  <Card bg="light">
                     <Card.Body>
                        <Form onSubmit={handleLogin}>
                           <Form.Group className="mb-3">
                              <Form.Label>Email Address</Form.Label>
                              <Form.Control
                                 type="text"
                                 value={authUser.email}
                                 name="email"
                                 id="email"
                                 minLength={5}
                                 required
                                 onChange={onChange}
                              ></Form.Control>
                           </Form.Group>
                           <Form.Group className="mb-3">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                 type="password"
                                 value={authUser.password}
                                 name="password"
                                 id="password"
                                 minLength={5}
                                 required
                                 onChange={onChange}
                              ></Form.Control>
                           </Form.Group>
                           <Button
                              disabled={authUser.email === "" || authUser.password === ""}
                              type="submit"
                              variant="danger"
                           >
                              Login
                           </Button>
                        </Form>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </Container>
      </>
   );
}
