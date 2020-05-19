import React from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
// import { faUser } from "@fortawesome/free-regular-svg-icons";
import "./Navbar.css";
import Button from "../Button/Buttons.tsx";

export default class Navbar extends React.Component {
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
        </div>
      </div>
    );
  }
}
