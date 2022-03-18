import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GET_USER_REQ } from "../store/getUser-actions";
import LoadingSpinner from "../ui/LoadingSpinner";
import { Error_Toast, Success_Toast } from "../ui/toast/Toast";
const Home = () => {
    const dispatch = useDispatch();
    const log = useSelector(state => state.login);
    const userInfo = useSelector(state => state.user);
    const status = useSelector(state => state.notification.status);

    const isLoading = useSelector(state => state.notification);
    console.log(userInfo);

    const { isLoggedin } = log;
    useEffect(() => {
        if (isLoggedin) {

            dispatch(GET_USER_REQ());
            if (isLoading.status === "fullfiled") {
                Success_Toast(isLoading?.message);

            }
            if (isLoading.status === "rejected") {
                if (isLoading?.errors) {
                    isLoading?.errors?.map(err => Error_Toast(Object.values(err)));
                } else {
                    Error_Toast(isLoading.message);

                }


            }
        }
    }, [isLoggedin])

    if (status === "pending") {
        return <div className="centered">
            <LoadingSpinner />
        </div>
    }

    return <div className="centered">
        {!log.isLoggedin && <>Please Login to Populate this page! 😊</>}
        {log.isLoggedin && <p>{`Hello, ${userInfo?.profile?.username}! 🙌`}</p>}
    </div>
};
export default Home;