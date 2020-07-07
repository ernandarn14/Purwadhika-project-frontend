import React from "react";
import "./Recipe.css";
// import logo from "../../../assets/images/logo/pie-image.jpg";
import Card from "../../../component/Cards/Card";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { connect } from "react-redux";
import Buttons from "../../../component/Button/Buttons";
import swal from "sweetalert";


class Resep extends React.Component {
  state = {
    recipeList: {
      recipeName: "",
      rating: "",
      cookTime: "",
      numbServings: "",
      recipeImage: "",
      shortDesc: "",
      users: {},
      recipeCategory: {},
      id: 0
    },
    recipe: [],
    categoryFilter: 0
  }

  getRecipeData = () => {
    Axios.get(`${API_URL}/resep`)
      .then(res => {
        console.log(res.data)
        this.setState({ recipeList: res.data, recipe: res.data })
        // console.log(this.state.recipeList[0].id)
      })
      .catch(err => {
        console.log(err)
        alert('Data Kosong')
      })
  }

  componentDidMount() {
    this.getRecipeData();
  }

  renderRecipeList = () => {
    const { recipe } = this.state
    return recipe.map((val, idx) => {
      if (val.recipeName.toLowerCase().includes(this.props.search.searchInput.toLowerCase()
        && val.recipeCategory.includes(this.state.categoryFilter))
      ) {
        return (
          <div className="d-flex flex-column justify-content-center my-4" key={val.id.toString()}>
            <Link
              to={`/resep/${val.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card recipe={val} />
            </Link>
            <div className="d-flex justify-content-center">
              <Buttons type="outlined" onClick={() => this.addWishlistHandler(val.id)}>Simpan Resep</Buttons>
            </div>
          </div>
        )
      }
    })
  }

  addWishlistHandler = (idx) => {
    Axios.get(`${API_URL}/rencana/${this.props.user.id}/${this.state.recipeList[idx - 1].id}`)
      // Axios.get(`${API_URL}/rencana/cek-rencana`, {
      //   params: {
      //     userId: this.props.user.id,
      //     recipeId: 1
      //   }
      // })
      .then(res => {
        alert("masuk")
        console.log(res.data)
        // console.log(this.state.recipeList[idx-1].id)
        if (Object.keys(res.data).length === 0) {
          Axios.post(`${API_URL}/rencana/tambah/pengguna/${this.props.user.id}/resep/${this.state.recipeList[idx - 1].id}`, {
            userId: this.props.user.id,
            recipeId: this.state.recipeList[idx - 1].id
          }
          )
            .then(res => {
              alert("masuk")
              console.log(res.data);
              swal('Sukses', 'Resep Berhasil Tersimpan di Rencana Saya', 'success')
            })
            .catch(err => {
              console.log(err);
            });
        }
        else {
          swal('Gagal', 'Resep Sudah Tersimpan di Rencana Saya', 'error')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    return (
      <div className="container d-flex justify-content-center flex-column align-items-center">
        <h3 className="text-center my-5">Katalog Resep</h3>
        <div className="d-flex align-items-center justify-content-center text-center mx-4 kategori-filter">
          <div className="row">
            <Link className="mx-4 kategori" to="/resep" style={{ textDecoration: "none" }} onClick={() => this.setState({ categoryFilter: 1 })}>
              <img src="https://www.meals.com/imagesrecipes/145800lrg.jpg" alt="" className="img-kategori" />
              <h6 className="text-center">Cakes</h6>
            </Link>
            <Link className="mx-4 kategori" to="/resep" style={{ textDecoration: "none" }} onClick={() => this.setState({ categoryFilter: 2 })}>
              <img src="https://www.meals.com/imagesrecipes/147086lrg.jpg" alt="" className="img-kategori" />
              <h6 className="text-center">Kue Kering</h6>
            </Link>
            <Link className="mx-4 kategori" to="/resep" style={{ textDecoration: "none" }} onClick={() => this.setState({ categoryFilter: 3 })}>
              <img src="https://www.meals.com/imagesrecipes/145078lrg.jpg" alt="" className="img-kategori" />
              <h6 className="text-center">Roti dan Muffin</h6>
            </Link>
            <Link className="mx-4 kategori" to="/resep" style={{ textDecoration: "none" }} onClick={() => this.setState({ categoryFilter: 4 })} >
              <img src="https://www.meals.com/imagesrecipes/32090lrg.jpg" alt="" className="img-kategori" />
              <h6 className="text-center">Pastry</h6>
            </Link>
          </div>
        </div>
        <div className="row d-flex flex-wrap justify-content-center text-center mt-5">
          {this.renderRecipeList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    user: state.user
  };
};

export default connect(mapStateToProps)(Resep);
