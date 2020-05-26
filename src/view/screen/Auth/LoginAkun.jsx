import React from "react";
import "./AuthAkun.css";
import Button from "../../../component/Button/Buttons";
import { Link, Redirect } from "react-router-dom";
import { loginHandler } from "../../../redux/actions"
import { connect } from "react-redux";
import Cookies from "universal-cookie";
// import { Input } from 'reactstrap'

class LoginAkun extends React.Component {
  state = {
    loginForm: {
      username: "",
      password: "",
    }
  }

  componentDidUpdate() {
    if (this.props.user.id) {
      const cookie = new Cookies()
      cookie.set("userData", JSON.stringify(this.props.user), { path: "/" })
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

  loginButtonHandler = () => {
    const { username, password } = this.state.loginForm

    let newUser = {
      username,
      password
    }

    this.props.onLogin(newUser)
  }

  render() {
    if (this.props.user.id > 0) {
      return <Redirect to="/" />
    }
    return (
      <div className="d-flex flex-column text-center align-items-center">
        <div className="row">
          <div className="col-12">
            <div className="mt-5">
              <h2>Masuk</h2>
              <h5 className="mt-4">Silahkan masuk dengan nama pengguna</h5>
              {this.props.user.errMsg ? (
                <div className="alert alert-danger mt-3">
                  {this.props.user.errMsg}
                </div>
              ) : null}
              <input type="text" placeholder="Username" className="mt-4 form-control form-control-lg"
                value={this.state.loginForm.username} onChange={(e) => this.inputHandler(e, "username", "loginForm")} />
              <input
                type="password"
                placeholder="Password"
                className="mt-3 form-control form-control-lg"
                value={this.state.loginForm.password} onChange={(e) => this.inputHandler(e, "password", "loginForm")}
              />
              <div className="d-flex justify-content-center">
                <Button type="contained" className="mt-4" onClick={this.loginButtonHandler}>
                  Masuk
                </Button>
              </div><br />
              <div className="d-flex justify-content-around">
                <Link to="" style={{ textDecoration: "none" }}>
                  <h6>Lupa Password?</h6></Link>
                <Link to="/signup" className="mx-3" style={{ textDecoration: "none" }}><h6>Belum punya Akun?</h6></Link>
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
  onLogin: loginHandler
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAkun);
