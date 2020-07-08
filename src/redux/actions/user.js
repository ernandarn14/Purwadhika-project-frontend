import Axios from "axios";
import Cookie from 'universal-cookie';
import { API_URL } from "../../constants/API";
import types from "../types/index";
import user from "../reducers/user";
import swal from "sweetalert"

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS, ON_SIGNUP_SUCCESS, ON_SIGNUP_FAIL } = types;

const cookieObj = new Cookie()

export const loginHandler = (users) => {
    return dispatch => {
        const { username, password } = users;

        Axios.get(`${API_URL}/pengguna/masuk`, {
            params: {
                username,
                password
            }
        })
            .then(res => {
                console.log(res.data)
                if (res.data) {
                    alert('masuk')
                    dispatch({
                        type: ON_LOGIN_SUCCESS,
                        payload: res.data
                    })
                } else {
                    swal("Gagal", "Username atau Password Salah", "error")
                    dispatch({
                        type: ON_LOGIN_FAIL,
                        payload: "Username atau Password Salah"
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const logoutHandler = () => {
    cookieObj.remove("userData", { path: "/" });
    return {
        type: ON_LOGOUT_SUCCESS
    }
}

export const signupHandler = (users) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/pengguna/${users.username}/${users.email}`)
            .then(res => {
                console.log(res.data)
                if (res.data) {
                    Axios.post(`${API_URL}/pengguna/daftar`, { ...users, role: "pengguna" })
                        .then(res => {
                            console.log(res.data)
                            dispatch({
                                type: ON_SIGNUP_SUCCESS,
                                payload: res.data
                            })
                            swal("Sukses", "Perdaftaran Berhasil! Silahkan Cek Email Untuk Verifikasi", "success")
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    dispatch({
                        type: ON_SIGNUP_FAIL,
                        payload: "Username atau Email sudah digunakan"
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const userKeepLogin = (users) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/pengguna/id`, {
            params: {
                id: users.id
            }
        }
        )
            .then((res) => {
                if (res.data) {
                   // alert("masuk")
                    dispatch({
                        type: ON_LOGIN_SUCCESS,
                        payload: res.data,
                    });
                } else {
                    dispatch({
                        type: ON_LOGIN_FAIL,
                        payload: "Username atau password salah",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const cookieChecker = () => {
    return {
        type: "COOKIE_CHECK",
    };
};
