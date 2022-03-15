
import { loginActions } from "./login-slice";
import { notificationActions } from "./notification-slice";
import { Configuration } from "../Configuration";

export const LOGIN_POST_REQ = (data) => {

    return async (dispatch) => {

        const sendReq = async (loginData) => {

            dispatch(notificationActions.setNotification({
                status: "pending",
            }));
            const res = await fetch(Configuration.LOGIN_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": Configuration.X_API_KEY,
                },
                body: JSON.stringify(loginData),
            });
            if (!res.ok) {
                return;
            };

            const responseData = await res.json();
            return responseData


        };
        try {
            const resData = await sendReq(data);
            console.log(resData);
            dispatch(loginActions.logIn({
                accessToken: `${resData.data.tokenType} ${resData.data.accessToken}`,
                profile: resData.data.user
            }));
            dispatch(notificationActions.setNotification({
                status: "fullfiled",
                message: resData.message
            }));
        } catch (err) {
            console.log(err)
            dispatch(notificationActions.setNotification({
                status: "rejected",
                message: err.message
            }));
        }

    }
}