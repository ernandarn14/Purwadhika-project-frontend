import React from 'react';
import "./Home.css";
import logo from "../../../assets/images/logo/pie-image.jpg"
import Card from '../../../component/cards/Card';

const resepList = [{
    judulResep: "Chocolate Crinkle-Top Cookies",
    kategori: "Cookies",
    lamaMembuat: 10,
    jumlahBahan: 2,
    jumlahPorsi: '3-4',
    gambar: logo
},
{
    judulResep: "Butterscotch Rum Pound Cake",
    kategori: "Cake",
    lamaMembuat: 54,
    jumlahBahan: 2,
    jumlahPorsi: '3-4',
    gambar: 'https://www.meals.com/imagesrecipes/30142lrg.jpg'
},
{
    judulResep: "Chocolate Crinkle-Top Cookies",
    kategori: "Cookies",
    lamaMembuat: 10,
    jumlahBahan: 2,
    jumlahPorsi: '3-4',
    gambar: logo
}
]
class Home extends React.Component {
    listResep = () => {
        return resepList.map(val => {
            return <Card resep={val} />
        })
    }
    render() {
        return (
            <div className="container d-flex justify-content-center flex-column align-items-center">
                <div className="d-flex justify-content-center flex-column header text-center">
                    <h1>Solusi Resep Mudah, Cepat, dan Anti Gagal</h1>
                    <h3>Cocok untuk di setiap acara dan suasana</h3>
                </div>
                <div className="text-center mt-5">
                    <h2 style={{color: "inherit"}}>Resep Paling Populer</h2><br />
                    <div className="row d-flex flex-wrap justify-content-center">
                        {this.listResep()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home