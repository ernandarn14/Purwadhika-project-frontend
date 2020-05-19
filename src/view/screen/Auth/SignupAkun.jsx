import React from 'react';
import "./AuthAkun.css";
import Button from "../../../component/Button/Buttons.tsx";
import { Link } from "react-router-dom";

class SignupAkun extends React.Component{
    render() {
        return (
          <div className="d-flex flex-column text-center align-items-center">
            <div className="row">
              <div className="col-12 col-lg-offset-6">
                <div className="mt-5">
                  <h2>Daftar Akun Baru</h2>
                  <h5 className="mt-4">
                    Daftar untuk mendapatkan rekomendasi resep terbaru, membaca artikel, dan membagikan pengalaman baking kamu.
                  </h5>
                  <input
                    type="text"
                    placeholder="Nama Pengguna"
                    className="mt-5 form-control input-lg"
                  /> <br />
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="mt-2 form-control"
                  /><br/>
                  <input
                    type="text"
                    placeholder="Email"
                    className="mt-2 form-control input-lg"
                  /><br/>
                  <input
                    type="text"
                    placeholder="Kata Sandi"
                    className="mt-2 form-control input-lg"
                  /><br />
                  <input
                    type="checkbox"
                    className="mt-3"
                    name="showPasswordRegister"
                  />{" "}
                  Tampilkan Kata Sandi
                  <br/> 
                  <div className="d-flex justify-content-center">
                    <Button
                      type="contained"
                      className="mt-4"
                    >
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

export default SignupAkun