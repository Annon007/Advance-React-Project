import React from "react";

import styles from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const MainNavigation = () => {
    const isLoggedin = useSelector(state => state.login.isLoggedin)
    return <header className={styles.header}>
        <div className={styles.logo}>Advance React</div>
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="/home" className={({ isActive }) => isActive ? styles.active : ""}>

                        Home
                    </NavLink>
                </li>
                {isLoggedin && <li>
                    <NavLink to="/user-profile" className={({ isActive }) => isActive ? styles.active : ""}>
                        Profile
                    </NavLink>
                </li>}
                {!isLoggedin && <li>
                    <NavLink to="authentication" className={({ isActive }) => isActive ? styles.active : ""}>
                        Login
                    </NavLink>
                </li>}


            </ul>
        </nav>

    </header>

}

export default MainNavigation;