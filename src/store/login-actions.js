import { loginActions } from "./login-slice";
import { notificationActions } from "./notification-slice";
import { Configuration } from "../Configuration";

export const LOGIN_POST_REQ = (data) => {

    return (dispatch) => {

        const sendReq = async (loginData) => {

            dispatch(notificationActions.setNotification({
                status: "pending",
                name: "login"
            }));
            try {
                const res = await fetch(Configuration.LOGIN_API, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": Configuration.X_API_KEY,
                    },
                    body: JSON.stringify(loginData),
                });
                if (!res.ok) {
                    const rejectedData = await res.json();
                    throw rejectedData;
                };

                const responseData = await res.json();
                dispatch(notificationActions.setNotification({
                    status: "fullfiled",
                    message: responseData.message,
                    name: "login"
                }));
                dispatch(loginActions.logIn({
                    accessToken: `${responseData.data.tokenType} ${responseData.data.accessToken}`,

                }));

            } catch (err) {
                dispatch(notificationActions.setNotification({
                    status: "rejected",
                    message: err.message,
                    errors: err.data.errors,
                    name: "login"
                }));
            }


        };
        sendReq(data);


    }
}