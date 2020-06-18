import React from "react"
import "./TipsDetails.css"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Link } from "react-router-dom";
import Button from "../../../component/Button/Buttons";

class TipsDetails extends React.Component {
    state = {
        tipsList: {
            image: "",
            tipsName: "",
            desc: "",
            id: 0
        },
        tipsDataList: []
    }

    componentDidMount() {
        this.getTipDataDetails()
        this.getAllTipsData()
    }

    getTipDataDetails = () => {
        Axios.get(`${API_URL}/tips/${this.props.match.params.tipsId}`)
            .then(res => {
                this.setState({ tipsList: res.data })
            })
            .catch(err => {
                console.log(err)
                alert("Data Kosong")
            })
    }

    getAllTipsData = () => {
        Axios.get(`${API_URL}/tips`,
            {
                params: {
                    _limit: 3
                }
            })
            .then(res => {
                this.setState({ tipsDataList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderTipsData = () => {
        const { tipsDataList } = this.state
        return tipsDataList.map(val => {
            const { image, tipsName } = val
            return (
                <>
                    <div className="tips-card d-inline-block mt-4 mx-2 d-flex flex-column align-items-center text-center">
                        <Link
                            to={`/tips/${val.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <img src={image} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                            <h5 className="mt-2">{tipsName}</h5>
                            {/* <Button type="contained" className="mt-2">
                                Baca Selengkapnya
                                </Button> */}
                        </Link>
                        {/* {this.getAllTipsData}
                        {this.getTipDataDetails()} */}
                    </div>
                </>
            )
        })
    }

    render() {
        const { tipsList } = this.state
        const { tipsName, image, desc } = tipsList
        return (
            <div className="container">
                <div className="d-flex justify-content-start mt-4">
                    <Link to="/tips" style={{ textDecoration: "none" }}>
                        <Button type="textual">
                            Kembali ke Halaman Tips dan Trik
                                </Button>
                    </Link>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="tips-details">
                            <div className="d-flex flex-column text-center align-items-center">
                                <h3 className="my-4">{tipsName}</h3>
                                <img src={image} alt="" style={{ width: "450px", height: "300px", objectFit: "contain" }} className="mt-2" />
                            </div>
                            <div className="d-flex mt-5 text-justify">
                                <p>{desc}</p>
                            </div>
                        </div>
                        <div className="recommendation mt-5">
                            <h4 className="recommendation-header">Artikel Lainnya</h4>
                            <div className="row d-flex flex-wrap justify-content-center">
                                {this.renderTipsData()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TipsDetails