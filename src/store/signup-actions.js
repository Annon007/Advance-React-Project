import { signupActions } from "./signup-slice";
import { notificationActions } from "./notification-slice";
import { Configuration } from "../Configuration";

export const SIGNUP_POST_REQ = signupData => {
    return (dispatch) => {
        const sendReq = async (data) => {
            dispatch(notificationActions.setNotification({
                status:'pending',
                name:'signup'
            }));

            try {
                const res = await fetch(Configuration.SIGN_API, {
                    method:'POST',
                    headers:{
                        "Content-Type": "application/json",
                        "x-api-key": Configuration.X_API_KEY,
                    },
                    body: JSON.stringify(data),
                })
                if(!res.ok) {
                    const rejectedData = await res.json();
                    throw rejectedData;
                }
                const responseData = await res.json();
                console.log(responseData, "RESPONCE DATA")
                dispatch(notificationActions.setNotification({
                    status: "fullfiled",
                    message: responseData.message,
                    name: "signup"
                }));
                dispatch(signupActions.signUp(responseData.data.user));
            } catch (err) {
                dispatch(notificationActions.setNotification({
                    status: "rejected",
                    message: err.message,
                    errors: err.data.errors,
                    name: "signup"
                }));
            }
       };
       sendReq(signupData);
    }
}