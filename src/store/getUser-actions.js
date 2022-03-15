import { userActions } from "./getUser-slice";
import { notificationActions } from "./notification-slice";
import { loginActions } from "./login-slice";
import { Configuration } from "../Configuration";

export const GET_USER_REQ = () => {

    return async (dispatch) => {
        const sendReq = async () => {
            dispatch(notificationActions.setNotification({
                status: "pending",
            }));
            const req = await fetch(Configuration.GET_SELF_API, {
                method: "GET",
                headers: {
                    "Authorization": localStorage.getItem("TEST_TOKEN"),
                    "x-api-key": Configuration.X_API_KEY,
                },
            });
            if (!req.ok) {
                const rejectData = await req.json();
                return rejectData
            }
            const resData = await req.json();
            return resData;
        };
        try {
            const userData = await sendReq();
            console.log(userData, "From Action")
            if (userData.status === 400 || userData.status === 500 || userData.status === 401) {
                throw userData;
            }
            dispatch(userActions.setUserInfo(userData.data.account));
            dispatch(notificationActions.setNotification({
                status: "fullfiled",
                message: userData.message
            }));
        } catch (err) {
            console.log(err);
            dispatch(notificationActions.setNotification({
                status: "rejected",
                message: err.message
            }));

            if (err.status === 401 || err.status === 500) {
                dispatch(loginActions.logOut())
            }
            if (err.status === 500) {
                window.location.reload(true)
            }
        }
    }
};
