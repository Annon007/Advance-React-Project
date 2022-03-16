import React, { useState } from "react";

import styles from "./Auth.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";
import { loginActions } from "../store/login-slice";
import { LOGIN_POST_REQ } from "../store/login-actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Success_Toast, Error_Toast } from "../ui/toast/Toast";
let count = 0;
const Auth = () => {
    console.log(count++);
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.notification);
    const navigate = useNavigate();


    console.log(isLoading, "NOTIFICATIONS CHECK")
    const handleSignUp = (state) => {
        setIsSignUp(prev => state);
    }
    const onSignupSubmit = (e) => {
        e.preventDefault()
    }
    const onLoginSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(data);

        dispatch(LOGIN_POST_REQ(data))



    }

    if (isLoading.status === "pending") {
        return <div className="centered">
            <LoadingSpinner />
        </div>
    }
    if (isLoading.status === "fullfiled" && (isLoading.name === "login" || isLoading.name === "signup")) {
        Success_Toast(isLoading?.message);
        navigate("/home")
    }
    if (isLoading.status === "rejected" && (isLoading.name === "login" || isLoading.name === "signup")) {
        isLoading?.errors?.map(err => Error_Toast(Object.values(err)));
        Error_Toast(isLoading.message);

    }


    return <div className="centered">
        <div className={styles.form}>

            <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
            <form onSubmit={isSignUp ? onSignupSubmit : onLoginSubmit} className={styles.formInput}>
                <div className={styles.emailInput}>
                    <p>User Name</p>
                    <input type="text" name="username" required />

                </div>
                {isSignUp && <div className={styles.emailInput}>
                    <p>Email</p>
                    <input type="email" name="email" required />

                </div>}
                {isSignUp && <div className={styles.emailInput}>
                    <p>Mobile</p>
                    <input type="text" name="mobile" required />

                </div>}
                <div className={styles.passwordInput}>
                    <p>Password</p>
                    <input type="password" name="password" required />

                </div>

                {isSignUp && <div className={styles.passwordInput}>
                    <p>Confirm Password</p>
                    <input type="password" name="confirmPassword" required />

                </div>}

                <div className={styles.loginBtn}>
                    <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>

                </div>
            </form>
            {!isSignUp && <p className={styles.changeTo}>Don't have an account? <span onClick={() => handleSignUp(true)}>Sign Up</span></p>}
            {isSignUp && <p className={styles.changeTo}><span onClick={() => handleSignUp(false)}>Back</span></p>}
        </div>
    </div>
};

export default Auth;