import React from "react";
import "./Resep.css";
import logo from "../../../assets/images/logo/pie-image.jpg";
import Card from "../../../component/cards/Card";
import { Link } from "react-router-dom";

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
  listResep = () => {
    return resepList.map((val) => {
      return <Card resep={val} />;
    });
  };
  render() {
    return (
      <div className="d-flex justify-content-center flex-column align-items-center py-4">
        <div className="d-flex align-items-center mx-4 kategori-filter">
          <Link className="mx-4 kategori" style={{textDecoration: "none"}}>
            <img src="https://www.meals.com/imagesrecipes/145800lrg.jpg" className="img-kategori" />
            <h5 className="text-center">Cakes</h5>
          </Link>
          <Link className="mx-4 kategori" style={{textDecoration: "none"}}>
            <img src="https://www.meals.com/imagesrecipes/147086lrg.jpg" className="img-kategori"/>
            <h5 className="text-center">Kue Kering</h5>
          </Link>
          <Link className="mx-4 kategori" style={{textDecoration: "none"}}>
            <img src="https://www.meals.com/imagesrecipes/145078lrg.jpg" className="img-kategori" />
            <h5 className="text-center">Roti dan Muffin</h5>
          </Link>
          <Link className="mx-4 kategori" style={{textDecoration: "none"}}>
            <img src="https://www.meals.com/imagesrecipes/32090lrg.jpg" className="img-kategori" />
            <h5 className="text-center">Pastry</h5>
          </Link>
        </div>
        <br />
        <br />
        <div className="row d-flex flex-wrap justify-content-center text-center">
          {this.listResep()}
        </div>
      </div>
    );
  }
}

export default Resep;
