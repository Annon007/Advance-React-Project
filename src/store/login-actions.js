import { loginActions } from "./login-slice";
import { notificationActions } from "./notification-slice";
import { Configuration } from "../Configuration";

export const LOGIN_POST_REQ = (data) => {

    return async (dispatch) => {

        const sendReq = async (loginData) => {

            dispatch(notificationActions.setNotification({
                status: "pending",
                name: "login"
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
                const rejectData = await res.json();
                return rejectData
            };

            const responseData = await res.json();
            dispatch(notificationActions.setNotification({
                status: "fullfiled",
                message: responseData.message,
                name: "login"
            }));
            return responseData


        };
        try {
            const resData = await sendReq(data);
            console.log(resData);
            if (resData.status === 400 || resData.status === 500 || resData.status === 401) {
                throw resData;
            }
            dispatch(loginActions.logIn({
                accessToken: `${resData.data.tokenType} ${resData.data.accessToken}`,
                profile: resData.data.user
            }));

        } catch (err) {
            console.log(err, "Errors handeled");
            dispatch(notificationActions.setNotification({
                status: "rejected",
                message: err.message,
                errors: err.data.errors,
                name: "login"
            }));
            if (err.status === 401) {
                dispatch(loginActions.logOut())
            }
        }

    }
}