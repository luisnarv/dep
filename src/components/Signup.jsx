import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import { setSessionId } from "../reducer";
import { validateLogin, validateSignUp } from "../utils/validate";
import { setItem } from "../utils/localStorage";
import GoogleSignIn from "./GoogleSignIn";

const BACK = process.env.REACT_APP_BACK;

export default function Signup(props) {
  const { setShowAlertLogin, fromCart } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Variable user para el Login
  const [user, setUser] = useState({
    username: "",
    password: "",
    touched: {
      username: false,
      password: false,
    },
  });
  // Variable errors del user para el Login
  const [errorsUser, setErrorsUser] = useState({
    username: "",
    password: "",
  });
  // Variable user para el SignUp
  const [userSignUp, setUserSignUp] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dni: "",
    number: "",
    sex: "",
    height: "",
    civilState: "",
    confirmPassword: "",
    touched: {
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
      firstName: false,
      lastName: false,
      dni: false,
      number: false,
      sex: false,
      height: false,
      civilState: false,
    },
  });
  // Variable errors del user para el SignUp
  const [errorsUserSignUp, setErrorsUserSignUp] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dni: "",
    number: "",
    sex: "",
    height: "",
    civilState: "",

    confirmPassword: "",
  });

  const [selectedSex, setSelectedSex] = useState("");
  const [selectedForm, setSelectedForm] = useState("login");

  // Ingresar los datos al objeto user y verificar errores
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
      touched: { ...prevState.touched, [name]: true },
    }));
    setErrorsUser(
      validateLogin({
        ...user,
        [name]: value,
      })
    );
  };

  // Ingresar los datos al objeto userSignUp y verificar errores
  const handleChangeSignUp = (event) => {
    const { name, value, innerText } = event.target;
    if (innerText && name === "civilState") {
      setUserSignUp((prevState) => ({
        ...prevState,
        [name]: innerText.toLowerCase(),
        touched: { ...prevState.touched, [name]: true },
      }));
      setErrorsUserSignUp(
        validateSignUp({
          ...userSignUp,
          [name]: innerText.toLowerCase(),
        })
      );
    } else {
      if (name === "sex" && value !== selectedSex) {
        setSelectedSex(value);
      }
      setUserSignUp((prevState) => ({
        ...prevState,
        [name]: value,
        touched: { ...prevState.touched, [name]: true },
      }));
      setErrorsUserSignUp(
        validateSignUp({
          ...userSignUp,
          [name]: value,
        })
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (hasValues) {
      alert("Debe completar todos los espacios");
    } else if (hasErrors) {
      alert("Debe completar los datos correctamente");
    } else {
      try {
        const response = await axios.post(`${BACK}/users/login`, user);
        const userData = {
          name: response.data.name,
          token: response.headers.token,
        };
        dispatch(setSessionId(userData));
        setItem("sessionId", userData);
        // devuelve al iniciar sesión al perfil del usuario con url modificada con parte de su usuario
        if (fromCart === true) {
          setShowAlertLogin(false);
          navigate("/cart");
        } else {
          navigate("/user");
        }
      } catch (error) {
        const alertError = error.response.data?.msg;
        alert(alertError);
      }
    }
  };

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
    if (hasValuesSignUp) {
      alert("Debe completar todos los espacios");
    } else if (hasErrorsSignUp) {
      alert("Debe completar los datos correctamente");
    } else {
      try {
        await axios.post(`${BACK}/users/signup`, userSignUp);
        window.alert("Registro exitoso.");
        setSelectedForm("login");
      } catch (error) {
        const alertError = error.response.data.errors[0]?.msg;
        alert(alertError);
      }
    }
  };

  const hasErrors = Object.values(errorsUser).some((value) => value !== "");
  const hasErrorsSignUp = Object.values(errorsUserSignUp).some(
    (value) => value !== ""
  );
  const hasValues = Object.values(user).some((value) => value === "");
  const hasValuesSignUp = Object.values(userSignUp).some(
    (value) => value === ""
  );

  const showErrors = function (e) {
    const { innerText } = e.target;
    if (innerText === "Ingresar") {
      for (const key in user) {
        setUser((prevState) => ({
          ...prevState,
          touched: {
            ...prevState.touched,
            [key]: true,
          },
        }));
      }
      setErrorsUser(
        validateLogin({
          ...user,
        })
      );
    } else {
      for (const key in userSignUp) {
        setUserSignUp((prevState) => ({
          ...prevState,
          touched: {
            ...prevState.touched,
            [key]: true,
          },
        }));
      }
      setErrorsUserSignUp(
        validateSignUp({
          ...userSignUp,
        })
      );
    }
  };

  function handleSelect(e) {
    const { innerText } = e.target;
    if (innerText === "Registrarse") {
      setSelectedForm("signup");
    } else {
      setSelectedForm("login");
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      {location.pathname === "/signup" ? (
        <div style={{ margin: "2%" }}>
          <ToggleButtonGroup
            type="radio"
            name="options"
            defaultValue={1}
            value={selectedForm === "login" ? 1 : 2}
          >
            <ToggleButton
              value={1}
              id="tbg-radio-2"
              name="login"
              onClick={(e) => handleSelect(e)}
              variant="outline-primary"
            >
              Iniciar Sesión
            </ToggleButton>
            <ToggleButton
              value={2}
              id="tbg-radio-1"
              name="signup"
              onClick={(e) => handleSelect(e)}
              variant="outline-primary"
            >
              Registrarse
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      ) : null}

      <div
        style={
          selectedForm === "signup"
            ? location.pathname === "/signup"
              ? {
                  width: "80%",
                  margin: "auto",
                  backgroundColor: "white",
                  padding: "2%",
                  borderRadius: "20px",
                  marginBottom: "2%",
                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                  position: "relative",
                }
              : {
                  width: "100%",
                  margin: "auto",
                  backgroundColor: "white",
                  padding: "2%",
                  borderRadius: "20px",
                  marginBottom: "2%",
                  position: "relative",
                }
            : location.pathname === "/signup"
            ? {
                width: "40%",
                margin: "auto",
                backgroundColor: "white",
                padding: "2%",
                borderRadius: "20px",
                marginBottom: "2%",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                position: "relative",
              }
            : {
                width: "80%",
                margin: "auto",
                backgroundColor: "white",
                padding: "2%",
                borderRadius: "20px",
                marginBottom: "2%",
                position: "relative",
              }
        }
      >
        {location.pathname === "/cart" ? (
          selectedForm === "signup" ? (
            <div style={{ position: "absolute", top: "10px", left: "10px" }}>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setSelectedForm("login")}
              >
                {"< Iniciar Sesión"}
              </Button>
            </div>
          ) : null
        ) : null}
        <Row
          style={
            selectedForm === "signup"
              ? { width: "40%", margin: "auto" }
              : { width: "70%", margin: "auto" }
          }
        >
          {selectedForm === "signup" ? (
            <p>Regístrese con Google</p>
          ) : (
            <p>Inicie Sesión con Google</p>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GoogleSignIn />
          </div>
        </Row>
        <Row>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: "2%",
              marginBottom: "2%",
            }}
          >
            <div style={{ borderBottom: "1px solid grey", width: "40%" }}></div>
            <p style={{ textAlign: "center", margin: "0 10px" }}>O</p>
            <div style={{ borderBottom: "1px solid grey", width: "40%" }}></div>
          </div>
        </Row>
        {selectedForm === "signup" ? (
          <Form
            onSubmit={(e) => {
              handleSubmitSignUp(e);
            }}
          >
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre(s)</Form.Label>
                  <Form.Control
                    name="firstName"
                    onChange={(e) => {
                      handleChangeSignUp(e);
                    }}
                    type="text"
                    placeholder="Ingrese su(s) nombre(s)"
                  />
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {userSignUp.touched.firstName
                      ? errorsUserSignUp.firstName
                      : null}
                  </p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido(s)</Form.Label>
                  <Form.Control
                    name="lastName"
                    onChange={(e) => {
                      handleChangeSignUp(e);
                    }}
                    type="text"
                    placeholder="Ingrese su(s) apellido(s)"
                  />
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {userSignUp.touched.lastName
                      ? errorsUserSignUp.lastName
                      : null}
                  </p>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control
                    name="username"
                    onChange={(e) => {
                      handleChangeSignUp(e);
                    }}
                    type="text"
                    placeholder="Ingrese un nombre de usuario"
                  />
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {userSignUp.touched.username
                      ? errorsUserSignUp.username
                      : null}
                  </p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    name="dni"
                    onChange={(e) => {
                      handleChangeSignUp(e);
                    }}
                    type="text"
                    placeholder="Ingrese su DNI"
                  />
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {userSignUp.touched.dni ? errorsUserSignUp.dni : null}
                  </p>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Número de teléfono</Form.Label>
                  <Form.Control
                    name="number"
                    onChange={(e) => {
                      handleChangeSignUp(e);
                    }}
                    type="text"
                    placeholder="Ingrese su número de teléfono"
                  />
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {userSignUp.touched.number ? errorsUserSignUp.number : null}
                  </p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    name="email"
                    onChange={(e) => {
                      handleChangeSignUp(e);
                    }}
                    type="text"
                    placeholder="Ingrese su correo electrónico"
                  />
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {userSignUp.touched.email ? errorsUserSignUp.email : null}
                  </p>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Género</Form.Label>
                  <Row style={{ width: "80%", margin: "auto" }}>
                    <Col>
                      <Form.Check
                        name="sex"
                        value={"M"}
                        checked={selectedSex === "M"}
                        onChange={(e) => {
                          handleChangeSignUp(e);
                        }}
                        type="checkbox"
                        label="Hombre"
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        name="sex"
                        value={"F"}
                        checked={selectedSex === "F"}
                        onChange={(e) => {
                          handleChangeSignUp(e);
                        }}
                        type="checkbox"
                        label="Mujer"
                      />
                    </Col>
                  </Row>
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {userSignUp.touched.sex ? errorsUserSignUp.sex : null}
                  </p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Altura (cm)</Form.Label>
                  <Form.Control
                    name="height"
                    onChange={(e) => {
                      handleChangeSignUp(e);
                    }}
                    type="text"
                    placeholder="Ingrese su altura en cm"
                  />
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {userSignUp.touched.height ? errorsUserSignUp.height : null}
                  </p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Estado civil</Form.Label>

                  <DropdownButton
                    variant="outline-secondary"
                    title={
                      userSignUp.civilState === ""
                        ? "Seleccione su estado civil"
                        : userSignUp.civilState.charAt(0).toUpperCase() +
                          userSignUp.civilState.slice(1)
                    }
                    name="civilState"
                    onClick={(e) => {
                      //console.log("event", e.target.name);
                      if (e.target.name !== "") {
                        handleChangeSignUp(e);
                      }
                    }}
                  >
                    <Dropdown.Item name="civilState" value="soltero">
                      Soltero
                    </Dropdown.Item>
                    <Dropdown.Item name="civilState" value="casado">
                      Casado
                    </Dropdown.Item>
                    <Dropdown.Item name="civilState" value="divorciado">
                      Divorciado
                    </Dropdown.Item>
                    <Dropdown.Item name="civilState" value="viudo">
                      Viudo
                    </Dropdown.Item>
                  </DropdownButton>
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {userSignUp.touched.civilState
                      ? errorsUserSignUp.civilState
                      : null}
                  </p>
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ width: "60%", margin: "auto" }}>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  name="password"
                  onChange={(e) => {
                    handleChangeSignUp(e);
                  }}
                  type="password"
                  placeholder="Ingrese una contraseña"
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {userSignUp.touched.password
                    ? errorsUserSignUp.password
                    : null}
                </p>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirme su contraseña</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  onChange={(e) => {
                    handleChangeSignUp(e);
                  }}
                  type="password"
                  placeholder="Confirme su contraseña"
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {userSignUp.touched.confirmPassword
                    ? errorsUserSignUp.confirmPassword
                    : null}
                </p>
              </Form.Group>
            </Row>
            <Button
              variant="success"
              type="submit"
              onClick={(e) => {
                showErrors(e);
              }}
              style={{ width: "30%" }}
            >
              Registrarse
            </Button>
          </Form>
        ) : null}
        {selectedForm === "login" ? (
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            style={{
              width: "90%",
              margin: "auto",
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                name="username"
                onChange={(e) => {
                  handleChange(e);
                }}
                type="text"
                placeholder="Ingrese su nombre de usuario"
              />
              <p style={{ color: "red", fontSize: "12px" }}>
                {user.touched.username ? errorsUser.username : null}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" style={{ position: "relative" }}>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                onChange={(e) => {
                  handleChange(e);
                }}
                type="password"
                placeholder="Ingrese su contraseña"
              />
              <div
                style={{
                  position: "absolute",
                  fontSize: "12px",
                  bottom: "-20px",
                  right: "0px",
                }}
              >
                <a href={"signup"}>¿Olvidaste tu contraseña?</a>
              </div>
              <p style={{ color: "red", fontSize: "12px" }}>
                {user.touched.password ? errorsUser.password : null}
              </p>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                showErrors(e);
              }}
              style={{ marginTop: "5%", width: "60%" }}
            >
              Iniciar Sesión
            </Button>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "3%",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid grey",
                  width: "90%",
                  marginBottom: "2%",
                }}
              ></div>

              <p>¿Aún no tienes cuenta?</p>
              <Button
                variant="success"
                onClick={(e) => {
                  setSelectedForm("signup");
                }}
                style={{ width: "40%" }}
              >
                Registrarse
              </Button>
            </div>
          </Form>
        ) : null}
      </div>
    </div>
  );
}
