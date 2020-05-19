import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import PageNotFound from "./view/screen/PageNotFound";
import Home from "./view/screen/Home/Home";
import Resep from "./view/screen/Resep/Resep";
import Produk from "./view/screen/Produk/Produk";
import Tips from "./view/screen/Tips/Tips";
import LoginAkun from "./view/screen/Auth/LoginAkun";
import SignupAkun from "./view/screen/Auth/SignupAkun";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginAkun} />
        <Route exact path="/signup" component={SignupAkun} />
        <Route exact path="/resep" component={Resep} />
        <Route exact path="/produk" component={Produk} />
        <Route exact path="/tips" component={Tips} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
