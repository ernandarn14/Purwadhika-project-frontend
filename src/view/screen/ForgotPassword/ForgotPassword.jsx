import React from 'react'
import Buttons from '../../../component/Button/Buttons'

class ForgotPassword extends React.Component {
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
                                // value={email}
                                className="mt-3 form-control"
                            // onChange={(e) => this.inputHandler(e, "email", "signupForm")}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <Buttons type="contained" className="mt-4" onClick="">
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