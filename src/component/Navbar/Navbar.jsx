import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
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
import { navbarSearchHandler } from "../../redux/actions/search";

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
            onChange={this.props.onSearch}
            className="navbarSearch"
            placeholder="Cari Resep atau Artikel"
          />
          <i className="fa fa-search icon"></i>
        </div>
        <div className="d-flex">
          {this.props.user.id ? (
            <>
              <Dropdown toggle={this.toggleDropdown}
                isOpen={this.state.dropdownOpen}>
                <DropdownToggle tag="div" className="d-flex">
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: 20 }} />
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
                          Konfirmasi Pembayaran
                      </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/laporan-resep">
                          Dashboard Laporan
                      </Link>
                      </DropdownItem>
                    </>
                  ) : (
                      <>
                        <DropdownItem>
                          <Link style={{ color: "inherit", textDecoration: "none" }}
                            to="/pengaturan">
                            Profil Saya
                      </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link style={{ color: "inherit", textDecoration: "none" }}
                            to="/resepku">
                            Resep Saya
                      </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link style={{ color: "inherit", textDecoration: "none" }}
                            to="/rencana">
                            Rencana Saya
                      </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link style={{ color: "inherit", textDecoration: "none" }}
                            to="/tipsku">
                            Tips Saya
                      </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link style={{ color: "inherit", textDecoration: "none" }}
                            to="/riwayat">
                            Riwayat Transaksi
                      </Link>
                        </DropdownItem>
                      </>
                    )}
                </DropdownMenu>

              </Dropdown>
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
                  <Button type="outlined" className="login mx-3">
                    Masuk
                    </Button>
                </Link>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button type="contained" className="signup">Daftar</Button>

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
  onSearch: navbarSearchHandler,
};

export default connect(mapStateToProps, mapDispacthToProps)(Navbar);
