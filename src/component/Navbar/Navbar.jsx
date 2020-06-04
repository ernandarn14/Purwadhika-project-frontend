import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "./Navbar.css";
import Button from "../Button/Buttons";
import { logoutHandler } from "../../redux/actions";
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

class Navbar extends React.Component {
  state = {
    dropdownOpen: false,
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };




  sigoutButtonHandler = () => {
    this.props.onLogout()
  }


  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container">
        <div className="logo-navbar">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            <h3>KUEKU</h3>
          </Link>
        </div>
        <div className="menu-navbar d-flex justify-content-start mx-4">
          <Link
            to="/resep"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h5 className="mx-2 font-weight-bold">Resep</h5>
          </Link>
          <Link
            to="/produk"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h5 className="mx-2 font-weight-bold">Produk</h5>
          </Link>
          <Link to="/tips" style={{ textDecoration: "none", color: "inherit" }}>
            <h5 className="mx-2 font-weight-bold">Tips dan Trik</h5>
          </Link>
        </div>
        <div
          className="d-flex justify-content-end ml-5 px-3 search"
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
              <Dropdown toggle={this.toggleDropdown}
                isOpen={this.state.dropdownOpen}>
                <DropdownToggle tag="div" className="d-flex">
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                  <p className="small ml-2 mr-4">{this.props.user.username}</p>
                </DropdownToggle>
                <DropdownMenu className="mt-2">
                  {this.props.user.role === "admin" ? (
                    <>
                      <DropdownItem>
                        <Link style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/resep">
                          Dashboard Resep
                      </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/produk">
                          Dashboard Produk
                      </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/tips">
                          Dashboard Tips dan Trik
                      </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/pembayaran">
                          Konfirmasi Pembelian
                      </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/laporan">
                          Laporan
                      </Link>
                      </DropdownItem>
                    </>
                  ) : (
                      <>
                        <DropdownItem>
                          <Link style={{ color: "inherit", textDecoration: "none" }}
                            to="/resepku">
                            Resep Saya
                      </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link style={{ color: "inherit", textDecoration: "none" }}
                            to="/rencana">
                            Rencana Baking
                      </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link style={{ color: "inherit", textDecoration: "none" }}
                            to="/riwayat">
                            Riwayat Pembelian
                      </Link>
                        </DropdownItem>
                      </>
                    )}
                </DropdownMenu>

              </Dropdown>

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
                <p className="small ml-2 mr-4" style={{ color: "#3C64B1", fontWeight: "bold" }}>0</p>
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
                  type="textual"
                >
                  Keluar
              </Button>
              </Link>
            </>
          ) : (
              <>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button type="outlined" className="mx-3">
                    Masuk
                    </Button>
                </Link>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button type="contained">Daftar</Button>

                </Link>
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
