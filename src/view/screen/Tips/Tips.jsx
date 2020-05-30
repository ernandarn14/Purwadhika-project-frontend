import React from 'react';
import './Tips.css';

const tipsData = [
    {
        gambar: "https://www.meals.com/imagesrecipes/30128lrg.jpg",
        judul: "Chocolate Crinkle-Top Cookies",
        deskripsi: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur commodi quibusdam minus sit optio et explicabo, eos reiciendis veniam ipsam aut dignissimos dicta harum temporibus laborum veritatis itaque odit sapiente?"
    },
    {
        gambar: "https://www.meals.com/imagesrecipes/147657lrg.jpg",
        judul: "Chocolate Crinkle-Top Cookies",
        deskripsi: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur commodi quibusdam minus sit optio et explicabo, eos reiciendis veniam ipsam aut dignissimos dicta harum temporibus laborum veritatis itaque odit sapiente?"
    }
]

class Tips extends React.Component {
    tipsList = () => {
        return tipsData.map(val => {
            const { gambar, judul, deskripsi } = val
            return (
                <>
                    <div className="d-flex justify-content-around mt-4 align-items-center tips-card">
                        {/* <div className="row"> */}
                            <img src={gambar} alt="" />
                            <div className="d-flex flex-column ml-4 justify-content-center">
                                <h5>{judul}</h5>
                                <p style={{ textAlign: "justify" }}>{deskripsi}</p>
                            </div>
                        {/* </div> */}
                    </div>
                </>
            )
        })
    }
    render() {
        return (
            <div className="container mt-4 d-flex justify-content-center flex-column align-items-center">
                {this.tipsList()}
            </div>
        )
    }
}
export default Tips