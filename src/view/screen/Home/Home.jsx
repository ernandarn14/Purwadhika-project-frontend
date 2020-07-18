import React from 'react';
import "./Home.css";
// import logo from "../../../assets/images/logo/pie-image.jpg"
import Card from '../../../component/Cards/Card';
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { connect } from 'react-redux';
import swal from 'sweetalert';


class Home extends React.Component {
  state = {
    recipeList: [],
    categoryList: [],
    category: "semua",
  }

  getRecipeData = () => {
    if (this.state.category === "semua") {
      Axios.get(`${API_URL}/resep/terbaik`)
        .then(res => {
          console.log(res.data)
          this.setState({ recipeList: res.data })
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      Axios.get(`${API_URL}/resep/kategori/terbaik/?categoryName=${this.state.category}`)
        .then(res => {
          console.log(res.data)
          this.setState({ recipeList: res.data })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  getCategoryData = () => {
    Axios.get(`${API_URL}/kategori-resep`)
      .then(res => {
        console.log(res.data)
        this.setState({ categoryList: res.data })
      })
      .catch(e => {
        console.log(e)
      })
  }

  componentDidMount() {
    this.getRecipeData();
    this.getCategoryData()
  }

  renderWarning = () => {
    this.props.user.id ? swal("Gagal", "Resep Ini Hanya Bisa Diakses Pengguna Premium", "error") : swal("Gagal", "Anda Harus Login Untuk Membaca Resep Ini", "error")
  }

  renderCategory = () => {
    const { categoryList } = this.state
    return categoryList.map((val) => {
      const { id, recipeCategoryName } = val
      return (
        <option value={recipeCategoryName} key={id.toString()}>{recipeCategoryName}</option>
      )
    })
  }


  renderRecipeList = () => {
    const { recipeList } = this.state
    return recipeList.map((val, idx) => {
      if (val.recipeName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
        if (val.postOption === "premium") {
          if (this.props.user.membership === "premium") {
            return (
              <div className="d-flex flex-column justify-content-center my-4" key={val.id.toString()}>
                <Link
                  to={`/resep/${val.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card recipe={val} />
                </Link>
              </div>
            )
          } else {
            return (
              <div className="d-flex flex-column justify-content-center my-4" key={val.id.toString()} onClick={this.renderWarning}>
                <Card recipe={val} />
              </div>
            )
          }
        } else {
          return (
            <div className="d-flex flex-column justify-content-center my-4" key={val.id.toString()}>
              <Link
                to={`/resep/${val.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card recipe={val} />
              </Link>
            </div>
          )
        }
      }
    })
  }


  render() {
    return (
      <div className="container d-flex justify-content-center flex-column align-items-center">
        <div className="d-flex justify-content-center flex-column header text-center">
          <h2 style={{ color: "inherit" }}>Solusi Resep Mudah, Cepat, dan Anti Gagal</h2>
          <h3>Cocok untuk di setiap acara dan suasana</h3>
        </div>
        <div className="text-center mt-5">
          <h2 style={{ color: "inherit" }}>Resep Paling Disukai</h2><br />
          <div className="d-flex align-items-center justify-content-center">
            <label>Kategori:</label>
            <select className="form-control ml-4"
              onClick={() => this.getRecipeData(this.state.category)}
              onChange={(e) => this.setState({ category: e.target.value })}
            >
              <option value="semua">Semua</option>
              {this.renderCategory()}
            </select>
          </div>
          <div className="row d-flex flex-wrap justify-content-center mt-4">
            {this.renderRecipeList()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    user: state.user
  };
};

export default connect(mapStateToProps)(Home)