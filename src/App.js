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

const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount(){
    let cookieResult = cookieObj.get("authData", { path: "/" })
    if (cookieResult){
      this.props.onLogin(cookieResult)
    } else {
      this.props.cookieChecker()
    }
  }
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
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  )};
}

const mapStateToProps = (state) => {
  return {
    pengguna: state.pengguna,
  };
};

const mapDispacthToProps = {
  cookieChecker,
  onLogin: userKeepLogin
};

export default connect(mapStateToProps, mapDispacthToProps)(App);
