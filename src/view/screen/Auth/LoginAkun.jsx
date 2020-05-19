import React from "react";
import "./AuthAkun.css";
import Button from "../../../component/Button/Buttons.tsx";
import { Link } from "react-router-dom";
// import { Input } from 'reactstrap'

class LoginAkun extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column text-center align-items-center">
        <div className="row">
          <div className="col-12">
            <div className="mt-5">
              <h2>Masuk</h2>
              <h5 className="mt-4">Silahkan masuk dengan nama pengguna</h5>
              <input type="text" placeholder="Nama Pengguna"  className="mt-4 form-control form-control-lg" />
              <input
                type="text"
                placeholder="Kata Sandi"
                className="mt-3 form-control form-control-lg"
                type="password"
              />
              <div className="d-flex justify-content-center">
                <Button type="contained" className="mt-4">
                  Masuk
                </Button>
              </div><br />
              <div className="d-flex justify-content-center">
              <Link to="">
                  <h6>Lupa Kata Sandi?</h6></Link>
              <Link to="/signup" className="mx-3"><h6>Belum punya Akun?</h6></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginAkun;
