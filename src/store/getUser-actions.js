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
            try {
                const req = await fetch(Configuration.GET_SELF_API, {
                    method: "GET",
                    headers: {
                        "Authorization": localStorage.getItem("TEST_TOKEN"),
                        "x-api-key": Configuration.X_API_KEY,
                    },
                });
                if (!req.ok) {
                    const rejectData = await req.json();
                    throw rejectData;
                }
                const resData = await req.json();
                dispatch(userActions.setUserInfo(resData.data.account));
                dispatch(notificationActions.setNotification({
                    status: "fullfiled",
                    message: resData.message
                }));

            } catch (err) {
                dispatch(notificationActions.setNotification({
                    status: "rejected",
                    message: err.message
                }));
                if (err.status === 401) {
                    dispatch(loginActions.logOut())
                }
                if (err.status === 500) {
                    window.location.reload(true)
                }
            }
        };
        sendReq();

    }
};
