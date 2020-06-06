import React from "react";
import "./Recipe.css";
import logo from "../../../assets/images/logo/pie-image.jpg";
import Card from "../../../component/cards/Card";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import Button from "../../../component/Button/Buttons";

const resepList = [
  {
    judulResep: "Chocolate Crinkle-Top Cookies",
    kategori: "Cookies",
    lamaMembuat: 10,
    jumlahBahan: 2,
    jumlahPorsi: "3-4",
    gambar: logo,
  },
  {
    judulResep: "Butterscotch Rum Pound Cake",
    kategori: "Cake",
    lamaMembuat: 54,
    jumlahBahan: 2,
    jumlahPorsi: "3-4",
    gambar: "https://www.meals.com/imagesrecipes/30142lrg.jpg",
  },
  {
    judulResep: "Chocolate Crinkle-Top Cookies",
    kategori: "Cookies",
    lamaMembuat: 10,
    jumlahBahan: 2,
    jumlahPorsi: "3-4",
    gambar: logo,
  },
];

class Resep extends React.Component {
  state = {
    recipeList: []
  }

  getRecipeData = () => {
    Axios.get(`${API_URL}/resep`
      // , {
      //   params: {
      //     _expand: "pengguna"
      //   }
      // }
    )
      .then(res => {
        this.setState({ recipeList: res.data })
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
    const { recipeList } = this.state
    return recipeList.map(val => {
      // return <Card resep={val} />
      return (
        <>
          <div className="d-flex flex-column justify-content-center">
          <Link
            to={`/resep/${val.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card resep={val} />
          </Link>
          </div>
        </>
      )
    })
  }

  listResep = () => {
    return resepList.map((val) => {
      return (
        <>
          <Card resep={val} />;
          <Link
            to={`/resep/${val.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button type="contained" className="mt-2">
              Baca Selengkapnya
            </Button>
          </Link>
        </>
      )
    });
  };


  render() {
    return (
      <div className="container d-flex justify-content-center flex-column align-items-center">
        <h3 className="text-center my-5">Katalog Resep</h3>
        <div className="d-flex align-items-center justify-content-center text-center mx-4 kategori-filter">
          <div className="row">
            <Link className="mx-4 kategori" to="" style={{ textDecoration: "none" }}>
              <img src="https://www.meals.com/imagesrecipes/145800lrg.jpg" alt="" className="img-kategori" />
              <h6 className="text-center">Cakes</h6>
            </Link>
            <Link className="mx-4 kategori" to="" style={{ textDecoration: "none" }}>
              <img src="https://www.meals.com/imagesrecipes/147086lrg.jpg" alt="" className="img-kategori" />
              <h6 className="text-center">Kue Kering</h6>
            </Link>
            <Link className="mx-4 kategori" to="" style={{ textDecoration: "none" }}>
              <img src="https://www.meals.com/imagesrecipes/145078lrg.jpg" alt="" className="img-kategori" />
              <h6 className="text-center">Roti dan Muffin</h6>
            </Link>
            <Link className="mx-4 kategori" to="" style={{ textDecoration: "none" }}>
              <img src="https://www.meals.com/imagesrecipes/32090lrg.jpg" alt="" className="img-kategori" />
              <h6 className="text-center">Pastry</h6>
            </Link>
          </div>
        </div>
        <div className="row d-flex flex-wrap justify-content-center text-center mt-5">
          {/* {this.listResep()} */}
          {this.renderRecipeList()}
        </div>
      </div>
    );
  }
}

export default Resep;
