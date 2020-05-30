import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import PageNotFound from "./view/screen/PageNotFound";
import Home from "./view/screen/Home/Home";
import Recipe from "./view/screen/Recipe/Recipe";
import Product from "./view/screen/Product/Product";
import Tips from "./view/screen/Tips/Tips";
import LoginAkun from "./view/screen/Auth/LoginAkun";
import SignupAkun from "./view/screen/Auth/SignupAkun";
import { connect } from "react-redux";
import Cookie from "universal-cookie";
import {cookieChecker, userKeepLogin} from "./redux/actions"
import DashboardRecipe from "./view/screen/AdminMenu/DashboardRecipe";
import DashboardTips from "./view/screen/AdminMenu/DashboardTips";
import DashboardReport from "./view/screen/AdminMenu/DashboardReport";
import DashboardPayment from "./view/screen/AdminMenu/DashboardPayment";
import History from "./view/screen/UserMenu/History";
import MyResep from "./view/screen/UserMenu/MyResep";
import Wishlist from "./view/screen/UserMenu/Wishlist";

const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount(){
    let cookieResult = cookieObj.get("userData", { path: "/" })
    if (cookieResult){
      this.props.onLogin(cookieResult)
    } else {
      this.props.cookieChecker()
    }
  }

  renderAdminRoutes = () => {
    if (this.props.user.role === "admin") {
      return (
        <>
          <Route exact path="/admin/resep" component={DashboardRecipe} />
          <Route exact path="/admin/tips" component={DashboardTips} />
          <Route exact path="/admin/pembayaran" component={DashboardPayment} />
          <Route exact path="/admin/laporan" component={DashboardReport} />
        </>
      );
    }
  };

  renderProtectedRoutes = () => {
    if (this.props.user.id) {
      return (
        <>
          <Route exact path="/resepku" component={MyResep} />
          <Route exact path="/riwayat" component={History} />
          <Route exact path="/rencana" component={Wishlist} />
        </>
      );
    }
  };

  render(){
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginAkun} />
        <Route exact path="/signup" component={SignupAkun} />
        <Route exact path="/resep" component={Recipe} />
        <Route exact path="/produk" component={Product} />
        <Route exact path="/tips" component={Tips} />
        {this.renderAdminRoutes()}
        {this.renderProtectedRoutes()}
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  )};
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispacthToProps = {
  cookieChecker,
  onLogin: userKeepLogin
};

export default connect(mapStateToProps, mapDispacthToProps)(App);
