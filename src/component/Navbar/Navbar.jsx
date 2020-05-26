import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "./Navbar.css";
import Button from "../Button/Buttons";
import { logoutHandler } from "../../redux/actions";
import { connect } from "react-redux";

class Navbar extends React.Component {
  sigoutButtonHandler = () => {
    this.props.onLogout()
  }


  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container">
        <div className="logo-navbar">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            <h2>KUEKU</h2>
          </Link>
        </div>
        <div className="menu-navbar d-flex justify-content-start mx-4">
          <Link
            to="/resep"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h4 className="mx-4 font-weight-bold">Resep</h4>
          </Link>
          <Link
            to="/produk"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h4 className="mx-4 font-weight-bold">Produk</h4>
          </Link>
          <Link to="/tips" style={{ textDecoration: "none", color: "inherit" }}>
            <h4 className="mx-4 font-weight-bold">Tips dan Trik</h4>
          </Link>
        </div>
        <div
          className="px-5 d-flex justify-content-end search"
          style={{ flex: 1 }}
        >
          <input
            type="text"
            className="navbarSearch"
            placeholder="Ketik untuk mencari"
          />
          <i className="fa fa-search icon"></i>
        </div>
        <div className="d-flex">
          {this.props.user.id ? (
            <>
             <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                <p className="small ml-3 mr-4">{this.props.user.username}</p>
              <Link
                className="d-flex flex-row"
                to=""
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faShoppingCart}
                  style={{ fontSize: 24 }}
                />
                {/* <CircleBg>
                  <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
                    {this.props.user.cartItems}
                  </small>
                </CircleBg> */}
              </Link>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/"
              >
                <Button
                  onClick={this.sigoutButtonHandler}
                  className="ml-3"
                  type="outlined"
                >
                  Keluar
              </Button>
              </Link>
            </>
          ) : (
              <>
                <Button type="outlined" className="mx-3">
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Masuk
                </Link>
                </Button>
                <Button type="contained">
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Daftar
                </Link>
                </Button>
              </>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispacthToProps = {
  onLogout: logoutHandler,
};

export default connect(mapStateToProps, mapDispacthToProps)(Navbar);
