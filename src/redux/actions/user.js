import Axios from "axios";
import Cookie from 'universal-cookie';
import { API_URL } from "../../constants/API";
import types from "../types/index";

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS,  ON_SIGNUP_SUCCESS,  ON_SIGNUP_FAIL } = types;

const cookieObj = new Cookie()

export const loginHandler = (users) => {
    return dispatch =>{
        const { username, password } = users;

        Axios.get(`${API_URL}/users`, {
            params: {
                username,
                password
            }
        })
        .then(res => {
            if (res.data.length > 0){
                dispatch({
                    type: ON_LOGIN_SUCCESS,
                    payload: res.data[0]
                })
            } else {
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
        Axios.get(`${API_URL}/users`, {
            params: {
                username: users.username
            } 
        })
        .then(res => {
            if(res.data.length > 0){
                dispatch({
                    type: ON_SIGNUP_FAIL,
                    payload: "Username sudah digunakan"
                })
            } else {
                Axios.post(`${API_URL}/users`, { ...users, role: "user" })
                .then(res => {
                    dispatch({
                        type: ON_SIGNUP_SUCCESS,
                        payload: res.data
                    })
                    // alert("berhasil")
                })
                .catch(err => {
                    console.log(err)
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
      Axios.get(`${API_URL}/users`, {
        params: {
          id: users.id,
        },
      })
        .then((res) => {
          if (res.data.length > 0) {
            dispatch({
              type: ON_LOGIN_SUCCESS,
              payload: res.data[0],
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