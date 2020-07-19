import React from 'react'
import Buttons from '../../../component/Button/Buttons'
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import { connect } from 'react-redux'
import swal from 'sweetalert'

class Resetpassword extends React.Component {
    state = {
        resetPassword: {
            newPassword: "",
            confirmPassword: "",
            showPassword: false
        },
        userData: []
    }

    getUserData = () => {
        //alert('masuk')
        const newToken = new URLSearchParams(window.location.search).get("token")
        console.log(this.props.match.params.username)
        Axios.get(`${API_URL}/pengguna/lupa-password/${this.props.match.params.username}`, {
            params: {
                token: newToken
            }
        })
            .then(res => {
                //console.log(res.data)
                this.setState({ userData: res.data })
                console.log(this.state.userData)
            })
            .catch(e => {
                console.log(e)
            })
    }

    componentDidMount = () => {
        this.getUserData()
    }

    inputHandler = (e, field, form) => {
        const { value } = e.target
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value
            }
        })
    }

    checkboxHandler = (e, form) => {
        const { checked } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                showPassword: checked,
            },
        });
    };

    resetPasswordHandler = () => {
        const { userData } = this.state
        const { newPassword, confirmPassword } = this.state.resetPassword
        const newData = { ...userData }
        console.log(newData)

        if (confirmPassword === newPassword) {
            Axios.put(`${API_URL}/pengguna//ganti-password/${this.props.match.params.username}`, newData, {
                params: {
                    newPassword
                }
            })
                .then(res => {
                    console.log(res.data)
                    swal("Sukses", "Atur Ulang Password Berhasil. Silahkan Login Kembali", "success")
                    this.setState({ resetPassword: { newPassword: "", confirmPassword: "" } });
                })
                .catch(e => {
                    console.log(e)
                    swal("Gagal", "Atur Ulang Password Gagal", "error")
                })
        }
        else {
            swal("Gagal", "Password Tidak Cocok!", "error")
        }
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Atur Ulang Password</h3>
                        <div className="d-flex justify-content-center">
                            <input
                                type={this.state.resetPassword.showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="mt-3 form-control"
                                value={this.state.resetPassword.newPassword} onChange={(e) => this.inputHandler(e, "newPassword", "resetPassword")}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <input
                                type={this.state.resetPassword.showPassword ? "text" : "password"}
                                placeholder="Konfirmasi Ulang Password"
                                className="mt-3 form-control"
                                value={this.state.resetPassword.confirmPassword} onChange={(e) => this.inputHandler(e, "confirmPassword", "resetPassword")}
                            />
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <input
                                type="checkbox"
                                className="mr-3"
                                name="showPassword"
                                onChange={(e) => this.checkboxHandler(e, "resetPassword")}
                            />{" "}
                                Tampilkan Password
                        </div>

                        <br />
                        <div className="d-flex justify-content-center">
                            <Buttons type="contained" className="mt-4" onClick={this.resetPasswordHandler}>
                                Ganti Password
                            </Buttons>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Resetpassword) 