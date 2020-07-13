import React from 'react'
import Buttons from '../../../component/Button/Buttons'
import Axios from 'axios';
import { API_URL } from '../../../constants/API';
import swal from 'sweetalert';

class ForgotPassword extends React.Component {
    state = {
        resetPass: {
            email: ""
        }
    }

    inputHandler = (e, field, form) => {
        let { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    };

    forgotPasswordHandler = () => {
        const { resetPass } = this.state
        Axios.post(`${API_URL}/pengguna/lupa-password`, resetPass)
            .then(res => {
                console.log(res.data)
                swal("Sukses", "Silahkan Cek Email Untuk Verifikasi Atur Ulang Password", "success")
            })
            .catch(err => {
                console.log(err)
                swal("Gagal", "Email Tidak Ditemukan atau Belum Terdaftar", "error")
            })
    }




    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Atur Ulang Password</h3>
                        <h6 className="mt-4 text-center">Silahkan masukkan email Anda untuk atur ulang password</h6>
                        <div className="d-flex justify-content-center mt-3">
                            <input
                                type="email"
                                placeholder="Email"
                                value={this.state.resetPass.email}
                                className="mt-3 form-control"
                                onChange={(e) => this.inputHandler(e, "email", "resetPass")}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <Buttons type="contained" className="mt-4" onClick={this.forgotPasswordHandler}>
                                Kirim
                            </Buttons>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword