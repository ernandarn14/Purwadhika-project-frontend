import React from "react";
import "./AuthAkun.css";
import Button from "../../../component/Button/Buttons.tsx";

class AuthAkun extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column text-center">
        {/* <h1 className="text-center mt-5">KUEKU</h1> */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="mt-5">
              <h3>Masuk</h3>
              <p className="mt-4">Silahkan masuk dengan username</p>
              <input type="text" placeholder="Username" className="mt-5" />
              <br />
              <input
                type="text"
                placeholder="Password"
                className="mt-2"
                type="password"
              />
              <br /> <br />
              <div className="d-flex justify-content-center">
                <Button type="contained" className="mt-4">
                  Masuk
                </Button>
              </div>
            </div>
          </div>
          {/* <div className="col-6" style={{border: "1px solid black"}}>
            <div className="mt-5">
              <h3>Daftar Akun Baru</h3>
              <p className="mt-4">
                Daftar untuk mendapatkan rekomendasi resep terbaru, membaca artikel, dan membagikan pengalaman baking kamu
              </p>
              <input
                type="text"
                placeholder="Username"
                className="mt-5"
              /> <br />
              <input
                type="text"
                placeholder="Name"
                className="mt-2"
              /><br/>
              <input
                type="text"
                placeholder="Email"
                className="mt-2"
              /><br/>
              <input
                type="text"
                placeholder="Password"
                className="mt-2"
              /><br />
              <input
                type="checkbox"
                className="mt-3"
                name="showPasswordRegister"
              />{" "}
              Show Password
              <br/> <br/>
              <div className="d-flex justify-content-center">
                <Button
                  type="contained"
                  className="mt-4"
                >
                  Register
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default AuthAkun;
