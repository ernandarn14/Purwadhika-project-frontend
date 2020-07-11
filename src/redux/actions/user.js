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

        Axios.get(`${API_URL}/pengguna/${username}`)
            .then(res => {
                //alert('verif username')
                console.log(res.data)
                if (res.data) {
                    //alert('verif pwd')
                    Axios.get(`${API_URL}/pengguna/masuk`, {
                        params: {
                            username,
                            password
                        }
                    })
                        .then(res => {
                            console.log(res.data)
                            // if (res.data) {
                                //alert('masuk')
                                dispatch({
                                    type: ON_LOGIN_SUCCESS,
                                    payload: res.data
                                })
                            // } else {
                            //     dispatch({
                            //         type: ON_LOGIN_FAIL,
                            //         payload: "Password Salah"
                            //     })
                            // }
                        })
                        .catch(err => {
                            console.log(err)
                            dispatch({
                                type: ON_LOGIN_FAIL,
                                payload: "Password Salah"
                            })
                        })
                } else {
                    dispatch({
                        type: ON_LOGIN_FAIL,
                        payload: "Username Salah"
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })

        // Axios.get(`${API_URL}/pengguna/masuk`, {
        //     params: {
        //         username,
        //         password
        //     }
        // })
        //     .then(res => {
        //         console.log(res.data)
        //         if (res.data) {
        //             //alert('masuk')
        //             dispatch({
        //                 type: ON_LOGIN_SUCCESS,
        //                 payload: res.data
        //             })
        //         } else {
        //             dispatch({
        //                 type: ON_LOGIN_FAIL,
        //                 payload: "Username atau Password Salah"
        //             })
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         dispatch({
        //             type: ON_LOGIN_FAIL,
        //             payload: "Username atau Password Salah"
        //         })
        //     })
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
        const { username, fullname, email, password } = users
        if (username !== "" && fullname !== "" && email !== "" && password !== "") {
            Axios.get(`${API_URL}/pengguna/${username}`)
                .then(res => {
                    console.log(res.data)
                    if (res.data) {
                        //alert('masuk verif user')
                        dispatch({
                            type: ON_SIGNUP_FAIL,
                            payload: "Username sudah digunakan"
                        })
                    } else {
                        Axios.get(`${API_URL}/pengguna/email`, {
                            params: {
                                email
                            }
                        })
                            .then(res => {
                                console.log(res.data)
                                if (res.data) {
                                    //alert('masuk verif email')
                                    dispatch({
                                        type: ON_SIGNUP_FAIL,
                                        payload: "Email sudah digunakan"
                                    })
                                } else {
                                    //alert('masuk post data')
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
                                            swal("Gagal", "Perdaftaran Anda Gagal! Silahkan Mencoba Beberapa Saat Kembali", "error")
                                        })
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            dispatch({
                type: ON_SIGNUP_FAIL,
                payload: "Semua Kolom Harus Terisi, Mohon Lengkapi Data Anda!"
            })
        }



        // Axios.get(`${API_URL}/pengguna/${users.username}/${users.email}`)
        //     .then(res => {
        //         console.log(res.data)
        //         if (res.data) {
        //             dispatch({
        //                 type: ON_SIGNUP_FAIL,
        //                 payload: "Username atau Email sudah digunakan"
        //             })
        //         } else {
        //             Axios.post(`${API_URL}/pengguna/daftar`, { ...users, role: "pengguna" })
        //                 .then(res => {
        //                     console.log(res.data)
        //                     dispatch({
        //                         type: ON_SIGNUP_SUCCESS,
        //                         payload: res.data
        //                     })
        //                     swal("Sukses", "Perdaftaran Berhasil! Silahkan Cek Email Untuk Verifikasi", "success")
        //                 })
        //                 .catch(err => {
        //                     console.log(err)
        //                     dispatch({
        //                         type: ON_SIGNUP_FAIL,
        //                         payload: "Username atau Email sudah digunakan"
        //                     })
        //                 })
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
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
