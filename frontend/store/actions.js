import instance, {
    checkCookie,
    deleteCookie,
    getCookie,
  } from "../http";

export const SET_AUTH_TRUE = "SET_AUTH_TRUE";
export const SET_AUTH_FALSE = "SET_AUTH_FALSE";


export const setAuthTrue = (username) => {
    return {
        type: SET_AUTH_TRUE,
        payload: { username },
    };
};

export const setAuthFalse = () => {
    return {
        type: SET_AUTH_FALSE,
        payload: {},
    };
};

export const verifyToken = () => {
    return (dispatch) => {
      instance
        .post("/token-verify/", { token: getCookie("jwt-auth") })
        .then((response) => {
          document.cookie = "jwt-auth=" + response.data.token;
          dispatch(setAuthTrue(response.data.user.username));
        })
        .catch(() => {
          if (checkCookie("jwt-auth")) {
            deleteCookie("jwt-auth");
          }
          dispatch(setAuthFalse());
        });
    };
  };

export const logout = () => {
    return (dispatch) => {
        if (checkCookie("jwt-auth")) {
            deleteCookie("jwt-auth");
        }
        dispatch(setAuthFalse());
    };
};
