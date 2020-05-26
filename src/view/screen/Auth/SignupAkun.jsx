import React from "react";
import "./AuthAkun.css";
import Button from "../../../component/Button/Buttons";
import { signupHandler } from "../../../redux/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class SignupAkun extends React.Component {
  state = {
    signupForm: {
      username: "",
      namaLengkap: "",
      email: "",
      password: "",
      tampilPassword: false
    }
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

  signupButtonHandler = () => {
    const { username, namaLengkap, email, password } = this.state.signupForm
    let newUser = {
      username,
      namaLengkap,
      email,
      password
    }

    this.props.onSignup(newUser)
  }

  checkboxHandler = (e, form) => {
    const { checked } = e.target;

    //console.log(checked);

    this.setState({
      [form]: {
        ...this.state[form],
        tampilPassword: checked,
      },
    });
  };






  render() {
    const { username, namaLengkap, email, password, tampilPassword } = this.state.signupForm
    if (this.props.user.id > 0) {
      return <Redirect to="/" />
    }
    return (
      <div className="d-flex flex-column text-center align-items-center">
        <div className="row">
          <div className="col-12">
            <div className="mt-5">
              <h2>Daftar Akun Baru</h2>
              <h5 className="mt-4">
                Daftar untuk mendapatkan rekomendasi resep terbaru, membaca
                artikel, dan membagikan pengalaman baking kamu.
              </h5>
              {this.props.user.errMsg ? (
                <div className="alert alert-danger mt-3">
                  {this.props.user.errMsg}
                </div>
              ) : null}
              <div className="d-flex justify-content-center">
                <input
                  type="text"
                  placeholder="Username" value={username}
                  className="mt-4 form-control form-control-lg"
                  onChange={(e) => this.inputHandler(e, "username", "signupForm")}
                />
              </div>
              <div className="d-flex justify-content-center">
                <input
                  type="text"
                  placeholder="Nama Lengkap" value={namaLengkap}
                  className="mt-3 form-control form-control-lg"
                  onChange={(e) => this.inputHandler(e, "namaLengkap", "signupForm")}
                />
              </div>
              <div className="d-flex justify-content-center">
                <input
                  type="text"
                  placeholder="Email" value={email}
                  className="mt-3 form-control form-control-lg"
                  onChange={(e) => this.inputHandler(e, "email", "signupForm")}
                />
              </div>
              <div className="d-flex justify-content-center">
                <input
                  type={tampilPassword ? "text" : "password"}
                  placeholder="Password" value={password}
                  className="mt-3 form-control form-control-lg"
                  onChange={(e) => this.inputHandler(e, "password", "signupForm")}
                />
              </div>
              <input
                type="checkbox"
                className="mt-3"
                name="tampilPassword"
                onChange={(e) => this.checkboxHandler(e, "signupForm")}
              />{" "}
                  Tampilkan Password
                  <br />
              <div className="d-flex justify-content-center">
                <Button type="contained" className="mt-4" onClick={this.signupButtonHandler}>
                  Daftar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  onSignup: signupHandler
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupAkun);
