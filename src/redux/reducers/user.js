import types from "../types/index";

const {
    ON_LOGIN_FAIL,
    ON_LOGIN_SUCCESS,
    ON_LOGOUT_SUCCESS,
    ON_SIGNUP_FAIL,
} = types;

const init_state = {
    id: 0,
    username: "",
    namaLengkap: "",
    role: "",
    errMsg: "",
    cookieChecked: false
};

export default (state = init_state, action) => {
    switch (action.type) {
        case ON_LOGIN_SUCCESS:
            const { username, namaLengkap, role, id } = action.payload;
            return {
                ...state,
                username,
                namaLengkap,
                role,
                id,
                cookieChecked: true
            };
        case ON_LOGIN_FAIL:
            return { ...state, errMsg: action.payload, cookieChecked: true };
        case ON_SIGNUP_FAIL:
            return { ...state, errMsg: action.payload, cookieChecked: true };
        case ON_LOGOUT_SUCCESS:
            return { ...init_state, cookieChecked: true };
        case "COOKIE_CHECK":
            return { ...state, cookieChecked: true };
        default:
            return { ...state };
    }
};