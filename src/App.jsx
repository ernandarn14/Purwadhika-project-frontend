import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import PageNotFound from "./view/screen/PageNotFound";
import Home from "./view/screen/Home/Home";
import Recipe from "./view/screen/Recipe/Recipe";
import Tips from "./view/screen/Tips/Tips";
import LoginAkun from "./view/screen/Auth/LoginUser";
import SignupAkun from "./view/screen/Auth/SignupUser";
import { connect } from "react-redux";
import Cookie from "universal-cookie";
import {cookieChecker, userKeepLogin} from "./redux/actions"
import DashboardRecipe from "./view/screen/AdminMenu/DashboardRecipe/DashboardRecipe";
import DashboardTips from "./view/screen/AdminMenu/DashboardTips/DashboardTips";
import DashboardReport from "./view/screen/AdminMenu/DashboardReport/DashboardReport";
import DashboardPayment from "./view/screen/AdminMenu/DashboardPayment/DashboardPayment";
import MyTips from "./view/screen/UserMenu/MyTips/MyTips";
import MyResep from "./view/screen/UserMenu/MyResep/MyResep";
import Wishlist from "./view/screen/UserMenu/MyWishlist/Wishlist";
import TipsDetails from "./view/screen/TipsDetails/TipsDetails";
import DashboardProduk from "./view/screen/AdminMenu/DashboardProduk/DashboardProduk";
import AddTips from "./view/screen/AdminMenu/DashboardTips/AddTips";
import EditTips from "./view/screen/AdminMenu/DashboardTips/EditTips";
import RecipeDetails from "./view/screen/RecipeDetails/RecipeDetails";
import AddResep from "./view/screen/UserMenu/MyResep/AddRecipe";
import Footer from "./component/Footer/Footer";
import ForgotPassword from "./view/screen/ForgotPassword/ForgotPassword";
import UserProfile from "./view/screen/UserMenu/UserProfile/UserProfile";
import AddNewRecipe from "./view/screen/AdminMenu/DashboardRecipe/AddNewRecipe";
import AddNewTips from "./view/screen/UserMenu/MyTips/AddNewTips";
import EditMyTips from "./view/screen/UserMenu/MyTips/EditMyTips";
import EditRecipe from "./view/screen/UserMenu/MyResep/EditRecipe";
import Profile from "./view/screen/Profile";
import MyHistory from "./view/screen/UserMenu/MyHistory/MyHistory";
import Resetpassword from "./view/screen/ForgotPassword/ResetPassword";
import AdminEditRecipe from "./view/screen/AdminMenu/DashboardRecipe/AdminEditRecipe";
import RecipeReport from "./view/screen/AdminMenu/DashboardReport/RecipeReport";
import PlanReport from "./view/screen/AdminMenu/DashboardReport/PlanReport";

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
          <Route exact path="/admin/produk" component={DashboardProduk} />
          <Route exact path="/admin/tips" component={DashboardTips} />
          <Route exact path="/admin/tips/tambah" component={AddTips} />
          <Route exact path="/admin/tips/edit/:tipsId" component={EditTips} />
          <Route exact path="/admin/pembayaran" component={DashboardPayment} />
          <Route exact path="/admin/laporan" component={DashboardReport} />
          <Route exact path="/admin/laporan-resep" component={RecipeReport} />
          <Route exact path="/admin/laporan-langganan" component={PlanReport} />
          <Route exact path="/admin/tambah-resep" component={AddNewRecipe} />
          <Route exact path="/admin/resep/edit/:resepId" component={AdminEditRecipe} />
        </>
      );
    }
  };

  renderProtectedRoutes = () => {
    if (this.props.user.id) {
      return (
        <>
          <Route exact path="/resepku" component={MyResep} />
          <Route exact path="/resepku/tambah" component={AddResep} />
          <Route exact path="/resepku/edit/:resepId" component={EditRecipe} />
          <Route exact path="/tipsku" component={MyTips} />
          <Route exact path="/tipsku/tambah" component={AddNewTips} />
          <Route exact path="/tipsku/edit/:tipsId" component={EditMyTips} />
          <Route exact path="/rencana" component={Wishlist} />
          <Route exact path="/pengaturan" component={UserProfile} />
          <Route exact path="/riwayat" component={MyHistory} />
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
        <Route exact path="/resep/:resepId" component={RecipeDetails} />
        <Route exact path="/tips" component={Tips} />
        <Route exact path="/tips/:tipsId" component={TipsDetails} />
        <Route exact path="/lupa-password" component={ForgotPassword} />
        <Route exact path="/pengguna/lupa-password/:username" component={Resetpassword} />
        <Route exact path="/pengguna/verifikasi/:username" component={Profile} />
        {this.renderAdminRoutes()}
        {this.renderProtectedRoutes()}
        <Route path="*" component={PageNotFound} />
      </Switch>
      <Footer />
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
  onLogin: userKeepLogin,
};

export default connect(mapStateToProps, mapDispacthToProps)(App);
