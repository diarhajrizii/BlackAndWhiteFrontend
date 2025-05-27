import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";

import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import image from "black-white-logo.png";
import "../assets/css/login.css";
import NotificationComponent from "components/Alert/alert";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const notificationComponentRef = useRef(new NotificationComponent());
  const { login, token } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const loginStatus = await login(email, password);
    if (loginStatus) {
      window.location.reload(); // Reload the page after successful login
    } else {
      notificationComponentRef.current.showNotification(
        `Something goes wrong! PLease Try Again`,
        "danger"
      );
    }
  };

  const handleSignUp = async (e) => {
    notificationComponentRef.current.showNotification(
      `Register Form isn't available right now`,
      "danger"
    );
    setShowRegisterForm(!showRegisterForm);
    setEmail("");
    setPassword("");
    setBusinessName("");
    e.preventDefault(); // Prevent the default form submission

    // Add your sign-up logic here
  };

  if (token) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <>
      <div className="content login-container">
        <NotificationComponent ref={notificationComponentRef} />
        <Row className="justify-content-center">
          <Card>
            <CardHeader>
              <Col
                style={{ textAlign: "center" }}
                className="imageContainer"
                md="12"
              >
                <img style={{ width: "45%" }} alt="..." src={image} />
              </Col>
              <Col style={{ textAlign: "center", fontSize: "20px" }} md="12">
                Sign in to Black & White CMS
              </Col>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleLogin}>
                <Row>
                  {showRegisterForm && (
                    <Col sm="12">
                      <FormGroup>
                        <Label for="email">Business name</Label>
                        <Input
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Enter your business name"
                          required
                        />
                      </FormGroup>
                    </Col>
                  )}

                  <Col sm="12">
                    <FormGroup>
                      <Label for="email">Email Address</Label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        type="email"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className sm="12">
                    <FormGroup>
                      <label>Password</label>
                      <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        type="password"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    {!showRegisterForm ? (
                      <Button
                        className="col-md-12 btn-fill"
                        color="primary"
                        type="submit"
                      >
                        Login
                      </Button>
                    ) : (
                      <Button
                        className="col-md-12 btn-fill"
                        color="primary"
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    )}
                  </Col>
                  <Col sm="12" className="text-center mt-4 mb-4">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <hr style={{ flexGrow: 1 }} />
                      <span style={{ padding: "0 10px", fontSize: "18px" }}>
                        OR
                      </span>
                      <hr style={{ flexGrow: 1 }} />
                    </div>
                  </Col>
                  <Col md="12 mb-5">
                    {!showRegisterForm ? (
                      <Button
                        className="col-md-12 btn-fill"
                        color="success"
                        onClick={handleSignUp}
                      >
                        Create New Account
                      </Button>
                    ) : (
                      <Button
                        className="col-md-12 btn-fill"
                        color="success"
                        onClick={handleSignUp}
                      >
                        Login into existing account
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
          {/* </div> */}
          {/* ... (Existing profile card) */}
        </Row>
      </div>
    </>
  );
};

export default LogIn;
