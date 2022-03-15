import { userActions } from "./getUser-slice";
import { notificationActions } from "./notification-slice";
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
                return;
            }
            const resData = await req.json();
            return resData;
        };
        try {
            const userData = await sendReq();
            console.log(userData, "From Action")
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
        }
    }
};
