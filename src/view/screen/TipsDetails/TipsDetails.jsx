import React from "react"
import "./TipsDetails.css"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Link } from "react-router-dom";
import Button from "../../../component/Button/Buttons";
import { connect } from "react-redux";

class TipsDetails extends React.Component {
    state = {
        tipsList: {
            tipsImage: "",
            tipsName: "",
            tipsContent: "",
            users: {}
        },
        tipsDataList: [],
        selectedFile: null
    }

    componentDidMount() {
        this.getTipDataDetails()
    }

    getTipDataDetails = () => {
        Axios.get(`${API_URL}/tips/${this.props.match.params.tipsId}`)
            .then(res => {
                console.log(res.data)
                this.setState({ tipsList: res.data })
            })
            .catch(err => {
                console.log(err)
                alert("Data Kosong")
            })
    }

    render() {
        const { tipsList } = this.state
        const { tipsName, tipsImage, tipsContent, users } = tipsList
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
                                <h3 className="mt-4">{tipsName}</h3>
                                <h6>Oleh: {users.username}</h6>
                                <img src={tipsImage} alt="" style={{ width: "450px", height: "300px", objectFit: "contain" }} className="mt-5" />
                            </div>
                            <div className="d-flex mt-5 text-justify">
                                <p>{tipsContent}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(TipsDetails) 