import React from 'react';
import './Tips.css';
import { Link } from "react-router-dom";
import Button from "../../../component/Button/Buttons";
import Axios from 'axios';
import { API_URL } from '../../../constants/API';

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
    },
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
    state = {
        tipsDataList: []
    }

    getTipsData = () => {
        Axios.get(`${API_URL}/tips`)
            .then(res => {
                this.setState({ tipsDataList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getTipsData()
    }

    renderTipsData = () => {
        const { tipsDataList } = this.state
        return tipsDataList.map(val => {
            const { gambar, judul } = val
            return (
                <>
                    <div className="tips-card d-inline-block mt-4 mx-2 d-flex flex-column align-items-center">
                        <img src={gambar} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                        <h5 className="mt-2">{judul}</h5>
                        <Link
                            to={`/tips/${val.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Button type="contained" className="mt-2">
                                Baca Selengkapnya
                                </Button>
                        </Link>
                    </div>
                </>
            )
        })
    }
    
    tipsList = () => {
        return tipsData.map(val => {
            const { gambar, judul } = val
            return (
                <>
                    <div className="tips-card d-inline-block mt-4 mx-2 d-flex flex-column align-items-center">
                        <img src={gambar} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                        <h5 className="mt-2">{judul}</h5>
                        <Link
                            to=""
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Button type="contained" className="mt-2">
                                Baca Selengkapnya
                                </Button>
                        </Link>
                    </div>
                </>
            )
        })
    }
    render() {
        return (
            <div className="container mt-5">
                <div className="row d-flex flex-wrap justify-content-center">
                    {this.renderTipsData()}
                </div>
            </div>
        )
    }
}
export default Tips