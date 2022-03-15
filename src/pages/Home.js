import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GET_USER_REQ } from "../store/getUser-actions";
import LoadingSpinner from "../ui/LoadingSpinner";
const Home = () => {
    const dispatch = useDispatch();
    const log = useSelector(state => state.login);
    const userName = useSelector(state => state.user?.profile?.username);
    const status = useSelector(state => state.notification.status);
    console.log(userName);

    useEffect(() => {
        dispatch(GET_USER_REQ());
    }, [])

    if (status === "pending") {
        return <div className="centered">
            <LoadingSpinner />
        </div>
    }
    if (status === "rejected") {
        console.log("rejected")
    }
    return <div className="centered">
        {!log.isLoggedin && <>Please Login to Populate this page! 😊</>}
        {log.isLoggedin && <p>{`Hello, ${userName}! 🙌`}</p>}
    </div>
};
export default Home;