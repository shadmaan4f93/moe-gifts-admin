import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CustomInput from "../../components/CustomInput/CustomInput";
import "./Login.css";

const Login = (props) => {

    const [username, setUsername] = useState({
        value: "",
        isTouched: false,
        isInvalid: false
    });
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
        isInvalid: false
    });
    const [isFormValid, setIsFormValid] = useState(true);
    const [wrongCredential, setWrongCredential] = useState(false);
    const [passwordForgotten, setPasswordForgotten] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem("token") ? true : false;
        if (authStatus)
            props.history.push("/admin/dashboard");
    })

    const inputChangeHandler = (event) => {
        setWrongCredential(false);
        let isFieldValid = event.target.value.trim() ? true : false;
        if (event.target.id === "username")
            setUsername({ value: event.target.value, isTouched: true, isInvalid: !isFieldValid });
        if (event.target.id === "password")
            setPassword({ value: event.target.value, isTouched: true, isInvalid: !isFieldValid });
    }

    const blurHandler = (event) => {
        const isValid = validateFields([{ value: event.target.value }]);
        if (event.target.id === "username") {
            setUsername({ ...username, isTouched: true, isInvalid: !isValid });
        }
        if (event.target.id === "password") {
            setPassword({ ...password, isTouched: true, isInvalid: !isValid });
        }
    }

    const validateFields = (fields) => {
        let isValid = true;
        fields.map(item => {
            const abc = item.value.trim() ? true : false;
            isValid = abc && isValid;
        })
        return isValid;
    }

    const submit = () => {
        const fields = [username, password]
        const isFormValid = validateFields(fields);
        debugger;
        if (isFormValid) {
            // email: "alvert@gmail.com",
            // password: "asdf@1234"
            axios.post("https://moe-gifts-api.herokuapp.com/login", {
                email: username.value,
                password: password.value, 
                type:"User"
            }).then(response => {
                if (response.data.message === "success") {
                    localStorage.setItem("token", response.data.token);
                    props.history.replace("/admin/dashboard");
                }
                if (response.data.statuscode === 401) {
                    setWrongCredential(true);
                }
            }).catch(error => {
                console.log(error);
            })
        } else {
            setIsFormValid(false);
        }
    }

    const forgotPassword = () => {
        setPasswordForgotten(true);
    }

    return (

        <div className="login-page">
            <h3>{!passwordForgotten ? "Login" : "Forgot Password"}</h3>
            <div className="login-page-inner">
                {!passwordForgotten &&
                    <>
                        <div hidden={isFormValid} style={{ color: "red" }}>Please enter all the fields</div>
                        <div hidden={!wrongCredential} style={{ color: "red" }}>Wrong email/password</div>
                        <CustomInput
                            labelText="Username"
                            id="username"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: inputChangeHandler,
                                onBlur: blurHandler
                            }}
                            error={username.isTouched && username.isInvalid}
                        />
                        <div hidden={!(username.isTouched && username.isInvalid)} style={{ marginTop: "-15px", fontSize: "0.75em", color: "red" }}>Please enter a username</div>
                        <CustomInput
                            labelText="Password"
                            id="password"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "password",
                                onBlur: blurHandler
                            }}
                            onChange={inputChangeHandler}
                            error={password.isTouched && password.isInvalid}
                        />
                        <div hidden={!(password.isTouched && password.isInvalid)} style={{ marginTop: "-15px", fontSize: "0.75em", color: "red" }}>Please enter a password</div>
                        <p onClick={forgotPassword}>Forgot Password?</p>

                        <div className="center-text">
                            <button className="button-color" type="button" onClick={submit}>Login</button></div>

                    </>
                }
                {passwordForgotten &&
                    <>
                        <p>Please enter the username/email for which to recover the password. The reset link will be sent to the associated email</p>
                        <CustomInput
                            labelText="Username/Email"
                            id="username"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: inputChangeHandler,
                                onBlur: blurHandler
                            }}
                            error={username.isTouched && username.isInvalid}
                        />

                        <div className="center-text">
                            <button className="button-color" type="button">Submit</button>
                            <button className="button-color" type="button" onClick={() => setPasswordForgotten(false)}>Return</button>
                        </div>
                    </>
                }
                {/* {JSON.stringify(username)}
                <p>
                    {JSON.stringify(password)}
                </p>
                {JSON.stringify({
                    username: "alvert@gmail.com",
                    password: "asdf@1234"
                })} */}
            </div></div>

    )
}
export default Login;